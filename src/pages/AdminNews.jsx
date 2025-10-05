import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminNews = () => {
  const [news, setNews] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Proteger ruta
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) navigate('/admin/login');
    // eslint-disable-next-line
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('http://localhost:4000/news', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Error al cargar noticias');
      const data = await res.json();
      setNews(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('http://localhost:4000/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, content })
      });
      if (!res.ok) throw new Error('Error al subir noticia');
      setTitle('');
      setContent('');
      setSuccess('Noticia subida correctamente');
      fetchNews();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-yellow/10 p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md border-2 border-brand-text/10">
        <h2 className="text-2xl font-bold mb-4">Panel de Noticias</h2>
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <div>
            <label className="block mb-1 font-medium">Título</label>
            <input type="text" className="w-full border px-3 py-2 rounded" value={title} onChange={e => setTitle(e.target.value)} required disabled={loading} />
          </div>
          <div>
            <label className="block mb-1 font-medium">Contenido</label>
            <textarea className="w-full border px-3 py-2 rounded" value={content} onChange={e => setContent(e.target.value)} required rows={5} disabled={loading}></textarea>
          </div>
          <button type="submit" className="w-full bg-brand-pink text-white py-2 rounded font-semibold" disabled={loading}>{loading ? 'Subiendo...' : 'Subir Noticia'}</button>
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          {success && <div className="text-green-600 text-sm text-center">{success}</div>}
        </form>
        <h3 className="text-xl font-semibold mb-2">Noticias Existentes</h3>
        {loading ? <div>Cargando...</div> : (
          <ul className="space-y-2">
            {news.map(n => (
              <li key={n.id} className="border-b py-2">
                <div className="font-bold">{n.title}</div>
                <div className="text-sm text-gray-600 whitespace-pre-line">{n.content}</div>
                <div className="text-xs text-gray-400">{new Date(n.created_at).toLocaleString()}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminNews; 