import { useState } from 'react';
import supabase from '../lib/supabase';
import { toast } from 'react-hot-toast';
import { useTheme } from '../contexts/ThemeContext';

export default function BookingForm({ service, provider, onClose, currentUser }) {
    const {theme} = useTheme()
  const [priceTier, setPriceTier] = useState('')
  const [price, setPrice] = useState('')
  const [name, setName] = useState(currentUser?.full_name || '')
  const [phone, setPhone] = useState(currentUser?.phone || '')
  const [city, setCity] = useState('Galkayo')
  const [village, setVillage] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handlePriceChange = (tier) => {
    setPriceTier(tier)
    if (tier === 'basic') setPrice(service.basic_price)
    else if (tier === 'standard') setPrice(service.standard_price)
    else if (tier === 'premium') setPrice(service.premium_price)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    if (!priceTier || !name || !village || !date || !time) {
      toast.error('Please fill all required fields.')
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert([{
          customer_id: currentUser.id,
          provider_id: provider.id,
          service_id: service.id,
          price_tier: priceTier,
          price: price,
          customer_name: name,
          customer_phone: phone,
          city: city,
          village: village,
          service_date: date,
          service_time: time,
          notes: notes,
          status: 'pending'
        }])
        .select();

      if (error) throw error

      toast.success('Booking submitted successfully!')
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting booking:', error)
      toast.error('Failed to submit booking')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className={`fixed inset-0  ${theme === 'dark'? 'bg-indigo-600 text-white': 'bg-gray-200 text-indigo-900'} bg-opacity-50 flex items-center justify-center z-50`}>
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
          <div className="text-4xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold mb-2">Booking Successful!</h2>
          <p className="mb-6">Thank you for booking {service.title}. We will contact you shortly.</p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={onClose}
              className={`px-6 py-2  text-white font-bold ${theme === 'dark'? 'bg-orange-500  hover:bg-orange-600': 'bg-indigo-900 hover:bg-indigo-600'}  rounded-lg `}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }


 
  return (
    <div className={`fixed inset-0 ${theme === 'dark'? 'bg-indigo-600 text-white': 'bg-gray-200 text-indigo-900'} bg-opacity-10 flex items-center justify-center z-50 p-4`}>
      <form  onSubmit={handleSubmit} className={`${theme === 'dark'? 'bg-indigo-700': 'bg-white'} p-6 rounded-2xl shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto`}>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Book {service.title}</h1>
          <button 
            type="button" 
            onClick={onClose}
            className={`text-xl font-bold ${theme === 'dark'? 'text-orange-500 hover:text-orange-700': 'text-indigo-600 hover:text-shadow-indigo-900'}`}
          >
            ✕
          </button>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Service Provider</label>
          <input 
            type="text" 
            value={provider.username} 
            readOnly 
            className={`w-full p-2 border rounded-lg  ${theme === 'dark'? 'bg-gary-300': 'bg-indigo-200'}`} 
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Select Price Tier*</label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handlePriceChange('basic')}
            className={`p-2 border rounded-lg ${priceTier === 'basic' ? 'bg-blue-100 border-blue-500' : 'bg-gray-50'}`}
            >
              Basic<br/>${service.basic_price}
            </button>
            <button
              type="button"
              onClick={() => handlePriceChange('standard')}
            className={`p-2 border rounded-lg ${priceTier === 'standard' ? 'bg-blue-100 border-blue-500' : 'bg-gray-50'}`}
            >
              Standard<br/>${service.standard_price}
            </button>
            <button
              type="button"
              onClick={() => handlePriceChange('premium')}
              className={`p-2 border rounded-lg ${priceTier === 'premium' ? 'bg-blue-100 border-blue-500' : 'bg-gray-50'}`}
            >
              Premium<br/>${service.premium_price}
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Selected Price</label>
          <input 
            type="text" 
            value={price ? `$${price}` : ''} 
            readOnly 
            className="w-full p-2 border rounded-lg bg-gray-100" 
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Your Name*</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Phone Number*</label>
          <input
            type="tel"
            className="w-full p-2 border rounded-lg"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">City*</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Village*</label>
          <select
            className="w-full p-2 border rounded-lg"
            value={village}
            onChange={(e) => setVillage(e.target.value)}
            required
          >
            <option value="">Select Village</option>
            <option value="Israac">Israac</option>
            <option value="Yamys">Yamys</option>
            <option value="Garsoor">Garsoor</option>
            <option value="Siinaay">Siinaay</option>
            <option value="Kabida">Kabida</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 font-medium">Service Date*</label>
            <input
              type="date"
              className="w-full p-2 border rounded-lg"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Preferred Time*</label>
            <select
              className="w-full p-2 border rounded-lg"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            >
              <option value="">Select Time</option>
              <option value="Morning (8AM-12PM)">Morning (8AM-12PM)</option>
              <option value="Afternoon (1PM-5PM)">Afternoon (1PM-5PM)</option>
              <option value="Evening (6PM-9PM)">Evening (6PM-9PM)</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium">Additional Notes</label>
          <textarea
            className="w-full p-2 border rounded-lg"
            rows="3"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white   ${theme === 'dark'? 'bg-orange-600': 'bg-indigo-800'}   transition disabled:bg-blue-400`}
        > 
          {loading ? 'Submitting...' : 'Submit Booking'}
        </button>
      </form>
    </div>
  );
}