import {
  Address,
  MultiESDTNFTTransferPayloadBuilder,
  TokenPayment,
  TransactionPayload,
} from '@elrondnetwork/erdjs';
import { useCallback } from 'react';
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useTransaction } from '../../hooks/core/useTransaction';
import {
  multiEsdtBaseGasLimit,
  multiEsdtDataGasLimit,
  multiEsdtPaymentGasLimit,
} from '../../config/config';
import { TransactionCb } from '../../hooks/core/common-helpers/sendTxOperations';
import { accountState } from '../../store/auth';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { ProxyNetworkProvider } from '@elrondnetwork/erdjs-network-providers/out';
import { gateway } from '../../config/network';

type FormValues = {
  recipientAddress: string;
  token: {
    identifier: string;
    quantity: string;
  }[];
};

const SendMultiTokensManualForm = ({
  cb,
}: {
  cb: (params: TransactionCb) => void;
}) => {
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      token: [{ identifier: '', quantity: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'token',
    control,
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

  const onSubmit = (values: FormValues) => {
    const { recipientAddress, token } = values;
    const tokenIdentifiers = token.map(({ identifier }) => {
      return identifier;
    });
    const tokenQuantities = token.map(({ quantity }) => {
      return quantity;
    });
    const tokenDecimals: number[] = [];
    const payments: TokenPayment[] = [];

    let networkProvider = new ProxyNetworkProvider(gateway);

    return new Promise<void>(async (resolve) => {
      for (let tokenIdentifier of tokenIdentifiers) {
        let tokenDefinition = await networkProvider.getDefinitionOfFungibleToken(
          tokenIdentifier
        );
        tokenDecimals.push(tokenDefinition.decimals);
      }
      /*
      for (let tokenIdentifer of tokenIdentifiers) {
        const esdtOnNetwork = await axios.get<{ decimals: number }>(
          `${publicApi[chain]}/tokens/${tokenIdentifer.trim()}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          }
        );

        let numDecimals = esdtOnNetwork?.data?.decimals;

        if (numDecimals !== undefined && numDecimals !== null)
          tokenDecimals.push(numDecimals);
      }
      */

      if (tokenDecimals.length == tokenIdentifiers.length) {
        for (let i in tokenIdentifiers) {
          payments.push(
            TokenPayment.fungibleFromAmount(
              tokenIdentifiers[i],
              tokenQuantities[i],
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

      handleSendTx(data, gasLimit);

      resolve();
      reset();
    });
  };

  ///// Form Placeholders & Default Values
  const formAddress = 'erd1...';

  const iconColor = useColorModeValue('teal.400', 'teal.800');
  const iconBackground = useColorModeValue('gray.500', 'gray.900');
  const scrollbarColor = useColorModeValue('teal.400', 'teal.800');

  return (
    <Flex direction="row" justifyContent="center" mt="10px">
      <Box
        width={['full', 'full', '400px']}
        height="346px"
        borderWidth="1px"
        borderRadius="5px"
        bg={useColorModeValue('gray.300', 'gray.800')}
        borderColor={useColorModeValue('teal.400', 'teal.800')}
        flexDirection="row"
        justifyContent="space-between"
      >
        <Box width="full" height="30px" px="5px" pt="5px" mb="10px">
          <Center
            bg={useColorModeValue('teal.400', 'teal.800')}
            color={useColorModeValue('gray.500', 'gray.900')}
            borderColor={useColorModeValue('gray.500', 'gray.900')}
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
          >
            <GridItem rowSpan={1} colSpan={24} px={['2px', '5px']}>
              <FormControl isInvalid={!!errors?.recipientAddress}>
                <FormLabel
                  htmlFor="recipientAddress"
                  mt="10px"
                  mb="0px"
                  color={useColorModeValue('blackAlpha.700', 'whiteAlpha.600')}
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
                    pattern: {
                      value: /^erd1[a-zA-Z0-9]{58}$/,
                      message: 'Invalid wallet address',
                    },
                  })}
                />
              </FormControl>
            </GridItem>
            <GridItem
              rowSpan={1}
              colSpan={11}
              px={['2px', '5px']}
              color={useColorModeValue('blackAlpha.700', 'whiteAlpha.600')}
            >
              Token Identifier
            </GridItem>
            <GridItem
              rowSpan={1}
              colSpan={13}
              color={useColorModeValue('blackAlpha.700', 'whiteAlpha.600')}
            >
              Amount to Send
            </GridItem>
          </Grid>
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
            {fields.map((field, index) => {
              return (
                <Grid key={field.id} templateColumns={'repeat(24, 1fr)'}>
                  <GridItem rowSpan={1} colSpan={11} px={['2px', '5px']}>
                    <FormControl
                      isInvalid={!!errors?.token?.[index]?.identifier}
                    >
                      <Input
                        placeholder="ABC-123456"
                        variant={
                          errors?.token?.[index]?.identifier ? 'error' : 'owner'
                        }
                        {...register(`token.${index}.identifier`, {
                          required: true,
                          minLength: 10,
                          maxLength: 17,
                          pattern: /^[A-Z]{3,10}-[a-z0-9]{6}$/,
                        })}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={11} px={['2px', '5px']}>
                    <FormControl isInvalid={!!errors?.token?.[index]?.quantity}>
                      <Input
                        placeholder="0"
                        variant={
                          errors?.token?.[index]?.quantity ? 'error' : 'owner'
                        }
                        textAlign="right"
                        {...register(`token.${index}.quantity`, {
                          required: true,
                          min: 1e-18,
                          pattern: /^\d*(\.\d{1,6})?$/,
                        })}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={1} px={['2px', '5px']}>
                    <Button onClick={() => remove(index)}>
                      <DeleteIcon bg={iconBackground} color={iconColor} />
                    </Button>
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={1} px={['2px', '5px']}>
                    <Button
                      onClick={() =>
                        append({
                          identifier: '',
                          quantity: '',
                        })
                      }
                    >
                      <AddIcon bg={iconBackground} color={iconColor} />
                    </Button>
                  </GridItem>
                </Grid>
              );
            })}
          </Box>
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
                    onClick={onAreYouSureToggle}
                    mt="30px"
                    variant="owner"
                    width="fit-content"
                  >
                    Change
                  </Button>
                ) : (
                  <Button
                    onClick={onAreYouSureToggle}
                    mt="30px"
                    variant="owner"
                    width="fit-content"
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
                    width="fit-content"
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
export default SendMultiTokensManualForm;
