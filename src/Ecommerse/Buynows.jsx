import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useLoaderData } from "react-router-dom";
import { additems, confirmorder } from "./Store/StoreR";

const key = "order_detail_single";

export const buynowDetails = async ({ request }) => {
  try {
    const input = await request.input();
    const data = Object.fromEntries(input);
  } catch (error) {
    console.log(error);
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

  const handleSubmit = (e, buydetails, userId) => {
    e.preventDefault();
    if (validateForm()) {
      localStorage.setItem(key, JSON.stringify(input));
      Navigate(`${id}/buynow/orders`);
      dispatch(additems(buydetails, userId));
      dispatch(confirmorder(buydetails));
    } else {
      Navigate(`${id}/buynow`);
    }
  };

  const { id, title, description, rating, price, image, category } = buydetails;
  const newprice = Math.round(price * 86.7);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-semibold text-center mb-6">Order Details</h1>
      <form method="POST" action="/buynow" onSubmit={(e) => handleSubmit(e, buydetails, 1)} className="space-y-6">
        <div>
          <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">Full Name:</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            value={input.fullname}
            onChange={handleChange}
            required
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.fullname && <span className="text-red-500 text-xs">{errors.fullname}</span>}
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={input.address}
            onChange={handleChange}
            required
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.address && <span className="text-red-500 text-xs">{errors.address}</span>}
        </div>

        <div>
          <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">Pin Code:</label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            value={input.pincode}
            onChange={handleChange}
            maxLength="6"
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.pincode && <span className="text-red-500 text-xs">{errors.pincode}</span>}
          {!pinInvalid && <span className="text-red-500 text-xs">Invalid Pin Code</span>}
        </div>

        {citysuggest.length > 0 && (
          <div className="bg-gray-100 p-2 rounded-md">
            <ul>
              {citysuggest.map((city, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setInput({ ...input, pincode: city.Pincode, city: city.Name });
                    setCitySuggest([]);
                  }}
                  className="cursor-pointer p-2 hover:bg-blue-100"
                >
                  {city.Name} - {city.Pincode}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={input.city}
            onChange={handleChange}
            required
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.city && <span className="text-red-500 text-xs">{errors.city}</span>}
        </div>

        <div>
          <label htmlFor="number" className="block text-sm font-medium text-gray-700">Phone Number:</label>
          <input
            type="text"
            id="number"
            name="number"
            value={input.number}
            onChange={handleChange}
            required
            maxLength="10"
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.number && <span className="text-red-500 text-xs">{errors.number}</span>}
        </div>

        <div className="mt-4 text-center">
          <p className="text-lg font-medium">Total Price: {newprice} Rs</p>
          <NavLink to={`/${id}/buynow/orders`}>
            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600"
            >
              Place Order
            </button>
          </NavLink>
        </div>
      </form>
    </div>
  );
};
