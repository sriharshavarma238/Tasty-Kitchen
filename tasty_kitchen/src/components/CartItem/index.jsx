import React from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { FaRupeeSign } from 'react-icons/fa'
import Counter from '../Counter'
import './index.css'

const CartItem = (props) => {
  const { cartItemDetails, addQuantity, decreaseQuantity, deleteCartItem } = props
  const { id, name, quantity, cost, imageUrl } = cartItemDetails

  const totalCost = quantity * cost

  const onDecrement = () => {
    decreaseQuantity(id)
  }

  const onIncrement = () => {
    addQuantity(id)
  }

  const onRemove = () => {
    deleteCartItem(id)
  }

  return (
    <li className='cart-item'>

      <div className='cart-item-details-container'>
        <div style={{display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap'}}>
          <img src={imageUrl} alt={name} className='cart-item-image' />
          <h1 className='cart-item-title'>{name}</h1>
        </div>
        <Counter
          quantity={quantity}
          onDecrement={onDecrement}
          onIncrement={onIncrement}
        />
        <p className='cart-total-price'>
          <FaRupeeSign /> {totalCost}
        </p>
        <button className='remove-button' type='button' onClick={onRemove}>
          Remove
        </button>
        <button className='delete-icon' type='button' onClick={onRemove}>
          <AiFillCloseCircle color='#616E7C' size={20} />
        </button>
      </div>
    </li>
  )
}

export default CartItem
