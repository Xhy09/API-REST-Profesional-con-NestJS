-- Crear la base de datos
CREATE DATABASE productos;

-- Conectarse a la base
\c productos;

-- Crear tabla productos (opcional, si quieres tener datos iniciales)
CREATE TABLE IF NOT EXISTS productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio NUMERIC(10,2) NOT NULL CHECK (precio >= 0),
    stock INT NOT NULL CHECK (stock >= 0),
    sku VARCHAR(50) UNIQUE NOT NULL
);

-- Insertar datos de ejemplo
INSERT INTO productos (nombre, descripcion, precio, stock, sku)
VALUES
('Guitarra', 'Guitarra acústica de madera', 1500.00, 10, 'SKU001'),
('Teclado', 'Teclado mecánico gamer', 120.00, 5, 'SKU002')
ON CONFLICT (sku) DO NOTHING;
