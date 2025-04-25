import { useTheme } from "../contexts/ThemeContext";

 
const AboutPage = () => {
  const { theme } = useTheme()
 
  return (
    <div className={`min-h-screen mt-12 ${theme === 'dark' ? 'bg-indigo-900 text-white' : 'bg-gray-50 text-indigo-900'}`}>
      <div className={`max-w-full h-96  px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-r ${theme === 'dark'? "from-sky-400 to-orange-600" :"from-indigo-600 to-sky-200"  } `}>
         <div className="text-center mb-16">
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>
            About Us
          </h1>
        </div>
        </div>
    </div>
  )
}

export default AboutPage