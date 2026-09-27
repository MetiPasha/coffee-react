import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { CheckoutFormData } from "../../validations/checkoutSchema";

interface ContactInfoFieldsProps {
  register: UseFormRegister<CheckoutFormData>;
  errors: FieldErrors<CheckoutFormData>;
}

const ContactInfoFields = ({ register, errors }: ContactInfoFieldsProps) => {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-lg">Contact Info</h3>
      <input
        {...register("email")}
        placeholder="Email"
        className="w-full border rounded-lg px-3 py-2"
      />
      {errors.email && (
        <p className="text-red-600 text-sm">{errors.email.message}</p>
      )}

      <input
        {...register("phone")}
        placeholder="Phone (09xxxxxxxxx)"
        className="w-full border rounded-lg px-3 py-2"
      />
      {errors.phone && (
        <p className="text-red-600 text-sm">{errors.phone.message}</p>
      )}
    </div>
  );
};

export default ContactInfoFields;