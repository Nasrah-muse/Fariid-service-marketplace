import { useTheme } from "../contexts/ThemeContext";

 
const SignUpPage = () => {
  const { theme } = useTheme();
  
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);


  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${theme === 'dark' 
      ? 'bg-indigo-200 text-sky-200'
      : 'bg-gray-200 text-indigo-900'}`}>

    </div>
  )
}

export default SignUpPage