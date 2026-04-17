import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'
import { useTimeline } from '../context/TimelineContext'

const COLORS = {
  text: '#4A90D9',
  call: '#3CB371',
  video: '#7B68AE',
  meetup: '#2D4A3E',
}

export default function Stats() {
  const { entries } = useTimeline()

  const textCount = entries.filter((e) => e.type === 'text').length
  const callCount = entries.filter((e) => e.type === 'call').length
  const videoCount = entries.filter((e) => e.type === 'video').length

  const data = [
    { name: 'Text', value: textCount },
    { name: 'Call', value: callCount },
    { name: 'Video', value: videoCount },
  ].filter((d) => d.value > 0)

  const total = textCount + callCount + videoCount

  const renderLegend = (props) => {
    const { payload } = props
    return (
      <div className="flex items-center justify-center gap-6 mt-4">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-1.5">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs text-text-muted">{entry.value}</span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-text-dark mb-8">Friendship Analytics</h1>

      {/* Donut Chart Card */}
      <div className="bg-white rounded-xl border border-border p-8">
        <p className="text-sm text-text-dark mb-6">
          By <span className="font-semibold">Interaction Type</span>
        </p>
        {total === 0 ? (
          <div className="text-center py-12 text-text-muted">
            <p>No interactions logged yet.</p>
            <p className="text-sm mt-1">Check in with friends to see analytics!</p>
          </div>
        ) : (
          <div className="h-72 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="45%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((entry) => (
                    <Cell key={entry.name} fill={COLORS[entry.name.toLowerCase()]} />
                  ))}
                </Pie>
                <Legend content={renderLegend} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  )
}
