# Implementación del Formulario de Contacto con EmailJS

## Estado Actual
✅ **Formulario implementado** - El componente Contact.jsx ya tiene la funcionalidad completa
✅ **Validación de campos** - Incluye validación de nombre, email, asunto y mensaje
✅ **Estados de carga** - Muestra spinner mientras envía el mensaje
✅ **Notificaciones** - Usa el sistema de toast para mostrar éxito/error
✅ **Diseño responsive** - Formulario adaptado para móviles y desktop

## Configuración Pendiente

### 1. Crear cuenta en EmailJS
- Ve a https://www.emailjs.com/
- Crea una cuenta gratuita
- Verifica tu email

### 2. Configurar Email Service
1. En el dashboard de EmailJS, ve a "Email Services"
2. Haz clic en "Add New Service"
3. Selecciona tu proveedor de email (Gmail, Outlook, etc.)
4. Conecta tu cuenta de email
5. **Guarda el Service ID** que se genera

### 3. Crear Email Template
1. Ve a "Email Templates"
2. Haz clic en "Create New Template"
3. Usa este HTML como base:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Nuevo mensaje de contacto - Ansiosxs</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #8B5CF6; border-bottom: 2px solid #F59E0B; padding-bottom: 10px;">
            📧 Nuevo mensaje de contacto - Ansiosxs
        </h2>
        
        <div style="background: #FEF3C7; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <p><strong>👤 De:</strong> {{from_name}} ({{from_email}})</p>
            <p><strong>📋 Asunto:</strong> {{subject}}</p>
            <p><strong>📝 Mensaje:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 8px; margin: 10px 0;">
                {{message}}
            </div>
            <p><strong>📬 Newsletter:</strong> {{newsletter}}</p>
        </div>
        
        <hr style="border: 1px solid #E5E7EB; margin: 20px 0;">
        <p style="color: #6B7280; font-size: 14px; text-align: center;">
            <em>Mensaje enviado desde el formulario de contacto de Ansiosxs</em>
        </p>
    </div>
</body>
</html>
```

4. **Guarda el Template ID** que se genera

### 4. Obtener Public Key
1. Ve a "Account" en el dashboard
2. Encuentra tu "Public Key"
3. **Copia la Public Key**

### 5. Actualizar Configuración
Edita el archivo `src/config/emailjs.js` y reemplaza:

```javascript
export const emailjsConfig = {
  serviceId: 'TU_SERVICE_ID_REAL',
  templateId: 'TU_TEMPLATE_ID_REAL', 
  publicKey: 'TU_PUBLIC_KEY_REAL'
};
```

## Variables Disponibles en el Template

El formulario envía estas variables a EmailJS:

- `{{from_name}}` - Nombre del remitente
- `{{from_email}}` - Email del remitente  
- `{{subject}}` - Asunto seleccionado (talleres, colaboración, etc.)
- `{{message}}` - Mensaje del usuario
- `{{newsletter}}` - "Sí" o "No" según si quiere recibir newsletter
- `{{to_name}}` - "Ansiosxs" (nombre del destinatario)

## Funcionalidades Implementadas

### ✅ Validación de Campos
- **Nombre**: Requerido, no puede estar vacío
- **Email**: Requerido, debe ser formato válido
- **Asunto**: Requerido, debe seleccionar una opción
- **Mensaje**: Requerido, mínimo 10 caracteres

### ✅ Estados de UI
- **Carga**: Muestra spinner y "Enviando..." mientras procesa
- **Éxito**: Toast verde con mensaje de confirmación
- **Error**: Toast rojo con mensaje de error
- **Campos deshabilitados**: Durante el envío para evitar doble envío

### ✅ Opciones de Asunto
- Información sobre talleres
- Propuesta de colaboración
- Práctica de ilustración
- Voluntariado
- Otros

### ✅ Newsletter
- Checkbox opcional para recibir noticias
- Se incluye en el email como "Sí" o "No"

## Pruebas

Una vez configurado:

1. **Ejecuta el proyecto**: `npm run dev`
2. **Ve a la página de contacto**
3. **Llena el formulario** con datos de prueba
4. **Envía el mensaje**
5. **Verifica** que recibes el email en tu bandeja de entrada

## Notas Importantes

- **Plan gratuito**: EmailJS permite 200 emails/mes gratis
- **Rate limiting**: No enviar muchos emails de prueba rápidamente
- **Spam**: Los emails van a tu bandeja de entrada normal
- **Seguridad**: La Public Key es segura de usar en el frontend

## Solución de Problemas

### Error: "Service not found"
- Verifica que el Service ID sea correcto
- Asegúrate de que el servicio esté activo en EmailJS

### Error: "Template not found"  
- Verifica que el Template ID sea correcto
- Asegúrate de que el template esté publicado

### Error: "Invalid public key"
- Verifica que la Public Key sea correcta
- Asegúrate de copiar la clave completa

### No se reciben emails
- Revisa la carpeta de spam
- Verifica que el servicio de email esté conectado correctamente
- Revisa los logs en el dashboard de EmailJS 