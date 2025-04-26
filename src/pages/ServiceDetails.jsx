import { useEffect, useState } from "react";
import { useParams } from "react-router";
import supabase from "../lib/supabase";
import toast from "react-hot-toast";
import { useTheme } from "../contexts/ThemeContext";
import { StarRating } from "./ServicesPage";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
 
const ServiceDetails = () => {
  const { id } = useParams()
   const { theme } = useTheme()
  const [service, setService] = useState(null)
  const [provider, setProvider] = useState(null)
  const [loading, setLoading] = useState(true)
  const [serviceImages, setServiceImages] = useState([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

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

<div className="max-w-6xl mx-auto grid grid-col-1 md:grid-cols-2 mt-12 ">
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

</div>

    
    

       </div>
  )
}

export default ServiceDetails