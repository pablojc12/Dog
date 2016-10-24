-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-08-2016 a las 17:28:20
-- Versión del servidor: 10.1.13-MariaDB
-- Versión de PHP: 7.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dog`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `archivo`
--

CREATE TABLE `archivo` (
  `idArchivo` int(11) NOT NULL,
  `foto` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `archivo`
--

INSERT INTO `archivo` (`idArchivo`, `foto`) VALUES
(33, 'images/upload/foto_1470302254.jpg'),
(34, 'images/upload/foto_1470302184.jpg'),
(35, 'images/upload/foto_1470303988.jpg'),
(36, 'images/upload/foto_1470304117.jpg'),
(37, 'images/upload/foto_1470321409.jpg'),
(38, 'images/upload/foto_1470323545.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `idCliente` int(11) NOT NULL,
  `nombreCl` varchar(45) DEFAULT NULL,
  `apellidosCl` varchar(100) DEFAULT NULL,
  `fn` date DEFAULT NULL,
  `correo` varchar(45) NOT NULL,
  `contrasena` varchar(50) NOT NULL,
  `sesion` varchar(50) CHARACTER SET utf32 COLLATE utf32_unicode_ci NOT NULL,
  `idArchivo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`idCliente`, `nombreCl`, `apellidosCl`, `fn`, `correo`, `contrasena`, `sesion`, `idArchivo`) VALUES
(6, 'JUAN PABLO', 'RODRIGUEZ,CANO', '1992-09-12', 'pablojc12@gmail.com', 'pablojc12', 'f79c303f0b92f8bd1b5e722a4abb342c', 33),
(7, 'PEDRO', 'GOMEZ,MARTINES', '1992-09-12', 'pablojc12@outlook.es', 'pablojc12', 'd9e674e858d63903663f8198aacd21d9', 35),
(8, 'FERNANDO', 'REYES,MALDONADO', '1995-11-21', 'ferkcubo@gmail.com', 'anonimo', 'c73ba1d70100aed2891fa270498644ae', 37);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle`
--

CREATE TABLE `detalle` (
  `idDetalle` int(100) NOT NULL,
  `comentario` varchar(2000) NOT NULL,
  `idEmpleado` int(11) NOT NULL,
  `idServicio` int(11) NOT NULL,
  `idReservacion` int(11) NOT NULL,
  `idMascota` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `detalle`
--

INSERT INTO `detalle` (`idDetalle`, `comentario`, `idEmpleado`, `idServicio`, `idReservacion`, `idMascota`) VALUES
(1, 'oojioiiojijo', 1, 1, 1, 58),
(2, 'hola', 1, 1, 2, 58);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado`
--

