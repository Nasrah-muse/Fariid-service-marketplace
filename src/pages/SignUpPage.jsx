import { useTheme } from "../contexts/ThemeContext";

 
const SignUpPage = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${theme === 'dark' 
      ? 'bg-indigo-200 text-sky-200'
      : 'bg-gray-200 text-indigo-900'}`}>

    </div>
  )
}

export default SignUpPage