import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import supabase from "../lib/supabase";
import toast from "react-hot-toast";
import { useTheme } from "../contexts/ThemeContext";
import { StarRating } from "./ServicesPage";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import MessageModal from "../components/MessageModal";
import BookingForm from "../components/BookingForm";

 
const ServiceDetails = () => {
  const { id } = useParams()
   const { theme } = useTheme()
   const navigate = useNavigate()
  const [service, setService] = useState(null)
  const [provider, setProvider] = useState(null)
  const [loading, setLoading] = useState(true)
  const [serviceImages, setServiceImages] = useState([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedPriceTier, setSelectedPriceTier] = useState('basic')
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false)

  const [currentUser, setCurrentUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  
   useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoadingUser(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
           const { data: userData, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', user.id)
            .single();
            
          if (error) throw error;
          setCurrentUser(userData);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoadingUser(false);
      }
    };
    
    fetchUser();
  }, []);
  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        setLoading(true)
        
        const { data: serviceData, error: serviceError } = await supabase
          .from('services')
          .select('*, categories(name)')
          .eq('id', id)
          .single()
        
        if (serviceError) throw serviceError;
        if (!serviceData) throw new Error('Service not found')

        const { data: providerData, error: providerError } = await supabase
          .from('users')
          .select('id, username, avatar_url, role')
          .eq('id', serviceData.provider_id)
          .single()
        
        if (providerError) throw providerError;

        setService(serviceData)
        setProvider(providerData)
          const images = parseServiceImages(serviceData.service_image_url)
          console.log('Parsed images:', images) 
         setServiceImages(images)
         setService(serviceData)
         setProvider(providerData)
      } catch (error) {
        console.error('Error fetching service details:', error)
        toast.error('Failed to load service details')
       } finally {
        setLoading(false)
      }
    };

    fetchServiceDetails()
  }, [id])

  const getAvatarUrl = (avatarPath) => {
    if (!avatarPath) return null
    if (avatarPath.startsWith('http')) return avatarPath;
    const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(avatarPath)
    return publicUrl
  }

  const parseServiceImages = (imageData) => {
    try {
      if (!imageData) return []
  
       if (Array.isArray(imageData)) {
        return imageData.map(url => cleanUrl(url))
      }
  
       if (typeof imageData === 'string') {
         let cleanString = imageData.replace(/\\/g, '').replace(/^"+|"+$/g, '')
        
         cleanString = cleanString.replace(/https:\/\//g, 'https://')
        
         try {
          const parsed = JSON.parse(cleanString);
          if (Array.isArray(parsed)) {
            return parsed.map(url => cleanUrl(url));
          }
          return [cleanUrl(parsed)];
        } catch (e) {
           const urlMatches = cleanString.match(/https?:\/\/[^\s,"']+/g)
          return urlMatches ? urlMatches.map(url => cleanUrl(url)) : []
        }
      }
  
      return [];
    } catch (err) {
      console.error("Failed to parse service_image_url:", imageData, err)
      return []
    }
  }
  
   const cleanUrl = (url) => {
    if (typeof url !== 'string') return url
    return url.replace(/\\/g, '')
             .replace(/^"+|"+$/g, '')
             .replace(/https:\/\//g, 'https://')
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === serviceImages.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? serviceImages.length - 1 : prevIndex - 1
    )
  }

  const handleContinue = () => {
    if (currentUser?.role === 'customer') {
      setShowBookingForm(true)
    } else {
      toast.error('Only customers can book services.')
    }
  }
  

  if (loading) {
    return (
      <div className={`flex justify-center items-center h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className={`flex justify-center items-center h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <p className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Service not found</p>
      </div>
    )
  }


  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-indigo-900' : 'bg-gray-50'}`}>
<div className="relative h-80 w-full">
  {serviceImages.length > 0 ? (
    <img
      src={serviceImages[0]}
      alt={service.title}
      className="w-full h-full object-cover"
      onError={(e) => {
        console.error('Failed to load image:', {
          originalUrl: serviceImages[0],
          parsedImages: serviceImages
        });
        e.target.src = 'https://placehold.co/1200x600?text=Image+Not+Found';
        e.target.className = 'w-full h-full object-contain bg-gray-100 p-4';
      }}
       
    />
  ) : (
    <div className=" bg-gray-200 flex items-center justify-center">
      <div className="text-center">
        <svg className="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="mt-2 text-gray-500">No images available</p>
        {service.service_image_url && (
          <p className="text-xs text-gray-400 mt-1">
            Raw data: {typeof service.service_image_url === 'string' 
              ? service.service_image_url.substring(0, 100) + (service.service_image_url.length > 100 ? '...' : '')
              : 'Non-string data'}
          </p>
        )}
      </div>
    </div>
  )}
  <div className={`absolute inset-0 bg-gradient-to-t ${theme === 'dark' ? 'from-indigo-900' : 'from-sky-300'} to-transparent`}></div>
        
         <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="max-w-4xl mx-auto flex items-end justify-between">
            <div className="flex flex-col items-center gap-2">
              <h1 className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>
                {service.title}
              </h1>
              <div className="flex items-center mt-2">
                {provider?.avatar_url && (
                  <img
                    src={getAvatarUrl(provider.avatar_url)}
                    alt={provider.username}
                    className={`w-20 h-20 rounded-full object-cover border-2 ${theme === 'dark' ? 'border-white' : 'border-orange-500'}`}
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/40x40?text=No+Image'
                    }}
                  />
                )}
                <div className="ml-3">
                  <p className={`font-semibold text-2xl ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>
                    {provider?.username || 'Unknown Provider'}
                  </p>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-indigo-700'}`}>
                    {provider?.role || 'Service Provider'}
                  </p>
                </div>
              </div>
            </div>
            <StarRating rating={service.rating || 5 }  />
          </div>
        </div>
        </div>

<div className="max-w-6xl mx-auto grid grid-col-1 md:grid-cols-2 gap-4 mt-12 ">
<div className="container mx-auto px-4 mb-12">
  {serviceImages.length > 0 && (
    <>
      <div className="relative">
         <div className="relative h-64 md:h-96 w-full overflow-hidden rounded-lg">
          {serviceImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${service.title} ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0'
              }`}
              onError={(e) => {
                e.target.src = 'https://placehold.co/800x600?text=Image+Not+Found';
                e.target.className = `absolute inset-0 w-full h-full object-contain bg-gray-100 p-4 transition-opacity duration-300 ${
                  index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0'
                }`
              }}
            />
          ))}
        </div>
        
         {serviceImages.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className={`absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full ${
                theme === 'dark' ? 'bg-indigo-800 text-white' : 'bg-white text-indigo-900'
              } shadow-md hover:scale-110 transition-transform z-20`}
              aria-label="Previous image"
            >
              <FiChevronLeft size={24} />
            </button>
            <button 
              onClick={nextImage}
              className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full ${
                theme === 'dark' ? 'bg-indigo-800 text-white' : 'bg-white text-indigo-900'
              } shadow-md hover:scale-110 transition-transform z-20`}
              aria-label="Next image"
            >
              <FiChevronRight size={24} />
            </button>
          </>
        )}

         {serviceImages.length > 1 && (
          <div className="flex justify-center mt-4 gap-2 overflow-x-auto py-2">
            {serviceImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentImageIndex 
                    ? (theme === 'dark' ? 'border-white scale-105' : 'border-indigo-900 scale-105') 
                    : (theme === 'dark' ? 'border-gray-600 opacity-70' : 'border-gray-300 opacity-70')
                }`}
                aria-label={`Go to image ${index + 1}`}
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/100?text=Image+Not+Found';
                    e.target.className = 'w-full h-full object-contain bg-gray-100 p-1';
                  }}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  )}
</div>
         <div className="container">
          <div className="grid grid-cols-3  gap-4 mb-6">
            <button
              onClick={() => setSelectedPriceTier('basic')}
              className={`p-4 rounded-lg text-left transition-all ${selectedPriceTier === 'basic' ? (theme === 'dark' ? 'bg-indigo-700 border-2 border-white' : 'bg-indigo-900 border-2 border-orange-500') : (theme === 'dark' ? 'bg-indigo-800' : 'bg-indigo-100')}`}
            >
              <h3 className={`text-xl font-bold mb-2 ${selectedPriceTier === 'basic' ? (theme === 'dark' ? 'text-white' : 'text-white') : (theme === 'dark' ? 'text-white' : 'text-indigo-900')}`}>
                Basic
              </h3>
              <p className={`text-lg font-semibold mb-3 ${selectedPriceTier === 'basic' ? (theme === 'dark' ? 'text-white' : 'text-white') : (theme === 'dark' ? 'text-gray-300' : 'text-indigo-700')}`}>
                ${service.basic_price || 'N/A'}
              </p>
            </button>

            <button
              onClick={() => setSelectedPriceTier('standard')}
              className={`p-4 rounded-lg text-left transition-all ${selectedPriceTier === 'standard' ? (theme === 'dark' ? 'bg-indigo-700 border-2 border-white' : 'bg-indigo-900 border-2 border-orange-500') : (theme === 'dark' ? 'bg-indigo-800' : 'bg-indigo-100')}`}
            >
              <h3 className={`text-xl font-bold mb-2 ${selectedPriceTier === 'standard' ? (theme === 'dark' ? 'text-white' : 'text-white') : (theme === 'dark' ? 'text-white' : 'text-indigo-900')}`}>
                Standard
              </h3>
              <p className={`text-lg font-semibold mb-3 ${selectedPriceTier === 'standard' ? (theme === 'dark' ? 'text-white' : 'text-white') : (theme === 'dark' ? 'text-gray-300' : 'text-indigo-700')}`}>
                ${service.standard_price || 'N/A'}
              </p>
            </button>

            <button
              onClick={() => setSelectedPriceTier('premium')}
              className={`p-4 rounded-lg text-left transition-all ${selectedPriceTier === 'premium' ? (theme === 'dark' ? 'bg-indigo-700 border-2 border-white' : 'bg-indigo-900 border-2 border-orange-500') : (theme === 'dark' ? 'bg-indigo-800' : 'bg-indigo-100')}`}
            >
              <h3 className={`text-xl font-bold mb-2 ${selectedPriceTier === 'premium' ? (theme === 'dark' ? 'text-white' : 'text-white') : (theme === 'dark' ? 'text-white' : 'text-indigo-900')}`}>
                Premium
              </h3>
              <p className={`text-lg font-semibold mb-3 ${selectedPriceTier === 'premium' ? (theme === 'dark' ? 'text-white' : 'text-white') : (theme === 'dark' ? 'text-gray-300' : 'text-indigo-700')}`}>
                ${service.premium_price || 'N/A'}
              </p>
            </button>
          </div>

           <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-indigo-800' : 'bg-indigo-100'}`}>
            {selectedPriceTier === 'basic' && (
              <>
                <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>Basic Package Includes:</h3>
                <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-indigo-800'}`}>
                {service.basic_description.split('.').filter(item => item.trim()).map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">-</span>
                      <span>{item.trim()}</span>
                    </li>
                  ))}      
                </ul>
              </>
            )}
            {selectedPriceTier === 'standard' && (
              <>
                <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>Standard Package Includes:</h3>
                <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-indigo-800'}`}>
                {service.standard_description.split('.').filter(item => item.trim()).map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">-</span>
                      <span>{item.trim()}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {selectedPriceTier === 'premium' && (
              <>
                <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>Premium Package Includes:</h3>
                <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-indigo-800'}`}>
                {service.premium_description.split('.').filter(item => item.trim()).map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">-</span>
                    <span>{item.trim()}</span>
                  </li>
                ))}
                </ul>
              </>
            )}
         
          </div>
         <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
          <button
            onClick={() => navigate('/services')}
            className={`px-8 py-3 rounded-lg font-medium ${theme === 'dark' ? 'bg-white text-indigo-900 hover:bg-gray-200' : 'bg-gray-300 text-indigo-900 hover:bg-gray-400'}`}
          >
            Back to Services
          </button>
          <button
            onClick={() => setShowMessageModal(true)}
            className={`px-8 py-3 rounded-lg font-medium ${theme === 'dark' ? 'bg-orange-600 text-white hover:bg-orange-700' : 'bg-indigo-900 text-white hover:bg-indigo-800'}`}
          >
            Contact Me
          </button>
          <button
              onClick={handleContinue}
            className={`px-8 py-3 rounded-lg font-medium ${theme === 'dark' ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
          >
            Continue
          </button>
        </div>

        </div>
    
    </div>
    <div className="max-w-6xl p-6">
    <div className={`inline-flex flex-col  ${theme === 'dark'? 'bg-indigo-600 text-white' : 'bg-white text-indigo-800'} rounded-lg shadow-md p-6 max-w-md mx-auto`}>
       <h2 className="text-xl font-bold mb-4">
        What people say about this Provider
      </h2>
      
       <div className="border-t pt-4">
         <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold">Nasra Muse</h3>
             <div className="flex items-center mt-1">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i} 
                  className={`w-4 h-4 ${i < 5 ? 'text-orange-500' : 'text-gray-300'}`} 
                />
              ))}
              <span className="ml-1 text-sm text-gray-600">5</span>
            </div>
          </div>
          <span className="text-s">3 days ago</span>
        </div>
        
         <p className=" mt-3">
         Extremely respectful and professional! Worked diligently to complete the job perfectly. Highly recommend for their strong work ethic and attention to detail
        </p>
      </div>
      </div>
</div>

    
{showMessageModal && (
  <MessageModal 
  provider={provider}
  service={service}
  theme={theme}
  onClose={() => setShowMessageModal(false)}
  currentUser={currentUser}
  />
)}
{showBookingForm && (
  <BookingForm 
    service={service}
    provider={provider}
    currentUser={currentUser}
    onClose={() => setShowBookingForm(false)}
  />
)}



       </div>
  )
}

export default ServiceDetails