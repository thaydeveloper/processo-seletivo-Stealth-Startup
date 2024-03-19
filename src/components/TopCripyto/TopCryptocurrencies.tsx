import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { useAppContext } from "../../context/context";
import "./styles.css";

import { Link } from "react-router-dom";

const TopCryptocurrencies = () => {
  const { coinsData, isLoading } = useAppContext();

  const top10Coins = coinsData?.slice(0, 10);

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
      {coinsData &&
        !isLoading &&
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
