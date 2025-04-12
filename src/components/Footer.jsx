 import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import logo from '../assets/logo.png'
const Footer = () => {
  return (
    <footer className="bg-white md:bg-indigo-50 py-8 px-4">
       <div className="max-w-6xl mx-auto">
         {/* Logo and text */}
         <div className="flex flex-col items-center mb-8">
          <img 
            src={logo} 
            alt="Farild Logo" 
            className="h-30  object-contain"
          />
          <p className="text-center text-gray-700 max-w-md">
            Farild connects customers with trusted service providers in Galkayo, making it easy to find, book, and pay for reliable services—all in one place.
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

          
      </div>
       </footer>
  )
}

export default Footer