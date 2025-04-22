import { useEffect, useState } from "react"
import { useTheme } from "../contexts/ThemeContext"
import supabase from "../lib/supabase"
import { useAuth } from "../contexts/AuthContext"
  
  
 const ServiceRegistration = () => {
  const {theme } = useTheme()
   const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  const { user } = useAuth()
  const [categories, setCategories] = useState([])
  const [selectedFiles, setSelectedFiles] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null);
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

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null)

    try {
      if (selectedFiles.length === 0 || selectedFiles.length > 3) {
        throw new Error('Please upload between 1 to 3 images of your work');
      }

       const imageUrls = await uploadServiceImages();

       const { data: service, error: serviceError } = await supabase
        .from('services')
        .insert({
          ...formData,
          provider_id: user.id,
          status: 'pending',
          service_image_url: imageUrls
        })
        .select()
        .single()

      if (serviceError) throw serviceError

       
       setSuccessMessage('Your service has been submitted for review. Please wait for admin approval')
      
       setFormData({
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
      });
      setSelectedFiles([]);

    } catch (err) {
      setError(err.message || 'Failed to submit service. Please try again.')
    } finally {
      setIsSubmitting(false);
    }
  };

  const uploadServiceImages = async () => {
    const uploadPromises = selectedFiles.map(async (file, index) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${index}-${Date.now()}.${fileExt}`
      
      const { data, error } = await supabase
        .storage
        .from('service-images')
        .upload(fileName, file)
      
      if (error) throw error
      
       const { data: { publicUrl } } = supabase
        .storage
        .from('service-images')
        .getPublicUrl(fileName)
      
      return publicUrl
    })
    
    return await Promise.all(uploadPromises)
  }
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length + selectedFiles.length > 3) {
      setError('You can upload a maximum of 3 images')
      return;
    }
    setSelectedFiles(prev => [...prev, ...files.slice(0, 3 - prev.length)])
  }
  
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
          {successMessage && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className={`p-6 rounded-lg max-w-md w-full mx-4 ${theme === 'dark' ? 'bg-indigo-700' : 'bg-white'}`}>
          <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>
            Submission Successful
          </h3>
          <p className={`mb-6 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
            {successMessage}
          </p>
          <div className="flex justify-end">
            <button
              onClick={() => {
                setSuccessMessage(null);
               }}
              className={`px-4 py-2 rounded-md font-medium ${theme === 'dark' ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'bg-indigo-800 hover:bg-indigo-900 text-white'}`}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    )}
       <div className={`max-w-4xl mx-auto p-6 rounded-lg ${theme === 'dark' ? 'bg-indigo-600 shadow-xl' : 'bg-white shadow-md'}`}>
            <h2 className={`text-2xl font-bold mb-6 text-center ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>
              Service Registration
        </h2>
        {error && (
          <div className={`mb-4 p-3 rounded-md ${theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-700'}`}>
            {error}
          </div>
        )}
        {/*  Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
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
             {/* images of service */}
          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>
              Service Images (Maximum 3)*
            </h3>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className={`w-full p-2 border rounded ${theme === 'dark' ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'}`}
              required
            />
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedFiles.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className="h-24 w-24 object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={() => setSelectedFiles(selectedFiles.filter((_, i) => i !== index))}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
           <div className="flex justify-end">
           <button
            type="submit"
            disabled={isSubmitting || selectedFiles.length === 0 || selectedFiles.length > 3}
            className={`px-6 py-2 rounded-md font-medium ${theme === 'dark' ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'bg-indigo-800 hover:bg-indigo-900 text-white'} ${(isSubmitting || selectedFiles.length === 0 || selectedFiles.length > 3) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Registration'}
          </button>
          </div>

          </div>
        </form>
      
       </div>
       </div>
   )
 }
 
 export default ServiceRegistration