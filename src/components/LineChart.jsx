import React from 'react'
import {Line} from 'react-chartjs-2'
import {Col, Row, Typography, Alert} from 'antd'
import { 
  Chart as ChartJS, 
  LineElement, 
  CategoryScale, 
  LinearScale, 
  PointElement 
} from 'chart.js';


const {Title} = Typography

// ✅ Register necessary Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);


const LineChart = ({coinHistory, currentPrice, coinName,error}) => {
  console.log('coinHistory Response:', coinHistory);

  if (error) {
    console.error('API Error:', error);
    return <Alert message="Error fetching chart data. Please try again." type="error" />;
  }

  
  const coinPrice = []
  const coinTimestamp = []

  for(let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory.data.history[i].price)
    coinTimestamp.push(new Date(coinHistory.data.history[i].timestamp).toLocaleDateString())
  }

 

  const data = {
    labels: coinTimestamp,
    datasets: [{
      label: 'Price In USD',
      data: coinPrice,
      fill: false,
      backgroundColor: '#0071bd',
      borderColor: '#0071bd',
      tension: 0.4
    }] 
  }

  // ✅ Chart Options (Fixed for Chart.js v3+)
  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },// Hide legend
      toolpit:{enable:true, mode: 'index', intersect: false}, 
    },
    scales: {
      y: {
        type: 'linear',
        beginAtZero: false,
        grid:{display:true, color: 'rgba(200,200,200,0.3)',
        },
        ticks: {
          callback: (value) => `$${value.toLocaleString()}`,
          color: '#0071bd'
        }
      },
      x: {
        grid:{display:false},
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
          color: '#0071bd'
        }
      }
    }
  };  
  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">{coinName} Price Chart </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">Change: {coinHistory?.data?.change}%</Title>
          <Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Title>
        </Col>
      </Row>
      <Line data={data} options={options}/>
    </>
  )
}

export default LineChart