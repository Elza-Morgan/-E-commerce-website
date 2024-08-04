// import axios from "axios";
// import { createContext, useState, useContext } from "react";
// import { TokenContext } from "./TokenContext";

// export let CheckoutContext = createContext();

// export default function CheckoutContextProvider(props) {
//   let headers = {
//     token: localStorage.getItem("userToken"),
//   };

//   async function createCashOrder(userDetails, userPhone, userCity) {
//     let {data}= await axios
//       .post(
//         `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/65d5e3179c86f6003429bacd?`,
//         {
//           shippingAddress: {
//             details: userDetails,
//             phone: userPhone,
//             city: userCity,
//           },
//         },
//         {
//           params: {
//             url: "http://localhost:5173",
//           },
//           header: headers,
//         }
//       )
//       .then((res) => {
//         console.log(res);
//         return res;
//       })
//       .catch((error) => {
//         console.log(error);
//         return error;
//       });

//       console.log(data)
//   }

//   return (
//     <CheckoutContext.Provider value={{ createCashOrder }}>
//       {props.children}
//     </CheckoutContext.Provider>
//   );
// }
