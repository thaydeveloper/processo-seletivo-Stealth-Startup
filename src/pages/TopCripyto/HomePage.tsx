import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";

import "./styles.css";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchCoins } from "../../features/Coins/ruducer";

import numberFormat from "../../utils/formatValueCrypto";

const HomePage = () => {
  const dispatch = useDispatch();
  const [reloadTimer, setReloadTimer] = useState(60);
  useEffect(() => {
    dispatch(fetchCoins());

    const timer = setInterval(() => {
      setReloadTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [dispatch]);

  const coinsData = useSelector((state) => state?.crypto.coinsData);
  const loading = useSelector((state) => state?.crypto.loading);
  const error = useSelector((state) => state?.crypto.error);

  if (loading || error) {
    return (
      <Box>
        <Typography variant="h4">
          {`Loading... Limite de teste excedido. Reconectando em ${reloadTimer} segundos`}
        </Typography>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        flexWrap: "wrap",
        width: "80%",
        marginLeft: "10%",
        justifyContent: "center",
        alignItems: "center",
        gap: "50px",
        paddingTop: "100px",
      }}
    >
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        coinsData?.map((coin) => (
          <Link
            key={coin?.id}
            to={`/details/${coin.id}`}
            style={{ all: "unset" }}
          >
            <Card key={coin?.id} className="card">
              <CardContent className="card-content">
                <img
                  src={coin?.image}
                  alt={coin?.name}
                  className="card-image"
                />
                <Typography variant="h5" component="h2" className="h2">
                  {coin?.name}
                </Typography>
                <Typography variant="h5" className="body1">
                  {coin?.symbol}
                </Typography>
                <Typography variant="h6" className="h2">
                  Price: ${numberFormat(coin?.current_price.toFixed(2))}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        ))
      )}
    </Grid>
  );
};

export default HomePage;
