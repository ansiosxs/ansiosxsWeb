import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Sparkles, Rocket, Users, Heart } from 'lucide-react';
import { images } from '@/data/images';
import ImageWithFallback from '@/components/ui/image-with-fallback';

const teamMembers = [
  {
    name: 'Hans Peralta',
    role: 'Presidente',
    imageAlt: 'Retrato de Hans Peralta',
    imageUrl: images.portraits.hansPeralta.primary,
    fallbackUrl: images.portraits.hansPeralta.fallback,
    qualifications: [
      'Ilustrador',
      'Arquitecto',
      'Diplomado en nuevas prácticas lectoras',
      'Diplomado en Gestión en Patrimonio Cultural, especialidad Didáctica del Patrimonio.'
    ],
    color: 'brand-purple'
  },
  {
    name: 'Angela Rabanal',
    role: 'Secretaria',
    imageAlt: 'Retrato de Angela Rabanal',
    imageUrl: images.portraits.angelaRabanal.primary,
    fallbackUrl: images.portraits.angelaRabanal.fallback,
    qualifications: [
      'Artista Visual',
      'Ilustradora',
      'Mediadora de Lectura'
    ],
    color: 'brand-pink'
  },
  {
    name: 'Elisa Echeverría',
    role: 'Encargada de voluntariado',
    imageAlt: 'Retrato de Elisa Echeverría',
    imageUrl: images.portraits.elisaEcheverria.primary,
    fallbackUrl: images.portraits.elisaEcheverria.fallback,
    qualifications: [
      'Ilustradora y dibujante de cómics',
      'Productora visual',
      'Magíster en comunicación digital',
      'Diplomada en nuevas prácticas lectoras'
    ],
    color: 'brand-blue'
  },
  {
    name: 'Adrián Cortés',
    role: 'Tesorero',
    imageAlt: 'Retrato de Adrián Cortés',
    imageUrl: images.portraits.adrianCortes.primary,
    fallbackUrl: images.portraits.adrianCortes.fallback,
    qualifications: [
      'Ilustrador',
      'Pedagogo en matemáticas y computación',
      'Gestor microimprenta editorial Mantis'
    ],
    color: 'brand-yellow'
  }
];

const colorClasses = {
  'brand-purple': { border: 'border-brand-purple', text: 'text-brand-purple' },
  'brand-pink': { border: 'border-brand-pink', text: 'text-brand-pink' },
  'brand-blue': { border: 'border-brand-blue', text: 'text-brand-blue' },
  'brand-yellow': { border: 'border-brand-yellow', text: 'text-brand-yellow' },
};

const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>Quienes Somos - Ansiosxs – Nuevas Lecturas</title>
        <meta name="description" content="Somos un laboratorio creativo que explora nuevas formas de leer, contar y compartir historias. Conoce nuestro equipo y lo que nos mueve." />
      </Helmet>

      <div className="pt-16 pb-24 overflow-hidden">
        <section className="section-padding bg-brand-pink/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-purple mb-6">
                  Quiénes Somos
                </h1>
                <p className="text-lg text-brand-text/80 mb-6 leading-relaxed">
                  Somos un laboratorio creativo que explora nuevas formas de leer, contar y compartir historias. Experimentamos con medios, formatos y espacios que reencuentren a las personas con la lectura, no como deber, sino como posibilidad transformadora.
                </p>
                <p className="text-lg text-brand-text/80 leading-relaxed">
                  Sin abandonar el libro como objeto de inicio, nos aventuramos más allá del papel: llevamos las narrativas al territorio, al cuerpo, a lo colectivo. Creemos que leer puede ser un acto inmediato de cambio en nuestras realidades.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <ImageWithFallback
                  className="w-full rounded-3xl shadow-2xl hover-lift"
                  src={images.about.librero.primary}
                  fallbackSrc={images.about.librero.fallback}
                  alt={images.about.librero.alt}
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white relative">
          <img src="https://storage.googleapis.com/hostinger-horizons-assets-prod/30a6ebc2-adae-4ac3-ae05-32a429feedcf/d2fc7e35bdb6c324a86481c64d0878d2.png" alt="Mascota decorativa" className="absolute top-0 -left-5 w-40 h-auto transform -rotate-12 hidden lg:block pointer-events-none" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Sparkles className="h-12 w-12 text-brand-yellow mx-auto mb-4" />
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-text mb-6 relative inline-block">
                ¿Qué nos mueve?
              </h2>
              <div className="prose prose-lg max-w-none text-brand-text/80 leading-relaxed mt-8">
                <p>
                  Creemos en los libros que se miran, se tocan y se sienten. En las historias que habitan dibujos, en las palabras que provocan mundos. En Ansiosxs Nuevas Lecturas nos dedicamos a sembrar curiosidad y afecto lector en todas las edades, especialmente en quienes rara vez son invitadxs a leer.
                </p>
                <p>
                  Llevamos cómics, cuentos y novelas ilustradas a plazas, escuelas rurales, ferias y encuentros comunitarios. A través del arte, el juego y la conversación, abrimos espacios para imaginar juntos otras formas de vivir, sentir y narrar.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section-padding bg-brand-blue/10 relative">
          <img src="https://storage.googleapis.com/hostinger-horizons-assets-prod/30a6ebc2-adae-4ac3-ae05-32a429feedcf/89310d220b103795d91bc0fb1a4c69ef.png" alt="Mascota decorativa" className="absolute bottom-0 -right-4 w-48 h-auto transform -rotate-12 hidden lg:block pointer-events-none" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Rocket className="h-12 w-12 text-brand-blue mx-auto mb-4" />
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-text mb-6">
                ¿Hacia dónde vamos?
              </h2>
              <div className="prose prose-lg max-w-none text-brand-text/80 leading-relaxed">
                <p>
                  Soñamos con comunidades lectoras que valoren la diversidad de voces, estilos y formatos. Queremos un futuro lleno de lectores que se atrevan a crear, compartir y transformar. Un futuro donde leer sea también un acto de encuentro, memoria y ternura.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section-padding bg-white relative">
          <img src="https://storage.googleapis.com/hostinger-horizons-assets-prod/30a6ebc2-adae-4ac3-ae05-32a429feedcf/aa42f31949c4974b5ce961d1973fba8c.png" alt="Mascota decorativa" className="absolute bottom-0 left-5 w-40 h-auto transform -rotate-12 hidden lg:block pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Users className="h-12 w-12 text-brand-pink mx-auto mb-4" />
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-text mb-4">
                Nuestro Equipo
              </h2>
              <p className="text-lg text-brand-text/80 max-w-2xl mx-auto">
                Personas apasionadas por el arte, la educación y la transformación social.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => {
                const memberColor = colorClasses[member.color];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="sticker-card sticker-card-hover p-6 text-center flex flex-col"
                  >
                    <div className="relative mx-auto mb-4">
                      <ImageWithFallback  
                        className={`w-32 h-32 rounded-full object-cover object-center border-4 ${memberColor.border} shadow-lg`} 
                        alt={member.imageAlt}
                        src={member.imageUrl}
                        fallbackSrc={member.fallbackUrl}
                      />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-brand-text mb-1">
                      {member.name}
                    </h3>
                    <p className={`text-sm font-bold ${memberColor.text} mb-4`}>
                      {member.role}
                    </p>
                    <ul className="text-left text-sm text-brand-text/80 space-y-2 flex-grow">
                      {member.qualifications.map((q, i) => (
                        <li key={i} className="flex items-start">
                          <Heart className={`h-3 w-3 ${memberColor.text} mr-2 mt-1 flex-shrink-0`} />
                          <span>{q}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutUs;