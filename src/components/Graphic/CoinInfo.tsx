import axios from "axios";
import { useEffect, useState } from "react";

import SelectButton from "./SelectButton";
import { Chart as ChartJS, registerables } from "chart.js";
import { Line } from "react-chartjs-2";

import { chartDays } from "../../services/data";
import {
  Box,
  CircularProgress,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const CoinInfo = ({ coin }) => {
  ChartJS.register(...registerables);

  const [days, setDays] = useState(1);
  const { prices, market_caps } = coin;

  const StyledCoinInfo = styled("div")(({ theme }) => ({
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
  }));
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  const handleDayChange = (selectedDay) => {
    setDays(selectedDay);
  };
  const filterPricesByDays = () => {
    const currentDate = new Date();
    const filteredPrices = coin?.prices?.filter((price) => {
      const date = new Date(price[0]);
      const diffTime = Math.abs(currentDate - date);
      const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
      return diffHours <= days * 24; // Corrigido para considerar horas em vez de dias
    });
    return filteredPrices;
  };

  return (
    <StyledCoinInfo>
      {!coin ? (
        <CircularProgress style={{ color: "gold" }} size={250} thickness={1} />
      ) : (
        <>
          <Line
            data={{
              labels: filterPricesByDays()?.map((price) => {
                let date = new Date(price[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  data: filterPricesByDays()?.map((price) => price[1]),
                  label: `Price ( Past ${days} Days ) in usd`,
                  borderColor: "#EEBC1D",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
          <Box
            style={{
              display: "flex",
              marginTop: 20,
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            {chartDays?.map((day) => (
              <SelectButton
                key={day.value}
                onClick={() => handleDayChange(day.value)}
                selected={day.value === days}
              >
                {day.label}
              </SelectButton>
            ))}
          </Box>
        </>
      )}
    </StyledCoinInfo>
  );
};

export default CoinInfo;
