import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { Col, Row, Typography } from "antd";
import moment from "moment";

const { Title } = Typography;
Chart.register(...registerables);

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = coinHistory?.data?.history.length - 1; i >= 0; i--) {
    coinPrice.push(coinHistory?.data?.history[i].price);
    coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp));
  }

  for (let i = 0; i < coinHistory?.data?.history.length; i++) {
    coinTimestamp[i] = moment.unix(coinTimestamp[i]).format("MMM Do YY, h:m a");
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart{" "}
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            Change: {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
