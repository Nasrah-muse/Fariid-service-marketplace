import  { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { FiBarChart2, FiCalendar, FiCheckCircle, FiDollarSign, FiHelpCircle, FiLayers, FiMail, FiMenu, FiUsers, FiX } from 'react-icons/fi' 
const AdminDashboard = () => {
    const {theme} = useTheme()
    const [activeTab, setActiveTab] = useState('dashboard')
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const renderContent = () => {
      switch (activeTab) {
        case 'users':
          return (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className={theme === 'dark' ? 'bg-indigo-800 text-white' : 'bg-gray-50 text-indigo-900'}>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase">Actions</th>
                  </tr>
                </thead>
              </table>
            </div>
          )
          case 'services':
            return (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className={`text-lg font-medium ${theme === 'dark'? 'text-white' : 'text-indigo-900'}`}>Service Categories</h3>
                  <button className={`  ${theme === 'dark'? 'bg-sky-200 hover:bg-sky-400 text-indigo-500': 'bg-indigo-600 hover:bg-indigo-800 text-white'}  py-2 px-4 rounded`}>
                    Add New Category
                  </button>
                </div>
               </div>
            )
            case 'bookings':
          return (
            <div>
              <div className="flex space-x-2 mb-4">
                <button className="px-4 py-2 rounded bg-blue-500 text-white">All</button>
                <button className="px-4 py-2 rounded bg-gray-200">Pending</button>
                <button className="px-4 py-2 rounded bg-green-500 text-white">Completed</button>
                <button className="px-4 py-2 rounded bg-red-500 text-white">Cancelled</button>
              </div>
             </div>
          )
          case 'providers':
          return (
            <div>
              <h3 className={`text-lg font-medium mb-4 ${theme === 'dark'? 'text-white' : 'text-indigo-900'}`}>Provider Approval Requests</h3>
             </div>
          )
          case 'reports':
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className={`p-4 rounded-lg shadow ${theme === 'dark' ? 'bg-indigo-600' : 'bg-gray-100'}`}>
                <h4 className={`font-medium ${theme === 'dark'? 'text-white': 'text-indigo-900'}`}>Active Users</h4>
               </div>
             </div>
          )
          case 'payments':
          return (
            <div>
              <h3 className={`text-lg font-medium mb-4 ${theme === 'dark'? 'text-white': 'text-indigo-900'}`}>Pending Payments</h3>
             </div>
          )
          case 'announcements':
          return (
            <div>
              <div className="mb-4">
                <textarea 
                  className={`w-full p-3 border rounded ${theme === 'dark'? 'border-white placeholder:text-white': 'border-indigo-900 placeholder:text-indigo-800'}`} 
                  rows="4" 
                  placeholder="Write your announcement...">
                </textarea>
                <div className="mt-2 flex justify-between">
                  <select className={`border rounded p-2 ${theme === 'dark'? 'border-white text-white bg-indigo-800': 'border-indigo-900 text-indigo-800'}`}>
                    <option>Send to all users</option>
                    <option>Send to providers only</option>
                    <option>Send to customers only</option>
                  </select>
                  <button className={`  ${theme === 'dark'? 'bg-sky-200 hover:bg-sky-400 text-indigo-500': 'bg-indigo-600 hover:bg-indigo-800 text-white'}  py-2 px-4 rounded`}>
                    Send Announcement
                  </button>
                </div>
              </div>
            </div>
          )
          case 'support':
          return (
            <div>
              <h3 className={`text-lg font-medium mb-4 ${theme === 'dark'? 'text-white': 'text-indigo-900'}`}>Recent Support Tickets</h3>
             </div>
          )
          default:
          return (
            <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-indigo-800' : 'bg-white'} w-full px-4 sm:px-6 md:px-8 overflow-x-hidden`}>
              <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark'? 'text-white': 'text-indigo-900'} `}>Dashboard Overview</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-4 w-full px-4 mb-8">
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-indigo-700' : 'bg-gray-50'}`}>
                  <h3 className={`text-md font-medium ${theme === 'dark'? 'text-white': 'text-indigo-900'}`}>Total Users</h3>
                  <p className={`text-2xl font-bold ${theme === 'dark'? 'text-sky-200': 'text-indigo-900'}`}>3</p>
                </div>
                
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-indigo-700' : 'bg-gray-50'}`}>
                  <h3 className={`text-md font-medium ${theme === 'dark'? 'text-white': 'text-indigo-900'}`}>Service Providers</h3>
                  <p className={`text-2xl font-bold ${theme === 'dark'? 'text-sky-200': 'text-indigo-900'}`}>2</p>
                </div>
                
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-indigo-700' : 'bg-gray-50'}`}>
                  <h3 className={`text-md font-medium ${theme === 'dark'? 'text-white': 'text-indigo-900'}`}>Services</h3>
                  <p className={`text-2xl font-bold ${theme === 'dark'? 'text-sky-200': 'text-indigo-900'}`}>5</p>
                </div>
                
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-indigo-700' : 'bg-gray-50'}`}>
                  <h3 className={`text-md font-medium ${theme === 'dark'? 'text-white': 'text-indigo-900'}`}>Categories</h3>
                  <p className={`text-2xl font-bold ${theme === 'dark'? 'text-sky-200': 'text-indigo-900'}`}>4</p>
                </div>
              </div>
                <div className="mb-8">
                  <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark'? 'text-white': 'text-indigo-900'}`}>Latest Users</h3>
                  <div className="overflow-x max-w-full">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-indigo-600">
                      <thead className={theme === 'dark' ? 'bg-indigo-600' : 'bg-gray-200'}>
                        <tr>
                          <th className={`px-6 py-3 text-left text-xs font-medium uppercase ${theme === 'dark'? 'text-white': 'text-indigo-600'} `}>Name</th>
                          <th className={`px-6 py-3 text-left text-xs font-medium uppercase ${theme === 'dark'? 'text-white': 'text-indigo-600'} `}>Email</th>
                          <th className={`px-6 py-3 text-left text-xs font-medium uppercase ${theme === 'dark'? 'text-white': 'text-indigo-600'} `}>Role</th>
                        </tr>
                      </thead>
                      <tbody className={`divide-y ${theme === 'dark'? 'divide-gray-200':'divide-indigo-500' }`}>
                        <tr>
                          <td className={`px-6 py-4 whitespace-nowrap ${theme === 'dark'? ' text-white': 'text-indigo-700'}`}>Nasra muuse</td>
                          <td className={`px-6 py-4 whitespace-nowrap ${theme === 'dark'? ' text-white': 'text-indigo-700'}`}>nasra@gmail.com</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${theme === 'dark'? 'bg-sky-200 text-indigo-900': 'bg-indigo-900 text-white '} `}>
                              Customer
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="mb-8">
                  <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark'? 'text-white': 'text-indigo-900'}`}>Latest Services</h3>
                  <div className="overflow-x-auto max-w-full">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-indigo-600">
                      <thead className={theme === 'dark' ? 'bg-indigo-600' : 'bg-gray-200'}>
                        <tr>
                          <th className={`px-6 py-3 text-left text-xs font-medium uppercase ${theme === 'dark'? 'text-white': 'text-indigo-600'} `}>Title</th>
                          <th className={`px-6 py-3 text-left text-xs font-medium uppercase ${theme === 'dark'? 'text-white': 'text-indigo-600'} `}>Category</th>
                          <th className={`px-6 py-3 text-left text-xs font-medium uppercase ${theme === 'dark'? 'text-white': 'text-indigo-600'} `}>Service Provider</th>
                        </tr>
                      </thead>
                      <tbody className={`divide-y ${theme === 'dark'? 'divide-gray-200':'divide-indigo-500' }`}>
                        <tr>
                          <td className={`px-6 py-4 whitespace-nowrap ${theme === 'dark'? ' text-white': 'text-indigo-700'}`}>plumbing installition</td>
                          <td className={`px-6 py-4 whitespace-nowrap ${theme === 'dark'? ' text-white': 'text-indigo-700'}`}>Home service</td>
                          <td className={`px-6 py-4 whitespace-nowrap ${theme === 'dark'? ' text-white': 'text-indigo-700'}`}>Ahmed geedi</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
      </div>
          )




         
       }
    }
  

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-indigo-900' : 'bg-gray-100'} mt-20`}>
                      <div className={`lg:hidden fixed top-25 left-0 right- h-12 flex items-center justify-between px-4 ${theme === 'dark' ? 'bg-indigo-600' : 'bg-white'} shadow z-40 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
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
          <h2 className="text-2xl font-bold mb-8">Admin Dashboard</h2>
          <nav>
            <ul className="space-y-2">
              <li>
                <button 
                     onClick={() => {setActiveTab('dashboard')
                       setSidebarOpen(false)}}
                     
                   className={`w-full text-left px-4 py-2 rounded flex items-center cursor-pointer ${activeTab === 'dashboard' ? 'bg-indigo-900 text-white' : theme === 'dark' ? 'hover:bg-blue-500' : 'hover:bg-gray-100'}`}
                >
                  <FiBarChart2 className="mr-2" /> Dashboard
                </button>
              </li>
              <li>
                <button 
                     onClick={() => {setActiveTab('users')
                      setSidebarOpen(false)}
                     }
                   className={`w-full text-left px-4 py-2 rounded flex items-center cursor-pointer ${activeTab === 'users' ? 'bg-indigo-900 text-white' : theme === 'dark' ? 'hover:bg-blue-500' : 'hover:bg-gray-100'}`}
                >
                  <FiUsers className="mr-2" /> Manage Users
                </button>
              </li>
              <li>
                <button 
                     onClick={() => {setActiveTab('services')
                      setSidebarOpen(false)}
                     }
                   className={`w-full text-left px-4 py-2 rounded flex items-center cursor-pointer ${activeTab === 'services' ? 'bg-indigo-900 text-white' : theme === 'dark' ? 'hover:bg-blue-500' : 'hover:bg-gray-100'}`}
                >
                 <FiLayers className="mr-2" /> Services & Categories
                 </button>
              </li>
              <li>
                <button 
                     onClick={() => {setActiveTab('bookings')
                      setSidebarOpen(false)}

                     }
                   className={`w-full text-left px-4 py-2 rounded flex items-center cursor-pointer ${activeTab === 'bookings' ? 'bg-indigo-900 text-white' : theme === 'dark' ? 'hover:bg-blue-500' : 'hover:bg-gray-100'}`}
                >
                 <FiCalendar className="mr-2" />Manage Bookings
                 </button>
              </li>
              <li>
                <button 
                     onClick={() => {setActiveTab('providers')   
                      setSidebarOpen(false)}}
                   className={`w-full text-left px-4 py-2 rounded flex items-center cursor-pointer ${activeTab === 'providers' ? 'bg-indigo-900 text-white' : theme === 'dark' ? 'hover:bg-blue-500' : 'hover:bg-gray-100'}`}
                >
                 <FiCheckCircle className="mr-2" />Approve Providers
                 </button>
              </li>
              <li>
                <button 
                     onClick={() => setActiveTab('reports')}
                   className={`w-full text-left px-4 py-2 rounded flex items-center cursor-pointer ${activeTab === 'reports' ? 'bg-indigo-900 text-white' : theme === 'dark' ? 'hover:bg-blue-500' : 'hover:bg-gray-100'}`}
                >
                 <FiBarChart2 className="mr-2" />Reports and Status
                 </button>
              </li>
              <li>
                <button 
                     onClick={() => {setActiveTab('payments')  
                      setSidebarOpen(false)}}
                   className={`w-full text-left px-4 py-2 rounded flex items-center cursor-pointer ${activeTab === 'payments' ? 'bg-indigo-900 text-white' : theme === 'dark' ? 'hover:bg-blue-500' : 'hover:bg-gray-100'}`}
                >
                 <FiDollarSign className="mr-2" />Manage Payments
                 </button>
              </li>
              <li>
                <button 
                     onClick={() => {setActiveTab('announcements')  
                       setSidebarOpen(false)}}
                   className={`w-full text-left px-4 py-2 rounded flex items-center cursor-pointer ${activeTab === 'announcements' ? 'bg-indigo-900 text-white' : theme === 'dark' ? 'hover:bg-blue-500' : 'hover:bg-gray-100'}`}
                >
                 <FiMail className="mr-2" />Send Announcements
                 </button>
              </li>
              <li>
                <button 
                     onClick={() => {setActiveTab('support')   
                      setSidebarOpen(false)}}
                   className={`w-full text-left px-4 py-2 rounded flex items-center cursor-pointer ${activeTab === 'support' ? 'bg-indigo-900 text-white' : theme === 'dark' ? 'hover:bg-blue-500' : 'hover:bg-gray-100'}`}
                >
                 <FiHelpCircle className="mr-2" />Support/Complaints
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

          {/* contents */}
          <div className="flex-1 p-4 lg:p-12">
          <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-indigo-800' : 'bg-white'}`}>
          {renderContent()}
           </div>
        </div>
        </div>

    </div>
   )
}

export default AdminDashboard