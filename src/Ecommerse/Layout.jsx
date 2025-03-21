import { Outlet, useNavigation } from "react-router-dom"
import { Headers } from "./Headers";
import { Footers } from "./Footers";
import { ToastContainer } from "react-toastify";

export const Layout = ({isLoggedIn,setIsLoggedIn}) => {
    const navigation = useNavigation();

    if(navigation.state === "loading") return <h1>Loading...</h1>

    return (
        <>
        <Headers isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        <Outlet/>
        <ToastContainer/>
        <Footers/>
        </>
    )
}