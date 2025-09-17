# Restaurant Web - Aplicación de Carta Digital

Una aplicación web para restaurantes que permite mostrar la carta de manera digital y gestionarla a través de un panel de administración.

## Características

- ✅ Página de inicio con carrusel de imágenes
- ✅ Carta digital responsive para móviles (ideal para QR)
- ✅ Panel de administración para gestionar la carta
- ✅ Sistema de autenticación para propietarios
- ✅ Base de datos con Supabase
- ✅ Diseño responsive con Tailwind CSS

## Configuración

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar Supabase

1. Crear un proyecto en [Supabase](https://supabase.com)
2. Obtener las credenciales del proyecto
3. Configurar las variables de entorno en `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=tu-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key
```

### 3. Configurar la base de datos

Ejecutar las siguientes consultas SQL en Supabase:

```sql
-- Crear tabla de información del restaurante
CREATE TABLE restaurant_info (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  address TEXT,
  phone TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Crear tabla de categorías del menú
CREATE TABLE menu_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  order_position INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Crear tabla de elementos del menú
CREATE TABLE menu_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID REFERENCES menu_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  is_available BOOLEAN DEFAULT true,
  order_position INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX idx_menu_items_category_id ON menu_items(category_id);
CREATE INDEX idx_menu_items_is_available ON menu_items(is_available);
CREATE INDEX idx_menu_categories_order ON menu_categories(order_position);
CREATE INDEX idx_menu_items_order ON menu_items(order_position);

-- Habilitar RLS (Row Level Security)
ALTER TABLE restaurant_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad para lectura pública
CREATE POLICY "Allow public read access" ON restaurant_info FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON menu_categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON menu_items FOR SELECT USING (true);

-- Políticas de seguridad para escritura autenticada
CREATE POLICY "Allow authenticated users to manage restaurant_info" ON restaurant_info FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated users to manage menu_categories" ON menu_categories FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Allow authenticated users to manage menu_items" ON menu_items FOR ALL USING (auth.uid() IS NOT NULL);
```

### 4. Crear usuario administrador

En el panel de autenticación de Supabase, crear un usuario con email y contraseña para acceder al panel de administración.

### 5. Ejecutar la aplicación

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## Uso

### Para los clientes
- Acceso a la página principal en `/`
- Visualización de la carta en `/carta` (optimizada para móviles)

### Para los propietarios
- Acceso al panel de administración en `/admin`
- Gestión de categorías y elementos de la carta en `/admin/dashboard`

## Estructura del proyecto

```
src/
├── app/
│   ├── admin/              # Panel de administración
│   ├── carta/              # Página de la carta
│   └── page.tsx           # Página principal
├── components/
│   └── ImageCarousel.tsx  # Carrusel de imágenes
└── lib/
    ├── database.types.ts  # Tipos de la base de datos
    └── supabase.ts       # Configuración de Supabase
```

## Tecnologías utilizadas

- **Next.js 15** - Framework de React
- **Supabase** - Base de datos y autenticación
- **Tailwind CSS** - Estilos
- **TypeScript** - Tipado estático
- **Lucide React** - Iconos

## Despliegue

La aplicación se puede desplegar fácilmente en Vercel:

1. Conectar el repositorio a Vercel
2. Configurar las variables de entorno
3. Desplegar

## Código QR

Para generar un código QR que apunte a la carta:
- URL: `tu-dominio.com/carta`
- Usar cualquier generador de QR online
- Imprimir y colocar en las mesas
