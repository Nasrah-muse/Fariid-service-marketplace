import { createContext, useContext, useEffect, useState } from "react";
import { getUserProfile, onAuthChange, signOut } from "../lib/auth";
import supabase from "../lib/supabase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [role, setRole] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const [hasRegisteredService, setHasRegisteredService] = useState(false)

     useEffect(() => {
      const cleanUp = onAuthChange(async (user) => {
        console.log("🔍 Auth changed, User:", user)
        setUser(user)
        
        if (!user) {
           setProfile(null);
          setRole(null);
          setHasRegisteredService(false);
          setIsLoading(false);
          return
        }
    
        setIsLoading(true);
        try {
           const userProfile = await getUserProfile(user.id)
          
          if (!userProfile) {
            throw new Error("User profile not found");
          }
    
           setProfile(userProfile);
          setRole(userProfile.role || null)
    
           if (userProfile.role === 'provider') {
            await checkServiceRegistration(user.id)
          } else {
            setHasRegisteredService(false);
          }
    
        } catch (error) {
          console.error("Error in auth change handler:", error)
          setProfile(null)
          setRole(null)
          setHasRegisteredService(false)
        } finally {
          setIsLoading(false)
        }
      })
    
      return cleanUp;
    }, [])

    const checkServiceRegistration = async (userId) => {
      if (role === 'provider') {
        const { data, error } = await supabase
          .from('services')
          .select('id')
          .eq('provider_id', userId)
          .single();
        
        setHasRegisteredService(!!data && !error)
      }
      setIsLoading(false)
    }

    
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
    hasRegisteredService,
    checkServiceRegistration
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