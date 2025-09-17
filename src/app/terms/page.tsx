import Link from 'next/link'

export default function TermsPage() {
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
            <Link href="/carta" className="text-gray-700 hover:text-gray-900 font-medium">
              Carta
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="prose prose-gray max-w-none">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Términos y Condiciones
          </h1>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Información General</h2>
              <p>
                Bienvenido a Restaurant. Al acceder y utilizar este sitio web, aceptas cumplir con estos términos y condiciones de uso. Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar nuestro sitio web.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Uso del Sitio Web</h2>
              <p>
                Este sitio web está destinado a proporcionar información sobre nuestro restaurante, incluyendo nuestro menú, ubicación y servicios. Puedes utilizar este sitio únicamente para fines legales y de acuerdo con estos términos.
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>No debes utilizar el sitio de manera que pueda dañar, deshabilitar o sobrecargar el servidor</li>
                <li>No debes intentar obtener acceso no autorizado a cualquier parte del sitio</li>
                <li>No debes utilizar el sitio para transmitir material ofensivo o ilegal</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Reservas y Pedidos</h2>
              <p>
                Las reservas están sujetas a disponibilidad. Nos reservamos el derecho de confirmar todas las reservas por teléfono o email. En caso de cancelación, agradecemos un aviso previo de al menos 2 horas.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Precios y Menú</h2>
              <p>
                Los precios mostrados en nuestro sitio web están sujetos a cambios sin previo aviso. Nos esforzamos por mantener la información actualizada, pero los precios finales serán los vigentes en el momento de la visita al restaurante.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Propiedad Intelectual</h2>
              <p>
                Todo el contenido de este sitio web, incluyendo textos, imágenes, logotipos y diseños, está protegido por derechos de autor y otras leyes de propiedad intelectual. No puedes reproducir, distribuir o modificar este contenido sin nuestro permiso expreso.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Limitación de Responsabilidad</h2>
              <p>
                Restaurant no será responsable de ningún daño directo, indirecto, incidental o consecuente que resulte del uso o la imposibilidad de usar este sitio web.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Modificaciones</h2>
              <p>
                Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en el sitio web.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contacto</h2>
              <p>
                Si tienes alguna pregunta sobre estos términos y condiciones, puedes contactarnos en:
              </p>
              <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                <p><strong>Restaurant</strong></p>
                <p>Calle Principal, 123</p>
                <p>12345 Ciudad</p>
                <p>Email: info@restaurant.com</p>
                <p>Teléfono: +34 123 456 789</p>
              </div>
            </section>

            <p className="text-sm text-gray-500 mt-8">
              Última actualización: Enero 2024
            </p>
          </div>
        </div>
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