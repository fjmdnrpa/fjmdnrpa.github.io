const fuenteLibrosNovedades = [
        {   
            imagen:"imagenes/novedades1.webp",
            titulo:"La traicion de mi lengua",
            autor:"Camila Sosa Villada",
            precio: 21.900
        },
        {
            imagen:"imagenes/novedades2.webp",
            titulo:"Ana Frank antes del diario",
            autor:"Alice Hoffman",
            precio: 27.000
        },
        {
            imagen:"imagenes/novedades3.webp",
            titulo:"Ardera el viento",
            autor:"Guillermo Sacomano",
            precio: 31.999
        },
        {
            imagen:"imagenes/novedades4.webp",
            titulo:"Recetas para vivir mejor y mas tiempo",
            autor:"Daniel López Rosetti",
            precio: 36.900
        },
        {
            imagen:"imagenes/novedades5.webp",
            titulo:"Rearmarme",
            autor:"Valeria Schapira",
            precio: 20.000
        },
        {
            imagen:"imagenes/valorados3.webp",
            titulo:"Por si un dia volvemos",
            autor:"Maria Dueñas",
            precio: 45.000
        }
    ]

const fuenteLibrosVendidos = [
        {
            imagen:"imagenes/valorados3.webp",
            titulo:"Por si un dia volvemos",
            autor:"Maria Dueñas",
            precio: 45.000
        },
        {
            imagen:"imagenes/vendidos1.webp",
            titulo:"Amanecer en la cosecha",
            autor:"Suzanne Collins",
            precio: 34.990,
        },
        {
            imagen:"imagenes/vendidos2.webp",
            titulo:"El buen mal",
            autor:"Samanta Schweblin",
            precio: 24.999
        },
        {
            imagen:"imagenes/vendidos3.webp",
            titulo:"Demasiado lejos",
            autor:"Eduardo Sacheri",
            precio: 37.499
        },
        {
            imagen:"imagenes/vendidos4.webp",
            titulo:"Besos de cristal",
            autor:"Anabella Franco",
            precio: 31.900
        },
        {
            imagen:"imagenes/vendidos5.webp",
            titulo:"El secreto de Marcial",
            autor:"Jorge Fernandez Diaz",
            precio: 30.900
        }
    ]

const fuenteLibrosRecomendados = [
        {
            imagen:"imagenes/valorados1.webp",
            titulo:"Amistad",
            autor:"Mariano Sigman / Jacobo Bergareche",
            precio: 21.999
        },
        {
            imagen:"imagenes/valorados2.webp",
            titulo:"Decodifica tu vida",
            autor:"Flor Cerutti",
            precio: 21.900
        },
        {
            imagen:"imagenes/valorados3.webp",
            titulo:"Por si un dia volvemos",
            autor:"Maria Dueñas",
            precio: 45.000
        },
        {
            imagen:"imagenes/valorados4.webp",
            titulo:"La libreria de Tokio",
            autor:"Nanako Hanada",
            precio: 16.900
        },
        {
            imagen:"imagenes/valorados5.webp",
            titulo:"Criaturas despiadadas",
            autor:"J. T. Geissinger",
            precio: 19.900
        },
        {
            imagen:"imagenes/vendidos5.webp",
            titulo:"El secreto de Marcial",
            autor:"Jorge Fernandez Diaz",
            precio: 30.900
        }
    ]

//Funcion que se encarga de crear las cartas.
//Toma como parametro de entrada arrays y el contenedor donde alojara las cartas

function creaCardsHtml (fuenteLibros, librosContainer){

    const cardsHtml = fuenteLibros.map(libro => {
        // comillas invertidas ` ` 
        // Las variables se insertan con ${variable}
        // Usamos template strings para escribir codigo html

        return `
            <div class="libros">
                <img src="${libro.imagen}" alt="${libro.titulo}">
                <div class="producto-descripcion">
                    <h4 class="titulo">${libro.titulo}</h4>
                    <h4 class="autor">${libro.autor}</h4>
                    <h4 class="precio">$ ${libro.precio}</h4>
                </div>
                <a href="paginas/carrito.html">
                    <img class="carrito" src="imagenes/cart.png" alt="">
                </a>
            </div>`
})
    // Creamos elememtos de manera dinamica a partir del array cardsHtml
    librosContainer.innerHTML = cardsHtml.join('')
}

//Secion novedades - Llamada a la funcion para crear Cards
const novedadesContainer = document.getElementById("librosContainerNovedades");
creaCardsHtml (fuenteLibrosNovedades,novedadesContainer);

//Seccion Mas Vendidos - Llamada a la funcion para crear Cards
const vendidosContainer = document.getElementById("librosContainerVendidos");
creaCardsHtml (fuenteLibrosVendidos,vendidosContainer);

//Seccion Recomendados - Llamada a la funcion para crear Cards
const recomendadosContainer = document.getElementById("librosContainerRecomendados");
creaCardsHtml (fuenteLibrosRecomendados,recomendadosContainer);
