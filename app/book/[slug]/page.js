'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

export default function BookPage() {
  const { slug } = useParams()
  const [event, setEvent] = useState(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [slots, setSlots] = useState([])
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [form, setForm] = useState({ name: '', email: '' })
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch(`/api/events?slug=${slug}`).then(r => r.json()).then(data => {
      if (Array.isArray(data)) setEvent(data.find(e => e.slug === slug))
      else setEvent(data)
    })
  }, [slug])

  useEffect(() => {
    if (!selectedDate || !event) return
    fetch(`/api/slots?eventId=${event.id}&date=${selectedDate}`)
      .then(r => r.json()).then(setSlots)
  }, [selectedDate, event])

  const book = async () => {
    if (!selectedSlot || !form.name || !form.email) return
    setLoading(true)
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventId: event.id,
        name: form.name,
        email: form.email,
        date: selectedDate,
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime,
      }),
    })
    const data = await res.json()
    setLoading(false)
    if (res.ok) {
      setMsg('Booking confirmed!')
      setSlots([])
      setSelectedSlot(null)
    } else {
      setMsg(data.error || 'Error booking.')
    }
  }

  const today = new Date().toISOString().split('T')[0]

  if (!event) return <p className="text-gray-400 mt-10">Loading event...</p>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">{event.title}</h1>
      <p className="text-gray-500 text-sm mb-6">{event.duration} min meeting</p>
      {event.description && <p className="text-sm mb-6">{event.description}</p>}
      <div className="bg-white border rounded p-4 mb-4">
        <label className="block text-sm font-medium mb-1">Select a date</label>
        <input type="date" min={today} value={selectedDate}
          onChange={e => { setSelectedDate(e.target.value); setSelectedSlot(null); setMsg('') }}
          className="border rounded px-3 py-1.5 text-sm" />
      </div>
      {slots.length > 0 && (
        <div className="bg-white border rounded p-4 mb-4">
          <p className="text-sm font-medium mb-2">Available times</p>
          <div className="flex flex-wrap gap-2">
            {slots.map((s, i) => (
              <button key={i}
                onClick={() => setSelectedSlot(s)}
                className={`px-3 py-1 border rounded text-sm ${selectedSlot?.startTime === s.startTime ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}>
                {s.startTime}
              </button>
            ))}
          </div>
        </div>
      )}
      {selectedDate && slots.length === 0 && (
        <p className="text-sm text-gray-400 mb-4">No slots available on this date.</p>
      )}
      {selectedSlot && (
        <div className="bg-white border rounded p-4 mb-4 space-y-2">
          <p className="text-sm font-medium">Your details</p>
          <input placeholder="Your name" value={form.name}
            onChange={e => setForm({...form, name: e.target.value})}
            className="w-full border rounded px-3 py-1.5 text-sm" />
          <input placeholder="Your email" type="email" value={form.email}
            onChange={e => setForm({...form, email: e.target.value})}
            className="w-full border rounded px-3 py-1.5 text-sm" />
          <button onClick={book} disabled={loading}
            className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm hover:bg-blue-700 disabled:opacity-50">
            {loading ? 'Booking...' : `Book ${selectedSlot.startTime}–${selectedSlot.endTime}`}
          </button>
        </div>
      )}
      {msg && <p className="text-sm font-medium text-green-600">{msg}</p>}
    </div>
  )
}
