import { Button, Center } from '@chakra-ui/react';
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
        mb="10px"
        height="fit-content"
        width={['full', '480px', '768px', '992px', '1280px']}
        templateRows={[
          'repeat(6, 80px)',
          'repeat(5, 80px)',
          'repeat(3, 100px)',
          'repeat(2, 100px)',
        ]}
        templateColumns={[
          'repeat(2, 1fr)',
          'repeat(3, 1fr)',
          'repeat(5, 1fr)',
          'repeat(6, 1fr)',
        ]}
        gap="10px"
      >
        <GridRouter href="/issueESDT">Issue an ESDT</GridRouter>
        <GridRouter href="/setRoles">Set or Unset <br /> Roles</GridRouter>
        <GridRouter href="/sendESDT">Transfer ESDT</GridRouter>
        <GridRouter href="/sendMultiESDT">
          Multi-Token <br /> Select <br /> Transfer
        </GridRouter>
        <GridRouter href="/sendMultiManualESDT">
          Multi-Token <br /> Manual <br /> Transfer
        </GridRouter>
        <GridRouter href="/sendScESDT">
          Transfer ESDT <br /> via SC Method
        </GridRouter>
        <GridRouter href="/mintESDT">Mint or Burn <br /> ESDT</GridRouter>
        <GridRouter href="/pauseESDT">Pause or <br /> Unpause ESDT</GridRouter>
        <GridRouter href="/freezeESDT">Freeze or <br /> Unfreeze ESDT</GridRouter>
        <GridRouter href="/wipeESDT">Wipe ESDT</GridRouter>
        <GridRouter href="/changeOwnerESDT">Change Owner</GridRouter>
      </Grid>
    </Center>
  );
};
