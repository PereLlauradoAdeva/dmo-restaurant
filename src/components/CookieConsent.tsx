'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent')
    if (!cookieConsent) {
      // Show banner after a short delay
      setTimeout(() => setShowBanner(true), 1000)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setShowBanner(false)
  }

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected')
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 shadow-2xl z-50 border-t-2 border-gray-700">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm md:text-base">
              🍪 Utilizamos cookies para mejorar tu experiencia de navegación y analizar el tráfico del sitio.
              Al continuar navegando, aceptas nuestro uso de cookies.{' '}
              <Link href="/privacy-policy" className="underline hover:text-gray-300">
                Política de Privacidad
              </Link>
              {' '}y{' '}
              <Link href="/terms" className="underline hover:text-gray-300">
                Términos y Condiciones
              </Link>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleReject}
              className="px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
            >
              Rechazar
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 text-sm bg-green-600 hover:bg-green-700 rounded-md transition-colors"
            >
              Aceptar
            </button>
            <button
              onClick={handleReject}
              className="p-2 hover:bg-gray-700 rounded-md transition-colors"
              aria-label="Cerrar"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}