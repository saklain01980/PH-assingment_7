import { useState } from 'react'
import { HiPhone, HiChatAlt2, HiVideoCamera, HiFilter } from 'react-icons/hi'
import { useTimeline } from '../context/TimelineContext'

const typeConfig = {
  call: { icon: <HiPhone className="text-lg" />, color: 'bg-green-100 text-green-700', border: 'border-green-300' },
  text: { icon: <HiChatAlt2 className="text-lg" />, color: 'bg-blue-100 text-blue-700', border: 'border-blue-300' },
  video: { icon: <HiVideoCamera className="text-lg" />, color: 'bg-purple-100 text-purple-700', border: 'border-purple-300' },
}

export default function Timeline() {
  const { entries } = useTimeline()
  const [filter, setFilter] = useState('all')

  const filteredEntries = filter === 'all' ? entries : entries.filter((e) => e.type === filter)

  const sortedEntries = [...filteredEntries].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-text-dark">Timeline</h1>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2">
          <HiFilter className="text-text-muted" />
          {['all', 'call', 'text', 'video'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                filter === type
                  ? 'bg-primary text-white'
                  : 'bg-white text-text-muted border border-border hover:border-primary hover:text-primary'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {sortedEntries.length === 0 ? (
        <div className="text-center py-20 text-text-muted">
          <p className="text-lg">No timeline entries yet.</p>
          <p className="text-sm mt-2">Check in with a friend to see entries here!</p>
        </div>
      ) : (
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border"></div>

          <div className="space-y-4">
            {sortedEntries.map((entry) => {
              const config = typeConfig[entry.type]
              return (
                <div key={entry.id} className="relative flex items-start gap-4 pl-12">
                  {/* Icon Circle */}
                  <div className={`absolute left-2.5 w-5 h-5 rounded-full flex items-center justify-center ${config.color} ring-4 ring-bg`}>
                  </div>

                  {/* Entry Card */}
                  <div className={`flex-1 bg-card rounded-xl shadow-sm border border-border p-4 hover:shadow-md transition`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${config.color}`}>
                          {config.icon}
                        </div>
                        <div>
                          <p className="font-medium text-text-dark">{entry.title}</p>
                          <p className="text-xs text-text-muted mt-0.5">{entry.date}</p>
                        </div>
                      </div>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${config.color}`}>
                        {entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}
                      </span>
                    </div>
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
