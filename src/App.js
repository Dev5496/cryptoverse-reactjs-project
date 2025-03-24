import React from 'react'
import { Route, Link, Routes } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import {Nevbar, Exchanges, Homepage, Cryptocurrencies, News, CryptoDetails } from './components';
import './App.css'

const App = () => {
  console.log('🟠 App is rendering...');
  return (
    <div className="app">
        <div className="navbar">
            <Nevbar />
        </div>
      <div className='main'>
          <Layout>
            <div className='routes'>
              <Routes>
                <Route path='/' element={<Homepage />} />
                <Route path='/exchanges' element={<Exchanges />} />
                <Route path='/cryptocurrencies' element={<Cryptocurrencies />} />
                <Route path='/crypto/:coinId' element={<CryptoDetails />} />
                <Route path='/news' element={<News/>} />
              </Routes>
            </div>
          </Layout>
        
        <footer className='footer'>
          <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>
            Cryptoverse <br />
            All rights reserved.
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
          </Space>
        </footer>
      </div>  
    </div>
  )
}

export default App