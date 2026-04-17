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
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="bg-white">
      <Banner />

      {/* Friends Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-text-dark">Your Friends</h2>
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
