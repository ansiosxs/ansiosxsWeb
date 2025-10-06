import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { articles as localArticles } from '@/data/articles';
import ImageWithFallback from '../components/ui/image-with-fallback';

const Article = () => {
  const { articleSlug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchArticle = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:4000/api/articles/${articleSlug}`);
        if (!res.ok) {
          if (res.status === 404) throw new Error('Artículo no encontrado');
          throw new Error('Error al cargar el artículo');
        }
        const data = await res.json();
        if (data && data.slug) {
          setArticle(data);
        } else {
          // Fallback local por slug
          const fallback = localArticles.find(a => a.slug === articleSlug);
          if (!fallback) throw new Error('Artículo no encontrado');
          setArticle(fallback);
        }
      } catch (err) {
        // Siempre intenta mostrar el artículo local si la API falla
        const fallback = localArticles.find(a => a.slug === articleSlug);
        if (fallback) {
          setArticle(fallback);
          setError(null); // No mostrar error de red
        } else {
          setError('Artículo no encontrado');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleSlug]);

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center text-center">
        <p>Cargando artículo...</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center text-center">
        <div>
          <h1 className="text-4xl font-bold">404 - Artículo no encontrado</h1>
          <p className="mt-4">{error || 'Lo sentimos, no pudimos encontrar el artículo que buscas.'}</p>
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

              {(article?.previewImageUrl || article?.imageUrl) && (
                <div className="relative aspect-video mb-6">
                  <ImageWithFallback
                    className="absolute inset-0 w-full h-full object-cover"
                    alt={`Artículo: ${article.title}`}
                    src={article.previewImageUrl || article.imageUrl}
                  />
                </div>
              )}

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
