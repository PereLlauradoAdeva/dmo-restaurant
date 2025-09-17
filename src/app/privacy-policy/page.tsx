import Link from 'next/link'

export default function PrivacyPolicyPage() {
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
            Política de Privacidad
          </h1>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Información que Recopilamos</h2>
              <p>
                En Restaurant, respetamos tu privacidad y nos comprometemos a proteger tus datos personales. Esta política de privacidad explica qué información recopilamos, cómo la utilizamos y tus derechos respecto a esta información.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Información que puedes proporcionarnos:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Nombre y datos de contacto cuando realizas una reserva</li>
                <li>Preferencias alimentarias o alergias que nos comuniques</li>
                <li>Comentarios o feedback que nos envíes</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Información que recopilamos automáticamente:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Dirección IP y ubicación aproximada</li>
                <li>Información sobre tu navegador y dispositivo</li>
                <li>Páginas que visitas en nuestro sitio web</li>
                <li>Fecha y hora de tu visita</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Cómo Utilizamos tu Información</h2>
              <p>Utilizamos la información recopilada para:</p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>Gestionar reservas y proporcionar nuestros servicios</li>
                <li>Comunicarnos contigo sobre tu reserva o consulta</li>
                <li>Mejorar nuestro sitio web y servicios</li>
                <li>Cumplir con obligaciones legales</li>
                <li>Enviar información sobre ofertas especiales (solo si has dado tu consentimiento)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Cookies y Tecnologías Similares</h2>
              <p>
                Utilizamos cookies y tecnologías similares para mejorar tu experiencia en nuestro sitio web. Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas nuestro sitio.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Tipos de cookies que utilizamos:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Cookies esenciales:</strong> Necesarias para el funcionamiento básico del sitio</li>
                <li><strong>Cookies de rendimiento:</strong> Nos ayudan a entender cómo los visitantes utilizan nuestro sitio</li>
                <li><strong>Cookies de funcionalidad:</strong> Permiten que el sitio recuerde tus preferencias</li>
              </ul>

              <p className="mt-4">
                Puedes controlar el uso de cookies a través de la configuración de tu navegador o mediante nuestro banner de consentimiento de cookies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Compartir Información</h2>
              <p>
                No vendemos, alquilamos ni compartimos tu información personal con terceros, excepto en los siguientes casos:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>Cuando tenemos tu consentimiento explícito</li>
                <li>Para cumplir con obligaciones legales</li>
                <li>Con proveedores de servicios que nos ayudan a operar nuestro negocio (bajo estrictos acuerdos de confidencialidad)</li>
                <li>En caso de venta o transferencia de nuestro negocio</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Seguridad de los Datos</h2>
              <p>
                Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger tu información personal contra acceso no autorizado, alteración, divulgación o destrucción.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Retención de Datos</h2>
              <p>
                Conservamos tu información personal solo durante el tiempo necesario para cumplir con los fines para los que fue recopilada, incluyendo cualquier requisito legal, contable o de informes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Tus Derechos</h2>
              <p>Tienes derecho a:</p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>Acceder a tu información personal</li>
                <li>Rectificar información inexacta</li>
                <li>Solicitar la eliminación de tu información</li>
                <li>Oponerte al procesamiento de tu información</li>
                <li>Solicitar la portabilidad de tus datos</li>
                <li>Retirar tu consentimiento en cualquier momento</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Cambios a esta Política</h2>
              <p>
                Podemos actualizar esta política de privacidad ocasionalmente. Te notificaremos cualquier cambio significativo publicando la nueva política en nuestro sitio web.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contacto</h2>
              <p>
                Si tienes alguna pregunta sobre esta política de privacidad o sobre cómo manejamos tu información personal, puedes contactarnos en:
              </p>
              <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                <p><strong>Restaurant</strong></p>
                <p>Calle Principal, 123</p>
                <p>12345 Ciudad</p>
                <p>Email: privacy@restaurant.com</p>
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