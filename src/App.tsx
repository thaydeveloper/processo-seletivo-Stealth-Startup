import { useEffect, useState } from "react";

import "./App.css";
import { connectToMetaMask, getWalletData, useApi } from "./services/axios";
import * as React from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
  Box,
  InputLabel,
  Select,
  MenuItem,
  ButtonGroup,
  FormLabel,
} from "@mui/material";

import WalletInfo from "./components/WalletInfo";
import { useAppContext } from "./context/context";
import TopCryptocurrencies from "./components/TopCripyto/TopCryptocurrencies";
function App() {
  const { updateWalletData, connectToMetaMask, fetchCoins } = useAppContext();

  const handleConnectWallet = async () => {
    try {
      await connectToMetaMask();
      await updateWalletData();
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <>
      {
        /* !walletConnected && */ <button onClick={() => handleConnectWallet()}>
          Conectar à MetaMask
        </button>
      }
      <WalletInfo />
      {/* <button onClick={connectToWallet}>Conectar à MetaMask</button>
      {connected && walletData && (
        <div>
          <p>Carteira Conectada</p>
          <p>Endereço: {walletData.address}</p>
          <p>Saldo: {walletData.balance.eth} ETH</p>
        </div>
      )} */}
      {/* <AppAppBar /> */}
      <Typography>teste agora </Typography>
      {/*  <TesteComponent
        text="vamos la?"
        onClick={connectToWallet}
      ></TesteComponent> */}
      <TopCryptocurrencies />
    </>
  );
}

export default App;
