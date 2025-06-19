import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { BiRupee } from 'react-icons/bi'

import './index.css'

const CartTotal = ({ cartList }) => {
  const totalOrderCost = useMemo(() => {
    return cartList.reduce(
      (acc, eachCartItem) => acc + eachCartItem.cost * eachCartItem.quantity,
      0
    )
  }, [cartList])

  return (
    <>
      <div className="cart-summary-container">
        <div className="cart-summary-content">
          <h1 className="order-total-heading">Order Total:</h1>
          <div className="total-container">
            <p className="total" data-testid="total-price">
              <BiRupee />
              {totalOrderCost}
            </p>
          </div>
        </div>
      </div>
      <Link to="/payment" className="place-order-link">
        <div className="place-order-container">
          <button type="button" className="order-button">
            Place Order
          </button>
        </div>
      </Link>
    </>
  )
}

export default CartTotal
