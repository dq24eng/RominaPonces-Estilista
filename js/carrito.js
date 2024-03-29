function miCarrito () {
    //Esta funcion se ejecuta una vez cargada la pagina del carrito
    //Parsea los productos que se cargaron al carrito, crea los elementos HTML y posteriormente agrega eventos y atributos necesarios
    //para cada elemento
    let productRow = document.createElement("div")
    let carritoProductsJSON = localStorage.getItem("carritoProducts")
    let carritoProducts = JSON.parse(carritoProductsJSON)  //Array de objetos a comprar
    let total = 0

    for (const producto of carritoProducts){
        let productHTML = `
            <div class="row newElementCart">
                <div class="col-6">
                    <div class="shopping-cart-item d-flex align-items-center">
                        <img src="../imagenes/tienda/${producto.carrito}.jpg" height="150" width="150">
                        <h5 class="text-center fs-5 nameProductCarrito">${producto.nombre}</h5>
                    </div>
                </div>
                <div class="col-2" >
                    <div class="shopping-cart-item d-flex align-items-center h-100" >
                        <h5 class="fs-5 price">$ ${producto.precio}</h5>
                    </div>
                </div>
                <div class="col-4" >
                    <div class="shopping-cart-item d-flex align-items-center h-100 cantItem">
                        <input type="number" value="${producto.cant}" size=40 style="width:55px" class="cantidadInput">
                        <div class="justify-content-end d-flex w-100">
                            <button class="btn btn-danger deleteBtn" type="button">X</button>
                        </div>    
                    </div>
                </div>
            </div> `
        productRow.innerHTML += productHTML
        let rowCarrito = document.querySelector(".carritoItems")
        rowCarrito.append(productRow)
        total += producto.cant * producto.precio
    }
    
    let totalRow = document.createElement("div")                                    //Se crea el elemento
    totalRow.setAttribute("class", "justify-content-center d-flex w-50")            //Se agregan las clases
    totalRow.innerHTML =                                                            //Se crea el contenido del nuevo elemento
        ` <p class="ml-4 mb-0 justify-content-center total">  $ ${total}  </p> `
    let secondChild = document.getElementById("btnComprar")                         //Asignamos a una variable el elemento que precede
    document.getElementById('carritoTotal').insertBefore(totalRow,secondChild)      //Insetamos nuevo elemento

    productRow.querySelectorAll(".deleteBtn").forEach(el => el.addEventListener("click", deleteFunction ))  //Evento de eliminar item
    productRow.querySelectorAll(".cantidadInput").forEach(el => el.addEventListener("change", cambioCant))  //Evento de cambio cantidad

    actualizacionPrecio()       //Se actualiza el precio total de la compra
}

function deleteFunction(e){
    //Funcion para elimiar items del carrito
    let btnDelClicked = e.target
    let productDelete = btnDelClicked.closest(".newElementCart").childNodes[1].childNodes[1].innerText
    let carritoProducts = JSON.parse(localStorage.getItem("carritoProducts")) 
    localStorage.setItem("carritoProducts", JSON.stringify(carritoProducts.filter((el) => (el.nombre!=productDelete)))) // Eliminamos producto del array
    btnDelClicked.closest(".newElementCart").remove()
    actualizacionPrecio()
}

function cambioCant (e){
    //Funcion de cambio de cantidad en carrito
    let newCant = e.target
    if (newCant.value <= 0) newCant.value = 1       //No se permiten cantidades igual o menores a cero
    actualizacionPrecio()
}

function actualizacionPrecio() {
    //Funcion que lee los elementos existentes en el momento con sus cantidades y actualiza el Total a pagar 
    let total = 0
    let cartElement = document.querySelectorAll(".newElementCart").forEach((el)=> {
        let itemPrice = parseFloat(el.querySelector(".price").textContent.replace('$ ',''))
        let itemCant = parseInt(el.querySelector(".cantidadInput").value)
        total += itemPrice * itemCant
    })  
    document.querySelector(".total").innerHTML = `$ ${total}`
}

function comprarButton(){
    let cantProd = document.getElementsByClassName("newElementCart")
    if (cantProd.length == 0) {
        Swal.fire({
            icon: 'error',
            title: 'Por favor, agregá productos a tu carrito para avanzar con la compra',
            color: 'white',
            showConfirmButton: false,
            showCloseButton: true,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__bounceOutUp'
            }
        }).then((result) => {
            if ((result.isDenied) || (result.isDismissed)) window.location = "./tienda.html"
        })
    } else {
        Swal.fire({
            title: 'Gracias por tu compra!',
            text: 'En breve recibirás tu producto.',
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
}

if (localStorage.getItem('clickCarritoPage')) miCarrito ()
let btnComprar = document.querySelector(".btnComprar").addEventListener("click", comprarButton)