import { NavLink, useNavigate, useRouteError } from "react-router-dom"
import Error from "../src/Error.jpg"

export const ErrorPage = () => {
    const error = useRouteError();
    const navigate = useNavigate();

    const handlegoback = () => {
        navigate(-1)
    }
    console.log(error)
    return (
        <div className={"flex flex-col justify-center items-center"}>
            <img src={Error}/>
        <h1>404 Error Page</h1>
      <button>
      <NavLink to="/">Go Back to Home Page</NavLink>
      </button>
      <button className="btn" onClick={handlegoback}>
        Go Back
      </button>
        </div>
       
    )
}