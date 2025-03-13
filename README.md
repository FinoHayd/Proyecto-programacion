Proyecto de Programación: PetControl

Control de mascotas, vacunas, visitas y predicción de enfermedades


Problema que resuelve
Muchos dueños de mascotas no llevan un control adecuado de las vacunas, visitas al veterinario y tratamientos médicos, lo que puede poner en riesgo la salud de los animales. PetControl busca ofrecer una solución centralizada que permita registrar información clave de cada mascota, recibir notificaciones automáticas de vacunas y citas, y hasta realizar predicciones básicas de enfermedades según síntomas ingresados.  
Integrantes
 Angie Sotelo  
 Hayder Fino  

Módulos y Funcionalidades
1. Mascotas
- Registrar mascotas: (nombre, especie, raza, edad, dueño)  
- Editar o eliminar mascotas registradas  

2. Vacunas 
- Registrar vacunas aplicadas (fecha, tipo, dosis)  
- Historial de vacunas por mascota  

3. Visitas Veterinarias 
- Registrar visitas (fecha, motivo, diagnóstico, medicamentos recetados)  

4. Notificaciones  
- Recordatorios automáticos de próximas vacunas  
- Alertas de próximas citas veterinarias
- Emails: Nodemailer con SMTP de Gmail o Outlook.
 



5. Medicamentos 
- Registrar medicamentos recetados a la mascota  
- Instrucciones de administración (dosis, frecuencia)  

6. Predicción de Enfermedades  
- Ingreso de síntomas por el usuario  
- Análisis básico para predecir posibles enfermedades (basado en una base de datos de síntomas y enfermedades comunes)  


7. Generación de Reportes en PDF 
- Generar un PDF con el historial completo de la mascota, incluyendo vacunas, visitas, medicamentos y diagnósticos  
- Opción descargar el documento  

Tecnologías a Usar
Frontend	Angular (Interfaz gráfica)
Backend	Node.js (API y lógica de negocio)
Base de Datos	MySQL (Cifrado AES-256 para datos sensibles)
Notificaciones	Nodemailer (Email) 
Seguridad	Cifrado AES-256 en MySQL para datos sensibles (nombres, historial médico, etc.)
Generación de PDF	jsPDF o pdfkit 

