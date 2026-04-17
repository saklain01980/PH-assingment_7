import { useNavigate } from 'react-router-dom'

const statusStyles = {
  overdue: {
    bg: 'bg-overdue',
    text: 'text-overdue-text',
    label: 'Overdue',
  },
  'almost due': {
    bg: 'bg-almost-due',
    text: 'text-almost-due-text',
    label: 'Almost Due',
  },
  'on-track': {
    bg: 'bg-on-track',
    text: 'text-on-track-text',
    label: 'On Track',
  },
}

export default function FriendCard({ friend }) {
  const navigate = useNavigate()
  const style = statusStyles[friend.status] || statusStyles['on-track']

  return (
    <div
      onClick={() => navigate(`/friend/${friend.id}`)}
      className="bg-card rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-border hover:-translate-y-1"
    >
      {/* Status Bar */}
      <div className={`${style.bg} px-4 py-2 flex items-center justify-between`}>
        <span className={`text-xs font-semibold ${style.text} uppercase tracking-wide`}>
          {style.label}
        </span>
        <span className={`text-xs ${style.text}`}>{friend.days_since_contact}d ago</span>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col items-center text-center">
        <img
          src={friend.picture}
          alt={friend.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-border mb-3"
        />
        <h3 className="font-semibold text-text-dark text-base">{friend.name}</h3>
        <p className="text-text-muted text-sm mt-1">
          {friend.days_since_contact} days since contact
        </p>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-1.5 mt-3">
          {friend.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-blue-50 text-secondary px-2.5 py-1 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
