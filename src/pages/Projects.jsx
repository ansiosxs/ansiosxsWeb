import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { BookHeart, Library, Truck, Palette, HeartHandshake as Handshake, CheckCircle, Star } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { images } from '@/data/images';
import ImageWithFallback from '@/components/ui/image-with-fallback';

const ProjectSection = ({
  id,
  icon: Icon,
  color,
  title,
  imageAlt,
  imageUrl,
  fallbackUrl,
  children,
  reverse = false
}) => {
  return <section id={id} className="section-padding scroll-mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`}>
          <motion.div initial={{
          opacity: 0,
          x: reverse ? 50 : -50
        }} whileInView={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8
        }} viewport={{
          once: true
        }} className={`relative ${reverse ? 'lg:order-last' : ''}`}>
            <div className={`absolute -inset-4 border-2 border-brand-text rounded-3xl bg-${color}/20 -rotate-2`}></div>
            <ImageWithFallback 
              className="relative w-full h-auto object-cover rounded-3xl shadow-2xl hover-lift -rotate-2" 
              alt={imageAlt} 
              src={imageUrl}
              fallbackSrc={fallbackUrl}
            />
          </motion.div>
          <motion.div initial={{
          opacity: 0,
          y: 50
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} viewport={{
          once: true
        }} className="lg:p-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className={`p-3 rounded-full bg-${color}/20 border-2 border-brand-text`}>
                <Icon className={`h-8 w-8 text-${color}`} />
              </div>
              <h2 className="font-cookie text-3xl md:text-4xl font-bold text-brand-purple">{title}</h2>
            </div>
            {children}
          </motion.div>
        </div>
      </div>
    </section>;
};

