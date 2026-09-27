import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { CheckoutFormData } from "../../validations/checkoutSchema";

interface PaymentFieldsProps {
  register: UseFormRegister<CheckoutFormData>;
  errors: FieldErrors<CheckoutFormData>;
}

const PaymentFields = ({ register, errors }: PaymentFieldsProps) => {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-lg">Payment</h3>
      <select
        {...register("paymentMethod")}
        className="w-full border rounded-lg px-3 py-2"
      >
        <option value="">Select payment method</option>
        <option value="card">Card</option>
        <option value="cod">Cash on Delivery</option>
        <option value="wallet">Wallet</option>
        <option value="gateway">Gateway</option>
      </select>
      {errors.paymentMethod && (
        <p className="text-red-600 text-sm">{errors.paymentMethod.message}</p>
      )}

      <label className="flex items-center gap-2">
        <input type="checkbox" {...register("termsAccepted")} />
        I accept the terms and conditions
      </label>
      {errors.termsAccepted && (
        <p className="text-red-600 text-sm">{errors.termsAccepted.message}</p>
      )}
    </div>
  );
};

export default PaymentFields;