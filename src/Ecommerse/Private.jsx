import { Navigate, NavLink } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';



const islog = () => {
    return localStorage.getItem('userToken')!==null;
}

export const PrivateRoute = ({ children }) => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    return isAuthenticated ? children : <Navigate to="/log-in" />;
  };
  
// element:<PrivateRoute element={<Homes/>}/>
