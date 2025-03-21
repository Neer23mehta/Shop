import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmorder, persistor } from "./Store/StoreR";
import { Navigate, NavLink } from "react-router-dom";

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
        } else {
            setState(false);
        }
    };

    if (state === true) {
        return <p className="text-center text-lg text-green-500">Your Order Is Placed</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <p className="text-2xl font-semibold mb-4">Total Amount: {newTotal} Rs</p>
            <ul className="space-y-4">
                {items.map((curVal, index) => {
                    const { id, title, description, price } = curVal;
                    const newPrice = Math.round(price * 86.7); 
                    return (
                        <li key={index} className="border-b pb-4">
                            <p className="text-lg font-medium">Name: {title}</p>
                            <p className="text-md text-gray-600">Price: {newPrice} Rs</p>
                            <NavLink to={`/${id}`} className="text-blue-500 hover:underline mt-2 inline-block">
                                <button className="bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600 transition">Detail</button>
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
            <button 
                onClick={() => handleConfirm()} 
                className="w-full mt-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
                Confirm Order
            </button>
        </div>
    );
};
