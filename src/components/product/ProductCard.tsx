import { FaHeart, FaRegHeart, FaShoppingCart, FaStar, FaStarHalfAlt, FaRegStar, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  rating: number;
  reviews?: number;
  inStock: boolean;
  bestSeller?: boolean;
  category: string;
  brand?: string;
}

interface ProductCardProps {
  product: Product;
  toggleWishlist: (id: string) => void;
  isWishlisted: boolean;
}

function ProductCard({ product, toggleWishlist, isWishlisted }: ProductCardProps) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) stars.push(<FaStar key={i} className="text-yellow-400 text-xs" />);
      else if (rating >= i - 0.5) stars.push(<FaStarHalfAlt key={i} className="text-yellow-400 text-xs" />);
      else stars.push(<FaRegStar key={i} className="text-muted text-xs" />);
    }
    return stars;
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden group transition-all duration-300 hover:border-primary/50 hover:shadow-[var(--glow-primary-sm)] relative">
      {product.bestSeller && (
        <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[0.65rem] font-heading font-bold uppercase px-2 py-0.5 rounded-sm z-10">
          Best Seller
        </span>
      )}
      {discount > 0 && (
        <span className="absolute top-3 right-12 bg-destructive text-destructive-foreground text-[0.65rem] font-heading font-bold px-2 py-0.5 rounded-sm z-10">
          -{discount}%
        </span>
      )}

      <div className="relative h-48 bg-secondary flex items-center justify-center overflow-hidden cursor-pointer" onClick={handleCardClick}>
        <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain p-4 group-hover:scale-110 transition-transform duration-500" />
        <button
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
          className="absolute top-3 right-3 bg-transparent border-none text-muted-foreground hover:text-primary transition-colors cursor-pointer text-lg z-10"
        >
          {isWishlisted ? <FaHeart className="text-primary" /> : <FaRegHeart />}
        </button>
      </div>

      <div className="p-4 cursor-pointer" onClick={handleCardClick}>
        {product.brand && (
          <p className="text-[0.65rem] text-muted-foreground font-heading uppercase tracking-wider mb-0.5">{product.brand}</p>
        )}
        <p className="text-xs text-primary font-heading uppercase tracking-wider mb-1">{product.category}</p>
        <h3 className="font-body font-semibold text-foreground text-sm mb-2 line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
        <div className="flex items-center gap-1 mb-2">
          {renderStars(product.rating)}
          {product.reviews !== undefined && (
            <span className="text-muted-foreground text-[0.65rem] ml-1">({product.reviews.toLocaleString("en-IN")})</span>
          )}
        </div>
        <div className="flex items-center gap-2 mb-1">
          <span className="font-heading font-bold text-foreground text-lg">₹{product.price.toLocaleString("en-IN")}</span>
          {product.originalPrice && (
            <span className="text-muted-foreground line-through text-sm">₹{product.originalPrice.toLocaleString("en-IN")}</span>
          )}
        </div>
        <div className="mb-3">
          {product.inStock ? (
            <span className="flex items-center gap-1 text-green-400 text-xs font-heading"><FaCheckCircle size={10} /> In Stock</span>
          ) : (
            <span className="flex items-center gap-1 text-destructive text-xs font-heading"><FaTimesCircle size={10} /> Out of Stock</span>
          )}
        </div>
      </div>

      <div className="px-4 pb-4">
        {product.inStock ? (
          <button
            onClick={(e) => { e.stopPropagation(); addToCart(product); }}
            className="w-full py-2 rounded-md font-heading font-bold text-xs uppercase flex items-center justify-center gap-2 transition-all cursor-pointer border-none bg-primary text-primary-foreground hover:shadow-[var(--glow-primary)]"
          >
            <FaShoppingCart /> Add to Cart
          </button>
        ) : (
          <button
            onClick={() => alert("We will notify you when this item is back in stock!")}
            className="w-full py-2 rounded-md font-heading font-bold text-xs uppercase flex items-center justify-center gap-2 transition-all cursor-pointer border-none bg-muted text-muted-foreground"
          >
            Notify Me
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
