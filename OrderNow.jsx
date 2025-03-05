import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";

export const OrderNow = () => {
  const orderdetails = useLoaderData();
  const [load, setLoad] = useState(false);
  const { price, title } = orderdetails;
  const newPrice = Math.round(price * 86.7);

  const handleClick = () => {
    const userInfo = window.confirm("Sure To Buy");
    if (userInfo) {
      setLoad(true);
      // alert("Your Order is Placed");
      toast.success("Item added", {
        position: "top-right",
        autoClose: 3000,
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
      });    }
  };

  if (load) {
    return <h1>Your Order Is Placed</h1>;
  }

  return (
    <div className="productdetail">
      <h3>
        Your Product is {title} and it's Price is {newPrice}
      </h3>
      <button onClick={handleClick}>Confirm</button>
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
  );
};
