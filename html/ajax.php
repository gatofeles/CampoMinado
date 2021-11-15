<?php
if(isset($_POST['gameResult'])){
        require_once 'DataSource.php';
        $conn = new DataSource();
        $result = $conn->addPartida($_COOKIE["userId"], $_POST);
        $_POST = array();
    }
?>