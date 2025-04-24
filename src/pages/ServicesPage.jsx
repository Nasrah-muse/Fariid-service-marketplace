import { useTheme } from "../contexts/ThemeContext"

 
const ServicesPage = () => {
  const {theme} = useTheme()
  return (
    <div  className={`min-h-screen p-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
       
      </div>
  )
}

export default ServicesPage