import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51OWdeuSGqPW3d9nKcMF5u3sj6988RWftZogpKD86iRHlSYENneDqkyOkyvdI83KTzXR9bRbYcs8PnAiDk49A5b3i00C8COMNCB"
);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Elements stripe={stripePromise}>
        <Provider store={store}>
          <App />
        </Provider>
      </Elements>
    </BrowserRouter>
  </React.StrictMode>
);
