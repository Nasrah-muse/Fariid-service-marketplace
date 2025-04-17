import { useState , useEffect} from 'react';
import { useTheme } from '../contexts/ThemeContext';
import bg1 from '../assets/bg1.jpg'
import bg2 from '../assets/bg2.jpg'
import bg3 from '../assets/bg3.jpg'
import bg4 from '../assets/bg4.jpg'
import bg5 from '../assets/bg5.jpg'

import author1 from '../assets/author1.jpg'
import author2 from '../assets/author2.jpg'
import author3 from '../assets/author3.jpg'

const HomePage = () => {
  const { theme } = useTheme()

   const [currentBgIndex, setCurrentBgIndex] = useState(0);
  
   const backgrounds = [bg1, bg2, bg3, bg4, bg5];

   useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div  className="relative py-12 px-4 sm:px-6 lg:px-8 text-center min-h-screen flex items-center justify-center"
    style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgrounds[currentBgIndex]})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      transition: 'background-image 1s ease-in-out'
    }}
>
<div className={`relative max-w-4xl mx-auto z-10 text-white`}>
        <h1 className="text-4xl font-bold mb-4 text-sky-200">
          Find Trusted <span className='text-orange-600'> Service Providers</span> in Galkayo!
        </h1>
        <p className="text-xl mb-8">
          Easily connect with professional service providers for home repairs, tutoring, beauty services, and more. Safe, fast, and hassle-free!
        </p>
        <div className={`rounded-lg shadow-md p-6 ${theme === 'dark' ? 'bg-indigo-900 bg-opacity-90' : 'bg-white bg-opacity-90'}`}>
          <div className="flex mb-4">
            <input
              type="text"
              className={`flex-grow px-4 py-3 border ${theme === 'dark' ? 'border-indigo-600 bg-indigo-800 text-white' : 'text-blue-500 border-gray-300'} rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
              placeholder="What service are you looking for today?"
            />
            <button className={`px-6 py-3 cursor-pointer ${theme === 'dark' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-500 hover:bg-blue-600'} text-white font-medium rounded-r-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2`}>
              Search
            </button>
          </div>
          
          <div className={`flex flex-wrap items-center justify-center gap-2 ${theme === 'dark' ? 'text-sky-200' : 'text-gray-600'}`}>
            <span>Popular search: </span>
            <button className={`px-3 py-1 ${theme === 'dark' ? 'bg-indigo-700 hover:bg-indigo-600' : 'bg-gray-100 hover:bg-gray-200'} rounded-full transition duration-200`}>
              Plumber
            </button>
            <button className={`px-3 py-1 ${theme === 'dark' ? 'bg-indigo-700 hover:bg-indigo-600' : 'bg-gray-100 hover:bg-gray-200'} rounded-full transition duration-200`}>
              Electrician
            </button>
          </div>
        </div>
       
      </div>


    </div>
  )
}

export default HomePage