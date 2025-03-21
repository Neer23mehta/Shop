import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { additems } from "./Store/StoreR";
import { Bounce, toast, ToastContainer } from "react-toastify";

export const Product = () => {
    const productdetail = useLoaderData();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handlegoback = () => {
        navigate(-1);
    }

    const handleaddcart = (productdetail) => {
        dispatch(additems(productdetail));
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

    const { id, title, description, rating, price, image, category } = productdetail;
    const newprice = Math.round(price * 86.7);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row items-center space-x-8">
                <div className="w-full md:w-1/2">
                    <img src={image} alt={title} className="w-full h-auto rounded-lg shadow-md" />
                </div>
                <div className="w-full md:w-1/2 mt-6 md:mt-0">
                    <h3 className="text-3xl font-semibold text-gray-800">{title}</h3>
                    <h4 className="text-xl text-gray-600 mt-2">About Product: {description}</h4>
                    <h2 className="text-2xl text-green-600 mt-4">Price: {newprice} Rs</h2>
                    <h3 className="text-xl text-yellow-500 mt-2">Rating: {rating.rate} ⭐</h3>
                    <div className="mt-6 space-x-4">
                        <button
                            onClick={handlegoback}
                            className="py-2 px-4 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition"
                        >
                            Go Back
                        </button>
                        <NavLink to={`/${id}/buynow`}>
                            <button className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                                Buy Now
                            </button>
                        </NavLink>
                        <button
                            onClick={() => handleaddcart(productdetail)}
                            className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
