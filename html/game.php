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
        <link rel="stylesheet" href="../css/game.css">
        <script src = "../js/header.js"></script>
        <script src = "../js/gerarCampo.js"></script>
        <title>Campo Minado</title>
    </head>
    <body onload="loadGamePage()">
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
                    <a href="global_ranking.php">Global Ranking</a>
                    <input type ="submit" name = "logout" value = "Logout">
                </form >
            </div>   
        </header>

        <section class="campo">
            <h1 id = "gameStatus" class = gameStatus>Jogo não iniciado</h1>
            <form class = "options" action="dim">
                <label for="linhas">Linhas</label>
                <input type="number"  id = "linhas" name="linhas">
                <label for="colunas">Colunas</label>
                <input type="number"  id = "colunas" name="colunas">
                <label for="bomb">Bombas</label>
                <input type="number"  id = "bomb" name="bomb">
                <label for="model">Modalidade</label>
                <select id="model">
                  <option value="classic">Clássica</option>
                  <option value="rivotril">Rivotril</option>
                </select>
            </form>
            <div class="btn" id="gerarCampo" onclick="gerarCampo()">Gerar Campo</div>
            <table id = "table">
                <!-- Tabela renderizada dinamicamente -->
            </table>   
            <div id = "notReady" class = "btn notReady" onclick = "startGame()">
                Iniciar Jogo
            </div>
            <div class = "btn" onclick = "restartGame()">
                Recarregar Jogo
            </div>
            <div class = "btn" onclick = "cheating()">
                Trapaça
            </div>
        </section>
        
        <article>
            <h1>Histórico</h1>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Dimensões do Campo</th>
                        <th>Nº Bombas</th>
                        <th>Modalidade</th>
                        <th>Tempo de Jogo (s)</th>
                        <th>Resultado</th>
                        <th>Data do Jogo</th>
                    </tr>
                </thead>
                <tbody id="ranking">
                <?php 
                        require_once 'DataSource.php';
                        $conn = new DataSource();
                        $history = $conn->showUserHistory($_COOKIE["userId"]);
                        if($history->num_rows > 0) {
                            while($row = $history->fetch_assoc()) {
                                echo "<tr>";
                                echo "<td>" . $row["username"] . "</td>";
                                echo "<td>" . $row["dimensaoCampo"] . "</td>";
                                echo "<td>" . $row["numeroBombas"] . "</td>";
                                echo "<td>" . (($row["modoDeJogo"] == "R")? "Rivotril":"Clássico"). "</td>";
                                echo "<td>" . $row["tempoPartida"] . "</td>";
                                echo "<td>" . (($row["resultado"] == "P")? "Derrota":"Vitória") . "</td>";
                                echo "<td>" . $row["dataDoJogo"] . "</td>";
                                
                                echo "</tr>";
                            }
                        }
                    ?>
                    <!-- Tabela renderizada dinamicamente -->
                </tbody>
            </table>
        </article>

        <footer>
            <p>SI401 @ 2021</p>
        </footer>
    </body>
</html> 
