import React from 'react'
import { useTheme } from '../contexts/ThemeContext'

const AdminDashboard = () => {
    const {theme} = useTheme()
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-indigo-900' : 'bg-gray-100'} mt-20`}>
        
        {/* Sidebar */}
        <div className={`w-64 min-h-screen p-4 ${theme === 'dark' ? 'bg-indigo-800' : 'bg-white'} shadow`}>
          <h2 className="text-2xl font-bold mb-8">Admin Dashboard</h2>

    </div>
    </div>
  )
}

export default AdminDashboard