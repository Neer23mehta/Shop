import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import { persistor } from './Store/StoreR';

const Key = "Inp-Data";

export const SignUP = () => {
  const [inp, setInp] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    email: '',
    mobilenumber: '',
    password: '',
    username: '',
  });

  const generateOrderId = () => {
    return `ORDER-${new Date().getTime()}-${Math.floor(Math.random() * 1000)}`;
  };

  const id = generateOrderId();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inp.email.includes('@')) {
      alert("Please enter a valid email");
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9]).{6,}$/;
    if (!passwordRegex.test(inp.password)) {
      alert("Password should be at least 6 characters long, with at least 1 uppercase letter and 1 number");
      return;
    }

    const newUser = {
      ...inp,
      id,
      username: inp.email,
    };

    try {
      const response = await fetch('http://localhost:3004/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error('Failed to sign up');
      }

      const data = await response.json();
      console.log('User signed up:', data);

      localStorage.setItem(Key, JSON.stringify(data));
      toast.success("Signup successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        style: {
          backgroundColor: 'Green',
        },
      });

      setInp({
        firstname: '',
        middlename: '',
        lastname: '',
        email: '',
        mobilenumber: '',
        password: '',
        username: '',
      });

      navigate('/');
      persistor.purge();
    } catch (error) {
      console.error('Signup API error:', error);
      alert("Error during signup. Please try again.");
    }
  };

  useEffect(() => {
    const getitems = localStorage.getItem(Key);
    if (getitems) {
      setInp(JSON.parse(getitems));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInp({ ...inp, [name]: value });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="firstname" className="block text-gray-700">First Name:</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={inp.firstname}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="middlename" className="block text-gray-700">Middle Name:</label>
              <input
                type="text"
                id="middlename"
                name="middlename"
                value={inp.middlename}
                onChange={handleChange}
                placeholder="Middle Name"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="lastname" className="block text-gray-700">Last Name:</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={inp.lastname}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={inp.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="mobilenumber" className="block text-gray-700">Phone Number:</label>
              <input
                type="tel"
                id="mobilenumber"
                name="mobilenumber"
                value={inp.mobilenumber}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-700">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={inp.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
