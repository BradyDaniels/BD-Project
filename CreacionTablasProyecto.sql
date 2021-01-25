CREATE TABLE dependencia (
id int NOT NULL,
nombre varchar(10),
centro_costo varchar(25),
PRIMARY KEY (id)
);

CREATE TABLE linea_suministro (
id int NOT NULL,
descripcion varchar(25),
PRIMARY KEY (id)
);

CREATE TABLE proveedor (
rif int NOT NULL,
razon_social varchar(15),
telefono varchar(9),
correo varchar(20),
direccion varchar(20),
PRIMARY KEY (rif)
);

CREATE TABLE cotizacion (
id int NOT NULL,
id_linea int NOT NULL,
fecha_emision date,
PRIMARY KEY (id),
FOREIGN KEY (id_linea) REFERENCES linea_suministro(id) ON DELETE SET NULL ON UPDATE SET NULL
);

CREATE TABLE trabajador (
cedula int NOT NULL,
id_dependencia int NOT NULL,
nombre varchar(20),
tipo char,
PRIMARY KEY (cedula),
FOREIGN KEY (id_dependencia) REFERENCES dependencia(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE director (
cedula int NOT NULL,
PRIMARY KEY (cedula),
FOREIGN KEY (cedula) REFERENCES trabajador(cedula) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE jefe_unidad (
cedula int NOT NULL,
PRIMARY KEY (cedula),
FOREIGN KEY (cedula) REFERENCES trabajador(cedula) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE requisicion (
id int NOT NULL,
id_dependencia int NOT NULL,
id_linea int NOT NULL,
fecha_emision date,	
cedula_trabajador int,
cedula_director int,
cedula_jefeunidad int,
PRIMARY KEY (id),
FOREIGN KEY (id_dependencia) REFERENCES dependencia(id) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (id_linea) REFERENCES linea_suministro(id) ON DELETE SET NULL ON UPDATE SET NULL,
FOREIGN KEY (cedula_trabajador) REFERENCES trabajador(cedula) ON DELETE SET NULL ON UPDATE CASCADE,
FOREIGN KEY (cedula_director) REFERENCES director(cedula) ON DELETE SET NULL ON UPDATE CASCADE,
FOREIGN KEY (cedula_jefeunidad) REFERENCES jefe_unidad(cedula) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE item (
id int NOT NULL,
nombre varchar(20),
nombre_corto varchar(8),
descripcion varchar(30),
unidad_medida varchar(4),
precio_unitario int,	
id_linea int,
PRIMARY KEY (id), 
FOREIGN KEY (id_linea) REFERENCES linea_suministro(id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE orden_compra (
id int NOT NULL,
razon_social varchar(20),
fecha_orden date,
monto_total real,
fecha_emision date,
formato_pago varchar(10),
tipo_moneda varchar(10),
cedula_director int,
PRIMARY KEY (id),
FOREIGN KEY (cedula_director) REFERENCES director(cedula) ON DELETE SET NULL ON UPDATE CASCADE,
CHECK (fecha_emision>fecha_orden),
CHECK (formato_pago IN ('contado','credito')),
CHECK (tipo_moneda IN ('bolivares','divisas'))	
);

CREATE TABLE respuesta (
id int NOT NULL,
precio_total real,
formato_pago varchar(10),
tipo_moneda varchar(10),
rif int NOT NULL,
id_cotizacion int NOT NULL,
PRIMARY KEY (id), 
FOREIGN KEY (id_cotizacion) REFERENCES cotizacion(id) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (rif) REFERENCES proveedor(rif) ON DELETE CASCADE ON UPDATE CASCADE,
CHECK (formato_pago IN ('contado','credito')),
CHECK (tipo_moneda IN ('bolivares','divisas'))	
);

CREATE TABLE detalle_requisicion (
id int NOT NULL UNIQUE,
cantidad_solicitada int,
precio_estimado real,
id_requisicion int NOT NULL UNIQUE,
id_item int NOT NULL UNIQUE,
PRIMARY KEY (id,id_requisicion,id_item),
FOREIGN KEY (id_requisicion) REFERENCES requisicion(id) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (id_item) REFERENCES item(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE detalle_compra (
id int NOT NULL,
cantidad int,
precio_compra real,
id_detalle_req int NOT NULL,
id_respuesta int NOT NULL,
id_orden int NOT NULL,
FOREIGN KEY (id_detalle_req) REFERENCES detalle_requisicion(id) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (id_orden) REFERENCES orden_compra(id) ON DELETE SET NULL ON UPDATE CASCADE,
FOREIGN KEY (id_respuesta) REFERENCES respuesta(id) ON DELETE CASCADE ON UPDATE CASCADE,
PRIMARY KEY (id,id_detalle_req,id_respuesta,id_orden)
);

CREATE TABLE requisicion_dependencia (
id_requisicion int NOT NULL,
id_dependencia int NOT NULL,
PRIMARY KEY (id_requisicion,id_dependencia),
FOREIGN KEY (id_dependencia) REFERENCES dependencia(id) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (id_requisicion) REFERENCES requisicion(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE linea_proveedor (
id_linea int NOT NULL,
rif int NOT NULL,
PRIMARY KEY (rif,id_linea),
FOREIGN KEY (id_linea) REFERENCES linea_suministro(id) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (rif) REFERENCES proveedor(rif) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE proveedor_orden (
rif int NOT NULL,
id_orden int NOT NULL,
PRIMARY KEY (rif,id_orden),
FOREIGN KEY (id_orden) REFERENCES orden_compra(id) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (rif) REFERENCES proveedor(rif) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE requisicion_cotizacion (
id_requisicion int NOT NULL,
id_cotizacion int NOT NULL,
PRIMARY KEY (id_requisicion,id_cotizacion),
FOREIGN KEY (id_cotizacion) REFERENCES cotizacion(id) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (id_requisicion) REFERENCES requisicion(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE proveedor_cotizacion (
rif int NOT NULL,
id_cotizacion int NOT NULL,
PRIMARY KEY (id_cotizacion,rif),
FOREIGN KEY (id_cotizacion) REFERENCES cotizacion(id) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (rif) REFERENCES proveedor(rif) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE orden_respuesta (
id_respuesta int NOT NULL,
id_orden int NOT NULL,
PRIMARY KEY (id_respuesta,id_orden),
FOREIGN KEY (id_orden) REFERENCES orden_compra(id) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (id_respuesta) REFERENCES respuesta(id) ON DELETE CASCADE ON UPDATE CASCADE
);