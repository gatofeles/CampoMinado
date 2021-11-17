<?php 
    require_once 'DataSource.php';
    $conn = new DataSource();
    if(count($_POST) > 0){
        $result = $conn->DoLogin($_POST);
        echo $result;
        if($result){
            $userId = $conn->getUserId($_POST["username"]);
            setcookie("username", $_POST["username"]);
            setcookie("userId", $userId);
            session_start();
            $_SESSION["start"] = true;
            header("Location: game.php");
            
        }
        else{
            echo "<script>alert('Erro ao realizar login! Usuário ou senha incorretos');</script>";
        }
    }

?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="../css/index.css">
        <script src = "../js/header.js"></script>
        <script src = "../js/gerarCampo.js"></script>
        <title>Campo Minado</title>
    </head>
    <body onload="defineTheme()">
        <header>
            <div>
                <img class="bomb" src="../images/bombear.png" alt="bomba" />
                <span class="logo">Campo Minado</span>
            </div> 
            <div class="div-change-theme">
                <div class="btn" onclick="changeTheme()">
                    <img class="change-theme" src="../images/theme_light_dark_icon.svg" alt="Trocar o Theme" />
                </div>
            </div>  
        </header>

        <section class = "login">
            <h1>&nbsp;</h1>
            <form class = "loginForm" method = "POST"> 
                <label> Usuário </label>
                <input type="text"  class = "email_password" required="required" name = "username">
                <label> Senha </label>
                <input type="password"  class = "email_password" required="required" name = "password">
                <input class = "btnLgn" type="submit" value = "Login">
                <div class = "btnLgn"><a href = "cadastro.php">Registrar</a></div> 
            </form>
        </section> 
        
        <footer>
            <p>SI401 @ 2021</p>
        </footer>
       
    </body>
</html> 