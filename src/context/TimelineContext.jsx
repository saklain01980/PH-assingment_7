import { createContext, useContext, useState } from 'react'

const TimelineContext = createContext()

export function TimelineProvider({ children }) {
  const [entries, setEntries] = useState([
    {
      id: 1,
      date: 'March 30, 2026',
      type: 'meetup',
      title: 'Meetup',
      friendName: 'Tom Baker',
      friendId: 1,
    },
    {
      id: 2,
      date: 'March 28, 2026',
      type: 'text',
      title: 'Text',
      friendName: 'Sarah Chen',
      friendId: 2,
    },
    {
      id: 3,
      date: 'March 25, 2026',
      type: 'meetup',
      title: 'Meetup',
      friendName: 'Olivia Martinez',
      friendId: 3,
    },
    {
      id: 4,
      date: 'March 22, 2026',
      type: 'video',
      title: 'Video',
      friendName: 'Aisha Patel',
      friendId: 5,
    },
    {
      id: 5,
      date: 'March 21, 2026',
      type: 'meetup',
      title: 'Meetup',
      friendName: 'Sarah Chen',
      friendId: 2,
    },
    {
      id: 6,
      date: 'March 15, 2026',
      type: 'call',
      title: 'Call',
      friendName: 'Marcus Johnson',
      friendId: 1,
    },
    {
      id: 7,
      date: 'March 7, 2026',
      type: 'meetup',
      title: 'Meetup',
      friendName: 'Aisha Patel',
      friendId: 5,
    },
    {
      id: 8,
      date: 'March 15, 2026',
      type: 'text',
      title: 'Text',
      friendName: 'Olivia Martinez',
      friendId: 3,
    },
    {
      id: 9,
      date: 'March 9, 2026',
      type: 'call',
      title: 'Call',
      friendName: 'Lisa Nakamura',
      friendId: 4,
    },
    {
      id: 10,
      date: 'March 11, 2026',
      type: 'call',
      title: 'Call',
      friendName: 'Sarah Chen',
      friendId: 2,
    },
    {
      id: 11,
      date: 'March 8, 2026',
      type: 'video',
      title: 'Video',
      friendName: 'Marcus Johnson',
      friendId: 1,
    },
    {
      id: 12,
      date: 'February 24, 2026',
      type: 'video',
      title: 'Video',
      friendName: "Ryan O'Brien",
      friendId: 6,
    },
  ])

  const addEntry = (friendName, type, friendId) => {
    const now = new Date()
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    const dateStr = now.toLocaleDateString('en-US', options)
    const typeLabel = type.charAt(0).toUpperCase() + type.slice(1)
    const newEntry = {
      id: Date.now(),
      date: dateStr,
      type,
      title: typeLabel,
      friendName,
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
