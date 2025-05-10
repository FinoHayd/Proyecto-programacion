# PetControl

**Proyecto de Programación** – Sistema de gestión de mascotas

## Descripción

PetControl es una aplicación web que permite a los dueños de mascotas gestionar de manera centralizada toda la información de sus animales, incluyendo:

* CRUD de mascotas (nombre, especie, raza, edad, dueño, foto).
* Registro y seguimiento de vacunas.
* Historial de visitas veterinarias y diagnósticos.
* Gestión de medicamentos recetados.
* Generación de reportes en PDF con el historial completo de la mascota.

## Características

* **Autenticación**: Registro e inicio de sesión de usuarios.
* **Mascotas**: Creación, edición, eliminación y consulta de mascotas.
* **Vacunas**: Registro de vacunas aplicadas y visualización de historial.
* **Visitas Veterinarias**: Registro de citas, motivo, diagnóstico y tratamientos.
* **Medicamentos**: Gestión de prescripciones e instrucciones de administración.
* **Reportes**: Generación y descarga de informes en PDF.

> *Próximas mejoras:* notificaciones por correo (PHPMailer) y recordatorios automáticos.

## Tecnologías

* **Frontend:** HTML5, CSS3, JavaScript
* **Backend:** PHP (endpoints en `api/api.php`)
* **Base de Datos:** MySQL
* **Generación de PDF:** jsPDF / TCPDF (en desarrollo)

## Estructura de Directorios

```
Proyecto-programacion/
├── api/
│   ├── api.php
│   └── config.php
├── assets/
│   └── dos.jpg
├── styles/
│   └── global.css
├── app.js
├── index.html
└── README.md
```

## Instalación y Configuración

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/FinoHayd/Proyecto-programacion.git
   cd Proyecto-programacion
   ```
2. Crear la base de datos MySQL:

   ```sql
   CREATE DATABASE petcontrol CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
3. Importar la estructura inicial (archivo `petcontrol.sql`):

   ```bash
   mysql -u <usuario> -p petcontrol < petcontrol.sql
   ```
4. Configurar la conexión en `api/config.php`:

   ```php
   <?php
   define('DB_HOST', 'localhost');
   define('DB_NAME', 'petcontrol');
   define('DB_USER', '<tu_usuario>');
   define('DB_PASS', '<tu_contraseña>');
   define('DB_CHARSET', 'utf8mb4');

   $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
   if (\$conn->connect_error) {
       die("Conexión fallida: " . \$conn->connect_error);
   }
   ?>
   ```
5. Levantar servidor local (XAMPP/WAMP o PHP integrado):

   ```bash
   php -S localhost:8000
   ```
6. Abrir en el navegador:

   ```
   http://localhost:8000/
   ```

## Uso

1. Regístrate o inicia sesión.
2. Gestiona tus mascotas desde el panel principal.
3. Accede a módulos de vacunas, visitas, medicamentos y reportes.

## Contribuir

1. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
2. Realiza tus cambios y haz commit: `git commit -m "Añadir nueva funcionalidad"`
3. Envía tu rama: `git push origin feature/nueva-funcionalidad`
4. Abre un Pull Request.

## Integrantes

* Angie Sotelo
* Hayder Fino

*¡Gracias por colaborar en PetControl!*
