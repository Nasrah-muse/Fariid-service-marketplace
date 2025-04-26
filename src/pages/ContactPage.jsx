import { useTheme } from '../contexts/ThemeContext';

const ContactPage = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-indigo-900 text-white' : 'bg-gray-50 text-indigo-900 '}`}>
       <div className={`relative  py-20 bg-gradient-to-r mt-20 ${theme === 'dark' ? 'from-indigo-900 to-indigo-600' : 'from-sky-400 to-orange-600'}`}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className={`text-4xl md:text-5xl font-bold  ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}    `}>
            Get Tech with Us
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${theme === 'dark' ? 'text-white' : 'text-indigo-800'}`}>
            Connect with our tech experts and take your business to the next level
          </p>
        </div>
      </div>


    </div>
  )
}

export default ContactPage