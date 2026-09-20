import React from "react";
import useStore from "../store/Store";
import { FaShoppingBag } from "react-icons/fa";

const Checkout = () => {
  const cart = useStore((state) => state.cart);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discount = subtotal * 0.1; // 10% تخفیف (دلخواه)
  const shipping = 15;
  const total = subtotal - discount + shipping;

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-brand px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 border-b pb-4">
          <div className="bg-brand p-3 rounded-full">
            <FaShoppingBag className="text-xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Checkout</h2>
            <p className="text-sm text-gray-400">
              {cart.length} {cart.length === 1 ? "item" : "items"} in cart
            </p>
          </div>
        </div>

        {/* Summary rows */}
        <div className="space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span className="font-medium text-gray-900">
              ${subtotal.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between text-gray-600">
            <span>Discount (10%)</span>
            <span className="font-medium text-green-600">
              -${discount.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span className="font-medium text-gray-900">
              ${shipping.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-dashed border-gray-300"></div>

        {/* Total */}
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Total</span>
          <span className="text-2xl font-bold text-gray-900">
            ${total.toFixed(2)}
          </span>
        </div>

        {/* Button */}
        <button className="w-full bg-brand hover-brand transition-all font-semibold py-3 rounded-xl border-2 border-black">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;