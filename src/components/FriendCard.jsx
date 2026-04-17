import { useNavigate } from 'react-router-dom'

const statusStyles = {
  overdue: {
    bg: 'bg-red-100',
    text: 'text-red-600',
    label: 'Overdue',
  },
  'almost due': {
    bg: 'bg-yellow-100',
    text: 'text-yellow-700',
    label: 'Almost Due',
  },
  'on-track': {
    bg: 'bg-green-100',
    text: 'text-green-700',
    label: 'On Track',
  },
}

export default function FriendCard({ friend }) {
  const navigate = useNavigate()
  const style = statusStyles[friend.status] || statusStyles['on-track']

  return (
    <div
      onClick={() => navigate(`/friend/${friend.id}`)}
      className="bg-white rounded-xl border border-border hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden hover:-translate-y-0.5"
    >
      {/* Card Body */}
      <div className="p-5 flex flex-col items-center text-center">
        <img
          src={friend.picture}
          alt={friend.name}
          className="w-20 h-20 rounded-full object-cover border-3 border-gray-200 mb-3"
        />
        <h3 className="font-semibold text-text-dark text-base">{friend.name}</h3>
        <p className="text-text-muted text-xs mt-1">
          {friend.days_since_contact} days ago
        </p>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-1.5 mt-3">
          {friend.tags.map((tag) => (
            <span
              key={tag}
              className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${style.bg} ${style.text}`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Status Badge */}
        <div className={`mt-3 text-xs px-3 py-1 rounded-full font-semibold ${style.bg} ${style.text}`}>
          {style.label}
        </div>
      </div>
    </div>
  )
}
