import { createContext, useContext, useState } from 'react'

const TimelineContext = createContext()

export function TimelineProvider({ children }) {
  const [entries, setEntries] = useState([
    {
      id: 1,
      date: '2025-07-10',
      type: 'call',
      title: 'Call with Sarah Chen',
      friendId: 2,
    },
    {
      id: 2,
      date: '2025-07-08',
      type: 'text',
      title: 'Text with Marcus Johnson',
      friendId: 1,
    },
    {
      id: 3,
      date: '2025-07-05',
      type: 'video',
      title: 'Video with Emily Rodriguez',
      friendId: 3,
    },
    {
      id: 4,
      date: '2025-07-03',
      type: 'call',
      title: 'Call with David Kim',
      friendId: 4,
    },
    {
      id: 5,
      date: '2025-06-28',
      type: 'text',
      title: 'Text with Priya Patel',
      friendId: 5,
    },
  ])

  const addEntry = (friendName, type, friendId) => {
    const now = new Date()
    const dateStr = now.toISOString().split('T')[0]
    const typeLabel = type.charAt(0).toUpperCase() + type.slice(1)
    const newEntry = {
      id: Date.now(),
      date: dateStr,
      type,
      title: `${typeLabel} with ${friendName}`,
      friendId,
    }
    setEntries((prev) => [newEntry, ...prev])
  }

  return (
    <TimelineContext.Provider value={{ entries, addEntry }}>
      {children}
    </TimelineContext.Provider>
  )
}

export function useTimeline() {
  return useContext(TimelineContext)
}
