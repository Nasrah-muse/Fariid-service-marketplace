import { useTheme } from "../contexts/ThemeContext"

  
 const ProviderRegistration = () => {
  const {theme } = useTheme()
   return (
     <div className={`min-h-screen p-6 mt-16 ${theme === 'dark' ? 'bg-indigo-800 text-gray-100' : 'bg-sky-200 text-indigo-900'}`}>
       <div className={`max-w-4xl mx-auto p-6 rounded-lg ${theme === 'dark' ? 'bg-indigo-600 shadow-xl' : 'bg-white shadow-md'}`}>
            <h2 className={`text-2xl font-bold mb-6 text-center ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>
              Service Registration
        </h2>
       </div>
       </div>
   )
 }
 
 export default ProviderRegistration