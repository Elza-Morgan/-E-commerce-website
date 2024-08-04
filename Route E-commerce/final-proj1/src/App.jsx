import { useState } from 'react'
import '../../final-proj1/src/App.css'
import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Categories from './components/Categories/Categories'
import Brands from './components/Brands/Brands'
import Cart from './components/Cart/Cart'
import Products from './components/Products/Products'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import NotFound from './components/NotFound/NotFound'
import Protected from './components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './components/ProductDetails/ProductDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ProtectedAuth from './components/ProtectedAuth/ProtectedAuth'
import { Toaster } from 'react-hot-toast'
import WishList from './components/WishList/WishList'
import ForgetPass from './components/ForgetPass/ForgetPass'
import VerifyRestCode from './components/VerifyRestCode/VerifyRestCode'
import RestPassword from './components/RestPassword/RestPassword'
import CheckOut from './components/CheckOut/CheckOut'
 

let query= new QueryClient();

let route=createBrowserRouter([
    {path:'', element:<Layout/>, children:[
    {index:true, element:<Protected><Home/></Protected>},
    {path:'categories', element:<Protected><Categories/></Protected> },
    {path:'brands', element:<Protected><Brands/></Protected>},
    {path:'cart', element:<Protected><Cart/></Protected>},
    {path:'products', element:<Protected><Products/></Protected>},
    {path:'wishlist', element:<Protected><WishList/></Protected>},
    {path:'checkout/:cartId', element:<Protected><CheckOut/></Protected>},
    {path:'forgetpassowrd', element:<ForgetPass/>},
    {path:'verifycode', element:<VerifyRestCode/>},
    {path:'restpass', element:<RestPassword/>},
    {path:'productdetails/:productId/:productCategory', element:<Protected><ProductDetails/></Protected>},
    {path:'login', element:<ProtectedAuth><Login/></ProtectedAuth> },
    {path:'register', element:<ProtectedAuth><Register/></ProtectedAuth> },
    {path:'*', element:<NotFound/>},
  ]},
  ])

export default function App() {
      
  return (<>
    <QueryClientProvider client={query}>
            <RouterProvider router={route}/>
            <ReactQueryDevtools/>
            <Toaster/>
    </QueryClientProvider>  



    </>
  )
}
