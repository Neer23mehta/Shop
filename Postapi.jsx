import axios from "axios";

//     const api = axios.create({
//         baseURL:"https://jsonplaceholder.typicode.com"
//     })

// export const apiget = () => {
//     return  api.get("/posts")
// }

// export const deletepost = (id) => {
//     return api.delete(`/posts/${id}`);
// }

// export const postapi = (post) => {
//     return api.post("/posts",post);
// }

// export const putapi = (id , post) => {
//     return api.put(`/posts/${id}`,post);
// }


// const Api = axios.create({
    // baseURL: `http://www.postalpincode.in/api/`


// })

// export const Apigets = (name) => {
    // return Api.get(`/pincode/{city_name}`)
// }

// const Apis = axios.create({
//     baseURL: "https://fakestoreapi.com/products"
// })

// export const Returnapi = () => {
//     return Apis.get("")
// }

// const Apic = axios.create({
//     baseURL:"https://v6.exchangerate-api.com/v6/1eeccfb59edc61c8c944107e"
// })

// export const getapic = (fromcurrency,tocurrency,inp) => {
//     return Apic.get(`/pair/${fromcurrency}/${tocurrency}/${inp}`)
// }


// api.js


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



export const putApi = async (userId, cartDetails) => {
    try {
        const payload = {
            userId: userId, 
            cartItems: cartDetails, 
        };

        console.log("Sending request to update cart:", payload);

        const response = await axios.put("http://localhost:3004/posts", payload);

        if (response.status === 200) {
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



