<?php
class DataSource{

    const HOST = 'localhost';
    const USERNAME = 'root';
    const PASSWORD = '';
    const DATABASENAME = 'campominado';
    private $connection;

    public function __construct(){
        $this->connection = new mysqli(self::HOST, self::USERNAME, self::PASSWORD, self::DATABASENAME);
        if($this->connection->connect_error){
            die('Connection failed: ' . $this->connection->connect_error);
        }
    }

    public function showTop10(){
        $top10 = $this->connection->query('SELECT * FROM `top10`');
        return $top10;
    }
    
    public function showUserHistory($userId){
        $query = "CALL mostrarHistorico(".$userId.")";
        $history = $this->connection->query($query);
        return $history;
    }

    public function checkIfUserExists($post){
        $query = $this->connection->query("select * from usuarios where username = '".$post["username"]."'");
        if($query->num_rows > 0){
            return true;
        }
        else{
            return false;
        }
    }

    public function RegisterUser($post){
        if(!$this->checkIfUserExists($post)){
            $query =  "insert into usuarios (username, senha, dataNascimento, nome, email, telefone, cpf) values ('".$post["username"]."','".$post["password"]."','".$post["dateBirth"]."','".$post["name"]."','".$post["email"]."','".$post["phone"]."',".$post["cpf"].")";
            return $this->connection->query($query);
        }
    }

    public function UpdateUser($post){
        $query =  "update usuarios set senha = '".$post["password"]."', nome = '".$post["name"]."', email = '".$post["email"]."', telefone = '".$post["phone"]."' where id = ".$post["id"]."";
        return $this->connection->query($query);
    }

    public function DoLogin($post){
        $query = $this->connection->query("select * from usuarios where username = '".$post["username"]."' and senha = '".$post["password"]."'");
        if($query->num_rows > 0){
            return true;
        }
        else{
            return false;
        }
    }

    public function getUserId($username){
        $id = $this->connection->query("select id from usuarios where username = '".$username."'");
        $stringId = mysqli_fetch_row($id);
        return $stringId[0];
    }

    public function getUser($id){
        $user = $this->connection->query("select * from usuarios where id = ".$id."");
        return mysqli_fetch_row($user);
    }

    public function addPartida($userId, $post){

        date_default_timezone_set('America/Sao_Paulo'); 
        $date = date('Y-m-d H:i:s', time());
        $modo = ($post["gameMode"] == "rivotril")?"R":"C";
        $query = "insert into partidas (idUsuario, dimensaoCampo, numeroBombas,tempoPartida, dataDoJogo, modoDeJogo, resultado) values (".$userId.",".$post["dimensao"].",".$post["bombas"].",".$post["gameTime"].", '".$date."', '".$modo."', '".$post["gameResult"]."')";
        return $this->connection->query($query);
    }



}
?>