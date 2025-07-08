document.addEventListener('DOMContentLoaded', () => {
    const fuenteLibrosNovedades = [
        {   
            isbn:"9789876708364",
            imagen:"imagenes/novedades1.webp",
            titulo:"La traicion de mi lengua",
            autor:"Camila Sosa Villada",
            precio: 21.900
        },
        {
            isbn:"9786313003419",
            imagen:"imagenes/novedades2.webp",
            titulo:"Ana Frank antes del diario",
            autor:"Alice Hoffman",
            precio: 27.000
        },
        {
            isbn:"9786313011643",
            imagen:"imagenes/novedades3.webp",
            titulo:"Ardera el viento",
            autor:"Guillermo Sacomano",
            precio: 31.999
        },
        {
            isbn:"9789504990697",
            imagen:"imagenes/novedades4.webp",
            titulo:"Recetas para vivir mejor y mas tiempo",
            autor:"Daniel López Rosetti",
            precio: 36.900
        },
        {
            isbn:"9789507884818",
            imagen:"imagenes/novedades5.webp",
            titulo:"Rea(r)marme",
            autor:"Valeria Schapira",
            precio: 20.000
        },
        {
            isbn:"9789506447564",
            imagen:"imagenes/novedades6.webp",
            titulo:"Inocentes",
            autor:"John Grisham",
            precio: 37.499
        }
    ]

    const fuenteLibrosVendidos = [
        {
            isbn:"9789878121383",
            imagen:"imagenes/vendidos1.webp",
            titulo:"Amanecer en la cosecha",
            autor:"Suzanne Collins",
            precio: 34.990,
        },
        {
            isbn:"9789877693898",
            imagen:"imagenes/vendidos2.webp",
            titulo:"El buen mal",
            autor:"Samanta Schweblin",
            precio: 24.999
        },
        {
            isbn:"9786313011551",
            imagen:"imagenes/vendidos3.webp",
            titulo:"Demasiado lejos",
            autor:"Eduardo Sacheri",
            precio: 37.499
        },
        {
            isbn:"2900107287848",
            imagen:"imagenes/vendidos4.webp",
            titulo:"Besos de cristal",
            autor:"Anabella Franco",
            precio: 31.900
        },
        {
            isbn:"9789507326424",
            imagen:"imagenes/vendidos5.webp",
            titulo:"El secreto de Marcial",
            autor:"Jorge Fernandez Diaz",
            precio: 30.900
        },
        {
            isbn:"9789500771870",
            imagen:"imagenes/vendidos6.webp",
            titulo:"Mi nombre es Emilia Del Valle",
            autor:"Isabel Allende",
            precio: 34.499
        },

    ]

    const fuenteLibrosRecomendados = [
        {
            isbn:"9789877950908",
            imagen:"imagenes/valorados1.webp",
            titulo:"Amistad",
            autor:"Mariano Sigman / Jacobo Bergareche",
            precio: 21.999
        },
        {
            isbn:"9789500216272",
            imagen:"imagenes/valorados2.webp",
            titulo:"Decodifica tu vida",
            autor:"Flor Cerutti",
            precio: 21.900
        },
        {
            isbn:"9789504990994",
            imagen:"imagenes/valorados3.webp",
            titulo:"Por si un dia volvemos",
            autor:"Maria Dueñas",
            precio: 45.000
        },
        {
            isbn:"9786316533258",
            imagen:"imagenes/valorados4.webp",
            titulo:"La libreria de Tokio",
            autor:"Nanako Hanada",
            precio: 16.900
        },
        {
            isbn:"9789873626012",
            imagen:"imagenes/valorados5.webp",
            titulo:"Criaturas despiadadas",
            autor:"J. T. Geissinger",
            precio: 19.900
        },
        {
            isbn:"9789506447557",
            imagen:"imagenes/valorados6.webp",
            titulo:"No tengas miedo",
            autor:"Stephen King",
            precio: 41.999
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
                    <button id="agregar-${libro.isbn}">
                        <img class="carrito" src="imagenes/cart.png" alt="">
                    </button>
                </div>`
        })
        // Creamos elememtos de manera dinamica a partir del array cardsHtml
        librosContainer.innerHTML = cardsHtml.join('')
    }

    function agregarEventosCarrito(fuenteLibros) {
        // recorremos el array original de productos para adjuntar eventos
        // usamos el ID del producto para encontrar el botón correspondiente
        fuenteLibros.forEach(libro => {
            const boton = document.getElementById(`agregar-${libro.isbn}`)
            if (boton) { // asegurarse que el boton exista
                boton.addEventListener('click', () => {
                    // cuando hace click,ya tenemos acceso al objeto 'producto' original
                    agregarLibroAlCarrito(libro);
                })
            }
        })
    }

    function agregarLibroAlCarrito(libroAAgregar) {
        
        //Treaemos el carrito de compras del loca storage y si no existe creamos uno vacio 
        //Convertimos el string que esta en local storaga a array u objeto con el metodo JASON.parse  
        let carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];
        //Buscamos el libro por ISBN
        const indiceLibroExistente = carrito.findIndex(libro => libro.isbn === libroAAgregar.isbn);
        //Si existe le suma una unidad y si no lo agrega
        if (indiceLibroExistente !== -1) {
            carrito[indiceLibroExistente].cantidad++;
        } else {
            carrito.push({
                isbn: libroAAgregar.isbn,
                imagen:"../" + libroAAgregar.imagen,
                titulo:libroAAgregar.titulo,
                autor: libroAAgregar.autor,
                precio:libroAAgregar.precio,
                cantidad: 1
            });
        }
        //Volvemos a cargar el carrito actualizado al local storage
        //Convertimos el array a un string para cargarlo en local storage metodo JASON.stringfy
        localStorage.setItem('carritoDeCompras',JSON.stringify(carrito));
        alert(`${libroAAgregar.titulo} agregado al carrito!`);
    }

    function randerizarLibros (){

        //Secion novedades - Llamada a la funcion para crear Cards
        const novedadesContainer = document.getElementById("librosContainerNovedades");
        creaCardsHtml (fuenteLibrosNovedades,novedadesContainer);
        agregarEventosCarrito(fuenteLibrosNovedades);
        //Seccion Mas Vendidos - Llamada a la funcion para crear Cards
        const vendidosContainer = document.getElementById("librosContainerVendidos");
        creaCardsHtml (fuenteLibrosVendidos,vendidosContainer);
        agregarEventosCarrito(fuenteLibrosVendidos);
        //Seccion Recomendados - Llamada a la funcion para crear Cards
        const recomendadosContainer = document.getElementById("librosContainerRecomendados");
        creaCardsHtml (fuenteLibrosRecomendados,recomendadosContainer);
        agregarEventosCarrito(fuenteLibrosRecomendados);
    
    }

    randerizarLibros();

    //Obtengo el boton de contacto para abrir la pagina en una ventana emergente
    const botonContacto = document.getElementById("botonContacto");
    botonContacto.onclick = () => {
        window.open("paginas/contacto.html","Contacto","width=600,height=400");
    }
})
