"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { fetchOrder } from "../api/orderApi";
import { Order } from "../@types/types";
import { useGlobalState } from "@/context/GlobalStateContext";

// 🔹 Skeleton Loader Component
const SkeletonLoader = () => {
  return (
    <div className="max-w-3xl mx-auto my-10 p-6 md:p-8 bg-white shadow-lg rounded-lg border border-gray-200 animate-pulse">
      <div className="text-center mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Order Receipt
        </h1>
      </div>
      <div className="h-8 bg-gray-200 rounded mb-6"></div> {/* Title */}
      <div className="space-y-4">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        <div className="h-6 bg-gray-200 rounded w-2/3"></div>
      </div>
      <div className="mt-6 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    </div>
  );
};

const OrderReceiptPageContent = () => {
  const searchParams = useSearchParams();
  const paymentIntent = searchParams.get("payment_intent");
  const [order, setOrder] = useState<Order | null>(null);
  const { clearCart, clearWishlist, cart, wishlist } = useGlobalState();

  useEffect(() => {
    if (cart.length > 0) {
      clearCart();
    }
    if (wishlist.length > 0) {
      clearWishlist();
    }
    window.scrollTo(0, 0);
  }, [cart, wishlist]); 

  useEffect(() => {
    if (paymentIntent) {
      const fetchData = async () => {
        const response = await fetchOrder(paymentIntent);
        setOrder(response);
      };
      fetchData();
    }
  }, [paymentIntent]);

  if (!order) {
    return <SkeletonLoader />; // 👈 Skeleton Loader Add Kiya
  }

  return (
    <div>
      <div className="text-center my-8">
        <h2 className="text-2xl md:text-3xl font-bold text-green-600">
          🎉 Thank you for your order! 🎉
        </h2>
        <p className="text-gray-700 text-lg md:text-xl mt-4">
          Your order has been placed successfully.
        </p>
      </div>
      <div className="max-w-3xl mx-auto my-10 p-6 md:p-8 bg-white shadow-lg rounded-lg border border-gray-200">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Order Receipt
          </h1>
        </div>

        {/* Customer Details */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-4">
            Purchased By
          </h2>
          <div className="text-gray-600 text-sm md:text-base">
            <p>
              <span className="font-semibold">Buyer Name:</span>{" "}
              {order.customerName}
            </p>
            <p>
              <span className="font-semibold">Buyer Email:</span> {order.email}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {order.phone}
            </p>
          </div>
        </div>

        {/* Order Details */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-4">
            Order Details
          </h2>
          <div className="text-gray-600 text-sm md:text-base">
            <p>
              <span className="font-semibold">Order ID:</span>{" "}
              {order.transactionId}
            </p>
            <p>
              <span className="font-semibold">Order Time:</span>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Order Type:</span> Web-Online
            </p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 md:mb-6 text-center">
            Order Summary
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-gray-700 border-collapse rounded-lg overflow-hidden shadow-md">
              <thead className="bg-gray-100 text-gray-800 text-sm md:text-base">
                <tr>
                  <th className="py-2 md:py-3 px-2 md:px-4">Product</th>
                  <th className="py-2 md:py-3 px-2 md:px-4">Name</th>
                  <th className="py-2 md:py-3 px-2 md:px-4">Discount Price</th>
                  <th className="py-2 md:py-3 px-2 md:px-4">Original Price</th>
                </tr>
              </thead>
              <tbody>
                {order.orderSummary.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition duration-200"
                  >
                    <td className="py-3 px-2 md:px-4 flex justify-center">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg shadow-sm"
                      />
                    </td>
                    <td className="py-3 px-2 md:px-4 font-medium text-sm md:text-base">
                      {item.name}
                    </td>
                    <td className="py-3 px-2 md:px-4 text-green-600 font-semibold text-sm md:text-base">
                      Rs. {item.discount_price}
                    </td>
                    <td className="py-3 px-2 md:px-4 text-red-500 line-through text-sm md:text-base">
                      Rs. {item.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Total */}
        <div className="flex justify-end mb-6 md:mb-8">
          <div className="text-right">
            <p className="text-lg md:text-xl font-semibold text-gray-800">
              <span>Order Total:</span> Rs. {order.amount}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-600 border-t pt-6 md:pt-8 text-sm md:text-base">
          <p>Thank you for your purchase!</p>
          <p>
            If you have any questions, contact us at{" "}
            <a href="mailto:support@example.com" className="text-blue-600">
              support@example.com
            </a>
            .
          </p>
          <p className="mt-4">© 2025 Nike. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

const OrderReceiptPage = () => {
  return (
    <Suspense fallback={<SkeletonLoader />}>
      {" "}
      {/* 👈 Skeleton Loader in Suspense */}
      <OrderReceiptPageContent />
    </Suspense>
  );
};

export default OrderReceiptPage;
