let gameReady = false;
let gameStarted = false;
let gameOver = false;
let gameBeat = false;
let matrizCampo = [];
let globalBomb = 0;
let globalNumberOfFields = 0;

async function cheating(){
    if(gameBeat){
        alert("Você venceu! Reinicie o jogo para jogar novamente.");
    }

    else if(gameReady || gameOver){
        let before = [];
        gameReady = false;

        for(let i = 0; i < matrizCampo.length; i++){
            before[i] = new Array(matrizCampo[i].length);
            for(let j = 0; j < matrizCampo[i].length; j++){
                if(matrizCampo[i][j].className.toString()=='areaBomba'){
                    let bomb = matrizCampo[i][j].firstChild;
                    before[i][j] = bomb.className;
                }
                else{
                    before[i][j] = matrizCampo[i][j].className;
                }   
                    
            }
        }

        await makeFieldsVisible();
        makeItAsBefore(before);
        gameReady = true;
    }

    else{
        alert("Para usar a trapaça você precisa de um tabuleiro, dah");
    }
    
}

function makeItAsBefore(before){

    for(let i = 0; i < matrizCampo.length; i++){
        for(let j = 0; j < matrizCampo[i].length; j++){
            if(matrizCampo[i][j].className.toString()=='areaBomba'){
                let bomb = matrizCampo[i][j].firstChild;
                bomb.className = before[i][j];
            }
            else{
                matrizCampo[i][j].className = before[i][j];
            }   
                
        }
    }
}

async function  makeFieldsVisible(){

    for(let i = 0; i < matrizCampo.length; i++){
        for(let j = 0; j < matrizCampo[i].length; j++){
            console.log(matrizCampo[i][j]);
            console.log(matrizCampo[i][j].firstChild);
            if(matrizCampo[i][j].className.toString() == 'area'){
                matrizCampo[i][j].className = 'areaRevel';
            }
            
            else if(matrizCampo[i][j].className.toString() != "areaRevel" && matrizCampo[i][j].firstChild.className.toString() == "bombaHide"){
                let bomb = matrizCampo[i][j].firstChild;
                bomb.className = "bombaArea";
               // matrizCampo[i][j].firstChild.className == "bombaArea";
            }
        }
    }

    await sleep(2000);

}

function gerarCampo(){
    const bomb = document.getElementById("bomb").value;
    let linhas = document.getElementById("linhas").value;
    let colunas = document.getElementById("colunas").value;
    let bombCounter = 0;

    // console.log("bomb"+bomb);
    // console.log("linhas"+linhas);
    // console.log("colunas"+colunas);

    if(gameOver){
        alert("Você perdeu, reinicie o jogo.")
    }

    else if(gameBeat){
        alert("Você venceu! Reinicie o jogo para jogar novamente.");
    }

    else if(gameReady){
        alert("Tabela já construída, clique em iniciar jogo para jogar.");
    }

    else if(!bomb || !colunas || !linhas){
        alert("Preencha todas as características do campo.");
    }

    else if(bomb<0 || colunas<0 || linhas <0){
        alert("Valores precisam ser positivos.");
    }

    else if(bomb > (colunas*linhas)-1){
        alert("Quantidade de bombas excede o numero de celulas.");
    }

    else{
        globalBomb = bomb;
        globalNumberOfFields = linhas*colunas;

        const campo = document.getElementById("table");
        campo.innerHTML = "";
        
        for(let i = 0; i< linhas; i++){
            const novaLinha = document.createElement("tr");
            matrizCampo[i] = new Array(colunas);

            for(let j = 0; j < colunas; j++){
                const novaColuna = document.createElement("td");
                novaColuna.classList.add("area");
                novaColuna.setAttribute("onclick", "revelarCampos()");
                novaLinha.appendChild(novaColuna);
                matrizCampo[i][j] = novaColuna;
            }
            campo.appendChild(novaLinha);
            
        }

        while(bomb>bombCounter){

            for(let i = 0; i< linhas; i++){
                for(let j = 0; j < colunas; j++){
                   const sorteio = Math.floor((Math.random()*100));
                   if(sorteio<5 && bombCounter<bomb && matrizCampo[i][j].className !== "areaBomba"){
                       matrizCampo[i][j].className = "areaBomba";
                       matrizCampo[i][j].innerHTML = '<img class = "bombaHide" src="../images/bombear.png" alt="bomba">';
                       bombCounter++;

                   }
                }    
            }
        }

        gameReady = true;
        startBtn = document.getElementById("notReady");
        startBtn.className = "btn Ready";
        startBtn.id = "Ready";

    }

}

