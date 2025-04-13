 import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
 import logoDark from '../assets/dark-logo.png'
 import logoLight from '../assets/light-logo.png'
import { useTheme } from '../contexts/ThemeContext'
 const Footer = () => {

  const {theme} = useTheme()
  return (
    <footer className="bg-white md:bg-indigo-50 py-8 px-4">
       <div className="max-w-6xl mx-auto">
         {/* Logo and text */}
         <div className="flex flex-col items-center mb-8">
          <img 
            src={theme === 'dark' ? logoDark : logoLight} 
            alt="Farild Logo" 
            className="h-30  object-contain"
          />
          <p className="text-center text-indigo-900 max-w-md">
            Fariid connects customers with trusted service providers in Galkayo, making it easy to find, book, and pay for reliable services—all in one place.
          </p>
          
          {/* Social Icons */}
          <div className="flex gap-3 mt-4">
            <a href="#" className="bg-gray-100 p-2 rounded-full hover:bg-orange-100 transition-colors">
              <FaFacebook className="text-indigo-900  hover:text-orange-500" />
            </a>
            <a href="#" className="bg-gray-100 p-2 rounded-full hover:bg-orange-100 transition-colors">
              <FaTwitter className="text-indigo-900 hover:text-orange-500" />
            </a>
            <a href="#" className="bg-gray-100 p-2 rounded-full hover:bg-orange-100 transition-colors">
              <FaInstagram className="text-indigo-900 hover:text-orange-500" />
            </a>
            <a href="#" className="bg-gray-100 p-2 rounded-full hover:bg-orange-100 transition-colors">
              <FaLinkedin className="text-indigo-900 hover:text-orange-500" />
            </a>
          </div>
        </div>
        
         <div className="border-t border-orange-400 my-6"></div>

        {/* Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-bold mb-4 text-indigo-900 ">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-indigo-900 hover:text-orange-500">Home</a></li>
              <li><a href="/services" className="text-indigo-900 hover:text-orange-500">Services</a></li>
              <li><a href="/employers" className="text-indigo-900 hover:text-orange-500">Employers</a></li>
              <li><a href="/about" className="text-indigo-900 hover:text-orange-500">About us</a></li>
              <li><a href="/testimonials" className="text-indigo-900 hover:text-orange-500">Testimonials</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-bold mb-4 text-indigo-900">Resources</h3>
            <ul className="space-y-2">
              <li><a href="/faq" className="  text-indigo-900 hover:text-orange-500">FAQ</a></li>
              <li><a href="/pricing" className="text-indigo-900 hover:text-orange-500">Pricing</a></li>
              <li><a href="/payment" className="text-indigo-900 hover:text-orange-500">Payment method</a></li>
              <li><a href="/careers" className="text-indigo-900 hover:text-orange-500">Careers</a></li>
              <li><a href="/contact" className="text-indigo-900 hover:text-orange-500">Contact Us</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-bold mb-4 text-indigo-900">Legal</h3>
            <ul className="space-y-2">
              <li><a href="/terms" className="text-indigo-900 hover:text-orange-500">Terms of service</a></li>
              <li><a href="/privacy" className="text-indigo-900 hover:text-orange-500">Privacy policy</a></li>
              <li><a href="/copyright" className="text-indigo-900 hover:text-orange-500">Copy Right Policy</a></li>
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