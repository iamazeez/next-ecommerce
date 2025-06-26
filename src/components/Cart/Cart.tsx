"use client";
import { Product } from "@/types/Product";
import Image from "next/image";

export type CartItem = Product & { quantity: number };

interface CartModalProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onClose: () => void;
}

export default function CartModal({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClose,
}: Readonly<CartModalProps>) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-lg h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-black">Your Cart</h2>
          <button onClick={onClose} className="text-red-600 font-semibold">
            Close
          </button>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-center text-black">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between mb-4 border-b pb-2"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={56}
                  height={56}
                  className="object-contain w-14 h-14"
                />
                <div>
                  <p className="font-medium text-black">{item.title}</p>
                  <p className="text-sm text-gray-500">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  className="px-2 border rounded text-gray-500"
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  −
                </button>
                <span className="text-gray-500">{item.quantity}</span>
                <button
                  className="px-2 border rounded text-gray-500"
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
                <button
                  className="ml-2 text-red-500"
                  onClick={() => onRemoveItem(item.id)}
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}

        {cartItems.length > 0 && (
          <div className="mt-6 text-right">
            <p className="text-lg font-bold text-gray-500">
              Total: ${total.toFixed(2)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
