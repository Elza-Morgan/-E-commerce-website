import { createContext, useEffect, useState } from "react";
import axios from "axios";

export let TokenContext = createContext();

export default function TokenContextProvider(props) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setToken(localStorage.getItem("userToken"));
    }
  }, []);

  // After setting the token we need to capture the id associated with this token
  const captureId = async (email) => {
    try {
      // Initial request to get the first page and total pages
      const initialResponse = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/users"
      );
      const totalPages = initialResponse.data.metadata.numberOfPages;
      let users = initialResponse.data.users;

      // Create an array of promises for the remaining pages
      const promises = [];
      for (let page = 2; page <= totalPages; page++) {
        promises.push(
          axios.get(`https://ecommerce.routemisr.com/api/v1/users?page=${page}`)
        );
      }

      // Await all promises and concatenate results
      const responses = await Promise.all(promises);
      responses.forEach((response) => {
        users = users.concat(response.data.users);
      });

      const capturedUser = users.find((user) => user.email === email);
      if (capturedUser) {
        userId = capturedUser._id;
        console.log("User:\n", capturedUser);
        return userId;
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <TokenContext.Provider value={{ token, setToken, captureId }}>
      {props.children}
    </TokenContext.Provider>
  );
}
