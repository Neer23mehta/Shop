import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Layout } from "./Ecommerse/Layout";
import { Homes } from "./Ecommerse/Homes";
import { SignUP } from "./Ecommerse/SignIn";
import { LogIN } from "./Ecommerse/LogIN";
import { Cart } from "./Ecommerse/Cart";
import { Error } from "./Ecommerse/Error";
import { Product } from "./Ecommerse/Product";
import { getbuydetails, getbuysdetail, getcartdetails, getorderdetail, getproductdetails } from "./Ecommerse/Products";
import { PrivateRoute } from './Ecommerse/Private';
import { Contact, contactData } from './Ecommerse/Contact';
import { About } from './Ecommerse/About';
import { CartDetails } from './Ecommerse/CartDetails';
import { Buynow, buynowdetails } from './Ecommerse/Buynow';
import { BuyNow, buynowDetails } from "./Ecommerse/Buynows";
import { Order } from './Ecommerse/Order';
import { OrderNow } from './Ecommerse/OrderNow';
import { Orders } from './Ecommerse/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const Router = createBrowserRouter([
    {
      path: "/",
      element: <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Homes />
        },
        {
          path: "/:productid",
          element: <Product />,
          loader: getproductdetails,
        },
        {
          path: "/:productid/buynow",
          element: <BuyNow />,
          action: buynowDetails,
          loader: getbuysdetail,
        },
        {
          path: "/:productid/buynow/orders",
          element: <OrderNow />,
          loader: getorderdetail,
        },
        {
          path: "/cart",
          element: isLoggedIn ? <Cart /> : <Navigate to="/log-in" />,
          loader: getcartdetails,
        },
        {
          path: "/buynow",
          element: <Buynow />,
          action: buynowdetails,
        },
        {
          path: "/buynow/:buynowid",
          element: <Order />,
        },
        {
          path: "/orders",
          element: isLoggedIn ?  <Orders /> : <Navigate to="/log-in"/>,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
          action: contactData,
        },
        {
          path: "/signin",
          element: <SignUP />,
        },
        {
          path: "/log-in",
          element: <LogIN setIsLoggedIn={setIsLoggedIn} />,
        },
      ],
    }
  ]);

  return (
    <>
    <RouterProvider router={Router} />
    </>
  );
}

export default App;