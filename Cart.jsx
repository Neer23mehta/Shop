import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteitems, setUserCart, updateQuantity } from "./Store/StoreR";
import { RiDeleteBin6Line } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import "/home/tristate/Desktop/Neer/neer/src/EcommerseUI/Cart.css";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { postApi } from "../api/Postapi";
import { createGlobalStyle } from "styled-components";

export const Cart = () => {
  const items = useSelector((state) => state.items);
  const userId = useSelector((state) => state.userId);
  const cartData = useSelector((state) => state.cartData);  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);


  useEffect(() => {
    if (userId) {
      const fetchCartData = async () => {
        try {
          const response = await fetch(`http://localhost:3004/posts?userId=${userId}`);
          const data = await response.json();
          if (data.length > 0) {
            dispatch(setUserCart({
              items: data[0].cartItems, 
              totalPrice: data[0].totalPrice,
              totalQuantity: data[0].totalQuantity,
            }));
          }
        } catch (error) {
          console.error("Error fetching cart data:", error);
        }
      };
      fetchCartData();
    }
  }, [userId, dispatch]);

  useEffect(() => {
    const calculatedTotalPrice = items.reduce((acc, item) => acc + item?.price * item?.quantity, 0);
    const calculatedTotalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
    setTotalPrice(Math.round(calculatedTotalPrice * 86.7)); 
    setTotalQuantity(calculatedTotalQuantity);
  }, [items]);

  const handleDelete = (id, event) => {
    event.stopPropagation();
    dispatch(deleteitems(id));
    toast.success("Item Deleted", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
      style: { backgroundColor: 'red' },
    });
  };

  const handleQuantityChange = (id, quantity, event) => {
    event.stopPropagation();
    if (quantity > 0) {
      dispatch(updateQuantity(id, quantity));
    }
  };

  const handleCheckout = () => {
    navigate("/buynow");
  };

  if (totalQuantity === 0) {
    return (
      <>
        <h1>Your Cart Is Empty</h1>
        <NavLink to="/"><button>Buy Products</button></NavLink>
      </>
    );
  }
  // const temparr=[] 

  console.log("itemsdfdfd",items)
  console.log("cartdatafddffdf",cartData)    

  return (
    <div className="Cart-Main">
      <h1>Cart</h1>
      <div className="Cart-ul">
        <ul>
          {items.map((curItem) => {
            const { id, title, price, image, quantity } = curItem;
            console.log("id",id,price,image,quantity)
            return (
              <li key={id}>
                <div className="Image">
                  <img src={image} alt={title} width="100" />
                </div>
                <div className="Content">
                  <h2>{title}</h2>
                  <h3>Price: {Math.round(price * 86.7) * quantity} Rs</h3>
                  <p>Quantity: {quantity}</p>
                </div>
                <button onClick={(event) => handleDelete(id, event)}>
                  <RiDeleteBin6Line />
                </button>
                <button onClick={(event) => handleQuantityChange(id, quantity + 1, event)}>+</button>
                <button onClick={(event) => handleQuantityChange(id, quantity - 1, event)} disabled={quantity <= 1}>-</button>
              </li>
            );
          })}
        </ul>
        {/* <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Bounce}
        /> */}
      </div>
      <div className="Total">
        <h2>Total Price: {totalPrice} Rs</h2>
        <h2>Total Quantity: {totalQuantity}</h2>
        <button onClick={handleCheckout} disabled={totalQuantity <= 0}>
          {totalQuantity > 0 ? "Buy Now" : null}
        </button>
      </div>
    </div>
  );
};
