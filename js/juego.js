var nombreUsuario = prompt('¡Hola! ¿Cuál es tu nombre?');

// Representación de la grilla a través de una variable que es un array de array. Cada nro representa a una pieza.
// El 9 es la posición vacía
var grilla = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

//Vamos a ir guardando la posición vacía.
//La variable guarda la fila y la columna de la pieza que se encuentra vacia.
//Esto es un objeto
var posicionVacia = {
  fila:2,
  columna:2
};

// FUNCION: CHEQUEAR SI EL ROMPECABEZAS ESTÁ EN LA POSICIÓN CORRECTA.

//COMENTARIO: respecto de esta función al principio intenté probando tres planteos distintos:
//1) con un for anidado:
/*for (var i = 0; i<grilla.length; i++) {
for (var j = 0; j<grilla.length; j++) {
var actual = grilla[i][j];
if (actual == grillaGanadora[i][j]) {
return true;*/
//Problema: Pero bastaba con que una sola de las piezas estuviera en el lugar correcto para que saliera el cartel, y no dejaba de aparecer.
//2) con un while dentro del for anidado, pero tampoco resultó. El cartel nunca salió.
/*for (var i = 0; i<grilla.length; i++) {
for (var j = 0; j<grilla.length; j++) {
var actual = grilla[i][j];
while (actual !== grillaGanadora[i][j]) {
return false;*/
//3) también probé comparar directamente la grilla con un grillaOrdenada o Ganadora. Tampoco resultó.

function chequearSiGano(){
  return grillaOrdenada();
}

function grillaOrdenada(){
  // guardo la cantidad de filas de la grilla en una variable
  var cantidadFilas = grilla.length;
  var cantidadColumnas = grilla[0].length;

  // En esta variable vamos a guardar el ultimo valor visto en la grilla
  var ultimoValorVisto = 0;
  var valorActual = 0;
  // recorro cada fila columna por columna chequeando el orden de sus elementos
  for(var fila=0; fila < cantidadFilas; fila++){
    for(var columna=0; columna < cantidadColumnas; columna++){
      valorActual = grilla[fila][columna]
      // si el valorActual es menor al ultimoValorVisto entonces no est&aacute; ordenada
      if(valorActual < ultimoValorVisto) return false;

      // actualizamos el valor del ultimoValorVisto
      ultimoValorVisto = valorActual;
    }
  }
  // si llegamos hasta aca; quiere decir que esta ordenada
  return true;
}


//FUNCION: MOSTRAR CARTEL GANADOR CUANDO LA GRILLA ESTÉ ORDENADA.
function mostrarCartelGanador() {
  var rtdoDeChequearSiGano = chequearSiGano();
  if (rtdoDeChequearSiGano == true) {
    alert ('Felicitaciones '+nombreUsuario+' ¡Ganaste!');
  }
}



//INTERCAMBIAR POSICIONES EN LA GRILLA Y EN EL DOM
//La función se plantea en dos partes: por un lado hago el intercambio en la grilla.

function intercambiarPosiciones(fila1, columna1, fila2, columna2){
  //fila2,columna2 es lo que esta definido como pieza vacia = pieza 9
  //fila1, columna1 es la pieza 5
  var pieza1 = grilla[fila1][columna1];
  var pieza2 = grilla[fila2][columna2];

  grilla[fila1][columna1] = pieza2;
  grilla[fila2][columna2] = pieza1;

  //Luego hago el intercambio en el DOM
  // Recordar que el juego es el parent Node y las piezas son los child nodes.

  var elemento1 = document.getElementById('pieza'+pieza1);
  var elemento2 = document.getElementById('pieza'+pieza2);
  //En la linea anterior: para reconocer el Id de la pieza coloco "parte" del Id
  //pero sin el nº y sí agrego la pieza de la que necesito elelemento del DOM.

  var padre = elemento1.parentNode;

  var clonDelElemento1 = elemento1.cloneNode(true);
  var clonDelElemento2 = elemento2.cloneNode(true);

  padre.replaceChild(clonDelElemento2,elemento1);
  padre.replaceChild(clonDelElemento1,elemento2);
}


// FUNCIÓN: ACTUALIZAR LA POSICION DE LA PIEZA VACIA
function actualizarPosicionVacia(nuevaFila,nuevaColumna){
  posicionVacia.fila = nuevaFila;
  posicionVacia.columna = nuevaColumna;
}


//FUNCION: CHEQUEAR SI LA POSICION ESTÁ DENTRO DE LA GRILLA.
function posicionValida(fila, columna){
  return (fila>=0 && fila <= 2) && (columna >=0 && columna <=2 )
}


//FUNCION: REALIZA EL MOVIMIENTO DE FICHAS.
// En este caso la que se mueve es la blanca (la vacia) intercambiando
// su posición con otro elemento.
function moverEnDireccion(direccion){
  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;

  // Intercambia pieza blanca con la pieza que está arriba suyo
  if(direccion == 40){
    nuevaFilaPiezaVacia = posicionVacia.fila-1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;
  }
  // Intercambia pieza blanca con la pieza que está abajo suyo
  else if (direccion == 38) {
    nuevaFilaPiezaVacia = posicionVacia.fila+1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;
  }
  // Intercambia pieza blanca con la pieza que está a su izq
  else if (direccion == 39) {
    nuevaFilaPiezaVacia = posicionVacia.fila;
    nuevaColumnaPiezaVacia = posicionVacia.columna-1;
  }
  // Intercambia pieza blanca con la pieza que está a su der
  else if (direccion == 37) {
    nuevaFilaPiezaVacia = posicionVacia.fila;
    nuevaColumnaPiezaVacia = posicionVacia.columna+1;
  }

  // Se chequea si la nueva posición es válida, si lo es, se intercambia
  if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)){
    intercambiarPosiciones(posicionVacia.fila, posicionVacia.columna,
      nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
      actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
    }

  }


  // EXTRAS, ya vienen dadas

  function mezclarPiezas(veces){
    if(veces<=0){return;}
    var direcciones = [40, 38, 39, 37];
    //40=arriba, 38=abajo, 39= izq. y 37=der.
    var direccion = direcciones[Math.floor(Math.random()*direcciones.length)];
    moverEnDireccion(direccion);

    setTimeout(function(){
      mezclarPiezas(veces-1);
    },100);
  }

  function capturarTeclas(){
    document.body.onkeydown = (function(evento) {
      if(evento.which == 40 || evento.which == 38 || evento.which == 39 || evento.which == 37){
        moverEnDireccion(evento.which);

        var gano = chequearSiGano();
        if(gano){
          setTimeout(function(){
            mostrarCartelGanador();
          },500);
        }
        evento.preventDefault();
      }
    })
  }

  function iniciar(){
    mezclarPiezas(60);
    capturarTeclas();
  }


  iniciar();
