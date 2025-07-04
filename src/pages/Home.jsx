import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Users, BookOpen, Palette, Calendar, ChevronLeft, ChevronRight, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { articles } from '@/data/articles';
import { images } from '@/data/images';
import ImageWithFallback from '@/components/ui/image-with-fallback';

const carouselItems = [{
  image: images.carousel.main.primary,
  fallback: images.carousel.main.fallback,
  alt: images.carousel.main.alt,
  title: "Bienvenides a Ansiosxs",
  description: "Somos una organización que imagina otros modos de leer, sentir y compartir. Creamos experiencias donde la narrativa gráfica, el arte y la lectura se cruzan con la emoción, la infancia y la comunidad.",
  buttonText: "Explorar Proyectos",
  buttonLink: "/projects",
  buttonColor: "bg-brand-yellow text-brand-text"
}, {
  image: images.carousel.main.primary,
  fallback: images.carousel.main.fallback,
  alt: images.carousel.main.alt,
  title: "Conoce Nuestro Laboratorio Creativo",
  description: "Descubre quiénes somos, qué nos mueve y hacia dónde vamos. Sumérgete en nuestra historia y nuestra pasión por transformar a través del arte.",
  buttonText: "Quiénes Somos",
  buttonLink: "/quienes-somos",
  buttonColor: "bg-brand-pink text-black"
}, {
  image: images.carousel.main.primary,
  fallback: images.carousel.main.fallback,
  alt: images.carousel.main.alt,
  title: "Forma parte",
  description: "Tu apoyo es fundamental para seguir tejiendo redes creativas. Descubre cómo puedes colaborar y ayudarnos a llevar más arte y lectura a más comunidades.",
  buttonText: "Cómo Colaborar",
  buttonLink: "/como-colaborar",
  buttonColor: "bg-brand-blue text-brand-text"
}];
const Home = () => {
  const [index, setIndex] = useState(0);
  const nextStep = () => {
    setIndex(index === carouselItems.length - 1 ? 0 : index + 1);
  };
  const prevStep = () => {
    setIndex(index === 0 ? carouselItems.length - 1 : index - 1);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      nextStep();
    }, 7000);
    return () => clearInterval(interval);
  }, [index]);
  const proposalPoints = [{
    icon: Palette,
    title: 'Exploración Artística',
    description: 'Experimentamos con medios y formatos diversos, desde fanzines hasta kamishibai, para que leer sea un acto de creación y descubrimiento.'
  }, {
    icon: Users,
    title: 'Comunidad y Territorio',
    description: 'Llevamos nuestra biblioteca móvil y talleres a plazas, escuelas rurales y ferias, sembrando curiosidad y afecto lector donde más se necesita.'
  }, {
    icon: Share2,
    title: 'Encuentro y Transformación',
    description: 'Abrimos espacios seguros para imaginar, a través del juego y la conversación, otras formas de vivir, sentir y conectar con lxs demás.'
  }];
  const latestArticles = articles.slice(0, 3);
  return <>
      <Helmet>
        <title>Inicio - Ansiosxs – Nuevas Lecturas</title>
        <meta name="description" content="Redescubre la infancia a través del arte y la narrativa. Experiencias creativas para niños, jóvenes y adultos." />
      </Helmet>

      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-brand-blue/10">
        <AnimatePresence initial={false}>
          <motion.div key={index} initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} transition={{
          duration: 1.5,
          ease: "easeInOut"
        }} className="absolute inset-0 z-0">
            <ImageWithFallback
              src={carouselItems[index].image}
              fallbackSrc={carouselItems[index].fallback}
              alt={carouselItems[index].alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </motion.div>
        </AnimatePresence>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.h1 key={`title-${index}`} initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }} className="font-cookie text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
            {carouselItems[index].title}
          </motion.h1>

          <motion.p key={`desc-${index}`} initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.4
        }} className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            {carouselItems[index].description}
          </motion.p>
          
          <motion.div key={`button-${index}`} initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.6
        }}>
            <Link to={carouselItems[index].buttonLink}>
              <Button size="lg" className={`${carouselItems[index].buttonColor} px-8 py-4 text-lg sticker-button`}>
                {carouselItems[index].buttonText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>

        <button onClick={prevStep} className="absolute left-4 z-20 p-2 bg-white/20 rounded-full hover:bg-white/40 transition-colors">
          <ChevronLeft className="h-8 w-8 text-white" />
        </button>
        <button onClick={nextStep} className="absolute right-4 z-20 p-2 bg-white/20 rounded-full hover:bg-white/40 transition-colors">
          <ChevronRight className="h-8 w-8 text-white" />
        </button>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
          {carouselItems.map((_, i) => <button key={i} onClick={() => setIndex(i)} className={`w-3 h-3 rounded-full transition-all duration-300 ${i === index ? 'bg-white scale-125' : 'bg-white/50'}`} />)}
        </div>
      </section>

      <section className="section-padding bg-white relative overflow-hidden">
        <img src="https://storage.googleapis.com/hostinger-horizons-assets-prod/30a6ebc2-adae-4ac3-ae05-32a429feedcf/d2fc7e35bdb6c324a86481c64d0878d2.png" alt="Mascota decorativa" className="absolute -top-8 -left-10 w-32 h-auto transform -rotate-12 hidden lg:block pointer-events-none opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} viewport={{
          once: true
        }} className="text-center mb-16 relative">
            <h2 className="font-cookie text-3xl md:text-4xl font-bold text-brand-text mb-4">Nuestra propuesta</h2>
            <p className="text-lg text-brand-text/80 max-w-3xl mx-auto">
              Somos un laboratorio creativo que va más allá del papel. Llevamos las narrativas al territorio, al cuerpo y a lo colectivo, porque creemos que leer puede ser un acto inmediato de cambio en nuestras realidades.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {proposalPoints.map((point, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: index * 0.1
          }} viewport={{
            once: true
          }} className="text-center p-6 bg-brand-yellow/10 rounded-2xl border-2 border-brand-text">
                <div className="w-16 h-16 bg-brand-yellow/30 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-brand-text">
                  <point.icon className="h-8 w-8 text-brand-text" />
                </div>
                <h3 className="font-semibold text-lg text-brand-text mb-2">
                  {point.title}
                </h3>
                <p className="text-brand-text/80 text-sm leading-relaxed">
                  {point.description}
                </p>
              </motion.div>)}
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-pink/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} viewport={{
          once: true
        }} className="text-center mb-16 relative">
            <h2 className="font-cookie text-3xl md:text-4xl font-bold text-brand-text mb-4">
              Últimas Noticias
            </h2>
            <p className="text-lg text-brand-text/80 max-w-2xl mx-auto">Descubre nuestras últimas noticias, historias y novedades.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestArticles.map((article, index) => <motion.div key={article.id} initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: index * 0.1
          }} viewport={{
            once: true
          }} className="sticker-card sticker-card-hover overflow-hidden flex flex-col">
                <ImageWithFallback 
                  className="w-full h-48 object-cover" 
                  alt={article.title} 
                  src={article.previewImageUrl || article.imageUrl}
                  fallbackSrc={(article.previewImageUrl || article.imageUrl).replace('.webp', '.png')}
                />
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-sm text-brand-pink font-medium mb-2 capitalize">{article.category}</span>
                  <h3 className="font-serif text-xl font-semibold text-brand-text mb-3 flex-grow">
                    {article.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-brand-text/60 mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{new Date(article.date).toLocaleDateString('es-ES')}</span>
                    </div>
                    <span className="text-sm text-brand-text/60">{article.readTime} de lectura</span>
                  </div>
                  <Link to={`/noticias/${article.slug}`} className="mt-auto">
                    <Button className="w-full bg-brand-purple hover:bg-brand-purple/90 text-white rounded-full">
                      Leer Más
                    </Button>
                  </Link>
                </div>
              </motion.div>)}
          </div>
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.3
        }} viewport={{
          once: true
        }} className="text-center mt-12">
            <Link to="/noticias">
              <Button size="lg" className="bg-brand-blue text-brand-text px-8 py-3 sticker-button">
                Ver Todas las Noticias
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-brand-yellow/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} viewport={{
          once: true
        }}>
            <h2 className="font-cookie text-3xl md:text-4xl font-bold text-brand-text mb-6">
              Únete a Nuestra Comunidad Creativa
            </h2>
            <p className="text-lg text-brand-text/80 mb-8 max-w-2xl mx-auto">
              Descubre talleres, eventos y proyectos que despiertan la imaginación 
              y fortalecen los vínculos comunitarios.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/como-colaborar">
                <Button size="lg" className="bg-brand-blue text-brand-text px-8 py-3 sticker-button">
                  Como Colaborar
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="bg-white text-brand-pink px-8 py-3 sticker-button border-brand-pink">
                  Contactar
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>;
};
export default Home;