import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { TimelineProvider } from './context/TimelineContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import FriendDetails from './pages/FriendDetails'
import Timeline from './pages/Timeline'
import Stats from './pages/Stats'
import NotFound from './pages/NotFound'

function App() {
  return (
    <TimelineProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/friend/:id" element={<FriendDetails />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="bottom-right" />
      </div>
    </TimelineProvider>
  )
}

export default App
