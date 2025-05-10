<?php
// api/login.php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['username']) || !isset($data['password'])) {
        echo json_encode(['error' => 'Usuario y contraseña son requeridos']);
        exit;
    }

    $username = $conn->real_escape_string($data['username']);
    $password = $data['password'];

    // Verificar si el usuario existe
    $sql = "SELECT id, username, password, nombre FROM usuarios WHERE username = '$username'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        // Verificar la contraseña
        if (password_verify($password, $user['password'])) {
            echo json_encode([
                'success' => true,
                'user' => [
                    'id' => $user['id'],
                    'username' => $user['username'],
                    'name' => $user['nombre']
                ]
            ]);
        } else {
            echo json_encode(['error' => 'Contraseña incorrecta']);
        }
    } else {
        echo json_encode(['error' => 'Usuario no encontrado']);
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Crear nuevo usuario
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['username']) || !isset($data['password']) || !isset($data['name'])) {
        echo json_encode(['error' => 'Todos los campos son requeridos']);
        exit;
    }

    $username = $conn->real_escape_string($data['username']);
    $password = password_hash($data['password'], PASSWORD_DEFAULT);
    $name = $conn->real_escape_string($data['name']);

    // Verificar si el usuario ya existe
    $sql = "SELECT id FROM usuarios WHERE username = '$username'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        echo json_encode(['error' => 'El nombre de usuario ya está en uso']);
        exit;
    }

    // Insertar nuevo usuario
    $sql = "INSERT INTO usuarios (username, password, nombre) VALUES ('$username', '$password', '$name')";
    
    if ($conn->query($sql)) {
        echo json_encode(['success' => true, 'message' => 'Usuario creado exitosamente']);
    } else {
        echo json_encode(['error' => 'Error al crear el usuario: ' . $conn->error]);
    }
}

$conn->close();
?>