 
 import {  NavLink } from "react-router"
import logoDark from '../assets/dark-logo.png'
import logoLight from '../assets/light-logo.png'
import { CiMenuBurger } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../contexts/ThemeContext";
 
const Header = () => {

  const {theme} = useTheme()
  const getNavLinkClass = (isActive) => 
    `px-3 py-2 rounded-md text-md font-bold transition-colors ${
      isActive
        ? 'text-orange-500 bg-orange-50 dark:bg-opacity-20 dark:bg-orange-500 dark:text-sky-200'
        : theme === 'dark'
          ? 'text-sky-200 hover:text-orange-500 hover:bg-opacity-10 hover:bg-orange-300'
          : 'text-indigo-900 hover:text-sky-200 hover:bg-orange-50'
    }`

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const avatar_url = null;


  return (
    <header className={`shadow-md ${theme === 'dark'? 'bg-indigo-900': 'bg-white'} `}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="flex items-center">
              <img 
                src={theme === 'dark' ? logoDark : logoLight} 
                alt="Fariid Logo" 
                className="h-40 w-auto hover:opacity-90 transition-opacity" 
              />
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden sm:ml-6 sm:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) => getNavLinkClass(isActive) }
            >
              Home
            </NavLink>

            <NavLink
              to="/services"
              className={({ isActive }) => getNavLinkClass(isActive)}
            >
              Services
            </NavLink>

            <NavLink
              to="/categories"
              className={({ isActive }) => getNavLinkClass(isActive)}
            >
              Categories
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) => getNavLinkClass(isActive)}
            >
              Contact
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) => getNavLinkClass(isActive)}
            >
              About
            </NavLink>


            <div className="flex space-x-4 ml-4">
            <ThemeToggle/>

              <NavLink
                to="/signin"
                className={`px-4 py-2 text-md font-medium rounded-md transition-colors cursor-pointer
                  ${theme === 'dark'? 'border-2 border-sky-200 text-sky-200 hover:bg-sky-200 hover:text-indigo-900':
                "text-indigo-900 border-2 border-indigo-900 hover:bg-indigo-900 hover:text-white" }`}
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

               {/* Mobile menu*/}
               <div className="sm:hidden flex items-center gap-4">
               <ThemeToggle className="ml-2" />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md hover:text-orange-500  ${
                theme === 'dark' ? "text-sky-200 " : "text-indigo-900"
              } focus:outline-none`}
              
              aria-expanded={isMobileMenuOpen}
            >
               {isMobileMenuOpen ? (
                <IoClose className="block w-6 h-6 " />
              ) : (
                <CiMenuBurger className="block w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`sm:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} `}>
          <div className="pt-2 pb-3 space-y-1 bg-white shadow-lg">
            <NavLink
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => 
                `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive 
                    ? 'border-orange-500 text-orange-500 bg-orange-50' 
                    : 'border-transparent text-indigo-900 hover:text-orange-500 hover:bg-orange-50'
                }`
              }
            >
              Home
            </NavLink>
            
            <NavLink
              to="/services"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => 
                `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive 
                    ? 'border-orange-500 text-orange-500 bg-orange-50' 
                    : 'border-transparent text-indigo-900 hover:text-orange-500 hover:bg-orange-50'
                }`
              }
            >
              Services
            </NavLink>
            
            <NavLink
              to="/categories"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => 
                `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive 
                    ? 'border-orange-500 text-orange-500 bg-orange-50' 
                    : 'border-transparent text-indigo-900 hover:text-orange-500 hover:bg-orange-50'
                }`
              }
            >
              Categories
            </NavLink>
            
            <NavLink
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => 
                `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive 
                    ? 'border-orange-500 text-orange-500 bg-orange-50' 
                    : 'border-transparent text-indigo-900 hover:text-orange-500 hover:bg-orange-50'
                }`
              }
            >
              Contact
            </NavLink>
            
            <NavLink
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => 
                `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive 
                    ? 'border-orange-500 text-orange-500 bg-orange-50' 
                    : 'border-transparent text-indigo-900 hover:text-orange-500 hover:bg-orange-50'
                }`
              }
            >
              About
            </NavLink>
            
            <div className="pt-2 px-3 space-y-2">
              <NavLink
                to="/signin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center px-4 py-2 text-md font-medium rounded-md transition-colors
                text-indigo-900 border-2 border-indigo-900 hover:bg-indigo-900 hover:text-white"
              >
                Sign In
              </NavLink>
              <NavLink
                to="/signup"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center px-4 py-2 text-md font-medium rounded-md transition-colors
                text-white bg-orange-600 hover:bg-orange-700"
              >
                Sign Up
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </header>

  )
}

export default Header