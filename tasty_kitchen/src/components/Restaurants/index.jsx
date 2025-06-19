import React, { useState, useEffect, useCallback } from 'react'
import Cookies from 'js-cookie'
import { ClipLoader } from "react-spinners"
import { BsFilterRight } from 'react-icons/bs'
import RestaurantsList from '../RestaurantsList'

import './index.css'

const sortByOptions = [
  {
    id: 1,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const Restaurants = () => {
  const [restaurantsList, setRestaurantsList] = useState([])
  const [activeSortByValue, setActiveSortByValue] = useState(sortByOptions[1].value)
  const [isLoading, setIsLoading] = useState(true)
  const [noOfPages, setNoOfPages] = useState(0)
  const [activePage, setActivePage] = useState(1)
  const limit = 9

  const getRestaurantsList = useCallback(async () => {
    setIsLoading(true)
    const offset = (activePage - 1) * limit
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${activeSortByValue}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.restaurants.map(restaurant => ({
        costForTwo: restaurant.cost_for_two,
        cuisine: restaurant.cuisine,
        groupByTime: restaurant.group_by_time,
        hasOnlineDelivery: restaurant.has_online_delivery,
        hasTableBooking: restaurant.has_table_booking,
        id: restaurant.id,
        imageUrl: restaurant.image_url,
        isDeliveringNow: restaurant.is_delivering_now,
        location: restaurant.location,
        menuType: restaurant.menu_type,
        name: restaurant.name,
        opensAt: restaurant.opens_at,
        rating: restaurant.user_rating.rating,
        ratingColor: restaurant.user_rating.rating_color,
        ratingText: restaurant.user_rating.rating_text,
        totalReviews: restaurant.user_rating.total_reviews,
      }))
      const pages = Math.ceil(data.total / limit)
      setRestaurantsList(updatedData)
      setNoOfPages(pages)
    }
    setIsLoading(false)
  }, [activeSortByValue, activePage])

  useEffect(() => {
    getRestaurantsList()
  }, [getRestaurantsList])

  const onChangeSortBy = event => {
    setActiveSortByValue(event.target.value)
    setActivePage(1)
  }

  useEffect(() => {
    if (activePage === 1) return
    getRestaurantsList()
    // eslint-disable-next-line
  }, [activePage])

  const onClickPaginationLeftArrow = () => {
    if (activePage > 1) {
      setActivePage(prevPage => prevPage - 1)
    }
  }

  const onClickPaginationRightArrow = () => {
    if (activePage < noOfPages) {
      setActivePage(prevPage => prevPage + 1)
    }
  }

  const renderLoader = () => (
    <div data-testid="restaurants-list-loader" className="home-carousel-loader">
      <ClipLoader color="#F7931E" loading={true} size={50} />
    </div>
  )

  const renderRestaurants = () => (
    <RestaurantsList
      restaurantsList={restaurantsList}
      noOfPages={noOfPages}
      activePage={activePage}
      onClickPaginationLeftArrow={onClickPaginationLeftArrow}
      onClickPaginationRightArrow={onClickPaginationRightArrow}
    />
  )

  return (
    <div className="restaurants-container">
      <div className="restaurants-content">
        <h1 className="restaurants-heading">Popular Restaurants</h1>
        <div className="restaurants-description-sort-by-options">
          <p className="restaurant-description">
            Select Your favourite restaurant special dish and make your day happy...
          </p>
          <div className="sort-by-container">
            <BsFilterRight className="sort-by-icon" />
            <p className="sort-by">Sort by</p>
            <select
              className="sort-by-select"
              value={activeSortByValue}
              onChange={onChangeSortBy}
            >
              {sortByOptions.map(eachOption => (
                <option
                  key={eachOption.id}
                  value={eachOption.value}
                  className="select-option"
                >
                  {eachOption.displayText}
                </option>
              ))}
            </select>
          </div>
        </div>
        <hr className="hr-line" />
        {isLoading ? renderLoader() : renderRestaurants()}
      </div>
    </div>
  )
}

export default Restaurants
