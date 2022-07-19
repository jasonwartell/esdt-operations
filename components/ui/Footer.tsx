import {
  Container,
  Box,
  Text,
  useColorModeValue,
  Flex,
  Spacer,
} from '@chakra-ui/react';
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
        <Flex direction={['column', 'row']} fontSize="xs" alignContent="center">
          <Spacer />
          <Flex direction="row" justifyContent="center" display={['none', 'flex']}>
            <Box fontSize="xs">Adapted from</Box>
            <Box width="5px" />
            <Box fontSize="xs" fontWeight="bold">
              <Text
                as="a"
                href="https://github.com/ElrondDevGuild"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                {"Elrond Dev Guild's"}
              </Text>
            </Box>
            <Box width="5px"></Box>
            <Box fontSize="xs">"next-js-dapp"</Box>
          </Flex>
          <Box width="5px" />
          <Flex direction="row" justifyContent="center">
            <Box fontSize="xs">developed by</Box>
            <Box width="5px" />
            <Box fontSize="xs" fontWeight="bold">
              <Text
                as="a"
                href="https://github.com/jasonwartell"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                {'Jason Wartell'}
              </Text>
            </Box>
          </Flex>
          <Spacer />
        </Flex>
      </Container>
    </Box>
  );
};
