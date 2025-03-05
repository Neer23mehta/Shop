import { useEffect, useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { additems } from "./Store/StoreR";
import "../EcommerseUI/Homes.css";
import { addTask } from "./Store/StoreS";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";

const Api = "https://fakestoreapi.com/products";

export const Homes = ({ isloggedIn }) => {
    const [data, setdata] = useState([]);
  const items = useSelector((state) => state.items);
  console.log("homeitem",items)

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
        dispatch(additems(curElem, userId));
        // toast.success(' Item Added!', {
        //     position: "top-right",
        //     autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "light",
        //     transition: Bounce,
        //     });
        // dispatch(addTask(curElem));
        toast.success('Successfully Added To!')
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
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
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
                                    <img src={image} alt={title} />
                                </div>
                                <div className="content">
                                    <h1>
                                        {title.length > 15 ? title.slice(0, 15) + "..." : title}
                                    </h1>
                                    <h1>Price: {newprice}Rs</h1>
                                    <div className="Btn-content">
                                        <button onClick={(event) => handleclickcard(id, event)}>
                                            View
                                        </button>
                                        <button onClick={(event) => handleclick(event, curElem, userId)}>
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </div>
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
    );
};
