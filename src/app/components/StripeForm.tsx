"use client";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { StripeError } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";

const CheckoutForm = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!amount || amount <= 0) {
      setErrorMessage("Invalid amount.");
      return;
    }

    const fetchPaymentIntent = async () => {
      try {
        const res = await fetch("/api/payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount }),
        });

        const data = await res.json();
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          throw new Error("Failed to get clientSecret.");
        }
      } catch (error) {
        setErrorMessage("Error fetching payment intent.");
      }
    };

    fetchPaymentIntent();
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) {
      setErrorMessage("Payment cannot proceed. Missing required information.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      await elements.submit();

      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success?amount=${amount}`,
        },
      });

      if (error) {
        throw new Error(error.message || "Payment failed");
      }
    } catch (error: any) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {clientSecret ? (
        <>
          <PaymentElement />
          <button
            type="submit"
            disabled={!stripe || loading}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            {loading ? "Processing..." : "Pay"}
          </button>
        </>
      ) : (
        <p>Loading payment form...</p>
      )}
    </form>
  );
};

export default CheckoutForm;
