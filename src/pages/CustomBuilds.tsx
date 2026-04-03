import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Heading from "@/components/ui/Heading";
import { FaRocket, FaPalette, FaShieldAlt, FaDesktop } from "react-icons/fa";

const builds = [
  { name: "Starter Build", price: "₹45,000", specs: "Ryzen 5 / GTX 1660 / 16GB RAM", icon: <FaDesktop /> },
  { name: "Pro Build", price: "₹85,000", specs: "Ryzen 7 / RTX 4060 / 32GB RAM", icon: <FaRocket /> },
  { name: "Elite Build", price: "₹1,50,000", specs: "Ryzen 9 / RTX 4080 / 64GB RAM", icon: <FaPalette /> },
  { name: "Ultimate Build", price: "₹2,50,000+", specs: "i9 14900K / RTX 4090 / 128GB RAM", icon: <FaShieldAlt /> },
];

function CustomBuilds() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen">
        <div className="max-w-6xl mx-auto px-4">
          <Heading title="Custom PC Builds" />
          <p className="text-center text-muted-foreground font-body text-lg mb-12">Choose a tier or contact us for a fully custom build.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {builds.map(build => (
              <div key={build.name} className="bg-card border border-border rounded-lg p-6 text-center transition-all hover:border-primary hover:shadow-[var(--glow-primary-sm)] group">
                <div className="text-muted-foreground group-hover:text-primary transition-colors text-3xl mb-4 flex justify-center">{build.icon}</div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{build.name}</h3>
                <p className="text-primary font-heading font-bold text-xl mb-2">{build.price}</p>
                <p className="text-muted-foreground font-body text-sm mb-4">{build.specs}</p>
                <button className="w-full py-2 bg-gradient-to-r from-primary to-accent text-primary-foreground border-none font-heading font-bold text-xs uppercase rounded-md cursor-pointer transition-all hover:shadow-[var(--glow-primary)]">
                  Configure
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default CustomBuilds;
