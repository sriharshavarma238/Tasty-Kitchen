import React from 'react'
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get('jwt_token')
  if (!token) {
    return <Navigate to="/login" replace={true} />
  }
  return children
}

export default ProtectedRoute
