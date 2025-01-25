import { useCart } from "@/context/CartContext";
import React from "react";
import { IoTrashOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import Button from "./Button";
import { cartSidebarProps } from "../@types/types";

const CartSidebar: React.FC<cartSidebarProps> = ({ onClickFun, value }) => {
  const { cart } = useCart();

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
                  <p className="text-sm text-gray-500">Rs: {item.currentPrice}</p>
                </div>
              </div>
              <button
                className="text-gray-600 hover:text-red-600"
                aria-label={`Remove ${item.name} from cart`}
              >
                <IoTrashOutline className="w-6 h-6" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer with Checkout button */}
      <div
        onClick={() => onClickFun(value)}
        className="flex-shrink-0 bg-gray-100 py-4 px-6 flex justify-between items-center rounded-b-lg"
      >
        <Button text="Checkout" classNames="rounded-md py-2"/>
      </div>
    </div>
  );
};

export default CartSidebar;