import { useState, useEffect } from 'react'
import supabase from '../lib/supabase'
import { toast } from 'react-hot-toast'

const BookingManagement = ({ theme }) => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [isUpdating, setIsUpdating] = useState(false)

   const fetchBookings = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          service_id(title, description),
          customer_id(username, avatar_url),
          provider_id(username)
        `)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      
       const bookingsWithDefaults = data.map(booking => ({
        ...booking,
        customer_id: {
          ...booking.customer_id,
          avatar_url: booking.customer_id?.avatar_url || '/default-avatar.png'
        }
      }))
      
      setBookings(bookingsWithDefaults)
    } catch (error) {
      toast.error(`Failed to load bookings: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [])

   const filteredBookings = bookings.filter(booking => {
    const matchesFilter = filter === 'all' || booking.status === filter
    console.log(`Booking ${booking.id} - Status: ${booking.status} - Matches ${filter}: ${matchesFilter}`) // Debug log
    return matchesFilter
  })

   const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      setIsUpdating(true)
      console.log(`Updating booking ${bookingId} to ${newStatus}`)
      
      const { error } = await supabase
        .from('bookings')
        .update({ 
          status: newStatus,
          [newStatus === 'completed' ? 'completed_at' : 'cancelled_at']: new Date().toISOString()
        })
        .eq('id', bookingId)

      if (error) throw error

      toast.success(`Booking marked as ${newStatus}`)
      await fetchBookings()
    } catch (error) {
      console.error('Update error:', error)
      toast.error(`Failed to update booking: ${error.message}`)
    } finally {
      setIsUpdating(false)
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
    <div className="space-y-4">
     <div className="flex flex-wrap gap-2 mb-4">
        {['all', 'pending', 'completed', 'cancelled'].map((status) => {
          const count = status === 'all' 
            ? bookings.length 
            : bookings.filter(b => b.status === status).length
          
          console.log(`Rendering ${status} tab with count ${count}`) // Debug log
          
          return (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === status
                  ? theme === 'dark'
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-500 text-white'
                  : theme === 'dark'
                  ? 'bg-indigo-700 text-gray-300 hover:bg-indigo-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)} ({count})
            </button>
          )
        })}
      </div>

       <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className={theme === 'dark' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-indigo-900'}>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Customer
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Service
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Date/Time
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className={`divide-y ${theme === 'dark' ? 'divide-indigo-700' : 'divide-gray-200'}`}>
            {filteredBookings.length === 0 ? (
              <tr>
                <td 
                  colSpan="5" 
                  className={`px-4 py-6 text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}
                >
                  No bookings found
                </td>
              </tr>
            ) : (
              filteredBookings.map((booking) => (
                <tr 
                  key={booking.id} 
                  className={theme === 'dark' ? 'hover:bg-indigo-700' : 'hover:bg-gray-50'}
                >
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={booking.customer_id?.avatar_url || '/default-avatar.png'}
                        alt={booking.customer_id?.username}
                        onError={(e) => {
                          if (e.target.src !== '/default-avatar.png') {
                            e.target.src = '/default-avatar.png'
                          }
                        }}
                        loading="lazy"
                      />

                      </div>
                      <div className="ml-3">
                        <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {booking.customer_name || booking.customers?.username}
                        </p>
                        <p className="text-sm text-gray-500">
                          {booking.customers?.email || booking.customer_phone}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <p className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                       {booking.service_id?.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      ${booking.price} ({booking.price_tier})
                    </p>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <p className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {new Date(booking.service_date).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      {booking.service_time}
                    </p>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      booking.status === 'pending' 
                        ? 'bg-yellow-100 text-yellow-800'
                        : booking.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => setSelectedBooking(booking)}
                      className={`${theme === 'dark' ? 'text-blue-300 hover:text-blue-200' : 'text-blue-600 hover:text-blue-900'}`}
                    >
                      Details
                    </button>
                    {booking.status === 'pending' && (
                      <>
                        <button
                          onClick={() => updateBookingStatus(booking.id, 'completed')}
                          disabled={isUpdating}
                          className="text-green-600 hover:text-green-900 disabled:opacity-50"
                        >
                          Complete
                        </button>
                        <button
                          onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                          disabled={isUpdating}
                          className="text-red-600 hover:text-red-900 disabled:opacity-50"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

       {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 ${
            theme === 'dark' ? 'bg-indigo-900' : 'bg-white'
          }`}>
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
              {/* Customer Information */}
              <div>
                <h4 className={`font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Customer Information
                </h4>
                <div className="flex items-center mb-4">
                  <img
                    className="w-12 h-12 rounded-full mr-3"
                    src={selectedBooking.customers?.avatar_url || '/default-avatar.png'}
                    alt={selectedBooking.customer_name}
                    onError={(e) => {
                      e.target.src = '/default-avatar.png'
                    }}
                  />
                  <div>
                    <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {selectedBooking.customer_name || selectedBooking.customers?.username}
                    </p>
                    <p className="text-sm text-gray-500">
                      {selectedBooking.customers?.email}
                    </p>
                    <p className="text-sm text-gray-500">
                      {selectedBooking.customer_phone}
                    </p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <span className="font-medium">Location:</span> {selectedBooking.city}, {selectedBooking.village}
                  </p>
                </div>
              </div>

              {/* Service Information */}
              <div>
                <h4 className={`font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Service Information
                </h4>
                <div className="space-y-2">
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <span className="font-medium">Service:</span> {selectedBooking.service_id?.title}
                  </p>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <span className="font-medium">Package:</span> {selectedBooking.price_tier} (${selectedBooking.price})
                  </p>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <span className="font-medium">Date:</span> {new Date(selectedBooking.service_date).toLocaleDateString()}
                  </p>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <span className="font-medium">Time:</span> {selectedBooking.service_time}
                  </p>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <span className="font-medium">Status:</span> 
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                      selectedBooking.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : selectedBooking.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                    </span>
                  </p>
                  {selectedBooking.completed_at && (
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      <span className="font-medium">Completed at:</span> {new Date(selectedBooking.completed_at).toLocaleString()}
                    </p>
                  )}
                  {selectedBooking.cancelled_at && (
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      <span className="font-medium">Cancelled at:</span> {new Date(selectedBooking.cancelled_at).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>

              {/* Notes */}
              {selectedBooking.notes && (
                <div className="md:col-span-2">
                  <h4 className={`font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Customer Notes
                  </h4>
                  <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-indigo-800' : 'bg-gray-100'}`}>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {selectedBooking.notes}
                    </p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="md:col-span-2 flex justify-end space-x-3 pt-4">
                {selectedBooking.status === 'pending' && (
                  <>
                    <button
                      onClick={() => {
                        updateBookingStatus(selectedBooking.id, 'completed')
                        setSelectedBooking(null)
                      }}
                      disabled={isUpdating}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                    >
                      Mark as Completed
                    </button>
                    <button
                      onClick={() => {
                        updateBookingStatus(selectedBooking.id, 'cancelled')
                        setSelectedBooking(null)
                      }}
                      disabled={isUpdating}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                    >
                      Cancel Booking
                    </button>
                  </>
                )}
                <button
                  onClick={() => setSelectedBooking(null)}
                  className={`px-4 py-2 ${
                    theme === 'dark' 
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  } rounded-lg`}
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

export default BookingManagement