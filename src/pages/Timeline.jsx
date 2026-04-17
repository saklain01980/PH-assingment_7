import { useState } from 'react'
import { HiPhone, HiChatAlt2, HiVideoCamera } from 'react-icons/hi'
import { FaHandshake } from 'react-icons/fa'
import { useTimeline } from '../context/TimelineContext'

const typeConfig = {
  meetup: { icon: <FaHandshake className="text-sm" />, color: 'bg-amber-700 text-white' },
  text: { icon: <HiChatAlt2 className="text-sm" />, color: 'bg-amber-700 text-white' },
  video: { icon: <HiVideoCamera className="text-sm" />, color: 'bg-amber-700 text-white' },
  call: { icon: <HiPhone className="text-sm" />, color: 'bg-amber-700 text-white' },
}

export default function Timeline() {
  const { entries } = useTimeline()
  const [filter, setFilter] = useState('all')

  const filteredEntries = filter === 'all' ? entries : entries.filter((e) => e.type === filter)

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-text-dark mb-6">Timeline</h1>

      {/* Filter Dropdown */}
      <div className="mb-8">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-border rounded-lg px-4 py-2 text-sm text-text-muted bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-auto cursor-pointer"
        >
          <option value="all">Filter timeline</option>
          <option value="meetup">Meetup</option>
          <option value="call">Call</option>
          <option value="text">Text</option>
          <option value="video">Video</option>
        </select>
      </div>

      {filteredEntries.length === 0 ? (
        <div className="text-center py-20 text-text-muted">
          <p className="text-lg">No timeline entries yet.</p>
          <p className="text-sm mt-2">Check in with a friend to see entries here!</p>
        </div>
      ) : (
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[18px] top-3 bottom-3 w-0.5 bg-gray-200"></div>

          <div className="space-y-1">
            {filteredEntries.map((entry) => {
              const config = typeConfig[entry.type] || typeConfig.meetup
              return (
                <div key={entry.id} className="relative flex items-start gap-4 py-3">
                  {/* Icon Circle */}
                  <div className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${config.color}`}>
                    {config.icon}
                  </div>

                  {/* Entry Content */}
                  <div className="flex-1 min-w-0 pt-1">
                    <p className="text-sm text-text-dark">
                      <span className="font-bold">{entry.title}</span>
                      {' '}
                      <span className="text-text-muted">with {entry.friendName}</span>
                    </p>
                    <p className="text-xs text-text-muted mt-0.5">{entry.date}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
