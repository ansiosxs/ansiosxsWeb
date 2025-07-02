import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, Users } from 'lucide-react';
import { articles } from '@/data/articles';
import { Button } from '@/components/ui/button';

const Article = () => {
  const { articleSlug } = useParams();
  const navigate = useNavigate();
  const article = articles.find(a => a.slug === articleSlug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [articleSlug]);

  if (!article) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center text-center">
        <div>
          <h1 className="text-4xl font-bold">404 - Artículo no encontrado</h1>
          <p className="mt-4">Lo sentimos, no pudimos encontrar el artículo que buscas.</p>
          <Link to="/noticias">
            <Button className="mt-8">Volver a Noticias</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{article.title} - Ansiosxs – Nuevas Lecturas</title>
        <meta name="description" content={article.excerpt} />
      </Helmet>

      <div className="pt-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-full h-64 md:h-96 bg-brand-blue/20">
            <img className="w-full h-full object-cover" alt={article.title} src={article.imageUrl} />
            <div className="absolute inset-0 bg-black/30" />
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <div className="relative bg-white p-8 md:p-12 rounded-2xl -mt-20 md:-mt-32 sticker-card">
              <div className="text-center mb-8">
                <span className="bg-brand-yellow text-brand-text px-3 py-1 rounded-full text-sm font-medium border-2 border-brand-text capitalize">
                  {article.category}
                </span>
                <h1 className="font-serif text-3xl md:text-5xl font-bold text-brand-purple my-4">
                  {article.title}
                </h1>
                <div className="flex items-center justify-center flex-wrap gap-x-6 gap-y-2 text-sm text-brand-text/60">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{new Date(article.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                </div>
              </div>

              <div 
                className="prose lg:prose-xl max-w-none mx-auto text-brand-text/90"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              <div className="mt-12 pt-8 border-t-2 border-brand-text/10 text-center">
                <Button onClick={() => navigate(-1)} className="sticker-button bg-brand-blue text-brand-text">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Article;