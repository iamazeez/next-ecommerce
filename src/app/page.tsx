"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "@/components/ProductCard/ProductCard";
import Pagination from "@/components/Pagination/Pagination";
import Select from "@/components/Select/Select";
import Header from "@/components/Header/Header";
import { Product } from "@/types/Product";
import Slider from "@/components/Slider/Slider";
import CartModal, { CartItem } from "@/components/Cart/Cart";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res: { data: Product[] }) => {
        setProducts(res.data);
        setFiltered(res.data);
        const cats = ["all", ...new Set(res.data.map((p) => p.category))];
        setCategories(cats);
      });
  }, []);

  useEffect(() => {
    let temp = [...products];
    if (category !== "all") {
      temp = temp.filter((p) => p.category === category);
    }
    temp = temp.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );
    if (sort === "price") temp.sort((a, b) => a.price - b.price);
    if (sort === "name") temp.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "popularity")
      temp.sort((a, b) => b.rating.rate - a.rating.rate);
    setFiltered(temp);
    setCurrentPage(1);
  }, [category, priceRange, products, sort]);

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const currentData = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const sortOptions = [
    { label: "Sort By", value: "" },
    { label: "Price", value: "price" },
    { label: "Name", value: "name" },
    { label: "Popularity", value: "popularity" },
  ];

  const categoryOptions = categories.map((cat) => ({
    label: cat,
    value: cat,
  }));

  const showCart = () => setIsCartOpen(true);

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <Header showCart={showCart} cartCount={cart.length} />
      {isCartOpen && (
        <CartModal
          cartItems={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClose={() => setIsCartOpen(false)}
        />
      )}

      <div className="flex flex-col md:flex-row gap-4">
        <aside className="md:w-1/4">
          <div className="mb-4">
            <h2 className="font-semibold">Category</h2>
            <Select
              options={categoryOptions}
              onChange={setCategory}
              value={category}
            />
          </div>

          <Slider
            value={priceRange[1]}
            onChange={(newMax) => setPriceRange([0, newMax])}
          />
        </aside>

        <main className="md:w-3/4">
          <div className="flex justify-end mb-4">
            <Select value={sort} onChange={setSort} options={sortOptions} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentData.map((product) => (
              <ProductCard
                handleAddToCart={handleAddToCart}
                key={product.id}
                product={product}
              />
            ))}
          </div>

          <Pagination
            filteredLength={filtered.length}
            itemsPerPage={itemsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </main>
      </div>
    </div>
  );
}
