import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { CheckoutFormData } from "../../validations/checkoutSchema";

interface ShippingMethodFieldsProps {
  register: UseFormRegister<CheckoutFormData>;
  errors: FieldErrors<CheckoutFormData>;
}

const ShippingMethodFields = ({ register, errors }: ShippingMethodFieldsProps) => {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-lg">Shipping Method</h3>
      <label className="flex items-center gap-2">
        <input type="radio" value="standard" {...register("method")} />
        Standard
      </label>
      <label className="flex items-center gap-2">
        <input type="radio" value="express" {...register("method")} />
        Express
      </label>
      {errors.method && (
        <p className="text-red-600 text-sm">{errors.method.message}</p>
      )}
    </div>
  );
};

export default ShippingMethodFields;