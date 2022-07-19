import { Button, Text, Flex, Box, Center, Spacer } from '@chakra-ui/react';
import { Grid, GridItem } from '@chakra-ui/react';
import NextLink from 'next/link';

function GridRouter({
  href,
  children,
  ...props
}: {
  href: string;
  children: any;
}) {
  return (
    <GridItem rowSpan={1} colSpan={1}>
      <NextLink href={href} passHref>
        <Button as="a" textAlign="center"  variant="grid" fontSize={['sm', 'md']} {...props}>
          {children}
        </Button>
      </NextLink>
    </GridItem>
  );
}

export const OwnerActions = () => {
  return (
    <Center mt="10px">
      <Grid
        ml="20px"
        mr="20px"
        height="fit-content"
        width={['full', '480px', '768px', '992px', '1280px']}
        templateRows={[
          'repeat(7, 80px)',
          'repeat(5, 80px)',
          'repeat(3, 100px)',
          'repeat(2, 100px)',
        ]}
        templateColumns={[
          'repeat(2, 1fr)',
          'repeat(3, 1fr)',
          'repeat(5, 1fr)',
          'repeat(7, 1fr)',
        ]}
        gap="10px"
      >
        <GridRouter href="/issueESDT">Issue an ESDT</GridRouter>
        <GridRouter href="/setRoles">Set or Unset <br /> Roles</GridRouter>
        <GridRouter href="/issueESDT">Transfer ESDT</GridRouter>
        <GridRouter href="/issueESDT">
          Multi-Token <br /> Transfer
        </GridRouter>
        <GridRouter href="/issueESDT">
          Transfer ESDT <br /> via SC Method
        </GridRouter>
        <GridRouter href="/mintESDT">Mint or Burn <br /> ESDT</GridRouter>
        <GridRouter href="/pauseESDT">Pause or <br /> Unpause ESDT</GridRouter>
        <GridRouter href="/freezeESDT">Freeze or <br /> Unfreeze ESDT</GridRouter>
        <GridRouter href="/wipeESDT">Wipe ESDT</GridRouter>
        <GridRouter href="/changeOwnerESDT">Change Owner</GridRouter>
        <GridRouter href="/">Close Forms</GridRouter>
      </Grid>
    </Center>
  );
};
