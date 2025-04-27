import { FiPaperclip, FiX } from "react-icons/fi";

export const MessageDetailModal = ({ message, onClose, theme, onDelete, onReply }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className={`rounded-lg p-6 w-full max-w-2xl ${theme === 'dark' ? 'bg-indigo-900' : 'bg-white'}`}>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>
                Message from {message.senders?.username || 'Customer'}
              </h2>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Regarding: {message.services?.title || 'Unknown Service'}
              </p>
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                {new Date(message.created_at).toLocaleString()}
              </p>
            </div>
            <button 
              onClick={onClose}
              className={`p-1 rounded-full ${theme === 'dark' ? 'hover:bg-indigo-800' : 'hover:bg-gray-200'}`}
            >
              <FiX className={theme === 'dark' ? 'text-white' : 'text-gray-600'} />
            </button>
          </div>
          
          <div className={`p-4 rounded-lg mb-4 ${theme === 'dark' ? 'bg-indigo-800' : 'bg-gray-100'}`}>
            <p className={theme === 'dark' ? 'text-white' : 'text-gray-800'}>
              {message.content}
            </p>
          </div>
          
          {message.attachments && message.attachments.length > 0 && (
            <div className="mb-4">
              <h4 className={`font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>
                Attachments ({message.attachments.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {message.attachments.map((attachment, index) => (
                  <div 
                    key={index} 
                    className={`p-2 rounded flex items-center ${theme === 'dark' ? 'bg-indigo-800' : 'bg-gray-100'}`}
                  >
                    <FiPaperclip className="mr-2" />
                    <a 
                      href={attachment} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`text-sm truncate ${theme === 'dark' ? 'text-sky-300 hover:text-sky-200' : 'text-indigo-600 hover:text-indigo-800'}`}
                    >
                      {attachment.split('/').pop()}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => {
                onDelete(message.id);
                onClose();
              }}
              className={`px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-red-100 hover:bg-red-200 text-red-800'}`}
            >
              Delete
            </button>
            <button
              onClick={() => onReply(message)}
              className={`px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
            >
              Reply
            </button>
          </div>
        </div>
      </div>
    )
  }