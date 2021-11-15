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

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="../css/index.css">
        <link rel="stylesheet" href="../css/global-ranking.css">
        <script src = "../js/nav.js"></script>
        <script src = "../js/header.js"></script>
        <script src = "../js/global-ranking.js"></script>
        <title>Campo Minado - Ranking Global</title>
    </head>
    <body onload="loadRankingPage()">
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
                    <a href="profile.php">Dados do Usuário</a>
                    <a href="game.php">Jogo</a>
                    <input type ="submit" name = "logout" value = "Logout">
                </form >
            </div>   
        </header>

        <section>
            <h1>Ranking Global</h1>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Dimensão do Campo (Células)</th>
                        <th>Número de Bombas</th>
                        <th>Tempo de Jogo (s)</th>
                        <th>Data e Hora do Jogo</th>
                        <th>Dificuldade</th>
                    </tr>
                </thead>
                <tbody id="ranking">
                    <?php 
                        require_once 'DataSource.php';
                        $conn = new DataSource();
                        $top10 = $conn->showTop10();
                        if($top10->num_rows > 0) {
                            while($row = $top10->fetch_assoc()) {
                                echo "<tr>";
                                echo "<td>" . $row["username"] . "</td>";
                                echo "<td>" . $row["dimensaoCampo"] . "</td>";
                                echo "<td>" . $row["numeroBombas"] . "</td>";
                                echo "<td>" . $row["tempoPartida"] . "</td>";
                                echo "<td>" . $row["dataDoJogo"] . "</td>";
                                echo "<td>" . (($row["modoDeJogo"] == "R")? "Rivotril":"Clássico"). "</td>";
                                echo "</tr>";
                            }
                        }
                    ?>
                    <!-- Tabela renderizada dinamicamente -->
                </tbody>
            </table>
        </section>
        
        <footer>
            <p>SI401 @ 2021</p>
        </footer>
    </body>
</html> 