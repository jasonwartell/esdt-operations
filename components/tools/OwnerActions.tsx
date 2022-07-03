import { useCallback, useState } from 'react';
import {
  Button,
  Text,
  Flex,
  Box,
  Link,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import { TransactionCb } from '../../hooks/core/common-helpers/sendTxOperations';
import { FlexCardWrapper } from '../ui/CardWrapper';
import { shortenHash } from '../../utils/shortenHash';
import { networkConfig, chainType } from '../../config/network';
import { ActionButton } from './ActionButton';
import { useLoginInfo } from '../../hooks/auth/useLoginInfo';
import { LoginMethodsEnum } from '../../types/enums';
import IssueTokens from '../ui/IssueTokens';
import MintAndBurn from '../ui/MintAndBurn';
import { Grid, GridItem } from '@chakra-ui/react';
import AddSpecialRoles from '../ui/AddSpecialRoles';
import FreezeUnfreeze from '../ui/FreezeUnfreeze';
import PauseUnpause from '../ui/PauseUnpause';
import SendEsdt from '../ui/SendEsdt';

export const OwnerActions = () => {
  const [result, setResult] = useState<{ type: string; content: string }>();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string>();
  const { loginMethod } = useLoginInfo();

  const {
    isOpen: isOpenIssueToken,
    onOpen: onOpenIssueToken,
    onClose: onCloseIssueToken,
    onToggle: onToggleIssueToken,
  } = useDisclosure();

  const {
    isOpen: isOpenMintBurn,
    onOpen: onOpenMintBurn,
    onClose: onCloseMintBurn,
    onToggle: onToggleMintBurn,
  } = useDisclosure();

  const {
    isOpen: isOpenAddRoles,
    onOpen: onOpenAddRoles,
    onClose: onCloseAddRoles,
    onToggle: onToggleAddRoles,
  } = useDisclosure();

  const {
    isOpen: isOpenFreezeUnfreeze,
    onOpen: onOpenFreezeUnfreeze,
    onClose: onCloseFreezeUnfreeze,
    onToggle: onToggleFreezeUnfreeze,
  } = useDisclosure();

  const {
    isOpen: isOpenPauseUnpause,
    onOpen: onOpenPauseUnpause,
    onClose: onClosePauseUnpause,
    onToggle: onTogglePauseUnpause,
  } = useDisclosure();


  const {
    isOpen: isOpenSendEsdt,
    onOpen: onOpenSendEsdt,
    onClose: onCloseSendEsdt,
    onToggle: onToggleSendEsdt,
  } = useDisclosure();

  const displayForm = (formName: string) => () => {
    switch (formName) {
      case 'issueToken': {
        if (isOpenIssueToken) {
          onToggleIssueToken();
          return;
        } else {
          onCloseMintBurn();
          onCloseAddRoles();
          onCloseFreezeUnfreeze();
          onClosePauseUnpause();
          onCloseSendEsdt();
          onOpenIssueToken();
          break;
        }
      }
      case 'mintBurn': {
        if (isOpenMintBurn) {
          onToggleMintBurn();
          return;
        } else {
          onCloseIssueToken();
          onCloseAddRoles();
          onCloseFreezeUnfreeze();
          onClosePauseUnpause();
          onCloseSendEsdt();
          onOpenMintBurn();
          break;
        }
      }
      case 'addRoles': {
        if (isOpenAddRoles) {
          onToggleAddRoles();
          return;
        } else {
          onCloseMintBurn();
          onCloseIssueToken();
          onCloseFreezeUnfreeze();
          onClosePauseUnpause();
          onCloseSendEsdt();
          onOpenAddRoles();
          break;
        }
      }
      case 'freezeUnfreeze': {
        if (isOpenFreezeUnfreeze) {
          onToggleFreezeUnfreeze();
          return;
        } else {
          onCloseMintBurn();
          onCloseIssueToken();
          onCloseAddRoles();
          onClosePauseUnpause();
          onCloseSendEsdt();
          onOpenFreezeUnfreeze();
          break;
        }
      }
      case 'pauseUnpause': {
        if (isOpenPauseUnpause) {
          onTogglePauseUnpause();
          return;
        } else {
          onCloseMintBurn();
          onCloseIssueToken();
          onCloseAddRoles();
          onCloseFreezeUnfreeze();
          onCloseSendEsdt();
          onOpenPauseUnpause();
          break;
        }
      }
      case 'sendEsdt': {
        if (isOpenSendEsdt) {
          onToggleSendEsdt();
          return;
        } else {
          onCloseMintBurn();
          onCloseIssueToken();
          onCloseAddRoles();
          onCloseFreezeUnfreeze();
          onClosePauseUnpause();
          onOpenSendEsdt();
          break;
        }
      }
      default:
        break;
    }
  };

  const handleTxCb = useCallback(
    ({ transaction, pending, error }: TransactionCb) => {
      if (transaction) {
        setResult({ type: 'tx', content: transaction.getHash().hex() });
        setPending(false);
        setError(undefined);
      }
      if (pending) {
        setPending(true);
        setError(undefined);
        setResult(undefined);
      }
      if (error) {
        setError(error);
        setPending(false);
        setResult(undefined);
      }
    },
    []
  );

  const handleClose = useCallback(() => {
    setResult(undefined);
    setPending(false);
    setError(undefined);
  }, []);

  return (
    <Box flex-direction="column" justifyContent="center" mt="20px" mb="20px">
      <Grid
        ml="20px"
        mr="20px"
        h="80px"
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(6, 1fr)"
        gap={4}
      >
        <GridItem rowSpan={1} colSpan={1}>
          <Button variant="grid" onClick={displayForm('issueToken')}>
            <Box>
              <Text>Issue Tokens</Text>
              <Text>and</Text>
              <Text>Create Client</Text>
            </Box>
          </Button>
        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
          <Button variant="grid" onClick={displayForm('addRoles')}>
            Add Special Roles
          </Button>
        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
          <Button variant="grid" onClick={displayForm('mintBurn')}>
            Mint and Burn
          </Button>
        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
          <Button variant="grid" onClick={displayForm('freezeUnfreeze')}>
            Freeze and Unfreeze
          </Button>
        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
          <Button variant="grid" onClick={displayForm('pauseUnpause')}>
            Pause and Unpause
          </Button>
        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
          <Button variant="grid" onClick={displayForm('sendEsdt')}>
            Send ESDT
          </Button>
        </GridItem>
      </Grid>
      {isOpenIssueToken && (
        <Flex justifyContent="center" mt="20px">
          <IssueTokens cb={handleTxCb} />
        </Flex>
      )}
      {isOpenMintBurn && (
        <Flex justifyContent="center" mt="20px">
          <MintAndBurn cb={handleTxCb} />
        </Flex>
      )}
      {isOpenAddRoles && (
        <Flex justifyContent="center" mt="20px">
          <AddSpecialRoles cb={handleTxCb} />
        </Flex>
      )}
      {isOpenFreezeUnfreeze && (
        <Flex justifyContent="center" mt="20px">
          <FreezeUnfreeze cb={handleTxCb} />
        </Flex>
      )}
      {isOpenPauseUnpause && (
        <Flex justifyContent="center" mt="20px">
          <PauseUnpause cb={handleTxCb} />
        </Flex>
      )}
      {isOpenSendEsdt && (
        <Flex justifyContent="center" mt="20px">
          <SendEsdt cb={handleTxCb} />
        </Flex>
      )}
      {error && (
        <FlexCardWrapper
          position="absolute"
          inset={0}
          bg="blackAlpha.200"
          backdropFilter="blur(10px)"
        >
          <Box fontSize="x-large" fontWeight="black">
            Transaction status:
          </Box>
          <Box fontSize="lg">{error}</Box>
          <ActionButton mt={4} onClick={handleClose}>
            Close
          </ActionButton>
        </FlexCardWrapper>
      )}
      {pending && (
        <FlexCardWrapper
          position="absolute"
          inset={0}
          bg="blackAlpha.200"
          backdropFilter="blur(10px)"
        >
          <Box fontSize="x-large" fontWeight="black">
            Transaction is pending. Please wait.
          </Box>
          {loginMethod === LoginMethodsEnum.walletconnect && (
            <Box>
              Confirm it on the Maiar mobile app and wait till it finishes.
            </Box>
          )}
          <Spinner size="xl" mt={6} color="dappTemplate.color2.darker" />
        </FlexCardWrapper>
      )}
      {result?.type && (
        <FlexCardWrapper
          position="absolute"
          inset={0}
          bg="blackAlpha.200"
          backdropFilter="blur(10px)"
        >
          {result.type === 'tx' && (
            <>
              <Box fontSize="x-large" fontWeight="black">
                Transaction hash:
              </Box>
              <Link
                fontSize="large"
                textDecoration="underline"
                href={`${networkConfig[chainType].explorerAddress}/transactions/${result.content}`}
              >
                {shortenHash(result.content, 10)}
              </Link>
            </>
          )}
          <ActionButton mt={4} onClick={handleClose}>
            Close
          </ActionButton>
        </FlexCardWrapper>
      )}
    </Box>
  );
};
