import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { CheckoutFormData } from "../../validations/checkoutSchema";

interface BillingAddressFieldsProps {
  register: UseFormRegister<CheckoutFormData>;
  errors: FieldErrors<CheckoutFormData>;
  sameAsShipping: boolean;
}

const BillingAddressFields = ({ register, sameAsShipping }: BillingAddressFieldsProps) => {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-lg">Billing Address</h3>
      <label className="flex items-center gap-2">
        <input type="checkbox" {...register("sameAsShipping")} />
        Same as shipping address
      </label>

      {!sameAsShipping && (
        <div className="space-y-2 pt-2">
          <input
            {...register("fullName")}
            placeholder="Billing Full Name"
            className="w-full border rounded-lg px-3 py-2"
          />
          <input
            {...register("address")}
            placeholder="Billing Address"
            className="w-full border rounded-lg px-3 py-2"
          />
          <input
            {...register("city")}
            placeholder="Billing City"
            className="w-full border rounded-lg px-3 py-2"
          />
          <input
            {...register("postalCode")}
            placeholder="Billing Postal Code"
            className="w-full border rounded-lg px-3 py-2"
          />
          <input
            {...register("country")}
            placeholder="Billing Country"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      )}
    </div>
  );
};

export default BillingAddressFields;