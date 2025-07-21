import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { FaStar, FaRupeeSign } from 'react-icons/fa'
import Cookies from 'js-cookie'
import { ClipLoader } from "react-spinners"
import Header from '../Header'
import Footer from '../Footer'
import FoodItem from '../FoodItem'
import './index.css'

const getCartListFromLocalStorage = () => {
  const stringCartList = localStorage.getItem('cartData')
  return stringCartList ? JSON.parse(stringCartList) : []
}

const RestaurantDetails = () => {
  const [restaurantData, setRestaurantData] = useState({})
  const [foodItemList, setFoodItemList] = useState([])
  const [cartList, setCartList] = useState(getCartListFromLocalStorage())
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    const getRestaurantDetails = async () => {
      setIsLoading(true)
      const jwtToken = Cookies.get('jwt_token')
      
      try {
        const response = await fetch(
          `https://apis.ccbp.in/restaurants-list/${id}`,
          {
            headers: { Authorization: `Bearer ${jwtToken}` },
          }
        )
        
        if (!response.ok) throw new Error('Failed to fetch')
        
        const data = await response.json()
        
        setRestaurantData({
          costForTwo: data.cost_for_two,
          cuisine: data.cuisine,
          id: data.id,
          imageUrl: data.image_url,
          itemsCount: data.items_count,
          location: data.location,
          name: data.name,
          opensAt: data.opens_at,
          rating: data.rating,
          reviewsCount: data.reviews_count,
        })
        
        setFoodItemList(
          data.food_items.map(item => ({
            cost: item.cost,
            foodType: item.food_type,
            id: item.id,
            imageUrl: item.image_url,
            name: item.name,
            rating: item.rating,
          }))
        )
      } catch (error) {
        console.error('Fetch error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    getRestaurantDetails()
  }, [id]) 

  useEffect(() => {
    localStorage.setItem('cartData', JSON.stringify(cartList))
  }, [cartList])

  const addCartItem = (foodItem) => {
    setCartList(prevCart => {
      const existingItem = prevCart.find(item => item.id === foodItem.id)
      return existingItem
        ? prevCart.map(item => 
            item.id === foodItem.id ? {...item, quantity: foodItem.quantity} : item
          )
        : [...prevCart, foodItem]
    })
  }

  const deleteCartItem = (id) => {
    setCartList(prevCart => prevCart.filter(item => item.id !== id))
  }

  const renderLoading = () => (
    <div 
      className="restaurants-details-loader"
      data-testid="restaurant-details-loader"
    >
      <ClipLoader color="#F7931E" loading={true} size={50} />
    </div>
  )

  const renderRestaurantDetails = () => {
    const { 
      name,
      imageUrl,
      cuisine,
      location,
      rating,
      costForTwo,
      reviewsCount,
    } = restaurantData

    return (
      <>
        <div className="restaurant-details-container">
          <div className="restaurant-details-view">
            <img
              src={imageUrl}
              alt="restaurant"
              className="restaurant-detail-image"
            />
            <div>
              <h1 className="restaurant-details-heading">{name}</h1>
              <p className="restaurant-details-cuisine">{cuisine}</p>
              <p className="restaurant-details-location">{location}</p>
              <div className="restaurant-details-rating-price-container">
                <div>
                  <p className="restaurant-details-ratings">
                    <FaStar className="restaurant-details-rating-star" />
                    {rating}
                  </p>
                  <p className="restaurant-details-rating-count">
                    {reviewsCount}+ Ratings
                  </p>
                </div>
                <hr className="restaurant-details-vertical-line" />
                <div>
                  <p className="restaurant-details-cost">
                    <FaRupeeSign />
                    {costForTwo}
                  </p>
                  <p className="restaurant-details-cost-for-two">
                    Cost for two
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="restaurant-food-items-container">
          <ul className="food-item-list">
            {foodItemList.map(eachFood => (
              <FoodItem
                key={eachFood.id}
                foodItemDetails={eachFood}
                addCartItem={addCartItem}
                deleteCartItem={deleteCartItem}
                cartList={cartList}
              />
            ))}
          </ul>
        </div>
      </>
    )
  }

  return (
    <>
      <Header isHomeActive="true" isCartActive="false" />
      {isLoading ? renderLoading() : renderRestaurantDetails()}
      <Footer />
    </>
  )
}

export default RestaurantDetails
