function gerarCampo(){
    const bomb = document.getElementById("bomb").value;
    let linhas = document.getElementById("linhas").value;
    let colunas = document.getElementById("colunas").value;
    let matrizCampo = [];
    let bombCounter = 0;

    // console.log("bomb"+bomb);
    // console.log("linhas"+linhas);
    // console.log("colunas"+colunas);

    if(!bomb || !colunas || !linhas){
        alert("Preencha todas as características do campo.");
    }

    else if(bomb<0 || colunas<0 || linhas <0){
        alert("Valores precisam ser positivos.");
    }

    else if(bomb > (colunas*linhas)-1){
        alert("Quantidade de bombas excede o numero de celulas.");
    }

    else{
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

    }

}

function revelarCampos(){
   
   const celula = event.target;
   let matrizCampo = [];
   let index = [];
   const campo = document.getElementById("table").children;

   if(celula.className.toString() === "areaBomba"){
    celula.children[0].className = "bombaArea";
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


}

function revelarRecursivo(matriz, index){
    console.log("entrei: "+ index);
    if(matriz[index[0]][index[1]].className.toString() === "areaBomba"){
        return;
    }
    
    else{
        let bombasPerto = 0;
        console.log("matrizTipoBefore: " + (matriz[index[0]][index[1]].className.toString() === "area"));
        matriz[index[0]][index[1]].className = "areaRevel";
        console.log("matrizTipo: " + matriz[index[0]][index[1]].className);

        for(let i = -1; i <= 1; i++){
            for(let j = -1; j <= 1; j++){
                
                if(index[0]+i >=0 && index[1]+j >= 0 && index[0]+i < matriz.length && index[1]+j < matriz[index[0]].length){
                    console.log(index[0]+i);
                    console.log(index[1]+j);
                    console.log("-----");
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