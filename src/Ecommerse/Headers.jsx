import { NavLink, useNavigate } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

export const Headers = ({ isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate();
    const items = useSelector((state) => state.items);

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        setIsLoggedIn(false);
        navigate('/');
    };
    const TotalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
    return (
        <div className="bg-gray-800 text-white shadow-md">
            <nav className="flex justify-between items-center p-5 max-w-screen-xl mx-auto">
                <div className="text-3xl font-bold text-green-500">
                    <h1>Neer Mehta</h1>
                </div>
                <div className="flex space-x-7">
                    <li className="list-none">
                        <NavLink
                            to="/"
                            className="hover:text-green-500"
                            style={({ isActive }) => ({
                                color: isActive ? "green" : "white"
                            })}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li className="list-none">
                        <NavLink
                            to="/about"
                            className="hover:text-green-500"
                            style={({ isActive }) => ({
                                color: isActive ? "green" : "white"
                            })}
                        >
                            About
                        </NavLink>
                    </li>
                    <li className="list-none">
                        <NavLink
                            to="/contact"
                            className="hover:text-green-500"
                            style={({ isActive }) => ({
                                color: isActive ? "green" : "white"
                            })}
                        >
                            Contact
                        </NavLink>
                    </li>
                    <li className="list-none">
                        <NavLink
                            to="/cart"
                            className="hover:text-green-500 relative"
                            style={({ isActive }) => ({
                                color: isActive ? "green" : "white"
                            })}
                        >
                            {/* Add the cart icon here if logged in */}
                            {isLoggedIn ? (
                                <li className="flex flex-row justify-center"><IoCartOutline className="text-2xl" />{TotalQuantity}  
                                </li>) : null}
                            {/* Optional: Cart Item Count */}
                            {/* <span className="absolute top-0 right-0 text-sm bg-red-500 text-white rounded-full px-2 py-1">
                                {items.reduce((acc, item) => acc + item.quantity, 0)}
                            </span> */}
                        </NavLink>
                    </li>
                    <li className="list-none">
                        <NavLink
                            to="/orders"
                            className="hover:text-green-500"
                            style={({ isActive }) => ({
                                color: isActive ? "green" : "white"
                            })}
                        >
                            Order
                        </NavLink>
                    </li>
                    <li className="list-none">
                        {isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="w-20 bg-green-500 text-white rounded-md hover:bg-green-600"
                            >
                                Log Out
                            </button>
                        ) : (
                            <NavLink to="/log-in">
                                <button className="w-20 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                                    Log In
                                </button>
                            </NavLink>
                        )}
                    </li>
                </div>
            </nav>
        </div>
    );
};
