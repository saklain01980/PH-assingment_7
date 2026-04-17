import { useParams, useNavigate } from 'react-router-dom'
import { HiPencil, HiClock, HiArchive, HiTrash } from 'react-icons/hi'
import toast from 'react-hot-toast'
import { useTimeline } from '../context/TimelineContext'
import friendsData from '../data/friends.json'
import callIcon from '../assets/call.png'
import textIcon from '../assets/text.png'
import videoIcon from '../assets/video.png'

const statusStyles = {
  overdue: { bg: 'bg-red-100', text: 'text-red-600', label: 'Overdue' },
  'almost due': { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Almost Due' },
  'on-track': { bg: 'bg-green-100', text: 'text-green-700', label: 'On Track' },
}

export default function FriendDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addEntry } = useTimeline()

  const friend = friendsData.find((f) => f.id === parseInt(id))

  if (!friend) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-text-dark mb-4">Friend not found</h2>
        <button onClick={() => navigate('/')} className="text-primary hover:underline">
          Go back home
        </button>
      </div>
    )
  }

  const style = statusStyles[friend.status] || statusStyles['on-track']

  const handleCheckIn = (type) => {
    addEntry(friend.name, type, friend.id)
    const typeLabel = type.charAt(0).toUpperCase() + type.slice(1)
    toast.success(`${typeLabel} with ${friend.name} logged!`, {
      icon: type === 'call' ? '📞' : type === 'text' ? '💬' : '📹',
      style: { borderRadius: '12px', background: '#2D4A3E', color: '#fff' },
    })
  }

  // Format the next due date
  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    const options = { month: 'short', day: 'numeric', year: 'numeric' }
    return date.toLocaleDateString('en-US', options)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN - Friend Info Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            <div className="p-6 flex flex-col items-center text-center">
              <img
                src={friend.picture}
                alt={friend.name}
                className="w-24 h-24 rounded-full object-cover border-3 border-gray-200 mb-4"
              />
              <h2 className="text-lg font-bold text-text-dark">{friend.name}</h2>

              {/* Tags */}
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {friend.tags.map((tag) => (
                  <span key={tag} className={`text-xs px-3 py-1 rounded-full font-medium ${style.bg} ${style.text}`}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Bio */}
              <p className="text-text-muted text-xs mt-3 leading-relaxed italic">"{friend.bio}"</p>
              <p className="text-text-muted text-xs mt-2">Preferred: email</p>
            </div>

            {/* Action Buttons */}
            <div className="border-t border-border px-4 py-3 space-y-1.5">
              <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-border hover:bg-gray-50 transition text-sm text-text-dark">
                <HiClock className="text-base" />
                Snooze 2 Weeks
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-border hover:bg-gray-50 transition text-sm text-text-dark">
                <HiArchive className="text-base" />
                Archive
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-red-50 transition text-sm text-red-500">
                <HiTrash className="text-base" />
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-2 space-y-5">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-border p-5 text-center">
              <p className="text-3xl font-bold text-text-dark mb-1">{friend.days_since_contact}</p>
              <p className="text-text-muted text-xs">Days Since Contact</p>
            </div>
            <div className="bg-white rounded-xl border border-border p-5 text-center">
              <p className="text-3xl font-bold text-text-dark mb-1">{friend.goal}</p>
              <p className="text-text-muted text-xs">Goal (Days)</p>
            </div>
            <div className="bg-white rounded-xl border border-border p-5 text-center">
              <p className="text-lg font-bold text-text-dark mb-1">{formatDate(friend.next_due_date)}</p>
              <p className="text-text-muted text-xs">Next Due</p>
            </div>
          </div>

          {/* Relationship Goal Card */}
          <div className="bg-white rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-semibold text-text-dark">Relationship Goal</h3>
              <button className="text-text-muted hover:text-primary text-sm font-medium transition">
                Edit
              </button>
            </div>
            <div className="border-t border-border pt-3">
              <p className="text-text-muted text-sm">
                Connect every <span className="font-bold text-text-dark">{friend.goal} days</span>
              </p>
            </div>
          </div>

          {/* Quick Check-In Card */}
          <div className="bg-white rounded-xl border border-border p-6">
            <h3 className="text-base font-semibold text-text-dark mb-4">Quick Check-In</h3>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => handleCheckIn('call')}
                className="flex flex-col items-center gap-2 py-5 rounded-xl border border-border hover:border-primary hover:bg-gray-50 transition"
              >
                <img src={callIcon} alt="Call" className="w-7 h-7" />
                <span className="text-xs font-medium text-text-dark">Call</span>
              </button>
              <button
                onClick={() => handleCheckIn('text')}
                className="flex flex-col items-center gap-2 py-5 rounded-xl border border-border hover:border-primary hover:bg-gray-50 transition"
              >
                <img src={textIcon} alt="Text" className="w-7 h-7" />
                <span className="text-xs font-medium text-text-dark">Text</span>
              </button>
              <button
                onClick={() => handleCheckIn('video')}
                className="flex flex-col items-center gap-2 py-5 rounded-xl border border-border hover:border-primary hover:bg-gray-50 transition"
              >
                <img src={videoIcon} alt="Video" className="w-7 h-7" />
                <span className="text-xs font-medium text-text-dark">Video</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
