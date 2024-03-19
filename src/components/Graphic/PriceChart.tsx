/* import React from "react";
import { Line } from "react-chartjs-2";

interface Props {
  priceData: [];
}

const PriceChart: React.FC<Props> = ({ priceData }) => {
  // Formatando os dados para o formato esperado pelo gráfico
  const formattedData = priceData.map((data) => ({
    label: new Date(data.timestamp).toLocaleDateString(),
    close: data.close,
  }));

  const chartData = {
    labels: formattedData.map((data) => data.label),
    datasets: [
      {
        label: "Preço",
        data: formattedData.map((data) => data.close),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <h2>Gráfico de Preço</h2>
      <Line data={chartData} />
    </div>
  );
};

export default PriceChart; */
