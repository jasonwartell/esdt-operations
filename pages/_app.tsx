import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { useElrondNetworkSync } from '../hooks/auth/useElrondNetworkSync';
import { myTheme } from '../styles/theme';

const EsdtOperations = ({ Component, pageProps }: AppProps) => {
  useElrondNetworkSync();
  return (
    <ChakraProvider resetCSS theme={myTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default EsdtOperations;
