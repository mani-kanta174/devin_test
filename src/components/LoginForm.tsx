import { FormEvent, useState } from 'react';
import { validateEmail } from '../utils/validation';


export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) return setError('Please enter a valid email');
    if (password.length < 8) return setError('Password must be at least 8 characters');
    setError('');
    setUser(email);
  };

  if (user) return <p role="status">Welcome, {user}!</p>;

  return (
    <form onSubmit={submit} noValidate>
      <label>
        Email
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Password
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      {error && <p role="alert">{error}</p>}
      <button type="submit">Log in</button>
    </form>
  );
}
