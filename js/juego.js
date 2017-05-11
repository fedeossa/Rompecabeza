// Representación de la grilla. Cada nro representa a una pieza.
// El 9 es la posición vacía
var grilla = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

var solucion = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

// Ac&aacute; vamos a ir guardando la posición vacía
var posicionVacia = {
  fila:2,
  columna:2
};

// Esta función va a chequear si el Rompecabezas est&aacute; en la posición ganadora
function chequearSiGano(){
  var posicionCorrecta = 1;
  for (var i = 0; i < grilla.length; i++) {
    for (var x = 0; x < grilla.length; x++) {
      if (grilla[i][x] == solucion[i][x]) {
      posicionCorrecta++;
    } else {return console.log("false");}
  }}
  if (posicionCorrecta = 10) {
    return true;
  } else { return false;}
}

// la hacen los alumnos, pueden mostrar el cartel como prefieran. Pero es importante que usen
// esta función
function mostrarCartelGanador(){
  if (chequearSiGano()) {
    alert("Ganaste")
  } else { return;}
}

// Intercambia posiciones grilla y en el DOM
function intercambiarPosiciones(fila1, columna1, fila2, columna2){
  var posicion1 = grilla[fila1][columna1];
  var posicion2 = grilla[fila2][columna2];
  //Grilla
  grilla[fila1][columna1] = posicion2;
  grilla[fila2][columna2] = posicion1;
  //DOM
  var imagen1 = document.getElementById(posicion1);
  var clonImagen1 = imagen1.cloneNode();
  
  var imagen2 = document.getElementById(posicion2);
  var clonImagen2 = imagen2.cloneNode();
  var padre = imagen1.parentNode;
  padre.replaceChild(clonImagen2, imagen1);
  padre = imagen2.parentNode;
  padre.replaceChild(clonImagen1, imagen2);
}

// Actualiza la posición de la pieza vacía
function actualizarPosicionVacia(nuevaFila,nuevaColumna){
  posicionVacia = { fila:nuevaFila, columna:nuevaColumna};
}


// Para chequear si la posicón está dentro de la grilla.
function posicionValida(fila, columna){
if ((fila  >=0 && fila <=2) && (columna >=0 && columna <=2)){
  return true;} else {
    //console.log(false)
    return false;}
}

// Movimiento de fichas, en este caso la que se mueve es la blanca intercambiando
// su posición con otro elemento
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
  } else {//console.log("no valido"); 
  return;}
}

// Extras, ya vienen dadas

function mezclarPiezas(veces){
  if(veces<=0){return;}
  var direcciones = [40, 38, 39, 37];
  var direccion = direcciones[Math.floor(Math.random()*direcciones.length)];
  moverEnDireccion(direccion);

  setTimeout(function(){
    mezclarPiezas(veces-1);
  },100);
}

function capturarTeclas(){
  document.body.onkeydown = (function(evento) {
    moverEnDireccion(evento.which);

    var gano = chequearSiGano();
    if(gano){
      setTimeout(function(){
        mostrarCartelGanador();  
      },500);
    } 
    evento.preventDefault();
  })
}

function iniciar(){
  mezclarPiezas(60);
  capturarTeclas();
}

iniciar();

//CHIMI

function changeDOM() {
  var imagenRompecabezas = [0,10,20,30,40,50,60,70];
  var elegido = imagenRompecabezas[Math.floor(Math.random()*imagenRompecabezas.length)];
  for (var i = 0; i < 8; i++) {
    document.getElementById(i+1).src="./images/"+(elegido + i )+".jpg";
  }
  document.getElementById("miniFoto").src="./images/"+(elegido + 9 )+".jpg";
}