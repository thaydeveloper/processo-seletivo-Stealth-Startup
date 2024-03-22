import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

import { IWalletData } from "../../types";
import { connectToMetaMask } from "../../services/axios";
import { Box, Typography } from "@mui/material";

const ConnectWalletCard: React.FC = () => {
  const [walletConnected, setWalletConnected] = useState<IWalletData | null>();

  const handleConnectWallet = async () => {
    try {
      const responseConnect = await connectToMetaMask();
      setWalletConnected(responseConnect);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  return (
    <Card
      sx={{
        width: 500,
        height: 450,
        display: "flex",
        flexDirection: "column",
        border: "1px solid #ffff",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "transparent",
        color: "#ffff",
        borderRadius: "80px",
        flexWrap: "wrap",
      }}
    >
      <CardContent>
        {walletConnected ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Typography>Carteira Conectada!</Typography>
            <Typography>Endereço: {walletConnected.address}</Typography>
            <Typography>Saldo: {walletConnected.balance} ETH</Typography>
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Typography sx={{ fontSize: "28px" }}>
              Conectar com Metamask
            </Typography>
            <Typography>Conecte sua carteira Metamask ?</Typography>
            <Button variant="contained" onClick={() => handleConnectWallet()}>
              Conectar
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ConnectWalletCard;
