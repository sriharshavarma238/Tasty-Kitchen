import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiFillCloseCircle } from 'react-icons/ai'

import './index.css'

const Header = ({ isHomeActive, isCartActive }) => {
  const [displayItems, setDisplayItems] = useState(false)
  const navigate = useNavigate()

  const onClickHamburgerIcon = () => {
    setDisplayItems(prev => !prev)
  }

  const onClickLogoutButton = () => {
    Cookies.remove('jwt_token')
    navigate('/login', { replace: true })
  }

  // These handlers are placeholders for navigation highlighting, as in the original code
  const onClickHomeButton = () => {}
  const onClickCartActive = () => {}

  const homeLinkClassName = isHomeActive === 'true' ? 'active' : ''
  const cartLinkClassName = isCartActive === 'true' ? 'active' : ''

  return (
    <>
      <nav className="header-container">
        <div className="header-content">
          <Link to="/" className="logo-nav-link">
            <div className="website-logo-container">
              <img
                src="https://res.cloudinary.com/tastykitchen/image/upload/v1633365815/Frame_274logo_kbotq3.png"
                alt="website logo"
                className="website-logo"
              />
              <h1 className="header-website-name">Tasty Kitchens</h1>
            </div>
          </Link>
          <ul className="nav-item-website-view">
            <li className="home-nav-item">
              <Link
                to="/"
                className={`nav-link ${homeLinkClassName}`}
                onClick={onClickHomeButton}
              >
                Home
              </Link>
            </li>
            <li className="cart-nav-link">
              <Link
                to="/cart"
                className={`nav-link ${cartLinkClassName}`}
                onClick={onClickCartActive}
              >
                Cart
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="logout-nav-item"
                onClick={onClickLogoutButton}
              >
                Logout
              </button>
            </li>
          </ul>
          <button
            type="button"
            className="nav-menu-button"
            onClick={onClickHamburgerIcon}
          >
            <GiHamburgerMenu className="nav-menu-icon" />
          </button>
        </div>
      </nav>
      {displayItems && (
        <div className="nav-items-mobile-view">
          <ul className="nav-item-mobile-view">
            <li className="home-nav-item">
              <Link
                to="/"
                className={`nav-link ${homeLinkClassName}`}
                onClick={onClickHomeButton}
              >
                Home
              </Link>
            </li>
            <li className="cart-nav-item">
              <Link
                to="/cart"
                className={`nav-link ${cartLinkClassName}`}
                onClick={onClickCartActive}
              >
                Cart
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="logout-nav-item"
                onClick={onClickLogoutButton}
              >
                Logout
              </button>
            </li>
          </ul>
          <button
            type="button"
            className="header-close-icon"
            onClick={onClickHamburgerIcon}
          >
            <AiFillCloseCircle className="close-icon" />
          </button>
        </div>
      )}
    </>
  )
}

export default Header
