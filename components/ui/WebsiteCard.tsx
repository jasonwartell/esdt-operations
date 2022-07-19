import {
  Box,
  useColorModeValue,
  Image,
  Center,
} from '@chakra-ui/react';
import NextLink from 'next/link';

export default function WebsiteCard(props: any) {

  return (
    <Box
      padding={0}
      flex-direction="column"
      alignItems="center"
      borderWidth="5px"
      borderColor={useColorModeValue('teal.600', 'teal.600')}
      width="300px"
      height="500px"
      borderRadius="10px"
    >
      <Center
        as="a"
        href={props.url1}
        target="_blank"
        height="17px"
        width="full"
        padding="0px"
        borderWidth="0px"
        borderTopRadius="6px"
        borderBottomRadius="none"
        bg={useColorModeValue('gray.500', 'gray.900')}
        color={useColorModeValue('teal.600', 'teal.600')}
        _hover={{
          bg: useColorModeValue('gray.400', 'gray.700'),
          color: useColorModeValue('teal.200', 'teal.200'),
          fontWeight: '800',
        }}
      >
        Visit Coastal Fermontory
      </Center>
      <NextLink href={props.route}>
        <Box
          cursor="pointer"
          bg={useColorModeValue('gray.500', 'gray.900')}
          color={useColorModeValue('teal.600', 'teal.600')}
          fontWeight="800"
          _hover={{
            bg: useColorModeValue('gray.400', 'gray.700'),
            color: useColorModeValue('teal.200', 'teal.200'),
            fontWeight: '1000',
          }}
        >
          <Image height="200px" width="full" src={props.image1} />
          <Center
            width="full"
            height="56px"
            fontSize="2xl"
          >
            {props.name}
          </Center>
          <Image height="200px" width="full" src={props.image2} />
        </Box>
      </NextLink>
      <Center
        as="a"
        href={props.url2}
        target="_blank"
        height="17px"
        width="full"
        padding="0px"
        borderWidth="0px"
        borderBottomRadius="6px"
        borderTopRadius="none"
        bg={useColorModeValue('gray.500', 'gray.900')}
        color={useColorModeValue('teal.600', 'teal.600')}
        _hover={{
          bg: useColorModeValue('gray.400', 'gray.700'),
          color: useColorModeValue('teal.200', 'teal.200'),
          fontWeight: '800',
        }}
      >
        Visit Bold Mariner
      </Center>
    </Box>
  );
}
