import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Heading from "@/components/ui/Heading";

function MyOrders() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen">
        <div className="max-w-4xl mx-auto px-4">
          <Heading title="My Orders" />
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <p className="text-muted-foreground font-body text-base">No orders yet.</p>
            <p className="text-muted-foreground font-body text-sm mt-2">Your order history will appear here after your first purchase.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default MyOrders;
