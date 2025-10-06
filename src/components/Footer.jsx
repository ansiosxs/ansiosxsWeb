import React from 'react';
import { Mail, MapPin, Phone, Instagram, Youtube, Linkedin, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const SocialLink = ({ href, icon: Icon, colorClass }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${colorClass}`}>
    <Icon className="h-5 w-5 text-white" />
  </a>
);

const Footer = () => {
  const socialLinks = [
    { href: "https://www.instagram.com/ansiosxs", icon: Instagram, colorClass: "bg-brand-pink hover:bg-brand-pink/80" },
    { href: "https://www.facebook.com/Ansiosxs/", icon: Facebook, colorClass: "bg-blue-600 hover:bg-blue-700" },
    { href: "https://www.youtube.com/channel/UCMWvXVIqLlI72pXkdeWM62g", icon: Youtube, colorClass: "bg-red-600 hover:bg-red-700" },
    { href: "https://www.linkedin.com/company/ong-ansiosxs-nuevas-lecturas/?viewAsMember=true", icon: Linkedin, colorClass: "bg-sky-700 hover:bg-sky-800" },
    { href: "mailto:ansiosxs@gmail.com", icon: Mail, colorClass: "bg-brand-blue hover:bg-brand-blue/80" },
  ];

  return <footer className="bg-brand-yellow/20 border-t border-brand-text/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <img src="/images/logo.png" alt="Ansiosxs Nuevas Lecturas Logo" className="h-10" />
            </Link>
            <p className="text-brand-text/80 mb-4 max-w-md">Un laboratorio creativo que explora la lectura más allá del papel. Llevamos las narrativas al territorio, al cuerpo y a lo colectivo, creando un cambio a través del arte.</p>
            <div className="flex space-x-4">
              {socialLinks.map(link => <SocialLink key={link.href} {...link} />)}
            </div>
          </div>

          <div>
            <span className="font-semibold text-brand-text mb-4 block">Enlaces Rápidos</span>
            <ul className="space-y-2">
              <li>
                <Link to="/quienes-somos" className="text-brand-text/80 hover:text-brand-pink transition-colors">
                  Quienes Somos
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-brand-text/80 hover:text-brand-pink transition-colors">
                  Proyectos
                </Link>
              </li>
              <li>
                <Link to="/noticias" className="text-brand-text/80 hover:text-brand-pink transition-colors">
                  Noticias
                </Link>
              </li>
              <li>
                <Link to="/como-colaborar" className="text-brand-text/80 hover:text-brand-pink transition-colors">
                  Como Colaborar
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <span className="font-semibold text-brand-text mb-4 block">Contacto</span>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <Mail className="h-4 w-4 text-brand-pink mt-1" />
                <a href="mailto:ansiosxs@gmail.com" className="text-brand-text/80 text-sm hover:text-brand-pink">ansiosxs@gmail.com</a>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="h-4 w-4 text-brand-pink mt-1" />
                <span className="text-brand-text/80 text-sm">+56 9 44326527</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-brand-pink mt-1 flex-shrink-0" />
                <span className="text-brand-text/80 text-sm">Juan Martínez de Rozas 1445, Concepción, Bío Bío</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-text/20 mt-8 pt-8 text-center">
          <p className="text-brand-text/60 text-sm">
            © 2025 Ansiosxs – Nuevas Lecturas. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;