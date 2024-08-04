import React, { useEffect, useState }  from 'react'
import Style from './Brands.module.css'
import axios from "axios";

export default function Brands() {
  const [brands, setBrands]= useState([])
  const [brandName, satbrandName]= useState('')
  const [brandSlug, setbrandSlug]= useState('')
  const [brandImg, setbrandImg]= useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);


  async function getBrands(){
    await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
    .then(({ data }) => {
      console.log(data.data,"in brands");
      setBrands(data?.data);
    })
    .catch((error) => {});
  }

  async function showingRelatedPopOut(id,name, slug, img){
   await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
    .then(({ data }) => {
      console.log(data.data);
      satbrandName(name);
      setbrandSlug(slug);
      setbrandImg(data.data.image);
      setIsModalOpen(true)
    })
    .catch((error) => {console.log(error)});
  }

    function closeModal() {
    setIsModalOpen(false); // Close the modal
  }

  useEffect(() => {
    getBrands();
  }, []);


  return (<>
   <div className="container mx-auto p-4">
        <div className="mt-2 p-4">
          <h1 className="text-4xl text-green-600 font-medium text-center my-10">All Brands</h1>
          <div className="grid grid-cols-4 gap-4 my-10">
            {brands.map((brand) => (
              <div
                key={brand._id}
                className="card border rounded-lg shadow-lg p-4"
                onClick={() => showingRelatedPopOut(brand._id, brand.name, brand.slug)}
              >
                <div className="card-img mb-4">
                  <img className="w-full object-cover rounded-lg" src={brand.image} alt={brand.name} />
                </div>
                <div className="card-title">
                  <h2 className="text-center text-md font-medium text-black">{brand.name}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={closeModal}
              >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5 space-y-4 flex items-center justify-center">
              <div className="grid grid-col-6">
                <h4 className="text-3xl text-green-600">{brandName}</h4>
                <p>{brandSlug}</p>
              </div>
              <img src={brandImg} alt={brandName} className="w-[40%] translate-x-[33%]" />
            </div>
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="button"
                className="translate-x-[400%] text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
