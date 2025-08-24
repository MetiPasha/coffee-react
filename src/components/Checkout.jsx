import React from "react";
import useStore from "../store/Store";

const Checkout = () => {
  const cart = useStore((state) => state.cart);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className=" w-screen h-screen flex justify-center items-center bg-brand  ">
      <div className="bg-white p-8 rounded-x1 shadow-2xl w-full max-w-md space-y-4">
        <h2>Checkout</h2>

        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>{totalPrice.toFixed(2)}$</span>
        </div>
        <div className="flex justify-between">
          <span>Discount:</span>
          <span>{}$</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping:</span>
          <span>15$</span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
