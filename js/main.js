/*function validacionFormCont () {

    let nombreIngresado = document.getElementById('nombre').value           //Obtengo el nombre ingresado
    if (nombreIngresado=="" || nombreIngresado==null) { 
        alert('Por favor, ingrese un nombre válido')
    } 
    let apellidoIngresado = document.getElementById('apellido').value      //Obtengo el apellido ingresado
    if (apellidoIngresado=="" || apellidoIngresado==null) {
        alert('Por favor, ingrese un apellido válido')
    } 
    let numeroTel = parseInt(document.getElementById('telefono').value)     //Parseo numero de telefono a Int
    if (isNaN(numeroTel) || numeroTel.toString().length!=10 ){   
        // Valido que el numero de telefono ingresado sea un numero y que tenga 10 caracteres           
        alert('Por favor, ingrese un número de telefono válido')
    }

}*/

function validacionNumero (){
    let cantidad = prompt ("Ingrese la cantidad de productos: ")
    while (isNaN(cantidad)){
        cantidad = prompt ("Ingrese una cantidad válida: ")
    }
    return parseInt(cantidad)
}

function validacionCod (cantidad){

    let codInvalido = false
    for (i=0;i<cantidad;i++){
        codInvalido = false
        codigo = prompt ("Por favor, ingrese el código del " + (i+1) + "º producto que desea comprar: ")
            switch (codigo) {
                case "ACEI100":
                    Prod1 = Prod1 + validacionNumero () //Esto es por si el usuario ingresa 2 o más veces el mismo código de producto
                    break
                case "LAFI300":
                    Prod2 = Prod2 + validacionNumero ()
                    break
                case "POLSP12":
                    Prod3 = Prod3 + validacionNumero ()
                    break
                case "SPRY250":
                    Prod4 = Prod4 + validacionNumero ()
                    break
                default:
                    codInvalido = true
                    alert ("Ingrese un código valido")
            }
            if (codInvalido) i--
    }   

    let aPagar = Prod1*PrecioProd1 + Prod2*PrecioProd2 + Prod3*PrecioProd3 + Prod4*PrecioProd4
    return aPagar
}

let cantProd = 0
let Prod1 = 0 //ACEI100
let Prod2 = 0 //LAFI300
let Prod3 = 0 //POLSP12
let Prod4 = 0 //SPRY250
let PrecioProd1 = 2500 //La idea es en el futuro tomar el precio y los códigos de una base de datos 
let PrecioProd2 = 3900
let PrecioProd3 = 6300
let PrecioProd4 = 4550


alert ("Bienvenido! Gracias visitar nuestra tienda")
cantProd = validacionNumero()
let total = validacionCod(cantProd)
alert ("El total a Pagar es: $" + total)