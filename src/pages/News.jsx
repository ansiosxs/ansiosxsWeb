import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { articles } from '@/data/articles';
import { Link } from 'react-router-dom';

const News = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['todos', ...new Set(articles.map(a => a.category))].map(c => ({
    id: c,
    name: c.charAt(0).toUpperCase() + c.slice(1)
  }));
  
  const filteredPosts = useMemo(() => {
    let filtered = articles;

    if (selectedCategory !== 'todos') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    if (searchQuery.trim() !== '') {
      const lowercasedQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(lowercasedQuery) || 
        post.excerpt.toLowerCase().includes(lowercasedQuery)
      );
    }
    
    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [selectedCategory, searchQuery]);

  return (
    <>
      <Helmet>
        <title>Noticias - Ansiosxs – Nuevas Lecturas</title>
        <meta name="description" content="Reflexiones, experiencias y recursos sobre arte, narrativa y transformación social. Historias que inspiran y conectan comunidades." />
      </Helmet>

      <div className="pt-16 overflow-hidden">
        <section className="section-padding bg-brand-pink/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8 }} 
              className="relative pb-10"
            >
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-purple mb-6 relative inline-block">
                Noticias y Novedades
              </h1>
              <p className="text-lg text-brand-text/80 max-w-3xl mx-auto leading-relaxed mt-4">
                Este espacio funciona como un cuaderno de bitácora para documentar nuestro recorrido, celebrar los logros colectivos y anunciar las convocatorias abiertas para que te sumes a nuestras iniciativas. ¡No te pierdas lo que viene!
              </p>
              <img src="https://storage.googleapis.com/hostinger-horizons-assets-prod/30a6ebc2-adae-4ac3-ae05-32a429feedcf/d2c1b7a20fd443774c5d410b77c27201.png" alt="Mascota de pajarito con lentes" className="absolute -bottom-4 right-5 md:right-10 w-24 h-auto transform -scale-x-100 rotate-12 pointer-events-none hidden md:block" />
            </motion.div>
          </div>
        </section>

        <section className="py-8 bg-white border-b border-brand-text/10 sticky top-16 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 w-full md:w-auto md:max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                <input 
                  type="text" 
                  placeholder="Buscar artículos por título o contenido..." 
                  className="w-full pl-10 pr-4 py-2 border-2 border-brand-text rounded-full focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {categories.map(category => (
                  <Button 
                    key={category.id} 
                    onClick={() => setSelectedCategory(category.id)} 
                    className={`rounded-full px-4 py-2 text-sm transition-all duration-300 border-2 border-brand-text ${selectedCategory === category.id ? 'bg-brand-purple text-white shadow-[2px_2px_0px_#2d2d2d]' : 'bg-white text-brand-text hover:bg-brand-yellow/50'}`}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        <section className="section-padding bg-brand-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatePresence>
              <motion.div 
                layout 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredPosts.map((post) => (
                  <motion.article 
                    layout
                    key={post.id} 
                    initial={{ opacity: 0, scale: 0.8 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4 }} 
                    className="sticker-card sticker-card-hover overflow-hidden flex flex-col"
                  >
                    <div className="relative">
                      <img className="w-full h-48 object-cover" alt={`Artículo: ${post.title}`} src={post.imageUrl} />
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center justify-between mb-3">
                         <span className="bg-brand-yellow text-brand-text px-3 py-1 rounded-full text-xs font-medium border-2 border-brand-text capitalize">
                          {post.category}
                         </span>
                         <span className="text-sm text-brand-text/60">{post.readTime} de lectura</span>
                      </div>

                      <h3 className="font-serif text-xl font-semibold text-brand-text mb-3 line-clamp-2 flex-grow">
                        {post.title}
                      </h3>
                      
                      <p className="text-brand-text/80 text-sm leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center text-sm text-brand-text/60 mt-auto pt-4 border-t-2 border-brand-text/10">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{new Date(post.date).toLocaleDateString('es-ES')}</span>
                        </div>
                      </div>
                      
                      <Link to={`/noticias/${post.slug}`} className="mt-4">
                        <Button className="w-full bg-brand-pink hover:bg-brand-pink/90 text-white rounded-full">
                          Leer más
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>
            {filteredPosts.length === 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center col-span-full py-16"
              >
                <p className="text-xl text-brand-text/70 font-semibold">No se encontraron resultados</p>
                <p className="text-brand-text/60 mt-2">Intenta con otra búsqueda o categoría.</p>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default News;