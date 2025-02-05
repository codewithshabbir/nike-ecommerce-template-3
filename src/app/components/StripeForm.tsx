"use client";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { StripeError } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";

const CheckoutForm = ({ amount }: { amount: number }) => {
  // Initialize Stripe hooks
  const stripe = useStripe();
  const elements = useElements();

  // State to store error messages
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // State to store client secret from Stripe
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  // State to manage loading state during payment processing
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Validate the amount before making API request
    if (!amount || amount <= 0) {
      setErrorMessage("Invalid amount.");
      return;
    }

    // Function to fetch payment intent from the backend API
    const fetchPaymentIntent = async () => {
      try {
        const res = await fetch("/api/payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount }),
        });

        const data = await res.json();
        
        // Store client secret if available, otherwise throw an error
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          throw new Error("Failed to get clientSecret.");
        }
      } catch (error) {
        setErrorMessage("Error fetching payment intent.");
      }
    };

    // Delay the API call slightly to prevent unnecessary rapid requests
    const timeOut = setTimeout(() => {
      fetchPaymentIntent();      
    }, 500);

    return () => clearTimeout(timeOut);
  }, [amount]);

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Ensure all required Stripe elements and clientSecret are available
    if (!stripe || !elements || !clientSecret || loading) {
      setErrorMessage("Payment cannot proceed. Missing required information.");
      return;
    }

    // Check if the payment form is properly filled
    const paymentElement = elements.getElement(PaymentElement);
    if (!paymentElement) {
      setErrorMessage("Please fill in the payment details.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      // Ensure the form is fully validated before processing payment
      await elements.submit();

      // Confirm payment with Stripe
      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success?amount=${amount}`,
        },
      });

      // Handle any payment errors
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
      {/* Display error messages if any */}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      
      {clientSecret ? (
        <>
          {/* Stripe Payment Element (UI component for entering payment details) */}
          <PaymentElement />
          
          {/* Payment Submit Button */}
          <button
            type="submit"
            disabled={!stripe || loading}
            className="bg-black w-full px-4 text-center cursor-pointer hover:bg-transparent border-2 border-black hover:text-black transition-all duration-300 ease-in-out rounded-md py-4 uppercase text-md text-white block"
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