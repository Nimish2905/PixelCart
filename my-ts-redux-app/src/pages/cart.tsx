import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../store/store";
import { orderPlace } from "../redux/cartSlice";
import "./cart.css";

interface CartItem {
  itemName: string;
  itemPrice: string;
  itemQuantity: string;
  itemPicture: string;
}

const Cart: React.FC = () => {
  const state = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const [randomWord, setRandomWord] = useState<string>("");

  const calculateCartAmount = useCallback(() => {
    let tempSubtotal = 0;
    let tempTotalQuantity = 0;

    state.items.forEach((item: CartItem) => {
      const finalPrice = parseInt(item.itemPrice) * parseInt(item.itemQuantity);
      tempTotalQuantity += parseInt(item.itemQuantity);
      tempSubtotal += finalPrice;
    });

    const discount = tempSubtotal < 5000 ? 2 : tempSubtotal < 15000 ? 5 : 10;

    const deliveryCharge =
      tempTotalQuantity < 3
        ? 10
        : tempTotalQuantity < 5
        ? 15
        : tempTotalQuantity < 8
        ? 20
        : 25;

    const discountedAmount = (tempSubtotal * discount) / 100;
    const calculatedTotalAmount =
      tempSubtotal - discountedAmount + deliveryCharge;

    dispatch(
      orderPlace({
        deliveryFee: deliveryCharge,
        discount: discount,
        subTotalAmount: tempSubtotal,
        totalCost: calculatedTotalAmount,
      })
    );
  }, [state.items, dispatch]);

  const applyCouponCode = () => {
    const couponText = document.getElementById(
      "coupon-input"
    ) as HTMLInputElement;
    const disElem = document.getElementById("discount-up");
    const totalElem = document.getElementById("total-up");
    const dislblElem = document.getElementById("discount-label");

    if (couponText) {
      if (
        couponText.value === randomWord &&
        disElem &&
        totalElem &&
        dislblElem
      ) {
        const dis =
          (state.finalOrder[0]?.subTotalAmount *
            (state.finalOrder[0]?.discount + 10)) /
          100;
        disElem.textContent = "-$" + dis.toFixed(2);
        dislblElem.textContent = `Discount (${(
          state.finalOrder[0]?.discount + 10
        ).toFixed(0)}%)`;
        const tot =
          state.finalOrder[0]?.subTotalAmount -
          dis +
          state.finalOrder[0]?.deliveryFee;
        totalElem.textContent = "$" + tot.toFixed(2);
      }
    }
  };

  useEffect(() => {
    calculateCartAmount();
  }, [state.items, calculateCartAmount]);

  useEffect(() => {
    const wordsArray = document.body.innerText.split(/\s+/);
    const randomIndex = Math.floor(Math.random() * wordsArray.length);
    setRandomWord(wordsArray[randomIndex]);
  }, []);

  const hasItems = state.items.length > 0;
  const retrieveUserInfo = localStorage.getItem("userInfo");
  return (
    <>
      {retrieveUserInfo !== null ? (
        <>
          {hasItems ? (
            <div className="cart-body">
              <div className="combined-cart">
                <div className="item-body">
                  {state.items.map((item: CartItem, index) => (
                    <div className="item-card" key={index}>
                      <h4>{item.itemName}</h4>
                      <p> x {item.itemQuantity}</p>
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
                    <p>
                      ${state.finalOrder[0]?.subTotalAmount?.toFixed(2) || 0}
                    </p>
                  </div>
                  {state.finalOrder[0]?.discount !== 0 && (
                    <div className="summary-section">
                      <p id="discount-label">
                        Discount ({state.finalOrder[0]?.discount.toFixed(0)}%)
                      </p>
                      <p id="discount-up">
                        -$
                        {(
                          (state.finalOrder[0]?.subTotalAmount *
                            state.finalOrder[0]?.discount) /
                          100
                        ).toFixed(2)}
                      </p>
                    </div>
                  )}
                  <div className="summary-section">
                    <p>Delivery Charge</p>
                    <p>${state.finalOrder[0]?.deliveryFee?.toFixed(2) || 0}</p>
                  </div>
                  <div className="summary-section total">
                    <p>Total</p>
                    <p id="total-up">
                      ${state.finalOrder[0]?.totalCost?.toFixed(2) || 0}
                    </p>
                  </div>
                  <Link to={"/paymentgateway"}>
                    <button id="place-order-btn">Place Order</button>
                  </Link>
                  <div>
                    <input
                      id="coupon-input"
                      type="text"
                      placeholder="Enter Coupon Code"
                    />
                    <button id="coupon-btn" onClick={applyCouponCode}>
                      Apply Coupon
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="empty-cart-message">No items in the cart</p>
          )}
        </>
      ) : (
        <>ERROR</>
      )}
    </>
  );
};

export default Cart;
