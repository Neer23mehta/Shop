import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

export const Orders = () => {
    const confirmOrder = useSelector((state) => state.confirmOrder); 

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-center mb-6">Confirmed Orders</h2>
            {confirmOrder.length > 0 ? (
                confirmOrder.map((order, index) => {
                    return (
                        <div key={index} className="mb-6">
                            <h3 className="text-2xl font-medium mb-4">Orders Are</h3>
                            <ul className="space-y-4">
                                {order.map((item, i) => {
                                    const { title, price, quantity, image } = item;
                                    const totalPrice = Math.round(price * quantity * 86.7);
                                    const newPrice = Math.round(price * 86.7); 
                                    return (
                                        <li key={i} className="border-b pb-4 flex items-center space-x-4">
                                            <div className="w-24 h-24 overflow-hidden rounded-lg">
                                                <img src={image} alt={title} className="object-cover w-full h-full" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-lg font-medium">{title.length > 25 ? title.slice(0, 25) + "..." : title}</p>
                                                <p className="text-sm text-gray-600">Price: {newPrice} Rs</p>
                                                <p className="text-sm text-gray-600">Quantity: {quantity}</p>
                                                <p className="text-sm text-gray-600">Total: {totalPrice} Rs</p>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    );
                })
            ) : (
                <p className="text-center text-lg text-gray-500">No orders confirmed yet</p>
            )}
        </div>
    );
};
