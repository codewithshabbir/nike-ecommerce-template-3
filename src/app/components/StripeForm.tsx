"use client";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { client } from '@/sanity/lib/client';
import { useRouter } from "next/navigation";
import { FormData, ProductCardTypes } from "../@types/types";

const CheckoutForm: React.FC<{ amount: number }> = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (amount <= 0) {
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

        if (!res.ok) throw new Error("Failed to fetch payment intent.");

        const data = await res.json();
        if (!data.clientSecret) throw new Error("Missing clientSecret.");

        setClientSecret(data.clientSecret);
      } catch (error) {
        setErrorMessage((error as Error).message);
      }
    };

    const timeout = setTimeout(fetchPaymentIntent, 500);
    return () => clearTimeout(timeout);
  }, [amount]);

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret || loading) return;

    setLoading(true);
    setErrorMessage(null);

    try {
      await elements.submit();
      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: { return_url: `${window.location.origin}/order-receipt` },
        redirect: 'if_required'
      });

      if (error) throw new Error(error.message || "Payment failed");

      const intentResposnse = await stripe.retrievePaymentIntent(clientSecret);
      const paymentIntent = intentResposnse.paymentIntent;

      if (intentResposnse.paymentIntent?.status !== "succeeded") {
        throw new Error("Payment not completed.");
      }

      const storedCart = localStorage.getItem("cart");
      const cart: ProductCardTypes[] = storedCart ? JSON.parse(storedCart) : [];
      const storedAddress = localStorage.getItem("address");
      const address: FormData | null = storedAddress ? JSON.parse(storedAddress) : null;
      
      if (!address) throw new Error("Address not found in local storage.");

      const orderData = {
        _type: "order",
        amount: amount,
        currency: "usd",
        paymentStatus: "succeeded",
        transactionId: paymentIntent?.id,
        customerName: `${address.firstName} ${address.lastName}`,
        email: address.email,
        phone: address.number,
        address: address.address,
        city: address.city,
        country: address.country,
        orderSummary: cart.map((product) => ({
          product: { _type: "reference", _ref: `product-${product._id}` },
          name: product.name,
          image_url: product.image_url,
          price: product.currentPrice,
          discount_price: product.discountedPrice,
        })),
        createdAt: new Date().toISOString(),
      };

      const newOrder = await client.create(orderData);
      if (newOrder) {
        router.push(`/order-receipt?payment_intent=${paymentIntent?.id}`);
        setTimeout(() => {
          localStorage.removeItem("address");
          setLoading(false)
        }, 500); 
      }
      console.log("✅ Order Saved in Sanity:", orderData);
    } catch (error) {
      setErrorMessage((error as Error).message);
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
            className="bg-black w-full px-4 py-4 text-center uppercase text-md text-white border-2 border-black hover:bg-transparent hover:text-black transition-all duration-300 ease-in-out rounded-md"
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