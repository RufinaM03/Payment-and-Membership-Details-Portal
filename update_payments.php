<?php
include('config.php');

// Getting data from POST request
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
//$editIndex = $_POST['editIndex']; //check if this line is necessary

// Assuming memberId is unique and used to identify the row to update
$sql = "UPDATE payment SET 
        name = ?, 
        paid_on = ?, 
        expiry_date = ?, 
        payment = ?, 
        balance_amount = ?, 
        payment_type = ?, 
        payment_status = ?, 
        phone_number = ?, 
        offer = ?, 
        validity_start_date = ?, 
        validity_end_date = ? 
        WHERE member_id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssddssssssi", 
                  $name, $paidOn, $expiryDate, $payment, $balance, 
                  $paymentType, $paymentStatus, $phoneNumber, $offer, 
                  $validityStartDate, $validityEndDate, $memberId);

if ($stmt->execute()) {
  echo json_encode(['success' => true]);
} else {
  echo json_encode(['success' => false, 'message' => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
