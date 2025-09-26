import { useState } from 'react';
import { login } from '../api/auth';
import { setToken } from '../utils/auth';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await login(form);
      setToken(res.token);
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={onSubmit} className="w-full max-w-md bg-white shadow rounded-lg p-6 space-y-4">
        <h1 className="text-2xl font-semibold text-gray-800 text-center">Login</h1>
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        <input name="email" value={form.email} onChange={onChange} placeholder="Email" type="email" className="w-full border rounded-md p-2" />
        <input name="password" value={form.password} onChange={onChange} placeholder="Password" type="password" className="w-full border rounded-md p-2" />
        <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md p-2">{loading ? 'Logging in...' : 'Login'}</button>
        <p className="text-center text-sm">New here? <a href="/signup" className="text-blue-600">Create account</a></p>
      </form>
    </div>
  );
}
