-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 24-12-2025 a las 11:38:37
-- Versión del servidor: 8.0.43
-- Versión de PHP: 8.2.27

CREATE DATABASE IF NOT EXISTS gestion_cultural DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
USE gestion_cultural;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gestion_cultural`
--

DROP TABLE IF EXISTS `room`;
DROP TABLE IF EXISTS `museum`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `museum`
--

CREATE TABLE `museum` (
  `museum_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `annual_budget` decimal(12,2) NOT NULL,
  `is_public` tinyint(1) NOT NULL,
  `opening_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `museum`
--

INSERT INTO `museum` (`museum_id`, `name`, `city`, `annual_budget`, `is_public`, `opening_date`) VALUES
(1, 'Museo Nacional de Arte Moderno', 'Madrid', 1500000.00, 1, '1995-04-18'),
(2, 'Museo Histórico de Andalucía', 'Sevilla', 820000.50, 1, '1982-10-05'),
(3, 'Museo Privado de Fotografía Contemporánea', 'Barcelona', 520000.75, 0, '2012-06-22');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `room`
--

CREATE TABLE `room` (
  `room_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `capacity` int NOT NULL,
  `area` decimal(8,2) NOT NULL,
  `is_climatized` tinyint(1) NOT NULL,
  `opening_date` date NOT NULL,
  `museum_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `room`
--

INSERT INTO `room` (`room_id`, `name`, `capacity`, `area`, `is_climatized`, `opening_date`, `museum_id`) VALUES
(1, 'Sala de Exposiciones Temporales', 220, 360.50, 1, '1996-01-15', 1),
(2, 'Sala de Pintura Moderna', 160, 290.00, 1, '1995-05-01', 1),
(3, 'Sala de Arqueología', 140, 250.75, 0, '1983-03-20', 2),
(4, 'Sala de Historia Medieval', 180, 310.40, 1, '1982-11-10', 2),
(5, 'Sala de Fotografía Artística', 100, 170.30, 1, '2013-02-14', 3);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `museum`
--
ALTER TABLE `museum`
  ADD PRIMARY KEY (`museum_id`);

--
-- Indices de la tabla `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`room_id`),
  ADD KEY `fk_room_museum` (`museum_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `museum`
--
ALTER TABLE `museum`
  MODIFY `museum_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `room`
--
ALTER TABLE `room`
  MODIFY `room_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `room`
--
ALTER TABLE `room`
  ADD CONSTRAINT `fk_room_museum` FOREIGN KEY (`museum_id`) REFERENCES `museum` (`museum_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
