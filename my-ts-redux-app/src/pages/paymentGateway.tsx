import React from "react";
import { Link } from "react-router-dom";
// import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import "./paymentGateway.css";

const PaymentGateway: React.FC = () => {
  // const stripe = useStripe();
  // const elements = useElements();
  // const [error, setError] = useState<string | null>(null);

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   if (!stripe || !elements) {
  //     return;
  //   }

  //   const cardElement = elements.getElement(CardElement);

  //   if (!cardElement) {
  //     return;
  //   }

  //   const { token, error } = await stripe.createToken(cardElement);

  //   if (error) {
  //     setError(
  //       error.message || "An error occurred while processing your payment."
  //     );
  //   } else {
  //     // Send the token to your server to process the payment
  //     console.log("Token:", token);
  //   }
  // };

  return (
    // <form onSubmit={handleSubmit}>
    //   <label>
    //     Card details
    //     <CardElement />
    //   </label>

    //   {error && <div style={{ color: "red" }}>{error}</div>}

    //   <button type="submit" disabled={!stripe}>
    //     Pay
    //   </button>
    // </form>
    <div className="gateway-body">
      <Link to={"/orderPlaced"}>
        <button>Bypass Gateway</button>
      </Link>
    </div>
  );
};

export default PaymentGateway;
