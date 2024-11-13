'use client';

import { useState } from 'react'; 
import axios from 'axios'; 
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter(); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState(''); 

  // Handle form submission to log in the user
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      // Send login request to API
      const resp = await axios.post('/api/users/login', { email, password });
      if (resp.status === 200) {
        // On successful login, redirect to the Todo list page
        router.push('/todo');
      }
    } catch (error) {
      console.log(error); // Log any errors to the console
      // If login fails, set an error message to be displayed
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email} // Bind email input to state
          onChange={(e) => setEmail(e.target.value)} // Update email state on change
        />
        <input
          type="password"
          placeholder="Password"
          value={password} // Bind password input to state
          onChange={(e) => setPassword(e.target.value)} // Update password state on change
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
