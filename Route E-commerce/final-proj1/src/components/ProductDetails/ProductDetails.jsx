import React, { useContext, useEffect, useState } from "react";
import Style from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Loader from "../Loader/Loader";
import { CartContext } from "../../Context/CartContext";



export default function ProductDetails() {
  let {addToCart} =useContext(CartContext);
  async function addProductToCart(productId){
    let response = await addToCart(productId);
    console.log(response);
}


  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, SetIsLoading] = useState(true);
  

  let { productId, productCategory } = useParams();
  // console.log(productId);

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };


  function getProductDetails(productId) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
      .then(({ data }) => {
        // console.log(data.data)=]
        setProductDetails(data.data);
        SetIsLoading(false)
      })
      .catch((error) => {
        console.log(error);
        SetIsLoading(false)
        
      });
  }

  function getRelatedProducts(productCategory) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        let allProducts = data.data;
        // console.log(allProducts);
        let related = allProducts.filter(
          (product) => product.category.name == productCategory
        );
        // console.log(related);
        setRelatedProducts(related);
      })
      .catch(() => {});
  }

  useEffect(() => {
    getProductDetails(productId);
    getRelatedProducts(productCategory);
  }, [productId,productCategory]);

  return (
    <>          
    
      <div className="container mx-auto">
        <div className="flex justify-center items-center">
          {isLoading ? <Loader /> : null}
        </div>
        <div className="flex flex-wrap">
        <div className="w-1/4">
        <Slider {...settings}>
          {productDetails?.images.map((src,index)=><img key={index} className="w-full" src={src} alt={productDetails?.title}/>)}
        </Slider>
        </div>
        <div className="w-3/4 p-6 flex flex-col justify-center">
          <h1 className="text-lg font-normal text-gray-950">
            {productDetails?.title}
          </h1>
          <p className="text-gray-600 font-light mt-4">
            {productDetails?.description}
          </p>
          <div className="flex justify-between items-center my-4">
            <span>{productDetails?.price} EGY</span>
            <span>
              {productDetails?.ratingsAverage}{" "}
              <i className="fas fa-star rating-color"></i>
            </span>
          </div>
          <button onClick={()=>addProductToCart(productDetails.id)} className="btn">add to cart</button>
        </div>
        </div>

      </div>

      <div className="row">
        {relatedProducts.map((product) => (
          <div key={product.id} className="w-1/6 px-4">
            <div className="product py-4">
              <Link
                to={`/productdetails/${product.id}/${product.category.name}`}
              >
                <img
                  className="w-full"
                  src={product.imageCover}
                  alt={product.title}
                />
                <span className="block font-light mt-2 text-green-600">
                  {product.category.name}
                </span>
                <h3 className="text-lg font-normal text-gray-800 mb-4">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h3>

                <div className="flex justify-between items-center">
                  <span>{product.price} EGY</span>
                  <span>
                    {product.ratingsAverage}{" "}
                    <i className="fas fa-star text-yellow-400"></i>
                  </span>
                </div>
                <button className="btn">add to cart</button>
              </Link>
            </div>
          </div>
        ))}
      </div>


    </>
  );
}
