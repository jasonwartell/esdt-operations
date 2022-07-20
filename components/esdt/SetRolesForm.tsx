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
  Checkbox,
  CheckboxGroup,
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
import { builtInEsdtSC, esdtOpertationsGasLimit } from '../../config/config';
import { TransactionCb } from '../../hooks/core/common-helpers/sendTxOperations';

const SetRolesForm = ({ cb }: { cb: (params: TransactionCb) => void }) => {
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
      const gas = esdtOpertationsGasLimit;
      const cost = 0;

      const args: TypedValue[] = [
        BytesValue.fromUTF8(values.ticker),
        new AddressValue(new Address(values.address.trim())),
      ];

      if (values.burn) {
        args.push(BytesValue.fromUTF8('ESDTRoleLocalBurn'));
      }
      if (values.mint) {
        args.push(BytesValue.fromUTF8('ESDTRoleLocalMint'));
      }

      const data = new ContractCallPayloadBuilder()
        .setFunction(new ContractFunction(
          values.setUnset === 'set' ? 'setSpecialRole' : 'unSetSpecialRole'))
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

  return (
    <Flex direction="row" justifyContent="center" mt="10px">
      <Box
        width={['full', 'full', '650px']}
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
            Set or Unset Special Roles
          </Center>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            templateRows={['repeat(4, 1fr)', 'repeat(3, 1fr)']}
            templateColumns={['repeat(7, 1fr)', 'repeat(24, 1fr)']}
          >
            <GridItem rowStart={1} colStart={2} rowSpan={1} colSpan={10}>
              <FormControl>
                <FormLabel
                  mb="2px"
                  textAlign="center"
                  color={useColorModeValue('blackAlpha.700', 'whiteAlpha.600')}
                >
                  Select Action
                </FormLabel>
                <RadioGroup colorScheme="teal" defaultValue={'set'}>
                  <Stack spacing={5} direction="row" justifyContent="center">
                    <Radio
                      value="set"
                      color={useColorModeValue(
                        'blackAlpha.700',
                        'whiteAlpha.600'
                      )}
                      {...register('setUnset')}
                    >
                      Set
                    </Radio>
                    <Radio
                      value="unset"
                      color={useColorModeValue(
                        'blackAlpha.700',
                        'whiteAlpha.600'
                      )}
                      {...register('setUnset')}
                    >
                      Unset
                    </Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
            </GridItem>
            <GridItem rowStart={1} colStart={13} rowSpan={1} colSpan={10}>
              <FormControl>
                <FormLabel
                  textAlign="center"
                  mb="0px"
                  color={useColorModeValue('blackAlpha.700', 'whiteAlpha.600')}
                  fontSize={['sm', 'md']}
                  width="full"
                >
                  Select Roles
                </FormLabel>
                <CheckboxGroup
                  colorScheme="gray"
                  defaultValue={['mint', 'burn']}
                >
                  <Stack spacing={5} direction="row" justifyContent="center">
                    <Checkbox
                      iconColor={useColorModeValue('teal.400', 'teal.800')}
                      value="mint"
                      color={useColorModeValue(
                        'blackAlpha.700',
                        'whiteAlpha.600'
                      )}
                      {...register('mint')}
                    >
                      Mint
                    </Checkbox>
                    <Checkbox
                      iconColor={useColorModeValue('teal.400', 'teal.800')}
                      value="burn"
                      color={useColorModeValue(
                        'blackAlpha.700',
                        'whiteAlpha.600'
                      )}
                      {...register('burn')}
                    >
                      Burn
                    </Checkbox>
                  </Stack>
                </CheckboxGroup>
              </FormControl>
            </GridItem>
            <GridItem
              rowSpan={1}
              colSpan={[7, 24]}
              px={['2px', '5px']}
            >
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
                <FormErrorMessage color="red.700" mb="-10px" mt="0px">
                  {errors.ticker && errors.ticker.message}
                </FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem rowSpan={1} colSpan={24} px={['2px', '5px']}>
              <FormControl isInvalid={!!errors?.address}>
                <FormLabel
                  htmlFor="address"
                  mt="10px"
                  mb="0px"
                  color={useColorModeValue('blackAlpha.700', 'whiteAlpha.600')}
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
                      value: /^[a-zA-Z0-9]+$/,
                      message: 'Alphanumeric characters only',
                    },
                  })}
                />
                <FormErrorMessage color="red.700" mb="-16px" mt="0px">
                  {errors.address && errors.address.message}
                </FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem
              rowStart={[5, 4]}
              colStart={[2, 7]}
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
              rowStart={[5, 4]}
              colStart={[5, 15]}
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
export default SetRolesForm;
