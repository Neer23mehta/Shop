import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmorder, persistor } from "./Store/StoreR";
import { Navigate, NavLink } from "react-router-dom";
import "../EcommerseUI/Order.css";
import { confirmOrder } from "./Store/StoreS";

export const Order = () => {
    const items = useSelector((state) => state.items); 
    const [state, setState] = useState(false);
    const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const newTotal = Math.round(totalPrice * 86.7); 
    const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
    const dispatch = useDispatch();

    const handleConfirm = () => {
        const userInfo = window.confirm("Your Order Is Confirmed");
        if (userInfo === true) {
            dispatch(confirmorder(items)); 
            setState(true);
            // persistor.purge();
        } else {
            setState(false);
        }
    };

    if (state === true) {
        return <p>Your Order Is Placed</p>;
    }

    return (
        <div className="order-container">
            <p id="p1">Total Amount: {newTotal} Rs</p>
            <ul className="order-detail">
                {items.map((curVal, index) => {
                    const { id, title, description, price } = curVal;
                    const newPrice = Math.round(price * 86.7); 
                    return (
                        <li key={index}>
                            <p>Name: {title}</p>
                            <p>Price: {newPrice} Rs</p>
                            <NavLink to={`/${id}`}>
                                <button>Detail</button>
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
            <button onClick={() => handleConfirm()}>Confirm</button>
        </div>
    );
};
