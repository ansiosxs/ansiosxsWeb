import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Workshops = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');

  const categories = [
    { id: 'todos', name: 'Todos' },
    { id: 'ninos', name: 'Niños' },
    { id: 'jovenes', name: 'Jóvenes' },
    { id: 'adultos', name: 'Adultos' },
    { id: 'familias', name: 'Familias' }
  ];

  const workshops = [
    {
      id: 1,
      title: 'Cuentacuentos Mágicos',
      category: 'ninos',
      description: 'Taller donde los niños aprenden a crear y contar sus propias historias usando técnicas de narrativa visual y oral.',
      image: 'Children sitting in a circle listening to an animated storyteller with colorful picture books',
      date: '2025-07-15',
      time: '16:00 - 17:30',
      duration: '1.5 horas',
      participants: '8-12 niños',
      age: '5-10 años',
      price: 'Gratuito',
      location: 'Biblioteca Central',
      instructor: 'María González',
      rating: 4.9
    },
    {
      id: 2,
      title: 'Arte y Emociones',
      category: 'jovenes',
      description: 'Espacio seguro donde los jóvenes exploran sus emociones a través de diferentes técnicas artísticas y expresión creativa.',
      image: 'Teenagers expressing emotions through colorful paintings and art materials in a bright studio',
      date: '2025-07-18',
      time: '18:00 - 20:00',
      duration: '2 horas',
      participants: '10-15 jóvenes',
      age: '13-18 años',
      price: '15€',
      location: 'Centro Juvenil',
      instructor: 'Carlos Ruiz',
      rating: 4.8
    },
    {
      id: 3,
      title: 'Redescubriendo la Creatividad',
      category: 'adultos',
      description: 'Taller para adultos que desean reconectar con su niño interior y explorar nuevas formas de expresión artística.',
      image: 'Adults of various ages engaged in creative activities with art supplies and smiling faces',
      date: '2025-07-20',
      time: '19:00 - 21:00',
      duration: '2 horas',
      participants: '12-18 adultos',
      age: '25+ años',
      price: '25€',
      location: 'Estudio Creativo',
      instructor: 'Ana Martín',
      rating: 4.7
    },
    {
      id: 4,
      title: 'Historias en Familia',
      category: 'familias',
      description: 'Actividad intergeneracional donde familias crean historias colaborativas fortaleciendo vínculos a través del arte.',
      image: 'Families with children and grandparents working together on creative storytelling projects',
      date: '2025-07-22',
      time: '17:00 - 18:30',
      duration: '1.5 horas',
      participants: '6-10 familias',
      age: 'Todas las edades',
      price: '20€ por familia',
      location: 'Parque Cultural',
      instructor: 'Equipo Ansiosxs',
      rating: 5.0
    },
    {
      id: 5,
      title: 'Teatro de Improvisación',
      category: 'jovenes',
      description: 'Taller de teatro donde los jóvenes desarrollan confianza, creatividad y habilidades de comunicación a través de la improvisación.',
      image: 'Young people performing improvisational theater with expressive gestures and costumes',
      date: '2025-07-25',
      time: '16:30 - 18:30',
      duration: '2 horas',
      participants: '8-14 jóvenes',
      age: '14-20 años',
      price: '18€',
      location: 'Teatro Comunitario',
      instructor: 'Luis Fernández',
      rating: 4.6
    },
    {
      id: 6,
      title: 'Mindfulness Creativo',
      category: 'adultos',
      description: 'Combinamos técnicas de mindfulness con actividades artísticas para promover el bienestar y la conexión interior.',
      image: 'Adults in a peaceful setting practicing mindful art creation with natural lighting',
      date: '2025-07-27',
      time: '18:30 - 20:30',
      duration: '2 horas',
      participants: '10-16 adultos',
      age: '18+ años',
      price: '30€',
      location: 'Espacio Zen',
      instructor: 'Carmen López',
      rating: 4.9
    }
  ];

  const filteredWorkshops = selectedCategory === 'todos' 
    ? workshops 
    : workshops.filter(workshop => workshop.category === selectedCategory);

  const handleRegister = (workshopTitle) => {
    toast({
      title: "🚧 Esta funcionalidad aún no está implementada",
      description: "¡Pero no te preocupes! Puedes solicitarla en tu próximo mensaje 🚀",
    });
  };

  return (
    <>
      <Helmet>
        <title>Talleres y Eventos - Ansiosxs – Nuevas Lecturas</title>
        <meta name="description" content="Descubre nuestros talleres creativos para niños, jóvenes y adultos. Espacios de aprendizaje, expresión y conexión emocional." />
      </Helmet>

      <div className="pt-16">
        {/* Hero Section */}
        <section className="section-padding bg-brand-blue/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-purple mb-6">
                Talleres y Eventos
              </h1>
              <p className="text-lg text-brand-text/80 max-w-3xl mx-auto leading-relaxed">
                Espacios de aprendizaje, creatividad y conexión donde personas de todas las edades 
                pueden explorar el arte, la narrativa y el crecimiento personal.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter Categories */}
        <section className="py-8 bg-white border-b border-brand-text/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`rounded-full px-6 py-2 transition-all duration-300 border-2 border-brand-text ${
                    selectedCategory === category.id
                      ? 'bg-brand-pink text-white shadow-[2px_2px_0px_#2d2d2d]'
                      : 'bg-white text-brand-text hover:bg-brand-yellow/50'
                  }`}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Workshops Grid */}
        <section className="section-padding bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredWorkshops.map((workshop, index) => (
                <motion.div
                  key={workshop.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="sticker-card sticker-card-hover overflow-hidden"
                >
                  <div className="relative">
                    <img 
                      className="w-full h-48 object-cover"
                      alt={`Taller ${workshop.title}`}
                     src="https://images.unsplash.com/photo-1587712471859-932fab4b9802" />
                    <div className="absolute top-4 right-4 bg-brand-yellow rounded-full px-3 py-1 flex items-center border-2 border-brand-text">
                      <Star className="h-4 w-4 text-brand-text mr-1" />
                      <span className="text-sm font-medium text-brand-text">{workshop.rating}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-serif text-xl font-semibold text-brand-text mb-2">
                      {workshop.title}
                    </h3>
                    
                    <p className="text-brand-text/80 text-sm leading-relaxed mb-4">
                      {workshop.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-brand-text/60">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{new Date(workshop.date).toLocaleDateString('es-ES', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center text-sm text-brand-text/60">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{workshop.time} ({workshop.duration})</span>
                      </div>
                      <div className="flex items-center text-sm text-brand-text/60">
                        <Users className="h-4 w-4 mr-2" />
                        <span>{workshop.participants} • {workshop.age}</span>
                      </div>
                      <div className="flex items-center text-sm text-brand-text/60">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{workshop.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-bold text-brand-pink">
                        {workshop.price}
                      </span>
                      <span className="text-sm text-brand-text/60">
                        con {workshop.instructor}
                      </span>
                    </div>

                    <Button 
                      onClick={() => handleRegister(workshop.title)}
                      className="w-full bg-brand-purple hover:bg-brand-purple/90 text-white rounded-full"
                    >
                      Inscribirse
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="section-padding bg-brand-purple/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-text mb-4">
                Próximos Eventos Especiales
              </h2>
              <p className="text-lg text-brand-text/80 max-w-2xl mx-auto">
                Eventos únicos y experiencias especiales que no te puedes perder.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="sticker-card sticker-card-hover p-8"
              >
                <h3 className="font-serif text-2xl font-semibold text-brand-text mb-4">
                  Festival de Narrativa Comunitaria
                </h3>
                <p className="text-brand-text/80 mb-4">
                  Un día completo de actividades, talleres y presentaciones donde celebramos 
                  el poder transformador de las historias compartidas.
                </p>
                <div className="flex items-center text-sm text-brand-text/60 mb-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>15 de Agosto, 2025 • 10:00 - 18:00</span>
                </div>
                <Button 
                  onClick={() => handleRegister('Festival de Narrativa')}
                  className="bg-brand-blue text-brand-text rounded-full"
                >
                  Más Información
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="sticker-card sticker-card-hover p-8"
              >
                <h3 className="font-serif text-2xl font-semibold text-brand-text mb-4">
                  Noche de Arte Intergeneracional
                </h3>
                <p className="text-brand-text/80 mb-4">
                  Una velada especial donde abuelos, padres e hijos crean arte juntos, 
                  fortaleciendo vínculos familiares a través de la creatividad.
                </p>
                <div className="flex items-center text-sm text-brand-text/60 mb-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>22 de Agosto, 2025 • 19:00 - 21:30</span>
                </div>
                <Button 
                  onClick={() => handleRegister('Noche de Arte')}
                  className="bg-brand-pink text-white rounded-full"
                >
                  Reservar Plaza
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Workshops;