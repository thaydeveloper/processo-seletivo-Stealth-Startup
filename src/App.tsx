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

import { useAppContext } from "./context/context";
import TopCryptocurrencies from "./components/TopCripyto/TopCryptocurrencies";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Details from "./components/DetailCripyto/Detail";
import Layout from "./layout/Layout";
import CoinDetails from "./components/DetailCripyto/Detail";
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
    <BrowserRouter>
      <Layout>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "auto",
          }}
        >
          <Routes>
            <Route path="/" element={<TopCryptocurrencies />} />
            <Route path="/details/:id" element={<Details />} />
            {/* <Route path="/coins/:id" element={<CoinDetails />} /> */}
          </Routes>
        </Box>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
