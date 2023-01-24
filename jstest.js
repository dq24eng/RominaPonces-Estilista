class Producto{                 
    constructor (nombre, codigo, precio, stock){
        this.nombre = nombre;
        this.codigo = codigo;
        this.precio = precio;
        this.stock = stock
    }
}

let producto1 = new Producto ("Aceite de Cuidado 100 ml ABC","ACEI100",2500,20)
let producto2 = new Producto ("Laca de Fijacion Fuerte 300ml ABC","LAFI300",3900,17)
let producto3 = new Producto ("Polvo en spray 12g ABC","POLSP12",6300,8)
let producto4 = new Producto ("Primer Spray 250ml ABC","SPRY250",4550,22)
let array = []
let allProducts = [producto1, producto2, producto3, producto4] //Array de objeto

for (const prod of allProducts){
    console.log(prod.nombre)
    array.push ({id: prod.codigo, cant: 1 }) 
}

console.log(array)

