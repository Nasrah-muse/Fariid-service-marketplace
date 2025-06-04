import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useNavigate } from "react-router";
import { signUp } from "../lib/auth";
import { FiEye, FiEyeOff } from "react-icons/fi";

 
const SignUpPage = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
     if (!role) {
      setError("Please select a role");
      return;
    }

    // check password
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    // password al least 8 characters
     const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError("Password must be at least 8 characters with letters and numbers");
      return;
    }

    setIsLoading(true);
    try {
      await signUp(email, password, username, role);
      setSuccess(true);
       setTimeout(() => navigate('/signin'), 2000);
    } catch (err) {
      setError(err.message || "Sign up failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if(success){
    return (
      <div className={`mb-4 p-3 rounded-md ${
        theme === 'dark' ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-700'
      }`}>
        Account created successfully! Redirecting to sign in...
      </div>
    )
  }


  return (
    <div className={`min-h-screen flex items-center justify-center p-4 mt-20 ${theme === 'dark' 
      ? 'bg-indigo-200 text-sky-200': 'bg-gray-200 text-indigo-900'}`}>
              <div className={`max-w-md w-full p-6 rounded-lg ${theme === 'dark' ? 'bg-indigo-800 shadow-lg': 'bg-white shadow-md'
}`}>
  
  <h2 className={`text-2xl font-bold mb-6 text-center ${theme === 'dark' ? 'text-sky-200' : 'text-indigo-900'}`}>
          Create an account
        </h2>
        {/*  error message */}
        {error && (
          <div className={`mb-4 p-3 rounded-md ${
            theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-700'
          }`}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}  className="space-y-4">
          <div>
            <label htmlFor="username" className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-sky-200' : 'text-gray-700'}`}>
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="johndoe"
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${theme === 'dark'? 'bg-indigo-700 border-indigo-600 text-sky-200 placeholder-indigo-400 focus:ring-sky-200 focus:border-sky-200': 'bg-white border-gray-300 text-indigo-900 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500'}`}
              required
            />
          </div>

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

          <div className="relative">
            <label htmlFor="password" className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-sky-200' : 'text-gray-700'}`}>
              Password
            </label>
              <div className="relative">
            <input
               type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="•••••••"
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${theme === 'dark'
    ? 'bg-indigo-700 border-indigo-600 text-sky-200 placeholder-indigo-400 focus:ring-sky-200 focus:border-sky-200'
    : 'bg-white border-gray-300 text-indigo-900 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500'}`}
              required
            />
                <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
    >
      {showPassword ? (
        <FiEyeOff className={`h-5 w-5 ${theme === 'dark' ? 'text-indigo-300' : 'text-gray-500'}`} />
      ) : (
        <FiEye className={`h-5 w-5 ${theme === 'dark' ? 'text-indigo-300' : 'text-gray-500'}`} />
      )}
    </button>
          </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-sky-200' : 'text-gray-700'}`}>
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="•••••••"
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${theme === 'dark'
    ? 'bg-indigo-700 border-indigo-600 text-sky-200 placeholder-indigo-400 focus:ring-sky-200 focus:border-sky-200'
    : 'bg-white border-gray-300 text-indigo-900 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500'}`}
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-sky-200' : 'text-gray-700'}`}>
              Role
            </label>
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2  sm:space-y-0">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="customer"
                  name="role"
                  value="customer"
                  checked={role === 'customer'}
                  onChange={() => setRole('customer')}
                  className={`h-4 w-4 ${theme === 'dark' ? 'text-orange-500 focus:ring-orange-500 border-indigo-600' : 'text-indigo-600 focus:ring-indigo-500 border-gray-300'}`}
                />
                <label htmlFor="customer" className={`ml-2 block text-sm ${theme === 'dark' ? 'text-sky-200' : 'text-gray-700'}`}>
                  Customer
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="provider"
                  name="role"
                  value="provider"
                  checked={role === 'provider'}
                  onChange={() => setRole('provider')}
                  className={`h-4 w-4 ${theme === 'dark' ? 'text-orange-500 focus:ring-orange-500 border-indigo-600' : 'text-indigo-600 focus:ring-indigo-500 border-gray-300'}`}
                />
                <label htmlFor="provider" className={`ml-2 block text-sm ${theme === 'dark' ? 'text-sky-200' : 'text-gray-700'}`}>
                  Service Provider
                </label>
              </div>
            </div>
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
          Already have an account?{' '}
          <button 
            onClick={() => navigate('/signin')} 
            className={`font-medium ${theme === 'dark' ? 'text-orange-400 hover:text-orange-300' : 'text-indigo-600 hover:text-indigo-500'}`}
          >
            Sign in
          </button>
        </div>

</div>

    </div>
  )
}

export default SignUpPage