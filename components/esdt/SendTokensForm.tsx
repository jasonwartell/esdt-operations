import axios from 'axios';
import {
  ESDTTransferPayloadBuilder,
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
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Input,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useTransaction } from '../../hooks/core/useTransaction';
import { chain, esdtSingleTransferGasLimit, publicApi } from '../../config/config';
import { TransactionCb } from '../../hooks/core/common-helpers/sendTxOperations';

const SendTokensForm = ({ cb }: { cb: (params: TransactionCb) => void }) => {
  const { triggerTx } = useTransaction({ cb });

  const handleSendTx = useCallback(
    (data: TransactionPayload, address: string, gas: number) => {
      triggerTx({
        address: address,
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
  
        const gasLimit = esdtSingleTransferGasLimit;
      
        handleSendTx(data, values.address, gasLimit);
      };

      resolve();
      reset();
    });
  }

  ///// Form Placeholders & Default Values
  const formTicker = 'ABC-123456';
  const formAddress = 'erd1...';
  const formAmount = 0;

  return (
    <Flex direction="row" justifyContent="center" mt="10px">
      <Box
        width={['full', 'full', '400px']}
        height="fit-content"
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
            Transfer ESDT
          </Center>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            templateRows={'repeat(3, 1fr)'}
            templateColumns={'repeat(24, 1fr)'}
          >
            <GridItem rowSpan={1} colSpan={24} px={['2px', '5px']}>
              <FormControl isInvalid={!!errors?.address}>
                <FormLabel
                  htmlFor="address"
                  mt="10px"
                  mb="0px"
                  color={useColorModeValue('blackAlpha.700', 'whiteAlpha.600')}
                  fontSize={['sm', 'md']}
                >
                  Recipient Address
                </FormLabel>
                <Input
                  id="address"
                  placeholder={formAddress}
                  variant="owner"
                  {...register('address', {
                    required: 'This is required',
                    pattern: {
                      value: /^erd1[a-zA-Z0-9]{58}$/,
                      message: 'Invalid wallet address',
                    },
                  })}
                />
                <FormErrorMessage color="red.700" mb="-16px" mt="0px">
                  {errors.address && errors.address.message}
                </FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem rowSpan={1} colSpan={12} px={['2px', '5px']}>
              <FormControl isInvalid={!!errors?.ticker}>
                <FormLabel
                  htmlFor="ticker"
                  mb="0px"
                  color={useColorModeValue('blackAlpha.700', 'whiteAlpha.600')}
                  fontSize={['sm', 'md']}
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
                      value: /^[A-Z]{3,10}-[a-z0-9]{6}$/,
                      message: 'Invalid Tocken Ticker',
                    },
                  })}
                />
                <FormErrorMessage color="red.700" mb="4px" mt="0px">
                  {errors.ticker && errors.ticker.message}
                </FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem rowSpan={1} colSpan={12} px={['2px', '5px']}>
              <FormControl isInvalid={!!errors?.amount}>
                <FormLabel
                  htmlFor="amount"
                  mb="0px"
                  color={useColorModeValue('blackAlpha.700', 'whiteAlpha.600')}
                  fontSize={['sm', 'md']}
                >
                  Amount to Send
                </FormLabel>
                <Input
                  id="amount"
                  type="number"
                  defaultValue={formAmount}
                  variant="owner"
                  {...register('amount', {
                    required: 'This is required',
                    min: {
                      value: 1e-30,
                      message: 'Must send >1e-30 tokens',
                    },
                  })}
                />
                <FormErrorMessage color="red.700" mb="4px" mt="0px">
                  {errors.amount && errors.amount.message}
                </FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem
              rowStart={3}
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
              rowStart={3}
              colStart={15}
              rowSpan={1}
              colSpan={2}
              px="5px"
            >
              <Center>
                {isAreYouSureOpen && (
                  <Button variant="owner" type="submit" mt="30px" width="fit-content">
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
export default SendTokensForm;
