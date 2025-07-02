import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Heart, Target, Users, Lightbulb } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Conexión Emocional',
      description: 'Creemos en el poder de las emociones para transformar y sanar comunidades a través del arte.'
    },
    {
      icon: Users,
      title: 'Inclusión Total',
      description: 'Nuestros espacios acogen a personas de todas las edades, culturas y trasfondos.'
    },
    {
      icon: Lightbulb,
      title: 'Creatividad Libre',
      description: 'Fomentamos la expresión auténtica sin juicios, donde cada voz tiene valor.'
    },
    {
      icon: Target,
      title: 'Transformación Social',
      description: 'Utilizamos el arte como herramienta de cambio positivo en nuestras comunidades.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Nosotros - Ansiosxs – Nuevas Lecturas</title>
        <meta name="description" content="Conoce nuestra misión de revalorizar la infancia y crear espacios de transformación social a través del arte y la narrativa." />
      </Helmet>

      <div className="pt-16">
        {/* Hero Section */}
        <section className="section-padding bg-brand-pink/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="font-cookie text-4xl md:text-5xl font-bold text-brand-purple mb-6">
                  Nuestra Historia
                </h1>
                <p className="text-lg text-brand-text/80 mb-6 leading-relaxed">
                  Ansiosxs – Nuevas Lecturas nace de la convicción de que el arte y la narrativa 
                  son herramientas poderosas para la transformación social y el desarrollo humano.
                </p>
                <p className="text-lg text-brand-text/80 leading-relaxed">
                  Creemos firmemente en la importancia de revalorizar la infancia no solo en 
                  los niños, sino en todas las personas, reconectando con esa capacidad innata 
                  de asombro, creatividad y conexión emocional auténtica.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <img  
                  className="w-full rounded-3xl shadow-2xl hover-lift"
                  alt="Equipo de Ansiosxs trabajando con la comunidad en actividades artísticas"
                 src="https://images.unsplash.com/photo-1597378611477-2b616fe8fb90" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="section-padding bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-cookie text-3xl md:text-4xl font-bold text-brand-text mb-8">
                Nuestra Misión
              </h2>
              <div className="bg-brand-blue/10 rounded-3xl p-8 md:p-12">
                <p className="text-xl text-brand-text/90 leading-relaxed mb-6">
                  Promovemos el uso del storytelling, el arte experimental y la narrativa 
                  como herramientas creativas para apoyar el desarrollo de comunidades y 
                  revalorizar la infancia en niños, jóvenes y adultos.
                </p>
                <p className="text-lg text-brand-text/80 leading-relaxed">
                  Nos enfocamos en construir experiencias estéticas y espacios de participación, 
                  creatividad y conexión emocional que generen transformación social positiva 
                  y fortalezcan los vínculos comunitarios.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="section-padding bg-brand-purple/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-cookie text-3xl md:text-4xl font-bold text-brand-text mb-4">
                Nuestros Valores
              </h2>
              <p className="text-lg text-brand-text/80 max-w-2xl mx-auto">
                Los principios que guían nuestro trabajo y definen nuestra identidad como comunidad.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 sticker-card sticker-card-hover"
                >
                  <div className="w-16 h-16 bg-brand-pink/20 rounded-full flex items-center justify-center mb-6">
                    <value.icon className="h-8 w-8 text-brand-pink" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-brand-text mb-4">
                    {value.title}
                  </h3>
                  <p className="text-brand-text/80 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="section-padding bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-cookie text-3xl md:text-4xl font-bold text-brand-text mb-4">
                Para Quién Trabajamos
              </h2>
              <p className="text-lg text-brand-text/80 max-w-3xl mx-auto leading-relaxed">
                Nuestros programas están diseñados para personas de todas las edades que buscan 
                reconectar con su creatividad, explorar nuevas formas de expresión y formar parte 
                de una comunidad inclusiva y transformadora.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <img  
                  className="w-full h-64 object-cover rounded-2xl mb-6 hover-lift"
                  alt="Niños participando en actividades de storytelling"
                 src="https://images.unsplash.com/photo-1588072432904-843af37f03ed" />
                <h3 className="font-serif text-xl font-semibold text-brand-text mb-3">
                  Niños y Niñas
                </h3>
                <p className="text-brand-text/80">
                  Espacios seguros donde pueden explorar su imaginación y desarrollar 
                  habilidades creativas y emocionales.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <img  
                  className="w-full h-64 object-cover rounded-2xl mb-6 hover-lift"
                  alt="Jóvenes colaborando en proyectos artísticos"
                 src="https://images.unsplash.com/photo-1703301287688-c9a306ebed99" />
                <h3 className="font-serif text-xl font-semibold text-brand-text mb-3">
                  Jóvenes
                </h3>
                <p className="text-brand-text/80">
                  Oportunidades para expresarse auténticamente y conectar con otros 
                  a través del arte y la narrativa.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <img  
                  className="w-full h-64 object-cover rounded-2xl mb-6 hover-lift"
                  alt="Adultos redescubriendo su creatividad en talleres"
                 src="https://images.unsplash.com/photo-1669152670466-f65964bca7c2" />
                <h3 className="font-serif text-xl font-semibold text-brand-text mb-3">
                  Adultos
                </h3>
                <p className="text-brand-text/80">
                  Redescubrir la capacidad de asombro y creatividad, reconectando 
                  con su niño interior a través del arte.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;