import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../store/store";
import "./orderSummary.css";

interface CartItem {
  itemName: string;
  itemQuantity: string;
}

const OrderSummary: React.FC = () => {
  const state = useSelector((state: RootState) => state.cart);

  const [orderNo, setOrderNo] = useState("");
  const [orderTotalCost, setOrderTotalCost] = useState("");
  const [orderPlacedBy, setOrderPlacedBy] = useState("");

  useEffect(() => {
    const prefix = "ORD";
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    const generatedOrderNo = `${prefix}-${timestamp}-${random}`;

    setOrderNo(generatedOrderNo);

    const orderItemsArray = state.items.map((item: CartItem) => ({
      itemName: item.itemName,
      itemQuantity: item.itemQuantity,
    }));

    setOrderTotalCost(state.finalOrder[0]?.totalCost.toString());
    const retrieveUserInfo = localStorage.getItem("userInfo");
    const userInfo = retrieveUserInfo ? JSON.parse(retrieveUserInfo) : {};
    setOrderPlacedBy(userInfo.name);

    const placeOrder = async () => {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      try {
        await axios.post(
          "/api/orders/placeOrder",
          {
            orderNo: generatedOrderNo,
            orderItems: orderItemsArray,
            orderTotalCost,
            orderPlacedBy,
          },
          config
        );
      } catch (error) {
        console.log(error);
      }
    };

    setTimeout(() => {
      placeOrder();
    }, 5000);
  }, [state.items, state.finalOrder, orderTotalCost, orderPlacedBy]);

  return (
    <div className="confirmation-page">
      <div className="confirmation-container">
        <h1>Order Placed Successfully!</h1>
        <p>
          Your order has been confirmed. Thank you for choosing our services.
        </p>
        <div className="confirmation-details">
          <p>
            Order Number: <span>{orderNo}</span>
          </p>
          <p>
            Total Amount: <span>{orderTotalCost} $</span>
          </p>
        </div>
        <div className="confirmation-actions">
          <Link to="/">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
