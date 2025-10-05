
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import AboutUs from '@/pages/AboutUs';
import Projects from '@/pages/Projects';
import News from '@/pages/News';
import Article from '@/pages/Article';
import Collaborate from '@/pages/Collaborate';
import Contact from '@/pages/Contact';
import CalendarPage from '@/pages/CalendarPage';
import AdminLogin from './pages/AdminLogin';
import AdminNews from './pages/AdminNews';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Helmet>
          <title>Ansiosxs – Nuevas Lecturas</title>
          <meta name="description" content="Redescubre la infancia a través del arte y la narrativa. Experiencias creativas para niños, jóvenes y adultos." />
        </Helmet>
        
        <Navbar />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quienes-somos" element={<AboutUs />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/noticias" element={<News />} />
            <Route path="/noticias/:articleSlug" element={<Article />} />
            <Route path="/como-colaborar" element={<Collaborate />} />
            <Route path="/calendario" element={<CalendarPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/news" element={<AdminNews />} />
          </Routes>
        </main>
        
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
