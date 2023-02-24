class Producto{                 
    constructor (nombre, codigo, precio, cant, carrito, descripcion){
        this.nombre = nombre;   //Nombre del producto
        this.codigo = codigo;   //Codigo del producto
        this.precio = precio;   //Precio del producto
        this.cant = cant;       //Cantidad a comprar, se va sumando con cada click
        this.carrito = carrito; //Este parametro sirve para identificar cada producto en el boton de agregar prods al carrito
        this.descripcion = descripcion;
    }
}

function createProductos (listadoProductos){
    //Esta funcion crea productos en el HTML Tienda luego de recopilarlos del archivo JSON
    for (const producto of allProducts) {
        listadoProductos.innerHTML += `
            <div class="col ">
                <div class="card" style= "background-color: transparent !important;" >
                    <img src="../imagenes/tienda/${producto.carrito}.jpg" class="card-img-top" alt="Producto 1" height="240" width="80">
                    <div class="card-body justify-content-center">
                        <h5 class="card-title text-center fs-5">${producto.nombre}</h5>
                        <p class="card-text text-center fs-5"> $${producto.precio} </p>
                        <p class="card-text text-center fs-6">${producto.descripcion}</p>
                        <p class="card-text text-center fs-6"> Cod. ${producto.codigo} </p>
                        <div class="d-flex justify-content-center">
                            <button class="text-center fs-6 w-50 btns-agregar" id="${producto.carrito}">Agregar al carrito</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

function carritoCompras (numberCarrito){
    //Esta funcion es la encargada aumentar la cantidad de un producto a comprar cuando se da click en el boton de agregar al carrito
    carrito++
    let cantProdCarrito = document.getElementById("carrito")
    cantProdCarrito.classList.remove("visually-hidden")  //Mostramos la cantidad de productos
    cantProdCarrito.innerText = carrito.toString()
    for (i=0;i<allProducts.length;i++) if (allProducts[i].carrito == numberCarrito) allProducts[i].cant++    
}

function carritoWeb(){
    //Esta funcion se ejecuta cuando se le da click al carrito
    if (carrito!=0){
        localStorage.setItem ('clickCarritoPage', true)             //El valor de clickCarritoPage no se guarda cuando cambia de pagina HTML, por esto se debe almacenar 
        clickCarrito.setAttribute('href', "./carrito.html")
        clickCarrito.removeEventListener("click", carritoWeb, true) //Elimino el evento de escucha 
    }
    let carritoProducts = allProducts.filter((el) => el.cant >0)    //Se crea nuevo arreglo con elementos a comprar 
    let carritoProductsJSON = JSON.stringify(carritoProducts)       //Pasamos a JSON el array de productos del carrito
    localStorage.setItem ("carritoProducts", carritoProductsJSON)   //Almacenamos el array de productos del carrito
}  

function calculoMesAMostrar(clickBackBtn, clickNextBtn){

    // La presente funcion tiene por finalidad mostrar el mes actual y los dos meses siguientes por si el usuario desea sacar 
    // un turno para esa fecha, no muestra el mes anterior al mes actual (imposible sacar turno) y tampoco de 3 meses en adelante 
    // siguientes al mes actual

    let fecha = DateTime.now()
    let disabledBackOption = false
    let disabledNextOption = false

    if (!clickBackBtn & !clickNextBtn) {                                //Se ejecuta si no se presionó ningun boton del calendario
        localStorage.setItem("fecha", JSON.stringify(fecha.c.month))   
        localStorage.setItem("ano", JSON.stringify(fecha.c.year))
        disabledBackOption = true                                       //Anulo la posibilidad de ir mes hacia atrás
    } else {                                                            //Si se presionó algún boton entra en else
        let newMonth = JSON.parse(localStorage.getItem("fecha"))
        if (clickBackBtn) {                                             //Si quiero ir un mes atrás entra
            newMonth--
            if (newMonth<1) {                                           //Si quiero ir a un mes con diferente año al actual
                newMonth = 12
                let newYear = JSON.parse(localStorage.getItem("ano")) - 1
                fecha.c.year = newYear
                localStorage.setItem("ano", JSON.stringify(newYear))
            }
            if ((DateTime.now().c.month -1) == newMonth) disabledBackOption = true
            localStorage.setItem("fecha", JSON.stringify(newMonth))
            fecha.c.month = newMonth
            fecha.c.year = JSON.parse(localStorage.getItem("ano"))
        } else {                                                        //clickNextBtn. Si quiero ir un mes adelante entra
            newMonth++
            if (newMonth>12) {
                newMonth = 1
                let newYear = JSON.parse(localStorage.getItem("ano")) + 1
                fecha.c.year = newYear
                localStorage.setItem("ano", JSON.stringify(newYear))
            }
            if ((DateTime.now().c.month +2) == newMonth) disabledNextOption = true
            localStorage.setItem("fecha", JSON.stringify(newMonth))
            fecha.c.month = newMonth
            fecha.c.year = JSON.parse(localStorage.getItem("ano"))
        }
    }

    if ((DateTime.now().c.month) == fecha.c.month) disabledBackOption = true
    calendar (fecha, disabledBackOption, disabledNextOption)

}

function calendar (date, disabledBackOption, disabledNextOption){
    // ESTA FUNCION DIBUJA EL MES QUE SE DESEA VISUALIZAR
    // Se excluye la posibilidad de sacar turnos los días Domingo y los días anteriores al actual presente

    let mesMin = DateTime.local(date.c.year,date.c.month).setLocale('es-ES').toFormat('MMMM')
    let mes = mesMin.charAt(0).toUpperCase()+mesMin.slice(1)     //Le hacemos mayuscula a la primer letra
    fecha = (date.year).toString() + "-" + (date.month).toString() + "-01 00:00:01" //Primer dia del mes actual
    //Fecha en formato "2022-06-01 00:05:05" 
    nombreDia = dias[new Date (fecha).getDay()]                 //Obtengo el nombre del primer día del mes 
    firstDay = dias.indexOf(nombreDia) + 1
    localStorage.setItem("firstDay", firstDay)
    let cantDiasMes = new Date(date.year, date.month, 0).getDate() // Con esto obtenemos la cant de dias del mes actual
    let diasHTML = ``
    for (i=1;i<cantDiasMes+1;i++){
        if (parseInt(localStorage.getItem("fecha")) == (DateTime.now().c.month)){ //Para dias anteriores al actual
            if ((DateTime.now().c.day <= i)&&(weekDay(i)!='Dom')) {
                i == 1 ? diasHTML += `<li class="firstDay day hoverClass">${i}</li>` : diasHTML += `<li class="day hoverClass">${i}</li>`
            } else {
                i == 1 ? diasHTML += `<li class="firstDay disabledDay">${i}</li>` 
                    : diasHTML += `<li class=" disabledDay">${i}</li>`
            }
        }
        if ((parseInt(localStorage.getItem("fecha")) > (DateTime.now().c.month))){
            if (weekDay(i)!='Dom'){
                i == 1 ? diasHTML += `<li class="firstDay day hoverClass">${i}</li>` : diasHTML += `<li class="day hoverClass">${i}</li>`
            } else {
                i == 1 ? diasHTML += `<li class="firstDay disabledDay">${i}</li>`: diasHTML += `<li class="disabledDay">${i}</li>`
            }
        } 
    }

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
    document.querySelector(".firstDay").setAttribute('style',`grid-column-start: ${firstDay} !important`)
    document.getElementById("btnBack").addEventListener("click", ()=> calculoMesAMostrar(true, false))
    document.getElementById("btnNext").addEventListener("click", ()=> calculoMesAMostrar(false, true))
    document.getElementById("btnBack").disabled = disabledBackOption
    document.getElementById("btnNext").disabled = disabledNextOption
    localStorage.setItem("value1Clicked", false)
    document.querySelectorAll(".day").forEach(el => el.addEventListener("click", days ))
}

function days(e){
    // Esta funcion pinta el día al que se le dió click
    let btnClicked = e.target
    document.querySelectorAll(".day").forEach(el => {el.removeAttribute("style")})
    document.querySelector(".firstDay").setAttribute('style',`grid-column-start: ${localStorage.getItem("firstDay")} !important`)
    btnClicked.style.background = 'rgba(95, 201, 205, 0.634)'
    selectHours(btnClicked.textContent)
    
}   

function selectHours (day){
    // Esta funcion modifica el Select del formulario en base a los horarios disponibles del día seleccionado 
    let selectHTML = `<option value="0" disabled selected>Seleccione una fecha...</option>`
    let weekDayToM = weekDay(day)
    if (weekDayToM != 'Dom') for (let i= 10; i < 19; i++) selectHTML += 
        `<option value="${i}">${weekDayToM} ${day}/${localStorage.getItem("fecha")} - ${i}:00 am</option>`
    document.getElementById("horario").innerHTML = selectHTML
    localStorage.setItem("selectedDay", day)
}

function weekDay (day){
    // Esta funcion devuelve el nombre del día seleccionado, por ejemplo si se seleccionó 23/02/2023 devuelve 'Jueves'
    // Se crea esta funcion aparte por ser acciones repetitivas en algunas partes del codigo. 
    let weekDay = DateTime.local(parseInt(localStorage.getItem("ano")),parseInt(localStorage.getItem("fecha")),parseInt(day)).weekdayShort
    let weekDayToM = weekDay.charAt(0).toUpperCase()+weekDay.slice(1)
    return weekDayToM
}

function validacionFormTurnos () {
    //Validacion de los datos ingresados en el Formulario de turnos
    let validation = 0

    let nombreIngresado = document.getElementById('nya').value           
    if (nombreIngresado=="" || nombreIngresado==null) { 
        document.querySelector(".nameTurnos").setAttribute("style", "color: rgb(215, 0, 0)")
        validation++
    } else { document.querySelector(".nameTurnos").setAttribute("style", "color: rgba(255,255,255,0)") }
    let apellidoIngresado = document.getElementById('apellido').value      
    if (apellidoIngresado=="" || apellidoIngresado==null) {
        document.querySelector(".apellidoTurnos").setAttribute("style", "color: rgb(215, 0, 0)")
        validation++
    } else { document.querySelector(".apellidoTurnos").setAttribute("style", "color: rgba(255,255,255,0)") }
    let numeroTel = parseInt(document.getElementById('telefono').value)     
    if (isNaN(numeroTel) || numeroTel.toString().length!=10 ){   
        document.querySelector(".telefonoTurnos").setAttribute("style", "color: rgb(215, 0, 0)")
        validation++
    } else { document.querySelector(".telefonoTurnos").setAttribute("style", "color: rgba(255,255,255,0)") }
    let servicio = document.getElementById('servicio')
    if (servicio.value=="0") {
        document.querySelector(".servicioTurnos").setAttribute("style", "color: rgb(215, 0, 0)")
        validation++
    } else { document.querySelector(".servicioTurnos").setAttribute("style", "color: rgba(255,255,255,0)") }
    let hours = document.getElementById('horario')
    if (hours.value=="0") {
        document.querySelector(".calendarTurnos").setAttribute("style", "color: rgb(215, 0, 0)")
        validation++
    } else { document.querySelector(".calendarTurnos").setAttribute("style", "color: rgba(255,255,255,0)") }

    const diasAbr= ['Dom','Lun','Mar','Mié','Jue','Vier','Sáb']     //Array de nombre dias abreviados
    let dayMinus = dias[diasAbr.indexOf(weekDay (localStorage.getItem("selectedDay")))]

    if (validation>0) {
        Toastify({
            text: "Por favor, complete los campos faltantes",
            duration: 5000,
            close: true,
            gravity: "top", 
            position: "right", 
            stopOnFocus: true,      
            backgroundColor: "linear-gradient(to right, #992420, #9B0101)",
            style: { background: "linear-gradient(to right, #992424, #9B0101)",},
        }).showToast();
    } else {
        Swal.fire({
            title: 'Tu turno fue reservado!',
            text:`${nombreIngresado}, te esperamos el ${dayMinus.charAt(0).toUpperCase()+dayMinus.slice(1)} ${localStorage.getItem("selectedDay")}/${localStorage.getItem("fecha")} a las ${hours.value} hs`,
            color: 'white',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Volver al inicio',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__bounceOutUp'
            }
        }).then((result) => {
            if ((result.isConfirmed) || (result.isDismissed)) window.location = "../index.html" //Dando click en el boton o escape siempre retornará al inicio de la Web
        })
    }

    //Lo que resta hacer es anular la posibilidad de sacar un turno en el horario donde ya se reservó un turno. 

}

const DateTime = luxon.DateTime
const dias = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado']

/*let producto1 = new Producto ("Aceite de Cuidado 100 ml ABC","ACEI100",2500,0,"producto1",
    "Aceite ligero que se esparce fácilmente sin dejar grasoso. Reduce el frizz, sella las puntas abiertas y da un acabado brillante y suave.")
let producto2 = new Producto ("Laca de Fijacion Fuerte 300ml ABC","LAFI300",3900,0,"producto2", 
    "Proporciona fijación invisible, fuerte y con control duradero con un secado rápido y efectivo.")
let producto3 = new Producto ("Polvo en spray 12g ABC","POLSP12",6300,0,"producto3",
    "Agrega volumen y movimiento instantáneos a la vez que proporciona un levantamiento de raíces y un agarre suave.")
let producto4 = new Producto ("Primer Spray 250ml ABC","SPRY250",4550,0,"producto4", 
    "Proporciona un control ligero y protección contra el calor de hasta 230°C. Con formula vegana e ingredientes naturales.")*/

//Nota: la idea es en el futuro crear una pagina html extra para que el usuario propietario de la misma pueda ingresar nuevos productos
//desde la página, cambiar su precio o eliminarlos, así se evita hacer esto desde el código

let allProducts = []

fetch ('../data.json')
    .then ( (res)=> res.json() )
    .then ( (data)=> {
        data.forEach(el => allProducts.push(new Producto(el.nombre, el.codigo, el.precio, el.cant, el.carrito, el.descripcion)))
        const listadoProductos = document.getElementById("productos")
        if (listadoProductos) createProductos (listadoProductos)
        const btnsAgregar = document.getElementsByClassName("btns-agregar")
        for (const btn of btnsAgregar) btn.addEventListener('click', () => { carritoCompras(btn.id) })
    })

let carrito = 0
localStorage.setItem ('clickCarritoPage', false)
let clickCarrito = document.getElementById("btnCarrito")
if (clickCarrito) clickCarrito.addEventListener("click", carritoWeb)  //Verificamos que exista el elemento, de lo contrario otros HTML  tiran error

const calendarPromise = (res) => {
    new Promise ( (resolve, reject) => {
        res ? resolve (calculoMesAMostrar(false, false)) : reject ('Promesa rechazada')
    } )
}

if ((document.getElementsByClassName("calendar")).length!=0) calendarPromise (true)
let enviarTurnos = document.getElementById("enviarBtn")
if (enviarTurnos) enviarTurnos.addEventListener("click", validacionFormTurnos)

