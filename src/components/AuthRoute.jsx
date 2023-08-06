import React from 'react'
import { Navigate, Outlet, Route } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'

function AuthRoute(props) {
  const { isAuth } = useAuth()

  if (!isAuth) return <Navigate to="/" />

  return <Outlet/>
}

export default AuthRoute
