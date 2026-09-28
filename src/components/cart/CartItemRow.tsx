import { memo } from "react";
import { FaTrash } from "react-icons/fa";
import type { CartItem } from "../../store/Store";

type ItemId = CartItem["id"];

interface CartItemRowProps {
  item: CartItem;
  onIncrement: (id: ItemId) => void;
  onDecrement: (id: ItemId) => void;
  onRemove: (id: ItemId) => void;
  onApplyDiscount: (id: ItemId) => void;
}

const qtyButtonClass =
  "cursor-pointer border-3 border-amber-900 px-2 py-1 hover:border-black hover:text-amber-200 rounded-2xl transition duration-300";

const CartItemRow = memo(function CartItemRow({
  item,
  onIncrement,
  onDecrement,
  onRemove,
  onApplyDiscount,
}: CartItemRowProps) {
  const discountedPrice = Math.max(item.price - (item.discount || 0), 0);
  const totalItemPrice = discountedPrice * item.quantity;

  return (
    <li className="flex justify-between items-center border-b pb-2">
      <div className="flex flex-col gap-1">
        <p className="font-semibold">{item.name}</p>

        <div className="flex gap-2 items-center">
          {item.quantity > 1 ? (
            <button onClick={() => onDecrement(item.id)} className={qtyButtonClass}>
              -
            </button>
          ) : (
            <button onClick={() => onRemove(item.id)} className={qtyButtonClass}>
              <FaTrash />
            </button>
          )}
          <p>{item.quantity}</p>
          <button onClick={() => onIncrement(item.id)} className={qtyButtonClass}>
            +
          </button>
        </div>

        <p className="text-sm text-red-600">
          Discount: ${item.discount?.toFixed(2) || "0.00"}
        </p>

        <button
          onClick={() => onApplyDiscount(item.id)}
          className="text-xs bg-yellow-300 px-2 py-1 rounded hover:bg-yellow-400 transition"
        >
          Apply $2 Discount
        </button>
      </div>

      <div className="flex flex-col items-end gap-1">
        <p className="line-through text-gray-500">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <p className="font-bold text-lg text-green-700">
          ${totalItemPrice.toFixed(2)}
        </p>
        <img
          src={new URL(`../../assets/img/${item.image}`, import.meta.url).href}
          alt={item.name}
          className="w-16 h-16 object-cover rounded-md"
        />
      </div>
    </li>
  );
});

export default CartItemRow;