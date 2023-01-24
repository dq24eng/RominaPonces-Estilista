function mayorQue(n) {
    return (m) => m > n
}

let mayorQueDiez = mayorQue(10) //(m) => m > 10

console.log( mayorQueDiez(12) )  //  true
console.log( mayorQueDiez(8) )  //  false
