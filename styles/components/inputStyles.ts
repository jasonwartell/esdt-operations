import { mode } from '@chakra-ui/theme-tools';

export const InputStyles = {
  // style object for base or default style
  baseStyle: {},
  // styles for different sizes ("sm", "md", "lg")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {
    owner: (props: any) => ({
      field: {
        bg: mode('gray.500', 'gray.900')(props),
        color: mode('teal.400', 'teal.800')(props),
        borderColor: mode('teal.400', 'teal.800')(props),
        borderWidth: '1px',
        borderRadius: '5px',
        width: '160px',
        px: '10px',
        mb: '20px',
        autoComplete: 'off',
      },
    }),
  },
  // default values for 'size', 'variant' and 'colorScheme'
  defaultProps: {
    size: '',
    variant: '',
    colorScheme: '',
  },
};
