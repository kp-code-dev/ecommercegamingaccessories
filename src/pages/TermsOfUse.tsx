import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Heading from "@/components/ui/Heading";

function TermsOfUse() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen">
        <div className="max-w-4xl mx-auto px-4">
          <Heading title="Terms of Use" />
          <div className="space-y-6 text-muted-foreground font-body text-sm leading-relaxed">
            <section>
              <h2 className="font-heading text-foreground text-base uppercase tracking-wider mb-2">General</h2>
              <p>By using World of MSD, you agree to these terms. We reserve the right to update these terms at any time.</p>
            </section>
            <section>
              <h2 className="font-heading text-foreground text-base uppercase tracking-wider mb-2">Account Responsibility</h2>
              <p>You are responsible for maintaining the security of your account credentials. Notify us immediately of any unauthorized access.</p>
            </section>
            <section>
              <h2 className="font-heading text-foreground text-base uppercase tracking-wider mb-2">Product Availability</h2>
              <p>All products are subject to availability. We reserve the right to limit quantities and discontinue products without notice.</p>
            </section>
            <section>
              <h2 className="font-heading text-foreground text-base uppercase tracking-wider mb-2">Pricing</h2>
              <p>Prices are in INR and may change without notice. We make every effort to ensure accuracy but errors may occur.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default TermsOfUse;
