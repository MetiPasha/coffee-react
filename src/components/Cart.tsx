import { useCallback, useMemo } from "react";
import useStore from "../store/Store";
import { useNavigate } from "react-router-dom";
import CartItemRow from "./cart/CartItemRow";

const Cart = () => {
  const cart = useStore((state) => state.cart);
  const setProductDiscount = useStore((state) => state.setProductDiscount);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const increment = useStore((state) => state.increment);
  const decrement = useStore((state) => state.decrement);
  const clearCart = useStore((state) => state.clearCart);

  const navigate = useNavigate();

  const totalPrice = useMemo(
    () =>
      cart.reduce((acc, item) => {
        const discountedPrice = Math.max(item.price - (item.discount || 0), 0);
        return acc + discountedPrice * item.quantity;
      }, 0),
    [cart]
  );

  const applyDiscountToProduct = useCallback(
    (id: number | string) => {
      const product = useStore.getState().cart.find((item) => item.id === id);
      if (!product) return;
      setProductDiscount(id, Math.min(2, product.price));
    },
    [setProductDiscount]
  );

  return (
    <div className="min-h-screen bg-brand relative overflow-hidden">
      <img
        className=" absolute z-0 top-0 left-0 w-full h-full object-cover opacity-50"
        src="/Bcoffee.jpg"
        alt=""
        aria-hidden="true"
      />
      <div className="relative p-4 rounded-lg shadow-md max-w-xl mx-auto pt-8 cart-brand">
        <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>

        {cart.length === 0 ? (
          <p>Your Cart Is Empty.</p>
        ) : (
          <ul className="space-y-3">
            {cart.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                onIncrement={increment}
                onDecrement={decrement}
                onRemove={removeFromCart}
                onApplyDiscount={applyDiscountToProduct}
              />
            ))}
          </ul>
        )}

        <p className="text-right font-bold mt-6 text-lg">
          Total Price: ${totalPrice.toFixed(2)}
        </p>

        {cart.length > 0 && (
          <div className="space-y-2">
            <button
              onClick={clearCart}
              className="text-red-600 border border-red-600 px-4 py-2 rounded-md hover:bg-red-600 hover:text-white transition mt-4"
            >
              Clear Cart
            </button>
            <button
              onClick={() => navigate("/checkout")}
              className="w-full text-white bg-amber-950 px-4 py-2 rounded-md hover:bg-green-700 transition"
            >
              Pay
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;