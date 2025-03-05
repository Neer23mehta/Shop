import { useEffect, useState } from "react";
import "../EcommerseUI/Buynow.css";
import { useSelector } from "react-redux";
import { Navigate, NavLink, useNavigate } from "react-router-dom";

const key = "order_detail"; 

export const buynowdetails = async ({request}) => {
    try {
        const input = await request.input();
        const data = Object.fromEntries(input);

    } catch (error) {
        console.log(error)
    }
}

export const Buynow = () => {
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

    const Navigate = useNavigate();
    const [citysuggest, setcitySuggest] = useState([]);
    const [pinvalid, setpinvalid] = useState(true);

    const totalPrice = Math.round(items.reduce((acc, item) => acc + item.price * item.quantity, 0)*86.7);
    const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

    const fetchgetdata = async (pincode) => {
        try {
            const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
            const data = await res.json();
            if (data[0].Status === "Success") {
                setcitySuggest(data[0].PostOffice);
                setpinvalid(true);
            } else {
                setcitySuggest([]);
                setpinvalid(false);
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
            fetchgetdata(value);
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

        const pinpattern = /^[0-9]{6}$/;
        if (!pinpattern.test(input.pincode)) {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            localStorage.setItem(key, JSON.stringify(input));
        }
        localStorage.removeItem(key)
    };

    const handleorder = () => {
        const user = window.confirm("Are you sure you want to buy?");
        if (user && validateForm()) {
             Navigate (`/buynow/${Math.random()}`);
        } else {
            Navigate ("/buynow"); 
        }
    };

    if (!totalPrice) {
        return (
            <div>
                <h1>Your Order is Placed And It is</h1>
            </div>
        )
    }
    
    return (
        <div className="form-container">
            <form method="POST" action="/buynow" onSubmit={handleSubmit}>
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
                {!pinvalid && <span className="error">Invalid Pin Code</span>}

                {citysuggest.length > 0 && (
                    <div className="city-suggestions">
                        {citysuggest.map((city, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                    setInput({ ...input, pincode: city.Pincode, city: city.Name });
                                    setcitySuggest([]);
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
                    <p>Total Price: {totalPrice}Rs</p>
                    <p>Total Quantity: {totalQuantity}</p>
                    {/* <button type="submit" className="btn">Submit</button> */}
                    <NavLink to={`/buynow/${Math.random()}`}>
                        <button type="submit" onClick={handleorder}>Order</button>
                    </NavLink>
                </div>
            </form>
        </div>
    );
};
