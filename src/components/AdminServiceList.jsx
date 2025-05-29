import { useEffect, useState } from "react";
import { useTheme } from "../contexts/ThemeContext"
import supabase from "../lib/supabase";
import { ServiceDetailsModal } from "./ProviderDashboard";
import toast from "react-hot-toast";

 
export default function AdminServiceList() {
 const {theme} = useTheme()
 const [services, setServices] = useState([])
 const [selectedService, setSelectedService] = useState(null)

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
      .from("services")
      .select(`
        *,
        category:categories (
          name
        )
      `)
      if (error) console.error("Error fetching services:", error)
      else setServices(data)
    };

    fetchServices()
  }, [])

  const updateStatus = async (id, newStatus) => {
  try {
     const { data: service, error: fetchError } = await supabase
      .from("services")
      .select("status")
      .eq("id", id)
      .single()

    if (fetchError) throw fetchError;
    if (!service) throw new Error("Service not found")

    const currentStatus = service.status?.toLowerCase()?.trim()
    const normalizedNewStatus = newStatus.toLowerCase()

     if (currentStatus === normalizedNewStatus) {
      toast.error(`Service is already ${currentStatus}`)
       setServices(prev => prev.map(s => 
        s.id === id ? { ...s, status: currentStatus } : s
      ))
      return
    }

     const { error } = await supabase
      .from("services")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) throw error;

     setServices(prev => prev.map(s => 
      s.id === id ? { ...s, status: newStatus } : s
    ))
    
    toast.success(`Service ${newStatus.toLowerCase()} successfully`);
  } catch (err) {
    console.error("Error updating status:", err)
    toast.error(err.message || `Failed to update status`)
  }
}
  
  const handleServiceClick = (service) => {
    setSelectedService(service)
  }

  const closeModal = () => {
    setSelectedService(null)
  }


  return (
     <div className="p-4">
 <div className="overflow-x-auto">
  <table className="min-w-full table-auto">
    <thead>
      <tr>
        <th className={`border p-2 ${theme === 'dark'? 'border-gray-100 text-sky-200': 'border-indigo-600 text-indigo-900'}`}>Title</th>
        <th className={`border p-2 ${theme === 'dark'? 'border-gray-100 text-sky-200': 'border-indigo-600 text-indigo-900'}`}>Category</th>
        <th className={`border p-2 ${theme === 'dark'? 'border-gray-100 text-sky-200': 'border-indigo-600 text-indigo-900'}`}>Status</th>
        <th className={`border p-2 ${theme === 'dark'? 'border-gray-100 text-sky-200': 'border-indigo-600 text-indigo-900'}`}>Actions</th>
      </tr>
    </thead>
    <tbody>
    {services.map(service => (
              <tr key={service.id}>
                <td className={`border p-2 cursor-pointer text-xl ${theme === 'dark'? 'border-gray-100 text-sky-200 hover:text-sky-300': 'border-indigo-600 text-indigo-900 hover:text-blue-500'}`} onClick={() => handleServiceClick(service)}>
                  {service.title}
                </td>
                <td className={`border p-2 ${theme === 'dark'? 'border-gray-100 text-sky-200': 'border-indigo-600 text-indigo-900'}`}>
                    {service.category?.name || 'N/A'}</td>
                <td className={`border p-2 ${theme === 'dark'? 'border-gray-100 text-sky-200': 'border-indigo-600 text-indigo-900'}`}>
                  <span className={`inline-block px-2 py-1 rounded-full text-sm ${
                    service.status === 'approved' ? 'bg-green-100 text-green-800' :
                    service.status === 'pending' ? 'bg-yellow-500 text-yellow-800' :
                    'bg-red-100 text-red-800'}`}>
                    {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                  </span>
                </td>
                <td className={`border p-2 ${theme === 'dark'? 'border-gray-100 text-sky-200': 'border-indigo-600 text-indigo-900'}`}>
                  <button
                    className="bg-green-500 text-white px-3 py-1 mr-2 rounded cursor-pointer"
                    onClick={() => updateStatus(service.id, "approved")}
                   >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
                    onClick={() => updateStatus(service.id, "rejected")}
                   >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
    </tbody>
       
  </table>

     </div>
     {selectedService && (
        <ServiceDetailsModal service={selectedService} onClose={closeModal} theme={theme} />
      )}

     </div>
  )
}
