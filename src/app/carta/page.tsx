import { createSupabaseServerClient } from '@/lib/supabase-server'
import Link from 'next/link'

interface MenuItem {
  id: string
  name: string
  description: string | null
  price: number
  is_available: boolean
  order_position: number
}

interface MenuCategory {
  id: string
  name: string
  order_position: number
  menu_items: MenuItem[]
}

async function getMenuData(): Promise<MenuCategory[]> {
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from('menu_categories')
    .select(`
      *,
      menu_items(*)
    `)
    .eq('menu_items.is_available', true)
    .order('order_position')
    .order('order_position', { referencedTable: 'menu_items' })

  if (error) {
    console.error('Error fetching menu:', error)
    return []
  }

  return data || []
}

export default async function CartaPage() {
  const menuData = await getMenuData()

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl md:text-3xl font-bold text-gray-900 hover:text-gray-700">
            Restaurant
          </Link>
          <nav className="flex space-x-6">
            <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium">
              Inicio
            </Link>
            <Link href="/carta" className="text-gray-900 font-medium border-b-2 border-gray-900">
              Carta
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-4 md:py-8">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl xs:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nuestra Carta
          </h1>
          <p className="text-base md:text-lg text-gray-600 px-4">
            Descubre nuestros deliciosos platos preparados con ingredientes frescos
          </p>
        </div>

        {menuData.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-4">
              La carta se está actualizando
            </p>
            <p className="text-gray-500">
              Vuelve pronto para ver nuestros deliciosos platos
            </p>
          </div>
        ) : (
          <div className="space-y-8 md:space-y-12">
            {menuData.map((category) => (
              <section key={category.id} className="bg-gray-50 rounded-lg p-4 md:p-6 lg:p-8">
                <h2 className="text-xl xs:text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6 text-center">
                  {category.name}
                </h2>

                <div className="grid gap-4 md:gap-6">
                  {category.menu_items?.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                        <div className="flex-1 mb-3 sm:mb-0">
                          <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                            {item.name}
                          </h3>
                          {item.description && (
                            <p className="text-sm md:text-base text-gray-600 mb-3 sm:mb-0">
                              {item.description}
                            </p>
                          )}
                        </div>
                        <div className="sm:ml-4 flex justify-end">
                          <span className="text-xl md:text-2xl font-bold text-gray-900">
                            €{item.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Restaurant</h3>
              <p className="text-gray-400 text-sm">
                Desde 1985, ofreciendo auténtica cocina tradicional con los mejores ingredientes frescos.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Enlaces</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link href="/carta" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Carta
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Términos y Condiciones
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Política de Privacidad
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contacto</h3>
              <div className="text-gray-400 text-sm space-y-2">
                <p>Calle Principal, 123</p>
                <p>12345 Ciudad</p>
                <p>Tel: +34 123 456 789</p>
                <p>Email: info@restaurant.com</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-6 flex justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Restaurant. Todos los derechos reservados.
            </p>

            {/* Discreet admin access button */}
            <Link
              href="/admin"
              className="text-gray-600 hover:text-gray-400 text-xs transition-colors opacity-30 hover:opacity-60"
              title="Área de administración"
            >
              •••
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}