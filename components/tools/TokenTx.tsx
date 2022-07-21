import { useCallback, useState } from 'react';
import {
  Box,
  Link,
  Spinner,
  useColorModeValue,
} from '@chakra-ui/react';
import { TransactionCb } from '../../hooks/core/common-helpers/sendTxOperations';
import { useLoginInfo } from '../../hooks/auth/useLoginInfo';
import { useAccount } from '../../hooks/auth/useAccount';
import IssueTokensForm from '../esdt/IssueTokensForm';
import SetRolesForm from '../esdt/SetRolesForm';
import ChangeOwnerTokensForm from '../esdt/ChangeOwnerTokensForm';
import FreezeTokensForm from '../esdt/FreezeTokensForm';
import MintTokensForm from '../esdt/MintTokensForm';
import PauseTokensForm from '../esdt/PauseTokensForm';
import SendTokensForm from '../esdt/SendTokensForm';
import WipeTokensForm from '../esdt/WipeTokensForm';
import { FlexCardWrapper } from '../ui/CardWrapper';
import { ActionButton } from './ActionButton';
import { LoginMethodsEnum } from '../../types/enums';
import { chainType, networkConfig } from '../../config/network';
import { shortenHash } from '../../utils/shortenHash';
import SendMultiTokensForm from '../esdt/SendMultiTokensForm';

const TokenTx = ({tokenTx} : {tokenTx: string}) => {
  const [result, setResult] = useState<{ type: string; content: string }>();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string>();
  const { loginMethod, loginToken } = useLoginInfo();
  const { address } = useAccount();

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
    <Box flex-direction="row" justifyContent="center" px="5px" minHeight="346px" height="fit-content">
      {tokenTx == 'issue' && (<IssueTokensForm cb={handleTxCb} />)}
      {tokenTx == 'set' && (<SetRolesForm cb={handleTxCb} />)}
      {tokenTx == 'mint' && (<MintTokensForm cb={handleTxCb} />)}
      {tokenTx == 'freeze' && (<FreezeTokensForm cb={handleTxCb} />)}
      {tokenTx == 'pause' && (<PauseTokensForm cb={handleTxCb} />)}
      {tokenTx == 'wipe' && (<WipeTokensForm cb={handleTxCb} />)}
      {tokenTx == 'change' && (<ChangeOwnerTokensForm cb={handleTxCb} />)}
      {tokenTx == 'send' && (<SendTokensForm cb={handleTxCb} />)}
      {tokenTx == 'multi' && (<SendMultiTokensForm cb={handleTxCb} />)}
      {error && (
        <FlexCardWrapper
          zIndex={1}
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
          zIndex={1}
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
          {loginMethod === LoginMethodsEnum.ledger && (
            <>
              {address && (
                <>
                  <Box fontWeight="bold">Confirm your address on Ledger:</Box>
                  <Box>{address}</Box>
                </>
              )}
              {loginToken && (
                <>
                  <Box fontWeight="bold">Confirm the auth token on Ledger:</Box>
                  <Box>{`${loginToken}{}`}</Box>
                </>
              )}
              <Box>
                Then wait some time to finish the transaction. You will get the
                transaction hash and link at the end.
              </Box>
            </>
          )}
          <Spinner mt={6} color="dappTemplate.color2.darker" />
        </FlexCardWrapper>
      )}
      {result?.type == 'tx' && (
        <FlexCardWrapper
          zIndex={1}
          position="absolute"
          inset={0}
          bg="blackAlpha.200"
          backdropFilter="blur(10px)"
        >
          <Box fontSize="x-large" fontWeight="black">
            Transaction hash:
          </Box>
          <Link
            fontSize="large"
            textDecoration="underline"
            href={`${networkConfig[chainType].explorerAddress}/transactions/${result.content}`}
            isExternal
          >
            {shortenHash(result.content, 10)}
          </Link>
          <ActionButton
            mt={4}
            borderColor='teal.400'
            borderWidth="1px"
            onClick={handleClose}
          >
            Close
          </ActionButton>
        </FlexCardWrapper>
      )}
    </Box>
  );
};
export default TokenTx;
