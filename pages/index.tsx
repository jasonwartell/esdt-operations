import { NavBar } from '../components/ui/NavBar';
import { Box, Spacer, Text, useColorModeValue } from '@chakra-ui/react';
import { Authenticated } from '../components/tools/Authenticated';
import { MainLayout } from '../components/ui/MainLayout';
import { OwnerActions } from '../components/ui/OwnerActions';
import { Footer } from '../components/ui/Footer';

function OwnerPage() {
  return (
    <MainLayout
      metaTitle={undefined}
      metaDescription={undefined}
      metaImage={undefined}
      metaUrl={undefined}
    >
      <NavBar enabled={['auth']} />
      <Authenticated
        spinnerCentered
        fallback={
          <Text
            color={useColorModeValue('blackAlpha.700', 'whiteAlpha.600')}
            fontWeight="bold"
            fontSize="2xl"
            textAlign="center"
            mt={8}
            mb={8}
          >
            Connect your wallet!
          </Text>
        }
      >
        <Box
          minHeight="100vh"
          flexDirection="column"
          justifyContent="space-between"
          width="100vw"
          mt="0px"
          mb="0px"
        >
          <Box
            flex-direction="row"
            justifyContent="center"
            px="5px"
            height="356px"
          />
          <OwnerActions />
          
          <Spacer />
        </Box>
        
      </Authenticated>
    </MainLayout>
  );
}

export default OwnerPage;
