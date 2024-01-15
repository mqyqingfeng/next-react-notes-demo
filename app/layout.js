import './style.css'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'

export default async function RootLayout({
  children
}) {

  return (
    <html lang="en">
      <body>
        <div className="container">
          <Header />
          <div className="main">
            <Sidebar />
            <section className="col note-viewer">{children}</section>
          </div>
        </div>
      </body>
    </html>
  )
}
