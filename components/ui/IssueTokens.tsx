import Bignumber from 'bignumber.js';
import {
  BytesValue,
  U32Value,
  BigUIntValue,
  TypedValue,
  ContractCallPayloadBuilder,
  ContractFunction,
  TransactionPayload,
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
  Spacer,
  useColorModeValue,
  Checkbox,
  CheckboxGroup,
  Stack,
  useDisclosure,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useTransaction } from '../../hooks/core/useTransaction';
import { builtInEsdtSC, esdtTokenProperties } from '../../config/config';
import { TransactionCb } from '../../hooks/core/common-helpers/sendTxOperations';


const IssueTokens = ({ cb }: { cb: (params: TransactionCb) => void }) => {
  const { isOpen: isAreYouSureOpen, onToggle: onAreYouSureToggle } =
    useDisclosure();

  const { triggerTx } = useTransaction({ cb });

  const handleSendTx = useCallback(
    (data: TransactionPayload,  payment: number, gas: number) => {
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
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  function onSubmit(values: any) {
    return new Promise<void>((resolve) => {
      const gas = parseInt(values.gasLimit);

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
        
      handleSendTx(data, values.cost, gas);
      resolve();
      reset();
    });
  }

  ///// Form Placeholders & Default Values
  const formName = 'Leer';
  const formTicker = 'JET';
  const formCost = 0.05;
  const formSupply = 1000e6;
  const formGas = 6e7;
  const formDecimals = 6;

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
          <Flex direction="column">
            <Flex direction="row">
              <Spacer />
              <Flex direction="column">
                <Flex
                  direction="row"
                  justifyContent="space-between"
                  width="full"
                >
                  <FormControl isInvalid={!!errors?.name}>
                    <FormLabel
                      htmlFor="name"
                      color={useColorModeValue(
                        'blackAlpha.700',
                        'whiteAlpha.600'
                      )}
                    >
                      Token Name
                    </FormLabel>
                    <Input
                      id="name"
                      defaultValue={formName}
                      variant="owner"
                      {...register('name', {
                        required: true,
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
                    <FormErrorMessage color="red.700" mb="4px" mt="-20px">
                      {errors.name && errors.name.message}
                    </FormErrorMessage>
                  </FormControl>
                  <Spacer minWidth="10px" />
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
                    <FormErrorMessage color="red.700" mb="4px" mt="-20px">
                      {errors.ticker && errors.ticker.message}
                    </FormErrorMessage>
                  </FormControl>
                </Flex>
                <Flex direction="row">
                  <FormControl isInvalid={!!errors?.supply}>
                    <FormLabel
                      htmlFor="supply"
                      color={useColorModeValue(
                        'blackAlpha.700',
                        'whiteAlpha.600'
                      )}
                    >
                      Initial Supply
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
                  <Spacer minWidth="10px" />
                  <FormControl isInvalid={!!errors?.decimals}>
                    <FormLabel
                      htmlFor="decimals"
                      color={useColorModeValue(
                        'blackAlpha.700',
                        'whiteAlpha.600'
                      )}
                    >
                      Number of Decimals
                    </FormLabel>
                    <Input
                      id="decimals"
                      defaultValue={formDecimals}
                      variant="owner"
                      {...register('decimals', {
                        required: 'This is required',
                        pattern: {
                          value: /^[0-9]+$/,
                          message: 'Must be a number',
                        },
                      })}
                    />
                    <FormErrorMessage color="red.700" mb="4px" mt="-20px">
                      {errors.decimals && errors.decimals.message}
                    </FormErrorMessage>
                  </FormControl>
                </Flex>
                <Flex direction="row">
                  <FormControl isInvalid={!!errors?.cost}>
                    <FormLabel
                      htmlFor="cost"
                      color={useColorModeValue(
                        'blackAlpha.700',
                        'whiteAlpha.600'
                      )}
                    >
                      Value
                    </FormLabel>
                    <Input
                      id="cost"
                      defaultValue={formCost}
                      variant="owner"
                      {...register('cost', {
                        required: 'This is required',
                      })}
                    />
                    <FormErrorMessage color="red.700" mt="0px" mb="-16px">
                      {errors.cost && errors.cost.message}
                    </FormErrorMessage>
                  </FormControl>
                  <Spacer minWidth="10px" />
                  <FormControl isInvalid={!!errors?.gas}>
                    <FormLabel
                      htmlFor="gas"
                      color={useColorModeValue(
                        'blackAlpha.700',
                        'whiteAlpha.600'
                      )}
                    >
                      Gas Limit
                    </FormLabel>
                    <Input
                      id="gas"
                      defaultValue={formGas}
                      variant="owner"
                      {...register('gasLimit', {
                        required: 'This is required',
                        pattern: {
                          value: /^[0-9]+$/,
                          message: 'Must be a number',
                        },
                      })}
                    />
                    <FormErrorMessage color="red.700" mt="0px" mb="-16px">
                      {errors.gas && errors.gas.message}
                    </FormErrorMessage>
                  </FormControl>
                </Flex>
              </Flex>
              <Spacer />
              <Flex direction="row" justifyContent="space-between">
                <Spacer />
                <Flex direction="column" mt="0px">
                  <FormControl>
                    <FormLabel
                      mb="2px"
                      color={useColorModeValue(
                        'blackAlpha.700',
                        'whiteAlpha.600'
                      )}
                    >
                      Token Attributes
                    </FormLabel>
                    <CheckboxGroup
                      colorScheme="gray"
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
                          iconColor={useColorModeValue('teal.400', 'teal.800')}
                          value="canFreeze"
                          color={useColorModeValue(
                            'blackAlpha.700',
                            'whiteAlpha.600'
                          )}
                          {...register('canFreeze')}
                        >
                          Can Freeze
                        </Checkbox>
                        <Checkbox
                          iconColor={useColorModeValue('teal.400', 'teal.800')}
                          value="canWipe"
                          color={useColorModeValue(
                            'blackAlpha.700',
                            'whiteAlpha.600'
                          )}
                          {...register('canWipe')}
                        >
                          Can Wipe
                        </Checkbox>
                        <Checkbox
                          iconColor={useColorModeValue('teal.400', 'teal.800')}
                          value="canPause"
                          color={useColorModeValue(
                            'blackAlpha.700',
                            'whiteAlpha.600'
                          )}
                          {...register('canPause')}
                        >
                          Can Pause
                        </Checkbox>
                        <Checkbox
                          iconColor={useColorModeValue('teal.400', 'teal.800')}
                          value="canMint"
                          color={useColorModeValue(
                            'blackAlpha.700',
                            'whiteAlpha.600'
                          )}
                          {...register('canMint')}
                        >
                          Can Mint
                        </Checkbox>
                        <Checkbox
                          iconColor={useColorModeValue('teal.400', 'teal.800')}
                          value="canBurn"
                          color={useColorModeValue(
                            'blackAlpha.700',
                            'whiteAlpha.600'
                          )}
                          {...register('canBurn')}
                        >
                          Can Burn
                        </Checkbox>
                        <Checkbox
                          iconColor={useColorModeValue('teal.400', 'teal.800')}
                          value="canChangeOwner"
                          color={useColorModeValue(
                            'blackAlpha.700',
                            'whiteAlpha.600'
                          )}
                          {...register('canChangeOwner')}
                        >
                          Can Change Owner
                        </Checkbox>
                        <Checkbox
                          iconColor={useColorModeValue('teal.400', 'teal.800')}
                          value="canUpgrade"
                          color={useColorModeValue(
                            'blackAlpha.700',
                            'whiteAlpha.600'
                          )}
                          {...register('canUpgrade')}
                        >
                          Can Upgrade
                        </Checkbox>
                        <Checkbox
                          iconColor={useColorModeValue('teal.400', 'teal.800')}
                          value="canAddSpecialRoles"
                          color={useColorModeValue(
                            'blackAlpha.700',
                            'whiteAlpha.600'
                          )}
                          {...register('canAddSpecialRoles')}
                        >
                          Can Add Special Roles
                        </Checkbox>
                      </Stack>
                    </CheckboxGroup>
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
export default IssueTokens;
