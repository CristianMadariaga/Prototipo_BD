document.cookie = "listaCarrito=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

function volverAlMenu() {
    window.location.href = 'productos.html'; 
}

//Ser redirigido en 3 segundos al menu principal
setTimeout(() => {
    window.location.href = 'productos.html';
}, 3000);