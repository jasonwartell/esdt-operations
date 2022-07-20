import { Box, Center, Text, useColorModeValue } from '@chakra-ui/react';
import { WarningTwoIcon } from '@chakra-ui/icons';

const Forbidden = () => {
  return (
    <Center
      minHeight="100vh"
      flexDirection="column"
      justifyContent="center"
      width="100vw"
      mt="0px"
      mb="0px"
      pb="5px"
    >
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
          <WarningTwoIcon
            w={[20]}
            h={[20]}
            color={useColorModeValue('teal.400', 'teal.800')}
            mb="20px"
          />
          <Text fontWeight={800} fontSize={['lg', '3xl']}>
            403 - Forbidden
          </Text>
        </Center>
      </Box>
    </Center>
  );
};
export default Forbidden;
