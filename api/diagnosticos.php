<?php
// api/diagnosticos.php

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

// Obtener todos los diagnósticos
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT d.*, m.nombre as nombre_mascota 
            FROM diagnosticos d 
            LEFT JOIN mascotas m ON d.mascota_id = m.id 
            ORDER BY d.fecha DESC";
    
    $result = $conn->query($sql);
    $diagnosticos = [];
    
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            // Los campos ya están como strings JSON en la base de datos
            $diagnosticos[] = $row;
        }
    }
    
    echo json_encode($diagnosticos);
}

// Crear nuevo diagnóstico
else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['petId'])) {
        echo json_encode(['error' => 'ID de mascota requerido']);
        exit;
    }

    $mascota_id = intval($data['petId']);
    $fecha = isset($data['date']) ? $conn->real_escape_string($data['date']) : date('Y-m-d');
    
    // Verificar formato de síntomas y enfermedades
    $sintomas = $data['symptoms'];
    $enfermedades = $data['possibleDiseases'];
    
    // Si no son strings JSON, convertirlos
    if (!is_string($sintomas)) {
        $sintomas = json_encode($sintomas);
    }
    
    if (!is_string($enfermedades)) {
        $enfermedades = json_encode($enfermedades);
    }
    
    // Escapar strings para SQL
    $sintomas = $conn->real_escape_string($sintomas);
    $enfermedades = $conn->real_escape_string($enfermedades);
    
    $recomendaciones = isset($data['recommendations']) ? $conn->real_escape_string($data['recommendations']) : '';

    $sql = "INSERT INTO diagnosticos (mascota_id, fecha, sintomas, enfermedades_posibles, recomendaciones) 
            VALUES ($mascota_id, '$fecha', '$sintomas', '$enfermedades', '$recomendaciones')";

    if ($conn->query($sql)) {
        $id = $conn->insert_id;
        
        // Obtener el diagnóstico recién creado para devolverlo
        $sql = "SELECT d.*, m.nombre as nombre_mascota 
                FROM diagnosticos d 
                LEFT JOIN mascotas m ON d.mascota_id = m.id 
                WHERE d.id = $id";
        $result = $conn->query($sql);
        
        if ($result && $row = $result->fetch_assoc()) {
            echo json_encode(['success' => true, 'id' => $id, 'diagnostico' => $row]);
        } else {
            echo json_encode(['success' => true, 'id' => $id]);
        }
    } else {
        echo json_encode(['error' => 'Error al guardar el diagnóstico: ' . $conn->error]);
    }
}

$conn->close();
?>