import { Box, Center, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { NavBar } from '../components/ui/NavBar';
import { Authenticated } from '../components/tools/Authenticated';
import { MainLayout } from '../components/ui/MainLayout';
import { OwnerActions } from '../components/ui/OwnerActions';
import { Icon } from '@chakra-ui/react';
import { IoIosConstruct } from 'react-icons/io';

const UnderConstruction = () => {
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
          justifyContent="center"
          width="100vw"
          mt="0px"
          mb="0px"
          pb="5px"
        >
          <Flex direction="row" justifyContent="center" mt="10px">
            <Box
              flex-direction="column"
              justifyContent="center"
              px="5px"
              py="100px"
              mx="20px"
              height="346px"
              width={['full', 'full', '650px']}
              borderWidth="3px"
              borderRadius="5px"
              color={useColorModeValue('teal.400', 'teal.800')}
              bg={useColorModeValue('gray.500', 'gray.900')}
              borderColor={useColorModeValue('teal.400', 'teal.800')}
            >
              <Center flexDirection="column">
                <Icon
                  as={IoIosConstruct}
                  w={[20]}
                  h={[20]}
                  color={useColorModeValue('teal.400', 'teal.800')}
                  mb="20px"
                />
                <Text fontWeight={800} fontSize={["lg", "3xl"]}>
                  Page under Construction
                </Text>
              </Center>
            </Box>
          </Flex>
          <OwnerActions />
        </Box>
      </Authenticated>
    </MainLayout>
  );
};
export default UnderConstruction;
