import { useTheme } from "../contexts/ThemeContext";

 
const AboutPage = () => {
  const { theme } = useTheme()
 
  return (
    <div className={`min-h-screen mt-12 ${theme === 'dark' ? 'bg-indigo-900 text-white' : 'bg-gray-50 text-indigo-900'}`}>
      <div className={`max-w-full h-96  px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-r ${theme === 'dark'? "from-sky-400 to-orange-600" :"from-indigo-600 to-sky-200"  } `}>
         <div className="text-center mb-16">
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>
            About Us
          </h1>
        </div>
        </div>
         <section className="w-full">
          <div className="max-w-4xl mx-auto  px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-center text-3xl font-bold mb-4">Our Vision</h1>
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

    </div>
  )
}

export default AboutPage