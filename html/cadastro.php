<?php 
    require_once 'DataSource.php';
    $conn = new DataSource();
    if(count($_POST) > 0){
        $result = $conn->RegisterUser($_POST);
        if($result){
            echo "<script>alert('Usuário cadastrado com sucesso!');</script>";
        }
        else{
            echo "<script>alert('Erro ao cadastrar usuário! Usuário já existe');</script>";
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

        <section class = "registroForm">
            <h1>Registro</h1>
            <form class = "cadastroForm" method = "POST"> 
                <label> Nome </label>
                <input type="text"  class = "register" required="required" name = "name">
                <label> Data Nascimento</label>
                <input type="date"  class = "register" required="required" name = "dateBirth">
                <label> Email    </label>
                <input type="email" class = "register" required="required" name = "email"> 
                <label> Telefone </label>
                <input type="text" class = "register" required="required" maxlength="15" class = "register" name = "phone" pattern="\([0-9]{2}\)[0-9]{4,6}-[0-9]{3,4}$" value = "(00)00000-0000"> 
                <label> CPF </label>
                <input type="text" class = "register" required="required" maxlength="11" name = "cpf"> 
                <label> Username </label>
                <input type="text" class = "register" required="required" name = "username"> 
                <label> Senha </label>
                <input type="password" class = "register" name = "password"> 
                <input class = "btnLgn" type = "submit" value = "Cadastrar">
                <div class = "btnLgn"><a href = "login.php">Tela de Login</a></div>
            </form>
        </section> 
        
        <footer>
            <p>SI401 @ 2021</p>
        </footer>  
    </body>
</html> 
