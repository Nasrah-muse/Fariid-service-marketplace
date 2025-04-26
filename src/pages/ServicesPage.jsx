import { useEffect, useState } from "react";
import { useTheme } from "../contexts/ThemeContext"
import { FiSearch, FiStar } from "react-icons/fi";
import supabase from "../lib/supabase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export const StarRating = ({ rating = 0, theme }) => {
   const validatedRating = Math.min(Math.max(Number(rating) || 0, 0), 5);
  
  const fullStars = Math.floor(validatedRating);
  const hasHalfStar = validatedRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center mt-1">
      <div className="flex">
        {[...Array(Math.max(0, fullStars))].map((_, i) => (
          <FiStar 
            key={`full-${i}`} 
            className={`w-4 h-4 ${theme === 'dark' ? 'text-orange-600 ' : 'text-orange-400'}`} 
          />
        ))}
        {hasHalfStar && (
          <div className="relative w-4 h-4">
            <FiStar className={`w-4 h-4 ${theme === 'dark' ? 'text-indigo-400' : 'text-sky-300'}`} />
            <div className="absolute left-0 top-0 w-1/2 overflow-hidden">
              <FiStar className={`w-4 h-4 ${theme === 'dark' ? 'text-orange-500' : 'text-yellow-500'}`} />
            </div>
          </div>
        )}
        {[...Array(Math.max(0, emptyStars))].map((_, i) => (
          <FiStar 
            key={`empty-${i}`} 
            className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-300'}`} 
          />
        ))}
      </div>
      <span className={`ml-1 text-xs ${theme === 'dark' ? 'text-indigo-900' : 'text-sky-200'}`}>
        ({validatedRating.toFixed(1)})
      </span>
    </div>
  )
}