function revelarCampos(){
   
   const celula = event.target;
   let matrizCampo = [];
   let index = [];
   const campo = document.getElementById("table").children;
   if(gameReady && gameStarted && !gameOver && !gameBeat){

        if(celula.className.toString() === "areaBomba"){
            celula.children[0].className = "bombaArea";
            document.getElementById("gameStatus").innerHTML = "Game Over!";
            alert("Game Over!");
            gameOver = true;
            gameReady = false;
            return;
            }

        for(let i = 0; i < campo.length; i++){
            matrizCampo[i] = new Array(campo[i].children.length);
            for(let j = 0; j < campo[i].children.length; j++){
                    matrizCampo[i][j] = campo[i].children[j];
                    if(matrizCampo[i][j] === celula){
                        index.push(i,j);
                    }
            }
        }
        revelarRecursivo(matrizCampo, index);

        if(checkIfWin()){
            document.getElementById("gameStatus").innerHTML = "Parabéns! Você venceu o jogo!";
            gameBeat = true;
        }
   }

   else if(gameBeat){
        alert("Você venceu! Reinicie o jogo para jogar novamente.");
   }

   else if(!gameOver){
       alert("Clique em Iniciar Jogo para começar.");
   }

   else{
       alert("Você perdeu, reinicie o jogo.")
   }

   
    
}

function revelarRecursivo(matriz, index){
    // console.log("entrei: "+ index);
    if(matriz[index[0]][index[1]].className.toString() === "areaBomba"){
        return;
    }
    
    else{
        let bombasPerto = 0;
        // console.log("matrizTipoBefore: " + (matriz[index[0]][index[1]].className.toString() === "area"));
        matriz[index[0]][index[1]].className = "areaRevel";
        // console.log("matrizTipo: " + matriz[index[0]][index[1]].className);

        for(let i = -1; i <= 1; i++){
            for(let j = -1; j <= 1; j++){
                
                if(index[0]+i >=0 && index[1]+j >= 0 && index[0]+i < matriz.length && index[1]+j < matriz[index[0]].length){
                    // console.log(index[0]+i);
                    // console.log(index[1]+j);
                    // console.log("-----");
                    //await sleep(50);

                    if(matriz[index[0]+i][index[1]+j].className.toString() === "areaBomba"){
                        bombasPerto++;
                    }
                }
            }
        }

        if(bombasPerto)
            matriz[index[0]][index[1]].innerHTML = bombasPerto;

        for(let i = -1; i <= 1; i++){
            for(let j = -1; j <= 1; j++){
                if(index[0]+i >=0 && index[1]+j >= 0 && index[0]+i < matriz.length && index[1]+j < matriz[index[0]].length){
                    if(!bombasPerto && matriz[index[0]+i][index[1]+j].className.toString() !== "areaRevel" ){
                        revelarRecursivo(matriz, [index[0]+i, index[1]+j]);
                    }
                
                }
            }
        } 

    }
}

function startGame(){
    if(gameReady && !gameOver && !gameBeat){
        gameStarted = true;
        document.getElementById("gameStatus").innerHTML = "Jogo em andamento";
        alert("Jogo Iniciado!");
    }

    else if(!gameOver && !gameBeat){
        alert("Gere o campo do jogo e selecione o modo antes de iniciar! :)");
    }

    else if(gameBeat){
        alert("Você venceu! Reinicie o jogo para jogar novamente.");
   }

    else if(gameOver){
        alert("Você perdeu, reinicie o jogo.");
    }
}

