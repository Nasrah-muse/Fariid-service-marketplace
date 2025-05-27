 import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
 import logoDark from '../assets/dark-logo.png'
 import logoLight from '../assets/light-logo.png'
import { useTheme } from '../contexts/ThemeContext'
import { Link } from 'react-router'
 const Footer = () => {

  const {theme} = useTheme()
  return (
    <footer className={ `${theme === 'dark'? "bg-indigo-900" : "bg-indigo-50"} py-8 px-4`}>
       <div className="max-w-6xl mx-auto">
         {/* Logo and text */}
         <div className="flex flex-col items-center mb-8">
          <img 
            src={theme === 'dark' ? logoDark : logoLight} 
            alt="Farild Logo" 
            className="h-30  object-contain"
          />
          <p className={`text-center ${theme === 'dark'? 'text-sky-200' : ' text-indigo-900'} max-w-md`}>
            Fariid connects customers with trusted service providers in Galkayo, making it easy to find, book, and pay for reliable services—all in one place.
          </p>
          
          {/* Social Icons */}
           <div className="flex gap-3 mt-4">
            <Link to="/" className="bg-gray-100 p-2 rounded-full hover:bg-orange-100 transition-colors">
              <FaFacebook className="text-indigo-900 hover:text-orange-500" />
            </Link>
            <Link to="/" className="bg-gray-100 p-2 rounded-full hover:bg-orange-100 transition-colors">
              <FaTwitter className="text-indigo-900 hover:text-orange-500" />
            </Link>
            <Link to="/" className="bg-gray-100 p-2 rounded-full hover:bg-orange-100 transition-colors">
              <FaInstagram className="text-indigo-900 hover:text-orange-500" />
            </Link>
            <Link to="/" className="bg-gray-100 p-2 rounded-full hover:bg-orange-100 transition-colors">
              <FaLinkedin className="text-indigo-900 hover:text-orange-500" />
            </Link>
          </div>
        </div>
        
         <div className="border-t border-orange-400 my-6"></div>

        {/* Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-sky-200' : 'text-indigo-900'}`}>Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className={`${theme === 'dark' ? 'text-sky-200' : 'text-indigo-900'} hover:text-orange-500`}>Home</Link></li>
              <li><Link to="/services" className={`${theme === 'dark' ? 'text-sky-200' : 'text-indigo-900'} hover:text-orange-500`}>Services</Link></li>
              <li><Link to="/employers" className={`${theme === 'dark' ? 'text-sky-200' : 'text-indigo-900'} hover:text-orange-500`}>Employers</Link></li>
              <li><Link to="/about" className={`${theme === 'dark' ? 'text-sky-200' : 'text-indigo-900'} hover:text-orange-500`}>About us</Link></li>
              <li><Link to="/testimonials" className={`${theme === 'dark' ? 'text-sky-200' : 'text-indigo-900'} hover:text-orange-500`}>Testimonials</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="text-center sm:text-left">
            <h3 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-sky-200' : 'text-indigo-900'}`}>Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className={`${theme === 'dark' ? 'text-sky-200' : 'text-indigo-900'} hover:text-orange-500`}>FAQ</Link></li>
              <li><Link to="/pricing" className={`${theme === 'dark' ? 'text-sky-200' : 'text-indigo-900'} hover:text-orange-500`}>Pricing</Link></li>
              <li><Link to="/payment" className={`${theme === 'dark' ? 'text-sky-200' : 'text-indigo-900'} hover:text-orange-500`}>Payment method</Link></li>
              <li><Link to="/careers" className={`${theme === 'dark' ? 'text-sky-200' : 'text-indigo-900'} hover:text-orange-500`}>Careers</Link></li>
              <li><Link to="/contact" className={`${theme === 'dark' ? 'text-sky-200' : 'text-indigo-900'} hover:text-orange-500`}>Contact Us</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="text-center sm:text-left">
            <h3 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-sky-200' : 'text-indigo-900'}`}>Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/terms" className={`${theme === 'dark' ? 'text-sky-200' : 'text-indigo-900'} hover:text-orange-500`}>Terms of service</Link></li>
              <li><Link to="/privacy" className={`${theme === 'dark' ? 'text-sky-200' : 'text-indigo-900'} hover:text-orange-500`}>Privacy policy</Link></li>
              <li><Link to="/copyright" className={`${theme === 'dark' ? 'text-sky-200' : 'text-indigo-900'} hover:text-orange-500`}>Copy Right Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-orange-400 my-6"></div>

        {/* Copyright */}
        <div className="text-center text-sm text-indigo-900">
          ©2025 Fariid All right reserved
        </div>


          
      </div>
       </footer>
  )
}

export default Footer