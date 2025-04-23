import { useTheme } from "../contexts/ThemeContext"

 
export default function AdminServiceList() {
 const {theme} = useTheme()
  return (
     <div className="p-4">
 <div className="overflow-x-auto">
  <table className="min-w-full table-auto">
    <thead>
      <tr>
        <th className={`border p-2 ${theme === 'dark'? 'border-gray-100 text-sky-200': 'border-indigo-600 text-indigo-900'}`}>Title</th>
        <th className={`border p-2 ${theme === 'dark'? 'border-gray-100 text-sky-200': 'border-indigo-600 text-indigo-900'}`}>Category</th>
        <th className={`border p-2 ${theme === 'dark'? 'border-gray-100 text-sky-200': 'border-indigo-600 text-indigo-900'}`}>Status</th>
        <th className={`border p-2 ${theme === 'dark'? 'border-gray-100 text-sky-200': 'border-indigo-600 text-indigo-900'}`}>Actions</th>
      </tr>
    </thead>
    <tbody>
        no services
    </tbody>
       
  </table>

     </div>
     </div>
  )
}
