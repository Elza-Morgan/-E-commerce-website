import React, { useContext, useEffect } from "react";
import Style from "../FeatureProducts/FeatureProducts.module.css";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ClimbingBoxLoader } from "react-spinners";
import Loader from "../Loader/Loader";
import { CartContext } from "../../Context/CartContext";
import { WishListContext } from "../../Context/WishListContext";


export default function FeatureProducts() {
  const [products, Setproducts] = useState([]);
  const [isLoading, SetIsLoading] = useState(true);
  const [heartclicked, setHeartclicked] = useState(false);


  let {addToCart} = useContext(CartContext);
  let {addToWishList}= useContext(WishListContext);

 async function addProductToCart(productId){
      let response = await addToCart(productId);
      console.log(response);
  }

  async function addProductToWishList(productId){
    let response = await addToWishList(productId);
    console.log(response,"AddToWishList function called");
    setHeartclicked((prev) => {
      const newHeartClicked = {
        ...prev,
        [productId]: !prev[productId], // Toggle the clicked state
      };
  
      // Save the updated wishlist status to local storage
      localStorage.setItem('wishlist', JSON.stringify(newHeartClicked));
  
      return newHeartClicked;
    });
}

  function getRecentProducts() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then(({ data }) => {
        // console.log(data.data);
        Setproducts(data.data);
        SetIsLoading(false);
      })
      .catch((error) => {});
  }

  //This means once the app opens it will call the function getRecentProduct
  useEffect(() => {
    getRecentProducts();

    // Load the wishlist status from local storage
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setHeartclicked(JSON.parse(savedWishlist));
    }
  }, []);

  // if(isLoading){
  //   return <div className="py-8 w-full flex justify-center">
  //     <ClimbingBoxLoader color='green'/>
  //   </div>
  // };

  // console.log(isLoading)

  // if(isError){
  //   return <div className="py-8 w-full flex justify-center">
  //       <h3>{error}</h3>
  //   </div>
  // }

  return (
    <>
      <div className="container mx-auto">
        <div className="flex justify-center items-center">
          {isLoading ? <Loader /> : null}
        </div>
        <div className="flex flex-wrap">
          {products.map((product) => (
            <div key={product.id} className="w-1/6 p-2">
              <div className="product p-2">
                <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                  <img
                    className="w-full"
                    src={product.imageCover}
                    alt={product.title}
                  />
                  <span className="text-main">{product.category.name}</span>
                  <h2 className="text-lg font-normal text-gray-800 mb-4 flex justify-between">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h2>
                  <div className="flex justify-between items-center">
                    <span>{product.price} EGP</span>
                    <span>
                      {product.ratingsAverage}{" "}
                      <i className="fas fa-star rating-color"></i>
                    </span>
                  </div>
                </Link>
                <div className="w-[40px] h-[40px] flex justify-center items-center ms-auto">
                    <i className={`fas fa-heart ${heartclicked[product.id]? 'text-red-600': 'text-black'} text-xl cursor-pointer`} onClick={()=>addProductToWishList(product.id)}></i>
                </div>
                <div className="text-center">
                  <button onClick={()=>addProductToCart(product.id)} className="btn bg-main text-white px-4 py-2 ">
                    add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
