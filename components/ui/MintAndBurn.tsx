import Bignumber from 'bignumber.js';
import {
  BytesValue,
  BigUIntValue,
  TypedValue,
  ContractCallPayloadBuilder,
  ContractFunction,
  TransactionPayload,
} from '@elrondnetwork/erdjs';
import { useCallback } from 'react';
import { esdtLocalOpertationsGasLimit } from '../../config/config';
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
  Stack,
  useDisclosure,
  Grid,
  GridItem,
  RadioGroup,
  Radio,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useTransaction } from '../../hooks/core/useTransaction';
import { accountState } from '../../store/auth';

const MintAndBurn = ({ cb }: { cb: (params: TransactionCb) => void }) => {
  const { isOpen: isAreYouSureOpen, onToggle: onAreYouSureToggle } =
    useDisclosure();

  const { triggerTx } = useTransaction({ cb });

  const handleSendTx = useCallback(
    (data: TransactionPayload) => {
      triggerTx({
        address: accountState.address,
        data: data,
        gasLimit: esdtLocalOpertationsGasLimit,
        value: 0.00,
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
    return new Promise<void>((resolve) => {

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

      handleSendTx(data);
      resolve();
      reset();
    });
  }

  ///// Form Placeholders & Default Values
  const formTicker = 'JET-';
  const formSupply = 1000e6;

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
            <FormControl>
              <Flex direction="row" justifyContent="center">
                <Spacer />
                <FormLabel
                  mb="2px"
                  color={useColorModeValue('blackAlpha.700', 'whiteAlpha.600')}
                >
                  Do You Want to MINT or BURN
                </FormLabel>
                <Spacer />
              </Flex>
              <Flex direction="row" justifyContent="center">
                <Spacer />
                <RadioGroup colorScheme="teal" defaultValue="mint">
                  <Stack spacing={5} direction="row">
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
                <Spacer />
              </Flex>
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
                      defaultValue={formTicker}
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
                  <FormControl isInvalid={!!errors?.supply}>
                    <FormLabel
                      htmlFor="supply"
                      color={useColorModeValue(
                        'blackAlpha.700',
                        'whiteAlpha.600'
                      )}
                    >
                      Amount
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
                    <FormErrorMessage color="red.700" mb="4px" mt="-20px">
                      {errors.supply && errors.supply.message}
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
export default MintAndBurn;
