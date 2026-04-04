import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Heading from "@/components/ui/Heading";

function AboutUs() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen">
        <div className="max-w-4xl mx-auto px-4">
          <Heading title="About Us" />
          <div className="space-y-6 text-muted-foreground font-body text-base leading-relaxed">
            <p>
              Welcome to <span className="text-primary font-bold">WORLD OF MSD</span> — your ultimate destination for premium gaming accessories. 
              We are passionate gamers who understand the importance of having the right gear.
            </p>
            <p>
              Founded with a mission to bring the best gaming peripherals to enthusiasts across India, we curate 
              only the finest keyboards, mice, headsets, graphics cards, processors, and PC components from top brands.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {[
                { title: "Premium Quality", desc: "Only authentic, top-tier gaming products" },
                { title: "Fast Delivery", desc: "Quick shipping across India" },
                { title: "Expert Support", desc: "Gaming enthusiasts helping gamers" },
              ].map(item => (
                <div key={item.title} className="bg-card border border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                  <h3 className="font-heading text-primary text-sm uppercase tracking-wider mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default AboutUs;
