import { useParams, useNavigate } from 'react-router-dom'
import { HiPhone, HiChatAlt2, HiVideoCamera, HiPencil, HiArrowLeft, HiClock, HiArchive, HiTrash } from 'react-icons/hi'
import toast from 'react-hot-toast'
import { useTimeline } from '../context/TimelineContext'
import friendsData from '../data/friends.json'
import callIcon from '../assets/call.png'
import textIcon from '../assets/text.png'
import videoIcon from '../assets/video.png'

const statusStyles = {
  overdue: { bg: 'bg-overdue', text: 'text-overdue-text', label: 'Overdue' },
  'almost due': { bg: 'bg-almost-due', text: 'text-almost-due-text', label: 'Almost Due' },
  'on-track': { bg: 'bg-on-track', text: 'text-on-track-text', label: 'On Track' },
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
        <button onClick={() => navigate('/')} className="text-secondary hover:underline">
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
      style: { borderRadius: '12px', background: '#1E3A5F', color: '#fff' },
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-text-muted hover:text-text-dark mb-6 transition"
      >
        <HiArrowLeft />
        Back to Friends
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN - Friend Info Card */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-xl shadow-md border border-border overflow-hidden">
            {/* Status Header */}
            <div className={`${style.bg} px-5 py-3 text-center`}>
              <span className={`text-sm font-semibold ${style.text} uppercase tracking-wide`}>
                {style.label}
              </span>
            </div>

            <div className="p-6 flex flex-col items-center text-center">
              <img
                src={friend.picture}
                alt={friend.name}
                className="w-24 h-24 rounded-full object-cover border-3 border-border mb-4"
              />
              <h2 className="text-xl font-bold text-text-dark">{friend.name}</h2>

              {/* Tags */}
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {friend.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-blue-50 text-secondary px-3 py-1 rounded-full font-medium">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Bio */}
              <p className="text-text-muted text-sm mt-4 leading-relaxed">{friend.bio}</p>

              {/* Email */}
              <a href={`mailto:${friend.email}`} className="text-secondary text-sm mt-3 hover:underline">
                {friend.email}
              </a>
            </div>

            {/* Action Buttons */}
            <div className="border-t border-border p-4 space-y-2">
              <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-yellow-50 text-yellow-700 hover:bg-yellow-100 transition text-sm font-medium">
                <HiClock className="text-lg" />
                Snooze 2 Weeks
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition text-sm font-medium">
                <HiArchive className="text-lg" />
                Archive
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition text-sm font-medium">
                <HiTrash className="text-lg" />
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-card rounded-xl shadow-sm border border-border p-5 text-center">
              <p className="text-text-muted text-sm mb-1">Days Since Contact</p>
              <p className="text-3xl font-bold text-text-dark">{friend.days_since_contact}</p>
            </div>
            <div className="bg-card rounded-xl shadow-sm border border-border p-5 text-center">
              <p className="text-text-muted text-sm mb-1">Goal (days)</p>
              <p className="text-3xl font-bold text-text-dark">{friend.goal}</p>
            </div>
            <div className="bg-card rounded-xl shadow-sm border border-border p-5 text-center">
              <p className="text-text-muted text-sm mb-1">Next Due Date</p>
              <p className="text-lg font-bold text-text-dark">{friend.next_due_date}</p>
            </div>
          </div>

          {/* Relationship Goal Card */}
          <div className="bg-card rounded-xl shadow-sm border border-border p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-text-dark">Relationship Goal</h3>
              <button className="flex items-center gap-1 text-secondary hover:text-secondary/80 text-sm font-medium transition">
                <HiPencil />
                Edit
              </button>
            </div>
            <p className="text-text-muted text-sm">
              Stay in touch every <span className="font-bold text-text-dark">{friend.goal} days</span>
            </p>
            <div className="mt-3 bg-bg rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  friend.days_since_contact > friend.goal
                    ? 'bg-overdue-text'
                    : friend.days_since_contact > friend.goal * 0.7
                    ? 'bg-almost-due-text'
                    : 'bg-on-track-text'
                }`}
                style={{ width: `${Math.min((friend.days_since_contact / friend.goal) * 100, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-text-muted mt-2">
              {friend.days_since_contact} / {friend.goal} days elapsed
            </p>
          </div>

          {/* Quick Check-In Card */}
          <div className="bg-card rounded-xl shadow-sm border border-border p-6">
            <h3 className="text-lg font-semibold text-text-dark mb-4">Quick Check-In</h3>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => handleCheckIn('call')}
                className="flex flex-col items-center gap-2 py-4 rounded-xl bg-green-50 hover:bg-green-100 transition border border-green-200"
              >
                <img src={callIcon} alt="Call" className="w-8 h-8" />
                <span className="text-sm font-medium text-green-700">Call</span>
              </button>
              <button
                onClick={() => handleCheckIn('text')}
                className="flex flex-col items-center gap-2 py-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition border border-blue-200"
              >
                <img src={textIcon} alt="Text" className="w-8 h-8" />
                <span className="text-sm font-medium text-blue-700">Text</span>
              </button>
              <button
                onClick={() => handleCheckIn('video')}
                className="flex flex-col items-center gap-2 py-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition border border-purple-200"
              >
                <img src={videoIcon} alt="Video" className="w-8 h-8" />
                <span className="text-sm font-medium text-purple-700">Video</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
