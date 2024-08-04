import React, { useContext } from "react";
import Style from "./NavBar.module.css";
import logo from "../../assets/images/logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import {TokenContext} from "../../Context/TokenContext";
import { CartContext } from "../../Context/CartContext";


export default function NavBar() {

  let {token,setToken} = useContext(TokenContext);
  let{noOfCartItems}= useContext(CartContext);
  console.log(noOfCartItems)
  console.log(token)
  let navigate = useNavigate()

  function logOut(){
    localStorage.removeItem('userToken');
    setToken(null);
    navigate('/login');
  }

  return (
    <>
      <nav className="bg-gray-100 text-center static lg:fixed top-0 left-0 right-0 items-center z-40">
        <div className="container justify-between mx-auto py-4 flex flex-col  items-center lg:flex-row">
          {/*! Left-side of the Nav */}
          <div className="flex flex-col lg:flex-row">
            <img width={110} src={logo} alt="fresh cart logo" />
            <ul className="flex flex-col lg:flex-row items-center">
              {token ? (
                <>
                  <li className="py-2">
                    <NavLink
                      className="mx-2 text-lg text-slate-900 font-light"
                      to=""
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="py-2">
                    <NavLink
                      className="relative mx-2  text-lg text-slate-900 font-light"
                      to="cart"
                    >
                      Cart
                      <span className="absolute top-[-10px] right-[-15px] inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                        {noOfCartItems}
                      </span>
                    </NavLink>
                  </li>
                  <li className="py-2">
                    <NavLink
                      className="mx-2  text-lg text-slate-900 font-light"
                      to="products"
                    >
                      Products
                    </NavLink>
                  </li>
                  <li className="py-2">
                    <NavLink
                      className="mx-2  text-lg text-slate-900 font-light"
                      to="brands"
                    >
                      Brands
                    </NavLink>
                  </li>
                  <li className="py-2">
                    <NavLink
                      className="mx-2  text-lg text-slate-900 font-light"
                      to="categories"
                    >
                      Categories
                    </NavLink>
                  </li>
                  <li className="py-2">
                    <NavLink
                      className="mx-2  text-lg text-slate-900 font-light"
                      to="wishlist"
                    >
                      Wish-List
                    </NavLink>
                  </li>
                </>
              ) : null}
            </ul>
          </div>

          {/*! Right-side of the Nav */}
          <div>
            <ul className="flex items-center flex-col lg:flex-row">
              {token?(
                <li className="py-2">
                  <a  onClick={logOut}  className="mx-2  text-lg text-slate-900 font-light cursor-pointer">
                    Logout
                  </a>
                </li>
              ): (
                <>
                  <li className="py-2">
                    <NavLink
                      className="mx-2  text-lg text-slate-900 font-light"
                      to="login"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="py-2">
                    <NavLink
                      className="mx-2  text-lg text-slate-900 font-light"
                      to="register"
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              )  
               } 
              <li className="flex items-center py-2">
                <i className="fab fa-facebook mx-2"></i>
                <i className="fab fa-twitter mx-2"></i>
                <i className="fab fa-instagram mx-2"></i>
                <i className="fab fa-youtube mx-2"></i>
                <i className="fab fa-tiktok mx-2"></i>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
