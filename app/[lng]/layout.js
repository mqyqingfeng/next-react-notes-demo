import './style.css'
import Sidebar from '@/components/Sidebar'
import { locales } from '@/config.js'
import { Footer } from '@/components/Footer'

export async function generateStaticParams() {
  return locales.map((lng) => ({ lng }))
}

export default async function RootLayout({
  children,
  params: {
    lng
  }
}) {
  return (
    <html lang={lng}>
      <body>
        <div className="container">
          <div className="main">
            <Sidebar lng={lng} />
            <section className="col note-viewer">{children}</section>
          </div>
          <Footer lng={lng} />
        </div>
      </body>
    </html>
  )
}
