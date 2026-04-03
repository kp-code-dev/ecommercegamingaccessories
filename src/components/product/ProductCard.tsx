import { FaHeart, FaRegHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { useCart } from "@/context/CartContext";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  inStock: boolean;
  bestSeller?: boolean;
  category: string;
}

interface ProductCardProps {
  product: Product;
  toggleWishlist: (id: string) => void;
  isWishlisted: boolean;
}

function ProductCard({ product, toggleWishlist, isWishlisted }: ProductCardProps) {
  const { addToCart } = useCart();

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden group transition-all duration-300 hover:border-primary/50 hover:shadow-[var(--glow-primary-sm)] relative">
      {product.bestSeller && (
        <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[0.65rem] font-heading font-bold uppercase px-2 py-0.5 rounded-sm z-10">
          Best Seller
        </span>
      )}
      {discount > 0 && (
        <span className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-[0.65rem] font-heading font-bold px-2 py-0.5 rounded-sm z-10">
          -{discount}%
        </span>
      )}

      <div className="relative h-48 bg-secondary flex items-center justify-center overflow-hidden">
        <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain p-4 group-hover:scale-110 transition-transform duration-500" />
        <button
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-3 right-3 bg-transparent border-none text-muted-foreground hover:text-primary transition-colors cursor-pointer text-lg z-10"
        >
          {isWishlisted ? <FaHeart className="text-primary" /> : <FaRegHeart />}
        </button>
      </div>

      <div className="p-4">
        <p className="text-xs text-primary font-heading uppercase tracking-wider mb-1">{product.category}</p>
        <h3 className="font-body font-semibold text-foreground text-sm mb-2 line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }, (_, i) => (
            <FaStar key={i} className={i < product.rating ? "text-primary text-xs" : "text-muted text-xs"} />
          ))}
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className="font-heading font-bold text-foreground text-lg">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-muted-foreground line-through text-sm">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>
        <button
          onClick={() => addToCart(product)}
          disabled={!product.inStock}
          className={`w-full py-2 rounded-md font-heading font-bold text-xs uppercase flex items-center justify-center gap-2 transition-all cursor-pointer border-none ${
            product.inStock
              ? "bg-primary text-primary-foreground hover:shadow-[var(--glow-primary)]"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          <FaShoppingCart /> {product.inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
