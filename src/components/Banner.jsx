import { HiUserAdd, HiUsers, HiExclamationCircle, HiClock, HiCheckCircle } from 'react-icons/hi'
import friends from '../data/friends.json'

export default function Banner() {
  const totalFriends = friends.length
  const overdue = friends.filter((f) => f.status === 'overdue').length
  const almostDue = friends.filter((f) => f.status === 'almost due').length
  const onTrack = friends.filter((f) => f.status === 'on-track').length

  const stats = [
    { label: 'Total Friends', value: totalFriends, icon: <HiUsers className="text-2xl text-secondary" />, bg: 'bg-blue-50' },
    { label: 'Overdue', value: overdue, icon: <HiExclamationCircle className="text-2xl text-overdue-text" />, bg: 'bg-red-50' },
    { label: 'Almost Due', value: almostDue, icon: <HiClock className="text-2xl text-almost-due-text" />, bg: 'bg-yellow-50' },
    { label: 'On Track', value: onTrack, icon: <HiCheckCircle className="text-2xl text-on-track-text" />, bg: 'bg-green-50' },
  ]

  return (
    <section className="bg-gradient-to-br from-primary to-primary-light text-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-3">Keep Your Friendships Alive</h1>
        <p className="text-white/70 text-base md:text-lg mb-6 max-w-2xl mx-auto">
          Track your connections, set goals, and never lose touch with the people who matter most to you.
        </p>
        <button className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-6 py-3 rounded-xl hover:bg-white/90 transition shadow-lg">
          <HiUserAdd className="text-xl" />
          Add a Friend
        </button>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          {stats.map((stat) => (
            <div key={stat.label} className={`${stat.bg} rounded-xl p-4 md:p-5 text-center shadow-sm`}>
              <div className="flex justify-center mb-2">{stat.icon}</div>
              <p className="text-2xl md:text-3xl font-bold text-text-dark">{stat.value}</p>
              <p className="text-text-muted text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
