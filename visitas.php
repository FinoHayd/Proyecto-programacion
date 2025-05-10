<?php
// api/visitas.php

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

// Obtener todas las visitas
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT v.*, m.nombre as nombre_mascota 
            FROM visitas v 
            LEFT JOIN mascotas m ON v.mascota_id = m.id 
            ORDER BY v.fecha DESC";
    
    $result = $conn->query($sql);
    $visitas = [];
    
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $visitas[] = $row;
        }
    }
    
    echo json_encode($visitas);
}

// Crear nueva visita
else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['petId']) || !isset($data['date']) || !isset($data['reason'])) {
        echo json_encode(['error' => 'Faltan datos requeridos']);
        exit;
    }

    $mascota_id = intval($data['petId']);
    $fecha = $conn->real_escape_string($data['date']);
    $motivo = $conn->real_escape_string($data['reason']);
    $diagnostico = isset($data['diagnosis']) ? $conn->real_escape_string($data['diagnosis']) : '';
    $tratamiento = isset($data['treatment']) ? $conn->real_escape_string($data['treatment']) : '';
    $proxima_visita = isset($data['nextDate']) ? "'" . $conn->real_escape_string($data['nextDate']) . "'" : "NULL";

    $sql = "INSERT INTO visitas (mascota_id, fecha, motivo, diagnostico, tratamiento, proxima_visita) 
            VALUES ($mascota_id, '$fecha', '$motivo', '$diagnostico', '$tratamiento', $proxima_visita)";

    if ($conn->query($sql)) {
        $id = $conn->insert_id;
        echo json_encode(['success' => true, 'id' => $id]);
    } else {
        echo json_encode(['error' => 'Error al guardar la visita: ' . $conn->error]);
    }
}

// Actualizar visita
else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['id'])) {
        echo json_encode(['error' => 'ID de visita requerido']);
        exit;
    }

    $id = intval($data['id']);
    $updates = [];

    if (isset($data['petId'])) {
        $updates[] = "mascota_id = " . intval($data['petId']);
    }
    if (isset($data['date'])) {
        $updates[] = "fecha = '" . $conn->real_escape_string($data['date']) . "'";
    }
    if (isset($data['reason'])) {
        $updates[] = "motivo = '" . $conn->real_escape_string($data['reason']) . "'";
    }
    if (isset($data['diagnosis'])) {
        $updates[] = "diagnostico = '" . $conn->real_escape_string($data['diagnosis']) . "'";
    }
    if (isset($data['treatment'])) {
        $updates[] = "tratamiento = '" . $conn->real_escape_string($data['treatment']) . "'";
    }
    if (isset($data['nextDate'])) {
        $updates[] = "proxima_visita = " . ($data['nextDate'] ? "'" . $conn->real_escape_string($data['nextDate']) . "'" : "NULL");
    }

    if (!empty($updates)) {
        $sql = "UPDATE visitas SET " . implode(', ', $updates) . " WHERE id = $id";
        
        if ($conn->query($sql)) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['error' => 'Error al actualizar la visita: ' . $conn->error]);
        }
    }
}

// Eliminar visita
else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['id'])) {
        echo json_encode(['error' => 'ID de visita requerido']);
        exit;
    }

    $id = intval($data['id']);
    $sql = "DELETE FROM visitas WHERE id = $id";
    
    if ($conn->query($sql)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => 'Error al eliminar la visita: ' . $conn->error]);
    }
}

$conn->close();
?>