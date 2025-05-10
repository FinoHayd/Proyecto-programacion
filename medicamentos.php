<?php
// api/medicamentos.php

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

// Obtener todos los medicamentos
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT m.*, p.nombre as nombre_mascota 
            FROM medicamentos m 
            LEFT JOIN mascotas p ON m.mascota_id = p.id 
            ORDER BY m.fecha_inicio DESC";
    
    $result = $conn->query($sql);
    $medicamentos = [];
    
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $medicamentos[] = $row;
        }
    }
    
    echo json_encode($medicamentos);
}

// Crear nuevo medicamento
else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['petId']) || !isset($data['name']) || !isset($data['dose']) || !isset($data['frequency'])) {
        echo json_encode(['error' => 'Faltan datos requeridos']);
        exit;
    }

    $mascota_id = intval($data['petId']);
    $nombre = $conn->real_escape_string($data['name']);
    $dosis = $conn->real_escape_string($data['dose']);
    $frecuencia = $conn->real_escape_string($data['frequency']);
    $fecha_inicio = $conn->real_escape_string($data['startDate']);
    $fecha_fin = isset($data['endDate']) ? "'" . $conn->real_escape_string($data['endDate']) . "'" : "NULL";
    $notas = isset($data['notes']) ? $conn->real_escape_string($data['notes']) : '';

    $sql = "INSERT INTO medicamentos (mascota_id, nombre, dosis, frecuencia, fecha_inicio, fecha_fin, notas) 
            VALUES ($mascota_id, '$nombre', '$dosis', '$frecuencia', '$fecha_inicio', $fecha_fin, '$notas')";

    if ($conn->query($sql)) {
        $id = $conn->insert_id;
        echo json_encode(['success' => true, 'id' => $id]);
    } else {
        echo json_encode(['error' => 'Error al guardar el medicamento: ' . $conn->error]);
    }
}

// Actualizar medicamento
else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['id'])) {
        echo json_encode(['error' => 'ID de medicamento requerido']);
        exit;
    }

    $id = intval($data['id']);
    $updates = [];

    if (isset($data['petId'])) {
        $updates[] = "mascota_id = " . intval($data['petId']);
    }
    if (isset($data['name'])) {
        $updates[] = "nombre = '" . $conn->real_escape_string($data['name']) . "'";
    }
    if (isset($data['dose'])) {
        $updates[] = "dosis = '" . $conn->real_escape_string($data['dose']) . "'";
    }
    if (isset($data['frequency'])) {
        $updates[] = "frecuencia = '" . $conn->real_escape_string($data['frequency']) . "'";
    }
    if (isset($data['startDate'])) {
        $updates[] = "fecha_inicio = '" . $conn->real_escape_string($data['startDate']) . "'";
    }
    if (isset($data['endDate'])) {
        $updates[] = "fecha_fin = " . ($data['endDate'] ? "'" . $conn->real_escape_string($data['endDate']) . "'" : "NULL");
    }
    if (isset($data['notes'])) {
        $updates[] = "notas = '" . $conn->real_escape_string($data['notes']) . "'";
    }

    if (!empty($updates)) {
        $sql = "UPDATE medicamentos SET " . implode(', ', $updates) . " WHERE id = $id";
        
        if ($conn->query($sql)) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['error' => 'Error al actualizar el medicamento: ' . $conn->error]);
        }
    }
}

// Eliminar medicamento
else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['id'])) {
        echo json_encode(['error' => 'ID de medicamento requerido']);
        exit;
    }

    $id = intval($data['id']);
    $sql = "DELETE FROM medicamentos WHERE id = $id";
    
    if ($conn->query($sql)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => 'Error al eliminar el medicamento: ' . $conn->error]);
    }
}

$conn->close();
?>