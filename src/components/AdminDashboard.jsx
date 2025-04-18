import React from 'react'
import { useTheme } from '../contexts/ThemeContext'

const AdminDashboard = () => {
    const {theme} = useTheme()
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-indigo-900' : 'bg-gray-100'} mt-20`}>
    </div>
  )
}

export default AdminDashboard