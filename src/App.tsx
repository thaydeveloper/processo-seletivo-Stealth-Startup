import "./App.css";

import * as React from "react";
import { Box } from "@mui/material";

import HomePage from "./pages/TopCripyto/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Details from "./pages/DetailCripyto/DetailPage";
import Layout from "./layout/Layout";

import ConnectWalletCard from "./pages/WalletCard/WalletCard";
function App() {
  return (
    <Box className="container">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/metamask" element={<ConnectWalletCard />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Box>
  );
}

export default App;
