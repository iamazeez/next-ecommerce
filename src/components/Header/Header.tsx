interface Props {
  cartCount: number;
  showCart: () => void;
}

const Header = ({ cartCount, showCart }: Props) => {
  return (
    <header className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">🛍 Product Showcase</h1>
      <nav>
        <button onClick={showCart} className="text-blue-600">
          Cart {cartCount > 0 && `(${cartCount})`}
        </button>
      </nav>
    </header>
  );
};

export default Header;
