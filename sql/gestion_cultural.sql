-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 08-01-2026 a las 16:22:05
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
(2, 'Museo de Arte Moderno', 'Barcelona', 750000.00, 0, '2015-09-15'),
(5, 'Miguel', 'Peperoni', 0.05, 1, '2026-01-07'),
(6, 'Jhklj', 'dfgh', 50000.00, 1, '2026-01-28'),
(7, 'Prueba front', 'Prueba', 300.00, 1, '2026-01-26'),
(8, 'Cachibache', 'Sevillonga', 4444.00, 0, '2026-01-19');

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
(2, 'Sala de Escultura', 80, 200.00, 0, '2018-07-22', 2),
(3, 'Sala de Arqueología', 140, 250.75, 0, '1983-03-20', 2),
(4, 'Sala de Historia Medieval', 180, 310.40, 1, '1982-11-10', 2);

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
  MODIFY `museum_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `room`
--
ALTER TABLE `room`
  MODIFY `room_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

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
