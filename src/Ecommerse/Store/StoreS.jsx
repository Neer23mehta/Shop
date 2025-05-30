// store.js (Redux Store)
import { createStore } from 'redux';

const ADD_TASK = "task/add";
const DELETE_TASK = "task/delete";
const CONFIRM = "task/confirm"

const initialState = {
    item: [],
    totalprice: 0,
    ConfirmOrder: [],
};

export const reactReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASK:
            const newTask = action.payload;
            return {
                ...state,
                item: [...state.item, newTask],
                totalprice: state.totalprice + newTask.price,
            };

        case DELETE_TASK:
            const taskIndex = action.payload;
            const deletedTask = state.item[taskIndex]; 
            if (deletedTask) {
                const updatedTasks = state.item.filter((_, index) => index !== taskIndex);
                return {
                    ...state,
                    item: updatedTasks,
                    totalprice: state.totalprice - deletedTask.price, 
                };
            }
            return state; 

        case CONFIRM:
            return{
                ...state,
                ConfirmOrder:[...state.ConfirmOrder,action.payload],
            }    
        default:
            return state;
    }
};

export const store = createStore(reactReducer);

export const addTask = (data) => {
    return { type: ADD_TASK, payload: data };
};

export const deleteTask = (index) => {
    return { type: DELETE_TASK, payload: index };
};

export const confirmOrder = (order) => {
    return {type: CONFIRM,payload: order}
}

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


// const deleteApi = createApi({
//     reducerPath: 'deleteApi',
//     baseQuery: fetchBaseQuery({baseUrl:"https://jsonplaceholder.typicode.com"}),
//     endpoints: (builder) => ({
//         deleteTodo: builder.mutation({
//             query: (id) => {
//                 return {
//                     url: `/todos/${id}`,
//                     method: "DELETE",
//                 };
//             },
//             transformResponse: (data) => {
//                 return data || []
//             }
//         })
//     })
// })

// export default (deleteApi)
// export const {useDeleteTodoMutation} = deleteApi;  

// import mongoose from "mongoose";
// import { NextResponse } from "next/server"
// import { connectionSrt } from "../../../../lib/db";
// import { Product } from "@/lib/model/products";

// // export async function PUT(request:any,content:any) {
// //     const productId = await content.params.productid
// //     const filter = {_id:productId}
// //     const payload = await request.json();
// //     console.log(payload)
// //     await mongoose.connect(connectionSrt)
// //     const result = await Product.findOneAndUpdate(filter,payload)
// //     return NextResponse.json({result,success:true})
// // }
// // export async function GET(request:any,content:any) {
// //     const productId = await content.params.productid
// //     const record = {_id:productId}
// //     await mongoose.connect(connectionSrt)
// //     const result = await Product.find(record)
// //     return NextResponse.json({result,success:true})
// // }
// // export async function DELETE(request:any, content:any) {
// //     const productId = content.params.productid;
// //     const record = { _id: productId };

// //     await mongoose.connect(connectionSrt);

// //     const result = await Product.deleteOne(record);

// //     return NextResponse.json({ result, success: true });
// // }
// export async function PUT(request:any,content:any){
//     const productID = content.params.productid;
//     const filter = {_id:productID};
//     await mongoose.connect(connectionSrt);
//     const payload = await request.json()
//     const results = await Product.findOneAndUpdate(filter,payload)
//     return NextResponse.json({results},{status:201})
// }

// export async function DELETE(request:any,content:any){
//     const productid = content.params.productid;
//     const filter = {_id:productid};

//     await mongoose.connect(connectionSrt);

//     const results = await Product.deleteOne(filter)

//     return NextResponse.json({results,success:true},{status:201})
// }
// export async function GET(request:any,content:any){
//     const productid = content.params.productid;
//     const result = {_id:productid};
//     await mongoose.connect(connectionSrt);
//     const data = await Product.find(result)
//     return NextResponse.json({data,success:true},{status:201})
// }