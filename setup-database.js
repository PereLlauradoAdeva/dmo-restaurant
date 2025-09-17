const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupDatabase() {
  console.log('🚀 Setting up database...')
  console.log('URL:', supabaseUrl)
  console.log('Key exists:', !!supabaseServiceKey)

  try {
    // Step 1: Insert categories first
    console.log('📁 Creating menu categories...')
    const { data: categories, error: categoriesError } = await supabase
      .from('menu_categories')
      .upsert([
        { name: 'Entrantes', order_position: 1 },
        { name: 'Platos Principales', order_position: 2 },
        { name: 'Postres', order_position: 3 },
        { name: 'Bebidas', order_position: 4 }
      ])
      .select()

    if (categoriesError) {
      console.error('Categories error:', categoriesError)
    } else {
      console.log('✅ Categories created:', categories?.length || 0)
    }

    // Step 2: Get all categories to use their IDs
    const { data: allCategories, error: getCategoriesError } = await supabase
      .from('menu_categories')
      .select('*')
      .order('order_position')

    if (getCategoriesError) {
      console.error('Error fetching categories:', getCategoriesError)
      return
    }

    console.log('📝 Found categories:', allCategories?.length || 0)

    // Step 3: Insert menu items
    console.log('🍽️ Creating menu items...')

    const entrantes = allCategories?.find(c => c.name === 'Entrantes')
    const principales = allCategories?.find(c => c.name === 'Platos Principales')
    const postres = allCategories?.find(c => c.name === 'Postres')
    const bebidas = allCategories?.find(c => c.name === 'Bebidas')

    const menuItems = [
      // Entrantes
      {
        category_id: entrantes?.id,
        name: 'Croquetas de Jamón',
        description: 'Croquetas caseras de jamón ibérico con bechamel cremosa',
        price: 8.50,
        is_available: true,
        order_position: 1
      },
      {
        category_id: entrantes?.id,
        name: 'Ensalada César',
        description: 'Lechuga romana, pollo a la plancha, parmesano y salsa césar',
        price: 9.90,
        is_available: true,
        order_position: 2
      },
      {
        category_id: entrantes?.id,
        name: 'Patatas Bravas',
        description: 'Patatas fritas con salsa brava y alioli casero',
        price: 6.50,
        is_available: true,
        order_position: 3
      },

      // Platos Principales
      {
        category_id: principales?.id,
        name: 'Paella Valenciana',
        description: 'Paella tradicional con pollo, conejo, garrofón y judía verde',
        price: 16.90,
        is_available: true,
        order_position: 1
      },
      {
        category_id: principales?.id,
        name: 'Salmón a la Plancha',
        description: 'Salmón fresco con verduras de temporada y salsa de limón',
        price: 18.50,
        is_available: true,
        order_position: 2
      },
      {
        category_id: principales?.id,
        name: 'Entrecot de Ternera',
        description: 'Entrecot a la parrilla con patatas al horno y pimientos',
        price: 22.90,
        is_available: true,
        order_position: 3
      },

      // Postres
      {
        category_id: postres?.id,
        name: 'Tiramisú',
        description: 'Postre italiano con café, mascarpone y cacao',
        price: 5.90,
        is_available: true,
        order_position: 1
      },
      {
        category_id: postres?.id,
        name: 'Crema Catalana',
        description: 'Crema catalana tradicional con azúcar caramelizado',
        price: 4.90,
        is_available: true,
        order_position: 2
      },

      // Bebidas
      {
        category_id: bebidas?.id,
        name: 'Vino Tinto de la Casa',
        description: 'Vino tinto seleccionado por nuestro sommelier',
        price: 12.90,
        is_available: true,
        order_position: 1
      },
      {
        category_id: bebidas?.id,
        name: 'Agua Mineral',
        description: 'Agua mineral natural con gas o sin gas',
        price: 2.50,
        is_available: true,
        order_position: 2
      }
    ]

    const { data: items, error: itemsError } = await supabase
      .from('menu_items')
      .upsert(menuItems)
      .select()

    if (itemsError) {
      console.error('Items error:', itemsError)
    } else {
      console.log('✅ Menu items created:', items?.length || 0)
    }

    console.log('🎉 Database setup completed!')

  } catch (error) {
    console.error('❌ Error setting up database:', error)
  }
}

setupDatabase()