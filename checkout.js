let listaCarrito = [];

function checkCart(){
    var cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('listaCarrito'));
    if(cookieValue){
        listaCarrito = JSON.parse(cookieValue.split('=')[1]);
    }
}
checkCart();
addCartToHTML();

function addCartToHTML(){
    let listaCarritoHTML = document.querySelector('.returnCart .lista');
    listaCarritoHTML.innerHTML = '';
    let totalQuantityHTML = document.querySelector('.cantidadTotal');
    let totalPriceHTML = document.querySelector('.precioTotal');

    let totalQuantity = 0;
    let totalPrice = 0;

    if(listaCarrito){
        listaCarrito.forEach(product =>{
            if(product){
                let newP = document.createElement('div');
                newP.classList.add('item');
                newP.innerHTML = `
                <img src="${product.imagen}">
                <div class="info">
                    <div class="nombre">${product.nombre}</div>
                    <div class="price">$${product.precio}/1 producto</div>
                </div>
                <div class="cantidad">${product.cantidad}</div>
                <div class="preciofinal">$${product.precio * product.cantidad}</div>`;
                listaCarritoHTML.appendChild(newP);
                totalQuantity += product.cantidad;
                totalPrice = totalPrice + (product.precio * product.cantidad);
            }
        })
    }
    totalQuantityHTML.innerText = totalQuantity;
    totalPriceHTML.innerText = '$' + totalPrice;
}