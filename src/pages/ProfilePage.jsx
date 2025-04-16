
import { FiArrowLeft, FiArrowRight, FiCamera, FiEye, FiEyeOff, FiLock, FiMail, FiSkipBack, FiUser } from "react-icons/fi";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { NavLink } from "react-router";

const ProfilePage = () => {
    const { theme } = useTheme();
    const { user, profile, logout } = useAuth();
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState(profile?.username || '');
    const [avatar, setAvatar] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || '');
    
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  return (
    <div className={`min-h-screen  bg-gray-300 py-12 px-4 sm:px-6 lg:px-8`}>
              <div className="max-w-3xl mx-auto">
              <div className={`${theme === 'dark' ? 'bg-indigo-800' : 'bg-white'} shadow-xl rounded-lg overflow-hidden`}>
                {/* Header */}
          <div className={`bg-gradient-to-r ${theme === 'dark'? "from-indigo-700 to-indigo-900" :"from-sky-400 to-sky-500"  } px-6 py-8`}>
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
                  <FiCamera className="w-5 h-5 text-indigo-900 "/>
                </label>
                <input 
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                 />
              </div>
              <h2 className={`mt-4 text-2xl font-bold ${theme === 'dark' ? 'text-sky-200 ' : 'text-indigo-900'}`}>
                {username || 'Your Profile'}
              </h2>
              <p className="text-orange-200 text-md font-medium">{user?.email}</p>
            </div>
          </div>
          {/* Profile Form */}
          <form  className="p-6 space-y-6">
            <div className="space-y-6">
              <div>
                <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-sky-200' : 'text-indigo-700'}`}>
                  Username
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className={`h-5 w-5 ${theme === 'dark' ? 'text-sky-400' : 'text-indigo-400'}`} />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={`block w-full pl-10 pr-3 py-2 rounded-md border ${
                            theme === 'dark' 
                              ? 'bg-indigo-700 border-indigo-600 text-sky-200' 
                              : 'border-gray-300 text-indigo-900'
                          } focus:ring-2 focus:ring-orange-500 focus:border-orange-500`}
                                            required
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-sky-200' : 'text-indigo-700'}`}>
                  Email
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className={`h-5 w-5 ${theme === 'dark' ? 'text-sky-400' : 'text-indigo-400'}`} />
                  </div>
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className={`block w-full pl-10 pr-3 py-2 rounded-md border ${
                      theme === 'dark' 
                        ? 'bg-indigo-700 border-indigo-600 text-sky-200' 
                        : 'border-gray-300 text-indigo-900'
                    } focus:ring-2 focus:ring-orange-500 focus:border-orange-500`}
   
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 rounded-md font-medium ${
                theme === 'dark'
                ? 'bg-sky-200 text-indigo-900 hover:bg-sky-300'
                : 'bg-orange-600 text-white hover:bg-orange-700'
            } disabled:opacity-50`}
              >
                {loading ? 'Saving...' : 'Save Profile'}
              </button>
              
              <button
                type="button"
                 className={`px-4 py-2 rounded-md font-medium ${
                  theme === 'dark'
                    ? 'text-sky-200 hover:text-white'
                    : 'text-indigo-900 hover:text-indigo-700'
                }`}
                onClick={() => setShowPasswordForm(!showPasswordForm)}
              >
                {showPasswordForm ? 'Cancel Password Change' : 'Change Password'}
              </button>
            </div>
          </form>

          

          {/* chnage password form */}
          {showPasswordForm && (
            <form className="px-6 pb-6 space-y-6">
              <div className="space-y-6">
                <div>
                  <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-sky-200' : 'text-indigo-700'}`}>
                    Current Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className={`h-5 w-5 ${theme === 'dark' ? 'text-sky-400' : 'text-indigo-900'}`} />
                    </div>
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className={`block w-full pl-10 pr-3 py-2 rounded-md border ${
                      theme === 'dark' 
                        ? 'bg-indigo-700 border-indigo-600 text-sky-200' 
                        : 'border-gray-300 text-indigo-900'
                    } focus:ring-2 focus:ring-orange-500 focus:border-orange-500`}
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? (
                        <FiEyeOff className={`h-5 w-5 ${theme === 'dark' ? 'text-sky-400' : 'text-indigo-900'}`} />
                      ) : (
                        <FiEye className={`h-5 w-5 ${theme === 'dark' ? 'text-sky-400' : 'text-indigo-900'}`} />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-sky-200' : 'text-indigo-700'}`}>
                    New Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className={`h-5 w-5 ${theme === 'dark' ? 'text-sky-400' : 'text-indigo-900'}`} />
                    </div>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className={`block w-full pl-10 pr-3 py-2 rounded-md border ${
                      theme === 'dark' 
                        ? 'bg-indigo-700 border-indigo-600 text-sky-200' 
                        : 'border-gray-300 text-indigo-900'
                    } focus:ring-2 focus:ring-orange-500 focus:border-orange-500`}
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <FiEyeOff className={`h-5 w-5 ${theme === 'dark' ? 'text-sky-400' : 'text-indigo-900'}`} />
                      ) : (
                        <FiEye className={`h-5 w-5 ${theme === 'dark' ? 'text-sky-400' : 'text-indigo-900'}`} />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-sky-200' : 'text-indigo-700'}`}>
                    Confirm New Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className={`h-5 w-5 ${theme === 'dark' ? 'text-sky-400' : 'text-indigo-900'}`} />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`block w-full pl-10 pr-3 py-2 rounded-md border ${
                      theme === 'dark' 
                        ? 'bg-indigo-700 border-indigo-600 text-sky-200' 
                        : 'border-gray-300 text-indigo-900'
                    } focus:ring-2 focus:ring-orange-500 focus:border-orange-500`}
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <FiEyeOff className={`h-5 w-5 ${theme === 'dark' ? 'text-sky-400' : 'text-indigo-900'}`} />
                      ) : (
                        <FiEye className={`h-5 w-5 ${theme === 'dark' ? 'text-sky-400' : 'text-indigo-900'}`} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-4 py-2 rounded-md font-medium ${
                    theme === 'dark'
                      ? 'bg-sky-200 text-indigo-900 hover:bg-sky-300'
                      : 'bg-orange-600 text-white hover:bg-orange-700'
                  } disabled:opacity-50`}
                >
                  {loading ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </form>
          )}

          <div className=" flex items-center px-6 pb-6">
          <FiArrowLeft className= "text-orange-500 text-3xl"/>
            <NavLink 
              to="/dashboard" 
              className={`px-4 py-2 rounded-md font-medium ${
                theme === 'dark' 
                  ? 'text-sky-200 hover:text-white' 
                  : 'text-indigo-900 hover:text-indigo-700'
              }`}
            >
              Back to Dashboard
            </NavLink>
          </div>

  </div>
  </div>
</div>
  )
}

export default ProfilePage