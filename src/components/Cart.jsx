import React from "react";
import useStore from "../store/Store";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  // تابع برای اعمال تخفیف روی محصول
  const setProductDiscount = useStore((state) => state.setProductDiscount);

  // دریافت اطلاعات سبد خرید از zustand
  const cart = useStore((state) => state.cart);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const increment = useStore((state) => state.increment);
  const decrement = useStore((state) => state.decrement);
  const clearCart = useStore((state) => state.clearCart);

  const navigate = useNavigate();

  // محاسبه جمع کل با کسر تخفیف از هر محصول و اطمینان از اینکه قیمت منفی نشه
  const totalPrice = cart.reduce((acc, item) => {
    // قیمت بعد از تخفیف به ازای هر محصول، اگر تخفیف بیشتر از قیمت بود قیمت صفر میشه
    const discountedPrice = Math.max(item.price - (item.discount || 0), 0);
    return acc + discountedPrice * item.quantity;
  }, 0);

  // تابع کمکی برای اعمال تخفیف ثابت ۲ دلار به محصول
  const applyDiscountToProduct = (id) => {
    const product = cart.find((item) => item.id === id);
    if (!product) return;

    // حداقل بین ۲ دلار و قیمت محصول (تا تخفیف بیشتر از قیمت نشه)
    const discountAmount = Math.min(2, product.price);

    setProductDiscount(id, discountAmount);
  };

  return (
    <div className="min-h-screen bg-brand relative overflow-hidden">
      <img
        className=" absolute z-0 top-0 left-0 w-full h-full object-cover opacity-50"
        src="/Bcoffee.jpg"
        alt="Background"
      />
      <div className="relative p-4 rounded-lg shadow-md max-w-xl mx-auto pt-8 cart-brand">
        <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>

        {cart.length === 0 ? (
          <p>Your Cart Is Empty.</p>
        ) : (
          <ul className="space-y-3">
            {cart.map((item) => {
              // محاسبه قیمت محصول بعد از تخفیف و جلوگیری از منفی شدن قیمت
              const discountedPrice = Math.max(
                item.price - (item.discount || 0),
                0
              );
              const totalItemPrice = discountedPrice * item.quantity;

              return (
                <li
                  key={item.id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold">{item.name}</p>

                    {/* کنترل تعداد محصول */}
                    <div className="flex gap-2 items-center">
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

                    {/* نمایش مقدار تخفیف اعمال شده روی محصول */}
                    <p className="text-sm text-red-600">
                      Discount: ${item.discount?.toFixed(2) || "0.00"}
                    </p>

                    {/* دکمه برای اعمال تخفیف ثابت ۲ دلار به محصول */}
                    <button
                      onClick={() => applyDiscountToProduct(item.id)}
                      className="text-xs bg-yellow-300 px-2 py-1 rounded hover:bg-yellow-400 transition"
                    >
                      Apply $2 Discount
                    </button>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    {/* قیمت اصلی محصول قبل از تخفیف، خط خورده */}
                    <p className="line-through text-gray-500">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    {/* قیمت محصول بعد از تخفیف به صورت برجسته */}
                    <p className="font-bold text-lg text-green-700">
                      ${totalItemPrice.toFixed(2)}
                    </p>

                    {/* عکس محصول */}
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
              );
            })}
          </ul>
        )}

        {/* نمایش جمع کل سفارش */}
        <p className="text-right font-bold mt-6 text-lg">
          Total Price: ${totalPrice.toFixed(2)}
        </p>

        {/* دکمه‌های پاک کردن سبد و رفتن به صفحه پرداخت */}
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
