 
 import {  NavLink } from "react-router"

 import logo from '../assets/logo.png'
 
const Header = () => {
  return (
    <header className="bg-white shadow">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="flex items-center">
              <img 
                src={logo} 
                alt="Fariid Logo" 
                className="h-40 w-auto hover:opacity-90 transition-opacity" 
              />
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden sm:ml-6 sm:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) => 
                `px-3 py-2 rounded-md text-md  font-bold transition-colors ${
                  isActive 
                    ? 'text-orange-500 bg-orange-50 ' 
                    : ' text-indigo-900 hover:text-sky-200 hover:bg-orange-50'
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/services"
              className={({ isActive }) => 
                `px-3 py-2 rounded-md text-md  font-bold transition-colors ${
                  isActive 
                    ? 'text-orange-500 bg-orange-50 ' 
                    : ' text-indigo-900 hover:text-sky-200 hover:bg-orange-50'
                }`
              }
            >
              Services
            </NavLink>

            <NavLink
              to="/categories"
              className={({ isActive }) => 
                `px-3 py-2 rounded-md text-md  font-bold transition-colors ${
                  isActive 
                    ? 'text-orange-500 bg-orange-50 ' 
                    : ' text-indigo-900 hover:text-sky-200 hover:bg-orange-50'
                }`
              }
            >
              Categories
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) => 
                `px-3 py-2 rounded-md text-md  font-bold transition-colors ${
                  isActive 
                    ? 'text-orange-500 bg-orange-50 ' 
                    : ' text-indigo-900 hover:text-sky-200 hover:bg-orange-50'
                }`
              }
            >
              Contact
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) => 
                `px-3 py-2 rounded-md text-md  font-bold transition-colors ${
                  isActive 
                    ? 'text-orange-500 bg-orange-50 ' 
                    : ' text-indigo-900 hover:text-sky-200 hover:bg-orange-50'
                }`
              }
            >
              About
            </NavLink>

            <div className="flex space-x-4 ml-4">
              <NavLink
                to="/signin"
                className="px-4 py-2 text-md font-medium rounded-md transition-colors
                text-indigo-900 border-2 border-indigo-900 hover:bg-indigo-900 hover:text-white"
              >
                Sign In
              </NavLink>
              <NavLink
                to={'/signup'}
                className="px-4 py-2 text-md font-medium rounded-md transition-colors
                text-white bg-orange-600 hover:bg-orange-700"
              >
                Sign Up
              </NavLink>
            </div>
          </nav>
        </div>
      </div>
    </header>

  )
}

export default Header