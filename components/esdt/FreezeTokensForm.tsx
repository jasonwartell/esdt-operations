import {
  Address,
  AddressValue,
  BytesValue,
  ContractCallPayloadBuilder,
  ContractFunction,
  TransactionPayload,
  TypedValue,
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
  Radio,
  RadioGroup,
  Stack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useTransaction } from '../../hooks/core/useTransaction';
import { builtInEsdtSC, esdtOperationsGasLimit } from '../../config/config';
import { TransactionCb } from '../../hooks/core/common-helpers/sendTxOperations';

const FreezeTokensForm = ({ cb }: { cb: (params: TransactionCb) => void }) => {
  const { triggerTx } = useTransaction({ cb });

  const handleSendTx = useCallback(
    (data: TransactionPayload, payment: number, gas: number) => {
      triggerTx({
        address: builtInEsdtSC,
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
      const gas = esdtOperationsGasLimit;
      const cost = 0;

      const args: TypedValue[] = [
        BytesValue.fromUTF8(values.ticker),
        new AddressValue(new Address(values.address.trim())),
      ];

      const data = new ContractCallPayloadBuilder()
        .setFunction(
          new ContractFunction(
            values.freezeOrUnfreeze === 'freeze' ? 'freeze' : 'unFreeze'
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
  const formAddress = 'erd1...';

  ///// Color Scheme
  const formLabelColor = useColorModeValue(
    'blackAlpha.700',
    'whiteAlpha.600'
  );
  const errorColor = useColorModeValue('red.600', 'red.500');
  const titleBackgroundColor = useColorModeValue('teal.400', 'teal.800');
  const titleTextColor = useColorModeValue('gray.500', 'gray.900');
  const titleBorderColor = useColorModeValue('gray.500', 'gray.900');
  const formBackgroundColor = useColorModeValue('gray.300', 'gray.800');
  const formBorderColor = useColorModeValue('teal.400', 'teal.800');

  return (
    <Flex direction="row" justifyContent="center" mt="10px">
      <Box
        width={['full', 'full', '400px']}
        height="fit-content"
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
            Freeze or Unfreeze ESDT
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
                  color={formLabelColor}
                >
                  Select Action
                </FormLabel>
                <RadioGroup colorScheme="teal" defaultValue="freeze">
                  <Stack spacing={5} direction="row" justifyContent="center">
                    <Radio
                      value="freeze"
                      color={formLabelColor}
                      {...register('freezeOrUnfreeze')}
                    >
                      Freeze
                    </Radio>
                    <Radio
                      value="unfreeze"
                      color={formLabelColor}
                      {...register('freezeOrUnfreeze')}
                    >
                      Unfreeze
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
                  color={formLabelColor}
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
                <FormErrorMessage color={errorColor} mb="4px" mt="0px">
                  {errors.ticker && errors.ticker.message}
                </FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem rowSpan={1} colSpan={7} px={['2px', '5px']}>
              <FormControl isInvalid={!!errors?.address}>
                <FormLabel
                  htmlFor="address"
                  mt="10px"
                  mb="0px"
                  color={formLabelColor}
                  fontSize={['sm', 'md']}
                >
                  Wallet Address
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
                <FormErrorMessage color={errorColor} mb="-16px" mt="0px">
                  {errors.address && errors.address.message}
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
export default FreezeTokensForm;
