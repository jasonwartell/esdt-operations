import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { NavBar } from '../components/ui/NavBar';
import { Authenticated } from '../components/tools/Authenticated';
import { MainLayout } from '../components/ui/MainLayout';
import { OwnerActions } from '../components/ui/OwnerActions';
import TokenTx from '../components/tools/TokenTx';

const MintESDT = () => {
  const alphaColor = useColorModeValue('whiteAlpha.900', 'blackAlpha.600');


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
            color={alphaColor}
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
          <TokenTx tokenTx={'mint'} />
          <OwnerActions />
        </Box>
      </Authenticated>
    </MainLayout>
  );
};
export default MintESDT;
