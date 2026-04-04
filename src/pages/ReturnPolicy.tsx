import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Heading from "@/components/ui/Heading";

function ReturnPolicy() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen">
        <div className="max-w-4xl mx-auto px-4">
          <Heading title="Return Policy" />
          <div className="space-y-6 text-muted-foreground font-body text-sm leading-relaxed">
            <section>
              <h2 className="font-heading text-foreground text-base uppercase tracking-wider mb-2">7-Day Return Window</h2>
              <p>Unopened and unused products can be returned within 7 days of delivery for a full refund.</p>
            </section>
            <section>
              <h2 className="font-heading text-foreground text-base uppercase tracking-wider mb-2">Defective Products</h2>
              <p>If you receive a defective product, contact us within 30 days for a replacement or refund. We cover return shipping for defective items.</p>
            </section>
            <section>
              <h2 className="font-heading text-foreground text-base uppercase tracking-wider mb-2">How to Return</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>Go to My Orders and select the item to return</li>
                <li>Choose your reason for return</li>
                <li>Ship the item in original packaging</li>
                <li>Refund processed within 5-7 business days</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default ReturnPolicy;
