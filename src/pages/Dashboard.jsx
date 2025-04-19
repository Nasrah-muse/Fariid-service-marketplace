import AdminDashboard from "../components/AdminDashboard"
import { useAuth } from "../contexts/AuthContext"

 
const Dashboard = () => {
  const {role} = useAuth()
  console.log("Your role is" , role )
  return (
    <div>
      {
        role === 'admin'  && <AdminDashboard/>
      }
    </div>
  )
}

export default Dashboard