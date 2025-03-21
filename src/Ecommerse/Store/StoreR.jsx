import { createStore, applyMiddleware } from 'redux';
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/lib/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import { postApi, putApi } from "../../api/Postapi.jsx";
import { thunk } from "redux-thunk";

const ADD_ITEMS = "task/add";
const DELETE_ITEMS = "task/delete";
const UPDATE_QUANTITY = "task/updateQuantity";
const SET_USER_CART = "task/setUserCart";
const SET_USER_ID = "task/setUserId";
const CONFIRM = "task/confirmorder";

const initialState = {
    userId: null, 
    items: [],
    totalPrice: 0,
    totalQuantity: 0,
    confirmOrder: [],
    cartData: [],
};

export const reactRedux = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEMS:
            const newItem = action.payload;
            const existingItem = state.items.find((item) => item.id === newItem.id);
        
            if (existingItem) {
                const updatedItems = state.items.map((item) =>
                    item.id === newItem.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
                const updatedTotalPrice = updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
                const updatedTotalQuantity = updatedItems.reduce((acc, item) => acc + item.quantity, 0);
                return {
                    ...state,
                    items: updatedItems,
                    totalPrice: updatedTotalPrice,
                    totalQuantity: updatedTotalQuantity,
                };
            } else {
                const updatedTotalPrice = state.totalPrice + newItem.price;
                const updatedTotalQuantity = state.totalQuantity + 1;
                return {
                    ...state,
                    items: [...state.items, { ...newItem, quantity: 1 }],
                    totalPrice: updatedTotalPrice,
                    totalQuantity: updatedTotalQuantity,
                };
            }
        

        case DELETE_ITEMS:
            const deletedItem = state.items.find((item) => item.id === action.payload);
            const updatedItemsAfterDelete = state.items.filter((item) => item.id !== action.payload);
            const updatedTotalPriceAfterDelete = state.totalPrice - (deletedItem ? deletedItem.price * deletedItem.quantity : 0);
            const updatedTotalQuantityAfterDelete = state.totalQuantity - deletedItem?.quantity;
            return {
                ...state,
                items: updatedItemsAfterDelete,
                totalPrice: updatedTotalPriceAfterDelete,
                totalQuantity: updatedTotalQuantityAfterDelete,
            };

        case UPDATE_QUANTITY:
            const { id, quantity } = action.payload;
            const updatedItems = state.items.map((item) =>
                item.id === id ? { ...item, quantity } : item
            );

            const updatedTotalPrice = updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
            const updatedTotalQuantity = updatedItems.reduce((acc, item) => acc + item.quantity, 0);

            return {
                ...state,
                items: updatedItems,
                totalPrice: updatedTotalPrice,
                totalQuantity: updatedTotalQuantity,
            };

        case SET_USER_CART:
            const newItems = action.payload;
            return {
                ...state,
                // items: [...state.items,{...newItems}],
                items : [...newItems.items],
                totalPrice: newItems.totalPrice,
                totalQuantity: newItems.totalQuantity,
                // cartData: [...state.cartData,newItems],
                // items: [...state.cartData,newItems],
            };

        case SET_USER_ID:
            return {
                ...state,
                userId: action.payload,
            };

        case CONFIRM:
            return{
                ...state,
                confirmOrder:[...state.confirmOrder,action.payload],
                items: [],
            }    
        default:
            return state;
    }
};

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["userId", "items", "totalPrice", "totalQuantity","confirmOrder"],
};

const persistedReducer = persistReducer(persistConfig, reactRedux);

export const store = createStore(
    persistedReducer,
    applyMiddleware(thunk)
);

export const persistor = persistStore(store);

export const additems = (data, userid) => {
    return (dispatch, getState) => {
        if (!userid) {
            console.log("User not logged in");
            return;
        }
        dispatch({ type: ADD_ITEMS, payload: data });

        const state = getState();
        console.log("State after dispatch:", state); 
        postApi(userid, state.items); 
    };
};


export const deleteitems = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: DELETE_ITEMS, payload: id });

            const state = getState();
            const cartDetails = state.items;  
            await postApi(state.userId, cartDetails);  
        } catch (error) {
            console.error("Error updating cart:", error.message);
        }
    };
};


export const updateQuantity = (id, quantity) => {
    return { type: UPDATE_QUANTITY, payload: { id, quantity } };
};
export const setUserCart = (cartData) => {
    return {
      type: SET_USER_CART,
      payload: cartData,
    };
};

  

export const setUserId = (userId) => {
    return {
        type: SET_USER_ID,
        payload: userId,
    };
};

export const confirmorder = (order) => {
    return {type: CONFIRM,payload: order}
}
