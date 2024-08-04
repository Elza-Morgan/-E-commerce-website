import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "@fortawesome/fontawesome-free/css/all.min.css"
import './index.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CounterContextProvider from './Context/CounterContext.jsx'
import TokenContextProvider from './Context/TokenContext.jsx'
import CartContextProvider from './Context/CartContext.jsx'
import WishListContextProvider from './Context/WishListContext.jsx'
import ForgetPassContextProvider from './Context/ForgetPasswordContext.jsx'
import { LoadingProvider } from './Context/LoaderContext.jsx'
// import CheckoutContextProvider from './Context/CheckoutContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(


<LoadingProvider>
<ForgetPassContextProvider>
  <WishListContextProvider>  
    <CartContextProvider>
    <TokenContextProvider>
      <CounterContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>,
      </CounterContextProvider>
    </TokenContextProvider>
    </CartContextProvider>
  </WishListContextProvider>
</ForgetPassContextProvider>
</LoadingProvider>

)
