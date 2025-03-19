Proyecto de Programación: PetControl
PetControl es un sistema diseñado para ayudar a los dueños de mascotas a llevar un control adecuado de vacunas, visitas veterinarias y tratamientos médicos. También ofrece una funcionalidad de predicción básica de enfermedades según los síntomas ingresados.
Problema que Resuelve
Muchos dueños de mascotas no llevan un control adecuado de las vacunas, visitas al veterinario y tratamientos médicos, lo que puede poner en riesgo la salud de los animales. PetControl ofrece una solución centralizada para:
•	Registrar información clave de cada mascota.
•	Recibir notificaciones automáticas de vacunas y citas.
•	Realizar predicciones básicas de enfermedades según los síntomas ingresados.
Integrantes
•	Angie Sotelo
•	Hayder Fino
Módulos y Funcionalidades
1. Mascotas
•	Registrar mascotas (nombre, especie, raza, edad, dueño).
•	Editar o eliminar mascotas registradas.
2. Vacunas
•	Registrar vacunas aplicadas (fecha, tipo, dosis).
•	Historial de vacunas por mascota.
3. Visitas Veterinarias
•	Registrar visitas (fecha, motivo, diagnóstico, medicamentos recetados).
4. Notificaciones
•	Recordatorios automáticos de próximas vacunas.
•	Alertas de próximas citas veterinarias.
•	Envío de correos electrónicos mediante Nodemailer con SMTP de Gmail o Outlook.
5. Medicamentos
•	Registrar medicamentos recetados a la mascota.
•	Instrucciones de administración (dosis, frecuencia).
6. Predicción de Enfermedades
•	Ingreso de síntomas por el usuario.
•	Análisis básico para predecir posibles enfermedades basado en una base de datos predefinida de síntomas y enfermedades comunes.
7. Generación de Reportes en PDF
•	Generar un PDF con el historial completo de la mascota, incluyendo vacunas, visitas, medicamentos y diagnósticos.
•	Opción de descargar el documento.
Tecnologías a Usar
•	Frontend: Angular (Interfaz gráfica).
•	Backend: Node.js (API y lógica de negocio).
•	Base de Datos: MySQL (Cifrado AES-256 para datos sensibles).
•	Notificaciones: Nodemailer (Email).
•	Seguridad: Cifrado AES-256 en MySQL para datos sensibles (nombres, historial médico, etc.).
•	Generación de PDF: jsPDF o pdfkit.
Usuarios y Roles
PetControl está diseñado exclusivamente para dueños de mascotas, quienes tendrán acceso a:
•	Registrar y administrar información de sus mascotas.
•	Recibir notificaciones sobre vacunas y citas.
•	Consultar y descargar reportes del historial médico.
Gestión de Síntomas y Enfermedades
•	Se utilizará un mapeo de síntomas comunes basado en una base de datos predefinida.
•	No se implementará Machine Learning en esta etapa del proyecto.
Alcance del Sistema
El sistema estará enfocado exclusivamente en el seguimiento de mascotas e incluirá:
•	Recordatorios de vacunas.
•	Historial médico.
•	Gestión de citas veterinarias.
Nota: El sistema no estará disponible para clínicas veterinarias ni incluirá opciones para que los veterinarios registren y administren información de varios pacientes.
