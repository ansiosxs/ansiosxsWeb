import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Calendar, User, Tag, ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');

  const categories = [
    { id: 'todos', name: 'Todos' },
    { id: 'reflexiones', name: 'Reflexiones' },
    { id: 'experiencias', name: 'Experiencias' },
    { id: 'recursos', name: 'Recursos' },
    { id: 'comunidad', name: 'Comunidad' }
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'El Arte como Puente Generacional',
      category: 'reflexiones',
      excerpt: 'Reflexionamos sobre cómo las actividades artísticas pueden conectar diferentes generaciones, creando espacios de comprensión mutua y aprendizaje compartido.',
      image: 'Grandparents and grandchildren creating art together in a warm, sunlit room',
      author: 'María González',
      date: '2025-06-15',
      tags: ['intergeneracional', 'arte', 'familia']
    },
    {
      id: 2,
      title: 'Cómo Crear Espacios Seguros para la Expresión',
      category: 'recursos',
      excerpt: 'Guía práctica para facilitadores sobre cómo establecer ambientes donde todas las personas se sientan cómodas para expresarse auténticamente.',
      image: 'A welcoming circle of diverse people in a bright, comfortable space with art materials',
      author: 'Carlos Ruiz',
      date: '2025-06-10',
      tags: ['facilitación', 'espacios seguros', 'metodología']
    },
    {
      id: 3,
      title: 'La Magia de los Cuentos Compartidos',
      category: 'experiencias',
      excerpt: 'Relato de nuestra experiencia en el proyecto "Cuentos del Barrio" y cómo las historias locales fortalecieron la identidad comunitaria.',
      image: 'Community members sharing stories in a cozy neighborhood setting with warm lighting',
      author: 'Ana Martín',
      date: '2025-06-05',
      tags: ['storytelling', 'comunidad', 'identidad']
    },
    {
      id: 4,
      title: 'Redescubriendo Nuestra Infancia Interior',
      category: 'reflexiones',
      excerpt: 'Exploramos la importancia de reconectar con nuestra capacidad de asombro y creatividad, independientemente de la edad que tengamos.',
      image: 'Adults engaged in playful creative activities with childlike wonder and joy',
      author: 'Luis Fernández',
      date: '2025-05-28',
      tags: ['infancia', 'creatividad', 'desarrollo personal']
    },
    {
      id: 5,
      title: 'El Impacto Social del Arte Comunitario',
      category: 'comunidad',
      excerpt: 'Análisis de cómo nuestros proyectos artísticos han contribuido a fortalecer los vínculos sociales y mejorar la cohesión comunitaria.',
      image: 'Before and after images of a community space transformed through collaborative art projects',
      author: 'Carmen López',
      date: '2025-05-20',
      tags: ['impacto social', 'arte comunitario', 'transformación']
    },
    {
      id: 6,
      title: 'Herramientas Creativas para Educadores',
      category: 'recursos',
      excerpt: 'Compilación de técnicas y recursos que los educadores pueden usar para integrar el arte y la narrativa en sus prácticas pedagógicas.',
      image: 'Teachers learning creative techniques with art supplies and educational materials',
      author: 'Equipo Ansiosxs',
      date: '2025-05-15',
      tags: ['educación', 'herramientas', 'pedagogía creativa']
    }
  ];

  const filteredPosts = selectedCategory === 'todos' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const handleReadMore = (postTitle) => {
    toast({
      title: "🚧 Esta funcionalidad aún no está implementada",
      description: "¡Pero no te preocupes! Puedes solicitarla en tu próximo mensaje 🚀",
    });
  };

  return (
    <>
      <Helmet>
        <title>Blog - Ansiosxs – Nuevas Lecturas</title>
        <meta name="description" content="Reflexiones, experiencias y recursos sobre arte, narrativa y transformación social. Historias que inspiran y conectan comunidades." />
      </Helmet>

      <div className="pt-16">
        {/* Hero Section */}
        <section className="section-padding bg-brand-pink/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-purple mb-6">
                Historias y Reflexiones
              </h1>
              <p className="text-lg text-brand-text/80 max-w-3xl mx-auto leading-relaxed">
                Compartimos experiencias, reflexiones y recursos sobre el poder transformador 
                del arte y la narrativa en nuestras comunidades.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="py-8 bg-white border-b border-brand-text/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar artículos..."
                  className="w-full pl-10 pr-4 py-2 border-2 border-brand-text rounded-full focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent"
                  onChange={() => toast({
                    title: "🚧 Esta funcionalidad aún no está implementada",
                    description: "¡Pero no te preocupes! Puedes solicitarla en tu próximo mensaje 🚀",
                  })}
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`rounded-full px-4 py-2 text-sm transition-all duration-300 border-2 border-brand-text ${
                      selectedCategory === category.id
                        ? 'bg-brand-purple text-white shadow-[2px_2px_0px_#2d2d2d]'
                        : 'bg-white text-brand-text hover:bg-brand-yellow/50'
                    }`}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {filteredPosts.length > 0 && (
          <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-brand-blue/10 rounded-3xl overflow-hidden sticker-card sticker-card-hover"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative">
                    <img 
                      className="w-full h-64 lg:h-full object-cover"
                      alt={`Artículo destacado: ${filteredPosts[0].title}`}
                     src="https://images.unsplash.com/photo-1619199059624-7335464ea7b0" />
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="mb-4">
                      <span className="bg-brand-yellow text-brand-text px-3 py-1 rounded-full text-sm font-medium border-2 border-brand-text">
                        Artículo Destacado
                      </span>
                    </div>
                    <h2 className="font-serif text-2xl lg:text-3xl font-bold text-brand-text mb-4">
                      {filteredPosts[0].title}
                    </h2>
                    <p className="text-brand-text/80 leading-relaxed mb-6">
                      {filteredPosts[0].excerpt}
                    </p>
                    <div className="flex items-center text-sm text-brand-text/60 mb-6">
                      <User className="h-4 w-4 mr-2" />
                      <span className="mr-4">{filteredPosts[0].author}</span>
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="mr-4">{new Date(filteredPosts[0].date).toLocaleDateString('es-ES')}</span>
                    </div>
                    <Button 
                      onClick={() => handleReadMore(filteredPosts[0].title)}
                      className="bg-brand-pink hover:bg-brand-pink/90 text-white rounded-full w-fit"
                    >
                      Leer Artículo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Blog Posts Grid */}
        <section className="section-padding bg-brand-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.slice(1).map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="sticker-card sticker-card-hover overflow-hidden"
                >
                  <div className="relative">
                    <img 
                      className="w-full h-48 object-cover"
                      alt={`Artículo: ${post.title}`}
                     src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                  </div>

                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span 
                          key={tag}
                          className="bg-brand-purple/10 text-brand-purple px-2 py-1 rounded-full text-xs font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="font-serif text-xl font-semibold text-brand-text mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-brand-text/80 text-sm leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-sm text-brand-text/60 mb-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{new Date(post.date).toLocaleDateString('es-ES')}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-end">
                      <Button 
                        onClick={() => handleReadMore(post.title)}
                        variant="ghost"
                        size="sm"
                        className="text-brand-pink hover:text-brand-pink/80 hover:bg-brand-pink/10 p-2"
                      >
                        Leer más
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="section-padding bg-brand-yellow/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-text mb-6">
                No Te Pierdas Nuestras Historias
              </h2>
              <p className="text-lg text-brand-text/80 mb-8 max-w-2xl mx-auto">
                Suscríbete a nuestro boletín para recibir las últimas reflexiones, 
                recursos y noticias sobre nuestros proyectos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="flex-1 px-4 py-3 border-2 border-brand-text rounded-full focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent"
                />
                <Button 
                  onClick={() => toast({
                    title: "🚧 Esta funcionalidad aún no está implementada",
                    description: "¡Pero no te preocupes! Puedes solicitarla en tu próximo mensaje 🚀",
                  })}
                  className="bg-brand-purple hover:bg-brand-purple/90 text-white px-8 py-3 sticker-button"
                >
                  Suscribirse
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Blog;