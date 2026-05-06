import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaStar, FaCheckCircle, FaTimesCircle, FaShoppingCart, FaArrowLeft,
  FaBolt, FaWifi, FaMouse, FaKeyboard, FaHeadset, FaMicrophone, FaMicrochip,
} from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/hooks/useProducts";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const iconMap: Record<string, JSX.Element> = {
  keyboard: <FaKeyboard />,
  mouse: <FaMouse />,
  bolt: <FaBolt />,
  wifi: <FaWifi />,
  headset: <FaHeadset />,
  microphone: <FaMicrophone />,
  chip: <FaMicrochip />,
  cabinet: <FaMicrochip />,
};

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(products.find(p => p.id === id) || null);
  const [activeImage, setActiveImage] = useState<string>(product?.image ?? "");

  useEffect(() => {
    const found = products.find(p => p.id === id);
    setProduct(found || null);
    setActiveImage(found?.image ?? "");
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <>
        <Header />
        <div className="pt-24 pb-16 min-h-screen flex flex-col items-center justify-center gap-4">
          <h2 className="font-heading text-2xl text-foreground">Product Not Found</h2>
          <button onClick={() => navigate("/store")} className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-heading font-bold uppercase border-none cursor-pointer hover:shadow-[var(--glow-primary)] transition-all">
            <FaArrowLeft /> Back to Store
          </button>
        </div>
        <Footer />
      </>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <>
      <Header />
      <div className="pt-24 pb-16 min-h-screen">
        <div className="max-w-6xl mx-auto px-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-transparent border-none text-muted-foreground hover:text-primary font-heading text-sm uppercase cursor-pointer transition-colors mb-6"
          >
            <FaArrowLeft /> Back
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Image Gallery */}
            <div className="flex flex-col gap-4">
              <div className="bg-secondary rounded-lg flex items-center justify-center p-8 min-h-[350px] border border-border">
                <img src={activeImage || product.image} alt={product.name} className="max-h-[300px] max-w-full object-contain" />
              </div>
              {(() => {
                const gallery = [product.image, ...(product.images ?? [])].filter(Boolean);
                if (gallery.length <= 1) return null;
                const current = activeImage || product.image;
                return (
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {gallery.map((img, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActiveImage(img)}
                        className={`flex-shrink-0 w-20 h-20 rounded-md border-2 bg-secondary p-2 transition-all ${
                          current === img ? "border-primary shadow-[var(--glow-primary)]" : "border-border hover:border-primary/50"
                        }`}
                        aria-label={`View image ${i + 1}`}
                      >
                        <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-contain" />
                      </button>
                    ))}
                  </div>
                );
              })()}
              <div className="flex gap-2">
                {product.bestSeller && (
                  <span className="bg-primary text-primary-foreground text-xs font-heading font-bold uppercase px-3 py-1 rounded">Best Seller</span>
                )}
                {product.inStock ? (
                  <span className="flex items-center gap-1 bg-green-500/20 text-green-400 text-xs font-heading font-bold px-3 py-1 rounded">
                    <FaCheckCircle /> In Stock
                  </span>
                ) : (
                  <span className="flex items-center gap-1 bg-destructive/20 text-destructive text-xs font-heading font-bold px-3 py-1 rounded">
                    <FaTimesCircle /> Out of Stock
                  </span>
                )}
              </div>
            </div>

            {/* Right: Info */}
            <div className="flex flex-col gap-5">
              <div>
                {product.brand && (
                  <p className="text-muted-foreground font-heading uppercase text-[0.65rem] tracking-widest mb-0.5">{product.brand}</p>
                )}
                <p className="text-primary font-heading uppercase text-xs tracking-widest mb-1">{product.category}</p>
                <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">{product.name}</h1>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FaStar key={i} className={i < Math.round(product.rating) ? "text-yellow-400" : "text-muted"} />
                  ))}
                </div>
                <span className="text-muted-foreground text-sm font-body">({product.rating}/5)</span>
                {product.reviews !== undefined && (
                  <span className="text-muted-foreground text-sm font-body">· {product.reviews.toLocaleString("en-IN")} reviews</span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <span className="font-heading font-bold text-3xl text-foreground">₹{product.price.toLocaleString("en-IN")}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-muted-foreground line-through text-lg">₹{product.originalPrice.toLocaleString("en-IN")}</span>
                    <span className="text-green-400 font-heading font-bold text-sm">{discount}% OFF</span>
                  </>
                )}
              </div>

              {/* Description */}
              <div className="bg-card border border-border rounded-lg p-5">
                <h3 className="font-heading text-sm uppercase text-primary tracking-wider mb-3">Description</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  Elevate your setup with the {product.name}. This premium {product.category.toLowerCase()} is crafted for performance,
                  durability, and style. Built with high-grade materials, it ensures a long-lasting and reliable user experience
                  for both professional work and intense gaming sessions.
                </p>
              </div>

              {/* Specs */}
              <div className="bg-card border border-border rounded-lg p-5">
                <h3 className="font-heading text-sm uppercase text-primary tracking-wider mb-3">Technical Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex justify-between bg-secondary/50 px-3 py-2 rounded text-sm">
                    <span className="text-muted-foreground">Category</span>
                    <span className="text-foreground font-semibold">{product.category}</span>
                  </div>
                  <div className="flex justify-between bg-secondary/50 px-3 py-2 rounded text-sm">
                    <span className="text-muted-foreground">Warranty</span>
                    <span className="text-foreground font-semibold">1 Year Limited</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-2">
                {product.inStock ? (
                  <>
                    <button className="flex-1 bg-gradient-to-r from-primary to-[hsl(14,100%,45%)] text-primary-foreground border-none py-3 rounded-md font-heading font-bold uppercase tracking-wider cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-[var(--glow-primary)]">
                      Proceed to Buy
                    </button>
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 bg-card border border-primary text-primary py-3 rounded-md font-heading font-bold uppercase tracking-wider cursor-pointer transition-all hover:bg-primary hover:text-primary-foreground flex items-center justify-center gap-2"
                    >
                      <FaShoppingCart /> Add to Cart
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => alert("We will notify you when this item is back in stock!")}
                    className="flex-1 bg-muted text-muted-foreground border-none py-3 rounded-md font-heading font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Notify Me When in Stock
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductDetail;