const ServicesPage = () => {
  const {theme} = useTheme()
  const navigate = useNavigate()

  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [services, setServices] = useState([])
  const [providers, setProviders] = useState({})
   const [selectedCategory, setSelectedCategory] = useState('All Services')
   const [priceFilter, setPriceFilter] = useState('basic')
  const [sortOption, setSortOption] = useState('price-asc')

  const generateRandomRating = () => {
    return Math.round((Math.random() * 4 + 3) * 2) / 2
  }
  const getAvatarUrl = (avatarPath) => {
    if (!avatarPath) return null;
    if (avatarPath.startsWith('http')) return avatarPath;
    const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(avatarPath)
    return publicUrl
  }

  const parseServiceImages = (imageData) => {
    try {
      if (!imageData) return []
  
       if (Array.isArray(imageData)) {
        return imageData.map(url => typeof url === 'string' ? url.replace(/\\/g, '') : url)
      }
  
       if (typeof imageData === 'string') {
         let cleanString = imageData
          .replace(/^\{/, '')
          .replace(/\}$/, '')
          .replace(/\\"/g, '"')
          .trim()
  
         try {
           if (cleanString.startsWith('[') && cleanString.endsWith(']')) {
            const parsed = JSON.parse(cleanString);
            return Array.isArray(parsed) 
              ? parsed.map(url => typeof url === 'string' ? url.replace(/\\/g, '') : url)
              : [parsed]
          }
  
           const parsed = JSON.parse(cleanString)
          if (typeof parsed === 'string') {
            try {
              const innerParsed = JSON.parse(parsed)
              return Array.isArray(innerParsed) ? innerParsed : [innerParsed]
            } catch {
              return [parsed]
            }
          }
  
          return Array.isArray(parsed) ? parsed : [parsed]
        } catch (e) {
           return [cleanString.replace(/^"+|"+$/g, '')]
        }
      }
  
      return [];
    } catch (err) {
      console.error("Failed to parse service_image_url:", imageData, err)
      return []
    }
  }

  
  useEffect(() => {
    const fetchData = async () => {;
      try {
        setLoading(true);

         const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*');
        if (categoriesError) throw categoriesError;

         const { data: servicesData, error: servicesError } = await supabase
          .from('services')
          .select('*, categories(name)')
          .neq('status', 'pending')
          .neq('status', 'rejected')
        if (servicesError) throw servicesError

         const processedServices = servicesData.map(service => {
          const imageUrls = parseServiceImages(service.service_image_url)
          
           let firstImageUrl = null
          if (imageUrls.length > 0) {
            firstImageUrl = imageUrls[0]
             if (typeof firstImageUrl === 'string') {
              firstImageUrl = firstImageUrl.replace(/\\/g, '').replace(/^"+|"+$/g, '')
              
               if (firstImageUrl.startsWith('[') || firstImageUrl.startsWith('{')) {
                const cleaned = parseServiceImages(firstImageUrl)
                firstImageUrl = cleaned[0] || null
              }
            } else {
              firstImageUrl = null
            }
          }
        
          console.log('Processed service image:', {
            raw: service.service_image_url,
            parsed: imageUrls,
            firstImage: firstImageUrl
          })
        
          return {
            ...service,
            firstImageUrl,
            rating: Number(service.rating) || generateRandomRating() 
          }
        })

         const providerIds = [...new Set(processedServices.map(service => service.provider_id))];

         const { data: providersData, error: providersError } = await supabase
          .from('users')
          .select('id, username, avatar_url, role')
          .in('id', providerIds);
        if (providersError) throw providersError

         const providersMap = {};
        providersData.forEach(provider => {
          providersMap[provider.id] = {
            ...provider,
            formattedAvatarUrl: getAvatarUrl(provider.avatar_url),
          }
        })
        setCategories([{ id: 0, name: 'All Services' }, ...categoriesData])
        setServices(processedServices);
        setProviders(providersMap);
      } catch (error) {
        console.error('Error fetching data:', error)
        toast.error('Failed to load data')
      } finally {
        setLoading(false)
      }
    };

    fetchData()
  }, [])
  
  const filteredServices = services.filter(service => {
    const matchesCategory =
      selectedCategory === 'All Services' || service.categories?.name === selectedCategory;
    const matchesSearch = service.title?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getPrice = (service) => {
    switch (priceFilter) {
      case 'standard': return service.standard_price || 0
      case 'premium': return service.premium_price || 0
      default: return service.basic_price || 0
    }
  }

  const sortedServices = [...filteredServices].sort((a, b) => {
    const priceA = getPrice(a);
    const priceB = getPrice(b);
    const ratingA = Number(a.rating) || 0
  const ratingB = Number(b.rating) || 0
    switch (sortOption) {
      case 'price-desc': return priceB - priceA;
      case 'price-asc':  return priceA - priceB
    case 'rating-desc': return ratingB - ratingA || priceA - priceB
    case 'rating-asc':  return ratingA - ratingB || priceA - priceB
    default: return priceA - priceB
    }
  })

  if (loading) {
    return (
      <div className={`flex justify-center items-center h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }
  const handleServiceSelect = (serviceId) => {
    navigate(`/service/${serviceId}`);
  }




  return (
    <div  className={`min-h-screen p-6 mt-20 ${theme === 'dark' ? 'bg-indigo-900' : 'bg-gray-50'}`}>
       
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-2xl">
          <input
            type="text"
            placeholder="Search for services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full px-4 py-3 rounded-lg text-lg ${
              theme === 'dark'
                ? 'bg-indigo-700 text-white placeholder-gray-300 focus:ring-orange-500'
                : 'bg-white text-indigo-900 placeholder-indigo-800 border border-gray-300 focus:ring-orange-500'
            } focus:outline-none focus:ring-2`}
          />
          <span className={`absolute right-3 top-4 text-xl   ${theme === 'dark'? 'text-sky-200' : 'text-indigo-800'}`}>
          <FiSearch/>
          </span>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map(category => (
          <button
            key={category.id || 0}
            onClick={() => setSelectedCategory(category.name)}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedCategory === category.name
                ? theme === 'dark'
                  ? 'bg-sky-300 text-indigo-900 hover:bg-sky-500 hover:text-white'
                  : 'bg-indigo-900 text-white hover:bg-blue-600'
                : theme === 'dark'
                  ? 'bg-white text-indigo-900 hover:bg-indigo-600'
                  : 'bg-white text-indigo-900 border border-gray-500 hover:bg-gray-50'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex gap-2 items-center">
          <label className={`text-md font-bold ${theme === 'dark' ? 'text-sky-200' : 'text-indigo-900'}`}>
            Price Tier:
          </label>
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className={`px-4 py-2 rounded-lg ${
              theme === 'dark'
                ? 'bg-white text-indigo-900 focus:ring-blue-500'
                : 'bg-indigo-800 text-white border border-gray-300 focus:ring-blue-500'
            } focus:outline-none focus:ring-2`}
          >
            <option value="basic">Basic</option>
            <option value="standard">Standard</option>
            <option value="premium">Premium</option>
          </select>
        </div>

        <div className="flex gap-2 items-center">
          <label className={`text-md font-bold ${theme === 'dark' ? 'text-sky-200' : 'text-indigo-900'}`}>
            Sort By:
          </label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className={`px-4 py-2 rounded-lg ${
              theme === 'dark'
                  ? 'bg-white text-indigo-900 focus:ring-blue-500'
                : 'bg-indigo-800 text-white border border-gray-300 focus:ring-blue-500'
            } focus:outline-none focus:ring-2`}
          >
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Top Rated</option>
            <option value="rating-asc">Lowest Rated</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedServices.length > 0 ? (
          sortedServices.map(service => {
            const provider = providers[service.provider_id]
            const price = getPrice(service)

            return (
              <div 
                key={service.id} 
                className={`rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow ${
                  theme === 'dark' ? 'bg-sky-200' : 'bg-indigo-900'
                }`}
                onClick={() => handleServiceSelect(service.id)}
              >
                <div className="relative h-42 w-full mb-2 bg-gray-100 rounded-lg overflow-hidden">
              {service.firstImageUrl && typeof service.firstImageUrl === 'string' ? (
                <img
                  src={service.firstImageUrl}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error('Image failed to load:', service.firstImageUrl);
                    e.target.src = 'https://placehold.co/300x200?text=Image+Not+Found';
                    e.target.className = 'w-full h-full object-contain rounded bg-gray-100 p-2';
                  }}
                  loading="lazy"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-4">
                    <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="mt-2 text-sm text-gray-500">No image available</p>
                  </div>
                </div>
              )}
               </div>
                  <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-indigo-900' : 'text-sky-200'}`}>
                  {service.title}
                  <StarRating rating={service.rating} theme={theme} />
                 </h3>

                 <div className={`my-3 h-px ${theme === 'dark' ? 'bg-orange-500' : 'bg-gray-200'}`} />

                 <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {provider?.formattedAvatarUrl && (
                      <img
                        src={provider.formattedAvatarUrl}
                        alt={provider.username}
                        className={`w-8 h-8 rounded-full object-cover border  ${theme === 'dark'? 'border-indigo-900': 'border-orange-500'}`}
                        onError={(e) => {
                          e.target.src = 'https://placehold.co/40x40?text=No+Image';
                        }}
                      />
                    )}
                    <p className={`text-md font-bold ${theme === 'dark' ? 'text-indigo-900' : 'text-orange-500'}`}>
                      {provider?.username || 'Unknown Provider'}
                    </p>
                  </div>
                  <p className={`text-md font-semibold px-2 py-1 rounded ${theme === 'dark' ? 'bg-indigo-900 text-white' : 'bg-orange-500 text-white'}`}>
                    From ${price}
                  </p>
                </div>
        
              </div>
            )
          })
        ) : (
          <p className={`col-span-full text-center text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            No services found matching your search.
          </p>
        )}
      </div>


      </div>
  )
}

export default ServicesPage