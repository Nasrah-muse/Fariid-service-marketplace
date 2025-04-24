import { useEffect, useState } from "react";
import { useTheme } from "../contexts/ThemeContext"
import { FiSearch } from "react-icons/fi";
import supabase from "../lib/supabase";
import toast from "react-hot-toast";

 
const ServicesPage = () => {
  const {theme} = useTheme()

  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [services, setServices] = useState([])
  const [providers, setProviders] = useState({})
   const [selectedCategory, setSelectedCategory] = useState('All Services')
   const [priceFilter, setPriceFilter] = useState('basic')
  const [sortOption, setSortOption] = useState('price-asc')

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
            firstImageUrl
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



      </div>
  )
}

export default ServicesPage