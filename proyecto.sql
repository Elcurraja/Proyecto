/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 100136
 Source Host           : localhost:3306
 Source Schema         : proyecto

 Target Server Type    : MySQL
 Target Server Version : 100136
 File Encoding         : 65001

 Date: 17/12/2018 10:45:58
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for clientes
-- ----------------------------
DROP TABLE IF EXISTS `clientes`;
CREATE TABLE `clientes`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `denominacionSocial` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `nombre` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `apellidos` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `direccion` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `telefono` int(9) NULL DEFAULT NULL,
  `poblacion` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `user` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of clientes
-- ----------------------------
INSERT INTO `clientes` VALUES (1, 'Energy SL', 'Julio', 'Gómez', 'Alameda,12', 959963652, 'Huelva', 'julio');
INSERT INTO `clientes` VALUES (2, 'El Marinero', 'Andrés', 'Martín', 'Avenida del oceano,10', 959874512, 'Huelva', 'andres');
INSERT INTO `clientes` VALUES (3, 'Come y Calla', 'Paco', 'Gutierrez', 'Torre,4', 959745232, 'Huelva', 'paco');
INSERT INTO `clientes` VALUES (4, 'Ledinao', 'Marta', 'Gomez Palma', 'Virgen clara,2', 959632541, 'Punta umbria', 'ledinao');
INSERT INTO `clientes` VALUES (5, 'Al Natural', 'Juan', 'Díaz', 'Calle dos', 959632145, 'Huelva', 'natural');
INSERT INTO `clientes` VALUES (6, 'El Rancho Asador Argentino', 'Abél', 'García', 'Calle dos', 959748585, 'Huelva', 'rancho');
INSERT INTO `clientes` VALUES (7, 'El ingenio de Cervantes', 'Maria', 'Álvarez', 'Calle tres', 959632145, 'Huelva', 'ingenio');
INSERT INTO `clientes` VALUES (8, 'Korgui', 'Nuria', 'Ruíz', 'Calle cuatro', 959663333, 'Huelva', 'korgui');
INSERT INTO `clientes` VALUES (9, 'Compostela Marisqueria', 'Adrián', 'Blanco', 'Calle cinco', 959748888, 'Huelva', 'cmpostela');
INSERT INTO `clientes` VALUES (10, 'Café de Oriente', 'Adriana', 'Navarro', 'Calle Seis', 959112233, 'Huelva', 'oriente');

-- ----------------------------
-- Table structure for empleados
-- ----------------------------
DROP TABLE IF EXISTS `empleados`;
CREATE TABLE `empleados`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `apellidos` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `dni` varchar(9) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `fecha_nacimiento` date NULL DEFAULT NULL,
  `fecha_contratacion` date NULL DEFAULT NULL,
  `fecha_fin_contrato` date NULL DEFAULT NULL,
  `puesto` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `telefono` int(10) NULL DEFAULT NULL,
  `direccion` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `numero` varchar(4) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `poblacion` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of empleados
-- ----------------------------
INSERT INTO `empleados` VALUES (3, 'Maria', 'Díaz Romero', '74125896B', '1993-12-12', '2018-10-19', '2018-12-22', 'administrativa', 951753654, 'Camilo', '39', 'Punta umbria');
INSERT INTO `empleados` VALUES (4, 'Nuria', 'Calvo Prieto', '41526398K', '1985-06-28', '2018-11-28', '2018-12-28', 'administrativa', 654321452, 'Corta', '21', 'Huelva');
INSERT INTO `empleados` VALUES (5, 'Roberta', 'Ortega Lara', '87451296I', '1996-01-08', '2018-11-28', '2018-12-28', 'repartidor', 632541789, 'Cartaya', '4C', 'Huelva');
INSERT INTO `empleados` VALUES (6, 'Mario', 'Gomez Goz', '48965213A', '1990-11-14', '2018-12-01', '2018-12-31', 'repartidor', 959652147, 'Sunday', '45B', 'Palos de la Frontera');
INSERT INTO `empleados` VALUES (7, 'Julio', 'Gomez Palma', '48945574', '2018-12-13', '2018-12-13', '2018-12-13', 'Director', 625321432, 'Almendro', '15', 'Huelva');
INSERT INTO `empleados` VALUES (12, 'Jordi', 'Cedeño Piedraita', '36958574X', '2018-12-13', '2018-12-13', '2018-12-13', 'Mozo de almacen', 69875412, 'Gran Via', '7', 'Huelva');

