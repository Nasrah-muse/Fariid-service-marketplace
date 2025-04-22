import { useEffect, useState} from 'react';
import { useTheme } from '../contexts/ThemeContext';
import {  FiBarChart2, FiCalendar, FiEdit, FiInfo, FiMail, FiMenu, FiPlus, FiTrash, FiX } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext'
import ServiceRegistration from './ServiceRegistration'
import supabase from '../lib/supabase';
const ServiceDetailsModal = ({ service, onClose, theme }) => {
  if (!service) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className={`p-6 rounded-lg max-w-2xl w-full mx-4 ${theme === 'dark' ? 'bg-indigo-700' : 'bg-white'}`}>
      <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>
        {service.title}
      </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <p className={`font-medium  ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Category</p>
            <p className={`${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>{service.category_name}</p>
          </div>
          <div>
            <p className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Status</p>
            <p className={`inline-block px-2 py-1 rounded-full text-sm ${
              service.status === 'approved' ? 'bg-green-100 text-green-800' : 
              service.status === 'pending' ? 'bg-yellow-500 text-yellow-800' : 
              'bg-red-100 text-red-800'
            }`}>
              {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
            </p>
          </div>
        </div>
        
        <div className="mb-4">
          <p className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Description</p>
          <p className = {`${theme === 'dark'? 'text-indigo-400': 'text-indigo-600'}`}>{service.description}</p>
        </div>
        
        <h4 className={`font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>Pricing Tiers</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className={`p-3 rounded ${theme === 'dark' ? 'bg-indigo-600' : 'bg-gray-100'}`}>
            <h5 className={`font-medium  ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>Basic</h5>
            <p className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>${service.basic_price}</p>
            <p className={`text-sm mt-1 ${theme === 'dark'? 'text-white': 'text-indigo-900'}`}>{service.basic_description}</p>
          </div>
          <div className={`p-3 rounded ${theme === 'dark' ? 'bg-indigo-600' : 'bg-gray-100'}`}>
            <h5 className={`font-medium  ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>Standard</h5>
            <p className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>${service.standard_price}</p>
            <p className={`text-sm mt-1 ${theme === 'dark'? 'text-white': 'text-indigo-900'}`}>{service.standard_description}</p>
          </div>
          <div className={`p-3 rounded ${theme === 'dark' ? 'bg-indigo-600' : 'bg-gray-100'}`}>
            <h5 className={`font-medium  ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>Premium</h5>
            <p className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>${service.premium_price}</p>
            <p className={`text-sm mt-1 ${theme === 'dark'? 'text-white': 'text-indigo-900'}`}>{service.premium_description}</p>
          </div>
        </div>
        
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-md font-medium ${theme === 'dark' ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'bg-indigo-800 hover:bg-indigo-900 text-white'}`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}



 const ProviderDashboard = () => {
  const { theme } = useTheme()
   const [sidebarOpen, setSidebarOpen] = useState(false)
   const [activeTab, setActiveTab] = useState('dashboard')
   const { user } = useAuth()
   const [showServiceForm, setShowServiceForm] = useState(false)
   const [services, setServices] = useState([])
   const [selectedService, setSelectedService] = useState(null)
   const [loadingServices, setLoadingServices] = useState(false)
   const [editingService, setEditingService] = useState(null)

   useEffect(() => {
    if (activeTab === 'services' && user) {
      fetchServices()
    }
  }, [activeTab, user])

  const fetchServices = async () => {
    setLoadingServices(true);
    try {
      const { data, error } = await supabase
        .from('services')
        .select(`
          *,
          categories(name)
        `)
        .eq('provider_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error;
      
      const transformedServices = data.map(service => ({
        ...service,
        category_name: service.categories?.name || 'Uncategorized'
      }));
      
      setServices(transformedServices)
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoadingServices(false)
    }
  }

  const handleDeleteService = async (serviceId) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', serviceId)
      
      if (error) throw error
      
      setServices(services.filter(service => service.id !== serviceId));
    } catch (error) {
      console.error('Error deleting service:', error)
    }
  };

  const handleEditService = (service) => {
    setEditingService(service)
    setShowServiceForm(true)
  }

   const renderContent = () => {
    switch (activeTab) {
      case 'services':
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>My Services</h3>
              <button
                  onClick={() => {
                    setEditingService(null);
                    setShowServiceForm(true);
                  }}
                  className={`flex items-center ${theme === 'dark' ? 'bg-sky-200 hover:bg-sky-300 text-indigo-900' : 'bg-indigo-600 hover:bg-indigo-700 text-white'} py-2 px-4 rounded`}
                >
                  <FiPlus className="mr-2" /> Add New Service
                </button>
              </div>
  
          {showServiceForm && (
        <div className={`mb-6 p-4 rounded-lg relative ${theme === 'dark' ? 'bg-indigo-700' : 'bg-gray-100'}`}>
          <button
            onClick={() => {
              setShowServiceForm(false);
              setEditingService(null);
            }}
            className={`absolute top-2 right-2 p-1 rounded-full ${theme === 'dark' ? 'hover:bg-indigo-600 text-white' : 'hover:bg-gray-200 text-gray-700'}`}
          >
            <FiX className="w-5 h-5" />
          </button>
          <ServiceRegistration
            onClose={() => {
              setShowServiceForm(false);
              setEditingService(null);
              fetchServices();
            }}
            theme={theme}
            editingService={editingService}
          />
        </div>
)}
  
              {loadingServices ? (
                <div className="flex justify-center items-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                </div>
              ) : services.length === 0 ? (
                <div className={`p-6 rounded-lg text-center ${theme === 'dark' ? 'bg-indigo-700' : 'bg-gray-100'}`}>
                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                    You haven't registered any services yet. Click "Add New Service" to get started.
                  </p>
                </div>
              ) : (
                <div className={`rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-indigo-700' : 'bg-white'}`}>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className={theme === 'dark' ? 'bg-indigo-800' : 'bg-gray-50'}>
                      <tr>
                        <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                          Service
                        </th>
                        <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                          Category
                        </th>
                        <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                          Price Range
                        </th>
                        <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                          Status
                        </th>
                        <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${theme === 'dark' ? 'divide-indigo-600' : 'divide-gray-200'}`}>
                      {services.map((service) => (
                        <tr key={service.id} className={theme === 'dark' ? 'hover:bg-indigo-600' : 'hover:bg-gray-50'}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`text-sm font-medium ${theme === 'dark'? ' text-white': 'text-indigo-900'}`}>{service.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`text-sm  ${theme === 'dark'? ' text-white': 'text-indigo-900'}`}>{service.category_name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`text-sm  ${theme === 'dark'? ' text-white': 'text-indigo-900'}`}>
                              ${service.basic_price} - ${service.premium_price}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              service.status === 'approved' ? 'bg-green-100 text-green-800' : 
                              service.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'
                            }`}>
                              {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <button
                              onClick={() => setSelectedService(service)}
                              className={`${theme === 'dark' ? 'text-sky-300 hover:text-sky-200' : 'text-indigo-600 hover:text-indigo-900'}`}
                              title="Details"
                            >
                              <FiInfo />
                            </button>
                            <button
                              onClick={() => handleEditService(service)}
                              className={`${theme === 'dark' ? 'text-yellow-400 hover:text-yellow-200' : 'text-yellow-600 hover:text-yellow-900'}`}
                              title="Edit"
                            >
                              <FiEdit />
                            </button>
                            <button
                              onClick={() => handleDeleteService(service.id)}
                              className={`${theme === 'dark' ? 'text-red-300 hover:text-red-200' : 'text-red-600 hover:text-red-900'}`}
                              title="Delete"
                            >
                              <FiTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}


              </div>
        )
     case 'bookings':
      return (
        <div>
          <h3 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>Latest Booking</h3>
          <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-indigo-700' : 'bg-gray-50'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium">Client</p>
                <p className="mt-2">Raage Abdi</p>
              </div>
              <div>
                <p className="font-medium">Service</p>
                <p className="mt-2">Plumbing</p>
              </div>
              <div>
                <p className="font-medium">Date</p>
                <p className="mt-2">April 22, 2025</p>
              </div>
            </div>
          </div>
        </div>
      )
    case 'messages':
      return (
        <div>
          <h3 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>Messages</h3>
          <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-indigo-700' : 'bg-gray-50'}`}>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <p className="font-medium">From: Client A</p>
                <p className="text-sm mt-1">"Hi, I need to reschedule my appointment..."</p>
              </div>
              <div className="border-b pb-4">
                <p className="font-medium">From: Client B</p>
                <p className="text-sm mt-1">"Can you provide a quote for additional work?"</p>
              </div>
            </div>
          </div>
        </div>
      )
    default:
      return (
        <div>
          <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>Dashboard Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-indigo-700' : 'bg-gray-50'}`}>
                <h3 className={`text-md font-medium ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>Active Services</h3>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-sky-200' : 'text-indigo-900'}`}>
                  {services.filter(s => s.status === 'approved').length}
                </p>
              </div>
              
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-indigo-700' : 'bg-gray-50'}`}>
                <h3 className={`text-md font-medium ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>Bookings This Month</h3>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-sky-200' : 'text-indigo-900'}`}>12</p>
              </div>
              
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-indigo-700' : 'bg-gray-50'}`}>
                <h3 className={`text-md font-medium ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>New Messages</h3>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-sky-200' : 'text-indigo-900'}`}>3</p>
              </div>
            </div>

            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-indigo-700' : 'bg-gray-50'} mb-8`}>
              <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>Latest Booking</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>Client</p>
                  <p className={`${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>Ahmed Qasim</p>
                </div>
                <div>
                  <p className={` font-medium ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>Service</p>
                  <p className={`${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>House Cleaning</p>
                </div>
                <div>
                  <p className={` font-medium ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>Date</p>
                  <p className={`${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>April 22, 2025</p>
                </div>
              </div>
            </div>
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
          <h2 className="text-2xl font-bold mb-8 text-indigo-900">Service Provider</h2>
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
                    setActiveTab('services');
                    setSidebarOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 rounded flex items-center cursor-pointer ${activeTab === 'services' ? 'bg-indigo-900 text-white' : theme === 'dark' ? 'hover:bg-blue-500' : 'hover:bg-gray-100'}`}
                >
                  <FiBarChart2 className="mr-2" /> My Services
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
                  <FiCalendar className="mr-2" /> Bookings
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
        {/* main */}
       <div className="flex-1 p-4 lg:p-12">
      <div className={`rounded-lg shadow p-6 ${theme === 'dark' ? 'bg-indigo-800' : 'bg-white'}`}>
        {renderContent()}
      </div>
    </div>
  </div>
         {selectedService && (
        <ServiceDetailsModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          theme={theme}
        />
      )}
    
       </div>

   )
 }
 
 export default ProviderDashboard