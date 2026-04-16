'use client'
import { useEffect, useState } from 'react'

export default function BookingsPage() {
  const [bookings, setBookings] = useState([])

  const load = () => fetch('/api/bookings').then(r => r.json()).then(setBookings)
  useEffect(() => { load() }, [])

  const cancel = async (id) => {
    await fetch(`/api/bookings/${id}`, { method: 'PATCH' })
    load()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Bookings</h1>
      {bookings.length === 0 && <p className="text-gray-400 text-sm">No bookings yet.</p>}
      <ul className="space-y-3">
        {bookings.map(b => (
          <li key={b.id} className={`bg-white border rounded p-4 flex justify-between items-start ${b.cancelled ? 'opacity-50' : ''}`}>
            <div>
              <p className="font-medium">{b.name} <span className="text-gray-400 font-normal text-sm">({b.email})</span></p>
              <p className="text-sm text-gray-500">{b.event?.title} · {b.date} · {b.startTime}–{b.endTime}</p>
              {b.cancelled && <span className="text-xs text-red-400">Cancelled</span>}
            </div>
            {!b.cancelled && (
              <button onClick={() => cancel(b.id)} className="text-red-500 text-sm hover:underline">Cancel</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
