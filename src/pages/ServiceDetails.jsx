import { useEffect, useState } from "react";
import { useParams } from "react-router";
import supabase from "../lib/supabase";
import toast from "react-hot-toast";
import { useTheme } from "../contexts/ThemeContext";

const ServiceDetails = () => {
  const { id } = useParams()
   const { theme } = useTheme()
  const [service, setService] = useState(null)
  const [provider, setProvider] = useState(null)
  const [loading, setLoading] = useState(true)
   

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        setLoading(true)
        
        const { data: serviceData, error: serviceError } = await supabase
          .from('services')
          .select('*, categories(name)')
          .eq('id', id)
          .single()
        
        if (serviceError) throw serviceError;
        if (!serviceData) throw new Error('Service not found')

        const { data: providerData, error: providerError } = await supabase
          .from('users')
          .select('id, username, avatar_url, role')
          .eq('id', serviceData.provider_id)
          .single()
        
        if (providerError) throw providerError;

        setService(serviceData)
        setProvider(providerData)
      } catch (error) {
        console.error('Error fetching service details:', error)
        toast.error('Failed to load service details')
       } finally {
        setLoading(false)
      }
    };

    fetchServiceDetails()
  }, [id])

  const getAvatarUrl = (avatarPath) => {
    if (!avatarPath) return null
    if (avatarPath.startsWith('http')) return avatarPath;
    const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(avatarPath)
    return publicUrl
  }


  return (
    <div>ServiceDetails</div>
  )
}

export default ServiceDetails