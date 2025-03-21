import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteitems, setUserCart, updateQuantity } from "./Store/StoreR";
import { RiDeleteBin6Line } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { postApi } from "../api/Postapi";

export const Cart = () => {
  const items = useSelector((state) => state.items);
  const userId = useSelector((state) => state.userId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    if (userId) {
      const fetchCartData = async () => {
        try {
          const response = await fetch(`http://localhost:3004/posts?userId=${userId}`);
          const data = await response.json();
          if (data.length > 0) {
            const latestCart = data[data.length - 1]; // Show the latest data
            dispatch(setUserCart({
              items: latestCart?.cartItems,
              totalPrice: latestCart?.totalPrice,
              totalQuantity: latestCart?.totalQuantity,
            }));
          }
        } catch (error) {
          console.error("Error fetching cart data:", error);
        }
      };
      fetchCartData();
    }
  }, [userId, dispatch]);

  useEffect(() => {
    const calculatedTotalPrice = items.reduce((acc, item) => acc + item?.price * item?.quantity, 0);
    const calculatedTotalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
    setTotalPrice(Math.round(calculatedTotalPrice * 86.7)); 
    setTotalQuantity(calculatedTotalQuantity);
  }, [items]);

  const handleDelete = (id, event) => {
    event.stopPropagation();
    dispatch(deleteitems(id));
    toast.success("Item Deleted", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
      style: { backgroundColor: 'red' },
    });
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
      <div className="text-center mt-10">
        <h1 className="text-2xl font-semibold">Your Cart Is Empty</h1>
        <NavLink to="/"><button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md">Buy Products</button></NavLink>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-semibold text-center mb-6">Your Cart</h1>
      <div className="space-y-4">
        {items.map((curItem) => {
          const { id, title, price, image, quantity } = curItem;
          return (
            <div key={id} className="flex items-center justify-between p-4 border-b border-gray-300">
              <div className="flex items-center space-x-4">
                <img src={image} alt={title} width="100" className="rounded-md" />
                <div className="flex flex-col">
                  <h2 className="font-medium text-lg">{title}</h2>
                  <h3 className="text-sm text-gray-600">Price: {Math.round(price * 86.7) * quantity} Rs</h3>
                  <p className="text-sm text-gray-600">Quantity: {quantity}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={(event) => handleQuantityChange(id, quantity + 1, event)} 
                  className="bg-green-500 text-white rounded-full p-2 hover:bg-green-600"
                >
                  +
                </button>
                <button 
                  onClick={(event) => handleQuantityChange(id, quantity - 1, event)} 
                  disabled={quantity <= 1} 
                  className={`bg-red-500 text-white rounded-2xl p-2 hover:bg-red-600 ${quantity <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  -
                </button>
                <button onClick={(event) => handleDelete(id, event)} className="text-3xl text-red-500 hover:text-red-700">
                  <RiDeleteBin6Line />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-between items-center p-4 mt-6 border-t border-gray-300">
        <div className="flex flex-col">
          <h2 className="font-semibold text-xl">Total Price: {totalPrice} Rs</h2>
          <h2 className="text-md text-gray-600">Total Quantity: {totalQuantity}</h2>
        </div>
        <button 
          onClick={handleCheckout} 
          disabled={totalQuantity <= 0} 
          className={`px-6 py-3 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 ${totalQuantity <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {totalQuantity > 0 ? "Buy Now" : null}
        </button>
      </div>
    </div>
  );
};
