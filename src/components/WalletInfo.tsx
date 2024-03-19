// components/WalletInfo.tsx

import React, { useEffect } from "react";

import { useAppContext } from "../context/context";

const WalletInfo: React.FC = () => {
  const { walletConnected, walletData } = useAppContext();
  useEffect(() => {
    // Aqui você pode chamar a função para conectar à carteira quando o componente montar
  }, []);

  /* const connectToWallet = async () => {
    try {
      const walletData = await connectToMetaMask();
      if (walletData.connected) {
        dispatch(connectWallet());
      }
    } catch (error) {
      console.error("Erro ao conectar a carteira:", error);
    }
  };

  const handleDisconnectWallet = () => {
    dispatch(disconnectWallet());
  }; */

  return (
    <div>
      <div>
        {walletConnected && walletData && (
          <div>
            <p>Carteira Conectada</p>
            <p>Endereço: {walletData.address}</p>
            <p>Saldo: {walletData.balance.eth} ETH</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletInfo;
