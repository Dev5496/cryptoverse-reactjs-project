import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select, Spin } from 'antd';
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  NumberOutlined,
  CheckOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/CryptoApi';
import LineChart from './LineChart';
import Loader from './Loader';

// Ant Design Components
const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  // Get the coin ID from the URL params
  const { coinId } = useParams();
  

  // State for time period selection
  const [timePeriod, setTimePeriod] = useState('7d');

  // Fetch cryptocurrency details
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod });
  const cryptoDetails = data?.data?.coin;

  // Prevent rendering if data is still loading
  if (isFetching) {<Loader/>}

  // Prevent errors if cryptoDetails is undefined
  if (!cryptoDetails) {
    return <p>Error: Unable to fetch crypto details.</p>;
  }

  // Time period options for selection
  const timeOptions = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  // Cryptocurrency statistics
  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price ? millify(cryptoDetails.price) : 'N/A'}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank || 'N/A', icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails?.['24hVolume'] ? millify(cryptoDetails['24hVolume']) : 'N/A'}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap ? millify(cryptoDetails.marketCap) : 'N/A'}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high', value: `$ ${cryptoDetails?.allTimeHigh?.price ? millify(cryptoDetails.allTimeHigh.price) : 'N/A'}`, icon: <TrophyOutlined /> },
  ];

  // General statistics
  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets || 'N/A', icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges || 'N/A', icon: <MoneyCollectOutlined /> },
    { title: 'Approved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total ? millify(cryptoDetails.supply.total) : 'N/A'}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating ? millify(cryptoDetails.supply.circulating) : 'N/A'}`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <Col className="coin-detail-container">
      
      {/* Title & Overview Section */}
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {cryptoDetails.name} ({cryptoDetails.symbol}) Price
        </Title>
        <p>
          {cryptoDetails.name} live price in US dollars. 
          View value statistics, market cap, and supply.
        </p>
      </Col>

      {/* Time Period Selection */}
      <select 
        defaultValue="7d" 
        className="select-timeperiod" 
        onChange={(event) => setTimePeriod(event.target.value)}
        placeholder = "Select Time Period"
      >
        {timeOptions.map((date) => <option key={date}>{date}</option>)}
      </select>
      <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name}/>
      {/* Statistics Sections */}
      <Col className="stats-container">
        {/* Value Statistics */}
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading"> 
              {cryptoDetails.name} Value Statistics
            </Title>
            <p>Overview of {cryptoDetails.name} statistics.</p>
          </Col>
          {stats.map(({ icon, title, value }, index) => (
            <Col className="coin-stats" key={index}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text> 
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>

        {/* Other General Statistics */}
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">Other Statistics</Title>
            <p>Overview of the general crypto market.</p>
          </Col>
          {genericStats.map(({ icon, title, value }, index) => (
            <Col className="coin-stats" key={index}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text> 
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>

      {/* Description & Links Section */}
      <Row gutter={[32, 32]} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        
        {/* Left Side: Description & More Info */}
        <Col xs={24} md={11} className="coin-description">
          <Title level={3} className="coin-details-heading">What is {cryptoDetails.name}?</Title>
          <Text>{HTMLReactParser(cryptoDetails.description)}</Text>

          <Title level={3} className="coin-details-heading">More Information</Title>
          <Col>
            <p><strong>Rank:</strong> {cryptoDetails.rank}</p>
            <p><strong>Price Change (24h):</strong> {cryptoDetails.change}%</p>
            <p><strong>Tags:</strong> {cryptoDetails.tags?.join(', ') || 'No tags available'}</p> 
            <p><strong>Tier:</strong> {cryptoDetails.tier}</p>
            <p><strong>More Details:</strong> 
              <a href={cryptoDetails?.coinrankingUrl} target="_blank" rel="noreferrer"> View on CoinRanking </a>
            </p>
          </Col>
        </Col>

        {/* Right Side: Links (Properly Aligned) */}
        <Col xs={24} md={16} className="coin-links" style={{ textAlign: 'right' }}>
          <Title level={3} className="coin-details-heading" style={{ textAlign: 'left' }}>{cryptoDetails.name} Links</Title>
          {cryptoDetails.links.map((link, index) => (
            <Row key={index} className="coin-link">
              <Title level={5} className="link-name">{link.type}</Title>
              <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
            </Row>
          ))}
        </Col>
      </Row>
      
    </Col>
  );
};

export default CryptoDetails;
