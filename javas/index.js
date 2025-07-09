document.addEventListener('DOMContentLoaded', () => {

    const fuenteLibrosNovedades = [];
    const fuenteLibrosVendidos = [];
    const fuenteLibrosRecomendados = [];

    Promise.all([
        cargarDatos(fuenteLibrosNovedades, './data/novedades.json'),
        cargarDatos(fuenteLibrosVendidos, './data/vendidos.json'),
        cargarDatos(fuenteLibrosRecomendados, './data/recomendados.json')
    ]).then(() => {
        randerizarLibros();
    });

    async function cargarDatos(fuenteLibros,url) {
        try {
           const respuesta = await fetch(url); // Reemplaza con la URL correcta
           const datos = await respuesta.json();

          // Itera sobre los datos y agrégalos al array
        for (const elemento of datos) {
           fuenteLibros.push(elemento);
        }
        } catch (error) {
            console.error('Error al cargar los datos:', error);
        }
    }
    //Funcion que se encarga de crear las cartas.
    //Toma como parametro de entrada arrays y el contenedor donde alojara las cartas

    function creaCardsHtml (fuenteLibros, librosContainer){
        console.log (fuenteLibros);
        console.log(Array.isArray(fuenteLibros));
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


    //Obtengo el boton de contacto para abrir la pagina en una ventana emergente
    const botonContacto = document.getElementById("botonContacto");
    botonContacto.onclick = () => {
        window.open("paginas/contacto.html","Contacto","width=600,height=400");
    }
})
