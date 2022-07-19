import { Box, BoxProps, Center, useColorModeValue } from '@chakra-ui/react';
import { FC, useCallback } from 'react';

interface ActionButtonProps extends BoxProps {
  onClick: () => void;
  isFullWidth?: boolean;
  disabled?: boolean;
}

export const ActionButton: FC<ActionButtonProps> = ({
  children,
  onClick,
  isFullWidth = false,
  disabled = false,
  ...props
}) => {
  const handleClick = useCallback(() => {
    if (!disabled) {
      onClick?.();
    }
  }, [disabled, onClick]);

  return (
    <Center
      borderRadius="5px"
      bg={useColorModeValue('gray.500', 'gray.900')}
      color={useColorModeValue('teal.600', 'teal.600')}
      cursor={disabled ? 'not-allowed' : 'pointer'}
      _hover={
        disabled
          ? {}
          : {
              transform: 'scale(1.02)',
              fontWeight: '800',
              bg: useColorModeValue('gray.400', 'gray.700'),
              color: useColorModeValue('teal.200', 'teal.200'),
            }
      }
      height="36px"
      width={isFullWidth ? '100%' : ['60px', '80px', '80px', '100px', '120px']}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Center>
  );
};
