import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Cache to store payment intents based on the amount
const paymentIntentsCache = new Map();

export async function POST(request: NextRequest) {
    try {
        // Ensure the Stripe secret key is available
        if (!process.env.STRIPE_SECRET_KEY) {
            throw new Error("Stripe secret key is missing");
        }

        // Extract amount from the request body
        const { amount } = await request.json();

        console.log('amount check', amount);
        
        // Validate the amount: It must be a positive number
        if (!Number(amount) || typeof amount !== "number" || amount <= 0) {
            return NextResponse.json(
                { error: "Invalid amount. It should be a positive number." },
                { status: 400 }
            );
        }

        // Create a new payment intent with Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            automatic_payment_methods: { enabled: true },
        });        

        // Store the client secret in the cache
        paymentIntentsCache.set(amount, paymentIntent.client_secret);

        // Return the client secret to the frontend
        return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error("Internal Error:", error);
        return NextResponse.json(
            { error: `Internal Server Error: ${error}` },
            { status: 500 }
        );
    }
}