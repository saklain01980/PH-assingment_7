import { useNavigate } from 'react-router-dom'
import { HiHome, HiExclamation } from 'react-icons/hi'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
        <HiExclamation className="text-4xl text-red-500" />
      </div>
      <h1 className="text-6xl font-bold text-text-dark mb-2">404</h1>
      <h2 className="text-xl font-semibold text-text-dark mb-3">Page Not Found</h2>
      <p className="text-text-muted max-w-md mb-6">
        Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
      </p>
      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-primary-light transition shadow-lg"
      >
        <HiHome className="text-lg" />
        Back to Home
      </button>
    </div>
  )
}
