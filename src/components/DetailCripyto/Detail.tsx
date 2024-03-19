import React, { useEffect, useState, useMemo } from "react";
import { useAppContext } from "../../context/context";
import { useParams } from "react-router-dom";

const CoinDetails: React.FC = () => {
  const { coinsData, isLoading, fetchCoins } = useAppContext();
  const { id } = useParams();

  const [coinData, setCoinData] = useState<any>(null);

  // Lógica de busca e filtragem de dados
  useEffect(() => {
    fetchCoins();
  }, []);

  const memoizedCoinData = useMemo(() => {
    return coinsData?.find((coin) => coin.id === id);
  }, [coinsData, id]);

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

{
  /* <div>
  <h1>{memoizedCoinData?.name}</h1>
  <p>Variação de preço: {memoizedCoinData?.price_change_24h}</p>
  <p>
    Alta/baixa de 24h: {memoizedCoinData?.high_24h}/
    {memoizedCoinData?.low_24h}
  </p>
  <p>Volume de mercado: {memoizedCoinData?.market_cap}</p>
  {memoizedCoinData?.chart && (
    <img src={memoizedCoinData?.chart} alt="Gráfico de preço" />
  )}
</div> */
}
