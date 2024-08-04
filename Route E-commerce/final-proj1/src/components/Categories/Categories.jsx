import React, { useEffect, useState } from "react";
import Style from "./Categories.module.css";
import axios from "axios";

export default function Categories() {
  const [getcategories, setGetCategories] = useState([]);
  const [subCats, setSubCats] = useState([]);
  const [title, setTitle]=useState("");
  const [selectedWordSubcat, setselectedWordSubcat]= useState('')

  function getCatogries() {
    axios.get("https://ecommerce.routemisr.com/api/v1/categories")
      .then(({ data }) => {
        console.log(data.data);
        setGetCategories(data.data);
      })
      .catch((error) => {});
  }

  function getSubCategories(id, title) {
    console.log(id);
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
      .then(({ data }) => {
        console.log(data.data);
        setSubCats(data.data);
        setTitle(title);
        setselectedWordSubcat('subcategories');
      })
      .catch((error) => {});
  }

  useEffect(() => {
    getCatogries();
  }, []);

  return (
    <>
      <div className="row flex items-center justify-center gap-5">
        {getcategories.map((category) => (
          <div key={category._id}
            className="card w-fit"
            onClick={() => getSubCategories(category._id, category.name)}
          >
            <div className="card-img w-[400px] h-[300px] overflow-hidden">
              <img
                className="translate-y-[-20%] w-full aspect-square"
                src={category.image}
              />
            </div>
            <div className="card-title">
              <h2 className="text-center text-3xl text-bold p-3 font-medium text-green-700">
                {category.name}
              </h2>
            </div>
          </div>
        ))}
      </div>

      <div className="row flex flex-col justify-start">
      <h2 className="text-center text-3xl text-bold p-3 font-medium text-green-500">{title} {selectedWordSubcat} </h2>
          <div className="row flex justify-start gap-4">
              {subCats.map((cat)=>
                <div className="w-[30%] text-center rounded-md border-[1px] text-3xl border-gray-300 h-[70px] flex items-center justify-center img-hovr">{cat.name}</div>
              )}
          </div>
      </div>



     
    </>
  );
}
