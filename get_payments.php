<?php

include('config.php');

try {
        // Initialize an empty array to store payments data
    $payments = array();

    // Attempt to query the database
    $sql = "SELECT * FROM payment";
    $result = $conn->query($sql);

    if ($result === false) {
        // If there is an error in the query execution
        $error = "Error executing query: " . $conn->error;
        // You might log this error or handle it in some appropriate way
        echo json_encode(array('error' => $error));
    } else {
        // If the query executed successfully
        if ($result->num_rows > 0) {
            // Fetch each row and store it in the payments array
            while($row = $result->fetch_assoc()) {
                $payments[] = $row;
            }
        }

        // Return data as JSON
        echo json_encode($payments);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(array('error' => $e->getMessage()));
}

// Close the database connection
$conn->close();
?>
