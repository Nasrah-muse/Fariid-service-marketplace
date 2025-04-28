import { useState , useEffect} from 'react';
import { useTheme } from '../contexts/ThemeContext';
import bg1 from '../assets/bg1.jpg'
import bg2 from '../assets/bg2.jpg'
import bg3 from '../assets/bg3.jpg'
import bg4 from '../assets/bg4.jpg'
import bg5 from '../assets/bg5.jpg'

import author1 from '../assets/author1.jpg'
import author2 from '../assets/author2.jpg'
import author3 from '../assets/author3.jpg'
import { FaChevronDown } from 'react-icons/fa';
import supabase from '../lib/supabase';
import toast from 'react-hot-toast';

const HomePage = () => {
  const { theme } = useTheme()

   const [currentBgIndex, setCurrentBgIndex] = useState(0);
   const [currentTestimonial, setCurrentTestimonial] = useState(1)
   const [animate, setAnimate] = useState(false)
   const [activeIndex, setActiveIndex] = useState(null);
   const [popularCategories, setPopularCategories] = useState([])
   const [loadingCategories, setLoadingCategories] = useState(false)

const fetchPopularCategories = async () => {
  try {
    setLoadingCategories(true)
    
     const { data: services, error: servicesError } = await supabase
      .from('services')
      .select('id, category_id, categories(name), status')
      .eq('status','approved' )
    
    if (servicesError) throw servicesError

     const categoryCounts = services.reduce((acc, service) => {
      const catId = service.category_id
      acc[catId] = {
        count: (acc[catId]?.count || 0) + 1,
        name: service.categories?.name || 'Uncategorized'
      }
      return acc
    }, {})

    
    const sortedCategories = Object.entries(categoryCounts)
      .map(([id, {name, count}]) => ({ id, name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 4)

    setPopularCategories(sortedCategories)
    
  } catch (error) {
    console.error('Error fetching categories:', error)
    toast.error('Failed to load popular categories')
  } finally {
    setLoadingCategories(false)
  }
}
useEffect(() => {
  fetchPopularCategories()
}, [])

   const backgrounds = [bg1, bg2, bg3, bg4, bg5];

   const testimonials = [
    {
      quote: "This platform has been a game-changer for my business as an electrician. It connects me with clients who need my services, allowing me to focus on delivering quality work. Highly reliable and well-organized!",
      author: "Khalid Ali",
      role: "XYZ Manager",
      image: author1
    },
    {
      quote: "I was impressed by how quickly I found a skilled plumber through this platform. The service provider was punctual, efficient and handled the job with great professional. A seamless experience from start to finish!",
      author: "Ayaan Macalin",
      role: "House Wife",
      image: author2
    },
    {
      quote: "As a small business owner, finding reliable service providers was always challenging. This platform has simplified the process and connected me with trustworthy professionals every time.",
      author: "Hodan Jama",
      role: "Small Business owner",
      image: author3
    }
  ]
  
  const faqs = [
    {
      question: "How can I become a service provider?",
      answer: "Register on our platform, complete your profile, and we'll verify your documents. Once approved, you can start getting customers."
    },
    {
      question: "Are the service providers verified?",
      answer: "Yes, we verify all providers through ID checks and document verification before approval."
    },
    {
      question: "What if I have an issue with a service?",
      answer: "Contact us immediately through the platform. We'll help resolve any service issues quickly."
    },
    {
      question: "How do I make a payment?",
      answer: "Pay securely through DhaqsoPay. We support mobile money and cards. Payment is only released after you confirm the service is complete."
    }
  ]

   useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);
      setTimeout(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
        setAnimate(false)
      }, 300)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const goToTestimonial = (index) => {
    setAnimate(true);
    setTimeout(() => {
      setCurrentTestimonial(index)
      setAnimate(false)
    }, 300)
  }
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  }


  return (
    <>
     <div  className="relative py-12 px-4 sm:px-6 lg:px-8 text-center min-h-screen flex items-center justify-center"
    style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgrounds[currentBgIndex]})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      transition: 'background-image 1s ease-in-out'
    }}
