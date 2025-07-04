// Configuración de EmailJS para el formulario de contacto
// Para configurar EmailJS:
// 1. Ve a https://www.emailjs.com/ y crea una cuenta
// 2. Crea un Email Service (Gmail, Outlook, etc.)
// 3. Crea un Email Template
// 4. Obtén las credenciales y reemplázalas aquí

export const emailjsConfig = {
  // Service ID - ID del servicio de email que creaste en EmailJS
  // Ejemplo: 'service_abc123'
  serviceId: 'service_i2iqc4l',
  
  // Template ID - ID de la plantilla de email que creaste
  // Ejemplo: 'template_xyz789'
  templateId: 'YOUR_TEMPLATE_ID_HERE',
  
  // Public Key - Tu clave pública de EmailJS
  // Ejemplo: 'user_public_key_123'
  publicKey: 'OausZN2zX4s5uO1v_'
};

// Variables disponibles en el template:
// - {{from_name}} - Nombre del remitente
// - {{from_email}} - Email del remitente
// - {{subject}} - Asunto seleccionado
// - {{message}} - Mensaje del usuario
// - {{newsletter}} - Si quiere recibir newsletter (Sí/No)
// - {{to_name}} - Nombre del destinatario

// Ejemplo de template HTML para EmailJS:
/*
<!DOCTYPE html>
<html>
<head>
    <title>Nuevo mensaje de contacto - Ansiosxs</title>
</head>
<body>
    <h2>Nuevo mensaje de contacto</h2>
    
    <p><strong>De:</strong> {{from_name}} ({{from_email}})</p>
    <p><strong>Asunto:</strong> {{subject}}</p>
    <p><strong>Mensaje:</strong></p>
    <p>{{message}}</p>
    
    <p><strong>Newsletter:</strong> {{newsletter}}</p>
    
    <hr>
    <p><em>Mensaje enviado desde el formulario de contacto de Ansiosxs</em></p>
</body>
</html>
*/ 