import React from 'react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = () => {
  const isLogin = localStorage.getItem("isLogin")
  const navigate = useNavigate()
  console.log("isLogin",isLogin)

  return (
    isLogin === null ? navigate("/login") :<Outlet/>
  )
}

export default ProtectedRoute