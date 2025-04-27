import { FiRefreshCcw } from 'react-icons/fi'
import { useTheme } from '../contexts/ThemeContext'
 
const ProviderDashboardOverview = ({ 
  services = [], 
  bookings = [], 
  messages = [],
  loading = false,
  onRefresh
}) => {
  const { theme } = useTheme()

   const activeServices = services.filter(s => s.status === 'approved').length
  const currentMonthBookings = bookings.filter(b => 
    new Date(b.created_at).getMonth() === new Date().getMonth()
  ).length
  const pendingBookings = bookings.filter(b => b.status === 'pending').length
  const latestBooking = bookings[0]
  const unreadMessages = messages.filter(m => !m.read).length

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>
          Dashboard Overview
        </h2>
        <button
          onClick={onRefresh}
          className={`px-3 py-1 rounded-md text-sm ${theme === 'dark' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          <FiRefreshCcw/>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <DashboardCard
           title="Active Services"
          value={activeServices}
          theme={theme}
        />
        <DashboardCard
           title="Bookings This Month"
          value={currentMonthBookings}
          theme={theme}
        />
        <DashboardCard
           title="Pending Bookings"
          value={pendingBookings}
          theme={theme}
        />
      </div>

      {latestBooking && (
        <LatestBookingCard booking={latestBooking} theme={theme} />
      )}
    </div>
  )
}

// Sub-component for dashboard cards
const DashboardCard = ({ title, value, theme }) => (
  <div className={`p-4 rounded-lg flex flex-col ${theme === 'dark' ? 'bg-indigo-700' : 'bg-gray-50'}`}>
    <div className="flex items-center mb-2">
      <h3 className={`text-md font-medium ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>
        {title}
      </h3>
    </div>
    <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-sky-200' : 'text-indigo-900'}`}>
      {value}
    </p>
  </div>
)

// Sub-component for latest booking card
const LatestBookingCard = ({ booking, theme }) => (
  <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-indigo-700' : 'bg-gray-50'} mb-8`}>
    <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>
      Latest Booking
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>Client</p>
        <p className={`${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>
          {booking.customer_name || booking.customers?.username}
        </p>
      </div>
      <div>
        <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>Service</p>
        <p className={`${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>
          {booking.services?.title || 'N/A'}
        </p>
      </div>
      <div>
        <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>Date</p>
        <p className={`${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>
          {new Date(booking.service_date).toLocaleDateString()}
        </p>
      </div>
      <div>
        <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>Status</p>
        <span className={`px-2 py-1 text-xs rounded-full ${
          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
          booking.status === 'completed' ? 'bg-green-100 text-green-800' : 
          'bg-red-100 text-red-800'
        }`}>
          {booking.status}
        </span>
      </div>
    </div>
  </div>
)

export default ProviderDashboardOverview