>
<div className={`relative max-w-4xl mx-auto z-10 text-white`}>
        <h1 className="text-4xl font-bold mb-4 text-sky-200">
          Find Trusted <span className='text-orange-600'> Service Providers</span> in Galkayo!
        </h1>
        <p className="text-xl mb-8">
          Easily connect with professional service providers for home repairs, tutoring, beauty services, and more. Safe, fast, and hassle-free!
        </p>
        <div className={`rounded-lg shadow-md p-6 ${theme === 'dark' ? 'bg-indigo-900 bg-opacity-90' : 'bg-white bg-opacity-90'}`}>
          <div className="flex mb-4">
            <input
              type="text"
              className={`flex-grow px-4 py-3 border ${theme === 'dark' ? 'border-indigo-600 bg-indigo-800 text-white' : 'text-blue-500 border-gray-300'} rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
              placeholder="What service are you looking for today?"
            />
            <button className={`px-6 py-3 cursor-pointer ${theme === 'dark' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-500 hover:bg-blue-600'} text-white font-medium rounded-r-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2`}>
              Search
            </button>
          </div>
          
          <div className={`flex flex-wrap items-center justify-center gap-2 ${theme === 'dark' ? 'text-sky-200' : 'text-gray-600'}`}>
            <span>Popular search: </span>
            <button className={`px-3 py-1 ${theme === 'dark' ? 'bg-indigo-700 hover:bg-indigo-600' : 'bg-gray-100 hover:bg-gray-200'} rounded-full transition duration-200`}>
              Plumber
            </button>
            <button className={`px-3 py-1 ${theme === 'dark' ? 'bg-indigo-700 hover:bg-indigo-600' : 'bg-gray-100 hover:bg-gray-200'} rounded-full transition duration-200`}>
              Electrician
            </button>
          </div>
        </div>
       
      </div>


    </div>
    {/* popilar categories */}
 <div className={`py-16 px-4 sm:px-6 lg:px-8 ${theme === 'dark' ? 'bg-indigo-900' : 'bg-gray-50'}`}>
  <div className="max-w-7xl mx-auto">
    <h2 className={`text-4xl font-extrabold text-center mb-12 ${theme === 'dark' ? 'text-white' : 'text-indigo-950'}`}>
     <span className='text-orange-500'>Popluar</span> Categories
    </h2>
    
    {loadingCategories ? (
      <div className="flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    ) : popularCategories.length > 0 ? (
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {popularCategories.map((category) => (
          <div key={category.id} className={`p-6 rounded-lg shadow-lg text-center ${
            theme === 'dark' ? 'bg-indigo-800 text-white' : 'bg-white text-indigo-900'
          }`}>
            <h3 className='text-2xl font-bold' >
              {category.name}
            </h3>
            <p className='mt-2 text-md font-semibold'>
              {category.count || 0} services
            </p>
          </div>
        ))}
      </div>
    ) : (
      <div className={`text-center p-8 rounded-lg ${
        theme === 'dark' ? 'bg-indigo-700 text-indigo-100' : 'bg-gray-100 text-gray-600'
      }`}>
        <p>No categories found</p>
        <button 
          onClick={fetchPopularCategories}
          className={`mt-4 px-4 py-2 rounded-md ${
            theme === 'dark' 
              ? 'bg-indigo-600 hover:bg-indigo-500 text-white' 
              : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-800'
          }`}
        >
          Retry
        </button>
      </div>
    )}
  </div>
</div>
    <div className={`py-16 px-4 sm:px-6 lg:px-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-sky-200'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-4xl font-bold text-center mb-12 ${theme === 'dark' ? 'text-sky-200' : 'text-indigo-900'}`}>
            See What <span className='text-orange-500'>Our Happy Customers</span> Have to Say
          </h2>
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto transition-all duration-500`}>
            {testimonials.map((item, index) => {
              const isActive = index === currentTestimonial
              return (
                <div
                key={index}
                onClick={() => goToTestimonial(index)}
                 className={`
                  cursor-pointer rounded-lg p-6 shadow-lg transition-all duration-300 
                  ${theme === 'dark' ? 'bg-indigo-900 bg-opacity-30 text-white' : 'bg-white'} 
                  ${isActive ? 'scale-105 opacity-100 z-10' : 'scale-95 opacity-60'}
                `}
              >
                <div className="flex flex-col gap-4">
                  <p className="italic text-center">"{item.quote}"</p>
              
                   <div className="flex items-center gap-4 mt-2">
                    <img
                      src={item.image}
                      alt={item.author}
                      className="w-12 h-12 rounded-full object-cover border-2 border-orange-500"
                    />
                    <div>
                      <p className="font-semibold text-orange-500 ">{item.author}</p>
                      <p className={`text-sm ${theme === 'dark'? "text-sky-200" : "text-indigo-900"}`}>{item.role}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              )
            })}
          </div>
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentTestimonial
                    ? theme === 'dark'
                      ? 'bg-orange-400'
                      : 'bg-orange-600'
                    : theme === 'dark'
                    ? 'bg-gray-500'
                    : 'bg-indigo-00'
                }`}
               />
            ))}
          </div>
</div>
</div>
<div className={`py-16 px-4 sm:px-6 lg:px-8 ${theme === 'dark' ? 'bg-sky-200' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto">
        <h2 className={`text-3xl font-bold text-center mb-12 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
         <span className='text-orange-500'> Frequently</span> Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={`border rounded-lg overflow-hidden transition-all duration-300 ${theme === 'dark' ? 'border-gray-700' : 'border-indigo-800'}`}
            >
              <button
                className={`w-full text-left p-6 flex justify-between items-center focus:outline-none ${theme === 'dark' ? 'hover:bg-orange-300' : 'hover:bg-sky-200'}`}
                onClick={() => toggleFAQ(index)}
              >
                <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-indigo-700 ' : 'text-indigo-900'}`}>
                  {faq.question}
                </h3>
                <FaChevronDown
                  className={`text-lg transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''} ${theme === 'dark' ? 'text-indigo-900' : 'text-gray-500'}`}
                />
              </button>
              
              <div 
                className={`px-6 pb-6 pt-0 transition-all duration-300 ${activeIndex === index ? 'block' : 'hidden'} ${theme === 'dark' ? 'text-indigo-400' : 'text-sky-500'}`}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
        </div>
        </div>
</>
   )
}

export default HomePage