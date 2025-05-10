<?php
// config.php

define('DB_HOST',    'localhost');      // socket UNIX
define('DB_NAME',    'petcontrol');
define('DB_USER',    'root');
define('DB_PASS',    '');               // aquí va la misma que pusiste en el SQL
define('DB_CHARSET', 'utf8mb4');

$dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
} catch (PDOException $e) {
    http_response_code(500);
    exit(json_encode([
        'error' => 'Error de conexión: ' . $e->getMessage()
    ]));
}
