import { useEffect, useState } from "react";
import "../EcommerseUI/Buynow.css";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink, useLoaderData, useNavigate } from "react-router-dom";
import { confirmOrder } from "./Store/StoreS";
import { additems, confirmorder } from "./Store/StoreR";

const key = "order_detail_single"; 

export const buynowDetails = async ({request}) => {
    try {
        const input = await request.input();
        const data = Object.fromEntries(input);
    } catch (error) {
        console.log(error)
    }
};

export const BuyNow = () => {
    const buydetails = useLoaderData();
    const items = useSelector((state) => state.items);
    const [input, setInput] = useState({
        fullname: "",
        address: "",
        number: "",
        pincode: "",
        city: "",
    });

    const [errors, setErrors] = useState({
        fullname: "",
        address: "",
        number: "",
        pincode: "",
        city: "",
    });

    const [citysuggest, setCitySuggest] = useState([]);
    const [pinInvalid, setPinInvalid] = useState(true);

    const Navigate = useNavigate();
    const dispatch = useDispatch();

    // const totalPrice = item.price

    const fetchGetData = async (pincode) => {
        try {
            const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
            const data = await res.json();
            if (data[0].Status === "Success") {
                setCitySuggest(data[0].PostOffice);
                setPinInvalid(true);
            } else {
                setCitySuggest([]);
                setPinInvalid(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const orderData = localStorage.getItem(key);
        if (orderData) {
            setInput(JSON.parse(orderData));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value,
        });

        if (name === "pincode" && value.length === 6) {
            fetchGetData(value);
        }
    };

    const validateForm = () => {
        let valid = true;
        let errors = {};

        if (!input.fullname) {
            errors.fullname = "Full Name is required";
            valid = false;
        }

        if (!input.address) {
            errors.address = "Address is required";
            valid = false;
        }

        const phonePattern = /^[0-9]{10}$/;
        if (!phonePattern.test(input.number)) {
            errors.number = "Please enter a valid 10-digit phone number";
            valid = false;
        }

        const pinPattern = /^[0-9]{6}$/;
        if (!pinPattern.test(input.pincode)) {
            errors.pincode = "Please enter a valid 6-digit pincode";
            valid = false;
        }

        if (!input.city) {
            errors.city = "City is required";
            valid = false;
        }

        setErrors(errors);
        return valid;
    };
    const handleSubmit = (e,buydetails,userId) => {
        e.preventDefault();
        if (validateForm()) {
            localStorage.setItem(key, JSON.stringify(input));
            Navigate(`${id}/buynow/orders`)
            dispatch(additems(buydetails, userId));
            dispatch(confirmorder(buydetails))
        }
        else{
             Navigate(`${id}/buynow`)
        }
    };

    const{id,title,description,rating,price,image,category} = buydetails;
    // const totalPrice = item.reduce((acc, item) => acc + item.price * item.quantity, 0);
    // console.log(item)
    const newprice = Math.round(price*86.7)
    
    return (
        <div className="form-container">
            <form method="POST" action="/buynow" onSubmit={(e)=>handleSubmit(e,buydetails,1)}>
                <label htmlFor="fullname">Full Name:</label>
                <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    value={input.fullname}
                    onChange={handleChange}
                    required
                />
                {errors.fullname && <span className="error">{errors.fullname}</span>}

                <label htmlFor="address">Address:</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={input.address}
                    onChange={handleChange}
                    required
                />
                {errors.address && <span className="error">{errors.address}</span>}

                <label htmlFor="pincode">Pin Code:</label>
                <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={input.pincode}
                    onChange={handleChange}
                    maxLength="6"
                />
                {errors.pincode && <span className="error">{errors.pincode}</span>}
                {!pinInvalid && <span className="error">Invalid Pin Code</span>}

                {citysuggest.length > 0 && (
                    <div className="city-suggestions">
                        {citysuggest.map((city, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                    setInput({ ...input, pincode: city.Pincode, city: city.Name });
                                    setCitySuggest([]);
                                }}
                            >
                                {city.Name} - {city.Pincode}
                            </li>
                        ))}
                    </div>
                )}

                <label htmlFor="city">City:</label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    value={input.city}
                    onChange={handleChange}
                    required
                />
                {errors.city && <span className="error">{errors.city}</span>}

                <label htmlFor="number">Phone Number:</label>
                <input
                    type="text"
                    id="number"
                    name="number"
                    value={input.number}
                    onChange={handleChange}
                    required
                    maxLength="10"
                />
                {errors.number && <span className="error">{errors.number}</span>}

                <div className="btn-form">
                    <p>Total Price: {newprice}Rs</p>
                    {/* <button type="submit" className="btn">Submit</button> */}
                    <NavLink type="submit" to={`/${id}/buynow/orders`}>
                        <button>Order</button>
                    </NavLink>
                </div>
            </form>
        </div>
    );
};
