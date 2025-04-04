import React, {useState, useEffect} from 'react'
import { Button, Menu, Typography, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons'
import icon from '../images/cryptocurrency_2.png'


const Nevbar = () => {
  const [activeMenu, setActiveMenu] = useState(true)
  const [screenSize, setScreenSize] = useState(undefined)

  // useEffect to handle screen resizing
  useEffect(() => {
    const handlrResize = () => setScreenSize(window.innerWidth)
    window.addEventListener('resize', handlrResize)
    handlrResize()
    return () => window.removeEventListener('resize', handlrResize)
  }, [])

  // useEffect to handle screen resizing
  useEffect(() => {
    if(screenSize < 768) {
      setActiveMenu(false)
    }else{
      setActiveMenu(true)
    }
  }, [screenSize])
  
  return (
    <div className="nav-container">
        <div className="logo-container">
            <Avatar src={icon} size="large"/>
            <Typography.Title level={2} className="logo"><Link to="/">Cryptoverse</Link></Typography.Title>
            <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}><MenuOutlined /></Button>
        </div>
        {activeMenu && (
          <Menu theme="dark">
            <Menu.Item icon={<HomeOutlined />}>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item icon={<FundOutlined />}>
              <Link to="/cryptocurrencies">Cryptocurrencies</Link>
            </Menu.Item>
            <Menu.Item icon={<BulbOutlined />}>
              <Link to="/news">News</Link>
            </Menu.Item>
          </Menu>
        )}
    </div>
  )
}

export default Nevbar         