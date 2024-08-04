import axios from "axios";
import { createContext } from "react";

export let ForgetPassContext= createContext();

export default function ForgetPassContextProvider(props){

    async function postForgetPass(userEmail){
        await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",{
            email:userEmail
        }).then((res)=>{
            console.log(res,"Success in")
        }).catch((error)=>{
            console.log(error)
        })
    }
    
    async function verifyCode(resetCode) {
        try {
          const res = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
            resetCode: resetCode,
          });
          console.log(res, "Success in");
          return res;
        } catch (error) {
          console.error("Error in verifyCode:", error);
          throw error;
        }
      }

   async function resPass(userEmail, newPass) {
    return await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
      email: userEmail,
      newPassword: newPass,
    }).then((response) => {
      console.log(response, "Success in reset pass");
      return response; // Return the response to be used by the calling function
    }).catch((error) => {
      console.error("Error resetting password:", error.response ? error.response.data : error.message);
      throw error; // Rethrow the error to handle it in the calling function
    });
  }
  

    return <ForgetPassContext.Provider value={{postForgetPass,verifyCode,resPass}}>
        {props.children}
    </ForgetPassContext.Provider>
}