import React, { useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import { useDispatch, useSelector } from "react-redux";
import Notifications from "./components/Notifications";
import { uiActions } from "./store/ui-slice";

let isFirstRender = true;

function App() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  const notification = useSelector(state => state.ui.notification);

  useEffect(() => {
    if(isFirstRender){
      isFirstRender = false;
      return;
    }
    const sendRequest = async () => {
       // Send state as Sending Request
      dispatch(uiActions.showNotification({
        open: true,
        message: "Sending Request....",
        type: 'warning'
      }));
      const res = await fetch('https://redux-http-9d277-default-rtdb.firebaseio.com/cartitems.json',
      {
        method: "PUT",
        body: JSON.stringify(cart),
      });

      const data = await res.json();

      // Send state as Request is Successful
      dispatch(uiActions.showNotification({
        type: 'success',
        message: 'Send Request to Database Successfully',
        open: 'true'
      }))
    };
    sendRequest().catch(err => {
      // Send state as Error 
      dispatch(uiActions.showNotification({
        type: 'error',
        open: true,
        message: 'Sending Request Failed'
      }))
    });
  }, [cart, dispatch]);

  return (
    <div className="App">
      {notification && (
        <Notifications type={notification.type} message={notification.message}/>
      )}
      {!isLoggedIn && <Auth />}
      {isLoggedIn && <Layout />}
    </div>
  );
}

export default App;
