import { NavLink } from 'react-router-dom'
import { HiHome, HiClock, HiChartPie, HiMenu, HiX } from 'react-icons/hi'
import { useState } from 'react'
import logo from '../assets/logo.png'

const navLinks = [
  { to: '/', label: 'Home', icon: <HiHome className="text-lg" /> },
  { to: '/timeline', label: 'Timeline', icon: <HiClock className="text-lg" /> },
  { to: '/stats', label: 'Stats', icon: <HiChartPie className="text-lg" /> },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="bg-primary text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2">
            <img src={logo} alt="KeenKeeper Logo" className="h-9 w-9" />
            <span className="text-xl font-bold tracking-tight">KeenKeeper</span>
          </NavLink>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-white/20 text-white shadow-inner'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                {link.icon}
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition"
          >
            {mobileOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                {link.icon}
                {link.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
