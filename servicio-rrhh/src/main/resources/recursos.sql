USE gym_rrhh;
-- Limpiar datos previos por correo electrónico
DELETE FROM personal WHERE email IN (
    'maria.gonzalez@gimnasio.com',
    'carlos.ramirez@gimnasio.com',
    'ana.torres@gimnasio.com',
    'luis.fernandez@gimnasio.com',
    'patricia.diaz@gimnasio.com',
    'roberto.sanchez@gimnasio.com',
    'elena.morales@gimnasio.com',
    'diego.vargas@gimnasio.com',
    'sofia.mendoza@gimnasio.com',
    'javier.paredes@gimnasio.com',
    'carmen.vega@gimnasio.com',
    'fernando.castro@gimnasio.com'
);

-- Insertar registros de ejemplo
INSERT INTO personal 
(nombre, puesto, departamento, email, telefono, fecha_ingreso, estado, direccion, documento, salario, fecha_nacimiento, genero, fecha_registro, fecha_actualizacion)
VALUES
('María González', 'Gerente General', 'Administración', 'maria.gonzalez@gimnasio.com', '+51 999 111 222', '2020-03-15', 'Activo', 'Av. Principal 123, Lima', '12345678', 5000.00, '1985-05-20', 'Femenino', NOW(), NOW()),
('Carlos Ramírez', 'Entrenador Senior', 'Operaciones', 'carlos.ramirez@gimnasio.com', '+51 999 222 333', '2021-01-10', 'Activo', 'Calle Los Pinos 456, Lima', '23456789', 3500.00, '1990-08-15', 'Masculino', NOW(), NOW()),
('Ana Torres', 'Nutricionista', 'Servicios', 'ana.torres@gimnasio.com', '+51 999 333 444', '2022-05-20', 'Activo', 'Jr. Las Flores 789, Lima', '34567890', 3200.00, '1988-12-10', 'Femenino', NOW(), NOW()),
('Luis Fernández', 'Instructor de Spinning', 'Operaciones', 'luis.fernandez@gimnasio.com', '+51 999 444 555', '2023-02-14', 'Activo', 'Av. Los Olivos 321, Lima', '45678901', 2800.00, '1992-03-25', 'Masculino', NOW(), NOW()),
('Patricia Díaz', 'Recepcionista', 'Atención al Cliente', 'patricia.diaz@gimnasio.com', '+51 999 555 666', '2024-01-08', 'Activo', 'Calle San Martín 654, Lima', '56789012', 2000.00, '1995-07-18', 'Femenino', NOW(), NOW()),
('Roberto Sánchez', 'Jefe de Mantenimiento', 'Operaciones', 'roberto.sanchez@gimnasio.com', '+51 999 666 777', '2019-11-01', 'Activo', 'Av. Industrial 987, Lima', '67890123', 3000.00, '1982-09-05', 'Masculino', NOW(), NOW()),
('Elena Morales', 'Contadora', 'Finanzas', 'elena.morales@gimnasio.com', '+51 999 777 888', '2022-03-25', 'Activo', 'Jr. Comercio 147, Lima', '78901234', 3800.00, '1987-11-30', 'Femenino', NOW(), NOW()),
('Diego Vargas', 'Entrenador Personal', 'Operaciones', 'diego.vargas@gimnasio.com', '+51 999 888 999', '2023-06-12', 'Vacaciones', 'Calle Vista Alegre 258, Lima', '89012345', 3200.00, '1991-04-22', 'Masculino', NOW(), NOW()),
('Sofía Mendoza', 'Coordinadora de Clases', 'Operaciones', 'sofia.mendoza@gimnasio.com', '+51 999 999 000', '2023-08-01', 'Activo', 'Av. Universitaria 369, Lima', '90123456', 2900.00, '1993-06-14', 'Femenino', NOW(), NOW()),
('Javier Paredes', 'Instructor de Yoga', 'Operaciones', 'javier.paredes@gimnasio.com', '+51 999 000 111', '2024-02-20', 'Activo', 'Jr. La Paz 741, Lima', '01234567', 2600.00, '1989-01-08', 'Masculino', NOW(), NOW()),
('Carmen Vega', 'Encargada de Limpieza', 'Operaciones', 'carmen.vega@gimnasio.com', '+51 999 111 333', '2021-09-15', 'Activo', 'Calle Los Andes 852, Lima', '11223344', 1800.00, '1980-10-12', 'Femenino', NOW(), NOW()),
('Fernando Castro', 'Técnico de Mantenimiento', 'Operaciones', 'fernando.castro@gimnasio.com', '+51 999 222 444', '2022-11-10', 'Activo', 'Av. Colonial 963, Lima', '22334455', 2200.00, '1994-02-28', 'Masculino', NOW(), NOW());