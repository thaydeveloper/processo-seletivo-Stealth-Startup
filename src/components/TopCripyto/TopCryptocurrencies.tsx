import React, { useEffect } from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";

import "./styles.css";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCoins } from "../../redux/Coins/ruducer";
import { useApi } from "../../services/axios";
import { DefaultRootState } from "react-redux";

const TopCryptocurrencies = () => {
  const { getListCoinsCryptoCurrencies } = useApi();
  const coins = useSelector((state: DefaultRootState) => state.crypto.coins);

  const dispatch = useDispatch();
  const top10Coins = coins?.slice(0, 10);

  useEffect(() => {
    const fetchCoins = async () => {
      const coins = await getListCoinsCryptoCurrencies();
      dispatch(setCoins(coins));
    };

    fetchCoins();
  }, [dispatch]);
  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        flexWrap: "wrap",
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
        gap: "50px",
        paddingTop: "100px",
      }}
    >
      {coins &&
        top10Coins.map((coin) => (
          <Card key={coin?.id} className="card">
            <Link to={`/details/${coin.id}`} style={{ all: "unset" }}>
              <CardContent className="card-content">
                <img
                  src={coin?.image}
                  alt={coin?.name}
                  className="card-image"
                />
                <Typography variant="h5" component="h2" className="h2">
                  {coin?.name}
                </Typography>
                <Typography variant="body1" className="body1">
                  {coin?.symbol}
                </Typography>
                <Typography variant="body2" className="body2">
                  Preço: ${coin?.current_price}
                </Typography>
              </CardContent>
            </Link>
          </Card>
        ))}
    </Grid>
  );
};

export default TopCryptocurrencies;
