// Script para barra de Navegacion
const bar = document.getElementById('bar');
const nav = document.getElementById('navbar');
const cerrar = document.getElementById('cerrar');

//Obtengo el boton de novedades para poder cerrar la lengueta despues del click
const novedades = document.getElementById('enlaceNovedades');

novedades.addEventListener('click', () => {
        nav.classList.remove('active');

})
//Obtengo el boton de vendidos para poder cerrar la lengueta despues del click
const vendidos = document.getElementById('enlaceVendidos');

vendidos.addEventListener('click', () => {
        nav.classList.remove('active');

})
//Obtengo el boton de recomendados para poder cerrar la lengueta despues del click
const recomendados = document.getElementById('enlaceRecomendados');

recomendados.addEventListener('click', () => {
        nav.classList.remove('active');

})

//Obtengo el boton de registro para poder abrir la pagina en una ventana emergente y cerrar la lengueta
const registro = document.getElementById("botonRegistro");

registro.addEventListener('click', () => {
    window.open("paginas/registro.html","Contacto","width=400,height=400");    
    nav.classList.remove('active');
})

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active')
    })
}

if (cerrar) {
    cerrar.addEventListener('click', (e) => {
        e.preventDefault();
        nav.classList.remove('active')
    })
}