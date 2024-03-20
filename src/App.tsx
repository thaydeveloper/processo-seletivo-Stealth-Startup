import "./App.css";

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

import TopCryptocurrencies from "./components/TopCripyto/TopCryptocurrencies";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Details from "./components/DetailCripyto/Detail";
import Layout from "./layout/Layout";

import ConnectWalletCard from "./components/WalletCard/WalletCard";
function App() {
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
            <Route path="/metamask" element={<ConnectWalletCard />} />
          </Routes>
        </Box>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
