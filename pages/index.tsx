import { NavBar } from '../components/ui/NavBar';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { Authenticated } from '../components/tools/Authenticated';
import { MainLayout } from '../components/ui/MainLayout';
import { OwnerActions } from '../components/tools/OwnerActions';

function OwnerPage() {
  return (
    <MainLayout>
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
        <Box height="100vh" width="full">
          <OwnerActions />
        </Box>
      </Authenticated>
    </MainLayout>
  );
}

export default OwnerPage;
