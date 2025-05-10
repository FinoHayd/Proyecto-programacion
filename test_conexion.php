<?php
$DB_HOST = 'localhost';
$DB_USER = 'root';
$DB_PASS = '';
$DB_NAME = 'petcontrol';

// 1) Habilitar que mysqli lance excepciones en errores
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    // 2) Intentar la conexión
    $conn = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
    
    echo "¡Conexión exitosa a la base de datos!";
    
    // 3) Cerrar la conexión
    $conn->close();
    
} catch (mysqli_sql_exception $e) {
    // 4) Capturar errores de conexión u otros errores MySQLi
    die("Error de conexión: " . $e->getMessage());
}
?>