function restartGame(){
    location.reload();
}

function checkIfWin(){
    let numberOfReavealedFields = 0;

    for(let i = 0; i < matrizCampo.length; i++){
        for(let j = 0; j < matrizCampo[i].length; j++){
            if(matrizCampo[i][j].className.toString() == "areaRevel"){
                numberOfReavealedFields++;
            }
        }
    }
    
    console.log("Campos revelados:"+numberOfReavealedFields.toString()+"Campos totais livres: "+(globalNumberOfFields-globalBomb).toString());

    if(numberOfReavealedFields == (globalNumberOfFields-globalBomb)){
        
        return true; 
    }

    else{
        return false;

    }

}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function loadGamePage() {
    defineTheme(); 
    loadHist();
}

function loadHist(){
    
    const ranking = mockHist();

    const tableRanking = document.getElementById("ranking");

    tableRanking.innerHTML = '';

    for(let i = 0; i< ranking.length; i++){

        const newRanking = document.createElement("tr");

        for(let j = 0; j < 7; j++){
            const newField = document.createElement("td");

            const label = document.createElement("span");

            let value = '';

            switch (j){
                case 0:
                    value = ranking[i].username;
                    break;
                case 1:
                    value = ranking[i].dimension;
                    break;
                case 2:
                    value = ranking[i].bombs;
                    break;
                case 3:
                    value = ranking[i].model;
                    break;
                case 4:
                    value = ranking[i].time;
                    break;
                case 5:
                    value = ranking[i].result;
                    break;
                case 6:
                    value = ranking[i].date;
                    break;
            }
            label.innerHTML = value;

            newField.appendChild(label);
            newRanking.appendChild(newField);
        }
        tableRanking.appendChild(newRanking);
    }

}

function mockHist(){
    return [{
        username: 'Jogador 1',
        dimension: '10x10',
        bombs: 12,
        model: 'Clássica',
        time: 600,
        result: 'Venceu',
        date: '17/09/2021'
    },
    {
        username: 'Jogador 1',
        dimension: '10x10',
        bombs: 12,
        model: 'Clássica',
        time: 800,
        result: 'Perdeu',
        date: '17/09/2021'
    },
    {
        username: 'Jogador 1',
        dimension: '9x9',
        bombs: 10,
        model: 'Rivotril',
        time: 400,
        result: 'Venceu',
        date: '17/09/2021'
    },
    {
        username: 'Jogador 1',
        dimension: '9x9',
        bombs: 10,
        model: 'Clássica',
        time: 500,
        result: 'Venceu',
        date: '17/09/2021'
    },
    {
        username: 'Jogador 1',
        dimension: '9x9',
        bombs: 12,
        model: 'Rivotril',
        time: 650,
        result: 'Perdeu',
        date: '17/09/2021'
    },
    {
        username: 'Jogador 1',
        dimension: '9x9',
        bombs: 9,
        model: 'Clássica',
        time: 1000,
        result: 'Venceu',
        date: '17/09/2021'
    },
    {
        username: 'Jogador 1',
        dimension: '8x8',
        bombs: 8,
        model: 'Clássica',
        time: 655,
        result: 'Venceu',
        date: '17/09/2021'
    },
    {
        username: 'Jogador 1',
        dimension: '8x8',
        bombs: 8,
        model: 'Clássica',
        time: 777,
        result: 'Perdeu',
        date: '17/09/2021'
    },
    {
        username: 'Jogador 1',
        dimension: '8x8',
        bombs: 8,
        model: 'Rivotril',
        time: 987,
        result: 'Perdeu',
        date: '17/09/2021'
    },
    {
        username: 'Jogador 1',
        dimension: '7x7',
        bombs: 9,
        model: 'Rivotril',
        time: 400,
        result: 'Venceu',
        date: '17/09/2021'
    }]
}











