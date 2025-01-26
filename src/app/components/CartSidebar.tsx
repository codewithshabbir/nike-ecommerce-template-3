import { useCart } from "@/context/CartContext";
import React from "react";
import { IoTrashOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import Button from "./Button";
import { cartSidebarProps } from "../@types/types";

const CartSidebar: React.FC<cartSidebarProps> = ({ onClickFun, value }) => {
  const { cart, removeFromCart } = useCart();

  // Check if removeFromCart is defined before invoking it
  const handleRemoveFromCart = (itemId: string) => {
    if (removeFromCart) {
      removeFromCart(itemId);
    } else {
      console.error("removeFromCart function is not available.");
    }
  };

  return (
    <div className="w-full max-w-md h-screen bg-white shadow-lg rounded-lg flex flex-col">
      {/* Header section with title and close button */}
      <div className="flex-shrink-0 bg-black py-4 px-6 text-white rounded-t-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Cart Items</h2>
          <RxCross1
            onClick={() => onClickFun(value)}
            className="text-2xl cursor-pointer"
          />
        </div>
      </div>

      {/* Cart items or empty cart message */}
      <div
        className={`flex-grow overflow-y-auto py-4 px-6 ${
          cart.length === 0 ? "flex justify-center items-center" : ""
        }`}
      >
        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Your Cart is Empty.</p>
        ) : (
          cart.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center border-b py-3"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <h3 className="text-sm font-medium">{item.name}</h3>
                  <div className="flex gap-2">
                    <span>Rs: {item.currentPrice}</span>
                    {item.discountedPrice && (
                      <span className="text-gray-500 line-through">Rs: {item.discountedPrice}</span>
                    )}
                  </div>
                </div>
              </div>
              <button
                className="text-gray-600 hover:text-red-600"
                aria-label={`Remove ${item.name} from cart`}
                onClick={() => handleRemoveFromCart(item._id)}
              >
                <IoTrashOutline className="w-6 h-6" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer with Checkout options */}
      {
        cart.length > 0 && (
          <div onClick={() => onClickFun(value)} className="flex-shrink-0 bg-gray-100 py-4 px-6 flex flex-col items-center rounded-b-lg space-y-2">
            <Button
              text="View and Edit Cart"
              link="/cart"
              classNames="rounded-md py-2 w-full bg-transparent text-black uppercase text-sm"
            />
            <Button
              text="Go To Checkout"
              link="/checkout"
              classNames="rounded-md py-2 w-full bg-black text-white uppercase text-sm"
            />
          </div>
        )
      }
    </div>
  );
};

export default CartSidebar;