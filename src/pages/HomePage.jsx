import { useState , useEffect} from 'react';
import bg1 from '../assets/bg1.jpg'
import bg2 from '../assets/bg2.jpg'
import bg3 from '../assets/bg3.jpg'
import bg4 from '../assets/bg4.jpg'
import bg5 from '../assets/bg5.jpg'


const HomePage = () => {
 

   const [currentBgIndex, setCurrentBgIndex] = useState(0);
  
   const backgrounds = [bg1, bg2, bg3, bg4, bg5];

   useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div  className="relative py-12 px-4 sm:px-6 lg:px-8 text-center min-h-screen flex items-center justify-center"
    style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgrounds[currentBgIndex]})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      transition: 'background-image 1s ease-in-out'
    }}
>

    </div>
  )
}

export default HomePage