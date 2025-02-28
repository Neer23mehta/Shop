import { NavLink, useNavigate } from "react-router-dom";
import "/home/tristate/Desktop/Neer/neer/src/EcommerseUI/Headers.css";
import { IoCartOutline } from "react-icons/io5";
import { useEffect } from "react";

export const Headers = ({ isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem('userToken');
        setIsLoggedIn(false); 
        navigate('/');
    };

    return (
        <div className="Main-Nav">
            <nav>
                <div className="Logo">
                    <h1>Neer Mehta</h1>
                </div>
                <div className="List">
                    <li>
                        <NavLink to="/" style={({ isActive }) => ({ color: isActive ? "Green" : "white" })}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" style={({ isActive }) => ({ color: isActive ? "Green" : "white" })}>
                            About
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact" style={({ isActive }) => ({ color: isActive ? "Green" : "white" })}>
                            Contact
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/cart" style={({ isActive }) => ({ color: isActive ? "Green" : "white" })}>
                            {isLoggedIn ? <IoCartOutline /> : null}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/orders" style={({ isActive }) => ({ color: isActive ? "Green" : "white" })}>
                            Order
                        </NavLink>
                    </li>
                    <li>
                        {isLoggedIn ? (
                            <button onClick={handleLogout}>Log Out</button>
                        ) : (
                            <NavLink to="log-in">
                                <button>Log In</button>
                            </NavLink>
                        )}
                    </li>
                </div>
            </nav>
        </div>
    );
};
