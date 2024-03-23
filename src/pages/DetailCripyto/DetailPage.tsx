import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import "./styles.css";
import { useDispatch } from "react-redux";
import { fetchCoinsGraphic } from "../../features/Coins/ruducer";
import { Line } from "react-chartjs-2";
import CoinInfo from "../../components/Graphic/CoinInfo";
import numberFormat from "../../utils/formatValueCrypto";

const CoinDetails = () => {
  const coinsData = useSelector((state) => state?.crypto.coinsData);
  const coinsDataGraphic = useSelector(
    (state) => state?.crypto.coinsDataGraphic
  );

  const loading = useSelector((state) => state?.crypto.loading);
  const error = useSelector((state) => state?.crypto.error);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCoinsGraphic({ id, days: 365, currency: "usd" }));
  }, [dispatch, id]);

  const memoizedCoinData = useMemo(() => {
    return coinsData?.find((coin) => coin.id === id);
  }, [coinsData, id]);

  if (loading || error) {
    return (
      <Box>
        <Typography variant="h4">
          Loading...Limit teste exedido reconectando...
        </Typography>
        <CircularProgress />
      </Box>
    );
  }

  let color =
    memoizedCoinData?.price_change_percentage_24h >= 0 ? "green" : "red";
  let profit = memoizedCoinData?.price_change_percentage_24h >= 0;

  return (
    <Box className="container">
      <Card
        className="card-datail"
        sx={{
          all: "unset",

          display: "flex",
          backgroundColor: "transparent",
          color: "#ffff",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "left",
          "& .text": {
            fontSize: { xs: "12px", sm: "14px", md: "18px" },
          },
          "& .color-text": {
            fontSize: { xs: "13px", sm: "14px", md: "18px" },
          },
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
            sx={{ paddingBottom: "10px" }}
          >
            {memoizedCoinData?.name} ({memoizedCoinData?.symbol.toUpperCase()})
          </Typography>
          <Typography className="text" variant="body1" component="p">
            Preço Atual:
            <Typography className="color-text">
              $ {numberFormat(memoizedCoinData?.current_price.toFixed(2))}
            </Typography>
          </Typography>
          <Typography className="text" variant="body1" component="p">
            Variação 24h:
            <span style={{ color: color }}>
              {profit && "+"}
              {memoizedCoinData?.price_change_percentage_24h.toFixed(2)}%
            </span>
          </Typography>
          <Typography className="text" variant="body1" component="p">
            Alta 24h:
            <Typography className="color-text">
              $ {numberFormat(memoizedCoinData?.high_24h.toFixed(2))}
            </Typography>
          </Typography>
          <Typography className="text" variant="body1" component="p">
            Baixa 24h:
            <Typography className="color-text">
              $ {numberFormat(memoizedCoinData?.low_24h.toFixed(2))}
            </Typography>
          </Typography>
          <Typography className="text" variant="body1" component="p">
            Volume 24h:
            <Typography className="color-text">
              $ {numberFormat(memoizedCoinData?.total_volume.toFixed(2))}
            </Typography>
          </Typography>
          <Typography className="text" variant="body1" component="p">
            Capitalização de Mercado:
            <Typography className="color-text">
              $ {numberFormat(memoizedCoinData?.market_cap.toFixed(2))}
            </Typography>
          </Typography>
          <Typography className="text" variant="body1" component="p">
            Máximo Histórico:
            <Typography className="color-text">
              $ {numberFormat(memoizedCoinData?.ath.toFixed(2))}
            </Typography>
          </Typography>
          <Typography className="text" variant="body1" component="p">
            Mínimo Histórico:{" "}
            <Typography className="color-text">
              $ {numberFormat(memoizedCoinData?.atl.toFixed(2))}
            </Typography>
          </Typography>
        </CardContent>
      </Card>
      <Box className="graphic">
        <CoinInfo coin={coinsDataGraphic} />
      </Box>
    </Box>
  );
};

export default CoinDetails;
