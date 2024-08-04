import React, { useContext, useState } from 'react';
import Style from './ForgetPass.module.css';
import { ForgetPassContext } from '../../Context/ForgetPasswordContext';
import { useNavigate } from 'react-router-dom';
import Loader from "../Loader/Loader";
import { LoadingContext } from '../../Context/LoaderContext';
import { useFormik } from "formik";
import * as Yup from "yup";

export default function ForgetPass() {
  const { postForgetPass } = useContext(ForgetPassContext);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const navigate = useNavigate();

  // Formik validation schema
  const emailSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
  });

  async function handlingEmail(values){
    setIsLoading(true);
    try{
      await postForgetPass(values.email); // Await the asynchronous function
        navigate('/verifycode');
    } catch (error){
      console.error(error);
    } finally {
      setIsLoading(false);
    }

  }

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: emailSchema,
    onSubmit: handlingEmail
  });

  return (
    <div className='container mx-auto'>
      {isLoading ? <Loader /> :
        <form className='mt-[70px]' onSubmit={formik.handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-gray-900 dark:text-white text-2xl font-semibold">Please enter your email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`h-[60px] bg-gray-50 border  text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              placeholder="Email"
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {formik.errors.email}
              </div>
            ) : null}
          </div>
          <button type="submit" className="text-[#198754] rounded-lg border border-[#198754] hover:bg-green-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium text-md w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Verify</button>
        </form>
      }
    </div>
  );
}
