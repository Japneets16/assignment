import { useState } from 'react';
import { signup } from '../api/auth';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signup(form);
      alert('Signup successful. Please login.');
      window.location.href = '/login';
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={onSubmit} className="w-full max-w-md bg-white shadow rounded-lg p-6 space-y-4">
        <h1 className="text-2xl font-semibold text-gray-800 text-center">Create Account</h1>
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        <input name="name" value={form.name} onChange={onChange} placeholder="Name" className="w-full border rounded-md p-2" />
        <input name="email" value={form.email} onChange={onChange} placeholder="Email" type="email" className="w-full border rounded-md p-2" />
        <input name="password" value={form.password} onChange={onChange} placeholder="Password" type="password" className="w-full border rounded-md p-2" />
        <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md p-2">{loading ? 'Creating...' : 'Sign Up'}</button>
        <p className="text-center text-sm">Already have an account? <a href="/login" className="text-blue-600">Login</a></p>
      </form>
    </div>
  );
}
