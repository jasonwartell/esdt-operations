import { Container, Box, Text, useColorModeValue, Flex, Spacer } from '@chakra-ui/react';
import packageJson from '../../package.json';

export const Footer = () => {
  return (
    <Box
      width="100%"
      height="60px"
      bgColor={useColorModeValue('gray.200', 'gray.800')}
      borderTopWidth="1px"
      borderTopColor={useColorModeValue('teal.600', 'teal.600')}
      color={useColorModeValue('blackAlpha.700', 'whiteAlpha.600')}
      display="flex"
      alignItems="center"
    >
      <Container
        maxW="container.xl"
        fontSize="sm"
        fontWeight="normal"
        textAlign="center"
      >
        <Box>ESDT Operations Plugin (v{`${packageJson.version}`})</Box>
        <Flex direction="row" fontSize="xs" alignContent="center">
          <Spacer />
        <Box fontSize="xs">
          Adapted from next-js-dapp by  
        </Box>
        <Box width="5px"/>
        <Box fontSize="xs" fontWeight="bold">
          <Text
            as="a"
            href="https://github.com/ElrondDevGuild"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            {"Elrond's Dev Guild"}
          </Text>
        </Box>
        <Box width="5px"/>
        <Box fontSize="xs">
          and work by  
        </Box>
        <Box width="5px"/>
        <Box fontSize="xs" fontWeight="bold">
          <Text
            as="a"
            href="https://github.com/juliancwirko"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            {"Julian Ćwirko"}
          </Text>
        </Box> 
        <Spacer />
        </Flex>
      </Container>
    </Box>
  );
};