const Projects = () => {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth'
        });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);
  
  const workshops = [
    { name: 'Dibuja tu sueño', facilitator: 'Hans Peralta' },
    { name: 'Flora imaginaria', facilitator: 'Pamela Mendoza' },
    { name: 'Dibujar vida silvestre', facilitator: 'Elisa Echeverría' },
    { name: 'Autoficción queer', facilitator: 'María José Suárez' },
    { name: 'Diversidad y diseño de personajes', facilitator: 'Nataschia Navarro' },
    { name: 'Imprime tu pasión', facilitator: 'Adrián Cortés' },
  ];

  const logos = [{
    name: 'La Fuente',
    alt: 'Logo La Fuente',
    url: images.logos.laFuente.primary,
    fallbackUrl: images.logos.laFuente.fallback
  }, {
    name: 'Viva Leer Copec',
    alt: 'Logo Viva Leer Copec',
    url: images.logos.vivaLeerCopec.primary,
    fallbackUrl: images.logos.vivaLeerCopec.fallback
  }, {
    name: 'Plan Nacional de la Lectura',
    alt: 'Logo Plan Nacional de la Lectura',
    url: images.logos.planNacionalLectura.primary,
    fallbackUrl: images.logos.planNacionalLectura.fallback
  }, {
    name: 'INJUV',
    alt: 'Logo INJUV',
    url: images.logos.injuv.primary,
    fallbackUrl: images.logos.injuv.fallback
  }, {
    name: 'UdeC',
    alt: 'Logo Universidad de Concepción',
    url: images.logos.udec.primary,
    fallbackUrl: images.logos.udec.fallback
  }, {
    name: 'Oficina de Diversidad',
    alt: 'Logo Oficina de Diversidad Sexual de Concepción',
    url: images.logos.oficinaDiversidad.primary,
    fallbackUrl: images.logos.oficinaDiversidad.fallback
  }, {
    name: 'Liceo Balmaceda',
    alt: 'Logo Liceo de Adultos José Manuel Balmaceda',
    url: images.logos.liceoBalmaceda.primary,
    fallbackUrl: images.logos.liceoBalmaceda.fallback
  }, {
    name: 'Servicio Nacional Patrimonio',
    alt: 'Logo Servicio Nacional del Patrimonio Cultural',
    url: images.logos.servicioPatrimonio.primary,
    fallbackUrl: images.logos.servicioPatrimonio.fallback
  }, {
    name: 'Fanzineichon',
    alt: 'Logo Fanzineichon',
    url: images.logos.fanzineichon.primary,
    fallbackUrl: images.logos.fanzineichon.fallback
  }, {
    name: 'Superacion Pobreza',
    alt: 'Logo Fundación Superación de la Pobreza',
    url: images.logos.superacionPobreza.primary,
    fallbackUrl: images.logos.superacionPobreza.fallback
  }, {
    name: 'UBB',
    alt: 'Logo Universidad del Bío-Bío',
    url: images.logos.ubb.primary,
    fallbackUrl: images.logos.ubb.fallback
  }, {
    name: 'USS',
    alt: 'Logo Universidad San Sebastián',
    url: images.logos.uss.primary,
    fallbackUrl: images.logos.uss.fallback
  }];
  return <>
      <Helmet>
        <title>Proyectos - Ansiosxs – Nuevas Lecturas</title>
        <meta name="description" content="Descubre nuestros proyectos de arte experimental y narrativa comunitaria que transforman vidas y fortalecen comunidades." />
      </Helmet>

      <div className="pt-16 overflow-hidden">
        <section className="section-padding bg-brand-yellow/20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8
          }}>
              <h1 className="font-cookie text-4xl md:text-5xl font-bold text-brand-purple mb-6">
                Nuestros Proyectos
              </h1>
              <p className="text-lg text-brand-text/80 max-w-3xl mx-auto leading-relaxed">
                Experiencias transformadoras que combinan arte, narrativa y participación comunitaria 
                para crear espacios de conexión, creatividad y crecimiento personal.
              </p>
            </motion.div>
          </div>
          <img src="https://storage.googleapis.com/hostinger-horizons-assets-prod/30a6ebc2-adae-4ac3-ae05-32a429feedcf/89310d220b103795d91bc0fb1a4c69ef.png" alt="Mascota decorativa" className="absolute bottom-0 -right-4 w-20 h-auto transform hidden lg:block pointer-events-none" />
        </section>

        <ProjectSection id="te-leo-te-dibujo" icon={BookHeart} color="brand-pink" title="Te leo, te dibujo" imageAlt="Club de lectura de narrativa gráfica con gente dibujando y leyendo cómics juntos" imageUrl={images.projects.teLeoTeDibujo.primary} fallbackUrl={images.projects.teLeoTeDibujo.fallback}>
          <h3 className="font-sans font-bold text-xl text-brand-text mb-3">Club de lectura de Narrativa Gráfica</h3>
          <p className="text-brand-text/80 leading-relaxed mb-4">
            Te leo, te dibujo nació en 2018 como una colaboración con Biblioteca Viva Trébol. Durante ese primer año y el siguiente, fuimos reuniendo un grupo constante de lectorxs interesadxs en el cómic, el manga y la novela gráfica.
          </p>
          <p className="text-brand-text/80 leading-relaxed mb-4">
            En 2020, adaptamos el club a un formato virtual debido a la pandemia, lo que nos permitió conectar con personas de distintas regiones de Chile y romper las barreras geográficas.
          </p>
          <p className="text-brand-text/80 leading-relaxed mb-4">Entre 2021 y 2023, el proyecto fue seleccionado y financiado por el Fondo del Libro y la Lectura, consolidando su presencia en la provincia de Concepción con actividades presenciales y encuentros comunitarios.</p>
          <p className="font-semibold text-brand-text">El club propone espacios de diálogo en torno a la narrativa gráfica, explorando su vínculo con otras disciplinas artísticas. Buscamos promover el disfrute lector, el pensamiento crítico y la creatividad a través del lenguaje visual.</p>
        </ProjectSection>

        <ProjectSection id="insectaria" icon={Library} color="brand-blue" title="Insectaria" imageAlt="Una acogedora biblioteca comunitaria llena de libros ilustrados, con niños y adultos explorando los estantes" imageUrl="https://storage.googleapis.com/hostinger-horizons-assets-prod/30a6ebc2-adae-4ac3-ae05-32a429feedcf/8fb710186ec1a25aef25363aec67dd83.jpg" reverse={true}>
          <h3 className="font-sans font-bold text-xl text-brand-text mb-3">Biblioteca Comunitaria Ilustrada</h3>
          <p className="text-brand-text/80 leading-relaxed mb-4">En 2022, Ansiosxs Nuevas Lecturas inauguró Insectaria, una biblioteca comunitaria autogestionada y especializada en narrativas ilustradas. Este espacio nació gracias a donaciones de la ex Biblioteca Viva y a un convenio con el SLEP Andalién Sur y el Liceo de Adultos José Manuel Balmaceda, que nos permite utilizar parte de sus instalaciones frente a la plaza Condell, en Concepción.</p>
          <p className="text-brand-text/80 leading-relaxed mb-4">&nbsp;</p>
          <p className="text-brand-text/80 leading-relaxed mb-4">
            Desde 2023, Insectaria ha albergado actividades como el Club Andrómeda de constelaciones narrativas, el Laboratorio de fanzines, talleres de cerámica y dibujo, y capacitaciones para el estudiantado del Liceo Balmaceda.
          </p>
        </ProjectSection>

        <ProjectSection id="bibliomovil" icon={Truck} color="brand-yellow" title="Bibliomóvil" imageAlt="Un bibliomóvil colorido estacionado en una caleta costera, con gente leyendo libros al aire libre" imageUrl={images.projects.bibliomovil.primary} fallbackUrl={images.projects.bibliomovil.fallback}>
          <h3 className="font-sans font-bold text-xl text-brand-text mb-3">Nuevas Lecturas Móviles – Ruta Costera</h3>
          <p className="text-brand-text/80 leading-relaxed mb-4">
            En 2021, Ansiosxs Nuevas Lecturas implementó su primer bibliomóvil gracias al Fondo del Libro y la Lectura. Así nació Nuevas Lecturas Móviles, un proyecto que comenzó recorriendo las caletas costeras de la comuna de Tomé —Dichato, Cocholgüe y Coliumo— con un catálogo especializado en narrativas ilustradas.
          </p>
          <p className="text-brand-text/80 leading-relaxed mb-4">
            El objetivo: Acercar la lectura a territorios con baja oferta cultural, fomentando el encuentro entre libros, cuerpos y paisajes.
          </p>
          <p className="text-brand-text/80 leading-relaxed mb-4">
            Con el tiempo, el bibliomóvil ha crecido y expandido su ruta. Hoy también realiza mediaciones en escuelas rurales, participa en ferias del libro, ha visitado la Isla Santa María y ha sido parte de encuentros de bibliomóviles a nivel regional. Además, hemos colaborado con el Plan Nacional de la Lectura, llevando nuestras lecturas móviles a nuevas comunidades.
          </p>
          <p className="font-semibold text-brand-text">
            El bibliomóvil de Ansiosxs es más que una biblioteca rodante: es un espacio de encuentro, juego y descubrimiento donde la lectura se despliega en movimiento.
          </p>
        </ProjectSection>

        <ProjectSection id="talleres" icon={Palette} color="brand-pink" title="Talleres Crea-Expresa" imageAlt="Un collage de fotos de talleres de arte: creación de cómics, kamishibai, dibujo de flora y fauna" imageUrl="https://storage.googleapis.com/hostinger-horizons-assets-prod/30a6ebc2-adae-4ac3-ae05-32a429feedcf/2eba68ce2b5093f0aab1a3c81473f800.jpg" reverse={true}>
            <p className="text-brand-text/80 leading-relaxed mb-4 font-semibold">
                Arte, narrativa y comunidad para transformar el mundo desde la infancia y la diversidad.
            </p>
            <div className="space-y-6">
                <div className="sticker-card p-4 bg-brand-blue/10">
                    <h4 className="font-bold text-lg text-brand-purple mb-2">Primera edición (2023)</h4>
                    <p className="text-sm text-brand-text/80 mb-2">Financiada por FIFOCC, esta edición se enfocó en niñxs de 10 a 15 años, promoviendo el uso de bibliotecas como espacios culturales vivos.</p>
                    <ul className="list-disc list-inside text-sm text-brand-text/80 space-y-1">
                        <li>Taller de Creación de Cómic en Hualpén.</li>
                        <li>Taller de Kamishibai en San Pedro de la Paz.</li>
                    </ul>
                </div>
                <div className="sticker-card p-4 bg-brand-yellow/10">
                    <h4 className="font-bold text-lg text-brand-purple mb-2">Segunda edición (2024)</h4>
                    <p className="text-sm text-brand-text/80 mb-2">Financiada por Fondart, se expande a todo Chile con talleres online para mujeres y personas LGBTQIA+, enviando materiales gratuitos a lxs inscritxs.</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-brand-text/80">
                      {workshops.map((workshop) => (
                        <li key={workshop.name} className="flex items-start">
                          <Star className="h-3 w-3 text-brand-yellow mr-2 mt-1 flex-shrink-0" />
                          <span><strong>{workshop.name}</strong> – {workshop.facilitator}</span>
                        </li>
                      ))}
                    </ul>
                </div>
            </div>
        </ProjectSection>

        <section id="colaboraciones" className="section-padding bg-brand-purple/5 scroll-mt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{
            opacity: 0,
            y: 50
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8
          }} viewport={{
            once: true
          }}>
              <div className="flex justify-center items-center space-x-4 mb-6">
                <div className="p-3 rounded-full bg-brand-purple/20 border-2 border-brand-text">
                  <Handshake className="h-8 w-8 text-brand-purple" />
                </div>
                <h2 className="font-cookie text-3xl md:text-4xl font-bold text-brand-purple">Colaboraciones</h2>
              </div>
              <p className="text-brand-text/80 leading-relaxed mb-4">
                  Creemos en el trabajo colectivo y en la fuerza de las redes. Colaboramos activamente con instituciones públicas y privadas que promueven la lectura, la cultura y los derechos humanos.
              </p>
               <ul className="space-y-2 mb-4 text-left max-w-2xl mx-auto">
                  <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-brand-pink mr-2 mt-1 flex-shrink-0" />
                      <span className="text-brand-text/80">Capacitaciones para bibliotecarixs con Fundación La Fuente y el Plan Nacional de la Lectura.</span>
                  </li>
                  <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-brand-pink mr-2 mt-1 flex-shrink-0" />
                      <span className="text-brand-text/80">Talleres de fanzine en territorios como Isla Santa María, Isla Mocha y Santa Juana.</span>
                  </li>
                  <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-brand-pink mr-2 mt-1 flex-shrink-0" />
                      <span className="text-brand-text/80">Mentorías para jóvenes en el programa Creamos INJUV.</span>
                  </li>
              </ul>
              <p className="text-brand-text/80 leading-relaxed font-semibold">
                  ¡Gracias a todas las instituciones y personas que han confiado en nuestro trabajo!
              </p>
            </motion.div>
          </div>
        </section>

        <section className="section-padding bg-white relative">
            <img src="https://storage.googleapis.com/hostinger-horizons-assets-prod/30a6ebc2-adae-4ac3-ae05-32a429feedcf/d2c1b7a20fd443774c5d410b77c27201.png" alt="Mascota decorativa" className="absolute top-10 -right-5 w-24 h-auto transform -scale-x-100 rotate-12 hidden lg:block pointer-events-none" />
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
          }} className="text-center mb-12">
                    <h2 className="font-cookie text-3xl md:text-4xl font-bold text-brand-text">Nuestra Red de Colaboradores</h2>
                </motion.div>
                <motion.div initial={{
            opacity: 0
          }} whileInView={{
            opacity: 1
          }} transition={{
            duration: 0.8,
            delay: 0.2
          }} viewport={{
            once: true
          }} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
                    {logos.map(logo => <div key={logo.name} className="flex justify-center items-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                            <ImageWithFallback 
                              className="max-h-16 object-contain" 
                              alt={logo.alt} 
                              src={logo.url}
                              fallbackSrc={logo.fallbackUrl || '/images/images (2).png'}
                            />
                        </div>)}
                </motion.div>
            </div>
        </section>

      </div>
    </>;
};
export default Projects;