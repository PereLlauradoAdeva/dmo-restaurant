-- Create menu_categories table
CREATE TABLE IF NOT EXISTS menu_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  order_position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create menu_items table
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID REFERENCES menu_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  is_available BOOLEAN DEFAULT true,
  order_position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample categories
INSERT INTO menu_categories (name, order_position) VALUES
  ('Entrantes', 1),
  ('Platos Principales', 2),
  ('Postres', 3),
  ('Bebidas', 4)
ON CONFLICT (name) DO NOTHING;

-- Insert sample menu items
INSERT INTO menu_items (category_id, name, description, price, order_position) VALUES
  -- Entrantes
  ((SELECT id FROM menu_categories WHERE name = 'Entrantes'), 'Croquetas de Jamón', 'Croquetas caseras de jamón ibérico con bechamel cremosa', 8.50, 1),
  ((SELECT id FROM menu_categories WHERE name = 'Entrantes'), 'Ensalada César', 'Lechuga romana, pollo a la plancha, parmesano y salsa césar', 9.90, 2),
  ((SELECT id FROM menu_categories WHERE name = 'Entrantes'), 'Patatas Bravas', 'Patatas fritas con salsa brava y alioli casero', 6.50, 3),

  -- Platos Principales
  ((SELECT id FROM menu_categories WHERE name = 'Platos Principales'), 'Paella Valenciana', 'Paella tradicional con pollo, conejo, garrofón y judía verde', 16.90, 1),
  ((SELECT id FROM menu_categories WHERE name = 'Platos Principales'), 'Salmón a la Plancha', 'Salmón fresco con verduras de temporada y salsa de limón', 18.50, 2),
  ((SELECT id FROM menu_categories WHERE name = 'Platos Principales'), 'Entrecot de Ternera', 'Entrecot a la parrilla con patatas al horno y pimientos', 22.90, 3),

  -- Postres
  ((SELECT id FROM menu_categories WHERE name = 'Postres'), 'Tiramisú', 'Postre italiano con café, mascarpone y cacao', 5.90, 1),
  ((SELECT id FROM menu_categories WHERE name = 'Postres'), 'Crema Catalana', 'Crema catalana tradicional con azúcar caramelizado', 4.90, 2),

  -- Bebidas
  ((SELECT id FROM menu_categories WHERE name = 'Bebidas'), 'Vino Tinto de la Casa', 'Vino tinto seleccionado por nuestro sommelier', 12.90, 1),
  ((SELECT id FROM menu_categories WHERE name = 'Bebidas'), 'Agua Mineral', 'Agua mineral natural con gas o sin gas', 2.50, 2);

-- Enable RLS (Row Level Security)
ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Anyone can read menu_categories" ON menu_categories FOR SELECT USING (true);
CREATE POLICY "Anyone can read menu_items" ON menu_items FOR SELECT USING (true);