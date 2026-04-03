-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Categories are publicly readable" ON public.categories FOR SELECT USING (true);

-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  image_url TEXT,
  category_id UUID REFERENCES public.categories(id),
  rating INTEGER DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  in_stock BOOLEAN DEFAULT true,
  best_seller BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Products are publicly readable" ON public.products FOR SELECT USING (true);

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  first_name TEXT,
  last_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Create cart_items table
CREATE TABLE public.cart_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  added_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, product_id)
);

ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own cart" ON public.cart_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can add to cart" ON public.cart_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own cart" ON public.cart_items FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can remove from cart" ON public.cart_items FOR DELETE USING (auth.uid() = user_id);

-- Create wishlist_items table
CREATE TABLE public.wishlist_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  added_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, product_id)
);

ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own wishlist" ON public.wishlist_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can add to wishlist" ON public.wishlist_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can remove from wishlist" ON public.wishlist_items FOR DELETE USING (auth.uid() = user_id);

-- Create orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  total_amount NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  shipping_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create order_items table
CREATE TABLE public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price_at_purchase NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own order items" ON public.order_items FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));
CREATE POLICY "Users can create order items" ON public.order_items FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Updated at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed categories
INSERT INTO public.categories (name) VALUES
  ('Keyboards'), ('Mouse'), ('Headsets'), ('Graphics Cards'), ('Processors'), ('Cabinets');

-- Seed products
INSERT INTO public.products (name, description, price, original_price, image_url, category_id, rating, in_stock, best_seller)
SELECT 'Razer BlackWidow V4 Pro Mechanical Gaming Keyboard', 'Premium mechanical gaming keyboard with Razer Green switches', 15999, 19999, 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&h=300&fit=crop', c.id, 5, true, true FROM public.categories c WHERE c.name = 'Keyboards'
UNION ALL
SELECT 'Corsair K100 RGB Optical-Mechanical Keyboard', 'High-end optical-mechanical keyboard with per-key RGB', 18499, 22000, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop', c.id, 4, true, false FROM public.categories c WHERE c.name = 'Keyboards'
UNION ALL
SELECT 'Logitech G Pro X Superlight 2 Wireless Mouse', 'Ultra-lightweight wireless gaming mouse', 12999, 15999, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop', c.id, 5, true, true FROM public.categories c WHERE c.name = 'Mouse'
UNION ALL
SELECT 'Razer DeathAdder V3 Pro Ergonomic Gaming Mouse', 'Ergonomic wireless gaming mouse with Focus Pro sensor', 10999, NULL, 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&h=300&fit=crop', c.id, 4, true, false FROM public.categories c WHERE c.name = 'Mouse'
UNION ALL
SELECT 'SteelSeries Arctis Nova Pro Wireless Headset', 'Premium wireless gaming headset with ANC', 24999, 29999, 'https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=300&fit=crop', c.id, 5, true, true FROM public.categories c WHERE c.name = 'Headsets'
UNION ALL
SELECT 'HyperX Cloud III Wireless Gaming Headset', 'Comfortable wireless gaming headset', 9999, 12999, 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop', c.id, 4, true, false FROM public.categories c WHERE c.name = 'Headsets'
UNION ALL
SELECT 'NVIDIA GeForce RTX 4090 Founders Edition', 'Flagship gaming GPU with Ada Lovelace architecture', 159999, 175000, 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=300&fit=crop', c.id, 5, true, true FROM public.categories c WHERE c.name = 'Graphics Cards'
UNION ALL
SELECT 'AMD Radeon RX 7900 XTX Reference', 'High-end AMD gaming GPU', 89999, NULL, 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&h=300&fit=crop', c.id, 4, false, false FROM public.categories c WHERE c.name = 'Graphics Cards'
UNION ALL
SELECT 'AMD Ryzen 9 7950X3D Processor', 'Best gaming processor with 3D V-Cache', 44999, 52000, 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=300&fit=crop', c.id, 5, true, true FROM public.categories c WHERE c.name = 'Processors'
UNION ALL
SELECT 'NZXT H9 Elite Mid-Tower ATX Case', 'Premium tempered glass mid-tower case', 14999, 17999, 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&h=300&fit=crop', c.id, 4, true, false FROM public.categories c WHERE c.name = 'Cabinets';