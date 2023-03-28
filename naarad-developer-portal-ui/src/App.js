import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { BackpackWalletAdapter, SolflareWalletAdapter, UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useMemo } from 'react';
import { ConnectPage } from './Container/ConnectPage/ConnectPage';
import { useWallet } from '@solana/wallet-adapter-react';
import { Dashboard } from './Container/Dashboard/Dashboard';
import { useDapps } from './Hooks/Dapps';
import { useApiKeys } from './Hooks/ApiKeys';

export const App = () => {
    return (
        <Context>
            <Content />
        </Context>
    );
};

const Context = ({ children }) => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [
            new SolflareWalletAdapter(),
            new BackpackWalletAdapter(), 
            new UnsafeBurnerWalletAdapter(),
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

const Content = () => {
  const { publicKey } = useWallet();
  const {apiKeys, actions} = useApiKeys();
  const {dapps, dappActions} = useDapps();
  useEffect(() => {
    if (!publicKey) {
        actions.setApiKeyList(null)
        actions.setSelected(null)
        dappActions.setDappMap({})
    }
  }, [])
  if (!publicKey) {
    return <ConnectPage />
  }
  else {
    return <Dashboard />
  }
};