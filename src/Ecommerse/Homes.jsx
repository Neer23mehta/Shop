import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { additems, persistor } from "./Store/StoreR";
import { Bounce, toast, ToastContainer, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Api = "https://fakestoreapi.com/products";

export const Homes = ({ isloggedIn }) => {
    const [data, setdata] = useState([]);
    const items = useSelector((state) => state.items);
    const check = useSelector((state) => state.items);
    const userId = useSelector((state) => state.userId);
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

    const handleclick = (event, curElem, userId) => {
        event.stopPropagation();
        if (userId) {
            dispatch(additems(curElem, userId));
            toast.success('Item Added to Cart!');
        } else {
            toast.error('You need to login first!');
        }
    };

    useEffect(() => {
        persistor.purge();
        getapis();
    }, []);

    const handleclickcard = (id, event) => {
        event.stopPropagation();
        Navigate(`/${id}`);
    };

    return (
        <div className="flex flex-wrap justify-center">
            <ul className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
                {data.map((curElem) => {
                    const { price, category, rating, image, title, id } = curElem;
                    const newprice = Math.round(price * 86.7);
                    return (
                        <li key={id} className="border border-gray-200 rounded-lg shadow-md overflow-hidden">
                            <div className="p-3 flex flex-col items-center">
                                <div className="w-full h-40 flex justify-center items-center">
                                    <img src={image} alt={title} className="object-contain max-h-full max-w-full" />
                                </div>
                                <div className="mt-3 text-center">
                                    <h1 className="text-sm font-semibold truncate max-w-xs">
                                        {title.length > 15 ? title.slice(0, 15) + "..." : title}
                                    </h1>
                                    <h1 className="text-lg font-bold text-gray-800 mt-2">Price: {newprice}Rs</h1>
                                    <div className="mt-3 flex gap-2 justify-center">
                                        <button
                                            onClick={(event) => handleclickcard(id, event)}
                                            className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition"
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={(event) => handleclick(event, curElem, userId)}
                                            className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition"
                                        >
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
