<?php

include('config.php');

$memberId = $_POST['memberid'];
$name = $_POST['name'];
$paidOn = $_POST['paidon'];
// $dueDate = $_POST['dueDate'];
$expiryDate = $_POST['expiryDate'];
$payment = $_POST['amountpaid'];
$balance = $_POST['balanceamount'];
$paymentType = $_POST['paymenttype'];
$paymentStatus = $_POST['paymentstatus'];
$phoneNumber = $_POST['phonenumber'];
$offer = $_POST['offer'];
$validityStartDate = $_POST['validityStartDate'];
$validityEndDate = $_POST['validityEndDate'];

// SQL query to insert data
$sql = "INSERT INTO payment (member_id, name, paid_on, expiry_date, payment, balance_amount, payment_type, payment_status, phone_number, offer, validity_start_date, validity_end_date)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssddssssss", $memberId, $name, $paidOn, $expiryDate, $payment, $balance, $paymentType, $paymentStatus, $phoneNumber, $offer, $validityStartDate, $validityEndDate);

if ($stmt->execute()) {
    echo "New record created successfully";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();

$conn->close();

?>