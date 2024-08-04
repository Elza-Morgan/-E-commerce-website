import React, { useContext, useEffect, useState } from 'react';
import Style from './WishList.module.css';
import { WishListContext } from '../../Context/WishListContext';
import { CartContext } from '../../Context/CartContext';


export default function WishList() {
  const [wishListProducts, setWishListProducts] = useState([]);
  const { getWishListItems,removeWishListItem } = useContext(WishListContext);
  const { addToCart } = useContext(CartContext);


  async function getWishList() {
    let response = await getWishListItems();
      console.log(response, "wish list component")    
      setWishListProducts(response?.data.data);
  }

  async function addWishListToCart(productId) {
      await addToCart(productId);
  }

  async function removeItem(productId){
    await removeWishListItem(productId)
    // getWishList();
    setWishListProducts(wishListProducts.filter(item => item.id !== productId));
   }

  useEffect(() => {
    getWishList();
  }, []);

  console.log(wishListProducts, "wish list component")    


  return (
    <>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-[40px]  bg-gray-100">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
             <h2 className='text-black font-md text-3xl p-3'>My Wish List</h2>
            <tbody>
              {wishListProducts.map((item)=>(
              <tr className=" border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600 flex justify-between p-5 ">
                      <div className="left-info flex gap-7 items-center">
                          <div className="item-img">
                             <td className="p-4">
                               <img src={item.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="" />
                             </td>
                           </div>
                         <div className="item-info flex flex-col gap-2">
                              <span className='text-black text-2xl font-semibold'>{item.title}</span>
                              <span className='text-green-800 text-lg font-semibold'>{item.price} EGP</span>
                              <span onClick={()=>removeItem(item.id)} className='text-red-500 cursor-pointer'><i className="fa-solid fa-trash text-red-500"></i> Remove</span>
                         </div>
                      </div>
                          
                      {/* add to cart button */}
                       <div className="right-info">
                          <button className="px-6 py-4 rounded-lg border border-[#22db14] h-[50px] flex items-center">
                             <a onClick={()=>addWishListToCart(item.id)} className="font-medium text-lg cursor-pointer">add to cart</a>
                          </button>
                      </div>
                   </tr>

              ))}
    
            </tbody>
          </table>
        </div>

    </>
  );
}
