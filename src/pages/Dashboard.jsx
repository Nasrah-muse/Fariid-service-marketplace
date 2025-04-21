import { useEffect } from "react";
import AdminDashboard from "../components/AdminDashboard"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router";
import ProviderDashboard from "../components/ProviderDashboard";

 
const Dashboard = () => {
  const { role, hasRegisteredService, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && role === 'provider' && !hasRegisteredService) {
      navigate('/dashboard/register')
    }
  }, [role, hasRegisteredService, isLoading, navigate])
   console.log("Your role is" , role )
  return (
    <div>
      {
        role === 'admin'  && <AdminDashboard/>
      }
    {role === 'provider' && hasRegisteredService && <ProviderDashboard />}

    </div>
  )
}

export default Dashboard