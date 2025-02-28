import { NavLink, useLoaderData, useNavigate } from "react-router-dom"
import "../EcommerseUI/Product.css"
import { useDispatch, useSelector } from "react-redux";
import { additems } from "./Store/StoreR";
import { addTask } from "/home/tristate/Desktop/Neer/neer/src/Ecommerse/Store/StoreS.jsx";

export const Product = () => {
    const productdetail = useLoaderData();
    const navigate = useNavigate();
    const handlegoback = () => {
        navigate(-1)
    }
    const dispatch = useDispatch();

    const handleaddcart = (productdetail) =>{
        dispatch(additems(productdetail))
        alert("Your Item is added")
    }
    
   

    const{id,title,description,rating,price,image,category} = productdetail;
    const newprice = Math.round(price*86.7)
    return (
        <div className="Products-Main">
            <div className="Images">
        <img src={image} alt={title}/>
            </div>
            <div>
                <h3>{title}</h3>
                <h4>About Product:{description}</h4>
                <h2>Price:{newprice}Rs</h2>
                <h3>Rating:{rating.rate}</h3>
            </div>
            <div>
            <button onClick={handlegoback}>Go Back</button>
            <button><NavLink to={`/${id}/buynow`}>Buy Now</NavLink></button>
            <button onClick={()=>handleaddcart(productdetail)}>Add to Cart</button>
            </div>
        </div>
    )
}