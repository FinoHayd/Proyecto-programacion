<?php
// api/mascotas.php

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

// Obtener todas las mascotas
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM mascotas ORDER BY id DESC";
    $result = $conn->query($sql);
    
    $mascotas = [];
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $mascotas[] = $row;
        }
    }
    
    echo json_encode($mascotas);
}

// Crear nueva mascota
else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validar que los campos requeridos no estén vacíos
    if (!isset($data['nombre']) || empty(trim($data['nombre'])) || 
        !isset($data['especie']) || empty(trim($data['especie'])) ||
        !isset($data['duenio']) || empty(trim($data['duenio']))) {
        echo json_encode(['error' => 'Los campos nombre, especie y dueño son obligatorios']);
        exit;
    }

    // Escapar los datos para prevenir SQL injection
    $nombre = $conn->real_escape_string(trim($data['nombre']));
    $especie = $conn->real_escape_string(trim($data['especie']));
    $raza = isset($data['raza']) ? $conn->real_escape_string(trim($data['raza'])) : '';
    $edad = isset($data['edad']) ? intval($data['edad']) : 0;
    $duenio = $conn->real_escape_string(trim($data['duenio']));
    $foto = isset($data['foto']) ? $conn->real_escape_string(trim($data['foto'])) : '';

    // Verificar si ya existe una mascota con el mismo nombre y dueño
    $check_sql = "SELECT id FROM mascotas WHERE nombre = '$nombre' AND duenio = '$duenio' LIMIT 1";
    $check_result = $conn->query($check_sql);
    
    if ($check_result && $check_result->num_rows > 0) {
        echo json_encode(['error' => 'Ya existe una mascota con ese nombre para este dueño']);
        exit;
    }

    $sql = "INSERT INTO mascotas (nombre, especie, raza, edad, duenio, foto) 
            VALUES ('$nombre', '$especie', '$raza', $edad, '$duenio', '$foto')";

    if ($conn->query($sql)) {
        $mascota = [
            'id' => $conn->insert_id,
            'nombre' => $nombre,
            'especie' => $especie,
            'raza' => $raza,
            'edad' => $edad,
            'duenio' => $duenio,
            'foto' => $foto
        ];
        echo json_encode(['success' => true, 'mascota' => $mascota]);
    } else {
        echo json_encode(['error' => 'Error al crear la mascota: ' . $conn->error]);
    }
}

// Actualizar mascota
else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['id'])) {
        echo json_encode(['error' => 'ID de mascota requerido']);
        exit;
    }

    $id = intval($data['id']);
    $updates = [];

    if (isset($data['nombre']) && !empty(trim($data['nombre']))) {
        $updates[] = "nombre = '" . $conn->real_escape_string(trim($data['nombre'])) . "'";
    }
    if (isset($data['especie']) && !empty(trim($data['especie']))) {
        $updates[] = "especie = '" . $conn->real_escape_string(trim($data['especie'])) . "'";
    }
    if (isset($data['raza'])) {
        $updates[] = "raza = '" . $conn->real_escape_string(trim($data['raza'])) . "'";
    }
    if (isset($data['edad'])) {
        $updates[] = "edad = " . intval($data['edad']);
    }
    if (isset($data['duenio']) && !empty(trim($data['duenio']))) {
        $updates[] = "duenio = '" . $conn->real_escape_string(trim($data['duenio'])) . "'";
    }
    if (isset($data['foto'])) {
        $updates[] = "foto = '" . $conn->real_escape_string(trim($data['foto'])) . "'";
    }

    if (!empty($updates)) {
        $sql = "UPDATE mascotas SET " . implode(', ', $updates) . " WHERE id = $id";
        
        if ($conn->query($sql)) {
            echo json_encode(['success' => true, 'message' => 'Mascota actualizada correctamente']);
        } else {
            echo json_encode(['error' => 'Error al actualizar la mascota: ' . $conn->error]);
        }
    } else {
        echo json_encode(['error' => 'No hay datos para actualizar']);
    }
}

// Eliminar mascota
else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['id'])) {
        echo json_encode(['error' => 'ID de mascota requerido']);
        exit;
    }

    $id = intval($data['id']);
    $sql = "DELETE FROM mascotas WHERE id = $id";
    
    if ($conn->query($sql)) {
        echo json_encode(['success' => true, 'message' => 'Mascota eliminada correctamente']);
    } else {
        echo json_encode(['error' => 'Error al eliminar la mascota: ' . $conn->error]);
    }
}

$conn->close();