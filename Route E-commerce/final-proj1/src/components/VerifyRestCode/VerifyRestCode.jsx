import React, { useContext, useState } from "react";
import { ForgetPassContext } from "../../Context/ForgetPasswordContext";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../../Context/TokenContext";
import { LoadingContext } from "../../Context/LoaderContext";
import Loader from "../Loader/Loader";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function RestPassword() {
  const { verifyCode } = useContext(ForgetPassContext);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const navigate = useNavigate();

  async function verifyRestCode(values) {
    setIsLoading(true);
    try {
      const res = await verifyCode(values.code);
      console.log(res, "Password Reset Response");
      setIsLoading(false);
      navigate("/restpass");
    } catch (error) {
      console.error("Verification error:", error);
      setIsLoading(false);
    }
  }
  
  const verifySchema = Yup.object().shape({
    code: Yup.string().matches(/^[0-9]{1,}$/).required("Code is required"),
  });

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: verifySchema,
    onSubmit: verifyRestCode,
  });

  return (
    <div className="container mx-auto">
      {isLoading ? (
        <Loader />
      ) : (
        <form className="mt-[70px]" onSubmit={formik.handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="code"
              className="block mb-2 text-gray-900 dark:text-white text-2xl font-semibold"
            >
              Please Enter the Code
            </label>
            <input
              type="text"
              id="code"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.code}
              className="h-[60px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Code"
            />
            {formik.errors.code && formik.touched.code ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.code}
              </div>
            ) : null}
          </div>
          <button
            type="submit"
            className="text-[#198754] rounded-lg border border-[#198754] hover:bg-green-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium text-md w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            verify
          </button>
        </form>
      )}
    </div>
  );
}
