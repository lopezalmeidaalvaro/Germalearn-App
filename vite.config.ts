import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  // 1. AÑADIMOS LA BASE AQUÍ (Fundamental para GitHub Pages)
  base: '/Germalearn-App/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'pwa-192x192.png', 'pwa-512x512.png', 'audios_examen/*.mp3'],
      manifest: {
        name: 'Germalearn',
        short_name: 'Germalearn',
        description: 'Aprende alemán con ejercicios interactivos',
        theme_color: '#1a1a1a',
        background_color: '#1a1a1a',
        display: 'standalone',
        // 2. AJUSTAMOS EL START_URL (Para que la PWA sepa dónde empezar en el servidor)
        start_url: '/Germalearn-App/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 20 * 1024 * 1024, // 20 MB to support large audio files
        globPatterns: ['**/*.{js,css,html,ico,png,svg,mp3}'],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/api') || url.hostname.includes('generativelanguage.googleapis.com'),
            handler: 'NetworkOnly',
          }
        ]
      }
    })
  ],
})