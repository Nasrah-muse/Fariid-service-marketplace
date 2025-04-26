import { FiX } from "react-icons/fi"

const MessageModal = ({ 
  provider, 
  service, 
  theme, 
  onClose,
  currentUser 
}) => {
 
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
</div>
</div>
  )
}

export default MessageModal