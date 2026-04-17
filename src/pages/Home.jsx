import { useState, useEffect } from 'react'
import Banner from '../components/Banner'
import FriendCard from '../components/FriendCard'
import LoadingSpinner from '../components/LoadingSpinner'
import friendsData from '../data/friends.json'

export default function Home() {
  const [friends, setFriends] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching data
    const timer = setTimeout(() => {
      setFriends(friendsData)
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      <Banner />

      {/* Friends Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-text-dark">Your Friends</h2>
          <span className="text-text-muted text-sm">{friends.length} friends</span>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {friends.map((friend) => (
              <FriendCard key={friend.id} friend={friend} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
