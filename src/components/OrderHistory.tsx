import { getOrders } from "../utils/orders";

const OrderHistory = () => {
  const orders = getOrders();

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand px-4">
        <p className="text-xl font-semibold">You have no orders yet.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand px-4 py-24 lg:px-32">
      <h1 className="font-semibold text-center text-4xl mb-10">
        Order History
      </h1>

      <div className="space-y-6 max-w-2xl mx-auto">
        {orders
          .slice()
          .reverse()
          .map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-md p-6 space-y-3"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">
                    Order #{order.id.slice(0, 8)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.placedAt).toLocaleString()}
                  </p>
                </div>
                <p className="font-bold text-lg text-green-700">
                  ${order.total.toFixed(2)}
                </p>
              </div>

              <div className="border-t pt-3 space-y-1">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm text-gray-700"
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-3 text-sm text-gray-600">
                <p>Shipping to: {order.customerInfo.shippingAddress.city}, {order.customerInfo.shippingAddress.country}</p>
                <p>Method: {order.customerInfo.method}</p>
                <p>Payment: {order.customerInfo.paymentMethod}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OrderHistory;