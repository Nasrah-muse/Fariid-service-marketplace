import { useEffect, useState } from "react"
import { useTheme } from "../contexts/ThemeContext"
import { FiBarChart2, FiCalendar, FiMail, FiMenu, FiX } from "react-icons/fi"
import supabase from "../lib/supabase"
import { MessagesList } from "./MessagesList"
import toast from "react-hot-toast"
import { useAuth } from "../contexts/AuthContext"

    
const CustomerDashboard = () => {
  const { theme } = useTheme()
  const { user } = useAuth()
     const [sidebarOpen, setSidebarOpen] = useState(false)
     const [activeTab, setActiveTab] = useState('dashboard')
     const [messages, setMessages] = useState([]);
    const [messagesLoading, setMessagesLoading] = useState(false)   
  const [selectedMessage, setSelectedMessage] = useState(null)
   const [replyingTo, setReplyingTo] = useState(null)
  const [replyContent, setReplyContent] = useState('')




     const fetchMessages = async () => {
      if (!user?.id) {
        setMessagesLoading(false);
        return
      }
  
      try {
        setMessagesLoading(true)
        
         const { data: messages, error } = await supabase
          .from('messages')
          .select('*')
          .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
          .order('created_at', { ascending: false })
  
        if (error) throw error;
        if (!messages?.length) {
          console.log("Messages with service_id:", messages.map(m => m.service_id));

          setMessages([]);
          return;
        }
      
         const userIds = [...new Set([
          ...messages.map(m => m.sender_id),
          ...messages.map(m => m.receiver_id)
        ])]
        
        const serviceIds = messages
          .map(m => m.service_id)
          .filter(Boolean);
          console.log("Service IDs being fetched:", serviceIds)

          
         const servicesPromise = serviceIds.length
          ? supabase.from('services').select('id, title').in('id', serviceIds)
          : Promise.resolve({ data: [] });

 
         const [
          { data: users },
          { data: services }
        ] = await Promise.all([
          supabase.from('users').select('id, username, avatar_url').in('id', userIds),
          servicesPromise
        
        ])
  
        const enrichedMessages = messages.map(message => {
          const matchedService = services?.find(s => s.id === message.service_id);
          console.log(`Message ${message.id} - service_id: ${message.service_id}, matched service:`, matchedService);
          return {
            ...message,
            sender: users?.find(u => u.id === message.sender_id),
            receiver: users?.find(u => u.id === message.receiver_id),
            service: matchedService || { title: 'Unknown Service' },
            isCustomerMessage: message.sender_id === user.id
          }
        })
        
        setMessages(enrichedMessages);
      } catch (error) {
        console.error('Error fetching messages:', error)
        toast.error('Failed to load messages');
        setMessages([])
      } finally {
        setMessagesLoading(false);
      }
    }
    useEffect(() => {
      
    
      if (activeTab === 'messages') {
        fetchMessages();
      }
    }, [activeTab, user?.id])
    
    const handleDeleteMessage = async (messageId) => {
      if (!window.confirm('Are you sure you want to delete this message?')) return;
      
      try {
         setMessages(prev => prev.filter(msg => msg.id !== messageId));
        
        const { error } = await supabase
          .from('messages')
          .delete()
          .eq('id', messageId);
        
        if (error) throw error;
        
        toast.success('Message deleted successfully');
        
         if (selectedMessage?.id === messageId) {
          setSelectedMessage(null);
        }
      } catch (error) {
        fetchMessages();
        console.error('Error deleting message:', error)
        toast.error('Failed to delete message')
      }
    }
  
    const handleSendReply = async (message) => {
      try {
        if (!replyContent.trim()) {
          throw new Error('Reply content cannot be empty')
        }
  
        const newMessage = {
          sender_id: user.id,
          receiver_id: message.sender_id,
          content: replyContent,
          is_reply: true,
          original_message_id: message.id,
          service_id: message.service_id || null,
        }
  
         
        const optimisticReply = {
          ...newMessage,
          id: `temp-${Date.now()}`,
          created_at: new Date().toISOString(),
          services: message.services,
          senders: { ...user },
          is_optimistic: true
        };
  
        setMessages(prev => [optimisticReply, ...prev]);
        setMessages(prev => prev.map(m => 
          m.id === message.id ? { ...m, replied: true } : m
        ));
  
        const { data, error } = await supabase
          .from('messages')
          .insert([newMessage])
          .select()
  
        if (error) throw error
  
         
        setMessages(prev => [
          {
            ...data[0],
            services: message.services,
            senders: { ...user }
          },
          ...prev.filter(msg => msg.id !== optimisticReply.id)
        ]);
  
        toast.success('Reply sent!');
        setReplyingTo(null)
        setReplyContent('')
      } catch (error) {
        console.error('Reply failed:', error)
        toast.error(`Failed: ${error.message}`)
        fetchMessages()
      }
    }
  
  

     const renderContent = () => {
      switch (activeTab) {
        case 'bookings':
          return (
            <div>
              No Booking yet
            </div>
          );
          case 'messages':
            return (
              <div>
               
              <h3 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>
                Messages {!messagesLoading && `(${messages.length})`}
              </h3>
              
              {messagesLoading ? (
                <div className="flex justify-center items-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                </div>
              ) : messages.length === 0 ? (
                <div className={`p-6 rounded-lg text-center ${theme === 'dark' ? 'bg-indigo-700' : 'bg-gray-100'}`}>
                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                    No messages found
                  </p>
                </div>
              ) : (
                <MessagesList
                  theme={theme}
                  messages={messages}
                  loading={messagesLoading}
                  onDelete={handleDeleteMessage}
                  onReply={(msg) => {
                  setReplyingTo(msg);
                  }}   
                />
              )}
              {/* Reply Modal */}
              {replyingTo && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className={`rounded-lg p-6 w-full max-w-md ${theme === 'dark' ? 'bg-indigo-900' : 'bg-white'}`}>
                    <h3 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>
                      Reply to {replyingTo.sender?.username || replyingTo.senders?.username || 'User'}
                    </h3>
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      className={`w-full p-3 rounded-lg mb-3 ${theme === 'dark' ? 'bg-indigo-800 text-white' : 'bg-gray-100'}`}
                      rows={4}
                      placeholder="Type your reply here..."
                    />
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setReplyingTo(null)}
                        className={`px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-gray-600 hover:bg-gray-700 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSendReply(replyingTo)}
                        className={`px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
                        disabled={!replyContent.trim()}
                      >
                        Send Reply
                      </button>
                    </div>
                  </div>
                </div>
              )}
            

              </div>
            )
        default:
          return (
            <div>
              <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>Dashboard Overview</h2>
            </div>
          )
      }
    }
  
    

  return (
  <div className={`min-h-screen ${theme === 'dark' ? 'bg-indigo-900' : 'bg-gray-100'} mt-20`}>
         <div className={`lg:hidden fixed top-25 left-0 right-0 h-12 flex items-center justify-between px-4 ${theme === 'dark' ? 'bg-indigo-600' : 'bg-white'} shadow z-40 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md focus:outline-none cursor-pointer"
          >
            {sidebarOpen ? (
              <FiX className={`w-5 h-5 ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`} />
            ) : (
              <FiMenu className={`w-5 h-5 ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`} />
            )}
          </button>
        </div>
  
        <div className="flex pt-20 lg:pt-0">
          {/* Sidebar */}
          <div className={`
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:translate-x-0
            fixed lg:static
            w-64 min-h-screen p-4
            ${theme === 'dark' ? 'bg-sky-200' : 'bg-white'}
            shadow z-10
            transition-transform duration-300 ease-in-out
          `}>
            <h2 className="text-2xl font-bold mb-8 text-indigo-900">Customer Dasboard</h2>
            <nav>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => {
                      setActiveTab('dashboard');
                      setSidebarOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 rounded flex items-center cursor-pointer ${activeTab === 'dashboard' ? 'bg-indigo-900 text-white' : theme === 'dark' ? 'hover:bg-blue-500' : 'hover:bg-gray-100'}`}
                  >
                    <FiBarChart2 className="mr-2" /> Dashboard
                  </button>
                </li>
               
                <li>
                  <button
                    onClick={() => {
                      setActiveTab('bookings');
                      setSidebarOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 rounded flex items-center cursor-pointer ${activeTab === 'bookings' ? 'bg-indigo-900 text-white' : theme === 'dark' ? 'hover:bg-blue-500' : 'hover:bg-gray-100'}`}
                  >
                    <FiCalendar className="mr-2" /> My Bookings
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveTab('messages');
                      setSidebarOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 rounded flex items-center cursor-pointer ${activeTab === 'messages' ? 'bg-indigo-900 text-white' : theme === 'dark' ? 'hover:bg-blue-500' : 'hover:bg-gray-100'}`}
                  >
                    <FiMail className="mr-2" /> Messages
                  </button>
                </li>
              </ul>
            </nav>
          </div>
  
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-0 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          
          <div className="flex-1 p-4 lg:p-12">
        <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-indigo-800' : 'bg-white'}`}>
          {renderContent()}
        </div>
      </div>

    </div>
      
         </div>
  )
}

export default CustomerDashboard;