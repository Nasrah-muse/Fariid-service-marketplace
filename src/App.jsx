import { Route, Routes } from "react-router"
import Footer from "./components/Footer"
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import ServicesPage from "./pages/ServicesPage"
import CategoriesPage from "./pages/CategoriesPage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import { ThemeProvider } from "./contexts/ThemeContext"
import { AuthProvider } from "./contexts/AuthContext"
import UnAuthenticatedRoute from "./components/UnAuthenticatedRoute"
import ProtectedRoute from "./components/ProtectedRoute"
import ProfilePage from "./pages/ProfilePage"
import Dashboard from "./pages/Dashboard"
 
function App() {
 
  return (
    <div>
      <AuthProvider>
      <ThemeProvider>
      {/* Header */}
      <Header/>
      <main>
     {/* routes */}
     <Routes>
     <Route path="/" element={<HomePage/>}/>
     <Route path="/services" element={<ServicesPage/>}/>
     <Route path="/categories" element={<CategoriesPage/>}/>
     <Route path="/contact" element={<ContactPage/>}/>
     <Route path="/about" element={<AboutPage/>}/>
     <Route path="/signin" element={
       <UnAuthenticatedRoute>
      <SignInPage/>
      </UnAuthenticatedRoute>
      }/>
     <Route path="/signup" element={
        <UnAuthenticatedRoute>
        <SignUpPage/>
        </UnAuthenticatedRoute>
      
      }/>
           {/* Protected routes */}
     <Route path="/profile" element={
        <ProtectedRoute>
        <ProfilePage/>
        </ProtectedRoute>
      
      }/>
     <Route path="/dashboard" element={
        <ProtectedRoute>
        <Dashboard/>
        </ProtectedRoute>
      
      }/>
     </Routes>



      </main>
      {/* Footer */}
      <Footer/>
      </ThemeProvider>
      </AuthProvider>
    </div>
 
  )
}

export default App
