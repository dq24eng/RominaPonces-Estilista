function miCarrito () {

    let productRow = document.createElement("div")
    let carritoProductsJSON = sessionStorage.getItem("carritoProducts")
    let carritoProducts = JSON.parse(carritoProductsJSON)
    let total = 0

    for (const producto of carritoProducts){
        let productHTML = `
            <div class="row">
                <div class="col-6">
                    <div class="shopping-cart-item d-flex align-items-center">
                        <img src="../imagenes/tienda/${producto.carrito}.jpg" height="150" width="150">
                        <h5 class="text-center fs-5">${producto.nombre}</h5>
                    </div>
                </div>
                <div class="col-2" >
                    <div class="shopping-cart-item d-flex align-items-center h-100" >
                        <h5 class="fs-5">$ ${producto.precio}</h5>
                    </div>
                </div>
                <div class="col-4" >
                    <div class="shopping-cart-item d-flex align-items-center h-100 ">
                        <input type="number" value="${producto.cant}" size=40 style="width:55px">
                        <div class="justify-content-end d-flex w-100">
                            <button class="btn btn-danger" type="button">X</button>
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
        ` <p class="ml-4 mb-0 justify-content-center">  $ ${total}  </p> `
    let secondChild = document.getElementById("btnComprar")                         //Asignamos a una variable el elemento que precede
    document.getElementById('carritoTotal').insertBefore(totalRow,secondChild)      //Insetamos nuevo elemento

}

if (sessionStorage.getItem('clickCarritoPage')) miCarrito ()