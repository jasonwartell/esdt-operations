import {
  Address,
  MultiESDTNFTTransferPayloadBuilder,
  TokenPayment,
  TransactionPayload,
} from '@elrondnetwork/erdjs';
import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Center,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Spinner,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useTransaction } from '../../hooks/core/useTransaction';
import {
  multiEsdtBaseGasLimit,
  multiEsdtDataGasLimit,
  multiEsdtPaymentGasLimit,
} from '../../config/config';
import { TransactionCb } from '../../hooks/core/common-helpers/sendTxOperations';
import { accountState } from '../../store/auth';
import { ProxyNetworkProvider } from '@elrondnetwork/erdjs-network-providers/out';
import { gateway } from '../../config/network';

type FormValues = {
  recipientAddress: string;
  token: {
    selected: boolean;
    identifier: string;
    quantity: string;
  }[];
};

const SendMultiTokensForm = ({
  cb,
}: {
  cb: (params: TransactionCb) => void;
}) => {
  const [listOfTokens, setListOfTokens] = useState<string[]>([]);
  const [listOfBalances, setListOfBalances] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      token: [{ selected: false }],
    },
  });

  const { triggerTx } = useTransaction({ cb });

  const handleSendTx = useCallback(
    (data: TransactionPayload, gas: number) => {
      triggerTx({
        address: accountState.address,
        data: data,
        gasLimit: gas,
        value: 0.0,
      });
    },
    [triggerTx]
  );

  const {
    isOpen: isAreYouSureOpen,
    onToggle: onAreYouSureToggle,
  } = useDisclosure();

  async function FetchTokens() {
    let networkProvider = new ProxyNetworkProvider(gateway);
    let addressOfUser = new Address(accountState.address);

    let userTokenList = await networkProvider.getFungibleTokensOfAccount(
      addressOfUser
    );

    let userTokens: string[] = [];
    let tokenBalances: number[] = [];
    let tokenDecimals: number[] = [];
    let tokenBalancesDecimals: string[] = [];

    userTokenList.map(async (token: any) => {
      userTokens.push(token.identifier);
      tokenBalances.push(token.balance.toNumber());
    });

    for (let userToken of userTokens) {
      let tokenDefinition = await networkProvider.getDefinitionOfFungibleToken(
        userToken
      );
      tokenDecimals.push(tokenDefinition.decimals);
    }

    for (let i = 0; i < tokenDecimals.length; i++) {
      tokenBalancesDecimals.push(
        (tokenBalances[i] / 10 ** tokenDecimals[i]).toFixed(4)
      );
    }

    setListOfBalances(tokenBalancesDecimals);
    setListOfTokens(userTokens);
    setLoading(false);
  }

  useEffect(() => {
    (async () => {
      await FetchTokens();
    })();
  }, [listOfBalances]);

  function UserTokens() {
    return (
      <CheckboxGroup colorScheme="gray" size="md">
        {listOfTokens.map((token, index) => {
          return (
            <Grid
              key={token}
              templateColumns={'repeat(24, 1fr)'}
              px={['2px', '5px']}
            >
              <GridItem rowSpan={1} colSpan={1}>
                <Checkbox
                  mt="6px"
                  type="hidden"
                  iconColor={checkboxColor}
                  color={formLabelColor}
                  {...register(`token.${index}.selected`)}
                />
              </GridItem>
              <GridItem rowSpan={1} colSpan={9} mt="3px">
                <Input
                  value={listOfTokens[index]}
                  color={fixedInputColor}
                  borderColor={fixedInputBorderColor}
                  isReadOnly
                  {...register(`token.${index}.identifier`)}
                />
              </GridItem>
              <GridItem rowSpan={1} colSpan={7} mt="3px" ml="5px">
                {listOfBalances && (
                  <Input
                    textAlign="right"
                    value={listOfBalances[index]}
                    color={fixedInputColor}
                    borderColor={fixedInputBorderColor}
                    isReadOnly
                  />
                )}
              </GridItem>
              <GridItem rowSpan={1} colSpan={7} mt="3px" ml="5px">
                <FormControl isInvalid={!!errors?.token?.[index]?.quantity}>
                  <Input
                    variant={
                      errors?.token?.[index]?.quantity ? 'error' : 'owner'
                    }
                    textAlign="right"
                    {...register(`token.${index}.quantity`, {
                      required: false,
                      min: 1e-18,
                      pattern: /^\d*(\.\d{1,6})?$/,
                    })}
                  />
                </FormControl>
              </GridItem>
            </Grid>
          );
        })}
      </CheckboxGroup>
    );
  }

  const onSubmit = (values: FormValues) => {
    const { recipientAddress, token } = values;
    const tokensSelected = token.map(({ selected }) => {
      return selected;
    });
    const tokenIdentifiers = token.map(({ identifier }) => {
      return identifier;
    });
    const tokenQuantities = token.map(({ quantity }) => {
      return quantity;
    });
    const tokenDecimals: number[] = [];
    const payments: TokenPayment[] = [];
    const selectedTokenIdentifiers: string[] = [];
    const selectedTokenQuantities: string[] = [];

    let networkProvider = new ProxyNetworkProvider(gateway);

    for (let i = 0; i < tokensSelected.length; i++) {
      if (tokensSelected[i]) {
        selectedTokenIdentifiers.push(tokenIdentifiers[i]);
        selectedTokenQuantities.push(tokenQuantities[i]);
      }
    }

    return new Promise<void>(async (resolve) => {
      for (let tokenIdentifier of selectedTokenIdentifiers) {
        let tokenDefinition = await networkProvider.getDefinitionOfFungibleToken(
          tokenIdentifier
        );
        tokenDecimals.push(tokenDefinition.decimals);
      }

      if (tokenDecimals.length == selectedTokenIdentifiers.length) {
        for (let i in selectedTokenIdentifiers) {
          payments.push(
            TokenPayment.fungibleFromAmount(
              selectedTokenIdentifiers[i],
              selectedTokenQuantities[i],
              tokenDecimals[i]
            )
          );
        }
      }

      const data = new MultiESDTNFTTransferPayloadBuilder()
        .setPayments(payments)
        .setDestination(new Address(recipientAddress))
        .build();

      const gasLimit =
        multiEsdtBaseGasLimit +
        multiEsdtDataGasLimit * data.length() +
        multiEsdtPaymentGasLimit * payments.length;

      resolve();
      reset();
      setListOfBalances([]);
      setListOfTokens([]);

      handleSendTx(data, gasLimit);
    });
  };

  ///// Form Placeholders & Default Values
  const formAddress = 'erd1...';

  ///// Color Scheme
  const checkboxColor = useColorModeValue('teal.400', 'black');
  const formLabelColor = useColorModeValue('blackAlpha.700', 'whiteAlpha.600');
  const titleBackgroundColor = useColorModeValue('teal.400', 'teal.800');
  const titleTextColor = useColorModeValue('gray.500', 'gray.900');
  const titleBorderColor = useColorModeValue('gray.500', 'gray.900');
  const formBackgroundColor = useColorModeValue('gray.300', 'gray.800');
  const formBorderColor = useColorModeValue('teal.400', 'teal.800');
  const fixedInputColor = useColorModeValue('blackAlpha.700', 'whiteAlpha.600');
  const fixedInputBorderColor = useColorModeValue(
    'blackAlpha.700',
    'whiteAlpha.600'
  );
  const scrollbarColor = useColorModeValue('teal.400', 'teal.800');

  return (
    <Flex direction="row" justifyContent="center" mt="10px">
      <Box
        width={['full', 'full', '500px']}
        height="346px"
        borderWidth="1px"
        borderRadius="5px"
        bg={formBackgroundColor}
        borderColor={formBorderColor}
        flexDirection="row"
        justifyContent="space-between"
      >
        <Box width="full" height="30px" px="5px" pt="5px" mb="10px">
          <Center
            bg={titleBackgroundColor}
            color={titleTextColor}
            borderColor={titleBorderColor}
            borderWidth="1px"
            borderRadius="5px"
            fontWeight="bold"
          >
            Transfer Multiple ESDTs
          </Center>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            templateRows={'repeat(1, 1fr)'}
            templateColumns={'repeat(24, 1fr)'}
            px={['2px', '5px']}
          >
            <GridItem rowSpan={1} colSpan={24}>
              <FormControl isInvalid={!!errors?.recipientAddress}>
                <FormLabel
                  htmlFor="recipientAddress"
                  mt="10px"
                  mb="0px"
                  color={formLabelColor}
                  fontSize={['sm', 'md']}
                >
                  Recipient Address
                </FormLabel>
                <Input
                  id="recipientAddress"
                  placeholder={formAddress}
                  variant={errors.recipientAddress ? 'error' : 'owner'}
                  {...register('recipientAddress', {
                    required: true,
                    pattern: /^erd1[a-zA-Z0-9]{58}$/,
                  })}
                />
              </FormControl>
            </GridItem>

            <GridItem
              colStart={2}
              rowSpan={1}
              colSpan={9}
              ml="5px"
              color={formLabelColor}
            >
              Token
            </GridItem>
            <GridItem
              colStart={11}
              rowSpan={1}
              colSpan={7}
              ml="5px"
              color={formLabelColor}
            >
              Available
            </GridItem>
            <GridItem
              colStart={18}
              rowSpan={1}
              colSpan={7}
              ml="5px"
              color={formLabelColor}
            >
              Amount
            </GridItem>
          </Grid>

          {loading ? (
            <Box flex-direction="column" width="full">
              <Text textAlign="center">
                Fetching token data, please wait...
              </Text>
              <Center>
                <Spinner size="sm" />
              </Center>
            </Box>
          ) : (
            <Box
              maxHeight="140px"
              overflowY="auto"
              sx={{
                '&::-webkit-scrollbar': {
                  width: '4px',
                },
                '&::-webkit-scrollbar-track': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: scrollbarColor,
                  borderRadius: '24px',
                },
              }}
            >
              <UserTokens />
            </Box>
          )}

          <Grid templateColumns={'repeat(24, 1fr)'}>
            <GridItem
              rowStart={4}
              colStart={7}
              rowSpan={1}
              colSpan={2}
              px="5px"
            >
              <Center>
                {isAreYouSureOpen ? (
                  <Button
                    onClick={() => {
                      onAreYouSureToggle();
                      reset();
                    }}
                    mt="30px"
                    variant="owner"
                    minWidth="80px"
                  >
                    Reset
                  </Button>
                ) : (
                  <Button
                    onClick={onAreYouSureToggle}
                    mt="30px"
                    variant="owner"
                    minWidth="80px"
                  >
                    Submit
                  </Button>
                )}
              </Center>
            </GridItem>
            <GridItem
              rowStart={4}
              colStart={15}
              rowSpan={1}
              colSpan={2}
              px="5px"
            >
              <Center>
                {isAreYouSureOpen && (
                  <Button
                    variant="owner"
                    type="submit"
                    mt="30px"
                    minWidth="80px"
                  >
                    Confirm
                  </Button>
                )}
              </Center>
            </GridItem>
            <GridItem rowSpan={1} colSpan={2} />
          </Grid>
        </form>
      </Box>
    </Flex>
  );
};
export default SendMultiTokensForm;
