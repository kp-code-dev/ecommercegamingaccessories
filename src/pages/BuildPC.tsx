import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Heading from "@/components/ui/Heading";
import { FaMicrochip, FaDesktop, FaMemory } from "react-icons/fa";

const categories = [
  { name: "Processor", icon: <FaMicrochip />, desc: "Choose your CPU" },
  { name: "Graphics Card", icon: <FaDesktop />, desc: "Pick your GPU" },
  { name: "RAM", icon: <FaMemory />, desc: "Select memory" },
  { name: "Cabinet", icon: <FaDesktop />, desc: "Choose your case" },
];

function BuildPC() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen">
        <div className="max-w-4xl mx-auto px-4">
          <Heading title="Build Your PC" />
          <p className="text-center text-muted-foreground font-body mb-8">Select components to build your dream gaming rig</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map(cat => (
              <div key={cat.name} className="bg-card border border-border rounded-lg p-6 flex items-center gap-4 hover:border-primary/50 transition-colors cursor-pointer group">
                <div className="text-primary text-2xl group-hover:scale-110 transition-transform">{cat.icon}</div>
                <div>
                  <h3 className="font-heading text-foreground text-sm uppercase tracking-wider">{cat.name}</h3>
                  <p className="text-muted-foreground text-xs font-body">{cat.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-card border border-border rounded-lg p-6 text-center">
            <p className="text-muted-foreground font-body text-sm">Full PC builder coming soon! Stay tuned.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default BuildPC;
