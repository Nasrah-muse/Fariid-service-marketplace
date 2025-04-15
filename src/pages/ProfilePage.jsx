
import { useTheme } from "../contexts/ThemeContext";

const ProfilePage = () => {
    const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-indigo-900' : 'bg-gray-50'} py-12 px-4 sm:px-6 lg:px-8`}>
              <div className="max-w-3xl mx-auto">
              <div className={`${theme === 'dark' ? 'bg-indigo-800' : 'bg-white'} shadow-xl rounded-lg overflow-hidden`}>

                </div>
                </div>
</div>
  )
}

export default ProfilePage