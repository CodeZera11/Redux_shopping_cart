import React from "react";
import { useDispatch } from "react-redux";
import "./Cart.css";
import { cartActions } from "../store/cart-slice";

const CartItem = ({ name, quantity, total, price, id }) => {
  const dispatch = useDispatch();
  const decrementCartItems = () => {
    dispatch(cartActions.removeFromCart(id))
  };
  const incrementCartItems = () => {
    dispatch(cartActions.addToCart(
      {name,price,id}
    ))
  };
  return (
    <div className="cartItem">
      <h2> {name}</h2>
      <p>${price} /-</p>
      <p>x{quantity}</p>
      <article>Total ${total}</article>
      <button className="cart-actions" onClick={decrementCartItems}>
        -
      </button>
      <button onClick={incrementCartItems} className="cart-actions">
        +
      </button>
    </div>
  );
};

export default CartItem;
