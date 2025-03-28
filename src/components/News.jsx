import React, {useState} from 'react';
import { Typography, Row, Col, Card, Spin, Alert, Avatar } from 'antd';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/CryptoApi';
import moment from 'moment';
import Text from 'antd/lib/typography/Text';
import Loader from './Loader';

const { Title } = Typography;

const News = ({ simplified }) => {
 
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data: cryptoNews, isFetching, error } = useGetCryptoNewsQuery({newsCategory, count: simplified ? 6 : 10});
  const {data} = useGetCryptosQuery(100)
  
  //Loading state
  if (isFetching) return <Loader/>;
  
  // Error state
  if (error) {
    
    return <Alert message={`Error fetching news: ${error?.message || 'Unknown error'}`} type="error" />;
  }
  
  // Check for common alternative properties✅
  if (!cryptoNews?.data?.length && !cryptoNews?.articles?.length && !cryptoNews?.results?.length) {
    return 'No news available';
  }
  // Determine which property to use based on availability
  const newsArticles = cryptoNews?.data || cryptoNews?.value || cryptoNews?.articles || [];
  

  const displayedArticles = newsArticles.slice(0, simplified? 6 : 90 ) ;


  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <select
            showSearch
            className='select-news' 
            placeholder='Select a Crypto'
            optionFilterProp='children'
            onChange={(value) => setNewsCategory(value)} 
            filterOption= {(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}    
          >
            <option value='Cryptocurrency'>Cryptocurrency</option>
            {data?.data?.coins.map((coin) => <option value={coin.name}>{coin.name}</option>)}

          </select>
        </Col>
      )}
      {displayedArticles.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.link} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>{news.title}</Title>
                {news?.photo_url && (
                    <img
                      src={news.photo_url}
                      alt={news.title}
                      style={{ maxwidth: '200px', maxHeight: '100px' }}
                    />
                  )}
              </div>
              <p className="news-description">
              {(news.snippet?.length > 100 ? 
                  `${news.snippet.substring(0, 200)}...` : 
                  news.snippet) || 'No description available'}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar src={news?.provider?.[0]?.thumbnail?.contentUrl?.photo_url || 'https://www.w3schools.com/howto/img_avatar.png'} alt='news'/>
                  <Text className='provider-name'>{news.provider[0]?.name}</Text>  
                </div> 
                <Text>{moment(news.dataPublished).fromNow()}</Text> 
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;