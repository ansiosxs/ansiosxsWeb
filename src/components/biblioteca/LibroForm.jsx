import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Loader2, AlertCircle, BookOpen, User, Tag, Boxes, Minus, Plus } from 'lucide-react';
import { bibliotecaApi, ApiError } from '@/lib/bibliotecaApi';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const EMPTY_FORM = {
  titulo: '',
  autor: '',
  seccion: '',
  cantidad: 1,
};

export const LibroForm = ({ libro, onClose, onSuccess }) => {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (libro) {
      setFormData({
        titulo: libro.titulo || '',
        autor: libro.autor || '',
        seccion: libro.seccion || '',
        cantidad: Number(libro.cantidad) || 0,
      });
    } else {
      setFormData(EMPTY_FORM);
    }
    setErrors({});
  }, [libro]);

  const validate = () => {
    const newErrors = {};
    if (!formData.titulo.trim() || formData.titulo.trim().length < 2) {
      newErrors.titulo = 'El título debe tener al menos 2 caracteres';
    }
    if (!formData.autor.trim() || formData.autor.trim().length < 2) {
      newErrors.autor = 'El autor debe tener al menos 2 caracteres';
    }
    if (!formData.seccion.trim()) {
      newErrors.seccion = 'La sección es obligatoria';
    }
    if (!Number.isInteger(formData.cantidad) || formData.cantidad < 0) {
      newErrors.cantidad = 'La cantidad debe ser 0 o un número entero';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const adjustCantidad = (delta) => {
    setFormData(prev => ({
      ...prev,
      cantidad: Math.max(0, (Number(prev.cantidad) || 0) + delta),
    }));
    setErrors(prev => ({ ...prev, cantidad: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      if (libro) {
        await bibliotecaApi.updateLibro(libro.id, formData);
        toast({
          title: "Actualizado",
          description: "El libro ha sido actualizado correctamente",
        });
      } else {
        await bibliotecaApi.createLibro(formData);
        toast({
          title: "Creado",
          description: "El libro ha sido registrado exitosamente",
        });
      }
      onSuccess();
    } catch (err) {
      const fieldErrors = err instanceof ApiError ? err.fieldErrors : {};
      if (Object.keys(fieldErrors).length > 0) {
        setErrors(fieldErrors);
      } else {
        toast({
          title: "Error",
          description: err.message || "No se pudo guardar el libro",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCantidadChange = (e) => {
    const raw = e.target.value;
    setFormData(prev => ({
      ...prev,
      cantidad: raw === '' ? '' : Number(raw.replace(/[^0-9]/g, '')),
    }));
    setErrors(prev => ({ ...prev, cantidad: '' }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md bg-white rounded-3xl border-2 border-brand-text shadow-[8px_8px_0px_#ac7fff] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-brand-pink/10 text-brand-text/60 hover:text-brand-pink transition-colors"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-brand-purple/20 border-2 border-brand-text rounded-full">
            <BookOpen className="h-6 w-6 text-brand-purple" />
          </div>
          <h2 className="font-cookie text-2xl font-bold text-brand-purple">
            {libro ? 'Editar Libro' : 'Nuevo Libro'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="titulo" className="block text-sm font-medium text-brand-text mb-1 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-brand-purple" />
              Título del Libro
            </label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-brand-purple/20 transition-colors ${
                errors.titulo ? 'border-red-400' : 'border-brand-text/30'
              }`}
              placeholder="Ej: El Principito"
              disabled={loading}
              autoFocus
            />
            {errors.titulo && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.titulo}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="autor" className="block text-sm font-medium text-brand-text mb-1 flex items-center gap-2">
              <User className="h-4 w-4 text-brand-pink" />
              Autor
            </label>
            <input
              type="text"
              id="autor"
              name="autor"
              value={formData.autor}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-brand-pink/20 transition-colors ${
                errors.autor ? 'border-red-400' : 'border-brand-text/30'
              }`}
              placeholder="Ej: Antoine de Saint-Exupéry"
              disabled={loading}
            />
            {errors.autor && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.autor}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="seccion" className="block text-sm font-medium text-brand-text mb-1 flex items-center gap-2">
              <Tag className="h-4 w-4 text-brand-blue" />
              Sección / Estante
            </label>
            <input
              type="text"
              id="seccion"
              name="seccion"
              value={formData.seccion}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-colors ${
                errors.seccion ? 'border-red-400' : 'border-brand-text/30'
              }`}
              placeholder="Ej: Ficción, Infantil, Historia..."
              disabled={loading}
            />
            {errors.seccion && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.seccion}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="cantidad" className="block text-sm font-medium text-brand-text mb-1 flex items-center gap-2">
              <Boxes className="h-4 w-4 text-brand-pink" />
              Cantidad de ejemplares
            </label>
            <div className="flex items-stretch gap-2">
              <button
                type="button"
                onClick={() => adjustCantidad(-1)}
                disabled={loading || (Number(formData.cantidad) || 0) <= 0}
                className="px-4 rounded-xl border-2 border-brand-text bg-white text-brand-text hover:bg-brand-pink/15 hover:border-brand-pink transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Restar un ejemplar"
              >
                <Minus className="h-4 w-4" />
              </button>
              <input
                type="text"
                inputMode="numeric"
                id="cantidad"
                name="cantidad"
                value={formData.cantidad}
                onChange={handleCantidadChange}
                className={`flex-1 min-w-0 text-center px-4 py-3 border-2 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-brand-pink/20 transition-colors font-bold ${
                  errors.cantidad ? 'border-red-400' : 'border-brand-text/30'
                }`}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => adjustCantidad(1)}
                disabled={loading}
                className="px-4 rounded-xl border-2 border-brand-text bg-white text-brand-text hover:bg-brand-pink/15 hover:border-brand-pink transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Sumar un ejemplar"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-1 text-xs text-brand-text/50">
              Copias físicas de este título que tiene la biblioteca.
            </p>
            {errors.cantidad && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.cantidad}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-brand-text/20">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 sticker-button border-brand-text text-brand-text hover:bg-brand-pink/10 hover:border-brand-pink"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 sticker-button bg-brand-purple border-brand-purple text-white hover:bg-brand-purple/90 disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Guardando...
                </span>
              ) : (
                libro ? 'Actualizar' : 'Guardar'
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};