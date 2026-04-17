import { HiUserAdd } from 'react-icons/hi'
import friends from '../data/friends.json'

export default function Banner() {
  const totalFriends = friends.length
  const onTrack = friends.filter((f) => f.status === 'on-track').length
  const needAttention = friends.filter((f) => f.status === 'overdue' || f.status === 'almost due').length
  const interactionsThisMonth = 12 // Static value matching the Figma design

  const stats = [
    { label: 'Total Friends', value: totalFriends },
    { label: 'On Track', value: onTrack },
    { label: 'Need Attention', value: needAttention },
    { label: 'Interactions This Month', value: interactionsThisMonth },
  ]

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-text-dark mb-3">
          Friends to keep close in your life
        </h1>
        <p className="text-text-muted text-sm md:text-base mb-8 max-w-2xl mx-auto leading-relaxed">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>
        <button className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-primary-light transition text-sm">
          <HiUserAdd className="text-lg" />
          Add a Friend
        </button>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 max-w-3xl mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-5 text-center border border-border">
              <p className="text-3xl md:text-4xl font-bold text-text-dark mb-1">{stat.value}</p>
              <p className="text-text-muted text-xs">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
