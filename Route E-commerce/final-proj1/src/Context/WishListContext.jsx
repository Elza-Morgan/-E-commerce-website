import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";


export let WishListContext = createContext();

export default function WishListContextProvider(props) {
  const [addingItemToWishList, setAddingItemToWishList] = useState([]);

  let headers = {
    token: localStorage.getItem("userToken"),
  };

  async function addToWishList(productId) {
    try {
      let response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId: productId },
        { headers: headers }
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async function getWishListItems() {
    try {
      let response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { headers: headers }
      );
      console.log(response, "at get wishlist");
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async function removeWishListItem(productId){
    return await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
        headers:headers
    }).then((response)=>{
        console.log(response?.data.status);
        toast.success("Removed!")
        return response
    }).catch((error)=>{
        console.log(error);
        return error
    })
}

async function updateWishlist(productId){
  return await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
      headers:headers
  }).then((response)=>{
      console.log(response);
      toast.success("Updated!")
      return response
  }).catch((error)=>{
      console.log(error);
      return error
  })
}


  return (
    <WishListContext.Provider value={{ addToWishList, getWishListItems ,removeWishListItem,updateWishlist}}>
      {props.children}
    </WishListContext.Provider>
  );
}
