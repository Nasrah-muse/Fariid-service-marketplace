import { useEffect, useState } from "react"
import { useTheme } from "../contexts/ThemeContext"
import supabase from "../lib/supabase"
import { useAuth } from "../contexts/AuthContext"
 
  
 const ProviderRegistration = () => {
  const {theme } = useTheme()
  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  const [categories, setCategories] = useState([])
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category_id: '',
    basic_price: '',
    basic_description: '',
    standard_price: '',
    standard_description: '',
    premium_price: '',
    premium_description: '',
    availability: daysOfWeek.reduce((acc, day) => ({
      ...acc,
      [day]: { available: false, start_time: '08:00', end_time: '17:00' }
    }), {})
  })

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from('categories').select('id, name')
      if (!error) setCategories(data)
    }
    fetchCategories()
  }, [])

  
  const handleAvailabilityChange = (day, field, value) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: {
          ...prev.availability[day],
          [field]: value
        }
      }
    }))
  }

   return (
     <div className={`min-h-screen p-6 mt-16 ${theme === 'dark' ? 'bg-indigo-800 text-gray-100' : 'bg-sky-200 text-indigo-900'}`}>
       <div className={`max-w-4xl mx-auto p-6 rounded-lg ${theme === 'dark' ? 'bg-indigo-600 shadow-xl' : 'bg-white shadow-md'}`}>
            <h2 className={`text-2xl font-bold mb-6 text-center ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>
              Service Registration
        </h2>

        {/*  Form */}
        <form  className="space-y-6">
          {/* basic info*/}
          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>
              Basic Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Service Title*
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className={`w-full p-2 border rounded-md ${theme === 'dark' ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}
                  required
                />
              </div>

              <div>
                <label className={`block mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Category*
                </label>
                <select
                  value={formData.category_id}
                  onChange={(e) => setFormData({...formData, category_id: e.target.value})}
                  className={`w-full p-2 border rounded-md ${theme === 'dark' ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className={`block mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Description*
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={4}
                className={`w-full p-2 border rounded-md ${theme === 'dark' ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}
                required
              />
            </div>
          </div>
           {/* price */}
          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>
              Pricing Tiers
            </h3>
            
            {['basic', 'standard', 'premium'].map((tier) => (
              <div key={tier} className={`mb-4 p-3 rounded ${theme === 'dark' ? 'bg-gray-600' : 'bg-white border'}`}>
                <h4 className={`font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-indigo-800'}`}>
                  {tier.charAt(0).toUpperCase() + tier.slice(1)} Tier*
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Price ($)*
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData[`${tier}_price`]}
                      onChange={(e) => setFormData({...formData, [`${tier}_price`]: e.target.value})}
                      className={`w-full p-2 border rounded-md ${theme === 'dark' ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}
                      required
                    />
                  </div>
                  <div>
                    <label className={`block mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Description*
                    </label>
                    <textarea
                      value={formData[`${tier}_description`]}
                      onChange={(e) => setFormData({...formData, [`${tier}_description`]: e.target.value})}
                      rows={2}
                      className={`w-full p-2 border rounded-md ${theme === 'dark' ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* available */}
          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>
              Availability
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {daysOfWeek.map(day => (
                <div key={day} className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-600' : 'bg-white border'}`}>
                  <label className={`flex items-center space-x-2 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                    <input
                      type="checkbox"
                      checked={formData.availability[day].available}
                      onChange={(e) => handleAvailabilityChange(day, 'available', e.target.checked)}
                      className={`rounded ${theme === 'dark' ? 'accent-orange-500' : 'accent-indigo-600'}`}
                    />
                    <span className="capitalize">{day}</span>
                  </label>
                  
                  {formData.availability[day].available && (
                    <div className="mt-2 space-y-2">
                      <div>
                        <label className={`block text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>From</label>
                        <input
                          type="time"
                          value={formData.availability[day].start_time}
                          onChange={(e) => handleAvailabilityChange(day, 'start_time', e.target.value)}
                          className={`w-full p-1 border rounded ${theme === 'dark' ? 'bg-gray-500 border-gray-400 text-white' : 'bg-white border-gray-300'}`}
                          required
                        />
                      </div>
                      <div>
                        <label className={`block text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>To</label>
                        <input
                          type="time"
                          value={formData.availability[day].end_time}
                          onChange={(e) => handleAvailabilityChange(day, 'end_time', e.target.value)}
                          className={`w-full p-1 border rounded ${theme === 'dark' ? 'bg-gray-500 border-gray-400 text-white' : 'bg-white border-gray-300'}`}
                          required
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

         
        </form>
      
       </div>
       </div>
   )
 }
 
 export default ProviderRegistration