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

    else{
        const campo = document.getElementById("table");
        campo.innerHTML = "";
        
        for(let i = 0; i< linhas; i++){
            const novaLinha = document.createElement("tr");
            matrizCampo[i] = new Array(colunas);

            for(let j = 0; j < colunas; j++){
                const novaColuna = document.createElement("td");
                novaColuna.classList.add("area");
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
                       matrizCampo[i][j].innerHTML = '<img id = "bombaArea" src="../images/bombear.png" alt="bomba">';
                       bombCounter++;

                   }
                }    
            }
        }

    }

}


