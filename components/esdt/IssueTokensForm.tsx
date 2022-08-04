import Bignumber from 'bignumber.js';
import {
  BigUIntValue,
  BytesValue,
  ContractCallPayloadBuilder,
  ContractFunction,
  TransactionPayload,
  TypedValue,
  U32Value,
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
  Stack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useTransaction } from '../../hooks/core/useTransaction';
import {
  builtInEsdtSC,
  esdtOperationsGasLimit,
  esdtTokenProperties,
  issueTokenPayment,
} from '../../config/config';
import { TransactionCb } from '../../hooks/core/common-helpers/sendTxOperations';

const IssueTokensForm = ({ cb }: { cb: (params: TransactionCb) => void }) => {
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
      const cost = issueTokenPayment;

      const esdtTokenPropertiesEnabled = [
        values.canFreeze,
        values.canWipe,
        values.canPause,
        values.canMint,
        values.canBurn,
        values.canChangeOwner,
        values.canUpgrade,
        values.canAddSpecialRoles,
      ];
      const args: TypedValue[] = [
        BytesValue.fromUTF8(values.name),
        BytesValue.fromUTF8(values.ticker),
        new BigUIntValue(new Bignumber(parseInt(values.supply))),
        new U32Value(parseInt(values.decimals)),
      ];

      for (let i = 0; i < 8; i++) {
        args.push(BytesValue.fromUTF8(esdtTokenProperties[i]));
        {
          esdtTokenProperties[i] == esdtTokenPropertiesEnabled[i]
            ? args.push(BytesValue.fromUTF8(true.toString()))
            : args.push(BytesValue.fromUTF8(false.toString()));
        }
      }

      const data = new ContractCallPayloadBuilder()
        .setFunction(new ContractFunction('issue'))
        .setArgs(args)
        .build();

      handleSendTx(data, cost, gas);
      resolve();
      reset();
    });
  }

  ///// Form Placeholders & Default Values
  const formName = 'Abcd';
  const formTicker = 'ABC';
  const formSupply = '0';
  const formDecimals = '0';

  ///// Color Scheme
  const checkboxColor = useColorModeValue('teal.400', 'black');
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
        width={['full', 'full', '650px']}
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
            Issue an ESDT
          </Center>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            templateRows={['repeat(6, 1fr)', 'repeat(4, 1fr)']}
            templateColumns={['repeat(8, 1fr)', 'repeat(24, 1fr)']}
          >
            <GridItem rowSpan={1} colSpan={[8, 16]} px={['2px', '5px']}>
              <FormControl isInvalid={!!errors?.name}>
                <FormLabel
                  htmlFor="name"
                  mb="0px"
                  color={formLabelColor}
                  fontSize={['sm', 'md']}
                >
                  Token Name
                </FormLabel>
                <Input
                  id="name"
                  placeholder={formName}
                  variant="owner"
                  width="full"
                  {...register('name', {
                    required: 'This is required',
                    minLength: {
                      value: 3,
                      message: 'Must be at least 3 characters',
                    },
                    maxLength: {
                      value: 20,
                      message: 'Must be less than 20 characters',
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9]+$/,
                      message: 'Alphanumeric characters only',
                    },
                  })}
                />
                <FormErrorMessage color={errorColor} mb="4px" mt="0px">
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem rowSpan={1} colSpan={[8, 16]} px={['2px', '5px']}>
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
                      value: 3,
                      message: 'Must be at least 3 characters',
                    },
                    maxLength: {
                      value: 10,
                      message: 'Must be less than 10 characters',
                    },
                    pattern: {
                      value: /^[A-Z0-9]+$/,
                      message: 'Alphanumeric UPPERCASE only',
                    },
                  })}
                />
                <FormErrorMessage color={errorColor} mb="4px" mt="0px">
                  {errors.ticker && errors.ticker.message}
                </FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem rowSpan={1} colSpan={[4, 6]} px={['2px', '5px']}>
              <FormControl isInvalid={!!errors?.decimals}>
                <FormLabel
                  htmlFor="decimals"
                  mb="0px"
                  color={formLabelColor}
                  fontSize={['sm', 'md']}
                >
                  Decimals
                </FormLabel>
                <Input
                  id="decimals"
                  placeholder={formDecimals}
                  variant="owner"
                  textAlign="right"
                  {...register('decimals', {
                    required: 'This is required',
                    min: {
                      value: 0,
                      message: 'Must be between 0-18',
                    },
                    max: {
                      value: 18,
                      message: 'Must be between 0-18',
                    },
                    pattern: {
                      value: /^[0-9]+$/,
                      message: 'Must be a number',
                    },
                  })}
                />
                <FormErrorMessage color={errorColor} mb="4px" mt="0px">
                  {errors.decimals && errors.decimals.message}
                </FormErrorMessage>
              </FormControl>
            </GridItem>

            <GridItem rowSpan={1} colSpan={[4, 10]} px={['2px', '5px']}>
              <FormControl isInvalid={!!errors?.supply}>
                <FormLabel
                  htmlFor="supply"
                  mb="0px"
                  color={formLabelColor}
                  fontSize={['sm', 'md']}
                >
                  Initial Supply
                </FormLabel>
                <Input
                  id="supply"
                  placeholder={formSupply}
                  variant="owner"
                  textAlign="right"
                  {...register('supply', {
                    required: 'This is required',
                    min: {
                      value: 1,
                      message: 'Must be a real quantity',
                    },
                    pattern: {
                      value: /^[0-9]+$/,
                      message: 'Must be a number',
                    },
                  })}
                />
                <FormErrorMessage color={errorColor} mb="4px" mt="0px">
                  {errors.supply && errors.supply.message}
                </FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem
              rowStart={[4, 1]}
              colStart={[3, 17]}
              rowSpan={[3]}
              colSpan={[5, 8]}
            >
              <FormControl>
                <FormLabel
                  mb="2px"
                  color={formLabelColor}
                >
                  Token Attributes
                </FormLabel>
                <CheckboxGroup
                  colorScheme="gray"
                  size="sm"
                  defaultValue={[
                    'canFreeze',
                    'canWipe',
                    'canPause',
                    'canMint',
                    'canBurn',
                    'canChangeOwner',
                    'canUpgrade',
                    'canAddSpecialRoles',
                  ]}
                >
                  <Stack spacing={[1, 0]} direction={['column', 'column']}>
                    <Checkbox
                      iconColor={checkboxColor}
                      value="canFreeze"
                      color={formLabelColor}
                      {...register('canFreeze')}
                    >
                      Can Freeze
                    </Checkbox>
                    <Checkbox
                      iconColor={checkboxColor}
                      value="canWipe"
                      color={formLabelColor}
                      {...register('canWipe')}
                    >
                      Can Wipe
                    </Checkbox>
                    <Checkbox
                      iconColor={checkboxColor}
                      value="canPause"
                      color={formLabelColor}
                      {...register('canPause')}
                    >
                      Can Pause
                    </Checkbox>
                    <Checkbox
                      iconColor={checkboxColor}
                      value="canMint"
                      color={formLabelColor}
                      {...register('canMint')}
                    >
                      Can Mint
                    </Checkbox>
                    <Checkbox
                      iconColor={checkboxColor}
                      value="canBurn"
                      color={formLabelColor}
                      {...register('canBurn')}
                    >
                      Can Burn
                    </Checkbox>
                    <Checkbox
                      iconColor={checkboxColor}
                      value="canChangeOwner"
                      color={formLabelColor}
                      {...register('canChangeOwner')}
                    >
                      Can Change Owner
                    </Checkbox>
                    <Checkbox
                      iconColor={checkboxColor}
                      value="canUpgrade"
                      color={formLabelColor}
                      {...register('canUpgrade')}
                    >
                      Can Upgrade
                    </Checkbox>
                    <Checkbox
                      iconColor={checkboxColor}
                      value="canAddSpecialRoles"
                      color={formLabelColor}
                      {...register('canAddSpecialRoles')}
                    >
                      Can Add Special Roles
                    </Checkbox>
                  </Stack>
                </CheckboxGroup>
              </FormControl>
            </GridItem>
            <GridItem
              rowStart={[7, 4]}
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
              rowStart={[7, 4]}
              colStart={[6, 15]}
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
export default IssueTokensForm;
