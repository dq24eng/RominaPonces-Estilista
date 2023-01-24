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

class Producto{                 
    constructor (nombre, codigo, precio, cant){
        this.nombre = nombre;
        this.codigo = codigo;
        this.precio = precio;
        this.cant = cant        //Cantidad a comprar 
    }
}

let producto1 = new Producto ("Aceite de Cuidado 100 ml ABC","ACEI100",2500,0)
let producto2 = new Producto ("Laca de Fijacion Fuerte 300ml ABC","LAFI300",3900,0)
let producto3 = new Producto ("Polvo en spray 12g ABC","POLSP12",6300,0)
let producto4 = new Producto ("Primer Spray 250ml ABC","SPRY250",4550,0)

//Nota: la idea es en el futuro crear una pagina html extra para que el usuario propietario de la misma pueda ingresar nuevos productos
//desde la página, cambiar su precio o eliminarlos, así se evita hacer esto desde el código

let allProducts = [producto1, producto2, producto3, producto4] //Array de objetos

function validacionNumero (){
    let cantidad = prompt ("Ingrese la cantidad de productos: ")
    while (isNaN(cantidad)){
        cantidad = prompt ("Ingrese una cantidad válida: ")
    }
    return parseInt(cantidad)
}

function aPagar(){
    let total = 0
    for (j=0;j<allProducts.length;j++){
        if (allProducts[j].cant != 0) total += allProducts[j].cant * allProducts[j].precio
    }
    return total*1.21
}

function validacionCod (cantidad){
    for (i=0;i<cantidad;i++) {
        foundCode = false
        codigo = prompt ("Por favor, ingrese el código del " + (i+1) + "º producto que desea comprar: ")
        for (const prop of allProducts){
            if (prop.codigo == codigo) {
                foundCode = true;
                prop.cant += validacionNumero()
            }
        }
        if (!foundCode) {
            i--
            alert ("Ingrese un código valido")
        }
    }
    return aPagar()
}

alert ("Bienvenido! Gracias visitar nuestra tienda")
cantProd = validacionNumero()
let total = validacionCod(cantProd)
alert ("El total a Pagar es: $" + total)




