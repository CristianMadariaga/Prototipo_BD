//Boton para abrir carritos
let icono_carrito = document.querySelector('.icono_carrito');
let carrito = document.querySelector('.carrito');
let cerrar_carrito = document.querySelector('.cerrar_carrito')

if (screen.width < 900) {
    icono_carrito.addEventListener('click', () => {
        if (carrito.style.right == '-120%') {
            carrito.style.right = '0';
        }
        else {
            carrito.style.right = '-120%'
        }
    })
    cerrar_carrito.addEventListener('click', () => {
        carrito.style.right = '-120%';
    })

} else {
    icono_carrito.addEventListener('click', () => {
        if (carrito.style.right == '-100%') {
            carrito.style.right = '0';
        }
        else {
            carrito.style.right = '-100%'
        }
    })
    cerrar_carrito.addEventListener('click', () => {
        carrito.style.right = '-100%';
    })
}

//Traer info de productos
let productos = null;
//Sacar data de JSON (CAMBIAR A SQL)!!!
fetch('productos.json')
    .then(response => response.json())
    .then(data => {
        productos = data;
        addDataToHTML();
    })
    .catch(error => {
        console.error("Error al leer la data: ", error);
    })

//Añadir datos al HTML
function addDataToHTML() {
    //Remover data default
    let productos_view = document.querySelector('.view_productos');
    productos_view.innerHTML = '';

    //Añadir productos
    if (productos !== null) {
        productos.forEach(producto => {
            let nuevoProducto = document.createElement('div');
            nuevoProducto.classList.add('item');
            nuevoProducto.innerHTML =
                `<img src="${producto.imagen}" width="100px" height="100px">
            <h2>${producto.nombre}</h2>
            <h3>$${producto.precio}</h3>
            <button onclick="addCarrito(${producto.id})" class="button">Agregar</button>` //CAMBIAR AQUI A LA FUNCION ONCLICK BUTON!
            productos_view.appendChild(nuevoProducto);
        });
    }
}

function filterDataHTML(categoria) {
    //Remover data default
    let productos_view = document.querySelector('.view_productos');
    productos_view.innerHTML = '';

    //Añadir productos
    if (productos !== null) {
        productos.forEach(producto => {
            if (producto.categoria == categoria) {
                let nuevoProducto = document.createElement('div');
                nuevoProducto.classList.add('item');
                nuevoProducto.innerHTML =
                    `<img src="${producto.imagen}" width="100px" height="100px">
                <h2>${producto.nombre}</h2>
                <h3>$${producto.precio}</h3>
                <button onclick="addCarrito(${producto.id})" class="button">Agregar</button>` //CAMBIAR AQUI A LA FUNCION ONCLICK BUTON!
                productos_view.appendChild(nuevoProducto);
            }
            if (categoria == "Todo") {
                addDataToHTML();
            }
        });
    }
}

// Lista que almacena los datos del carrito (productos)
let listaCarrito = [];

//Revisor del carrito
function checkCarrito() {
    var cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('listaCarrito='));
    if (cookieValue) {
        listaCarrito = JSON.parse(cookieValue.split('=')[1]);
    }
}
checkCarrito()

//Añadir productos al carrito
function addCarrito($idProducto) {
    let productoCopia = JSON.parse(JSON.stringify(productos));
    // Si el producto no está en el carrito
    if (!listaCarrito[$idProducto]) {
        let dataProducto = productoCopia.filter(
            producto => producto.id == $idProducto
        )[0];
        //Añadir al carrito
        listaCarrito[$idProducto] = dataProducto;
        listaCarrito[$idProducto].cantidad = 1;
    } else {
        // Si ya está en el carrito, solo se añade cantidad
        listaCarrito[$idProducto].cantidad++;
    }
    //Guardar carrito en cookie
    let tiempoGuardado = "expires=Thu, 31 Dec 2025 23:59:59 UTC"
    document.cookie = "listaCarrito=" + JSON.stringify(listaCarrito) + "; " + tiempoGuardado + "; path=/;";
    addCarritoHTML();
}

addCarritoHTML();
// Cargar el carrito al HTML
function addCarritoHTML() {
    //Limpiar data
    let listaCarritoHTML = document.querySelector('.lista_carrito');
    listaCarritoHTML.innerHTML = '';

    let totalCarritoHTML = document.querySelector('.total_carrito');
    let totalCantidad = 0;

    if (listaCarrito) {
        listaCarrito.forEach(producto => {
            if (producto) {
                let nuevoCarrito = document.createElement('div');
                nuevoCarrito.classList.add('item_carrito');
                nuevoCarrito.innerHTML =
                    `<img src="${producto.imagen}">
                <div class="contenido">
                    <div class="nombre_producto">
                        ${producto.nombre}
                    </div>
                    <div class="precio_producto">
                        $${producto.precio}
                    </div>
                </div>
                <div class="cantidad_producto">
                    <button onclick="cambiarCantidad(${producto.id}, '-')">-</button>
                    <span class="cantidad">${producto.cantidad}</span>
                    <button onclick="cambiarCantidad(${producto.id}, '+')">+</button>
                </div>`
                listaCarritoHTML.appendChild(nuevoCarrito);
                totalCantidad = totalCantidad + producto.cantidad;
            }
        })
    }
    totalCarritoHTML.innerText = totalCantidad;
}

//Cambiar cantidades del producto en el carrito con botones + y -
function cambiarCantidad($idProducto, $tipo) {
    switch ($tipo) {
        case '+':
            listaCarrito[$idProducto].cantidad++;
            break;
        case '-':
            listaCarrito[$idProducto].cantidad--;
            if (listaCarrito[$idProducto].cantidad <= 0) {
                delete listaCarrito[$idProducto];
            }
            break;
        default:
            break;
    }
    //Guardar carrito en cookie
    let tiempoGuardado = "expires=Thu, 31 Dec 2025 23:59:59 UTC"
    document.cookie = "listaCarrito=" + JSON.stringify(listaCarrito) + "; " + tiempoGuardado + "; path=/;";

    //Recargar Carrito
    addCarritoHTML();
}

let pagar_carrito = document.querySelector('.pagar');

pagar_carrito.addEventListener('click', () => {
    window.location.href = 'pago.html';
});