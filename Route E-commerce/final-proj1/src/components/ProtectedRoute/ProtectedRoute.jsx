import React from 'react'
import Style from './ProtectedRoute.module.css'
import { Navigate } from 'react-router-dom'


export default function ProtectedRoute(props) {

  // console.log(props.children);
  

    if(localStorage.getItem('userToken')){
      return props.children
    }else{
      return <Navigate to={'/login'}/>
    }

}
