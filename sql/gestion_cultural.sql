-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 12-01-2026 a las 18:00:07
-- Versión del servidor: 8.0.43
-- Versión de PHP: 8.2.27

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
(21, 'Museo de Bellas Artes', 'Sevilla', 450000.00, 1, '1995-03-15'),
(22, 'Museo Arqueológico', 'Córdoba', 300000.00, 1, '1980-06-20'),
(23, 'Museo de Arte Contemporáneo', 'Málaga', 850000.00, 0, '2010-09-01'),
(24, 'Museo Histórico Local', 'Granada', 150000.00, 1, '1975-01-10'),
(25, 'Centro Cultural Moderno', 'Almería', 600000.00, 0, '2018-11-25');

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
(19, 'Sala Renacimiento', 120, 250.50, 1, '1996-01-10', 21),
(20, 'Sala Barroco', 80, 180.00, 0, '1997-05-18', 21),
(21, 'Sala Romana', 60, 140.00, 1, '1981-03-22', 22),
(22, 'Sala Íbera', 40, 95.50, 0, '1982-07-30', 22),
(23, 'Sala Vanguardias', 150, 320.00, 1, '2011-10-01', 23),
(24, 'Sala Multimedia', 100, 210.00, 1, '2012-04-12', 23),
(25, 'Sala Medieval', 70, 160.00, 0, '1976-09-09', 24),
(26, 'Sala Exposiciones', 200, 400.00, 1, '2019-01-15', 25),
(27, 'Sala Temporal', 90, 190.00, 1, '2020-06-01', 25);

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
  MODIFY `museum_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `room`
--
ALTER TABLE `room`
  MODIFY `room_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `room`
--
ALTER TABLE `room`
  ADD CONSTRAINT `fk_room_museum` FOREIGN KEY (`museum_id`) REFERENCES `museum` (`museum_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
