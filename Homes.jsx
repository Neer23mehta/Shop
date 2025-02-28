import { useEffect, useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { additems } from "./Store/StoreR";
import "../EcommerseUI/Homes.css";
import { addTask } from "./Store/StoreS";

const Api = "https://fakestoreapi.com/products";

export const Homes = ({ isloggedIn }) => {
    const [data, setdata] = useState([]);
    const check = useSelector((state) => state.items);
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const getapis = async () => {
        try {
            const res = await fetch(Api);
            const data = await res.json();
            setdata(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleclick = (event,curElem,userId) => {
        event.stopPropagation(); 
        alert("Your Item Is Added");
        dispatch(additems(curElem, userId));
        // dispatch(addTask(curElem));
    };

    useEffect(() => {
        getapis();
    }, []);

    const handleclickcard = (id, event) => {
        event.stopPropagation(); 
        Navigate(`/${id}`);
    };

    return (
        <div className="Main-Container">
            <ul className="Main-ul">
                {data.map((curElem) => {
                    const { price, category, rating, image, title, id } = curElem;
                    const newprice = Math.round(price * 86.7); 
                    return (
                        <li
                            key={id}
                        >
                            <div className="Main-card">
                                <div className="Image">
                                    <img src={image} alt={title} onClick={(event) => handleclickcard(id, event)} />
                                </div>
                                <div className="content">
                                    <h1>
                                        {title.length > 15 ? title.slice(0, 15) + "..." : title}
                                    </h1>
                                    <h1>Price: {newprice}Rs</h1>
                                    <div className="Btn-content">
                                        <button onClick={(event) => handleclick(event,curElem,1)}>
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
