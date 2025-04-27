import { useState } from "react"
import toast from "react-hot-toast"
import { FiPaperclip, FiSend, FiX } from "react-icons/fi"
import { useNavigate } from "react-router"
import supabase from "../lib/supabase"

const MessageModal = ({ 
  provider, 
  service, 
  theme, 
  onClose,
  currentUser 
}) => {
    const navigate = useNavigate()
    const [message, setMessage] = useState("")
    const [attachments, setAttachments] = useState([]);
    const [isSending, setIsSending] = useState(false)

const handleSendMessage = async () => {
    if (!currentUser) {
      toast.error("You must be logged in to send messages");
      navigate("/signin")
      return
    }
    
    if (currentUser.role !== "customer") {
      toast.error("You must be a customer to contact providers");
      navigate("/signup")
      return
    }

    if (!message.trim()) return;
    
    setIsSending(true)
    try {
       const attachmentUrls = []
      for (const file of attachments) {
        const filePath = `messages/${Date.now()}-${file.name}`
        const { error: uploadError } = await supabase.storage
          .from('message-attachments')
          .upload(filePath, file)
        
        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('message-attachments')
          .getPublicUrl(filePath)
        
        attachmentUrls.push(publicUrl)
      }

      const { data, error } = await supabase
      .from('messages')
      .insert([{
        sender_id: currentUser.id,
        receiver_id: provider.id,
        service_id: service.id, 
        content: message,
        attachments: attachmentUrls,
        created_at: new Date().toISOString()
      }])
      .select()

    if (error) throw error;

     const messageWithSender = {
      ...data[0],
      senders: {
        username: currentUser.username || 'You'
      },
      services: {
        title: service.title || 'Unknown Service'
      }
    };

    toast.success('Message sent successfully!');
    onClose();
    setMessage("");
    setAttachments([]);
    
     return messageWithSender
    
  } catch (error) {
    console.error('Error sending message:', error)
    toast.error('Failed to send message')
  } finally {
    setIsSending(false);
  }
  }

  const handleFileUpload = (e) => {
    setAttachments([...attachments, ...Array.from(e.target.files)])
  }

  const removeAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index))
  }

    
 
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
                  onChange={handleFileUpload}
                   className="hidden"
                  multiple
                  accept="image/*,.pdf,.doc,.docx"
                />
              </label>
              
              <button
                onClick={handleSendMessage}
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
            {attachments.length > 0 && (
              <div className="mt-3">
                <p className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Attachments ({attachments.length}):
                </p>
                <div className="flex flex-wrap gap-2">
                  {attachments.map((file, index) => (
                    <div 
                      key={index}
                      className={`text-xs p-1 px-2 rounded flex items-center ${theme === 'dark' ? 'bg-indigo-800' : 'bg-gray-200'}`}
                    >
                      <span className="truncate max-w-xs">{file.name}</span>
                      <button 
                      onClick={() => removeAttachment(index)}
                         className="ml-2"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>

        )}
</div>
</div>
  )
}

export default MessageModal