import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Cart from "./pages/cart";
import Home from "./pages/home";
import PaymentGateway from "./pages/paymentGateway";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import Store from "./pages/store";
import OrderSummary from "./pages/orderSummary";

const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/store" element={<Store />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/addtocart" element={<Cart />}></Route>
        <Route path="/paymentgateway" element={<PaymentGateway />}></Route>
        <Route path="/orderPlaced" element={<OrderSummary />}></Route>
      </Routes>
    </div>
  );
};

export default App;
