import { z } from "zod";

// اطلاعات تماس
export const contactInfoSchema = z.object({
  email: z.string().email("ایمیل نامعتبر است"),
  phone: z
    .string()
    .min(11, "شماره تلفن باید ۱۱ رقم باشد")
    .regex(/^09\d{9}$/, "شماره تلفن باید با 09 شروع شود و 11 رقم باشد"),
});

// آدرس ارسال
export const shippingAddressSchema = z.object({
  fullName: z.string().min(2, "نام کامل الزامی است"),
  address: z.string().min(5, "آدرس باید حداقل ۵ کاراکتر باشد"),
  city: z.string().min(2, "شهر را وارد کنید"),
  postalCode: z.string().regex(/^\d{10}$/, "کد پستی باید 10 رقمی باشد"),
  country: z.string().min(2, "کشور را وارد کنید"),
});

// روش ارسال
export const shippingMethodSchema = z.object({
  method: z.enum(["standard", "express"], {
    required_error: "روش ارسال الزامی است",
  }),
});

// آدرس پرداخت (اگر متفاوت بود)
export const billingAddressSchema = z
  .object({
    sameAsShipping: z.boolean(),
    fullName: z.string().min(2, "نام کامل الزامی است").optional(),
    address: z.string().min(5, "آدرس باید حداقل ۵ کاراکتر باشد").optional(),
    city: z.string().min(2, "شهر را وارد کنید").optional(),
    postalCode: z
      .string()
      .regex(/^\d{10}$/, "کد پستی باید 10 رقمی باشد")
      .optional(),
    country: z.string().min(2, "کشور را وارد کنید").optional(),
  })
  .refine(
    (data) => {
      if (!data.sameAsShipping) {
        return (
          data.fullName &&
          data.address &&
          data.city &&
          data.postalCode &&
          data.country
        );
      }
      return true;
    },
    {
      message: "همه فیلدهای آدرس پرداخت را کامل پر کنید",
      path: ["fullName"],
    }
  );

// پرداخت
export const paymentSchema = z.object({
  paymentMethod: z.enum(["card", "cod", "wallet", "gateway"], {
    required_error: "روش پرداخت الزامی است",
  }),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "باید شرایط را بپذیرید" }),
  }),
});

// کد تخفیف (اختیاری، فقط اگر وارد شد اعتبارسنجی شود)
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
