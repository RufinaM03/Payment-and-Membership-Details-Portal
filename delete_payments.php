<?php
include('config.php');

// Getting memberId from POST request
$memberId = $_POST['memberId'];

// SQL query to delete record
$sql = "DELETE FROM payment WHERE member_id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $memberId);

$response = array();

if ($stmt->execute()) {
    $response['success'] = true;
} else {
    $response['success'] = false;
    $response['message'] = $stmt->error;
}

echo json_encode($response);

$stmt->close();
$conn->close();
?>
