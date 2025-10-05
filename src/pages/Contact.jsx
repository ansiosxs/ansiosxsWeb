import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Calendar, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import emailjs from '@emailjs/browser';
import { emailjsConfig } from '@/config/emailjs';

const Contact = () => {
  const formRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    newsletter: false
  });

  const handleInputChange = e => {
    const {
      name,
      value,
      type,
      checked
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Error de validación",
        description: "Por favor, ingresa tu nombre completo.",
        variant: "destructive"
      });
      return false;
    }
    
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({
        title: "Error de validación",
        description: "Por favor, ingresa un email válido.",
        variant: "destructive"
      });
      return false;
    }
    
    if (!formData.subject) {
      toast({
        title: "Error de validación",
        description: "Por favor, selecciona un asunto.",
        variant: "destructive"
      });
      return false;
    }
    
    if (!formData.message.trim() || formData.message.length < 10) {
      toast({
        title: "Error de validación",
        description: "Por favor, escribe un mensaje de al menos 10 caracteres.",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        newsletter: formData.newsletter ? 'Sí' : 'No',
        to_name: 'Ansiosxs',
        time: new Date().toLocaleString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      await emailjs.send(
        emailjsConfig.serviceId, 
        emailjsConfig.templateId, 
        templateParams, 
        emailjsConfig.publicKey
      );

      toast({
        title: "¡Mensaje enviado! 📧",
        description: "Gracias por contactarnos. Te responderemos pronto.",
      });

      // Limpiar formulario
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        newsletter: false
      });

    } catch (error) {
      console.error('Error al enviar el email:', error);
      toast({
        title: "Error al enviar el mensaje",
        description: "Hubo un problema al enviar tu mensaje. Por favor, intenta nuevamente o contáctanos directamente por email.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [{
    icon: Mail,
    title: 'Correo Electrónico',
    details: 'ansiosxs@gmail.com',
    link: 'mailto:ansiosxs@gmail.com'
  }, {
    icon: Phone,
    title: 'Teléfono',
    details: '+56 9 44326527',
    link: 'tel:+56944326527'
  }, {
    icon: MapPin,
    title: 'Ubicación',
    details: 'Insectaria, Biblioteca Comunitaria Ilustrada',
    description: 'Juan Martínez de Rozas 1445, Concepción, Bío Bío (Dentro del Liceo Balmaceda para Adultos).'
  }, {
    icon: Calendar,
    title: 'Horario de Atención',
    details: 'Miércoles a Viernes',
    description: '15:00 a 18:00 hrs.'
  }];

  return <>
      <Helmet>
        <title>Contacto - Ansiosxs – Nuevas Lecturas</title>
        <meta name="description" content="Ponte en contacto con nosotros para participar, colaborar o conocer más sobre nuestra propuesta artística en Concepción, Chile." />
      </Helmet>

      <div className="pt-16">
        <section className="section-padding bg-brand-purple/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8
          }} className="relative">
              <h1 className="font-cookie text-4xl md:text-5xl font-bold text-brand-purple mb-6">
                Conectemos
              </h1>
              <p className="text-lg text-brand-text/80 max-w-3xl mx-auto leading-relaxed">
                Nos encanta conocer a personas interesadas en el arte, la narrativa y la transformación social. 
                ¡Hablemos sobre cómo podemos crear juntos!
              </p>
              <img src="https://storage.googleapis.com/hostinger-horizons-assets-prod/30a6ebc2-adae-4ac3-ae05-32a429feedcf/aa42f31949c4974b5ce961d1973fba8c.png" alt="Mascota decorativa" className="absolute -bottom-20 -left-10 w-24 h-auto transform -rotate-12 hidden lg:block pointer-events-none" />
            </motion.div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div initial={{
              opacity: 0,
              x: -30
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              duration: 0.8
            }} className="bg-brand-yellow/20 p-8 rounded-2xl border-2 border-brand-text">
                <h2 className="font-cookie text-3xl font-bold text-brand-text mb-6">
                  Envíanos un Mensaje
                </h2>
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-brand-text/90 mb-2">Nombre *</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required 
                        value={formData.name} 
                        onChange={handleInputChange} 
                        className="w-full px-4 py-3 bg-white border-2 border-brand-text rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent transition-colors" 
                        placeholder="Tu nombre completo"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-brand-text/90 mb-2">Correo Electrónico *</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        value={formData.email} 
                        onChange={handleInputChange} 
                        className="w-full px-4 py-3 bg-white border-2 border-brand-text rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent transition-colors" 
                        placeholder="tu@email.com"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-brand-text/90 mb-2">Asunto *</label>
                    <select 
                      id="subject" 
                      name="subject" 
                      required 
                      value={formData.subject} 
                      onChange={handleInputChange} 
                      className="w-full px-4 py-3 bg-white border-2 border-brand-text rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent transition-colors"
                      disabled={isSubmitting}
                    >
                      <option value="">Selecciona un tema</option>
                      <option value="talleres">Información sobre talleres</option>
                      <option value="colaboracion">Propuesta de colaboración</option>
                      <option value="practica">Práctica de ilustración</option>
                      <option value="voluntariado">Voluntariado</option>
                      <option value="otros">Otros</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-brand-text/90 mb-2">Mensaje *</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      required 
                      rows={6} 
                      value={formData.message} 
                      onChange={handleInputChange} 
                      className="w-full px-4 py-3 bg-white border-2 border-brand-text rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent transition-colors resize-vertical" 
                      placeholder="Cuéntanos más sobre tu consulta o propuesta..."
                      disabled={isSubmitting}
                    ></textarea>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="newsletter" 
                      name="newsletter" 
                      checked={formData.newsletter} 
                      onChange={handleInputChange} 
                      className="h-4 w-4 text-brand-pink focus:ring-brand-pink border-gray-300 rounded"
                      disabled={isSubmitting}
                    />
                    <label htmlFor="newsletter" className="ml-2 text-sm text-brand-text/80">Quiero recibir noticias y actualizaciones</label>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-brand-pink text-white py-3 rounded-lg text-lg font-medium sticker-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar Mensaje <Send className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              x: 30
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              duration: 0.8,
              delay: 0.2
            }} className="space-y-8">
                <div>
                  <h2 className="font-cookie text-3xl font-bold text-brand-text mb-6">Encuéntranos</h2>
                  <div className="space-y-6">
                    {contactInfo.map((info, index) => <div key={index} className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-brand-purple/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <info.icon className="h-6 w-6 text-brand-purple" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-brand-text mb-1">{info.title}</h3>
                          {info.link ? <a href={info.link} className="text-brand-pink font-medium mb-1 hover:underline">{info.details}</a> : <p className="text-brand-pink font-medium mb-1">{info.details}</p>}
                          <p className="text-brand-text/80 text-sm">{info.description}</p>
                        </div>
                      </div>)}
                  </div>
                </div>

                <div className="bg-brand-blue/10 rounded-3xl p-4 border-2 border-brand-text">
                  <iframe className="w-full h-64 rounded-2xl shadow-lg" width="100%" height="100%" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=-73.0455%2C-36.8202%2C-73.0405%2C-36.8172&layer=mapnik&marker=-36.8187%2C-73.0430" style={{
                  border: '1px solid black'
                }}></iframe>
                  <p className="text-brand-text/80 mt-4 text-sm text-center">¡Te esperamos!</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

      </div>
    </>;
};

export default Contact;