import {
  BytesValue,
  TypedValue,
  ContractCallPayloadBuilder,
  ContractFunction,
  Address,
  TransactionPayload,
  AddressValue,
} from '@elrondnetwork/erdjs';
import { useCallback } from 'react';
import {
  builtInEsdtSC,
  esdtOpertationsGasLimit,
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
  Stack,
  useDisclosure,
  Grid,
  GridItem,
  RadioGroup,
  Radio,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useTransaction } from '../../hooks/core/useTransaction';

const FreezeUnfreeze = ({ cb }: { cb: (params: TransactionCb) => void }) => {
  const { isOpen: isAreYouSureOpen, onToggle: onAreYouSureToggle } =
    useDisclosure();

  const { triggerTx } = useTransaction({ cb });

  const handleSendTx = useCallback(
    (data: TransactionPayload) => {
      triggerTx({
        address: builtInEsdtSC,
        data: data,
        gasLimit: esdtOpertationsGasLimit,
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
    return new Promise<void>((resolve) => {
      const args: TypedValue[] = [
        BytesValue.fromUTF8(values.ticker),
        new AddressValue(new Address(values.address.trim())),
      ];

      const data = new ContractCallPayloadBuilder()
        .setFunction(
          new ContractFunction(
            values.freezeUnfreeze === 'freeze' ? 'freeze' : 'unFreeze'
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
            <FormControl>
              <Flex direction="row" justifyContent="center">
                <Spacer />
                <FormLabel
                  mb="2px"
                  color={useColorModeValue('blackAlpha.700', 'whiteAlpha.600')}
                >
                  Select Freeze or Unfreeze
                </FormLabel>
                <Spacer />
              </Flex>
              <Flex direction="row" justifyContent="center">
                <Spacer />
                <RadioGroup colorScheme="gray" defaultValue={'freeze'}>
                  <Stack spacing={5} direction="row">
                    <Radio
                      value="freeze"
                      color={useColorModeValue(
                        'blackAlpha.700',
                        'whiteAlpha.600'
                      )}
                      {...register('freezeUnfreeze')}
                    >
                      Freeze
                    </Radio>
                    <Radio
                      value="unFreeze"
                      color={useColorModeValue(
                        'blackAlpha.700',
                        'whiteAlpha.600'
                      )}
                      {...register('freezeUnfreeze')}
                    >
                      Unfreeze
                    </Radio>
                  </Stack>
                </RadioGroup>
                <Spacer />
              </Flex>
            </FormControl>
            <Flex direction="row">
              <Spacer />
              <Flex direction="column">
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
export default FreezeUnfreeze;
