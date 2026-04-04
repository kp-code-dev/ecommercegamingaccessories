import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Heading from "@/components/ui/Heading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "What payment methods do you accept?", a: "We accept UPI, Credit/Debit Cards, Net Banking, and COD for orders under ₹10,000." },
  { q: "How long does shipping take?", a: "Standard delivery takes 3-7 business days. Express delivery is available for select cities (1-3 days)." },
  { q: "What is your return policy?", a: "We offer a 7-day return window for unopened products. Defective items can be returned within 30 days." },
  { q: "Are all products genuine?", a: "Yes! We source directly from authorized distributors and brands. All products come with manufacturer warranty." },
  { q: "Do you offer custom PC builds?", a: "Absolutely! Visit our Custom Builds page to configure your dream gaming PC with our Build PC tool." },
  { q: "How can I track my order?", a: "Once shipped, you'll receive a tracking link via email. You can also check order status in My Orders." },
];

function FAQs() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen">
        <div className="max-w-3xl mx-auto px-4">
          <Heading title="FAQs" />
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-card border border-border rounded-lg px-4">
                <AccordionTrigger className="font-heading text-sm uppercase tracking-wider text-foreground hover:text-primary">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-body text-sm">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default FAQs;
