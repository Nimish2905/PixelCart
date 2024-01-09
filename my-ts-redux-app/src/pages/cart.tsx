import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import "./cart.css";

const Cart: React.FC = () => {
  const state = useSelector((state: RootState) => state.cart);
  let content = null;
  let subtotal = 0;
  state.items.forEach((item) => {
    subtotal += parseInt(item.itemPrice);
  });

  const discount = 10;
  const deliveryCharge = 5;
  const history = useNavigate();
  const totalAmount = subtotal - (subtotal * discount) / 100 + deliveryCharge;

  const hasItems = state.items.length > 0;
  const retrieveUserInfo = localStorage.getItem("userInfo");
  content =
    retrieveUserInfo !== null ? (
      <div className="cart-container">
        {hasItems ? (
          <div className="cart-body">
            <div className="item-body">
              {state.items.map((item, index) => (
                <div className="item-card" key={index}>
                  <h4>{item.itemName}</h4>
                  <p>{item.itemPrice} $</p>
                  <div>
                    <img alt="Loading" src={item.itemPicture}></img>
                  </div>
                </div>
              ))}
            </div>
            <div className="checkout-summary">
              <div className="summary-section">
                <p>Subtotal</p>
                <p>${subtotal}</p>
              </div>
              <div className="summary-section">
                <p>Discount ({discount}%)</p>
                <p>-${(subtotal * discount) / 100}</p>
              </div>
              <div className="summary-section">
                <p>Delivery Charge</p>
                <p>${deliveryCharge}</p>
              </div>
              <div className="summary-section total">
                <p>Total</p>
                <p>${totalAmount.toFixed(2)}</p>
              </div>
              <button className="place-order-btn">Place Order</button>
            </div>
          </div>
        ) : (
          <p className="empty-cart-message">No items in the cart</p>
        )}
      </div>
    ) : (
      history("/")
    );
  return <>{content}</>;
};

export default Cart;
