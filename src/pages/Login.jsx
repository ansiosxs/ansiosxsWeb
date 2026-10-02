import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Library, Loader2, AlertCircle, Lock, Mail, ArrowLeft, LogIn } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const from = location.state?.from || '/biblioteca';

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'El correo es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ingresa un correo válido';
    }
    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSubmitting(true);
      setErrors({});
      await login(formData.email, formData.password);
      navigate(from, { replace: true });
    } catch (err) {
      if (err.status === 422 && err.data?.errors) {
        setErrors({
          email: err.data.errors.email?.[0] || 'Credenciales incorrectas',
        });
      } else {
        setErrors({ email: err.message || 'No se pudo iniciar sesión' });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name] || errors.email) {
      setErrors((prev) => ({ ...prev, [name]: '', email: '' }));
    }
  };

  return (
    <>
      <Helmet>
        <title>Ingresar - Ansiosxs – Nuevas Lecturas</title>
        <meta name="description" content="Acceso al inventario de la Biblioteca Comunitaria Insectaria." />
      </Helmet>

      <div className="pt-16 min-h-screen flex items-center justify-center bg-brand-background py-16 px-4 relative overflow-hidden">
        <img
          src="/images/mascotas/lobo.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-4 w-28 h-auto hidden lg:block pointer-events-none opacity-90"
        />
        <img
          src="/images/mascotas/bicho.png"
          alt=""
          aria-hidden="true"
          className="absolute top-24 right-6 w-20 h-auto hidden lg:block pointer-events-none -scale-x-100"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full max-w-md"
        >
          <div className="sticker-card bg-white p-8">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="p-4 bg-brand-purple/20 border-2 border-brand-text rounded-full mb-4">
                <Library className="h-10 w-10 text-brand-purple" />
              </div>
              <h1 className="font-cookie text-3xl font-bold text-brand-purple mb-2">
                Biblioteca Insectaria
              </h1>
              <p className="text-brand-text/70 text-sm">
                Ingresa con tu cuenta para gestionar el inventario
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-brand-text mb-1"
                >
                  Correo electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-text/40" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="username"
                    autoFocus
                    disabled={submitting}
                    className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-brand-purple/20 transition-colors ${
                      errors.email ? 'border-red-400' : 'border-brand-text/30'
                    }`}
                    placeholder="tu@correo.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-brand-text mb-1"
                >
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-text/40" />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    disabled={submitting}
                    className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-brand-pink/20 transition-colors ${
                      errors.password ? 'border-red-400' : 'border-brand-text/30'
                    }`}
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    {errors.password}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full sticker-button bg-brand-purple border-brand-purple text-white hover:bg-brand-purple/90 disabled:opacity-60 py-3"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Ingresando...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Ingresar
                  </span>
                )}
              </Button>
            </form>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-brand-text/70 hover:text-brand-pink transition-colors font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Login;
