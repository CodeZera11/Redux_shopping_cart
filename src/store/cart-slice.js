import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        itemsList: [],
        totalQuantity: 0,
        showCart: false
    },
    reducers: {
        addToCart(state, action) {
            const newItem = action.payload;
            
            // Check if item is already there so that only qty can be increased
            const existingItem = state.itemsList.find((item)=>item.id === newItem.id);

            if(existingItem){
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price;
            }else{
                state.itemsList.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.name
                })
                state.totalQuantity++;
            }
        },
        removeFromCart(state, action) {
            const id = action.payload;
           
            // Check for existing item
            const existingItem = state.itemsList.find(item => item.id === id);
            
            if(existingItem.quantity === 1){
                state.itemsList = state.itemsList.filter(item => item.id !== id);
                state.totalQuantity--;
            }else{
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price;
            }

        },
        setShowCart(state) {
            state.showCart = !state.showCart;
        }
    }
});

export const cartActions = cartSlice.actions;

export const sendCartData = (cart) => {
    return async (dispatch) => {
        // Send state as Sending Request
      dispatch(uiActions.showNotification({
        open: true,
        message: "Sending Request....",
        type: 'warning'
      }));

      const sendRequest = async () => {
        const res = await fetch('https://redux-http-9d277-default-rtdb.firebaseio.com/cartitems.json',
        {
            method: "PUT",
            body: JSON.stringify(cart),
        });
        const data = await res.json();
      }      
      // Send state as Request is Successful
        dispatch(uiActions.showNotification({
            type: 'success',
            message: 'Send Request to Database Successfully',
            open: 'true'
        }));

        try {
            await sendRequest();
        } catch (error) {
            // Send state as Error 
            dispatch(uiActions.showNotification({
                type: 'error',
                open: true,
                message: 'Sending Request Failed'
            }))
        }
    };
    
}

export default cartSlice;