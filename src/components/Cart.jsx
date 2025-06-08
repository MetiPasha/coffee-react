import React from "react";
import useStore from "../store/store";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
  const cart = useStore((state) => state.cart);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const increment = useStore((state) => state.increment);
  const decrement = useStore((state) => state.decrement);
  return (
    <div className="min-h-screen bg-brand ">
      <div className="p-4 rounded-lg shadow-md max-w-xl mx-auto pt-8 cart-brand">
        <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>

        {cart.length === 0 ? (
          <p>Your Cart Is Empty.</p>
        ) : (
          <ul className="space-y-3">
            {cart.map((item) => (
              <li
                key={item.key}
                className="flex justify-between items-center border-b pb-2"
              >
                <div className="flex justify-between gap-2">
                  <p className="font-semibold">{item.name}</p>
                  {item.quantity > 1 ? (
                    <button
                      onClick={() => decrement(item.id)}
                      className="cursor-pointer border-3 border-amber-900 px-2 py-1 hover:border-black hover:text-amber-200 rounded-2xl transition duration-300 "
                    >
                      -
                    </button>
                  ) : (
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="cursor-pointer border-3 border-amber-900 px-2 py-1 hover:border-black hover:text-amber-200 rounded-2xl transition duration-300 "
                    >
                      <FaTrash />
                    </button>
                  )}
                  <p>{item.quantity}</p>
                  <button
                    onClick={() => increment(item.id)}
                    className="cursor-pointer border-3 border-amber-900 px-2 py-1 hover:border-black hover:text-amber-200 rounded-2xl transition duration-300 "
                  >
                    +
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <p>${item.price * item.quantity}</p>
                  <img
                    src={
                      new URL(`../assets/img/${item.image}`, import.meta.url)
                        .href
                    }
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Cart;
