import Link from 'next/link'
import ImageCarousel from '@/components/ImageCarousel'

export default function Home() {
  const carouselImages = [
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=400&fit=crop'
  ]

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Restaurant</h1>
          <nav className="flex space-x-6">
            <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium">
              Inicio
            </Link>
            <Link href="/carta" className="text-gray-700 hover:text-gray-900 font-medium">
              Carta
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <section className="mb-12">
          <ImageCarousel images={carouselImages} />
        </section>

        <section className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Bienvenido a nuestro restaurant
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Disfruta de una experiencia culinaria única con los mejores ingredientes frescos y
            platos tradicionales preparados con amor. Nuestro equipo de chefs experimentados
            se dedica a crear sabores auténticos que deleitarán tu paladar.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Desde 1985, hemos sido el lugar favorito de las familias para celebrar momentos
            especiales y disfrutar de comidas memorables en un ambiente cálido y acogedor.
          </p>
          <Link
            href="/carta"
            className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Ver nuestra carta
          </Link>
        </section>
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
