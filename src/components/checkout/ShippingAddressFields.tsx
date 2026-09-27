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
        {...register("fullName")}
        placeholder="Full Name"
        className="w-full border rounded-lg px-3 py-2"
      />
      {errors.fullName && (
        <p className="text-red-600 text-sm">{errors.fullName.message}</p>
      )}

      <input
        {...register("address")}
        placeholder="Address"
        className="w-full border rounded-lg px-3 py-2"
      />
      {errors.address && (
        <p className="text-red-600 text-sm">{errors.address.message}</p>
      )}

      <input
        {...register("city")}
        placeholder="City"
        className="w-full border rounded-lg px-3 py-2"
      />
      {errors.city && (
        <p className="text-red-600 text-sm">{errors.city.message}</p>
      )}

      <input
        {...register("postalCode")}
        placeholder="Postal Code"
        className="w-full border rounded-lg px-3 py-2"
      />
      {errors.postalCode && (
        <p className="text-red-600 text-sm">{errors.postalCode.message}</p>
      )}

      <input
        {...register("country")}
        placeholder="Country"
        className="w-full border rounded-lg px-3 py-2"
      />
      {errors.country && (
        <p className="text-red-600 text-sm">{errors.country.message}</p>
      )}
    </div>
  );
};

export default ShippingAddressFields;