import { mode } from '@chakra-ui/theme-tools';

export const ButtonStyles = {
  // style object for base or default style
  baseStyle: {},
  // styles for different sizes ("sm", "md", "lg")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {
    navbar: (props: any) => ({
      bg: mode('gray.500', 'gray.900')(props),
      color: mode('teal.600', 'teal.600')(props),
      padding: '1px',
      border: '1px',
      borderRadius: '5px',
      borderColor: mode('teal.600', 'teal.600')(props),
      textAlign: 'center',
      alignItems: 'center',
      alignContent: 'center',
      fontSize: ['xx-small', 'xx-small', 'xs', 'sm'],
      fontWeight: '500',
      _hover: {
        bg: mode('gray.400', 'gray.700')(props),
        color: mode('teal.200', 'teal.200')(props),
        fontWeight: '800',
        transform: 'scale(1.02)',
      },
    }),
    owner: (props: any) => ({
      mb: '10px',
      bg: mode('gray.500', 'gray.900')(props),
      color: mode('teal.400', 'teal.800')(props),
      borderColor: mode('teal.400', 'teal.800')(props),
      borderWidth: '1px',
      borderRadius: '5px',
      width: '150px',
      height: '36px',
      px: '10px',
      _hover: {
        bg: mode('gray.400', 'gray.700')(props),
        color: mode('teal.200', 'teal.200')(props),
        fontWeight: '800',
        transform: 'scale(1.02)',
      },
    }),
    grid: (props: any) => ({
      bg: mode('gray.500', 'gray.900')(props),
      color: mode('teal.400', 'teal.800')(props),
      borderColor: mode('teal.400', 'teal.800')(props),
      borderWidth: '1px',
      borderRadius: '5px',
      width: 'full',
      height: 'full',
      _hover: {
        bg: mode('gray.400', 'gray.700')(props),
        color: mode('teal.200', 'teal.200')(props),
        fontWeight: '800',
        transform: 'scale(1.02)',
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
