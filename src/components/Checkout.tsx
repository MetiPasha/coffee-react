import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import useStore from "../store/Store";
import { FaShoppingBag } from "react-icons/fa";
import { fullCheckoutSchema, type CheckoutFormData } from "../validations/checkoutSchema";
import ContactInfoFields from "./checkout/ContactInfoFields";
import ShippingAddressFields from "./checkout/ShippingAddressFields";
import ShippingMethodFields from "./checkout/ShippingMethodFields";
import BillingAddressFields from "./checkout/BillingAddressFields";
import PaymentFields from "./checkout/PaymentFields";
import OrderSummary from "./checkout/OrderSummary";
import { saveOrder } from "../utils/orders";

const Checkout = () => {
  const cart = useStore((state) => state.cart);
  const clearCart = useStore((state) => state.clearCart);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discount = cart.reduce(
    (acc, item) => acc + (item.discount || 0) * item.quantity,
    0
  );
  const shipping = 15;
  const total = subtotal - discount + shipping;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(fullCheckoutSchema),
    defaultValues: {
      sameAsShipping: true,
    },
  });

  const sameAsShipping = watch("sameAsShipping");

 const onSubmit = async (data: CheckoutFormData) => {
  await new Promise((resolve) => setTimeout(resolve, 600)); // simulate network delay

  saveOrder({
    items: cart,
    subtotal,
    discount,
    shipping,
    total,
    customerInfo: data,
  });

  clearCart();
  setOrderPlaced(true);
};

  if (orderPlaced) {
    return (
      <div className="w-screen min-h-screen flex justify-center items-center bg-brand px-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center space-y-4">
          <h2 className="text-2xl font-bold">Order Placed! 🎉</h2>
          <p className="text-gray-600">
            Thanks for your order — a confirmation has been sent to your email.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen flex justify-center items-center bg-brand px-4 py-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6"
      >
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

        <ContactInfoFields register={register} errors={errors} />
        <ShippingAddressFields register={register} errors={errors} />
        <ShippingMethodFields register={register} errors={errors} />
        <BillingAddressFields
          register={register}
          errors={errors}
          sameAsShipping={sameAsShipping}
        />
        <PaymentFields register={register} errors={errors} />

        <div className="space-y-2">
          <input
            {...register("code")}
            placeholder="Promo code (optional)"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div className="border-t border-dashed border-gray-300"></div>

        <OrderSummary
          subtotal={subtotal}
          discount={discount}
          shipping={shipping}
          total={total}
        />

        <button
          type="submit"
          disabled={isSubmitting || cart.length === 0}
          className="w-full bg-brand hover-brand transition-all font-semibold py-3 rounded-xl border-2 border-black disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
};

export default Checkout;