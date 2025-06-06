import  { useEffect, useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { FiBarChart2, FiCalendar, FiCheckCircle, FiDollarSign, FiHelpCircle, FiLayers, FiMail, FiMenu, FiUsers, FiX } from 'react-icons/fi' 
import toast from 'react-hot-toast'
import CategoryModal from './CategoryModel'
import supabase from '../lib/supabase'
import AdminServiceList from './AdminServiceList'
import BookingManagement from './BookingsManagement'
const AdminDashboard = () => {
    const {theme} = useTheme()
    const [activeTab, setActiveTab] = useState('dashboard')
    const [sidebarOpen, setSidebarOpen] = useState(false)

  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null)
  const [users, setUsers] = useState([])
  const [loadingUsers, setLoadingUsers] = useState(false)
  
 const [dashboardStats, setDashboardStats] = useState({
  totalUsers: 0,
  serviceProviders: 0,
  services: 0,
  categories: 0
});
const [latestUsers, setLatestUsers] = useState([]);
const [latestServices, setLatestServices] = useState([]);
const [loadingStats, setLoadingStats] = useState(false);

 useEffect(() => {
  const fetchDashboardData = async () => {
    setLoadingStats(true)
    try {
       const { count: totalUsers } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .neq('role', 'admin')

       const { count: serviceProviders } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'provider')

       const { count: services } = await supabase
        .from('services')
        .select('*', { count: 'exact', head: true });

       const { data: latestUsers } = await supabase
        .from('users_with_email')
        .select('*')
        .neq('role', 'admin')
        .order('created_at', { ascending: false })
        .limit(5)

       const { data: latestServices } = await supabase
        .from('services')
        .select('*, provider:users(username, role)')
        .order('created_at', { ascending: false })
        .limit(5)

       const filteredServices = latestServices 
        ? latestServices.filter(service => service.provider?.role !== 'admin') 
        : [];

      setDashboardStats({
        totalUsers,
        serviceProviders,
        services,
        categories: categories.length
      });
      
      setLatestUsers(latestUsers || [])
      setLatestServices(filteredServices)
      
    } catch (err) {
      toast.error('Failed to load dashboard data')
      console.error('Error loading dashboard data:', err)
    } finally {
      setLoadingStats(false)
    }
  }

  if (activeTab === 'dashboard') {
    fetchDashboardData()
  }
}, [activeTab, categories.length])



  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingUsers(true);
      try {
        const { data, error } = await supabase
        .from('users_with_email')
        .select('*')
        .neq('role', 'admin')
        .order('created_at', { ascending: false })

        if (error) throw error

        setUsers(data);
      } catch (err) {
        toast.error('Failed to fetch users')
        console.error('Error fetching users:', err)
      } finally {
        setLoadingUsers(false)
      }
    }

    fetchUsers()
  }, [])

  const handleVerifyUser = async (userId) => {
    try {
       const user = users.find(u => u.id === userId)
    if (user?.status === 'verified') {
      toast.error('User is already verified')
      return
    }

      const { error } = await supabase
        .from('users')
        .update({ status: 'verified' })
        .eq('id', userId)
  
      if (error) throw error;
  
      setUsers(users.map(user => 
        user.id === userId ? { ...user, status: 'verified' } : user
      ));
      toast.success('User verified successfully')
    } catch (err) {
      toast.error('Failed to verify user');
      console.error('Error verifying user:', err)
    }
  }
  
  const handleToggleBlockUser = async (userId, currentStatus) => {
    const newStatus = currentStatus === 'blocked' ? 'verified' : 'blocked';
    try {
         const user = users.find(u => u.id === userId)
    if (user?.status === 'blocked') {
      toast.error('User is already blocked')
      return
    }
      const { error } = await supabase
        .from('users')
        .update({ status: newStatus })
        .eq('id', userId)
  
      if (error) throw error
  
      setUsers(users.map(user =>
        user.id === userId ? { ...user, status: newStatus } : user
      ));
      toast.success(`User ${newStatus === 'blocked' ? 'blocked' : 'unblocked'} successfully`)
    } catch (err) {
      toast.error('Failed to update user status')
      console.error('Error updating status:', err)
    }
  }
  
  useEffect(() => {
    fetchCategories()
  }, [])
  
  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching categories:', error)
      toast.error('Failed to load categories')
    } else {
      setCategories(data)
    }
  }

  const handleEditCategory = (category) => {
    setEditingCategory(category)
    setNewCategoryName(category.name)
    setShowCategoryModal(true)
  }
  // delete
  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category and ALL its services?')) return;
    
    try {
       const { error: servicesError } = await supabase
        .from('services')
        .delete()
        .eq('category_id', id)
      
      if (servicesError) throw servicesError
      
      
      const { error: categoryError } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);
      
      if (categoryError) throw categoryError;
      
      toast.success('Category and all its services deleted successfully!')
      fetchCategories();
    } catch (err) {
      toast.error('Failed to delete category')
      console.error('Error deleting category:', err)
    }
  };
  const handleUpdateCategory = async () => {
    if (!newCategoryName.trim()) {
      setError('Category name is required')
      return
    }
  
    setIsLoading(true)
    setError('')
  
    try {
      const { data, error } = await supabase
        .from('categories')
        .update({ name: newCategoryName.trim() })
        .eq('id', editingCategory.id)
        .select()
  
      if (error) throw error;
  
      toast.success('Category updated successfully!')
      fetchCategories()
      setShowCategoryModal(false)
      setNewCategoryName('')
      setEditingCategory(null)
    } catch (err) {
      setError(err.message || 'Failed to update category')
      toast.error('Failed to update category')
    } finally {
      setIsLoading(false)
    }
  }


  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      setError('Category name is required')
      return;
    }
  
    setIsLoading(true);
    setError('')
  
    try {
      const trimmedName = newCategoryName.trim().toLowerCase()
  
       const { data: existingCategory, error: checkError } = await supabase
        .from('categories')
        .select('*')
        .ilike('name', trimmedName);
  
      if (checkError) throw checkError;
  
      if (existingCategory && existingCategory.length > 0) {
        setError('Category already exists')
        toast.error('Category already exists')
        setIsLoading(false)
        return
      }
  
       const { data, error: insertError } = await supabase
        .from('categories')
        .insert([{
          name: newCategoryName.trim(),
          created_by: (await supabase.auth.getUser()).data.user?.id
        }])
        .select()
  
      if (insertError) throw insertError;

      setCategories(prevCategories => [data[0], ...prevCategories])
  
      toast.success('Category added successfully!')
      setShowCategoryModal(false)
      setNewCategoryName('')
    } catch (err) {
      setError(err.message || 'Failed to add category')
      toast.error('Failed to add category')
    } finally {
      setIsLoading(false)
    }
  }
  
    const renderContent = () => {
      switch (activeTab) {
        case 'users':
          return (
            <div className="overflow-x-auto">
              <h3 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>
                Manage Users
              </h3>
              {loadingUsers ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
              ):(
               <table className="min-w-full divide-y divide-gray-200">
                <thead className={theme === 'dark' ? 'bg-indigo-800 text-white' : 'bg-gray-50 text-indigo-900'}>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${theme === 'dark' ? 'divide-indigo-700 bg-indigo-900' : 'divide-gray-200 bg-white'}`}>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className={`px-6 py-4 whitespace-nowrap ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {user.username || 'N/A'}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {user.email}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.role === 'provider' 
                        ? theme === 'dark' 
                          ? 'bg-green-300 text-green-900' 
                          : 'bg-green-100 text-green-800'
                        : theme === 'dark' 
                          ? 'bg-blue-300 text-blue-900' 
                          : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role === 'provider' ? 'Provider' : 'Customer'}
                    </span>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                      <span className={`px-2 py-1 text-xs rounded-full ${
                      user.status === 'blocked'
                        ? 'bg-red-100 text-red-800'
                        : theme === 'dark'
                          ? 'bg-green-300 text-green-900'
                          : 'bg-green-100 text-green-800'
                    }`}>
                      {user.status === 'blocked' ? 'Blocked' : 'Verified'}
                    </span>

                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {!user.blocked && !user.verified && (
                      <button
                      onClick={() => handleVerifyUser(user.id)}
                         className={`mr-2 cursor-pointer ${theme === 'dark' ? 'text-green-300 hover:text-green-200' : 'text-green-600 hover:text-green-900'}`}
                      >
                        Verify
                      </button>
                    )}
                  <button
                    onClick={() => handleToggleBlockUser(user.id, user.blocked)}
                    className={`cursor-pointer ${
                      user.blocked 
                        ? theme === 'dark' 
                          ? 'text-green-300 hover:text-green-200' 
                          : 'text-green-600 hover:text-green-900'
                        : theme === 'dark' 
                          ? 'text-red-300 hover:text-red-200' 
                          : 'text-red-600 hover:text-red-900'
                    }`}
                  >
                    {user.blocked ? 'Unblock' : 'Block'}
                  </button>
                  </td>
                </tr>
              ))}
            </tbody>
          
              </table>
              )}
            </div>
          )
          case 'services':
            return (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className={`text-lg font-medium ${theme === 'dark'? 'text-white' : 'text-indigo-900'}`}>Service Categories</h3>
                  <button  onClick={() => setShowCategoryModal(true)}
                  className={`  ${theme === 'dark'? 'bg-sky-200 hover:bg-sky-400 text-indigo-500': 'bg-indigo-600 hover:bg-indigo-800 text-white'}  py-2 px-4 rounded`}>
                    Add New Category
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className={theme === 'dark' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-indigo-900'}>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Category Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Created At
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${theme === 'dark' ? 'divide-indigo-500 bg-indigo-700' : 'divide-gray-200 bg-white'}`}>
                      {categories.map((category) => (
                        <tr key={category.id}>
                          <td className={`px-6 py-4 whitespace-nowrap ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {category.name}
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {new Date(category.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button 
                               onClick={() => handleEditCategory(category)}
                               className={`mr-2 cursor-pointer ${theme === 'dark' ? 'text-sky-200 hover:text-blue-200' : 'text-blue-600 hover:text-blue-900'}`}
                            >
                              Edit
                            </button>
                            <button 
                             onClick={() => handleDeleteCategory(category.id)}
                               className={` cursor-pointer ${theme === 'dark' ? 'text-red-300 hover:text-red-200' : 'text-red-600 hover:text-red-900'}`}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {showCategoryModal && (
                <CategoryModal
                  theme={theme}
                  isLoading={isLoading}
                  newCategoryName={newCategoryName}
                  setNewCategoryName={setNewCategoryName}
                  error={error}
                  handleAddCategory={editingCategory ? handleUpdateCategory : handleAddCategory}
                  onClose={() => {
                      setShowCategoryModal(false);
                      setEditingCategory(null);
                      setNewCategoryName('');
                    }}
                    isEditing={!!editingCategory}

                />
              )}
               </div>
            )
            case 'bookings':
          return (
            <div>
               <h3 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        Manage Bookings
      </h3>
         <BookingManagement theme={theme} />
             </div>
          )
          case 'providers':
          return (
            <div>
              <h3 className={`text-lg font-medium mb-4 ${theme === 'dark'? 'text-white' : 'text-indigo-900'}`}>Provider Approval Requests</h3>
              <AdminServiceList/>
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
              <div className={`flex flex-col items-center justify-center p-8 rounded-lg ${theme === 'dark' ? 'bg-indigo-800' : 'bg-gray-50'}`}>
          <FiCheckCircle className={`w-12 h-12 mb-4 ${theme === 'dark' ? 'text-green-300' : 'text-green-500'}`} />
          <h4 className={`text-xl font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            No Complaints Found
          </h4>
          <p className={`text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            There are currently no support tickets or complaints from users.
          </p>
        </div>

             </div>
          )
          default:
          return (
            <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-indigo-800' : 'bg-white'} w-full px-4 sm:px-6 md:px-8 overflow-x-hidden`}>
              <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark'? 'text-white': 'text-indigo-900'} `}>Dashboard Overview</h2>
              {loadingStats ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-4 w-full px-4 mb-8">
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-indigo-700' : 'bg-gray-50'}`}>
                  <h3 className={`text-md font-medium ${theme === 'dark'? 'text-white': 'text-indigo-900'}`}>Total Users</h3>
                  <p className={`text-2xl font-bold ${theme === 'dark'? 'text-sky-200': 'text-indigo-900'}`}>{dashboardStats.totalUsers}</p>
                </div>
                
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-indigo-700' : 'bg-gray-50'}`}>
                  <h3 className={`text-md font-medium ${theme === 'dark'? 'text-white': 'text-indigo-900'}`}>Service Providers</h3>
                  <p className={`text-2xl font-bold ${theme === 'dark'? 'text-sky-200': 'text-indigo-900'}`}>{dashboardStats.serviceProviders}</p>
                </div>
                
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-indigo-700' : 'bg-gray-50'}`}>
                  <h3 className={`text-md font-medium ${theme === 'dark'? 'text-white': 'text-indigo-900'}`}>Services</h3>
                  <p className={`text-2xl font-bold ${theme === 'dark'? 'text-sky-200': 'text-indigo-900'}`}>{dashboardStats.services}</p>
                </div>
                
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-indigo-700' : 'bg-gray-50'}`}>
                  <h3 className={`text-md font-medium ${theme === 'dark'? 'text-white': 'text-indigo-900'}`}>Categories</h3>
                  <p className={`text-2xl font-bold ${theme === 'dark'? 'text-sky-200': 'text-indigo-900'}`}>{dashboardStats.categories}</p>
                </div>
              </div>
                <div className="mb-8">
                  <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark'? 'text-white': 'text-indigo-900'}`}>Latest Users</h3>
                  {latestUsers.length === 0 ? (
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>No users found</p>
            ): (
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
                      {latestUsers.map(user => (
                        <tr key={user.id}>
                          <td className={`px-6 py-4 whitespace-nowrap ${theme === 'dark'? ' text-white': 'text-indigo-700'}`}>{user.username || 'N/A'}</td>
                          <td className={`px-6 py-4 whitespace-nowrap ${theme === 'dark'? ' text-white': 'text-indigo-700'}`}>{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${theme === 'dark'? 'bg-sky-200 text-indigo-900': 'bg-indigo-900 text-white '} `}>
                            {user.role === 'provider' ? 'Provider' : 'Customer'}
                            </span>
                          </td>
                        </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                   )}
                </div>
                <div className="mb-8">
                  <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark'? 'text-white': 'text-indigo-900'}`}>Latest Services</h3>
                  {latestServices.length === 0 ? (
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>No services found</p>
            ):(
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
                      {latestServices.map(service => (
                        <tr key={service.id}>
                          <td className={`px-6 py-4 whitespace-nowrap ${theme === 'dark'? ' text-white': 'text-indigo-700'}`}>{service.title}</td>
                          <td className={`px-6 py-4 whitespace-nowrap ${theme === 'dark'? ' text-white': 'text-indigo-700'}`}>{categories.find(cat => cat.id === service.category_id)?.name || 'N/A'} </td>
                          <td className={`px-6 py-4 whitespace-nowrap ${theme === 'dark'? ' text-white': 'text-indigo-700'}`}>{service.provider?.username || 'N/A'}
                          </td>
                        </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  )}
                  </div>
                  </>
                )}
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