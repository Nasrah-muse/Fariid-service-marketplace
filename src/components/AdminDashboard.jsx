import React, { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { FiBarChart2, FiCalendar, FiCheckCircle, FiDollarSign, FiHelpCircle, FiLayers, FiMail, FiUsers } from 'react-icons/fi'

const AdminDashboard = () => {
    const {theme} = useTheme()
    const [activeTab, setActiveTab] = useState('dashboard')
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


         
       }
    }
  

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-indigo-900' : 'bg-gray-100'} mt-20`}>
    <div className="flex">
        
        {/* Sidebar */}
        <div className={`w-64 min-h-screen p-4 ${theme === 'dark' ? 'bg-sky-200' : 'bg-white'} shadow`}>
          <h2 className="text-2xl font-bold mb-8">Admin Dashboard</h2>
          <nav>
            <ul className="space-y-2">
              <li>
                <button 
                     onClick={() => setActiveTab('dashboard')}
                   className={`w-full text-left px-4 py-2 rounded flex items-center cursor-pointer ${activeTab === 'dashboard' ? 'bg-indigo-900 text-white' : theme === 'dark' ? 'hover:bg-blue-500' : 'hover:bg-gray-100'}`}
                >
                  <FiBarChart2 className="mr-2" /> Dashboard
                </button>
              </li>
              <li>
                <button 
                     onClick={() => setActiveTab('users')}
                   className={`w-full text-left px-4 py-2 rounded flex items-center cursor-pointer ${activeTab === 'users' ? 'bg-indigo-900 text-white' : theme === 'dark' ? 'hover:bg-blue-500' : 'hover:bg-gray-100'}`}
                >
                  <FiUsers className="mr-2" /> Manage Users
                </button>
              </li>
              <li>
                <button 
                     onClick={() => setActiveTab('services')}
                   className={`w-full text-left px-4 py-2 rounded flex items-center cursor-pointer ${activeTab === 'services' ? 'bg-indigo-900 text-white' : theme === 'dark' ? 'hover:bg-blue-500' : 'hover:bg-gray-100'}`}
                >
                 <FiLayers className="mr-2" /> Services & Categories
                 </button>
              </li>
              <li>
                <button 
                     onClick={() => setActiveTab('bookings')}
                   className={`w-full text-left px-4 py-2 rounded flex items-center cursor-pointer ${activeTab === 'bookings' ? 'bg-indigo-900 text-white' : theme === 'dark' ? 'hover:bg-blue-500' : 'hover:bg-gray-100'}`}
                >
                 <FiCalendar className="mr-2" />Manage Bookings
                 </button>
              </li>
              <li>
                <button 
                     onClick={() => setActiveTab('providers')}
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
                     onClick={() => setActiveTab('payments')}
                   className={`w-full text-left px-4 py-2 rounded flex items-center cursor-pointer ${activeTab === 'payments' ? 'bg-indigo-900 text-white' : theme === 'dark' ? 'hover:bg-blue-500' : 'hover:bg-gray-100'}`}
                >
                 <FiDollarSign className="mr-2" />Manage Payments
                 </button>
              </li>
              <li>
                <button 
                     onClick={() => setActiveTab('announcements')}
                   className={`w-full text-left px-4 py-2 rounded flex items-center cursor-pointer ${activeTab === 'announcements' ? 'bg-indigo-900 text-white' : theme === 'dark' ? 'hover:bg-blue-500' : 'hover:bg-gray-100'}`}
                >
                 <FiMail className="mr-2" />Send Announcements
                 </button>
              </li>
              <li>
                <button 
                     onClick={() => setActiveTab('support')}
                   className={`w-full text-left px-4 py-2 rounded flex items-center cursor-pointer ${activeTab === 'support' ? 'bg-indigo-900 text-white' : theme === 'dark' ? 'hover:bg-blue-500' : 'hover:bg-gray-100'}`}
                >
                 <FiHelpCircle className="mr-2" />Support/Complaints
                 </button>
              </li>
            
               
            </ul>
          </nav>
          {/* contents */}
          </div>
          <div className="flex-1 p-8">
          <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-indigo-800' : 'bg-white'}`}>
          {renderContent()}
           </div>
        </div>

    </div>
    </div>
  )
}

export default AdminDashboard