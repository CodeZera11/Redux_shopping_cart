import React, { useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import { useDispatch, useSelector } from "react-redux";
import Notifications from "./components/Notifications";
import { uiActions } from "./store/ui-slice";
import { sendCartData } from "./store/cart-slice";

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
    
    dispatch(sendCartData(cart))
    
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
