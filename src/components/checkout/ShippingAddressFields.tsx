import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { CheckoutFormData } from "../../validations/checkoutSchema";

interface ShippingAddressFieldsProps {
  register: UseFormRegister<CheckoutFormData>;
  errors: FieldErrors<CheckoutFormData>;
}

const ShippingAddressFields = ({ register, errors }: ShippingAddressFieldsProps) => {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-lg">Shipping Address</h3>
      <input
        {...register("shippingAddress.fullName")}
        placeholder="Full Name"
        className="w-full border rounded-lg px-3 py-2"
      />
      {errors.shippingAddress?.fullName && (
        <p className="text-red-600 text-sm">{errors.shippingAddress.fullName.message}</p>
      )}

      <input
        {...register("shippingAddress.address")}
        placeholder="Address"
        className="w-full border rounded-lg px-3 py-2"
      />
      {errors.shippingAddress?.address && (
        <p className="text-red-600 text-sm">{errors.shippingAddress.address.message}</p>
      )}

      <input
        {...register("shippingAddress.city")}
        placeholder="City"
        className="w-full border rounded-lg px-3 py-2"
      />
      {errors.shippingAddress?.city && (
        <p className="text-red-600 text-sm">{errors.shippingAddress.city.message}</p>
      )}

      <input
        {...register("shippingAddress.postalCode")}
        placeholder="Postal Code"
        className="w-full border rounded-lg px-3 py-2"
      />
      {errors.shippingAddress?.postalCode && (
        <p className="text-red-600 text-sm">{errors.shippingAddress.postalCode.message}</p>
      )}

      <input
        {...register("shippingAddress.country")}
        placeholder="Country"
        className="w-full border rounded-lg px-3 py-2"
      />
      {errors.shippingAddress?.country && (
        <p className="text-red-600 text-sm">{errors.shippingAddress.country.message}</p>
      )}
    </div>
  );
};

export default ShippingAddressFields;