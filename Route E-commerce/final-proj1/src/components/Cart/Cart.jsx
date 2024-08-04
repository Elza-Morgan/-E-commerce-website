import React, { useContext, useEffect, useState } from 'react'
import Style from './Cart.module.css'
import { CounterContext } from '../../Context/CounterContext'
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import axios from 'axios';


export default function Cart() {
  const[cartProducts,setCartProducts]=useState([]);
  const [cartId, setCartId] = useState(null); 

 let{getCartItems,removeCartItem,updateCartItem,totalPrice}=useContext(CartContext)
 let {counter, setCounter} = useContext(CounterContext);
//  console.log(counter)

 async function getCart(){
 let response = await getCartItems();
 console.log(response)
 console.log(response?.data.data.products)
 setCartProducts(response?.data.data.products)
 setCartId(response?.data.data._id); // Store the cart ID
 }

 async function removeItem(productId){
  let response =await removeCartItem(productId)
 setCartProducts(response?.data.data.products)
  // console.log(response)
 }

 async function updateItem(productId,count){
  let response =await updateCartItem(productId,count)
 setCartProducts(response?.data.data.products)
  // console.log(response)
 }


 useEffect(() => {
  getCart();
},[]);


  return (
    <>
      <div className="relative container mx-auto mt-[40px] overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Count
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
              {cartProducts.map((item)=>
             <tr key={item.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="p-4">
                <img src={item.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="" />
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {item.product.title}
              </td>

              <td className="px-6 py-4">
                <div className="flex items-center">

                  {/* Dec Button */}
                  <button onClick={()=>updateItem(item.product.id, item.count-1==0? removeItem(item.product.id) : item.count-1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                    <span className="sr-only">Quantity button</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                    </svg>
                  </button>
                  <div>
                      <span>{item.count}</span>
                  </div>
                  
                  {/* Adding Button */}
                  <button onClick={()=>updateItem(item.product.id, item.count+1)}  className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                    <span className="sr-only">Quantity button</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                    </svg>
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {item.count}
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {item.price*item.count}EGP
              </td>
              <td className="px-6 py-4">
                <a onClick={()=>removeItem(item.product.id)} className="font-medium text-red-600 dark:text-red-500 cursor-pointer">Remove</a>
              </td>
            </tr>
          )}
            <tr className='flex  gap-[60px] p-3 justify-between items-center  bg-white border-b  text-black dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600'>
              <td className='text-lg'>
               Total Price
              </td>
              <td colsSpan='5' className='text-center text-lg text-black bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600'>
               {totalPrice} EGP
              </td>
              <button type="button" className="bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                 <NavLink to={`/checkout/${cartId}`}>Check Out</NavLink>
              </button>
            </tr>
          </tbody>
        </table>
      </div>  
    </>
  )
}
