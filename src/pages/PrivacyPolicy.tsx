import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Heading from "@/components/ui/Heading";

function PrivacyPolicy() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen">
        <div className="max-w-4xl mx-auto px-4">
          <Heading title="Privacy Policy" />
          <div className="space-y-6 text-muted-foreground font-body text-sm leading-relaxed">
            <section>
              <h2 className="font-heading text-foreground text-base uppercase tracking-wider mb-2">Information We Collect</h2>
              <p>We collect personal information you provide during registration, orders, and contact forms including name, email, shipping address, and payment details.</p>
            </section>
            <section>
              <h2 className="font-heading text-foreground text-base uppercase tracking-wider mb-2">How We Use Your Data</h2>
              <p>Your data is used to process orders, improve our services, send order updates, and provide customer support. We never sell your personal information to third parties.</p>
            </section>
            <section>
              <h2 className="font-heading text-foreground text-base uppercase tracking-wider mb-2">Data Security</h2>
              <p>We use industry-standard encryption and security measures to protect your data. Payment processing is handled by certified PCI-compliant providers.</p>
            </section>
            <section>
              <h2 className="font-heading text-foreground text-base uppercase tracking-wider mb-2">Contact</h2>
              <p>For privacy-related inquiries, email us at <span className="text-primary">privacy@worldofmsd.com</span></p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default PrivacyPolicy;
