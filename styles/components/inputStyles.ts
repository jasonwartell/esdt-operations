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
          px: '5px',
          
          autoComplete: 'off',
          _autofill: {
            border: "1px solid #56CFC8",
            textFillColor: '#56CFC8',
            boxShadow: "0 0 0px 1000px #72777D inset",
            transition: "background-color 5000s ease-in-out 0s",
          }
        },
    }),
  },
  // default values for 'size', 'variant' and 'colorScheme'
  defaultProps: {
    size: '',
    variant: 'owner',
    colorScheme: '',
  },
};
