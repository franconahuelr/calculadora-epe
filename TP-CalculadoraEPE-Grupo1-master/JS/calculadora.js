//Variables

const form = document.getElementById('form');
const error = document.getElementById('errores');
const costoDeServicio = 102;
var cantidadKwh = document.getElementById('kwh-mes');
var domicilio = document.getElementById('selec-domicilio');
var usuario = document.getElementById('selec-usuario');
var resultado = 0;
document.getElementById("selec-usuario").onchange = function () { selecUsuario() };
document.getElementById("selec-domicilio").onchange = function () { selecDomicilio() };


//Evento al formulario, al boton tipo submit con la arrow function le doy las siguientes instrucciones

form.addEventListener('submit', (e) => {

    let mensajes = []; //Creo array para almacenar todos los mensajes de error
    limpiarResultado();  //Elimina el resultado 
    if (domicilio.value == "0") {
        mensajes.push('*Seleccione la Zona de su domicilio para continuar'); //Aplico el metodo push para cada mensaje
    }
    if (usuario.value == "0") {
        mensajes.push('*Seleccione un Tipo de Usuario para continuar');
    }
    if (cantidadKwh.value <= 0 || cantidadKwh.value == null) {     
        mensajes.push('*Cantidad de kWh incorrecto (tiene que ser un número positivo).');
    }

    if (mensajes.length > 0) {
        e.preventDefault();
        error.innerText = mensajes.join('.  \n'); //Si el arrar tiene longitud, va a mosrar cada mensaje
    }
    else {
        e.preventDefault();
        error.innerText = "";
        calculo(); //Sino aplica la funcion calculo
    }
})

function selecDomicilio() {
    var domicilioSeleccionado = domicilio.value;
    var valorDom = 0;
    switch (domicilioSeleccionado) { //Hago un switch a los values de cada option

        case "1":
            valorDom = 5.80;
            break;
        case "2":
            valorDom = 5.40;
            break;
        case "3":
            valorDom = 5.35;
            break;
        case "4":
            valorDom = 5.60;
            break;

    }
    console.log(valorDom); //Un console log para verificar el cambio
    return valorDom; //Retorno el valor que selecciona
}
function selecUsuario() {
    var usuarioSeleccionado = usuario.value;
    var iva = 0;
    switch (usuarioSeleccionado) {

        case "1":
            iva = 0.21;
            break;
        case "2":
            iva = 0.27;
            break;
    }
    console.log(iva);
    return iva;
}

function limpiarResultado() {
    document.getElementById('resultado').innerText = '';
}


function calculo() { //Funcion calculo
    resultado = costoDeServicio + cantidadKwh.value * selecDomicilio() * (1 + selecUsuario());
    document.getElementById('resultado').innerText = `Su costo es $ ${resultado.toFixed(2)}`;
    //alert(resultado);
}
