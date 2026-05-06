import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaMouse, FaKeyboard, FaHeadset, FaMicrochip, FaTools, FaRocket, FaPalette, FaShieldAlt } from "react-icons/fa";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import MarqueeContainer from "@/components/ui/MarqueeContainer";
import Heading from "@/components/ui/Heading";
import { useProducts } from "@/hooks/useProducts";

function Index() {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const { products } = useProducts();

  const bestProducts = products.filter(p => p.bestSeller).slice(0, 5);

  const toggleWishlist = (id: string) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else setItemsPerPage(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center pt-20 px-4 bg-gradient-to-b from-background via-background to-secondary/20">
        <h1 className="font-heading text-5xl md:text-7xl font-black text-foreground uppercase leading-tight">
          Gaming<br />
          <span className="glitch-text">Accessories</span>
        </h1>
        <p className="text-muted-foreground font-body text-xl md:text-2xl mt-4 mb-8">Next-Gen Gaming Hardware for the elite</p>
        <Link
          to="/store"
          className="bg-gradient-to-r from-primary to-accent text-primary-foreground font-heading font-bold uppercase text-sm px-8 py-3 rounded-md no-underline transition-all hover:shadow-[var(--glow-primary)] hover:scale-105"
        >
          Enter Store
        </Link>
      </section>

      <MarqueeContainer />

      {/* Popular Products */}
      <section className="max-w-6xl mx-auto px-4 py-16 relative">
        <Heading title="Popular Products" />
        <div className="flex justify-center mb-6">
          <Link to="/store" className="text-primary font-heading text-sm uppercase tracking-wider no-underline hover:underline">
            View All →
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setStartIndex(Math.max(0, startIndex - 1))}
            disabled={startIndex === 0}
            className="bg-card border border-border text-foreground p-3 rounded-full disabled:opacity-30 hover:border-primary transition-colors cursor-pointer disabled:cursor-not-allowed"
          >
            <FaArrowLeft />
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
            {bestProducts.slice(startIndex, startIndex + itemsPerPage).map(product => (
              <ProductCard
                key={product.id}
                product={product}
                toggleWishlist={toggleWishlist}
                isWishlisted={wishlist.includes(product.id)}
              />
            ))}
          </div>
          <button
            onClick={() => setStartIndex(Math.min(bestProducts.length - itemsPerPage, startIndex + 1))}
            disabled={startIndex + itemsPerPage >= bestProducts.length}
            className="bg-card border border-border text-foreground p-3 rounded-full disabled:opacity-30 hover:border-primary transition-colors cursor-pointer disabled:cursor-not-allowed"
          >
            <FaArrowRight />
          </button>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <Heading title="Shop by Category" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { icon: <FaMouse size={28} />, label: "Gaming Mouse" },
            { icon: <FaKeyboard size={28} />, label: "Keyboards" },
            { icon: <FaHeadset size={28} />, label: "Headsets" },
            { icon: <FaMicrochip size={28} />, label: "PC Components" },
            { icon: <FaTools size={28} />, label: "Build Your PC" },
          ].map(cat => (
            <Link
              key={cat.label}
              to="/store"
              className="bg-card border border-border rounded-lg p-6 flex flex-col items-center gap-3 no-underline text-foreground transition-all hover:border-primary hover:shadow-[var(--glow-primary-sm)] group"
            >
              <div className="text-muted-foreground group-hover:text-primary transition-colors">{cat.icon}</div>
              <h3 className="font-heading text-sm font-bold uppercase text-center">{cat.label}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <Heading title="Why Choose Us" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Trusted Brands", desc: "Only the best for the elite." },
            { title: "High Performance", desc: "Gear tuned for victory." },
            { title: "Gamer Focused", desc: "Built by gamers, for gamers." },
          ].map(card => (
            <div key={card.title} className="bg-card border border-border rounded-lg p-6 text-center transition-all hover:border-primary hover:shadow-[var(--glow-primary-sm)]">
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">{card.title}</h3>
              <p className="text-muted-foreground font-body">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Build PC CTA */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-card border border-border rounded-xl p-8 md:p-12 text-center">
          <Heading title="Build Your Ultimate Gaming Rig" />
          <p className="text-muted-foreground font-body text-lg mb-8">Experience gaming like never before with our custom-tuned PCs.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { icon: <FaRocket />, title: "Extreme Performance", desc: "Overclocked & optimized for max FPS." },
              { icon: <FaPalette />, title: "Custom Aesthetics", desc: "Premium cases, RGB lighting & cable mods." },
              { icon: <FaShieldAlt />, title: "Elite Support", desc: "3-Year Warranty & 24/7 Tech Support." },
            ].map(feat => (
              <div key={feat.title} className="flex flex-col items-center gap-3">
                <span className="text-primary text-2xl">{feat.icon}</span>
                <h3 className="font-heading text-sm font-bold text-foreground">{feat.title}</h3>
                <p className="text-muted-foreground font-body text-sm">{feat.desc}</p>
              </div>
            ))}
          </div>
          <Link
            to="/custom-builds"
            className="bg-gradient-to-r from-primary to-accent text-primary-foreground font-heading font-bold uppercase text-sm px-8 py-3 rounded-md no-underline transition-all hover:shadow-[var(--glow-primary)] hover:scale-105 inline-block"
          >
            START CONFIGURATION
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Index;
