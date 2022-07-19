import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import { ButtonStyles as Button } from './components/buttonStyles';
import { InputStyles as Input } from './components/inputStyles';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const config: ThemeConfig = {
  initialColorMode: 'system',
};

const breakpoints = createBreakpoints({
  sm: '480px',
  md: '768px',
  lg: '992px',
  xl: '1280px',
  '2xl': '1536px',
});

export const myTheme = extendTheme({
  config,
  global: {
    body: {
      minHeight: '100vh',
      overflowX: 'hidden',
    },
    '*': {
      '&::-webkit-scrollbar': {
        width: 1.5,
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: 'dappTemplate.dark.base',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'dappTemplate.light',
        borderRadius: 1.5,
      },
      scrollbarWidth: 'auto',
      scrollbarColor: 'dappTemplate.light dappTemplate.dark.base',
    },
  },
  colors: {
    newBlack: '#0B0C10',
    gray: {
      100: '#C5C6C7',
      200: '#B0B2B5',
      300: '#9C9FA2',
      400: '#878B90',
      500: '#72777D',
      600: '#5D636B',
      700: '#495058',
      800: '#343C46',
      900: '#1F2833',
    },
    teal: {
      100: '#66FCF1',
      200: '#62F1E7',
      300: '#5EE6DC',
      400: '#5ADAD2',
      500: '#56CFC8',
      600: '#51C4BD',
      700: '#4DB9B3',
      800: '#49ADA8',
      900: '#45A29E',
    },
  },
  components: {
    Button,
    Input,
    ...breakpoints,
  },
});
