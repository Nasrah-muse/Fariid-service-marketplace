
import { FiCamera } from "react-icons/fi";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

const ProfilePage = () => {
    const { theme } = useTheme();
    const { user, profile, logout } = useAuth();
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState(profile?.username || '');
    const [avatar, setAvatar] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || '');

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-indigo-900' : 'bg-gray-50'} py-12 px-4 sm:px-6 lg:px-8`}>
              <div className="max-w-3xl mx-auto">
              <div className={`${theme === 'dark' ? 'bg-indigo-800' : 'bg-white'} shadow-xl rounded-lg overflow-hidden`}>
                {/* Header */}
          <div className={`bg-gradient-to-r ${theme === 'dark'? "from-sky-200 to-sky-300" : "from-indigo-700 to-indigo-900"} px-6 py-8`}>
            <div className="flex flex-col items-center">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img 
                    src={avatarUrl || 'https://placehold.co/150'} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <label 
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:scale-110 transition-transform"
                >
                  <FiCamera className={`w-5 h-5 ${theme === 'dark' ? 'text-indigo-900' : 'text-orange-500'}`} />
                </label>
                <input 
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                 />
              </div>
              <h2 className={`mt-4 text-2xl font-bold ${theme === 'dark' ? 'text-indigo-900' : 'text-sky-200'}`}>
                {username || 'Your Profile'}
              </h2>
              <p className="text-orange-500">{user?.email}</p>
            </div>
          </div>

                </div>
                </div>
</div>
  )
}

export default ProfilePage