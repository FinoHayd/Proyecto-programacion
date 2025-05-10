<?php
// api/config.php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

// Configuración de la base de datos
$DB_HOST = 'localhost';
$DB_USER = 'root';     // Usuario por defecto de WAMP
$DB_PASS = '';         // Contraseña por defecto de WAMP (vacía)
$DB_NAME = 'petcontrol';

// Crear conexión
$conn = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);

// Verificar conexión
if ($conn->connect_error) {
    die(json_encode([
        'error' => 'Error de conexión a la base de datos',
        'details' => $conn->connect_error
    ]));
}

// Establecer charset
$conn->set_charset("utf8");
?>