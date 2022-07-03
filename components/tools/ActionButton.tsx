import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react';
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
    <Box
      borderRadius="5px"
      bg={useColorModeValue('gray.400', 'gray.600')}
      color={useColorModeValue('teal.200', 'teal.200')}
      cursor={disabled ? 'not-allowed' : 'pointer'}
      _hover={disabled ? {} : {transform: 'scale(1.02)',
    fontWeight: '800'}}
      width={isFullWidth ? '100%' : ['80px', '80px', '100px', '120px']}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Box>
  );
};
