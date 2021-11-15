<?php
    if(!isset($_COOKIE["userId"])  || !isset($_COOKIE["username"])){
        header("Location: login.php");
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
            <div class="dropdown">
                <div class="dropbtn">Menu</div>
                <form  class="dropdown-content" method = "POST">
                    <a href="game.php">Jogo</a>
                    <a href="global_ranking.php">Global Ranking</a>
                    <input type ="submit" name = "logout" value = "Logout">
                </form >
            </div>   
        </header>

        <section>
            <h1>&nbsp;</h1>
            <form class = "cadastroForm"> 
                <label> Nome </label>
                <input type="name"  class = "email_password">
                
                <label> Email    </label>
                <input type="email" class = "email_password"> 
                <label> Telefone </label>
                <input type="telefone" class = "email_password"> 
                
                <label> Senha </label>
                <input type="password" class = "email_password"> 
                <div class = "btnLgn"><a href = "game.php">Atualizar</a></div> 
            </form>
        </section> 
        
        <footer>
            <p>SI401 @ 2021</p>
        </footer>

       
    </body>
</html> 
