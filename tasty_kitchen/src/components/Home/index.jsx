import React from 'react'
import Header from '../Header'
import Carousel from '../Carousel'
import Restaurants from '../Restaurants'
import Footer from '../Footer'
import './index.css'

const Home = () => (
  <>
    <Header isHomeActive="true" isCartActive="false" />
    <div className="home-container">
      <div className="home-content">
        <Carousel />
        <Restaurants />
      </div>
    </div>
    <Footer />
  </>
)

export default Home
