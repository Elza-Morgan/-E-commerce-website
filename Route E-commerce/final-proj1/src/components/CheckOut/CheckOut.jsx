import React, { useEffect, useState, useContext } from "react";
import Style from "./CheckOut.module.css"; // Ensure to use this if you have custom styles
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { LoadingContext } from '../../Context/LoaderContext';
import Loader from "../Loader/Loader";
import axios from "axios";

export default function CheckOut() {
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  let {cartId}=useParams();
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  const paymentSchema = Yup.object().shape({
    details: Yup.string().required("Details are required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Phone number must be a valid Egyptian number")
      .required("Phone is required"),
    city: Yup.string().required("City is required"),
  });

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema: paymentSchema,
    onSubmit: handlePayment,
  });

  async function handlePayment() {
    setIsLoading(true);
    try {
      console.log(formik.values)
      await checkOut(formik.values);
      // Navigate or show success message after successful checkout
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function checkOut(address){
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,{
      "shippingAddress":address
    },{params:{
      url:"http://localhost:5173"
    },
      headers:headers
    })
    console.log(data,"from Cart comp")
    console.log(data.session.url)
    open(data.session.url, '_self')
   }


  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <form
          className="mx-auto mt-[60px] w-[80%]"
          onSubmit={formik.handleSubmit}
        >
          <div className="mb-5">
            <label
              htmlFor="details"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Details
            </label>
            <input
              type="text"
              id="details"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.details}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {formik.errors.details && formik.touched.details && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.details}
              </div>
            )}
          </div>

          <div className="mb-5">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phone}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {formik.errors.phone && formik.touched.phone && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.phone}
              </div>
            )}
          </div>

          <div className="mb-5">
            <label
              htmlFor="city"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.city}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {formik.errors.city && formik.touched.city && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.city}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={!(formik.isValid && formik.dirty)}
            className={`w-full relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800 ${
              !(formik.isValid && formik.dirty) ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Pay Now
            </span>
          </button>
        </form>
      )}
    </>
  );
}