-- ----------------------------
-- Table structure for historico_almacen
-- ----------------------------
DROP TABLE IF EXISTS `historico_almacen`;
CREATE TABLE `historico_almacen`  (
  `id_historico` int(11) NOT NULL AUTO_INCREMENT,
  `id_item` int(11) NULL DEFAULT NULL,
  `fecha` date NULL DEFAULT NULL,
  `cantidad` int(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id_historico`) USING BTREE,
  INDEX `id_item`(`id_item`) USING BTREE,
  CONSTRAINT `historico_almacen_ibfk_1` FOREIGN KEY (`id_item`) REFERENCES `productos` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of historico_almacen
-- ----------------------------
INSERT INTO `historico_almacen` VALUES (1, 1, '2018-12-17', 5);
INSERT INTO `historico_almacen` VALUES (2, 18, '2018-12-17', 5);
INSERT INTO `historico_almacen` VALUES (3, 19, '2018-12-17', 5);
INSERT INTO `historico_almacen` VALUES (4, 20, '2018-12-17', 5);
INSERT INTO `historico_almacen` VALUES (5, 1, '2018-12-17', 5);
INSERT INTO `historico_almacen` VALUES (6, 2, '2018-12-17', 5);
INSERT INTO `historico_almacen` VALUES (7, 3, '2018-12-17', 5);

-- ----------------------------
-- Table structure for pedidos_clientes
-- ----------------------------
DROP TABLE IF EXISTS `pedidos_clientes`;
CREATE TABLE `pedidos_clientes`  (
  `id_pedido` int(11) NOT NULL AUTO_INCREMENT,
  `id_cliente` int(11) NULL DEFAULT NULL,
  `observaciones` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT '',
  `fecha` date NULL DEFAULT NULL,
  `estado` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_pedido`) USING BTREE,
  INDEX `id_cliente`(`id_cliente`) USING BTREE,
  CONSTRAINT `pedidos_clientes_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 32 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of pedidos_clientes
-- ----------------------------
INSERT INTO `pedidos_clientes` VALUES (1, 1, 'Ninguna', '2018-10-05', 'Entregado');
INSERT INTO `pedidos_clientes` VALUES (2, 1, 'Tarde', '2018-10-05', 'Pendiente');
INSERT INTO `pedidos_clientes` VALUES (3, 2, '', '2018-10-12', 'En reparto');
INSERT INTO `pedidos_clientes` VALUES (4, 3, '', '2018-10-06', 'Entregado');
INSERT INTO `pedidos_clientes` VALUES (26, 1, 'Prueba', '2018-12-16', NULL);
INSERT INTO `pedidos_clientes` VALUES (27, 7, '', '2018-12-17', NULL);
INSERT INTO `pedidos_clientes` VALUES (28, 1, '', '2018-12-17', NULL);
INSERT INTO `pedidos_clientes` VALUES (29, 1, '', '2018-12-17', NULL);
INSERT INTO `pedidos_clientes` VALUES (30, 3, '', '2018-12-17', NULL);
INSERT INTO `pedidos_clientes` VALUES (31, 3, '', '2018-12-17', NULL);

-- ----------------------------
-- Table structure for pedidos_clientes_det
-- ----------------------------
DROP TABLE IF EXISTS `pedidos_clientes_det`;
CREATE TABLE `pedidos_clientes_det`  (
  `id_detPedido` int(255) NOT NULL AUTO_INCREMENT,
  `id_pedido` int(255) NULL DEFAULT NULL,
  `id_item` int(255) NULL DEFAULT NULL,
  `cantidad` int(255) NULL DEFAULT NULL,
  `precio` int(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id_detPedido`) USING BTREE,
  INDEX `id_pedido`(`id_pedido`) USING BTREE,
  INDEX `id_item`(`id_item`) USING BTREE,
  CONSTRAINT `pedidos_clientes_det_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos_clientes` (`id_pedido`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `pedidos_clientes_det_ibfk_2` FOREIGN KEY (`id_item`) REFERENCES `productos` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 69 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of pedidos_clientes_det
-- ----------------------------
INSERT INTO `pedidos_clientes_det` VALUES (1, 1, 1, 5, 20);
INSERT INTO `pedidos_clientes_det` VALUES (2, 1, 2, 6, 20);
INSERT INTO `pedidos_clientes_det` VALUES (3, 1, 3, 10, 20);
INSERT INTO `pedidos_clientes_det` VALUES (46, 26, 1, 5, 20);
INSERT INTO `pedidos_clientes_det` VALUES (47, 26, 2, 5, 20);
INSERT INTO `pedidos_clientes_det` VALUES (48, 26, 3, 5, 20);
INSERT INTO `pedidos_clientes_det` VALUES (49, 27, 1, 5, 20);
INSERT INTO `pedidos_clientes_det` VALUES (50, 27, 2, 20, 20);
INSERT INTO `pedidos_clientes_det` VALUES (51, 27, 3, 12, 20);
INSERT INTO `pedidos_clientes_det` VALUES (52, 27, 10, 14, 10);
INSERT INTO `pedidos_clientes_det` VALUES (53, 27, 11, 12, 20);
INSERT INTO `pedidos_clientes_det` VALUES (54, 27, 12, 19, 20);
INSERT INTO `pedidos_clientes_det` VALUES (55, 28, 11, 12, 20);
INSERT INTO `pedidos_clientes_det` VALUES (56, 28, 15, 21, 20);
INSERT INTO `pedidos_clientes_det` VALUES (57, 28, 18, 12, 20);
INSERT INTO `pedidos_clientes_det` VALUES (58, 28, 19, 44, 20);
INSERT INTO `pedidos_clientes_det` VALUES (59, 28, 20, 22, 20);
INSERT INTO `pedidos_clientes_det` VALUES (60, 28, 21, 2, 20);
INSERT INTO `pedidos_clientes_det` VALUES (61, 29, 1, 5, 20);
INSERT INTO `pedidos_clientes_det` VALUES (63, 30, 18, 5, 20);
INSERT INTO `pedidos_clientes_det` VALUES (64, 30, 19, 5, 20);
INSERT INTO `pedidos_clientes_det` VALUES (65, 30, 20, 5, 20);
INSERT INTO `pedidos_clientes_det` VALUES (66, 31, 1, 5, 20);
INSERT INTO `pedidos_clientes_det` VALUES (67, 31, 2, 5, 20);
INSERT INTO `pedidos_clientes_det` VALUES (68, 31, 3, 5, 20);

-- ----------------------------
-- Table structure for pedidos_proveedores
-- ----------------------------
DROP TABLE IF EXISTS `pedidos_proveedores`;
CREATE TABLE `pedidos_proveedores`  (
  `id_pedido` int(11) NOT NULL AUTO_INCREMENT,
  `id_proveedores` int(11) NOT NULL,
  `Observaciones` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `fecha` timestamp(0) NULL DEFAULT NULL,
  `total` int(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id_pedido`) USING BTREE,
  INDEX `id_proveedores`(`id_proveedores`) USING BTREE,
  CONSTRAINT `pedidos_proveedores_ibfk_1` FOREIGN KEY (`id_proveedores`) REFERENCES `proveedores` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of pedidos_proveedores
-- ----------------------------
INSERT INTO `pedidos_proveedores` VALUES (1, 2, 'adasdasdsd', '2018-11-05 01:42:50', 500);
INSERT INTO `pedidos_proveedores` VALUES (2, 1, 'adasdsadas', '2018-11-14 01:43:16', 2550);

-- ----------------------------
-- Table structure for pedidos_proveedores_det
-- ----------------------------
DROP TABLE IF EXISTS `pedidos_proveedores_det`;
CREATE TABLE `pedidos_proveedores_det`  (
  `id_detPedido` int(255) NOT NULL AUTO_INCREMENT,
  `id_pedido` int(255) NULL DEFAULT NULL,
  `id_item` int(255) NULL DEFAULT NULL,
  `cantidad` int(255) NULL DEFAULT NULL,
  `formato` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `precio/u` int(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id_detPedido`) USING BTREE,
  INDEX `id_pedido`(`id_pedido`) USING BTREE,
  INDEX `id_item`(`id_item`) USING BTREE,
  CONSTRAINT `pedidos_proveedores_det_ibfk_2` FOREIGN KEY (`id_item`) REFERENCES `productos` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `pedidos_proveedores_det_ibfk_3` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos_proveedores` (`id_pedido`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of pedidos_proveedores_det
-- ----------------------------
INSERT INTO `pedidos_proveedores_det` VALUES (1, 1, 1, 5, 'cajas', 50);
INSERT INTO `pedidos_proveedores_det` VALUES (2, 1, 2, 20, 'kilos', 30);

-- ----------------------------
-- Table structure for productos
-- ----------------------------
DROP TABLE IF EXISTS `productos`;
CREATE TABLE `productos`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(55) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `tipo` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `disponible` int(10) NULL DEFAULT NULL,
  `descripcion` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `precio` int(255) NULL DEFAULT NULL COMMENT 'Precio por tipo de envase',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of productos
-- ----------------------------
INSERT INTO `productos` VALUES (1, 'Café', 'Caja', 35, '', 20);
INSERT INTO `productos` VALUES (2, 'Cola Cao', 'Caja', 25, NULL, 20);
INSERT INTO `productos` VALUES (3, 'Té', 'Caja', 33, NULL, 20);
INSERT INTO `productos` VALUES (4, 'Coca Cola Light', 'Paquete Botella 2l', 65, '', 10);
INSERT INTO `productos` VALUES (6, 'Coca Cola Zero', 'Paquete Botella 2l', 50, NULL, 10);
INSERT INTO `productos` VALUES (7, 'Coca Coca Zero Zero', 'Paquete Botella 2l', 50, '', 10);
INSERT INTO `productos` VALUES (8, 'Fanta de Limón', 'Paquete Botella 2l', 50, NULL, 10);
INSERT INTO `productos` VALUES (9, 'Fanta de naranja', 'Paquete Botella 2l', 50, NULL, 10);
INSERT INTO `productos` VALUES (10, '7up', 'Paquete Botella 2l', 36, '', 10);
INSERT INTO `productos` VALUES (11, 'Coca Cola Light', 'Paquete 24 latas', 26, '', 20);
INSERT INTO `productos` VALUES (12, 'Coca Cola Zero', 'Paquete 24 latas', 31, NULL, 20);
INSERT INTO `productos` VALUES (13, 'Coca Coca Zero Zero', 'Paquete 24 latas', 50, '', 20);
INSERT INTO `productos` VALUES (14, 'Fanta de Limón', 'Paquete 24 latas', 50, NULL, 20);
INSERT INTO `productos` VALUES (15, 'Fanta de naranja', 'Paquete 24 latas', 29, NULL, 20);
INSERT INTO `productos` VALUES (16, '7up', 'Paquete 24 latas', 50, '', 20);
INSERT INTO `productos` VALUES (17, 'Coca Cola Light', 'Caja 24 botellines', 50, '', 20);
INSERT INTO `productos` VALUES (18, 'Coca Cola Zero', 'Caja 24 botellines', 33, NULL, 20);
INSERT INTO `productos` VALUES (19, 'Coca Coca Zero Zero', 'Caja 24 botellines', 50, '', 20);
INSERT INTO `productos` VALUES (20, 'Fanta de Limón', 'Caja 24 botellines', 23, NULL, 20);
INSERT INTO `productos` VALUES (21, 'Fanta de naranja', 'Caja 24 botellines', 48, NULL, 20);
INSERT INTO `productos` VALUES (22, '7up', 'Caja 24 botellines', 50, '', 20);

-- ----------------------------
-- Table structure for proveedores
-- ----------------------------
DROP TABLE IF EXISTS `proveedores`;
CREATE TABLE `proveedores`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `denominacion_social` varchar(55) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `nombre` varchar(55) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `direccion` varchar(55) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `telefono` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of proveedores
-- ----------------------------
INSERT INTO `proveedores` VALUES (1, 'Nestle', 'Nestle', 'aaaaaa 14', 625458796);
INSERT INTO `proveedores` VALUES (2, 'Saimaza', 'Saimaza', 'aasdasd12', 959639636);
INSERT INTO `proveedores` VALUES (3, 'Nescafe', 'Nescafe', 'porewrwr 1', 959634174);

-- ----------------------------
-- Table structure for usuarios
-- ----------------------------
DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `pass` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_spanish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of usuarios
-- ----------------------------
INSERT INTO `usuarios` VALUES (1, 'julio', '$2y$10$5iVIs/7sww99OJY9POpWQO8ZgwbGJvkE8Uiep3fOpZTtkVvY8e4bO', 'gomezpalmajulio@gmail.com');
INSERT INTO `usuarios` VALUES (11, 'admin', '$2y$10$kpo0joLCELx0/e8OSfmjyOh00Ef3IRq11xPCbIwbY4WNKxuQitjI2', 'admin@admin.com');
INSERT INTO `usuarios` VALUES (12, 'paco', '$2y$10$LfmuRlLJzX4xXExanNKnZOCyJHujT9gRrj0HlsC.P3DU7TDT8uvzu', 'paco@gmail.com');

SET FOREIGN_KEY_CHECKS = 1;
