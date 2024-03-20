import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

import { IWalletData } from "../../types";
import { connectToMetaMask } from "../../services/axios";

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
    <Card sx={{ maxWidth: 400, height: "650px", marginTop: "150px" }}>
      <CardContent>
        <h2>Conectar com Metamask</h2>
        {walletConnected ? (
          <>
            <p>Carteira Conectada:</p>
            <p>Endereço: {walletConnected.address}</p>
            <p>Saldo: {walletConnected.balance} ETH</p>
          </>
        ) : (
          <>
            <p>
              Conecte sua carteira Metamask para acessar recursos adicionais.
            </p>
            <Button variant="contained" onClick={() => handleConnectWallet()}>
              Conectar
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ConnectWalletCard;
