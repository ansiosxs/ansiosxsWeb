
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Gift, Heart, Palette, Users, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

const DonationInfoCard = () => {
  const details = {
    'Nombre': 'ONG Ansiosxs Nuevas Lecturas',
    'Banco': 'Banco Estado',
    'Cuenta': '52771426981',
    'RUT': '65.195.484-3',
    'Correo': 'ansiosxs@gmail.com',
  };

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `✅ ${field} copiado!`,
      description: 'El texto ha sido copiado al portapapeles.',
    });
  };

  return (
    <div className="sticker-card bg-white p-6 border-2 border-brand-text/20 space-y-4">
      {Object.entries(details).map(([key, value]) => (
        <div key={key} className="flex justify-between items-center">
          <div>
            <p className="text-sm font-semibold text-brand-text/60">{key}</p>
            <p className="text-md font-medium text-brand-text">{value}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => copyToClipboard(value, key)}
            className="text-brand-text/50 hover:text-brand-pink hover:bg-brand-pink/10"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

const Collaborate = () => {
  const collaborationOptions = [
    {
      icon: Heart,
      title: 'Sé voluntarix',
      description: 'Contamos con un equipo activo de voluntarixs que atienden nuestra Biblioteca Insectaria en Concepción, apoyan actividades y mediaciones. Abrimos convocatorias periódicamente.',
      actionText: 'Síguenos en @ansiosxs para saber cuándo postular.',
      color: 'bg-brand-pink/10'
    },
    {
      icon: Palette,
      title: 'Haz tu práctica como ilustrador/a/e',
      description: 'Si estás estudiando ilustración, diseño o arte y buscas un lugar donde poner en práctica tus habilidades, en Ansiosxs puedes colaborar ilustrando afiches, recursos didácticos e informativos.',
      actionText: 'Escríbenos a ansiosxs@gmail.com con tu portafolio y una breve presentación.',
      color: 'bg-brand-blue/10'
    },
    {
      icon: Users,
      title: 'Colaboraciones Comunitarias',
      description: '¿Formas parte de un colectivo, centro educativo o asociación? Nos encanta tejer redes y co-crear proyectos con otras entidades para enriquecer el tejido social.',
      actionText: '',
      color: 'bg-brand-purple/10',
      buttonLink: '/contact',
      buttonText: 'Contactar para colaborar'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Como Colaborar - Ansiosxs – Nuevas Lecturas</title>
        <meta name="description" content="Descubre las diferentes formas de colaborar con nosotros: donaciones, voluntariado, prácticas y más. ¡Únete a nuestra comunidad creativa!" />
      </Helmet>

      <div className="pt-16 overflow-hidden">
        <section className="section-padding bg-brand-yellow/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-purple mb-6">
                Como Colaborar
              </h1>
              <p className="text-lg text-brand-text/80 max-w-3xl mx-auto leading-relaxed">Existen muchas formas de colaborar y ser de ayuda a nuestra iniciativa, existimos gracias a una comunidad participativa y comprometida. ✨</p>
            </motion.div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-brand-yellow/20 rounded-full flex items-center justify-center border-2 border-brand-text">
                        <Gift className="h-8 w-8 text-brand-purple" />
                    </div>
                    <h2 className="font-serif text-3xl font-semibold text-brand-text">Haz una donación</h2>
                </div>
                <p className="text-brand-text/80 leading-relaxed mb-6">
                  Tu aporte nos ayuda a mantener viva nuestra biblioteca, financiar materiales para talleres y continuar nuestras rutas lectoras con el bibliomóvil.
                </p>
                <DonationInfoCard />
              </motion.div>

              <div className="space-y-8">
                {collaborationOptions.map((option, index) => (
                  <motion.div 
                    key={option.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`p-6 sticker-card sticker-card-hover ${option.color} flex items-start space-x-4`}
                  >
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0 border-2 border-brand-text/20">
                      <option.icon className="h-6 w-6 text-brand-purple" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-serif text-xl font-semibold text-brand-text mb-2">
                        {option.title}
                      </h3>
                      <p className="text-brand-text/80 leading-relaxed mb-3">
                        {option.description}
                      </p>
                      {option.actionText && (
                        <p className="text-sm font-semibold text-brand-pink">{option.actionText}</p>
                      )}
                      {option.buttonText && (
                        <Link to={option.buttonLink}>
                          <Button className="mt-2 bg-brand-purple text-white rounded-full">
                            {option.buttonText}
                          </Button>
                        </Link>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default Collaborate;
