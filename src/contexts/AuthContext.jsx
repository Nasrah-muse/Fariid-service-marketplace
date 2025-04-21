import { createContext, useContext, useEffect, useState } from "react";
import { getUserProfile, onAuthChange, signOut } from "../lib/auth";
 
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [role, setRole] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
 
  useEffect(() => {
    const cleanUp = onAuthChange(async (user) => {
      console.log("🔍 Auth changed, User:", user)
      setUser(user);
      
      if (user) {
        try {
          const userProfile = await getUserProfile(user.id)
          setProfile(userProfile)
          if (userProfile && userProfile.role) {
            setRole(userProfile.role)
          }else {
            setRole(null);
           }
        } catch (error) {
          console.error("Error fetching user profile", error)
          setProfile(null)
        }
      }  else {
        setProfile(null)
        setRole(null)
      }
      setIsLoading(false)
    })
    
    return cleanUp
  }, [])

    

    
  const logout = async () => {
     try {
      await signOut();
     } catch (error) {
      console.error("Error signing out", error);
    }
  };

  const value = {
    user,
    profile,
    isLoading,
    role,
    isLoggedIn: !!user,
    logout,
  
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}