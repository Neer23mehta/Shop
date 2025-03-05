import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserCart, setUserId } from './Store/StoreR';
import "/home/tristate/Desktop/Neer/neer/src/EcommerseUI/Login.css";

export const LogIN = ({ setIsLoggedIn }) => {
  const [input, setInput] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5000/users");
      const users = await response.json();
  
      const user = users.find(
        (user) => user.email === input.username && user.password === input.password
      );
  
      if (user) {
        const userToken = { username: user.username, id: user.id };
        localStorage.setItem('userToken', JSON.stringify(userToken));
  
        dispatch(setUserId(user.id));
        console.log("id", user.id);
  
        const cartResponse = await fetch(`http://localhost:3004/posts?userId=${user.id}`);
        const cartData = await cartResponse.json();
        console.log("cartdatas", cartData);
  
        if (cartData.length > 0) {
          dispatch(setUserCart({
            items: cartData[0].cartItems,
            totalPrice: cartData[0].totalPrice,
            totalQuantity: cartData[0].totalQuantity,
          }));
        }
  
        setIsLoggedIn(true);
        setInput({ username: '', password: '' });
        navigate('/');
      } else {
        setError('Invalid credentials, please try again');
      }
    } catch (error) {
      setError('An error occurred while logging in. Please try again.');
    }
  };
  



  return (
    <div className='Main-f'>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username (Email):</label>
          <input
            type="text"
            name="username"
            value={input.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Confirm</button>
        <div>
          <h6>Don't Have an Account Create New <NavLink to="/signin">Sign-UP</NavLink></h6>
        </div>
      </form>
    </div>
  );
};
