import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "/home/tristate/Desktop/Neer/neer/src/EcommerseUI/Signin.css";

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
      username: inp.email, 
    };

    try {
      const response = await fetch('http://localhost:5001/users', {
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
      alert("Signup successful!");
      setInp({    firstname: '',
        middlename: '',
        lastname: '',
        email: '',
        mobilenumber: '',
        password: '',
        username: '',})
      navigate('/'); 
    } catch (error) {
      console.error('Signup API error:', error);
      alert("Error during signup. Please try again.");
    }
  };
  useEffect(()=>{
    const getitems = localStorage.getItem(Key)
    if(getitems){
      setInp(JSON.parse(getitems))
    }
  },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInp({ ...inp, [name]: value });
  };

  return (
    <div className="Signin-Page">
      <form onSubmit={handleSubmit}>
        <div className="Inp">
          <label>First Name:</label>
          <input
            type="text"
            placeholder="First Name"
            required
            value={inp.firstname}
            name="firstname"
            onChange={handleChange}
          />
          <label>Middle Name:</label>
          <input
            type="text"
            placeholder="Middle Name"
            required
            value={inp.middlename}
            name="middlename"
            onChange={handleChange}
          />
          <label>Last Name:</label>
          <input
            type="text"
            placeholder="Last Name"
            required
            value={inp.lastname}
            name="lastname"
            onChange={handleChange}
          />
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email"
            required
            value={inp.email}
            name="email"
            onChange={handleChange}
          />
          <label>Phone Number:</label>
          <input
            type="number"
            placeholder="Phone Number"
            required
            value={inp.mobilenumber}
            name="mobilenumber"
            onChange={handleChange}
          />
          <label>Password:</label>
          <input
            type="password"
            placeholder="Password"
            required
            value={inp.password}
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="Btn">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};
