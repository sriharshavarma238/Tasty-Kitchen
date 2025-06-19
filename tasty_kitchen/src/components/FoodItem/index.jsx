import React, { useState, useEffect } from 'react'
import { BsPlusSquare, BsDashSquare } from 'react-icons/bs'
import { ImStarFull } from 'react-icons/im'
import { FaRupeeSign } from 'react-icons/fa'

import './index.css'

const FoodItem = (props) => {
  const { foodItemDetails, cartList, addCartItem, deleteCartItem } = props
  const { id, imageUrl, name, cost, rating } = foodItemDetails

  const [quantity, setQuantity] = useState(0)

  // Initialize quantity from cartList on mount
  useEffect(() => {
    const cartItem = cartList.find((item) => item.id === id)
    if (cartItem) {
      setQuantity(cartItem.quantity)
    }
  }, []) // Empty dependency array = runs once on mount (like componentDidMount)

  const onClickAddToCart = () => {
    if (quantity === 0) {
      setQuantity(1)
    }
    addCartItem({ ...foodItemDetails, quantity: quantity + 1 })
  }

  const onIncreaseQuantity = () => {
    const newQuantity = quantity + 1
    setQuantity(newQuantity)
    addCartItem({ ...foodItemDetails, quantity: newQuantity })
  }

  const onDecreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1
      setQuantity(newQuantity)
      addCartItem({ ...foodItemDetails, quantity: newQuantity })
    } else {
      setQuantity(0)
      deleteCartItem(id)
    }
  }

  return (
    <li className="food-item-container" data-testid="foodItem">
      <img src={imageUrl} alt="food-item" className="food-item-image" />
      <div className="food-item-content">
        <h1 className="food-name">{name}</h1>
        <div className="cost-container">
          <FaRupeeSign />
          <p className="food-cost">{cost}</p>
        </div>
        <div className="rating-container">
          <ImStarFull className="star" />
          <p className="rating">{rating}</p>
        </div>
        {quantity === 0 ? (
          <button
            type="button"
            className="add-button"
            onClick={onClickAddToCart}
          >
            Add
          </button>
        ) : (
          <div className="cart-quantity-container">
            <button
              type="button"
              data-testid="decrement-count"
              onClick={onDecreaseQuantity}
              className="quantity-controller-button"
            >
              <BsDashSquare
                className="quantity-controller-icon"
                color="#52606D"
                size={12}
              />
            </button>
            <p data-testid="active-count" className="cart-quantity">
              {quantity}
            </p>
            <button
              data-testid="increment-count"
              type="button"
              className="quantity-controller-button"
              onClick={onIncreaseQuantity}
            >
              <BsPlusSquare
                className="quantity-controller-icon"
                color="#52606D"
                size={12}
              />
            </button>
          </div>
        )}
      </div>
    </li>
  )
}

export default FoodItem
