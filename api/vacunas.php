<?php
// api/vacunas.php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Manejar preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config.php';

// Obtener todas las vacunas
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Consulta con JOIN para obtener también los datos de la mascota
    $sql = "SELECT v.*, m.nombre as nombre_mascota, m.especie 
            FROM vacunas v 
            LEFT JOIN mascotas m ON v.mascota_id = m.id 
            ORDER BY v.fecha DESC";
    
    $result = $conn->query($sql);
    
    $vacunas = [];
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $vacunas[] = $row;
        }
    }
    
    echo json_encode($vacunas);
}

// Crear nueva vacuna
else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validar campos requeridos
    if (!isset($data['mascota_id']) || !isset($data['tipo']) || !isset($data['fecha'])) {
        echo json_encode(['error' => 'Mascota, tipo de vacuna y fecha son obligatorios']);
        exit;
    }

    // Escapar y validar datos
    $mascota_id = intval($data['mascota_id']);
    $tipo = $conn->real_escape_string(trim($data['tipo']));
    $fecha = $conn->real_escape_string(trim($data['fecha']));
    $proxima_fecha = isset($data['proxima_fecha']) ? $conn->real_escape_string(trim($data['proxima_fecha'])) : null;
    $notas = isset($data['notas']) ? $conn->real_escape_string(trim($data['notas'])) : '';

    // Verificar que la mascota existe
    $check_sql = "SELECT id FROM mascotas WHERE id = $mascota_id";
    $check_result = $conn->query($check_sql);
    
    if (!$check_result || $check_result->num_rows === 0) {
        echo json_encode(['error' => 'La mascota seleccionada no existe']);
        exit;
    }

    $sql = "INSERT INTO vacunas (mascota_id, tipo, fecha, proxima_fecha, notas) 
            VALUES ($mascota_id, '$tipo', '$fecha', " . 
            ($proxima_fecha ? "'$proxima_fecha'" : "NULL") . ", '$notas')";

    if ($conn->query($sql)) {
        // Obtener los datos completos de la vacuna recién creada
        $id = $conn->insert_id;
        $sql = "SELECT v.*, m.nombre as nombre_mascota, m.especie 
                FROM vacunas v 
                LEFT JOIN mascotas m ON v.mascota_id = m.id 
                WHERE v.id = $id";
        $result = $conn->query($sql);
        $vacuna = $result->fetch_assoc();
        
        echo json_encode(['success' => true, 'vacuna' => $vacuna]);
    } else {
        echo json_encode(['error' => 'Error al registrar la vacuna: ' . $conn->error]);
    }
}

// Actualizar vacuna
else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['id'])) {
        echo json_encode(['error' => 'ID de vacuna requerido']);
        exit;
    }

    $id = intval($data['id']);
    $updates = [];

    if (isset($data['mascota_id'])) {
        $mascota_id = intval($data['mascota_id']);
        $updates[] = "mascota_id = $mascota_id";
    }
    if (isset($data['tipo'])) {
        $updates[] = "tipo = '" . $conn->real_escape_string(trim($data['tipo'])) . "'";
    }
    if (isset($data['fecha'])) {
        $updates[] = "fecha = '" . $conn->real_escape_string(trim($data['fecha'])) . "'";
    }
    if (isset($data['proxima_fecha'])) {
        $proxima_fecha = trim($data['proxima_fecha']);
        $updates[] = "proxima_fecha = " . ($proxima_fecha ? "'" . $conn->real_escape_string($proxima_fecha) . "'" : "NULL");
    }
    if (isset($data['notas'])) {
        $updates[] = "notas = '" . $conn->real_escape_string(trim($data['notas'])) . "'";
    }

    if (!empty($updates)) {
        $sql = "UPDATE vacunas SET " . implode(', ', $updates) . " WHERE id = $id";
        
        if ($conn->query($sql)) {
            echo json_encode(['success' => true, 'message' => 'Vacuna actualizada correctamente']);
        } else {
            echo json_encode(['error' => 'Error al actualizar la vacuna: ' . $conn->error]);
        }
    } else {
        echo json_encode(['error' => 'No hay datos para actualizar']);
    }
}

// Eliminar vacuna
else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['id'])) {
        echo json_encode(['error' => 'ID de vacuna requerido']);
        exit;
    }

    $id = intval($data['id']);
    $sql = "DELETE FROM vacunas WHERE id = $id";
    
    if ($conn->query($sql)) {
        echo json_encode(['success' => true, 'message' => 'Vacuna eliminada correctamente']);
    } else {
        echo json_encode(['error' => 'Error al eliminar la vacuna: ' . $conn->error]);
    }
}

$conn->close();
?>