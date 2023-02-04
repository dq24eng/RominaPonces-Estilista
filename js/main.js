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
    constructor (nombre, codigo, precio, cant, carrito){
        this.nombre = nombre;
        this.codigo = codigo;
        this.precio = precio;
        this.cant = cant;       //Cantidad a comprar 
        this.carrito = carrito;
        
        let bntAñadir = document.getElementById(carrito)
        if (bntAñadir) bntAñadir.addEventListener("click", () => carritoCompras(carrito)) //Verificamos que exista el elemento
    }
}

function carritoCompras (numberCarrito){
    carrito++
    let cantProdCarrito = document.getElementById("carrito")
    cantProdCarrito.classList.remove("visually-hidden")  //Mostramos la cantidad de productos
    cantProdCarrito.innerText = carrito.toString()
    
    for (i=0;i<allProducts.length;i++) if (allProducts[i].carrito == numberCarrito) allProducts[i].cant++    
}

function carritoWeb(){
    if (carrito!=0){
        sessionStorage.setItem ('clickCarritoPage', true)   //El valor de clickCarritoPage no se guarda cuando cambia de pagina HTML, por esto se debe almacenar 
        clickCarrito.setAttribute('href', "./carrito.html")
        clickCarrito.removeEventListener("click", carritoWeb, true) //Elimino el evento de escucha 
    }
    let carritoProducts = allProducts.filter((el) => el.cant >0) //Se crea nuevo arreglo con elementos a comprar 
    let carritoProductsJSON = JSON.stringify(carritoProducts)
    sessionStorage.setItem ("carritoProducts", carritoProductsJSON)
}  

let producto1 = new Producto ("Aceite de Cuidado 100 ml ABC","ACEI100",2500,0,"producto1")
let producto2 = new Producto ("Laca de Fijacion Fuerte 300ml ABC","LAFI300",3900,0,"producto2")
let producto3 = new Producto ("Polvo en spray 12g ABC","POLSP12",6300,0,"producto3")
let producto4 = new Producto ("Primer Spray 250ml ABC","SPRY250",4550,0,"producto4")

//Nota: la idea es en el futuro crear una pagina html extra para que el usuario propietario de la misma pueda ingresar nuevos productos
//desde la página, cambiar su precio o eliminarlos, así se evita hacer esto desde el código

let allProducts = [producto1, producto2, producto3, producto4] //Array de objetos
let carrito = 0
sessionStorage.setItem ('clickCarritoPage', false)
let clickCarrito = document.getElementById("btnCarrito")
if (clickCarrito) clickCarrito.addEventListener("click", carritoWeb)  //Verificamos que exista el elemento, de lo contrario otros HTML  tiran error
