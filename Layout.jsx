import { Outlet, useNavigation } from "react-router-dom"
import { Headers } from "./Headers";
import { Footers } from "./Footers";
import "/home/tristate/Desktop/Neer/neer/src/EcommerseUI/Layout.css"

export const Layout = ({isLoggedIn,setIsLoggedIn}) => {
    const navigation = useNavigation();

    if(navigation.state === "loading") return <h1>Loading...</h1>

    return (
        <>
        <Headers isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        <Outlet/>
        <Footers/>
        </>
    )
}