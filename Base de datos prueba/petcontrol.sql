-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 10-05-2025 a las 07:10:17
-- Versión del servidor: 9.1.0
-- Versión de PHP: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `petcontrol`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `diagnosticos`
--

DROP TABLE IF EXISTS `diagnosticos`;
CREATE TABLE IF NOT EXISTS `diagnosticos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mascota_id` int NOT NULL,
  `fecha` date DEFAULT NULL,
  `sintomas` text,
  `enfermedades_posibles` text,
  `recomendaciones` text,
  PRIMARY KEY (`id`),
  KEY `mascota_id` (`mascota_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `diagnosticos`
--

INSERT INTO `diagnosticos` (`id`, `mascota_id`, `fecha`, `sintomas`, `enfermedades_posibles`, `recomendaciones`) VALUES
(1, 7, '2025-05-10', '[\"Fiebre\",\"V\\u00f3mitos\",\"Letargo\"]', '[\"Parvovirus\",\"Leptospirosis\"]', 'Emergencia veterinaria inmediata. Altamente contagioso para otros perros. Tratamiento con antibióticos necesario. Puede ser zoonótica (transmisible a humanos).'),
(2, 6, '2025-05-10', '[\"Fiebre\",\"Picor\",\"Cojea\"]', '[]', 'Consulta con un veterinario para un diagnóstico preciso.'),
(3, 6, '2025-05-10', '[\"Pérdida de apetito\",\"Letargo\"]', '[\"Obesidad\"]', 'Plan de alimentación controlado. Incremento gradual de ejercicio.'),
(4, 6, '2025-05-10', '[\"Pérdida de apetito\",\"Letargo\"]', '[\"Obesidad\"]', 'Plan de alimentación controlado. Incremento gradual de ejercicio.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mascotas`
--

DROP TABLE IF EXISTS `mascotas`;
CREATE TABLE IF NOT EXISTS `mascotas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `especie` varchar(50) NOT NULL,
  `raza` varchar(100) DEFAULT NULL,
  `edad` int DEFAULT NULL,
  `duenio` varchar(100) DEFAULT NULL,
  `foto` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `mascotas`
--

INSERT INTO `mascotas` (`id`, `nombre`, `especie`, `raza`, `edad`, `duenio`, `foto`) VALUES
(7, 'lulu', 'Gato', 'siames', 3, 'Andres', 'data:image/jpeg;base64,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'),
(6, 'Max', 'Perro', 'lobo siberiano', 2, 'Andres', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSvYCJ4QkfB7J1F_PI9sCd7L0O8R3-EpRYsw&s'),
(8, 'coco', 'Gato', 'gato negro', 4, 'sandra', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZjOQ0qYgQcOpFdAXxTePbL_7arjntJHMlQ&s'),
(9, 'roky', 'Ave', 'loro', 2, 'camilo', 'data:image/webp;base64,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');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicamentos`
--

DROP TABLE IF EXISTS `medicamentos`;
CREATE TABLE IF NOT EXISTS `medicamentos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mascota_id` int NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `dosis` varchar(50) DEFAULT NULL,
  `frecuencia` varchar(50) DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `notas` text,
  PRIMARY KEY (`id`),
  KEY `mascota_id` (`mascota_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `medicamentos`
--

INSERT INTO `medicamentos` (`id`, `mascota_id`, `nombre`, `dosis`, `frecuencia`, `fecha_inicio`, `fecha_fin`, `notas`) VALUES
(1, 8, 'acetaminofen', '3', 'cada 8 horas', '2025-05-10', '2025-05-17', 'ninguna\n'),
(2, 7, 'acetaminofen', '3', 'cada 8 horas', '2025-05-10', '2025-05-17', 'nada ');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `username`, `password`, `nombre`) VALUES
(1, 'Andres', '$2y$10$3/.DRdhNFAwGY6SNYpLuM.vV2Cm1OCpw3Ru8G0ZbKkKxZJQJHB8/S', 'Andres');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vacunas`
--

DROP TABLE IF EXISTS `vacunas`;
CREATE TABLE IF NOT EXISTS `vacunas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mascota_id` int NOT NULL,
  `tipo` varchar(100) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `proxima_fecha` date DEFAULT NULL,
  `notas` text,
  PRIMARY KEY (`id`),
  KEY `mascota_id` (`mascota_id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `vacunas`
--

INSERT INTO `vacunas` (`id`, `mascota_id`, `tipo`, `fecha`, `proxima_fecha`, `notas`) VALUES
(3, 8, 'Rabia', '2025-05-10', '2025-05-18', 'acarisiar mas'),
(2, 6, 'Rabia', '2025-05-15', '2025-05-07', 'cuidar y solo liquidos'),
(4, 7, 'Hepatitis', '2025-05-10', '2025-05-21', 'esto es una enfermedad'),
(5, 6, 'Leptospirosis', '2025-05-23', '2025-05-24', 'enfermo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `visitas`
--

DROP TABLE IF EXISTS `visitas`;
CREATE TABLE IF NOT EXISTS `visitas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mascota_id` int NOT NULL,
  `fecha` date DEFAULT NULL,
  `motivo` text,
  `diagnostico` text,
  `tratamiento` text,
  `proxima_visita` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `mascota_id` (`mascota_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `visitas`
--

INSERT INTO `visitas` (`id`, `mascota_id`, `fecha`, `motivo`, `diagnostico`, `tratamiento`, `proxima_visita`) VALUES
(1, 8, '2025-05-10', 'revision', 'dolor ', '3 dulces', '2025-05-17'),
(2, 8, '2025-05-10', 'revision', 'mas liquidos', 'tomar agua\n', '2025-05-24');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
