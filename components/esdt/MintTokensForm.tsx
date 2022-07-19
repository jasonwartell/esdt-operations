import Bignumber from 'bignumber.js';
import {
  BytesValue,
  TypedValue,
  ContractCallPayloadBuilder,
  ContractFunction,
  TransactionPayload,
  AddressValue,
  Address,
  BigUIntValue,
} from '@elrondnetwork/erdjs';
import { useCallback } from 'react';
import {
  Box,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Center,
  Flex,
  useColorModeValue,
  Checkbox,
  CheckboxGroup,
  Stack,
  useDisclosure,
  Grid,
  GridItem,
  RadioGroup,
  Spacer,
  Radio,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useTransaction } from '../../hooks/core/useTransaction';
import { esdtLocalOpertationsGasLimit } from '../../config/config';
import { TransactionCb } from '../../hooks/core/common-helpers/sendTxOperations';
import { accountState } from '../../store/auth';

const MintTokensForm = ({ cb }: { cb: (params: TransactionCb) => void }) => {
  const { triggerTx } = useTransaction({ cb });

  const handleSendTx = useCallback(
    (data: TransactionPayload, payment: number, gas: number) => {
      triggerTx({
        address: accountState.address,
        data: data,
        gasLimit: gas,
        value: payment,
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
    return new Promise<void>((resolve) => {
      const gas = esdtLocalOpertationsGasLimit;
      const cost = 0;

      const args: TypedValue[] = [
        BytesValue.fromUTF8(values.ticker),
        new BigUIntValue(new Bignumber(parseInt(values.supply))),
      ];

      const data = new ContractCallPayloadBuilder()
        .setFunction(
          new ContractFunction(
            values.mintOrBurn === 'mint' ? 'ESDTLocalMint' : 'ESDTLocalBurn'
          )
        )
        .setArgs(args)
        .build();

      handleSendTx(data, cost, gas);
      resolve();
      reset();
    });
  }

  ///// Form Placeholders & Default Values
  const formTicker = 'ABC-123456';
  const formSupply = 1000000000;

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
            Mint or Burn ESDT
          </Center>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            templateRows={'repeat(4, 1fr)'}
            templateColumns={'repeat(7, 1fr)'}
          >
            <GridItem rowSpan={1} colSpan={7}>
              <FormControl>
                <FormLabel
                  mb="2px"
                  textAlign="center"
                  color={useColorModeValue('blackAlpha.700', 'whiteAlpha.600')}
                >
                  Select MINT or BURN
                </FormLabel>
                <RadioGroup colorScheme="teal" defaultValue="mint">
                  <Stack spacing={5} direction="row" justifyContent="center">
                    <Radio
                      value="mint"
                      color={useColorModeValue(
                        'blackAlpha.700',
                        'whiteAlpha.600'
                      )}
                      {...register('mintOrBurn')}
                    >
                      Mint
                    </Radio>
                    <Radio
                      value="burn"
                      color={useColorModeValue(
                        'blackAlpha.700',
                        'whiteAlpha.600'
                      )}
                      {...register('mintOrBurn')}
                    >
                      Burn
                    </Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
            </GridItem>
            <GridItem rowSpan={1} colSpan={7} px={['2px', '5px']}>
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
                      value: /^[A-Z]+-[a-zA-Z0-9]+$/,
                      message: 'Invalid Tocken Ticker',
                    },
                  })}
                />
                <FormErrorMessage color="red.700" mb="4px" mt="0px">
                  {errors.ticker && errors.ticker.message}
                </FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem rowSpan={1} colSpan={7} px={['2px', '5px']}>
              <FormControl isInvalid={!!errors?.supply}>
                <FormLabel
                  htmlFor="supply"
                  mb="0px"
                  color={useColorModeValue('blackAlpha.700', 'whiteAlpha.600')}
                  fontSize={['sm', 'md']}
                >
                  Amount to Mint
                </FormLabel>
                <Input
                  id="supply"
                  defaultValue={formSupply}
                  variant="owner"
                  {...register('supply', {
                    required: 'This is required',
                    pattern: {
                      value: /^[0-9]+$/,
                      message: 'Must be a number',
                    },
                  })}
                />
                <FormErrorMessage color="red.700" mb="4px" mt="0px">
                  {errors.supply && errors.supply.message}
                </FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem
              rowStart={4}
              colStart={2}
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
              colStart={5}
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
export default MintTokensForm;
