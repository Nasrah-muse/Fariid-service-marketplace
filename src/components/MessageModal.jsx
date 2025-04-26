import { FiX } from "react-icons/fi"
import { useNavigate } from "react-router"

const MessageModal = ({ 
  provider, 
  service, 
  theme, 
  onClose,
  currentUser 
}) => {
    const navigate = useNavigate()
 
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`rounded-lg p-6 w-full max-w-md ${theme === 'dark' ? 'bg-indigo-900' : 'bg-white'}`}>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>
              Message {provider?.username || 'Provider'}
            </h2>
            <span className={`text-sm ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
              • Online
            </span>
          </div>
          <button 
            onClick={onClose}
            className={`p-1 rounded-full ${theme === 'dark' ? 'hover:bg-indigo-800' : 'hover:bg-gray-200'}`}
          >
            <FiX className={theme === 'dark' ? 'text-white' : 'text-gray-600'} />
          </button>
 </div>
 {!currentUser ? (
          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-indigo-800' : 'bg-gray-100'}`}>
            <p className={`mb-4 ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>
              Please sign in to contact this provider
            </p>
            <button
              onClick={() => navigate("/signin")}
              className={`w-full py-2 rounded-lg ${theme === 'dark' ? 'bg-orange-600 text-white' : 'bg-indigo-900 text-white'}`}
            >
              Sign In
            </button>
          </div>
        ) : currentUser.role !== "customer" ? (
          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-indigo-800' : 'bg-gray-100'}`}>
            <p className={`mb-4 ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>
              You need a customer account to contact providers
            </p>
            <button
              onClick={() => navigate("/signup")}
              className={`w-full py-2 rounded-lg ${theme === 'dark' ? 'bg-orange-600 text-white' : 'bg-indigo-900 text-white'}`}
            >
              Sign Up as Customer
            </button>
          </div>
        ) : (
            <o>No messages yet</o>
        )}
</div>
</div>
  )
}

export default MessageModal