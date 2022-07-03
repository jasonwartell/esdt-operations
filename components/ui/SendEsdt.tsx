import axios from 'axios';
import {
  TransactionPayload,
  TokenPayment,
  ESDTTransferPayloadBuilder,
} from '@elrondnetwork/erdjs';
import { useCallback } from 'react';
import {
  chain,
  publicApi,
} from '../../config/config';
import { TransactionCb } from '../../hooks/core/common-helpers/sendTxOperations';
import {
  Box,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Center,
  Flex,
  Spacer,
  useColorModeValue,
  useDisclosure,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useTransaction } from '../../hooks/core/useTransaction';

const SendEsdt = ({ cb }: { cb: (params: TransactionCb) => void }) => {
  const { isOpen: isAreYouSureOpen, onToggle: onAreYouSureToggle } =
    useDisclosure();

  const { triggerTx } = useTransaction({ cb });

  const handleSendTx = useCallback(
    (data: TransactionPayload, address: string, gasLimit: number) => {
      triggerTx({
        address: address,
        data: data,
        gasLimit: gasLimit,
        value: 0.0,
      });
    },
    [triggerTx]
  );

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  function onSubmit(values: any) {

    return new Promise<void>(async (resolve) => {
      const esdtOnNetwork = await axios.get<{ decimals: number }>(
        `${publicApi[chain]}/tokens/${values.ticker.trim()}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      const numDecimals = esdtOnNetwork?.data?.decimals;

      if (numDecimals !== undefined && numDecimals !== null) {
        const payment = TokenPayment.fungibleFromAmount(
          values.ticker,
          values.amount,
          numDecimals
        );
        const data = new ESDTTransferPayloadBuilder().setPayment(payment).build();
  
        const gasLimit = 500000;
      
        handleSendTx(data, values.address, gasLimit);
      };

      resolve();
      reset();
    });
  }

  ///// Form Placeholders & Default Values
  const formTicker = 'ABC-123456';
  const formAddress = 'erd1...';

  return (
    <Flex direction="row" justifyContent="center">
      <Box
        width="650px"
        borderWidth="1px"
        borderRadius="5px"
        borderColor={useColorModeValue('gray.500', 'gray.500')}
        flexDirection="row"
        justifyContent="space-between"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" justifyContent="center">
            <FormControl isInvalid={!!errors?.address}>
              <Center>
                <Flex direction="column">
                  <FormLabel
                    htmlFor="address"
                    color={useColorModeValue(
                      'blackAlpha.700',
                      'whiteAlpha.600'
                    )}
                  >
                    Wallet Address
                  </FormLabel>
                  <Input
                    id="address"
                    placeholder={formAddress}
                    variant="owner"
                    width="562px"
                    {...register('address', {
                      pattern: {
                        value: /^[a-zA-Z0-9]+$/,
                        message: 'Alphanumeric characters only',
                      },
                    })}
                  />
                  <FormErrorMessage color="red.700" mb="4px" mt="-20px">
                    {errors.address && errors.address.message}
                  </FormErrorMessage>
                </Flex>
              </Center>
            </FormControl>
            <Flex direction="row">
              <Spacer />
              <Flex direction="column">
                <Flex
                  direction="row"
                  justifyContent="space-between"
                  width="full"
                >
                  <FormControl isInvalid={!!errors?.ticker}>
                    <FormLabel
                      htmlFor="ticker"
                      color={useColorModeValue(
                        'blackAlpha.700',
                        'whiteAlpha.600'
                      )}
                    >
                      Token Ticker
                    </FormLabel>
                    <Input
                      id="ticker"
                      placeholder={formTicker}
                      variant="owner"
                      {...register('ticker', {
                        required: 'This is required',
                        minLength: {
                          value: 10,
                          message: 'At least 10 characters',
                        },
                        maxLength: {
                          value: 17,
                          message: 'No more than 17 characters',
                        },
                        pattern: {
                          value: /^[A-Z]+-[a-zA-Z0-9]+$/,
                          message: 'Invalid Tocken Ticker',
                        },
                      })}
                    />
                    <FormErrorMessage color="red.700" mb="4px" mt="-20px">
                      {errors.ticker && errors.ticker.message}
                    </FormErrorMessage>
                  </FormControl>
                  <Spacer minWidth="10px" />
                  <FormControl isInvalid={!!errors?.amount}>
                    <FormLabel
                      htmlFor="amount"
                      color={useColorModeValue(
                        'blackAlpha.700',
                        'whiteAlpha.600'
                      )}
                    >
                      Amount
                    </FormLabel>
                    <Input
                      id="amount"
                      variant="owner"
                      {...register('amount', {
                        required: 'This is required',
                        pattern: {
                          value: /^[0-9]+$/,
                          message: 'Must be a number',
                        },
                      })}
                    />
                    <FormErrorMessage color="red.700" mb="4px" mt="-20px">
                      {errors.amount && errors.amount.message}
                    </FormErrorMessage>
                  </FormControl>
                </Flex>
              </Flex>
              <Spacer />
            </Flex>
            <Grid
              h="80px"
              templateRows="repeat(1, 1fr)"
              templateColumns="repeat(4, 1fr)"
              gap={4}
            >
              <GridItem rowSpan={1} colSpan={1} />
              <GridItem rowSpan={1} colSpan={1}>
                <Center>
                  {isAreYouSureOpen ? (
                    <Button
                      onClick={onAreYouSureToggle}
                      mt="30px"
                      variant="owner"
                    >
                      Change
                    </Button>
                  ) : (
                    <Button
                      onClick={onAreYouSureToggle}
                      mt="30px"
                      variant="owner"
                    >
                      Submit
                    </Button>
                  )}
                </Center>
              </GridItem>
              <GridItem rowSpan={1} colSpan={1}>
                <Center>
                  {isAreYouSureOpen && (
                    <Button variant="owner" type="submit" mt="30px">
                      Confirm
                    </Button>
                  )}
                </Center>
              </GridItem>
              <GridItem rowSpan={1} colSpan={1} />
            </Grid>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};
export default SendEsdt;
