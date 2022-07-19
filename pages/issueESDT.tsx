import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { NavBar } from '../components/ui/NavBar';
import { Authenticated } from '../components/tools/Authenticated';
import { MainLayout } from '../components/ui/MainLayout';
import { OwnerActions } from '../components/ui/OwnerActions';
import TokenTx from '../components/ui/TokenTx';

const IssueESDT = () => {
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
          pb="5px"
        >
          <TokenTx tokenTx={'issue'} />
          <OwnerActions />
        </Box>
      </Authenticated>
    </MainLayout>
  );
};
export default IssueESDT;
