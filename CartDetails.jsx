import { useLoaderData } from "react-router-dom";

export const CartDetails = ({params}) => {
    const cartdetail = useLoaderData();

    const{id,title,description,rating,price,image,category} = cartdetail;
    return (
        <div className="Products-Main">
            <div className="Images">
        <img src={image} alt={title}/>
            </div>
            <div>
                <h3>{title}</h3>
                <h4>About Product:{description}</h4>
                <h2>Price:{price}$</h2>
                <h3>Rating:{rating.rate}</h3>
            </div>
        </div>
    )}