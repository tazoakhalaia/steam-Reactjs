import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
 

const useAuth = () => {
  const user = localStorage.getItem('accountname')
  const password = localStorage.getItem('password')
  if(user && password){
    return true
  }else{
    return false
  }
}

function ProtectedRoute() {
    const isAuth = useAuth()

  return (
    isAuth ? <Outlet /> : <Navigate to="/login" />
  )
}  

export default ProtectedRoute