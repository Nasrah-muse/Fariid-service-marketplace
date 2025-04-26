 import { FiMail, FiPhone, FiSend, FiSmartphone } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';
 
const ContactPage = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-indigo-900 text-white' : 'bg-gray-50 text-indigo-900 '}`}>
       <div className={`relative  py-20 bg-gradient-to-r mt-20 ${theme === 'dark' ? 'from-indigo-900 to-indigo-600' : 'from-sky-400 to-orange-600'}`}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className={`text-4xl md:text-5xl font-bold  ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}    `}>
            Get Tech with Us
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${theme === 'dark' ? 'text-white' : 'text-indigo-800'}`}>
            Connect with our tech experts and take your business to the next level
          </p>
        </div>
      </div>
   <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
     <div className={`p-6 rounded-lg shadow-lg md:col-span-2 ${theme === 'dark' ? 'bg-indigo-800' : 'bg-white'}`}>
      <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>
      Send Us a Message
      </h2>
      <form>
        <div className="mb-4">
          <label htmlFor="name" className={`block mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Name*
          </label>
          <input
            type="text"
            id="name"
            className={`w-full px-3 py-2 border rounded-md ${theme === 'dark' ? 'bg-indigo-700 border-indigo-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className={`block mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Email*
          </label>
          <input
            type="email"
            id="email"
            className={`w-full px-3 py-2 border rounded-md ${theme === 'dark' ? 'bg-indigo-700 border-indigo-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="subject" className={`block mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Subject*
          </label>
          <input
            type="text"
            id="subject"
            className={`w-full px-3 py-2 border rounded-md ${theme === 'dark' ? 'bg-indigo-700 border-indigo-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="message" className={`block mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Message*
          </label>
          <textarea
            id="message"
            rows="4"
            className={`w-full px-3 py-2 border rounded-md ${theme === 'dark' ? 'bg-indigo-700 border-indigo-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md ${theme === 'dark' ? 'bg-sky-200 hover:bg-sky-300 text-indigo-900' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
        >
          Send Message <FiSend/>
        </button>
      </form>
    </div>
    <div className={`p-6 h-70 flex flex-col items-center rounded-lg shadow-lg ${theme === 'dark' ? 'bg-indigo-800' : 'bg-white'}`}>
      <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>
        Our Contact
      </h2>

      <div className="space-y-4">
        <div>
          <h3 className={`text-md font-medium flex items-center justify-between gap-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          <FiSmartphone/>  Phone Number
          </h3>
          <p className={`mt-1 ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>
            123-456-7890
          </p>
        </div>

        <div>
          <h3 className={`text-md font-medium  flex items-center justify-between gap-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          <FiPhone/>    Mobile Number
          </h3>
          <p className={`mt-1 ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>
            +123-456-7890
          </p>
        </div>

        <div>
          <h3 className={`text-md font-medium  flex items-center justify-between gap-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
           <FiMail/>  Email Address
          </h3>
          <p className={`mt-1 ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>
            info@fariid.com
          </p>
        </div>
      </div>
    </div>
  </div>
</div>


    </div>
  )
}

export default ContactPage