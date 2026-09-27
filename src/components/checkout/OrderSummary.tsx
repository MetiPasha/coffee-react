interface OrderSummaryProps {
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
}

const OrderSummary = ({ subtotal, discount, shipping, total }: OrderSummaryProps) => {
  return (
    <>
      <div className="space-y-3">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium text-gray-900">
            ${subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Discount</span>
          <span className="font-medium text-green-600">
            -${discount.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span className="font-medium text-gray-900">
            ${shipping.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">Total</span>
        <span className="text-2xl font-bold text-gray-900">
          ${total.toFixed(2)}
        </span>
      </div>
    </>
  );
};

export default OrderSummary;