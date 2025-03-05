import { useSelector } from "react-redux";
import "../EcommerseUI/Orders.css";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

export const Orders = () => {
    const confirmOrder = useSelector((state) => state.confirmOrder); 
    // const [data,setdata] = useState("")

//    const getapis = async () => {
//     try {
//         const res = await fetch ("http://localhost:3004/posts")
//         const data = await res.json();
//         setdata(data);
//     } catch (error) {
//         console.log(error)
//     }
//    } 
//    useEffect(()=>{
//     getapis();
//    },[])
    // console.log("hello")
    // console.log("confirm",confirmOrder)
    return (
        <div className="Order">
            <h2 id="hh">Confirmed Orders</h2>
            {confirmOrder.length > 0 ? (
                confirmOrder.map((order, index) => {
                    return (
                        <div key={index} className="confirmed-order">
                            <h3 id="h3">Orders Are</h3>
                            <ul className="uLs">
                                {order.map((item, i) => {
                                    const { title, price, quantity, image } = item;
                                    const totalPrice = Math.round(price * quantity * 86.7);
                                    const newPrice = Math.round(price * 86.7); 
                                    return (
                                        <li key={i} className="LIES">
                                            <div>
                                                <img src={image} alt={title} />
                                            </div>
                                            <p>Name: {title.length > 25 ? title.slice(0, 25) + "..." : title}</p>
                                            <p>Price: {newPrice} Rs</p>
                                            <p>Quantity: {quantity}</p>
                                            <p>Total: {totalPrice} Rs</p>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    );
                })
            ) : (
                <p>No orders confirmed yet</p>
            )}
        </div>
    );
};
