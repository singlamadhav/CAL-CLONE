export default function Home() {
  return (
    <div className="mt-10 text-center">
      <h1 className="text-3xl font-bold mb-3">Cal Clone</h1>
      <p className="text-gray-500 mb-6">A minimal scheduling app.</p>
      <div className="flex justify-center gap-4">
        <a href="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Manage Events</a>
        <a href="/bookings" className="border px-4 py-2 rounded hover:bg-gray-100">View Bookings</a>
      </div>
    </div>
  )
}
