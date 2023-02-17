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

function calculoMesAMostrar(clickBackBtn, clickNextBtn){
    //console.log('llegue')
    let fecha = DateTime.now()

    if (!clickBackBtn & !clickNextBtn) {
        localStorage.setItem("fecha", JSON.stringify(fecha.c.month))
    } else {
        let newMonth = JSON.parse(localStorage.getItem("fecha"))
        //gitconsole.log(newMonth)
        if (clickBackBtn) {
            newMonth--
            localStorage.setItem("fecha", JSON.stringify(newMonth))
            //console.log(newMonth)
            fecha.c.month = newMonth
        } else {
            newMonth++
            localStorage.setItem("fecha", JSON.stringify(newMonth))
            //console.log(newMonth)
            fecha.c.month = newMonth
        }
        //fecha.c.month = newMonth
        //calendar(fecha)
        //console.log(newMonth)
    }

    calendar (fecha)

}

function calendar (date){
    //  ESTA FUNCION DIBUJA EL MES QUE SE DESEA VISUALIZAR
    //console.log(date.setLocale('sp'))
    //let mesMin = date.setLocale('es-ES').toFormat('MMMM') //Obtenemos el mes nombre del mes actual en español
    //console.log(DateTime.local(2023,3).setLocale('es-ES').toFormat('MMMM'))
    let mesMin = DateTime.local(date.c.year,date.c.month).setLocale('es-ES').toFormat('MMMM')
    let mes = mesMin.charAt(0).toUpperCase()+mesMin.slice(1)     //Le hacemos mayuscula la primer letra
    const dias = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado']
    fecha = (date.year).toString() + "-" + (date.month).toString() + "-01 00:00:01" //Primer dia del mes actual
    //Fecha en formato "2022-06-01 00:05:05"
    nombreDia = dias[new Date (fecha).getDay()]                 //Obtengo el nombre del primer día del mes 
    firstDay = dias.indexOf(nombreDia) + 1
    let cantDiasMes = new Date(date.year, date.month, 0).getDate() // Con esto obtenemos la cant de dias del mes actual
    let diasHTML = ``
    for (i=1;i<cantDiasMes+1;i++) i == 1 ? diasHTML += `<li class="firstDay day">${i}</li>` : diasHTML += `<li class="day">${i}</li>`
    let sectionCalendarHTML = `
    <div class="d-flex justify-content-between ">
        <div class="d-flex align-items-center " style="padding-left:10px">
            <button type="button" class="btn btn-outline-light" id="btnBack"> &#11164 </button>
        </div>
        <h2 class="tituloCal">${mes} ${date.year}</h2>
        <div class="d-flex align-items-center" style="padding-right:10px">
            <button type="button" class="btn btn-outline-light" id="btnNext"> &#11166 </button>
        </div>
    </div>  
    <ol>
        <li class="dayName">Dom</li>
        <li class="dayName">Lun</li>
        <li class="dayName">Mar</li>
        <li class="dayName">Mie</li>
        <li class="dayName">Jue</li>
        <li class="dayName">Vie</li>
        <li class="dayName">Sab</li>
    ` + diasHTML + `</ol> `
    document.querySelector(".calendar").innerHTML = sectionCalendarHTML
    document.querySelector(".firstDay").setAttribute('style',`grid-column-start: ${firstDay}`)
    
}

const DateTime = luxon.DateTime

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


if (document.getElementsByClassName("calendar")) calculoMesAMostrar(false, false)
let btnBack = document.getElementById("btnBack")
if (btnBack) btnBack.addEventListener("click", ()=> calculoMesAMostrar(true, false))
let btnNext = document.getElementById("btnNext")
if (btnNext) btnNext.addEventListener("click", ()=> calculoMesAMostrar(false, true))

// P E N D I E N T E S 
// Cuando se seleccione el mes actual en turnos.html y se quiera ir al mes anterior, agregar la clase disabled al botón para deshabilitar esta opción

