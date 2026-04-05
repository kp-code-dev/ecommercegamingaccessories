import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Heading from "@/components/ui/Heading";

function CustomBuilds() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen">
        <div className="max-w-6xl mx-auto px-4">
          {/* How It Works */}
          <section className="mb-16">
            <Heading title="How It Works" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Choose Platform", desc: "Select between Intel or AMD latest generation platforms." },
                { step: "02", title: "Pick Components", desc: "Mix and match premium GPUs, RAM, and cooling solutions." },
                { step: "03", title: "Expert Assembly", desc: "Our technicians build, cable-manage, and stress-test your rig." },
                { step: "04", title: "Plug & Play", desc: "Delivered securely to your door, ready for instant action." },
              ].map(s => (
                <div key={s.step} className="bg-card border border-border rounded-lg p-6 text-center hover:border-primary hover:shadow-[var(--glow-primary-sm)] transition-all group">
                  <span className="text-primary font-heading text-3xl font-bold opacity-50 group-hover:opacity-100 transition-opacity">{s.step}</span>
                  <h3 className="font-heading text-sm font-bold text-foreground uppercase tracking-wider mt-3 mb-2">{s.title}</h3>
                  <p className="text-muted-foreground font-body text-sm">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Features */}
          <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-lg p-8">
                <h2 className="font-heading text-lg font-bold text-foreground mb-3">Flawless Cable Management</h2>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  We believe the inside of your PC should look as good as the outside. Every custom build features meticulous routing, custom sleeved cables, and optimized airflow paths.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-8">
                <h2 className="font-heading text-lg font-bold text-foreground mb-3">Rigorous Stress Testing</h2>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  We don't just put parts together. We run a 48-hour burn-in phase, testing thermals, stability, and acoustics to ensure your system performs flawlessly under maximum load.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center bg-card border border-border rounded-xl p-10">
            <p className="text-muted-foreground font-body mb-2">Ready to dominate the leaderboard?</p>
            <h2 className="font-heading text-3xl md:text-4xl font-black text-foreground uppercase mb-4 glitch-text">
              Build Your Dream PC
            </h2>
            <p className="text-muted-foreground font-body max-w-lg mx-auto mb-6">
              Design a machine that perfectly matches your workflow, gaming style, and aesthetic. Step into the future of custom computing.
            </p>
            <button
              onClick={() => navigate("/build-pc")}
              className="bg-gradient-to-r from-primary to-accent text-primary-foreground font-heading font-bold uppercase text-sm px-8 py-3 rounded-md border-none cursor-pointer transition-all hover:shadow-[var(--glow-primary)] hover:scale-105"
            >
              START BUILDING NOW
            </button>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default CustomBuilds;
