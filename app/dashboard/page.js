'use client'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [events, setEvents] = useState([])
  const [form, setForm] = useState({ title: '', description: '', duration: 30, slug: '' })
  const [avail, setAvail] = useState([{ dayOfWeek: 1, startTime: '09:00', endTime: '17:00' }])
  const [msg, setMsg] = useState('')

  const load = () => fetch('/api/events').then(r => r.json()).then(setEvents)
  useEffect(() => { load() }, [])

  const addAvail = () => setAvail([...avail, { dayOfWeek: 1, startTime: '09:00', endTime: '17:00' }])
  const updateAvail = (i, field, val) => {
    const a = [...avail]; a[i][field] = val; setAvail(a)
  }

  const submit = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, availability: avail }),
    })
    if (res.ok) {
      setMsg('Event created!')
      setForm({ title: '', description: '', duration: 30, slug: '' })
      setAvail([{ dayOfWeek: 1, startTime: '09:00', endTime: '17:00' }])
      load()
    } else {
      const d = await res.json()
      setMsg(d.error || 'Error')
    }
  }

  const del = async (id) => {
    await fetch(`/api/events/${id}`, { method: 'DELETE' })
    load()
  }

  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Events Dashboard</h1>
      <form onSubmit={submit} className="bg-white border rounded p-4 mb-8 space-y-3">
        <h2 className="font-semibold text-lg">Create Event</h2>
        {msg && <p className="text-sm text-blue-600">{msg}</p>}
        <input required placeholder="Title" value={form.title}
          onChange={e => setForm({...form, title: e.target.value})}
          className="w-full border rounded px-3 py-1.5 text-sm" />
        <input placeholder="Description" value={form.description}
          onChange={e => setForm({...form, description: e.target.value})}
          className="w-full border rounded px-3 py-1.5 text-sm" />
        <input required type="number" placeholder="Duration (mins)" value={form.duration}
          onChange={e => setForm({...form, duration: parseInt(e.target.value)})}
          className="w-full border rounded px-3 py-1.5 text-sm" />
        <input required placeholder="Slug (e.g. my-meeting)" value={form.slug}
          onChange={e => setForm({...form, slug: e.target.value})}
          className="w-full border rounded px-3 py-1.5 text-sm" />
        <div>
          <p className="text-sm font-medium mb-1">Availability</p>
          {avail.map((a, i) => (
            <div key={i} className="flex gap-2 mb-1 items-center text-sm">
              <select value={a.dayOfWeek} onChange={e => updateAvail(i, 'dayOfWeek', parseInt(e.target.value))}
                className="border rounded px-2 py-1">
                {days.map((d, idx) => <option key={idx} value={idx}>{d}</option>)}
              </select>
              <input type="time" value={a.startTime} onChange={e => updateAvail(i, 'startTime', e.target.value)}
                className="border rounded px-2 py-1" />
              <span>to</span>
              <input type="time" value={a.endTime} onChange={e => updateAvail(i, 'endTime', e.target.value)}
                className="border rounded px-2 py-1" />
            </div>
          ))}
          <button type="button" onClick={addAvail} className="text-blue-600 text-sm mt-1">+ Add slot</button>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm hover:bg-blue-700">
          Create Event
        </button>
      </form>
      <h2 className="font-semibold text-lg mb-3">Your Events</h2>
      {events.length === 0 && <p className="text-gray-400 text-sm">No events yet.</p>}
      <ul className="space-y-3">
        {events.map(ev => (
          <li key={ev.id} className="bg-white border rounded p-4 flex justify-between items-start">
            <div>
              <p className="font-medium">{ev.title}</p>
              <p className="text-sm text-gray-500">{ev.duration} min · /book/{ev.slug}</p>
              <a href={`/book/${ev.slug}`} className="text-blue-500 text-sm hover:underline">View booking page</a>
            </div>
            <button onClick={() => del(ev.id)} className="text-red-500 text-sm hover:underline">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
