function main(){

    let processos = getDado();
    let tempos

    if(document.getElementById('fifo').checked){
        tempos = fifo(processos);
        console.log(tempos)
    }
    else{
        tempos = sjf(processos)
    }

    let resultado = media(processos, tempos)
    setDados(resultado)
}

function getDado(){
    let dados = [[]];
    for(let i=0; i<5; i++){
        let ucp = Number(document.getElementById('ucp' + (i+1)).value);
        let criacao = Number(document.getElementById('criacao' + (i+1)).value);
        dados[i] = [ucp, criacao];
    }
    return dados;
}

function ordenar(dados, termo){
    for(let i=0; i<4; i++){
        for(let j=i+1; j<5; j++){
            if(dados[i][termo]>dados[j][termo]){
                let aux = dados[j];
                dados[j] = dados[i];
                dados[i] = aux; 
            }
        }
    }
    return dados;
}

function fifo(dados){
    dados = ordenar(dados, 1); 
    let ct = [[]];
    let contador = 0;
    for(let i=0; i<5; i++){
        let inicio = contador;
        contador += dados[i][0];
        let fim = contador;
        ct[i] = [inicio, fim];
    }
    return ct;
}

function media(processos, tempos){
    let tme = 0;
    let tmp = 0;
    
    for(let i=0; i<5; i++){
        tme += tempos[i][0] - processos[i][1]
        tmp += tempos[i][1] - processos[i][1]
    }
    
    tme /= 5;
    tmp /= 5;
    
    return [tme, tmp]
}

function setDados(dados){
    document.getElementById('resultado').innerText = "Resultado: ";
    document.getElementById('tme').innerText = "TME = " + dados[0];
    document.getElementById('tmp').innerText = "TMP = " + dados[1];
}

function sjf(dados){
    let arrayAux = dados.slice()
    let tempo = 0
    let ct = []

    //ordenar por ucp
    ordenar(arrayAux, 0)
    
    while(arrayAux.length>0){
        let aux = -1
        for(let i=0; i<arrayAux.length; i++){
            if(arrayAux[i][1] <= tempo){
                aux = arrayAux[i][0]
                arrayAux.splice(i,1)
                break
            }
        }

        // aux [] que vai ser calculada

        if(aux != -1){
            let inicio = tempo
            tempo += aux
            let fim = tempo
            ct.push([inicio, fim])
        }
        else{
            tempo++
        }
    }

    return ct
}