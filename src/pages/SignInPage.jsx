import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { signIn } from "../lib/auth";

 
const SignInPage = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
 

  const userInfo = useAuth()
console.log(userInfo)

  const [email, setEmail] = useState('')
  // const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  // const [success, setSuccess] = useState(false);


  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    setError(null)
    
    try {
      await signIn(email, password);
       // go to home
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${theme === 'dark' ? 'bg-indigo-200 text-sky-200': 'bg-gray-200 text-indigo-900'}`}>

<div className={`max-w-md w-full p-6 rounded-lg ${theme === 'dark' ? 'bg-indigo-800 shadow-lg': 'bg-white shadow-md'
}`}>
  
  <h2 className={`text-2xl font-bold mb-6 text-center ${theme === 'dark' ? 'text-sky-200' : 'text-indigo-900'}`}>
          Welcome Back!
        </h2>
        {/*  error msg */}
        {error && (
          <div className={`mb-4 p-3 rounded-md ${
            theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-700'
          }`}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}  className="space-y-4">
          <div>
            <label htmlFor="email" className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-sky-200' : 'text-gray-700'}`}>
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${theme === 'dark'? 'bg-indigo-700 border-indigo-600 text-sky-200 placeholder-indigo-400 focus:ring-sky-200 focus:border-sky-200': 'bg-white border-gray-300 text-indigo-900 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500'}`}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-sky-200' : 'text-gray-700'}`}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="•••••••"
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${theme === 'dark'
    ? 'bg-indigo-700 border-indigo-600 text-sky-200 placeholder-indigo-400 focus:ring-sky-200 focus:border-sky-200'
    : 'bg-white border-gray-300 text-indigo-900 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500'}`}
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${theme === 'dark'
              ? 'bg-orange-600 hover:bg-orange-700 focus:ring-orange-500': 'bg-indigo-900 hover:bg-indigo-700 focus:ring-indigo-500'} focus:outline-none focus:ring-2 focus:ring-offset-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>
        <div className={`mt-4 text-center text-sm ${theme === 'dark' ? 'text-indigo-300' : 'text-indigo-900'}`}>
          Don't have an account?{' '}
          <button 
            onClick={() => navigate('/signup')} 
            className={`font-medium ${theme === 'dark' ? 'text-orange-400 hover:text-orange-300' : 'text-indigo-600 hover:text-indigo-500'}`}
          >
            Sign Up
          </button>
        </div>

</div>

    </div>
  )
}

export default SignInPage