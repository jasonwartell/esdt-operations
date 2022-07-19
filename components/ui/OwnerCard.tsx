import { Flex, Box, chakra, FlexProps, BoxProps, useColorModeValue } from '@chakra-ui/react';
import { FC } from 'react';

export const OwnerCard: FC<BoxProps> = ({ children, ...props }) => {
  const Wrapper = chakra(Box, {
    baseStyle: {
      backgroundColor: useColorModeValue('gray.300', 'gray.800'),
      color: useColorModeValue('teal.400', 'teal.800'),
      minWidth: '340px',
      ml: '5px',
      mr: '5px',
      mt: '5px',
      borderWidth: '3px',
      borderColor: useColorModeValue('teal.400', 'teal.800'),
      padding: '2px',
      borderRadius: '2xl',
      ...props,
    },
  });
  return <Wrapper>{children}</Wrapper>;
};