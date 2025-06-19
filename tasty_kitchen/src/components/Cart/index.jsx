import React, { useState } from 'react'
import Header from '../Header'
import EmptyCartView from '../EmptyCartView'
import CartItem from '../CartItem'
import CartTotal from '../CartTotal'
import Footer from '../Footer'

import './index.css'

const getCartListFromLocalStorage = () => {
  const stringifiedCartList = localStorage.getItem('cartData')
  const parsedCartList = JSON.parse(stringifiedCartList)
  if (parsedCartList === null) {
    return []
  }
  return parsedCartList
}

const Cart = () => {
  const [cartList, setCartList] = useState(getCartListFromLocalStorage())

  // Keep localStorage in sync with cartList
  React.useEffect(() => {
    localStorage.setItem('cartData', JSON.stringify(cartList))
  }, [cartList])

  const renderCartViewEmpty = () => (
    <div className="empty-cart-view-container">
      <EmptyCartView />
    </div>
  )

  const deleteCartItem = id => {
    const updatedCartList = cartList.filter(
      eachCartItem => eachCartItem.id !== id,
    )
    setCartList(updatedCartList)
  }

  const addQuantity = id => {
    setCartList(prevCartList =>
      prevCartList.map(eachCartItem => {
        if (id === eachCartItem.id) {
          const updatedQuantity = eachCartItem.quantity + 1
          return { ...eachCartItem, quantity: updatedQuantity }
        }
        return eachCartItem
      })
    )
  }

  const decreaseQuantity = id => {
    const productObject = cartList.find(eachCartItem => eachCartItem.id === id)
    if (productObject.quantity > 1) {
      setCartList(prevCartList =>
        prevCartList.map(eachCartItem => {
          if (id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity - 1
            return { ...eachCartItem, quantity: updatedQuantity }
          }
          return eachCartItem
        })
      )
    }
  }

  const isCartListEmpty = cartList.length === 0

  return (
    <>
      <Header isCartActive="true" isHomeActive="false" />
      {isCartListEmpty ? (
        renderCartViewEmpty()
      ) : (
        <>
          <div className="cart-container" data-testid="cartItem">
            <div className="cart-container-content">
              <div className="cart-content-container">
                <div className="heading-container">
                  <h1 className="cart-heading item">Item</h1>
                  <h1 className="cart-heading quantity">Quantity</h1>
                  <h1 className="cart-heading price">Price</h1>
                  <h1 className="cart-heading">Remove</h1>
                </div>
              </div>
              <ul className="cart-list-container" testid="cartItem">
                {cartList.map(eachCartItem => (
                  <CartItem
                    key={eachCartItem.id}
                    cartItemDetails={eachCartItem}
                    addQuantity={addQuantity}
                    decreaseQuantity={decreaseQuantity}
                    deleteCartItem={deleteCartItem}
                  />
                ))}
              </ul>
              <hr className="cart-horizontal-line" />
              <CartTotal cartList={cartList} />
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  )
}

export default Cart
