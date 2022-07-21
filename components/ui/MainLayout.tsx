import { Box, useColorModeValue } from '@chakra-ui/react';
import React, { FC, memo } from 'react';
import { MetaHead } from './MetaHead';
import { Footer } from './Footer';

type MainLayoutProps = {
  children: React.ReactNode;
  metaTitle: any;
  metaDescription: any;
  metaImage: any;
  metaUrl: any;
};

export const MainLayout: FC<MainLayoutProps> = memo(
  ({ children, metaTitle, metaDescription, metaImage, metaUrl }) => {
    return (
      <>
        <MetaHead
          metaTitle={metaTitle}
          metaDescription={metaDescription}
          metaImage={metaImage}
          metaUrl={metaUrl}
        />
        <Box
          bg={useColorModeValue('gray.100', 'gray.900')}
          minHeight="100vh"
          height="fit-content"
        >
          {children}
        </Box>
        <Footer />
      </>
    );
  },
  (prev, next) =>
    prev.metaTitle === next.metaTitle &&
    prev.metaDescription === next.metaDescription &&
    prev.metaImage === next.metaImage &&
    prev.metaUrl === next.metaUrl
);

MainLayout.displayName = 'MainLayout';
