import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DefaultRootState } from "react-redux";
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import "./styles.css";
import { useDispatch } from "react-redux";
import { fetchCoinsGraphic } from "../../features/Coins/ruducer";
import { Line } from "react-chartjs-2";

const CoinDetails = () => {
  const [days, setDays] = useState(1);

  const coinsData = useSelector((state) => state?.crypto.coinsData);
  const coinsDataGraphic = useSelector(
    (state) => state?.crypto.coinsDataGraphic
  );
  console.log(coinsDataGraphic);

  const loading = useSelector((state) => state?.crypto.loading);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCoinsGraphic({ id, days: 365, currency: "usd" }));
  }, [dispatch, id]);

  const memoizedCoinData = useMemo(() => {
    return coinsData?.find((coin) => coin.id === id);
  }, [coinsData, id]);

  if (loading) return <CircularProgress />;

  let color =
    memoizedCoinData?.price_change_percentage_24h >= 0 ? "green" : "red";
  let profit = memoizedCoinData?.price_change_percentage_24h >= 0;
  return (
    <Box sx={{ display: "flex" }}>
      <Card
        className="card-datail"
        sx={{
          display: "flex",
          backgroundColor: "transparent",
          color: "#ffff",
          flexWrap: "wrap",
          width: "350px",
          justifyContent: "center",
          alignItems: "center",
          gap: "50px",
        }}
      >
        <CardContent>
          {memoizedCoinData?.image && (
            <CardMedia
              component="img"
              src={memoizedCoinData?.image}
              alt={`${memoizedCoinData?.name} logo`}
            />
          )}
          <Typography
            variant="h4"
            component="h1"
            sx={{ paddingBottom: "30px" }}
          >
            {memoizedCoinData?.name} ({memoizedCoinData?.symbol.toUpperCase()})
          </Typography>
          <Typography variant="body1" component="p">
            Preço Atual: $ {memoizedCoinData?.current_price.toFixed(2)}
          </Typography>
          <Typography variant="body1" component="p">
            Variação 24h:{" "}
            <span style={{ color: color }}>
              {profit && "+"}{" "}
              {memoizedCoinData?.price_change_percentage_24h.toFixed(2)}%
            </span>
          </Typography>
          <Typography variant="body1" component="p">
            Alta 24h: $ {memoizedCoinData?.high_24h.toFixed(2)}
          </Typography>
          <Typography variant="body1" component="p">
            Baixa 24h: $ {memoizedCoinData?.low_24h.toFixed(2)}
          </Typography>
          <Typography variant="body1" component="p">
            Volume 24h: $ {memoizedCoinData?.total_volume.toFixed(2)}
          </Typography>
          <Typography variant="body1" component="p">
            Capitalização de Mercado: ${" "}
            {memoizedCoinData?.market_cap.toFixed(2)}
          </Typography>
          <Typography variant="body1" component="p">
            Máximo Histórico: $ {memoizedCoinData?.ath.toFixed(2)}
          </Typography>
          <Typography variant="body1" component="p">
            Mínimo Histórico: $ {memoizedCoinData?.atl.toFixed(2)}
          </Typography>
        </CardContent>
      </Card>
      <Card
        sx={{
          display: "flex",
          backgroundColor: "transparent",
          color: "#ffff",
          flexWrap: "wrap",
          width: "650px",
          border: "1px solid #ccc",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Line
          data={{
            labels: coinsDataGraphic?.map((coin) => {
              let date = new Date(coin[0]);
              let time =
                date.getTime() > 12
                  ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                  : `${date.getHours()}:${date.getMinutes()} AM`;

              return days === 1 ? time : date.toLocaleDateString();
            }),
            datasets: [
              {
                data: coinsDataGraphic.map((coin) => coin[1]),
                label: `preço (nos ${days} dias) em usd`,
                borderColor: "#ffcc00",
              },
            ],
          }}
        />
      </Card>
    </Box>
  );
};

export default CoinDetails;
