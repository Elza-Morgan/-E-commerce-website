import React, { useContext, useState } from "react";
import { ForgetPassContext } from "../../Context/ForgetPasswordContext";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../../Context/TokenContext";
import { LoadingContext } from "../../Context/LoaderContext";
import Loader from "../Loader/Loader";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function RestPassword() {
  const { resPass } = useContext(ForgetPassContext);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const { setToken } = useContext(TokenContext);
  const navigate = useNavigate();

  async function handlingUpdatRestPass(values) {
    setIsLoading(true);
    try {
      const res = await resPass(values.email, values.password);
      console.log(res, "Password Reset Response");
      localStorage.setItem("userToken",res.data.token);
      setToken(res.data.token);
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  const UpdateSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "Password must start with a capital letter and be between 5 and 10 characters"
      )
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: UpdateSchema,
    onSubmit: handlingUpdatRestPass,
  });

  return (
    <div className="container mx-auto">
      {isLoading ? (
        <Loader />
      ) : (
        <form className="mt-[70px]" onSubmit={formik.handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-gray-900 dark:text-white text-2xl font-semibold"
            >
              Please enter your email
            </label>
            <input
              type="email"
              id="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              className="h-[60px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Email"
            />
            {formik.errors.email && formik.touched.email ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.email}
              </div>
            ) : null}
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-gray-900 dark:text-white text-2xl font-semibold"
            >
              Reset your account password
            </label>
            <input
              type="password"
              id="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              className="h-[60px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter new password"
            />
            {formik.errors.password && formik.touched.password ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <button
            type="submit"
            className="text-[#198754] rounded-lg border border-[#198754] hover:bg-green-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium text-md w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Reset password
          </button>
        </form>
      )}
    </div>
  );
}
