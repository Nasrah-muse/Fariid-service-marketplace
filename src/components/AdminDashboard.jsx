import React, { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { FiBarChart2 } from 'react-icons/fi'

const AdminDashboard = () => {
    const {theme} = useTheme()
    const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-indigo-900' : 'bg-gray-100'} mt-20`}>
        
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
               
            </ul>
          </nav>


    </div>
    </div>
  )
}

export default AdminDashboard