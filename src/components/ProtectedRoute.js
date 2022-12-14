import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
 
function ProtectedRoute(props) {
    
   const useAuth = () => {
        const user = {loggedin: this.props.access}
        return user && user.loggedin
    }

    const isAuth = useAuth()

  return (
    isAuth ? <Outlet /> : <Navigate to="/login" />
  )
}  

export default ProtectedRoute