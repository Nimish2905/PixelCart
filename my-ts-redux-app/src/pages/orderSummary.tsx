import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import "./orderSummary.css";

interface CartItem {
  itemName: string;
}

const OrderSummary: React.FC = () => {
  const state = useSelector((state: RootState) => state.cart);

  const [orderNo, setOrderNo] = useState("");
  const [orderTotalCost, setOrderTotalCost] = useState("");
  const [orderPlacedBy, setOrderPlacedBy] = useState("");
  const [data, setData] = useState<any>(null); // Adjust the type based on your data structure

  useEffect(() => {
    const prefix = "ORD";
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    const generatedOrderNo = `${prefix}-${timestamp}-${random}`;

    setOrderNo(generatedOrderNo);

    const itemNamesArray: string[] = state.items.map(
      (item: CartItem) => item.itemName
    );
    console.log(itemNamesArray);
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
        const { data } = await axios.post(
          "/api/orders/placeOrder",
          {
            orderNo: generatedOrderNo,
            itemNamesArray,
            orderTotalCost,
            orderPlacedBy,
          },
          config
        );

        if (data) {
          setData(data);
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    setTimeout(() => {
      placeOrder();
    }, 5000);
  }, [state.items, state.finalOrder, orderTotalCost, orderPlacedBy]);

  return <div className="summary-body"></div>;
};

export default OrderSummary;
