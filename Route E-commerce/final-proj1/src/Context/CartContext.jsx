import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";


export let CartContext= createContext();

export default function CartContextProvider(props){
const[noOfCartItems,setNoOfCartItems]=useState(0);
const[totalPrice,setTotalPrice]=useState(0);


    let headers ={
        token: localStorage.getItem("userToken")
    }

   async function addToCart(productId){
    console.log(headers.token)
        return await axios.post("https://ecommerce.routemisr.com/api/v1/cart",{
            productId: productId
        },{
            headers:headers
        }).then((response)=>{
            // console.log(response)
            // console.log(response?.data.status);
            setTotalPrice(response?.data.data.totalCartPrice)
            setNoOfCartItems(response?.data.numOfCartItems)
            //success
            toast.success(response?.data.status)
            return response
        }).catch((error)=>{
            // console.log(error);
            //error
            toast.error(response?.data.status|| "An error occurred")
            return error
        })

    }


    async function removeCartItem(productId){
        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
            headers:headers
        }).then((response)=>{
            // console.log(response?.data.status);
            toast.success("Removed!")
            setNoOfCartItems(response?.data.numOfCartItems)
            setTotalPrice(response?.data.data.totalCartPrice)

            return response
        }).catch((error)=>{
            // console.log(error);
            return error
        })
    }

    //so the default value doesn't be empty from the useState
    async function getCartItems(){
        return await axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
            headers:headers
        }).then((response)=>{
            //  console.log(response,"at get")
            setNoOfCartItems(response?.data.numOfCartItems)
            setTotalPrice(response?.data.data.totalCartPrice)
             return response
        }).catch((error)=>{
             console.log(error)
             return error
        })

    }


    async function updateCartItem(productId,count){
        return await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
                count:count
        },{
            headers:headers
        }).then((response)=>{
            // console.log(response);
            toast.success("Updated!")
            setTotalPrice(response?.data.data.totalCartPrice)
            return response
        }).catch((error)=>{
            // console.log(error);
            return error
        })
    }



    return <CartContext.Provider value={{addToCart,getCartItems,removeCartItem,updateCartItem,noOfCartItems,totalPrice}}>
        {props.children}
    </CartContext.Provider>
}