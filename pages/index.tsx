import { NavBar } from '../components/ui/NavBar';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { Authenticated } from '../components/tools/Authenticated';
import { MainLayout } from '../components/ui/MainLayout';
import { OwnerActions } from '../components/tools/OwnerActions';

function OwnerPage() {
  return (
    <MainLayout>
<<<<<<< HEAD
      <NavBar enabled={['auth']} />
=======
      <HeaderMenu>
        <HeaderMenuButtons enabled={['auth']} />
      </HeaderMenu>
      <CardWrapper mb={4}>
        <Text mb={4}>
          Here is the demo of an Elrond dapp for interactions with the
          blockchain and smart contracts. It provides four different ways of
          authentication and also a couple of React-based helpers/hooks. It is
          based on NextJS and uses erdjs SDK. It also uses Chakra UI. Heavily
          based on the{' '}
          <Link
            textDecoration="underline"
            href="https://www.elven.tools/docs/minter-dapp-introduction.html"
          >
            Elven Tools Dapp
          </Link>
        </Text>
        <Text mb={4}>
          We have hardcoded a setup for three different operations to simplify
          things. These are:
        </Text>
        <OrderedList mb={4}>
          <ListItem>Simple EGLD transfer to hardcoded address.</ListItem>
          <ListItem>
            Simple Mint operation on Elven Tools demo minter smart contract.
          </ListItem>
          <ListItem>
            Random query operation on the Elven Tools demo minter smart
            contract.
          </ListItem>
        </OrderedList>
        <Text>
          It is to demonstrate how such things can be achieved without much
          development. Maybe later, we will come up with a much better demo
          dapp.
        </Text>
      </CardWrapper>
>>>>>>> fc34df4cd45af7f75202d4003e43a7189263ce43
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
