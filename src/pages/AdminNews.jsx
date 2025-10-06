import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminNews = () => {
  const [news, setNews] = useState([]);
  const [form, setForm] = useState({
    slug: '', title: '', excerpt: '', content: '', category: '', date: '', author: '', imageUrl: '', previewImageUrl: '', isEvent: false, eventDate: ''
  });
  const [editingId, setEditingId] = useState(null);
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
      const res = await fetch('http://localhost:4000/api/articles', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Error al cargar artículos');
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
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `http://localhost:4000/api/articles/${editingId}` : 'http://localhost:4000/api/articles';
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error(editingId ? 'Error al actualizar artículo' : 'Error al crear artículo');
      setForm({ slug: '', title: '', excerpt: '', content: '', category: '', date: '', author: '', imageUrl: '', previewImageUrl: '', isEvent: false, eventDate: '' });
      setEditingId(null);
      setSuccess(editingId ? 'Artículo actualizado' : 'Artículo creado');
      fetchNews();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setForm({
      slug: item.slug || '',
      title: item.title || '',
      excerpt: item.excerpt || '',
      content: item.content || '',
      category: item.category || '',
      date: item.date ? new Date(item.date).toISOString().slice(0, 16) : '',
      author: item.author || '',
      imageUrl: item.imageUrl || '',
      previewImageUrl: item.previewImageUrl || '',
      isEvent: !!item.isEvent,
      eventDate: item.eventDate ? new Date(item.eventDate).toISOString().slice(0, 16) : ''
    });
  };

  const uploadFile = async (file) => {
    const token = localStorage.getItem('adminToken');
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('http://localhost:4000/api/upload', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    });
    if (!res.ok) throw new Error('Error subiendo archivo');
    return res.json();
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar artículo?')) return;
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`http://localhost:4000/api/articles/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok && res.status !== 204) throw new Error('Error al eliminar');
      setSuccess('Artículo eliminado');
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
        <h2 className="text-2xl font-bold mb-4">Panel de Artículos</h2>
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Slug</label>
              <input type="text" className="w-full border px-3 py-2 rounded" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} required disabled={loading} />
            </div>
            <div>
              <label className="block mb-1 font-medium">Título</label>
              <input type="text" className="w-full border px-3 py-2 rounded" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required disabled={loading} />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-1 font-medium">Extracto</label>
              <input type="text" className="w-full border px-3 py-2 rounded" value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} disabled={loading} />
            </div>
            <div>
              <label className="block mb-1 font-medium">Categoría</label>
              <input type="text" className="w-full border px-3 py-2 rounded" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} disabled={loading} />
            </div>
            <div>
              <label className="block mb-1 font-medium">Fecha publicación</label>
              <input type="datetime-local" className="w-full border px-3 py-2 rounded" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} disabled={loading} />
            </div>
            <div>
              <label className="block mb-1 font-medium">Autor</label>
              <input type="text" className="w-full border px-3 py-2 rounded" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} disabled={loading} />
            </div>
            <div>
              <label className="block mb-1 font-medium">Imagen</label>
              <div className="flex gap-2">
                <input type="text" className="w-full border px-3 py-2 rounded" placeholder="/uploads/archivo.png o URL completa" value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} disabled={loading} />
                <input type="file" accept="image/*" onChange={async (e) => {
                  const file = e.target.files && e.target.files[0];
                  if (!file) return;
                  try {
                    setLoading(true);
                    const { url } = await uploadFile(file);
                    setForm(prev => ({ ...prev, imageUrl: url }));
                    setSuccess('Imagen subida');
                  } catch (err) {
                    setError(err.message);
                  } finally {
                    setLoading(false);
                  }
                }} disabled={loading} />
              </div>
            </div>
            <div>
              <label className="block mb-1 font-medium">Preview</label>
              <div className="flex gap-2">
                <input type="text" className="w-full border px-3 py-2 rounded" placeholder="/uploads/archivo.webp o URL completa" value={form.previewImageUrl} onChange={e => setForm({ ...form, previewImageUrl: e.target.value })} disabled={loading} />
                <input type="file" accept="image/*" onChange={async (e) => {
                  const file = e.target.files && e.target.files[0];
                  if (!file) return;
                  try {
                    setLoading(true);
                    const { url } = await uploadFile(file);
                    setForm(prev => ({ ...prev, previewImageUrl: url }));
                    setSuccess('Preview subida');
                  } catch (err) {
                    setError(err.message);
                  } finally {
                    setLoading(false);
                  }
                }} disabled={loading} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input id="isEvent" type="checkbox" checked={form.isEvent} onChange={e => setForm({ ...form, isEvent: e.target.checked })} disabled={loading} />
              <label htmlFor="isEvent" className="font-medium">Es evento</label>
            </div>
            <div>
              <label className="block mb-1 font-medium">Fecha evento</label>
              <input type="datetime-local" className="w-full border px-3 py-2 rounded" value={form.eventDate} onChange={e => setForm({ ...form, eventDate: e.target.value })} disabled={loading || !form.isEvent} />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-1 font-medium">Contenido (HTML permitido)</label>
              <textarea className="w-full border px-3 py-2 rounded" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} required rows={8} disabled={loading}></textarea>
            </div>
          </div>
          <button type="submit" className="w-full bg-brand-pink text-white py-2 rounded font-semibold" disabled={loading}>{loading ? (editingId ? 'Actualizando...' : 'Creando...') : (editingId ? 'Actualizar' : 'Crear')}</button>
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          {success && <div className="text-green-600 text-sm text-center">{success}</div>}
        </form>
        <h3 className="text-xl font-semibold mb-2">Artículos existentes</h3>
        {loading ? <div>Cargando...</div> : (
          <ul className="space-y-2">
            {news.map(n => (
              <li key={n.id} className="border-b py-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold">{n.title}</div>
                    <div className="text-xs text-gray-500">/{n.slug}</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(n)} className="text-blue-600 text-sm">Editar</button>
                    <button onClick={() => handleDelete(n.id)} className="text-red-600 text-sm">Eliminar</button>
                  </div>
                </div>
                <div className="text-sm text-gray-600 line-clamp-2" dangerouslySetInnerHTML={{ __html: n.excerpt || '' }} />
                <div className="text-xs text-gray-400">{n.date ? new Date(n.date).toLocaleString('es-CL') : ''}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminNews; 