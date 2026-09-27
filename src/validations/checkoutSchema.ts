import { z } from "zod";

// اطلاعات تماس
export const contactInfoSchema = z.object({
  email: z.string().email("ایمیل نامعتبر است"),
  phone: z
    .string()
    .min(11, "شماره تلفن باید ۱۱ رقم باشد")
    .regex(/^09\d{9}$/, "شماره تلفن باید با 09 شروع شود و 11 رقم باشد"),
});

// یک آدرس کامل (برای استفاده در ارسال و پرداخت)
const addressFieldsSchema = z.object({
  fullName: z.string().min(2, "نام کامل الزامی است"),
  address: z.string().min(5, "آدرس باید حداقل ۵ کاراکتر باشد"),
  city: z.string().min(2, "شهر را وارد کنید"),
  postalCode: z.string().regex(/^\d{10}$/, "کد پستی باید 10 رقمی باشد"),
  country: z.string().min(2, "کشور را وارد کنید"),
});

// آدرس ارسال (تودرتو)
export const shippingAddressSchema = z.object({
  shippingAddress: addressFieldsSchema,
});

// روش ارسال
export const shippingMethodSchema = z.object({
  method: z.enum(["standard", "express"], {
    error: "روش ارسال الزامی است",
  }),
});

// آدرس پرداخت (تودرتو، اختیاری اگر همون آدرس ارسال باشه)
export const billingAddressSchema = z
  .object({
    sameAsShipping: z.boolean(),
    billingAddress: addressFieldsSchema.partial().optional(),
  })
  .refine(
    (data) => {
      if (!data.sameAsShipping) {
        return (
          data.billingAddress &&
          data.billingAddress.fullName &&
          data.billingAddress.address &&
          data.billingAddress.city &&
          data.billingAddress.postalCode &&
          data.billingAddress.country
        );
      }
      return true;
    },
    {
      message: "همه فیلدهای آدرس پرداخت را کامل پر کنید",
      path: ["billingAddress", "fullName"],
    }
  );

// پرداخت
export const paymentSchema = z.object({
  paymentMethod: z.enum(["card", "cod", "wallet", "gateway"], {
    error: "روش پرداخت الزامی است",
  }),
  termsAccepted: z.literal(true, {
    error: "باید شرایط را بپذیرید",
  }),
});

// کد تخفیف (اختیاری)
export const discountSchema = z.object({
  code: z.string().optional(),
});

// اعتبارسنجی نهایی سفارش (ادغام همه بخش‌ها)
export const fullCheckoutSchema = contactInfoSchema
  .merge(shippingAddressSchema)
  .merge(shippingMethodSchema)
  .merge(billingAddressSchema)
  .merge(paymentSchema)
  .merge(discountSchema);

export type CheckoutFormData = z.infer<typeof fullCheckoutSchema>;