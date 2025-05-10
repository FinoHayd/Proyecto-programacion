<?php
$DB_HOST = 'localhost';
$DB_USER = 'root';
$DB_PASS = '';
$DB_NAME = 'petcontrol';

try {
    $conn = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
    
    if ($conn->connect_error) {
        die("Error de conexión: " . $conn->connect_error);
    }
    
    echo "¡Conexión exitosa a la base de datos!";
    
    $conn->close();
} catch (Exception $e) {
    die("Error: " . $e->getMessage());
}
?> 
