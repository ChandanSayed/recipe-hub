import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";

const CheckoutForm = ({ clientSecret, setOpenModal }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(null);

  const resetForm = () => {
    setError(null);
    setIsProcessing(false);
    setSuccess(null);
    setOpenModal(false);
    const card = elements.getElement(CardElement);
    if (card) {
      card.clear();
    }
  };

  const handleSubmit = async event => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    setIsProcessing(true);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
      setIsProcessing(false);
      return;
    } else {
      // console.log("[PaymentMethod]", paymentMethod);
      setError(null);
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: "test"
        }
      }
    });
    if (confirmError) {
      console.log(confirmError);
    } else {
      console.log("Payment Successful", paymentIntent);
      setSuccess("Payment Successful!");
      resetForm();
    }
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4"
              }
            },
            invalid: {
              color: "#9e2146"
            }
          }
        }}
      />
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        {isProcessing ? "Processing…" : "Pay"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
    </form>
  );
};
const stripePromise = loadStripe(import.meta.env.VITE_PK);
const Payment = ({ price, setOpenModal }) => {
  const [clientSecret, setClientSecret] = useState("");

  async function getClientSecret() {
    const res = await axios.post("/create-payment-intent", { price });
    setClientSecret(res.data.clientSecret);
  }

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    // fetch("http://localhost:8000/create-payment-intent", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ price: price })
    // })
    //   .then(res => res.json())
    //   .then(data => setClientSecret(data.clientSecret));
    getClientSecret();
    console.log(price);
  }, [price]);

  const appearance = {
    theme: "stripe"
  };
  const options = {
    clientSecret,
    appearance
  };

  return (
    <div>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm clientSecret={clientSecret} setOpenModal={setOpenModal} />
        </Elements>
      )}
    </div>
  );
};

export default Payment;
