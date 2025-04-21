 import AdminDashboard from "../components/AdminDashboard"
import { useAuth } from "../contexts/AuthContext"
 import ProviderDashboard from "../components/ProviderDashboard";

 
const Dashboard = () => {
  const { role } = useAuth()
  
   console.log("Your role is" , role )
  return (
    <div>
      {
        role === 'admin'  && <AdminDashboard/>
      }
    {role === 'provider' && <ProviderDashboard />}

    </div>
  )
}

export default Dashboard