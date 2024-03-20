import React, { useEffect, useMemo } from "react";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DefaultRootState } from "react-redux";

const CoinDetails: React.FC = () => {
  const coins = useSelector((state: DefaultRootState) => state.crypto.coins);
  const { id } = useParams();

  useEffect(() => {}, [coins]);

  const memoizedCoinData = useMemo(() => {
    return coins?.find((coin) => coin.id === id);
  }, [coins, id]);

  if (!memoizedCoinData) return <div>Carregando...</div>;

  return (
    <div className="coin-details-container">
      <div className="coin-details">
        <h1>
          {memoizedCoinData?.name} ({memoizedCoinData?.symbol.toUpperCase()})
        </h1>
        <p>Preço Atual: R${memoizedCoinData?.current_price.toFixed(2)}</p>
        <p>
          Variação 24h:
          {memoizedCoinData?.price_change_percentage_24h > 0 ? "+" : ""}
          {/* {memoizedCoinData?.price_change_percentage_24h_in_currency[0].price_change_percentage.toFixed(
            2
          )} */}
          %
        </p>
        <p>Alta 24h: R${memoizedCoinData?.high_24h.toFixed(2)}</p>
        <p>Baixa 24h: R${memoizedCoinData?.low_24h.toFixed(2)}</p>
        <p>Volume 24h: R${memoizedCoinData?.total_volume.toFixed(2)}</p>
        <p>
          Capitalização de Mercado: R$
          {memoizedCoinData?.market_cap.toFixed(2)}
        </p>
        <p>Máximo Histórico: R${memoizedCoinData?.ath.toFixed(2)}</p>
        <p>Mínimo Histórico: R${memoizedCoinData?.atl.toFixed(2)}</p>

        {memoizedCoinData?.image && (
          <img
            src={memoizedCoinData?.image}
            alt={`${memoizedCoinData?.name} logo`}
            className="coin-image"
          />
        )}
      </div>
    </div>
  );
};

export default CoinDetails;
