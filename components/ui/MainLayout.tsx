import { Box, useColorModeValue } from '@chakra-ui/react';
import React, { FC } from 'react';
import { Footer } from './Footer';

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout: FC<MainLayoutProps> = ({children}) => {
  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} minHeight="100vh">
      {children}
      <Footer />
    </Box>
  );
};
