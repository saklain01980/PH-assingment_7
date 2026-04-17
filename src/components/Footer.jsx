import { FaYoutube, FaFacebookF, FaXTwitter } from 'react-icons/fa6'

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Brand Section - Centered */}
        <div className="flex flex-col items-center text-center mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight mb-3">KeenKeeper</h2>
          <p className="text-white/60 text-sm max-w-lg leading-relaxed">
            Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-center mb-10">
          <h3 className="font-semibold text-sm mb-4">Social Links</h3>
          <div className="flex gap-3">
            <a href="#" className="w-9 h-9 bg-white rounded-full flex items-center justify-center hover:bg-white/90 transition">
              <FaYoutube className="text-primary text-lg" />
            </a>
            <a href="#" className="w-9 h-9 bg-white rounded-full flex items-center justify-center hover:bg-white/90 transition">
              <FaFacebookF className="text-primary text-sm" />
            </a>
            <a href="#" className="w-9 h-9 bg-white rounded-full flex items-center justify-center hover:bg-white/90 transition">
              <FaXTwitter className="text-primary text-sm" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/15 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-xs">
            &copy; {new Date().getFullYear()} KeenKeeper. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/50 hover:text-white/80 text-xs transition">Privacy Policy</a>
            <a href="#" className="text-white/50 hover:text-white/80 text-xs transition">Terms of Service</a>
            <a href="#" className="text-white/50 hover:text-white/80 text-xs transition">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
