import { NavLink, useLoaderData, useNavigate } from "react-router-dom"
import "../EcommerseUI/Product.css"
import { useDispatch, useSelector } from "react-redux";
import { additems } from "./Store/StoreR";
import { addTask } from "/home/tristate/Desktop/Neer/neer/src/Ecommerse/Store/StoreS.jsx";
import { Bounce, toast, ToastContainer } from "react-toastify";

export const Product = () => {
    const productdetail = useLoaderData();
    const navigate = useNavigate();
    const handlegoback = () => {
        navigate(-1)
    }
    const dispatch = useDispatch();

    const handleaddcart = (productdetail) =>{
        dispatch(additems(productdetail))
        toast.success("Item added", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
            style: {
              backgroundColor: 'green', 
            },
          });
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
            {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}        
      /> */}
        </div>
    )
}