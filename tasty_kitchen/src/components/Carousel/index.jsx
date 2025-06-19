import React, { useState, useEffect, useCallback } from 'react'
import { ClipLoader } from "react-spinners";
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const Carousel = () => {
  const [carouselList, setCarouselList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getCarousel = useCallback(async () => {
    setIsLoading(true)
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    
    try {
      const response = await fetch(url, options)
      const data = await response.json()
      const updatedData = data.offers.map(eachItem => ({
        id: eachItem.id,
        imageUrl: eachItem.image_url,
      }))
      setCarouselList(updatedData)
    } catch (error) {
      console.error("Fetch error:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    getCarousel()
  }, [getCarousel])

  const renderCarouselList = () => {
    const settings = {
      dots: true,
      infinite: true,
      arrows: false,
      speed: 3000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 7000,
      pauseOnHover: true,
      focusOnSelect: true,
      appendDots: dots => (
        <div className="slick-dots">
          <ul>{dots}</ul>
        </div>
      ),
    }

    return (
      <Slider {...settings}>
        {carouselList.map(eachImage => (
          <div className="home-carousel-item" key={eachImage.id}>
            <img
              src={eachImage.imageUrl}
              alt="restaurants-offers-loader"
              className="home-carousel-image"
            />
          </div>
        ))}
      </Slider>
    )
  }

  const renderLoader = () => (
    <div
      testid="restaurants-offers-loader"
      className="home-carousel-loader"
    >
      <ClipLoader color="#F7931E" loading={true} size={50} />
    </div>
  )

  return isLoading ? renderLoader() : renderCarouselList()
}

export default Carousel
