import React, { useEffect,useState } from 'react'
import Style from './CategoriesSlider.module.css'
import Slider from "react-slick";
import axios from 'axios';
import Loader from "../Loader/Loader";


export default function CategoriesSlider(){
  const [categories, setCategories] = useState([]);
  const [isLoading, SetIsLoading] = useState(true);


  let settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 8,
    slidesToScroll: 3,
    autoplay:true
  };
  
  function getCatogries() {
    axios.get("https://ecommerce.routemisr.com/api/v1/categories")
      .then(({ data }) => {
        console.log(data.data);
        setCategories(data.data);
        SetIsLoading(false);
        
      })
      .catch((error) => {});
  }

  useEffect(()=>{
    getCatogries();
  },[]);

  return (<>
          <div className='py-5'>
            <div className="flex justify-center items-center">
              {isLoading ? <Loader /> : null}
            </div>  
            <h2 className=' py-4 text-gray-800 font-light text-medium mt-5'>Shop Popular Catpgpries</h2>
          <Slider {...settings}>
            {categories.map((category)=> <div key={category._id}><img className='cateogry-img w-full'src={category.image} alt={category.name}/>  
             <h3 className='font-light mt-2'>{category.name}</h3></div>)}
          </Slider>
          </div>
  </>
  )
}