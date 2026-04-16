import './globals.css'
export const metadata = { title: 'Cal Clone' }
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800 min-h-screen">
        <nav className="bg-white border-b px-6 py-3 flex gap-6 text-sm font-medium">
          <a href="/" className="text-blue-600 hover:underline">Home</a>
          <a href="/dashboard" className="text-blue-600 hover:underline">Events</a>
          <a href="/bookings" className="text-blue-600 hover:underline">Bookings</a>
        </nav>
        <main className="max-w-3xl mx-auto p-6">{children}</main>
      </body>
    </html>
  )
}
