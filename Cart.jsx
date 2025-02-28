import { useDispatch, useSelector } from "react-redux";
import { additems, deleteitems, updateQuantity } from "./Store/StoreR";
import { useEffect, useState } from "react";
import { postApi } from "../api/Postapi";
import { MdDelete } from "react-icons/md";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import "/home/tristate/Desktop/Neer/neer/src/EcommerseUI/Cart.css";

export const Cart = () => {
  const items = useSelector((state) => state.items); 
  const userId = useSelector((state) => state.userId);  
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const calculatedTotalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const calculatedTotalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
    setTotalPrice(Math.round(calculatedTotalPrice * 86.7)); 
    setTotalQuantity(calculatedTotalQuantity);

    if (userId) {
      postApi(userId, items);
    }
  }, [items, userId]);

  const handleDelete = (id, event) => {
    event.stopPropagation();
    dispatch(deleteitems(id)); 
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

  return (
    <div className="Cart-Main">
      <h1>Cart</h1>
      <div className="Cart-ul">
        <ul>
          {items.map((curItem) => {
            const { id, title, price, image, quantity } = curItem;
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
                  <MdDelete />
                </button>
                <button onClick={(event) => handleQuantityChange(id, quantity + 1, event)}>+</button>
                <button onClick={(event) => handleQuantityChange(id, quantity - 1, event)} disabled={quantity <= 1}>-</button>
              </li>
            );
          })}
        </ul>
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
