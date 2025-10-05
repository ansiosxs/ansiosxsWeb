import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error de autenticación');
      localStorage.setItem('adminToken', data.token);
      navigate('/admin/news');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-yellow/20">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm space-y-6 border-2 border-brand-text/10">
        <h2 className="text-2xl font-bold text-center mb-4">Panel de Administración</h2>
        {error && <div className="text-red-600 text-sm text-center">{error}</div>}
        <div>
          <label className="block mb-1 font-medium">Usuario</label>
          <input type="text" className="w-full border px-3 py-2 rounded" value={username} onChange={e => setUsername(e.target.value)} required disabled={loading} />
        </div>
        <div>
          <label className="block mb-1 font-medium">Contraseña</label>
          <input type="password" className="w-full border px-3 py-2 rounded" value={password} onChange={e => setPassword(e.target.value)} required disabled={loading} />
        </div>
        <button type="submit" className="w-full bg-brand-pink text-white py-2 rounded font-semibold" disabled={loading}>{loading ? 'Ingresando...' : 'Ingresar'}</button>
      </form>
    </div>
  );
};

export default AdminLogin; 