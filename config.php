<?php
   $host = 'localhost'; 
   $database = 'bifitgym'; 
   $username = 'bifitgym'; 
   $password = 'bifitgymdatabase'; 
   try {
      $conn = new mysqli($host, $username, $password, $database);
      if ($conn->connect_error) {
          throw new mysqli_sql_exception("Connection failed: " . $conn->connect_error);
      }
  } catch (mysqli_sql_exception $e) {
      echo "Connection failed: " . $e->getMessage();
      exit();
  }
?> 