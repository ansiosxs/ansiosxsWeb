import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { articles as localArticles } from '@/data/articles';
const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 1)); // Start at July 2025
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:4000/api/articles');
        if (!res.ok) throw new Error('Error al cargar artículos');
        const data = await res.json();
        if (isMounted) setArticles(Array.isArray(data) && data.length ? data : localArticles);
      } catch (e) {
        if (isMounted) {
          setError(e.message);
          setArticles(localArticles);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => { isMounted = false; };
  }, []);

  const events = useMemo(() => {
    return articles.filter(a => a.isEvent).map(a => ({
      ...a,
      eventDateObj: new Date(a.eventDate)
    }));
  }, [articles]);
  const changeMonth = amount => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + amount);
      return newDate;
    });
  };
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="border border-brand-text/10"></div>);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const today = new Date(year, month, day);
    const dayEvents = events.filter(e => e.eventDateObj.getDate() === day && e.eventDateObj.getMonth() === month && e.eventDateObj.getFullYear() === year);
    calendarDays.push(<div key={day} className="border border-brand-text/10 p-2 flex flex-col min-h-[120px]">
        <span className="font-bold text-brand-text">{day}</span>
        <div className="flex-grow space-y-1 mt-1">
          {dayEvents.map(event => <Link to={`/noticias/${event.slug}`} key={event.id}>
              <motion.div whileHover={{
            scale: 1.05
          }} className="bg-brand-pink/20 text-brand-pink p-1 rounded-md text-xs cursor-pointer hover:bg-brand-pink/30">
                <p className="font-semibold truncate">{event.title}</p>
                <p>{event.eventDateObj.toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit'
              })}</p>
              </motion.div>
            </Link>)}
        </div>
      </div>);
  }
  const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  return <>
      <Helmet>
        <title>Calendario - Ansiosxs – Nuevas Lecturas</title>
        <meta name="description" content="Consulta nuestro calendario de eventos y talleres. ¡No te pierdas ninguna de nuestras actividades creativas y comunitarias!" />
      </Helmet>

      <div className="pt-16">
        {loading && (
          <div className="text-center py-8">Cargando eventos...</div>
        )}
        {error && (
          <div className="text-center py-8 text-red-600">{error}</div>
        )}
        <section className="section-padding bg-brand-blue/10">
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
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-purple mb-6">
                Calendario de Eventos
              </h1>
              <p className="text-lg text-brand-text/80 max-w-3xl mx-auto leading-relaxed">Descubre todos nuestros próximos talleres, charlas y actividades. 🤓</p>
            </motion.div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.2
          }} className="sticker-card p-4 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <Button onClick={() => changeMonth(-1)} className="sticker-button bg-brand-yellow text-brand-text">
                  <ChevronLeft />
                </Button>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-text text-center">
                  {currentDate.toLocaleString('es-ES', {
                  month: 'long',
                  year: 'numeric'
                })}
                </h2>
                <Button onClick={() => changeMonth(1)} className="sticker-button bg-brand-yellow text-brand-text">
                  <ChevronRight />
                </Button>
              </div>

              <div className="grid grid-cols-7 gap-px bg-brand-text/10">
                {daysOfWeek.map(day => <div key={day} className="text-center font-bold p-2 bg-brand-purple/10 text-brand-purple">
                    <span className="hidden md:inline">{day}</span>
                    <span className="md:hidden">{day.charAt(0)}</span>
                  </div>)}
                {calendarDays}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>;
};
export default CalendarPage;