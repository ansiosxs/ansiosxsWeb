import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Library, BookOpen } from 'lucide-react';
import { LibroList } from '@/components/biblioteca/LibroList';
import { LibroForm } from '@/components/biblioteca/LibroForm';

const BibliotecaInsectaria = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [editingLibro, setEditingLibro] = useState(null);
  const [listKey, setListKey] = useState(0);

  const handleCreateNew = () => {
    setEditingLibro(null);
    setFormOpen(true);
  };

  const handleEdit = (libro) => {
    setEditingLibro(libro);
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setEditingLibro(null);
  };

  const handleFormSuccess = () => {
    setFormOpen(false);
    setEditingLibro(null);
    setListKey((prev) => prev + 1);
  };

  return (
    <>
      <Helmet>
        <title>Biblioteca Insectaria - Ansiosxs – Nuevas Lecturas</title>
        <meta name="description" content="Inventario y gestión de libros de la Biblioteca Comunitaria Insectaria." />
      </Helmet>

      <div className="pt-16 min-h-screen">
        <section className="section-padding bg-brand-blue/20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex justify-center items-center space-x-4 mb-6">
                <div className="p-3 rounded-full bg-brand-blue/30 border-2 border-brand-text">
                  <Library className="h-10 w-10 text-brand-blue" />
                </div>
                <h1 className="font-cookie text-4xl md:text-5xl font-bold text-brand-purple">
                  Biblioteca Insectaria
                </h1>
              </div>
              <p className="text-lg text-brand-text/80 max-w-3xl mx-auto leading-relaxed">
                Inventario de la Biblioteca Comunitaria Insectaria: registra cada título,
                su autor, la sección donde se ubica y cuántas copias tenemos.
              </p>
            </motion.div>
          </div>
          <img
            src="/images/mascotas/bicho.png"
            alt=""
            aria-hidden="true"
            className="absolute bottom-0 -right-4 w-24 h-auto transform hidden lg:block pointer-events-none"
          />
        </section>

        <section className="section-padding bg-brand-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 rounded-full bg-brand-purple/20 border-2 border-brand-text">
                  <BookOpen className="h-6 w-6 text-brand-purple" />
                </div>
                <h2 className="font-cookie text-3xl font-bold text-brand-purple">
                  Inventario de Libros
                </h2>
              </div>

              <LibroList
                key={listKey}
                onCreateNew={handleCreateNew}
                onEdit={handleEdit}
              />
            </motion.div>
          </div>
        </section>
      </div>

      <AnimatePresence>
        {formOpen && (
          <LibroForm
            libro={editingLibro}
            onClose={handleFormClose}
            onSuccess={handleFormSuccess}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default BibliotecaInsectaria;
