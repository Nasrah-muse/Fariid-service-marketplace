import { useState } from "react"
import { FiPaperclip, FiSend, FiX } from "react-icons/fi"
import { useNavigate } from "react-router"

const MessageModal = ({ 
  provider, 
  service, 
  theme, 
  onClose,
  currentUser 
}) => {
    const navigate = useNavigate()
    const [message, setMessage] = useState("")
    const [isSending, setIsSending] = useState(false)
 
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
            <>
            <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Ask {provider?.username || 'the provider'} a question or share what you need
            </p>
            
            <div className="space-y-2 mb-4">
              <div 
                className={`p-3 rounded-lg cursor-pointer ${theme === 'dark' ? 'bg-indigo-800 hover:bg-indigo-700' : 'bg-gray-100 hover:bg-gray-200'}`}
                onClick={() => setMessage(`Hey ${provider?.username || 'there'}, can you help...`)}
              >
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>Hey {provider?.username || 'there'}, can you help...</p>
              </div>
              <div 
                className={`p-3 rounded-lg cursor-pointer ${theme === 'dark' ? 'bg-indigo-800 hover:bg-indigo-700' : 'bg-gray-100 hover:bg-gray-200'}`}
                onClick={() => setMessage("Can you send me some work examples?")}
              >
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>Can you send me some work examples?</p>
              </div>
              <div 
                className={`p-3 rounded-lg cursor-pointer ${theme === 'dark' ? 'bg-indigo-800 hover:bg-indigo-700' : 'bg-gray-100 hover:bg-gray-200'}`}
                onClick={() => setMessage("Do you have any experience with...?")}
              >
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>Do you have any experience with...?</p>
              </div>
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              className={`w-full p-3 rounded-lg mb-3 ${theme === 'dark' ? 'bg-indigo-800 text-white placeholder-gray-400' : 'bg-gray-100 text-gray-800 placeholder-gray-500'}`}
              rows={4}
            />
            
            <div className="flex items-center justify-between">
              <label className={`cursor-pointer p-2 rounded-full ${theme === 'dark' ? 'hover:bg-indigo-800' : 'hover:bg-gray-200'}`}>
                <FiPaperclip className={theme === 'dark' ? 'text-white' : 'text-indigo-900'} />
                <input 
                  type="file" 
                   className="hidden"
                  multiple
                  accept="image/*,.pdf,.doc,.docx"
                />
              </label>
              
              <button
                 disabled={!message.trim() || isSending}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${!message.trim() || isSending ? 'bg-gray-400' : theme === 'dark' ? 'bg-orange-600 hover:bg-orange-700' : 'bg-indigo-900 hover:bg-indigo-800'} text-white`}
              >
                {isSending ? 'Sending...' : (
                  <>
                    <span>Send</span>
                    <FiSend />
                  </>
                )}
              </button>
            </div>
          </>

        )}
</div>
</div>
  )
}

export default MessageModal