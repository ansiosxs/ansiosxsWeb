import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Plus, Edit, Trash2, Search, Loader2, AlertCircle, Boxes } from 'lucide-react';
import { bibliotecaApi } from '@/lib/bibliotecaApi';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const CantidadBadge = ({ cantidad }) => {
  const total = Number(cantidad) || 0;
  const style = total === 0
    ? 'bg-brand-pink/15 text-brand-pink'
    : total <= 2
      ? 'bg-brand-yellow/30 text-brand-text'
      : 'bg-brand-blue/30 text-brand-text';

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold border-2 border-brand-text ${style}`}>
      <Boxes className="h-3.5 w-3.5" />
      {total}
    </span>
  );
};

const LibroRow = ({ libro, onEdit, onDelete, isDeleting }) => (
  <motion.tr
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.2 }}
    className="group hover:bg-brand-purple/5 transition-colors"
  >
    <td className="py-3 px-4 border-b border-brand-text/10 text-brand-text/50 font-mono text-sm">
      {libro.id}
    </td>
    <td className="py-3 px-4 border-b border-brand-text/10">
      <span className="font-bold text-brand-text">{libro.titulo}</span>
    </td>
    <td className="py-3 px-4 border-b border-brand-text/10 text-brand-text/80">
      {libro.autor}
    </td>
    <td className="py-3 px-4 border-b border-brand-text/10 hidden md:table-cell">
      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-brand-purple/10 text-brand-purple border border-brand-purple/30">
        {libro.seccion}
      </span>
    </td>
    <td className="py-3 px-4 border-b border-brand-text/10">
      <CantidadBadge cantidad={libro.cantidad} />
    </td>
    <td className="py-3 px-4 border-b border-brand-text/10">
      <div className="flex items-center justify-end gap-2">
        <button
          onClick={() => onEdit(libro)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold border-2 border-brand-text text-brand-text hover:bg-brand-purple/15 hover:border-brand-purple hover:text-brand-purple transition-all"
          aria-label={`Editar ${libro.titulo}`}
        >
          <Edit className="h-3.5 w-3.5" />
          <span className="hidden lg:inline">Editar</span>
        </button>
        <button
          onClick={() => onDelete(libro.id)}
          disabled={isDeleting}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold border-2 border-brand-text text-brand-text hover:bg-red-100 hover:border-red-500 hover:text-red-600 transition-all disabled:opacity-50"
          aria-label={`Eliminar ${libro.titulo}`}
        >
          {isDeleting ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Trash2 className="h-3.5 w-3.5" />
          )}
          <span className="hidden lg:inline">Eliminar</span>
        </button>
      </div>
    </td>
  </motion.tr>
);

export const LibroList = ({ onEdit, onCreateNew }) => {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const { toast } = useToast();

  const fetchLibros = async () => {
    try {
      setLoading(true);
      const data = await bibliotecaApi.getLibros();
      setLibros(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      toast({
        title: "Error",
        description: "No se pudieron cargar los libros",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este libro del inventario?')) {
      return;
    }
    try {
      setDeletingId(id);
      await bibliotecaApi.deleteLibro(id);
      setLibros(libros.filter(l => l.id !== id));
      toast({
        title: "Eliminado",
        description: "El libro ha sido eliminado correctamente",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "No se pudo eliminar el libro",
        variant: "destructive",
      });
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchLibros();
  }, []);

  const term = searchTerm.trim().toLowerCase();
  const filteredLibros = libros.filter(libro =>
    libro.titulo.toLowerCase().includes(term) ||
    libro.autor.toLowerCase().includes(term) ||
    libro.seccion.toLowerCase().includes(term)
  );

  const totalEjemplares = libros.reduce((sum, l) => sum + (Number(l.cantidad) || 0), 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-brand-purple" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="sticker-card p-8 text-center bg-red-50 border-red-300">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="font-bold text-lg text-red-700 mb-2">Error al cargar libros</h3>
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={fetchLibros} className="sticker-button border-brand-text">
          Reintentar
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-text/50" />
          <input
            type="text"
            placeholder="Buscar por título, autor o sección..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border-2 border-brand-text/30 rounded-full bg-white focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20"
          />
        </div>
        <Button
          onClick={onCreateNew}
          className="sticker-button bg-brand-purple border-brand-purple text-white hover:bg-brand-purple/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Libro
        </Button>
      </div>

      {libros.length > 0 && (
        <div className="flex flex-wrap items-center gap-3">
          <span className="sticker-card px-4 py-2 inline-flex items-center gap-2 text-sm font-semibold text-brand-text">
            <BookOpen className="h-4 w-4 text-brand-purple" />
            {libros.length} {libros.length === 1 ? 'título' : 'títulos'}
          </span>
          <span className="sticker-card px-4 py-2 inline-flex items-center gap-2 text-sm font-semibold text-brand-text">
            <Boxes className="h-4 w-4 text-brand-blue" />
            {totalEjemplares} {totalEjemplares === 1 ? 'ejemplar' : 'ejemplares'}
          </span>
        </div>
      )}

      <AnimatePresence mode="popLayout">
        {filteredLibros.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="sticker-card overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[540px] border-collapse">
                <thead>
                  <tr className="bg-brand-purple/10">
                    <th scope="col" className="py-4 px-4 text-left text-xs font-bold uppercase tracking-wider text-brand-text/70 border-b-2 border-brand-text/20">
                      #
                    </th>
                    <th scope="col" className="py-4 px-4 text-left text-xs font-bold uppercase tracking-wider text-brand-text/70 border-b-2 border-brand-text/20">
                      Título
                    </th>
                    <th scope="col" className="py-4 px-4 text-left text-xs font-bold uppercase tracking-wider text-brand-text/70 border-b-2 border-brand-text/20">
                      Autor
                    </th>
                    <th scope="col" className="py-4 px-4 text-left text-xs font-bold uppercase tracking-wider text-brand-text/70 border-b-2 border-brand-text/20 hidden md:table-cell">
                      Sección
                    </th>
                    <th scope="col" className="py-4 px-4 text-left text-xs font-bold uppercase tracking-wider text-brand-text/70 border-b-2 border-brand-text/20">
                      Ejemplares
                    </th>
                    <th scope="col" className="py-4 px-4 text-right text-xs font-bold uppercase tracking-wider text-brand-text/70 border-b-2 border-brand-text/20">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence mode="popLayout">
                    {filteredLibros.map((libro) => (
                      <LibroRow
                        key={libro.id}
                        libro={libro}
                        onEdit={onEdit}
                        onDelete={handleDelete}
                        isDeleting={deletingId === libro.id}
                      />
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="sticker-card p-12 text-center bg-brand-blue/10"
          >
            <BookOpen className="h-16 w-16 text-brand-blue/50 mx-auto mb-4" />
            <h3 className="font-bold text-xl text-brand-text mb-2">
              {term ? 'No se encontraron libros' : 'No hay libros registrados'}
            </h3>
            <p className="text-brand-text/70 mb-6">
              {term
                ? 'Intenta con otros términos de búsqueda'
                : 'Comienza agregando el primer libro a la biblioteca'}
            </p>
            {!term && (
              <Button onClick={onCreateNew} className="sticker-button bg-brand-purple border-brand-purple text-white">
                <Plus className="h-4 w-4 mr-2" />
                Agregar Primer Libro
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
