import { useState, useEffect } from 'react'
import supabase  from '../lib/supabase'
import { useTheme } from '../contexts/ThemeContext'
import { toast } from 'react-hot-toast'

const BookingsTable = () => {
  const { theme } = useTheme()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedBooking, setSelectedBooking] = useState(null)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true)
        const { data: { user } } = await supabase.auth.getUser()
        
        if (user) {
          const { data, error } = await supabase
            .from('bookings')
            .select(`
              *,
              services:service_id(title),
              customers:customer_id(username, avatar_url)
            `)
            .eq('provider_id', user.id)
            .order('created_at', { ascending: false })

          if (error) throw error
          setBookings(data)
        }
      } catch (error) {
        toast.error('Failed to load bookings')
        console.error('Error fetching bookings:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [])

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ 
          status: newStatus,
          [newStatus === 'completed' ? 'completed_at' : 'cancelled_at']: new Date().toISOString()
        })
        .eq('id', bookingId)

      if (error) throw error

      toast.success(`Booking marked as ${newStatus}`)
      setBookings(bookings.map(booking => 
        booking.id === bookingId ? { 
          ...booking, 
          status: newStatus,
          [newStatus === 'completed' ? 'completed_at' : 'cancelled_at']: new Date().toISOString()
        } : booking
      ))
    } catch (error) {
      toast.error(`Failed to update booking: ${error.message}`)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className={`rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-indigo-800' : 'bg-white'}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className={theme === 'dark' ? 'bg-indigo-900 text-white' : 'bg-gray-50 text-indigo-900'}>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Service
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Date/Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.id} className={
                `${theme === 'dark' ? 'hover:bg-indigo-700' : 'hover:bg-gray-50'} ${
                  booking.status === 'completed' ? 'bg-green-50' : 
                  booking.status === 'cancelled' ? 'bg-red-50' : 'bg-sky-300 '
                }`
              }>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img 
                        className="h-10 w-10 rounded-full" 
                        src={booking.customers?.avatar_url || 'https://placehold.co/100?text=No+Image'} 
                        alt={booking.customers?.username}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium">
                        {booking.customer_name || booking.customers?.username}
                      </div>
                      <div className="text-sm">
                        {booking.customer_phone}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm">
                    {booking.services?.title || 'Service'}
                  </div>
                  <div className="text-sm">
                    ${booking.price} ({booking.price_tier})
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm">
                    {new Date(booking.service_date).toLocaleDateString()}
                  </div>
                  <div className="text-sm">
                    {booking.service_time}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      booking.status === 'completed' ? 'bg-green-100 text-green-800' : 
                      'bg-red-100 text-red-800'}`}>
                    {booking.status}
                  </span>
                  {booking.completed_at && (
                    <div className="text-xs mt-1">
                      Completed: {new Date(booking.completed_at).toLocaleString()}
                    </div>
                  )}
                  {booking.cancelled_at && (
                    <div className="text-xs mt-1">
                      Cancelled: {new Date(booking.cancelled_at).toLocaleString()}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => setSelectedBooking(booking)}
                    className={`mr-2 ${theme === 'dark' ? 'text-indigo-500 hover:text-indigo-200' : 'text-indigo-600 hover:text-indigo-900'}`}
                  >
                    View
                  </button>
                  {booking.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(booking.id, 'completed')}
                        className="mr-2 text-green-600 hover:text-green-900"
                      >
                        Complete
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                        className="text-red-600 hover:text-red-900"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className={`rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 
            ${theme === 'dark' ? 'bg-indigo-900 text-white' : 'bg-white text-indigo-900'}`}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">
                Booking Details
              </h3>
              <button 
                onClick={() => setSelectedBooking(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Client Information</h4>
                <div className="flex items-center mb-4">
                  <img 
                    className="w-12 h-12 rounded-full mr-3" 
                    src={selectedBooking.customers?.avatar_url || 'https://placehold.co/100?text=No+Image'} 
                    alt={selectedBooking.customer_name}
                  />
                  <div>
                    <p className="font-medium">{selectedBooking.customer_name}</p>
                    <p className="text-sm">{selectedBooking.customer_phone}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p><span className="font-medium">City:</span> {selectedBooking.city}</p>
                  <p><span className="font-medium">Village:</span> {selectedBooking.village}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Service Information</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Service:</span> {selectedBooking.services?.title || 'N/A'}</p>
                  <p><span className="font-medium">Package:</span> {selectedBooking.price_tier} (${selectedBooking.price})</p>
                  <p><span className="font-medium">Date:</span> {new Date(selectedBooking.service_date).toLocaleDateString()}</p>
                  <p><span className="font-medium">Time:</span> {selectedBooking.service_time}</p>
                  <p><span className="font-medium">Status:</span> 
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full 
                      ${selectedBooking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        selectedBooking.status === 'completed' ? 'bg-green-100 text-green-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {selectedBooking.status}
                    </span>
                  </p>
                  {selectedBooking.completed_at && (
                    <p><span className="font-medium">Completed at:</span> {new Date(selectedBooking.completed_at).toLocaleString()}</p>
                  )}
                  {selectedBooking.cancelled_at && (
                    <p><span className="font-medium">Cancelled at:</span> {new Date(selectedBooking.cancelled_at).toLocaleString()}</p>
                  )}
                </div>
              </div>

              {selectedBooking.notes && (
                <div className="md:col-span-2 ">
                  <h4 className="font-medium mb-2">Client Notes</h4>
                  <p className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-indigo-800' : 'bg-gray-100'}`}>
                    {selectedBooking.notes}
                  </p>
                </div>
              )}

              <div className="md:col-span-2 flex justify-end space-x-3 pt-4">
                {selectedBooking.status === 'pending' && (
                  <>
                    <button
                      onClick={() => {
                        handleStatusUpdate(selectedBooking.id, 'completed')
                        setSelectedBooking(null)
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Mark as Completed
                    </button>
                    <button
                      onClick={() => {
                        handleStatusUpdate(selectedBooking.id, 'cancelled')
                        setSelectedBooking(null)
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Cancel Booking
                    </button>
                  </>
                )}
                <button
                  onClick={() => setSelectedBooking(null)}
                  className={`px-4 py-2 ${theme === 'dark' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-200 hover:bg-gray-300'} rounded-lg`}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BookingsTable;