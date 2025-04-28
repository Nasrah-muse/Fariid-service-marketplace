 import { useTheme } from "../contexts/ThemeContext";
 import { FiAward, FiGlobe, FiLayers, FiShield, FiUsers, FiZap } from "react-icons/fi";

 
const AboutPage = () => {
  const { theme } = useTheme()
 
  return (
    <div className={`min-h-screen mt-12 ${theme === 'dark' ? 'bg-indigo-900 text-white' : 'bg-gray-50 text-indigo-900'}`}>
      <div className={`max-w-full h-96  px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-r ${theme === 'light'? "from-indigo-900 to-orange-500" :"from-indigo-600 to-sky-200"  } `}>
         <div className="text-center mb-16">
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-sky-200'}`}>
            About Us
          </h1>
        </div>
        </div>
         <section className="w-full">
          <div className="max-w-4xl mx-auto  px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-center text-3xl font-bold mb-4"><span className="text-orange-600">Our</span> Vision</h1>
          <div className="grid md:grid-cols-3 gap-8">
            <div className={`flex flex-col items-center justify-center ${theme === 'dark'? 'bg-indigo-700': 'bg-white'} shadow-lg rounded p-4 gap-1`}>
            <h2 className="text-2xl font-bold ">01</h2>
              <p className="text-center font-semibold">
              To connect skilled professionals with clients who need their services, making work easier for everyone
              </p>
            </div>
            <div className={`flex flex-col items-center justify-center ${theme === 'dark'? 'bg-indigo-700': 'bg-white'} shadow-lg rounded p-4 gap-1`}>
            <h2 className="text-2xl font-bold ">02</h2>
              <p className="text-center font-semibold">
              A world where finding the right service is quick, easy, and fair for both providers and customers.
              </p>
            </div>
            <div className={`flex flex-col items-center justify-center ${theme === 'dark'? 'bg-indigo-700': 'bg-white'} shadow-lg rounded p-4 gap-1`}>
            <h2 className="text-2xl font-bold ">03</h2>
              <p className="text-center font-semibold">
              Helping people grow their businesses and careers through trusted service partnerships
              </p>
            </div>
          </div>
          </div>
        </section>
         <section className="w-full relative py-20 bg-[url('https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGN1c3RvbWVyJTIwc2VydmljZXxlbnwwfHwwfHx8MA%3D%3D')] bg-fixed bg-cover">
         <h1 className="text-center text-3xl font-bold mb-4 text-indigo-600"><span className="text-orange-600">Our</span> Mission</h1>
          <div className="max-w-4xl mx-auto  px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className={`flex flex-col items-center justify-center ${theme === 'dark'? 'bg-indigo-700': 'bg-white'} shadow-lg rounded p-4 gap-1`}>
            <h2 className={`text-2xl font-bold px-2 py-1 rounded ${theme === 'dark'? 'bg-orange-500 text-sky-200': 'bg-sky-200 text-orange-500'}`}>01</h2>
              <p className="text-center font-semibold">
              To create the simplest, most reliable platform where skilled professionals and clients connect effortlessly – making quality services accessible to everyone
              </p>
            </div>
            <div className={`flex flex-col items-center justify-center ${theme === 'dark'? 'bg-indigo-700': 'bg-white'} shadow-lg rounded p-4 gap-1`}>
            <h2 className={`text-2xl font-bold px-2 py-1 rounded ${theme === 'dark'? 'bg-orange-500 text-sky-200': 'bg-sky-200 text-orange-500'}`}>02</h2>
              <p className="text-center font-semibold">
              We're building a marketplace that puts people first, ensuring fair opportunities for service providers and trusted solutions for clients in one seamless platform
              </p>
            </div>
            <div className={`flex flex-col items-center justify-center ${theme === 'dark'? 'bg-indigo-700': 'bg-white'} shadow-lg rounded p-4 gap-1`}>
            <h2 className={`text-2xl font-bold px-2 py-1 rounded ${theme === 'dark'? 'bg-orange-500 text-sky-200': 'bg-sky-200 text-orange-500'}`}>03</h2>
              <p className="text-center font-semibold">
              Our mission is to remove barriers in service commerce by combining smart technology with human expertise – helping businesses grow and professionals thrive
              </p>
            </div>
          </div>
          </div>
        </section>
         <section className="w-full mt-12">
         <h1 className={`text-center text-3xl font-bold mb-4 ${theme === 'dark'? 'text-white': 'text-indigo-600'}`}><span className="text-orange-600">Our</span> Values</h1>
          <div className="max-w-4xl mx-auto  px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className={`flex flex-col items-center justify-center ${theme === 'dark'? 'bg-indigo-700': 'bg-white'} shadow-lg rounded p-4 gap-1`}>
              <FiZap/>
            <h2 className={`text-xl font-bold   rounded ${theme === 'dark'? '  text-sky-200': '  text-orange-500'}`}>Innovation</h2>
              <p className="text-center font-sm">
              To create the simplest, most reliable platform where skilled professionals and clients connect effortlessly – making quality services accessible to everyone
              </p>
            </div>
            <div className={`flex flex-col items-center justify-center ${theme === 'dark'? 'bg-indigo-700': 'bg-white'} shadow-lg rounded p-4 gap-1`}>
              <FiShield/>
            <h2 className={`text-xl font-bold   rounded ${theme === 'dark'? '  text-sky-200': '  text-orange-500'}`}>Trust</h2>
              <p className="text-center font-sm">
              Every interaction on our platform is built on transparency, verified reviews, and secure transactions to foster genuine confidence
              </p>
            </div>
            <div className={`flex flex-col items-center justify-center ${theme === 'dark'? 'bg-indigo-700': 'bg-white'} shadow-lg rounded p-4 gap-1`}>
              <FiAward/>
            <h2 className={`text-xl font-bold   rounded ${theme === 'dark'? '  text-sky-200': '  text-orange-500'}`}>Quality</h2>
              <p className="text-center font-sm">
              We maintain rigorous standards so clients consistently receive exceptional service and professionals get rewarding opportunities
              </p>
            </div>
            <div className={`flex flex-col items-center justify-center ${theme === 'dark'? 'bg-indigo-700': 'bg-white'} shadow-lg rounded p-4 gap-1`}>
              <FiGlobe/>
            <h2 className={`text-xl font-bold   rounded ${theme === 'dark'? '  text-sky-200': '  text-orange-500'}`}>Accessibility</h2>
              <p className="text-center font-sm">
              Our marketplace breaks down barriers - making professional services available to all businesses regardless of size or budget
              </p>
            </div>
           
            <div className={`flex flex-col items-center justify-center ${theme === 'dark'? 'bg-indigo-700': 'bg-white'} shadow-lg rounded p-4 gap-1`}>
              <FiLayers/>
            <h2 className={`text-xl font-bold   rounded ${theme === 'dark'? '  text-sky-200': '  text-orange-500'}`}>Simplicity</h2>
              <p className="text-center font-sm">
              Complex problems deserve elegant solutions - we streamline every process from discovery to payment in one intuitive platform
              </p>
            </div>
           
            <div className={`flex flex-col items-center justify-center ${theme === 'dark'? 'bg-indigo-700': 'bg-white'} shadow-lg rounded p-4 gap-1`}>
              <FiUsers/>
            <h2 className={`text-xl font-bold   rounded ${theme === 'dark'? '  text-sky-200': '  text-orange-500'}`}>Collabration</h2>
              <p className="text-center font-sm">
              We believe the best results come when diverse talents work together towards shared success
              </p>
            </div>
           
          </div>
          </div>
        </section>

    </div>
  )
}

export default AboutPage