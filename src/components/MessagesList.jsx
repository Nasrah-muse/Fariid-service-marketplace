import { useState } from "react";
 
export const MessagesList = ({ theme, messages, loading, onDelete, onReply, userRole }) => {
    const [selectedMessage, setSelectedMessage] = useState(null);
  
    if (loading) {
      return (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
        </div>
      )
    }
  
     const filteredMessages = messages.filter((message) => {
      if (userRole === 'provider') {
        return !message.replied
      } else if (userRole === 'customer') {
        return message.replied
      }
      return true
    })
  
    if (!filteredMessages || filteredMessages.length === 0) {
      return (
        <div className={`p-6 rounded-lg text-center ${theme === 'dark' ? 'bg-indigo-700' : 'bg-gray-100'}`}>
          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
            You don't have any messages yet.
          </p>
        </div>
      );
    }
  
    return (
      <div className="space-y-4">
        {filteredMessages.map((message) => (
          <div 
            key={message.id} 
            className={`p-4 rounded-lg cursor-pointer ${theme === 'dark' ? 'bg-indigo-700 hover:bg-indigo-600' : 'bg-gray-100 hover:bg-gray-200'}`}
            onClick={() => setSelectedMessage(message)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>
                  {message.senders?.username || 'Unknown User'}
                </h4>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Regarding: {message.services?.title || 'Unknown Service'}
                </p>
              </div>
              <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {new Date(message.created_at).toLocaleString()}
              </span>
            </div>
            <p className={`mt-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
              {message.content.length > 100 
                ? `${message.content.substring(0, 100)}...` 
                : message.content}
            </p>
            
            {message.attachments && message.attachments.length > 0 && (
              <div className="mt-2">
                <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {message.attachments.length} attachment(s)
                </span>
              </div>
            )}
          </div>
        ))}
      
      </div>
    )
  }
  