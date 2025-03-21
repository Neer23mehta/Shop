import axios from "axios";

export const postApi = (userid, cartDetails) => {
    const totalPrice = cartDetails.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalQuantity = cartDetails.reduce((total, item) => total + item.quantity, 0);

    return axios.post("http://localhost:3004/posts", {
        userId: userid, 
        cartItems: cartDetails,
        totalPrice: totalPrice,
        totalQuantity: totalQuantity,
    })
    .then(response => {
        console.log("Data saved successfully", response.data);
        return response.data;
    })
    .catch(error => {
        console.error("There was an error saving the data!", error);
    });
};


// export const postApis = (userid, items) => {

//     return axios.post ("http://localhost:5000/users",{

//     })
// }

export const putApi = async (userId, cartDetails) => {
    try {
        const payload = {
            userId: userId, 
            cartItems: cartDetails, 
        };

        console.log("Sending request to update cart:", payload);

        const response = await axios.put("http://localhost:3004/posts", payload);

        if (response.status === 201) {
            console.log("Data saved successfully:", response.data);
            return response.data;
        } else {
            console.error("Failed to save data. Server responded with:", response.status);
            throw new Error(`Failed to save cart details. Server responded with status ${response.status}`);
        }
    } catch (error) {
        console.error("There was an error updating the cart:", error);

        throw new Error(`Failed to update cart details: ${error.message}`);
    }
};



