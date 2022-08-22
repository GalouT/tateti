const SIMBOLO_JUGADOR_X = "X"
const SIMBOLO_JUGADOR_O = "O"
const SIMBOLO_CASILLA_VACIA = "-"

let tableroTaTeTi = [
    [SIMBOLO_CASILLA_VACIA,SIMBOLO_CASILLA_VACIA,SIMBOLO_CASILLA_VACIA],
    [SIMBOLO_CASILLA_VACIA,SIMBOLO_CASILLA_VACIA,SIMBOLO_CASILLA_VACIA],
    [SIMBOLO_CASILLA_VACIA,SIMBOLO_CASILLA_VACIA,SIMBOLO_CASILLA_VACIA],
]

let turno = SIMBOLO_JUGADOR_X
let contadorDeJugadas = 0
let elJuegoNoSeTermino = true


function arrayCompuestoSoloPorUnSimbolo(tablero,i){
    return tablero[i][0] == tablero[i][1] && tablero[i][1] == tablero[i][2]
}

function arrayNoContieneElSimboloDeUnaCasillaVacia(tablero,i){
    return tablero[i][0] != SIMBOLO_CASILLA_VACIA && tablero[i][1] != SIMBOLO_CASILLA_VACIA && tablero[i][2] != SIMBOLO_CASILLA_VACIA
}


function controlarFilas(tablero){

    let estanTodasLasFilasCompuestasPorDistintosSimbolos = false

    for(let i = 0;i < tablero.length;i++){
       if(arrayCompuestoSoloPorUnSimbolo(tablero,i) && arrayNoContieneElSimboloDeUnaCasillaVacia(tablero,i)){
        estanTodasLasFilasCompuestasPorDistintosSimbolos = true
       }
}
    return estanTodasLasFilasCompuestasPorDistintosSimbolos
}





function columnaCompuetaPorUnSoloSimbolo(tablero, j){
    return tablero[0][j] == tablero[1][j] && tablero[0][j] == tablero[2][j]
}

function columnaNoContieneElSimboloDeUnaCasillaVacia(tablero, j){
    return tablero[0][j] != SIMBOLO_CASILLA_VACIA && tablero[1][j] != SIMBOLO_CASILLA_VACIA && tablero[2][j] != SIMBOLO_CASILLA_VACIA
}


function controlarColumnas(tablero){

    let estanTodasLasColumnasCompuestasPorDistintosSimbolos = false

    for(let j = 0;j < tablero.length;j++){
       if(columnaCompuetaPorUnSoloSimbolo(tablero,j)&& columnaNoContieneElSimboloDeUnaCasillaVacia(tablero,j)){
        estanTodasLasColumnasCompuestasPorDistintosSimbolos = true
       }
}
    return estanTodasLasColumnasCompuestasPorDistintosSimbolos
}



function controlarDiagonales(tablero){
    let estanTodasLasDiagonalesCompuestasPorDistintosSimbolos = false

    if(tablero[0][0] == tablero[1][1] && tablero[0][0] == tablero[2][2] && tablero[0][0] != SIMBOLO_CASILLA_VACIA & tablero[1][1] != SIMBOLO_CASILLA_VACIA && tablero[2][2] != SIMBOLO_CASILLA_VACIA){
        estanTodasLasDiagonalesCompuestasPorDistintosSimbolos = true
    }

    if(tablero[0][2] == tablero[1][1] && tablero[0][2] == tablero[2][0] && tablero[0][2] != SIMBOLO_CASILLA_VACIA & tablero[1][1] != SIMBOLO_CASILLA_VACIA && tablero[2][0] != SIMBOLO_CASILLA_VACIA){
        estanTodasLasDiagonalesCompuestasPorDistintosSimbolos = true
    }

    
    return estanTodasLasDiagonalesCompuestasPorDistintosSimbolos
}




function elJuegoEstaTerminado(tablero){
     //Devuevle true si alguno de los dos jugadores logro hacer 3 en linea.
    return controlarFilas(tablero) || controlarColumnas(tablero) || controlarDiagonales(tablero)
}

function pasarDeTurnoDeJugador(){
    if(turno == SIMBOLO_JUGADOR_X){
        turno = SIMBOLO_JUGADOR_O
    }else{
        turno = SIMBOLO_JUGADOR_X
    }
}

function escribirJugada(x,y){
    if(tableroTaTeTi[x][y] === SIMBOLO_CASILLA_VACIA){
        tableroTaTeTi[x][y] = turno
        pasarDeTurnoDeJugador() // solo paso de turno si la jugada se pudo hacer

        // tomo nota de la cantidad de jugadas realizadas durante la partida
        contadorDeJugadas++

    }else{
        console.log("ya se jugó en esa posición")
    }
}


function quienFueElUltimoEnJugar(){
    let ultimoEnJugar = SIMBOLO_CASILLA_VACIA
    if(turno == SIMBOLO_JUGADOR_X){
        ultimoEnJugar = SIMBOLO_JUGADOR_O
    }else{
        ultimoEnJugar = SIMBOLO_JUGADOR_X
    }
    return ultimoEnJugar
}


function play(x,y){
    escribirJugada(x,y)

    if(elJuegoEstaTerminado(tableroTaTeTi)){
        let jugadorGanador = quienFueElUltimoEnJugar()
        //console.log(`se termino el juego, gano ${jugadorGanador}`)
        alert(`se terminó el juego, ganó ${jugadorGanador}`)

        elJuegoNoSeTermino = false
    }else if(contadorDeJugadas == 9){
        //console.log("EMPATE")
        alert("EMPATE!")
        elJuegoNoSeTermino = false
    }
    console.log(elJuegoEstaTerminado(tableroTaTeTi))
    console.table(tableroTaTeTi)
}



function cargarJuego(){
    let listaDeCasillas = document.querySelectorAll("article section")
    for(let i = 0; i < listaDeCasillas.length; i ++){
        listaDeCasillas[i].addEventListener("click", function(event)
        {
            // el elemento cliqueado por el usuario
            let elCliqueado = event.target
            // puedo sacar la posicion correspondiente
            let x = elCliqueado.getAttribute("data-x")
            let y = elCliqueado.getAttribute("data-y")


            if(elJuegoNoSeTermino == true){
                play(x,y)
                elCliqueado.innerHTML = quienFueElUltimoEnJugar()
            }else{
                cargarJuego(listaDeCasillas)
            }

    
        })
    }

}

