import React, { useEffect,useState } from 'react'
import Style from './ProtectedAuth.module.css'
import { Navigate } from 'react-router-dom';


export default function ProtectedAuth(props) {
  const [counter,setCounter]=useState();
  useEffect(()=>{},[]);


  if(localStorage.getItem('userToken')){
    return <Navigate to='/'></Navigate>
  }else{
    return props.children
  }

}
