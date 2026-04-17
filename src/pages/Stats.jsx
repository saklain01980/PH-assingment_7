import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { useTimeline } from '../context/TimelineContext'

const COLORS = {
  call: '#10B981',
  text: '#4A90D9',
  video: '#8B5CF6',
}

export default function Stats() {
  const { entries } = useTimeline()

  const callCount = entries.filter((e) => e.type === 'call').length
  const textCount = entries.filter((e) => e.type === 'text').length
  const videoCount = entries.filter((e) => e.type === 'video').length

  const data = [
    { name: 'Call', value: callCount },
    { name: 'Text', value: textCount },
    { name: 'Video', value: videoCount },
  ].filter((d) => d.value > 0)

  const total = callCount + textCount + videoCount

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-text-dark mb-8">Friendship Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-card rounded-xl shadow-sm border border-border p-5 text-center">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-green-700 font-bold">{callCount}</span>
          </div>
          <p className="text-text-muted text-sm">Calls</p>
        </div>
        <div className="bg-card rounded-xl shadow-sm border border-border p-5 text-center">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-blue-700 font-bold">{textCount}</span>
          </div>
          <p className="text-text-muted text-sm">Texts</p>
        </div>
        <div className="bg-card rounded-xl shadow-sm border border-border p-5 text-center">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-purple-700 font-bold">{videoCount}</span>
          </div>
          <p className="text-text-muted text-sm">Video Calls</p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-card rounded-xl shadow-sm border border-border p-6">
        <h2 className="text-lg font-semibold text-text-dark mb-4">Interaction Breakdown</h2>
        {total === 0 ? (
          <div className="text-center py-12 text-text-muted">
            <p>No interactions logged yet.</p>
            <p className="text-sm mt-1">Check in with friends to see analytics!</p>
          </div>
        ) : (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {data.map((entry) => (
                    <Cell key={entry.name} fill={COLORS[entry.name.toLowerCase()]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  )
}
