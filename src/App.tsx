import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import ThemeSwitcher from "@/components/layout/ThemeSwitcher";
import BackgroundGrid from "@/components/layout/BackgroundGrid";
import Index from "./pages/Index";
import Store from "./pages/Store";
import CustomBuilds from "./pages/CustomBuilds";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import FAQs from "./pages/FAQs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ReturnPolicy from "./pages/ReturnPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import BuildPC from "./pages/BuildPC";
import MyOrders from "./pages/MyOrders";
import Profile from "./pages/Profile";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminCategories from "./pages/admin/AdminCategories";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <Toaster />
            <Sonner />
            <BackgroundGrid />
            <ThemeSwitcher />
            <BrowserRouter>
              <div className="relative z-[1]">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/store" element={<Store />} />
                  <Route path="/custom-builds" element={<CustomBuilds />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/contact-us" element={<ContactUs />} />
                  <Route path="/faqs" element={<FAQs />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/return-policy" element={<ReturnPolicy />} />
                  <Route path="/term-of-use" element={<TermsOfUse />} />
                  <Route path="/build-pc" element={<BuildPC />} />
                  <Route path="/my-orders" element={<MyOrders />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="orders" element={<AdminOrders />} />
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="categories" element={<AdminCategories />} />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </BrowserRouter>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