CREATE TABLE `empleado` (
  `idEmpleado` int(11) NOT NULL,
  `nombreEm` varchar(45) NOT NULL,
  `apellidosEm` varchar(100) NOT NULL,
  `telefonoEm` varchar(16) NOT NULL,
  `idRol` int(11) NOT NULL,
  `idArchivo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `empleado`
--

INSERT INTO `empleado` (`idEmpleado`, `nombreEm`, `apellidosEm`, `telefonoEm`, `idRol`, `idArchivo`) VALUES
(1, 'Jose', 'Reyes,Maldonado', '56915616', 2, 36);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mascota`
--

CREATE TABLE `mascota` (
  `idMascota` int(11) NOT NULL,
  `nombreMa` varchar(45) NOT NULL,
  `idRaza` int(11) NOT NULL,
  `idCliente` int(11) NOT NULL,
  `idArchivo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `mascota`
--

INSERT INTO `mascota` (`idMascota`, `nombreMa`, `idRaza`, `idCliente`, `idArchivo`) VALUES
(56, 'MAX', 16, 6, 34),
(57, 'PEDRITO', 30, 7, 36),
(58, 'KYRA', 17, 8, 38),
(63, 'KJSDHF', 8, 8, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `raza`
--

CREATE TABLE `raza` (
  `idRaza` int(11) NOT NULL,
  `nombreRa` varchar(45) NOT NULL,
  `idTipo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `raza`
--

INSERT INTO `raza` (`idRaza`, `nombreRa`, `idTipo`) VALUES
(5, 'Affenpinscher ', 1),
(6, 'Affenpinscher ', 2),
(7, 'Affenpinscher ', 3),
(8, 'Affenpinscher ', 4),
(9, 'Airedale terrier', 1),
(10, 'Airedale terrier', 2),
(11, 'Airedale terrier', 3),
(12, 'Airedale terrier', 4),
(13, 'Akita Inu', 1),
(14, 'Akita Inu', 2),
(15, 'Akita Inu', 3),
(16, 'Akita Inu', 4),
(17, 'Alano español ', 1),
(18, 'Alano español ', 2),
(19, 'Alano español ', 3),
(20, 'Alano español ', 4),
(21, 'Alaskan malamute ', 1),
(22, 'Alaskan malamute ', 2),
(23, 'Alaskan malamute ', 3),
(24, 'Alaskan malamute ', 4),
(25, 'American Hairless terrier ', 1),
(26, 'American Hairless terrier ', 2),
(27, 'American Hairless terrier ', 3),
(28, 'American Hairless terrier ', 4),
(29, 'American Staffordshire Terrier ', 1),
(30, 'American Staffordshire Terrier ', 2),
(31, 'American Staffordshire Terrier ', 3),
(32, 'American Staffordshire Terrier ', 4),
(33, 'Basenji ', 1),
(34, 'Basenji ', 2),
(35, 'Basenji ', 3),
(36, 'Basenji ', 4),
(37, 'Beagle ', 1),
(38, 'Beagle ', 2),
(39, 'Beagle ', 3),
(40, 'Beagle ', 4),
(41, 'Bichon frisé ', 1),
(42, 'Bichon frisé ', 2),
(43, 'Bichon frisé ', 3),
(44, 'Bichon frisé ', 4),
(45, 'Bichón maltés ', 1),
(46, 'Bichón maltés ', 2),
(47, 'Bichón maltés ', 3),
(48, 'Bichón maltés ', 4),
(49, 'Boyero de Berna ', 1),
(50, 'Boyero de Berna ', 2),
(51, 'Boyero de Berna ', 3),
(52, 'Boyero de Berna ', 4),
(53, 'Border collie ', 1),
(54, 'Border collie ', 2),
(55, 'Border collie ', 3),
(56, 'Border collie ', 4),
(57, 'Borzoi ', 1),
(58, 'Borzoi ', 2),
(59, 'Borzoi ', 3),
(60, 'Borzoi ', 4),
(61, 'Boston terrier ', 1),
(62, 'Boston terrier ', 2),
(63, 'Boston terrier ', 3),
(64, 'Boston terrier ', 4),
(65, 'Boxer ', 1),
(66, 'Boxer ', 2),
(67, 'Boxer ', 3),
(68, 'Boxer ', 4),
(69, 'Bulldog francés ', 1),
(70, 'Bulldog francés ', 2),
(71, 'Bulldog francés ', 3),
(72, 'Bulldog francés ', 4),
(73, 'Bulldog inglés ', 1),
(74, 'Bulldog inglés ', 2),
(75, 'Bulldog inglés ', 3),
(76, 'Bulldog inglés ', 4),
(77, 'Bullmastiff ', 1),
(78, 'Bullmastiff ', 2),
(79, 'Bullmastiff ', 3),
(80, 'Bullmastiff ', 4),
(81, 'Bull Terrier ', 1),
(82, 'Bull Terrier ', 2),
(83, 'Bull Terrier ', 3),
(84, 'Bull Terrier ', 4),
(85, 'Chow chow ', 1),
(86, 'Chow chow ', 2),
(87, 'Chow chow ', 3),
(88, 'Chow chow ', 4),
(89, 'Collie', 1),
(90, 'Collie', 2),
(91, 'Collie', 3),
(92, 'Collie', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservacion`
--

CREATE TABLE `reservacion` (
  `idReservacion` int(11) NOT NULL,
  `fechaInicio` date NOT NULL,
  `fechaTermino` date NOT NULL,
  `total` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `reservacion`
--

INSERT INTO `reservacion` (`idReservacion`, `fechaInicio`, `fechaTermino`, `total`) VALUES
(1, '2016-08-03', '2016-08-03', 120),
(2, '2016-08-05', '2016-08-05', 120);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `idRol` int(11) NOT NULL,
  `tipoRo` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`idRol`, `tipoRo`) VALUES
(1, 'corte'),
(2, 'limpieza');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicio`
--

CREATE TABLE `servicio` (
  `idServicio` int(11) NOT NULL,
  `nombreSe` varchar(45) NOT NULL,
  `costoSe` double NOT NULL,
  `descripcion` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `servicio`
--

INSERT INTO `servicio` (`idServicio`, `nombreSe`, `costoSe`, `descripcion`) VALUES
(1, 'paseos', 120, 'pase de la mascota'),
(2, 'guarderia', 350, 'guarderia'),
(3, 'hospedaje', 500, 'hospedaje');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_raza`
--

CREATE TABLE `tipo_raza` (
  `idTipo` int(11) NOT NULL,
  `tamano` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tipo_raza`
--

INSERT INTO `tipo_raza` (`idTipo`, `tamano`) VALUES
(1, 'pequeño'),
(2, 'mediano'),
(3, 'grande'),
(4, 'gigante');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `archivo`
--
ALTER TABLE `archivo`
  ADD PRIMARY KEY (`idArchivo`),
  ADD UNIQUE KEY `idArchivo_UNIQUE` (`idArchivo`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`idCliente`),
  ADD UNIQUE KEY `idCliente_UNIQUE` (`idCliente`),
  ADD KEY `fk_Cliente_Archivo1_idx` (`idArchivo`);

--
-- Indices de la tabla `detalle`
--
ALTER TABLE `detalle`
  ADD PRIMARY KEY (`idDetalle`),
  ADD KEY `fk_Detalle_Empleado1_idx` (`idEmpleado`),
  ADD KEY `fk_Detalle_Servicio1_idx` (`idServicio`),
  ADD KEY `fk_Detalle_Reservacion1_idx` (`idReservacion`),
  ADD KEY `fk_Detalle_Mascota1_idx` (`idMascota`);

--
-- Indices de la tabla `empleado`
--
ALTER TABLE `empleado`
  ADD PRIMARY KEY (`idEmpleado`),
  ADD UNIQUE KEY `idEmpleado_UNIQUE` (`idEmpleado`),
  ADD KEY `fk_Empleado_Rol1_idx` (`idRol`),
  ADD KEY `fk_Empleado_Archivo1_idx` (`idArchivo`);

--
-- Indices de la tabla `mascota`
--
ALTER TABLE `mascota`
  ADD PRIMARY KEY (`idMascota`),
  ADD UNIQUE KEY `idMascota_UNIQUE` (`idMascota`),
  ADD KEY `fk_Mascota_Raza1_idx` (`idRaza`),
  ADD KEY `fk_Mascota_Cliente1_idx` (`idCliente`),
  ADD KEY `fk_Mascota_Archivo1_idx` (`idArchivo`);

--
-- Indices de la tabla `raza`
--
ALTER TABLE `raza`
  ADD PRIMARY KEY (`idRaza`),
  ADD UNIQUE KEY `idRaza_UNIQUE` (`idRaza`),
  ADD KEY `fk_Raza_Tipo_Raza_idx` (`idTipo`);

--
-- Indices de la tabla `reservacion`
--
ALTER TABLE `reservacion`
  ADD PRIMARY KEY (`idReservacion`),
  ADD UNIQUE KEY `idReservacion_UNIQUE` (`idReservacion`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`idRol`),
  ADD UNIQUE KEY `idRol_UNIQUE` (`idRol`);

--
-- Indices de la tabla `servicio`
--
ALTER TABLE `servicio`
  ADD PRIMARY KEY (`idServicio`),
  ADD UNIQUE KEY `idServicio_UNIQUE` (`idServicio`);

--
-- Indices de la tabla `tipo_raza`
--
ALTER TABLE `tipo_raza`
  ADD PRIMARY KEY (`idTipo`),
  ADD UNIQUE KEY `idTipo_Raza_UNIQUE` (`idTipo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `archivo`
--
ALTER TABLE `archivo`
  MODIFY `idArchivo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;
--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `idCliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT de la tabla `detalle`
--
ALTER TABLE `detalle`
  MODIFY `idDetalle` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `empleado`
--
ALTER TABLE `empleado`
  MODIFY `idEmpleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `mascota`
--
ALTER TABLE `mascota`
  MODIFY `idMascota` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;
--
-- AUTO_INCREMENT de la tabla `raza`
--
ALTER TABLE `raza`
  MODIFY `idRaza` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;
--
-- AUTO_INCREMENT de la tabla `reservacion`
--
ALTER TABLE `reservacion`
  MODIFY `idReservacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `idRol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `servicio`
--
ALTER TABLE `servicio`
  MODIFY `idServicio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `tipo_raza`
--
ALTER TABLE `tipo_raza`
  MODIFY `idTipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `fk_Cliente_Archivo1` FOREIGN KEY (`idArchivo`) REFERENCES `archivo` (`idArchivo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `detalle`
--
ALTER TABLE `detalle`
  ADD CONSTRAINT `fk_Detalle_Empleado1` FOREIGN KEY (`idEmpleado`) REFERENCES `empleado` (`idEmpleado`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Detalle_Mascota1` FOREIGN KEY (`idMascota`) REFERENCES `mascota` (`idMascota`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Detalle_Reservacion1` FOREIGN KEY (`idReservacion`) REFERENCES `reservacion` (`idReservacion`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Detalle_Servicio1` FOREIGN KEY (`idServicio`) REFERENCES `servicio` (`idServicio`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `empleado`
--
ALTER TABLE `empleado`
  ADD CONSTRAINT `fk_Empleado_Archivo1` FOREIGN KEY (`idArchivo`) REFERENCES `archivo` (`idArchivo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Empleado_Rol1` FOREIGN KEY (`idRol`) REFERENCES `rol` (`idRol`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `mascota`
--
ALTER TABLE `mascota`
  ADD CONSTRAINT `fk_Mascota_Archivo1` FOREIGN KEY (`idArchivo`) REFERENCES `archivo` (`idArchivo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Mascota_Cliente1` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Mascota_Raza1` FOREIGN KEY (`idRaza`) REFERENCES `raza` (`idRaza`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `raza`
--
ALTER TABLE `raza`
  ADD CONSTRAINT `fk_Raza_Tipo_Raza` FOREIGN KEY (`idTipo`) REFERENCES `tipo_raza` (`idTipo`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
