<?php
    if(isset($_POST["logout"])){
        unset($_COOKIE["userId"]);
        setcookie("userId", "", time()-(60*60*24*7));
        unset($_COOKIE["username"]);
        setcookie("username", "", time()-(60*60*24*7));
    }
    
    if(!isset($_COOKIE["userId"])  || !isset($_COOKIE["username"])){
        header("Location: login.php");
    }

?>

<?php 
    require_once 'DataSource.php';
    $conn = new DataSource();
    if(count($_POST) > 0){
        $result = $conn->UpdateUser($_POST);
        if($result){
            echo "<script>alert('Usuário alterado com sucesso!');</script>";
        }
        else{
            echo "<script>alert('Erro ao alterar usuário!');</script>";
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
            <form class = "cadastroForm" method = "POST"> 
            <?php 
                        require_once 'DataSource.php';
                        $conn = new DataSource();
                        $user = $conn->getUser($_COOKIE["userId"]);
                        echo "<input type=\"hidden\"  class = \"register\" name = \"id\" value=\"" . $_COOKIE["userId"] . "\" />";
                        echo "<label> Nome </label>";
                        echo "<input type=\"text\"  class = \"register\" name = \"name\" value=\"" . $user[4] . "\" />";
                        echo "<label> Email    </label>";
                        echo "<input type=\"email\" name=\"email\" class = \"register\" value=\"" . $user[5] . "\" />";
                        echo "<label> Telefone </label>";
                        echo "<input type=\"text\" maxlength=\"15\" class = \"register\" name = \"phone\" pattern=\"\([0-9]{2}\)[0-9]{4,6}-[0-9]{3,4}$\" value=\"" . $user[6] . "\" />";
                        echo "<label> Senha </label>";
                        echo "<input type=\"password\" class = \"register\" name=\"password\" value=\"" . $user[2]. "\" />";
                    ?>
                <input class = "btnLgn" type = "submit" value = "Atualizar">
            </form>
        </section> 
        
        <footer>
            <p>SI401 @ 2021</p>
        </footer>

       
    </body>
</html> 
