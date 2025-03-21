import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserCart, setUserId } from './Store/StoreR';

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
      const response = await fetch("http://localhost:3004/users");
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Username (Email):</label>
            <input
              type="text"
              name="username"
              value={input.username}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              name="password"
              value={input.password}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Confirm
          </button>
          
          <div className="mt-4 text-center">
            <h6 className="text-sm">
              Don't have an account?{' '}
              <NavLink to="/signin" className="text-blue-500 hover:underline">
                Sign Up
              </NavLink>
            </h6>
          </div>
        </form>
      </div>
    </div>
  );
};
