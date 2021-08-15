function gerarCampo(){
    let bomb = document.getElementById("bomb").value;
    let linhas = document.getElementById("linhas").value;
    let colunas = document.getElementById("colunas").value;

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
            for(let j = 0; j < colunas; j++){
                const novaColuna = document.createElement("td");
                novaColuna.classList.add("area");
                novaLinha.appendChild(novaColuna);
            }
            campo.appendChild(novaLinha);
            
        }

    }

}

