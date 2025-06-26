import { Product } from "@/types/Product";
import Image from "next/image";
import Link from "next/link";

interface Props {
  product: Product;
  handleAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, handleAddToCart }: Props) => {
  return (
    <div key={product.id} className="border p-4 rounded hover:shadow">
      <Image
        src={product.image}
        alt={product.title}
        width={150}
        height={150}
        className="mx-auto"
      />
      <h3 className="text-lg font-bold mt-2">{product.title}</h3>
      <p className="text-green-600 font-semibold">${product.price}</p>
      <p>⭐ {product.rating.rate}</p>

      <button
        onClick={() => handleAddToCart(product)}
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
