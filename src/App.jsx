import { Route, Routes } from "react-router"
import Footer from "./components/Footer"
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import ServicesPage from "./pages/ServicesPage"
import CategoriesPage from "./pages/CategoriesPage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"

 
function App() {
 
  return (
    <div>
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
     </Routes>

      </main>
      {/* Footer */}
      <Footer/>
    </div>
 
  )
}

export default App
