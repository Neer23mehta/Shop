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