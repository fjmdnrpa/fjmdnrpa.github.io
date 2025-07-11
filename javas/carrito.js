document.addEventListener('DOMContentLoaded', () => {
    
    const librosCarrito = document.getElementById('librosCarrito');
    const totalCarrito = document.getElementById('totalCarrito');
    const vaciarCarrito = document.getElementById('vaciarCarrito');

    function renderizarCarrito() {
        let carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];
        librosCarrito.innerHTML = '';
        let total = 0;

        if (carrito.length === 0) {
            librosCarrito.innerHTML = '<p class="carritoVacio">El carrito está vacío.</p>';
            totalCarrito.textContent = 'Total: $0.00';
            vaciarCarrito.hidden = true;
            return;
        }
        
        // *** USANDO TEMPLATE STRINGS PARA CONSTRUIR EL HTML DE LOS ÍTEMS ***
        const librosHtml = carrito.map(libro => {
            // total = total + item.precio * item.cantidad
            total += libro.precio * libro.cantidad; // Acumular el total

            return `
                    <div class="item-carrito">
                        <img class=imagenCarrito src="${libro.imagen}" alt="${libro.titulo}">        
                        <span class ="tituloLibro">${libro.titulo}</span>
                        <input id="cantidad-${libro.isbn}" class="cantidadCarrito" type="number" min="1" max="9" value=${libro.cantidad} />
                            <div>
                                <span>$${(libro.precio * libro.cantidad).toFixed(2)}</span>
                                <button class="btn-eliminar-item" id="eliminar-${libro.isbn}">X</button>
                            </div>
                    </div>            
                    `;
        });

        // Unimos todos los strings HTML y los insertamos en el contenedor
        librosCarrito.innerHTML = librosHtml.join('');
        totalCarrito.textContent = `Total: $${total.toFixed(2)}`;

        // *** Adjuntar eventos DESPUÉS de que el HTML está en el DOM ***
        // Iteramos sobre el array 'carrito' original para adjuntar eventos,
        // usando el ID generado para encontrar cada botón.
        // los botones de eliminar se crean y se destruyen dinámicamente cada vez que el carrito se renderiza (es decir, cuando se agrega, elimina o vacía un producto).
        carrito.forEach(libro => {
            const botonEliminar = document.getElementById(`eliminar-${libro.isbn}`);
            if (botonEliminar) { // Asegurarse de que el botón exista
                botonEliminar.addEventListener('click', () => {
                    // Cuando se hace clic, ya tenemos acceso al ID del item original
                    eliminarLibroCarrito(libro.isbn);
                });
            }
        });

        carrito.forEach(libro => {
            const botonEliminar = document.getElementById(`cantidad-${libro.isbn}`);
            if (botonEliminar) { // Asegurarse de que el botón exista
                botonEliminar.addEventListener('change', () => {
                    // Cuando se hace clic, ya tenemos acceso al ID del item original
                    modificarCantidadLibro(libro.isbn);
                });
            }
        });

    function eliminarLibroCarrito(isbn) {
        //Treaemos el carrito de compras del loca storage y si no existe creamos uno vacio 
        //Convertimos el string que esta en local storaga a array u objeto con el metodo JASON.parse  
        let carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];
        //Buscamos el elemento a eliminar en todo el array
        const carritoActualizado = carrito.map(libro => {
            if (libro.isbn === isbn) {
                // Creamos un nuevo objeto con las propiedades exactas que necesitamos.
                // Copiamos id, nombre, precio y la cantidad en cero 
                return {
                    isbn: libro.isbn,
                    imagen:libro.imagen,
                    titulo: libro.titulo,
                    autor: libro.autor,
                    precio: libro.precio,
                    cantidad: 0 // Aquí se decrementa la cantidad
                //continue
                };
            }
            return libro; // Si no es el producto a modificar, lo devolvemos tal cual
        }).filter(libro => libro.cantidad > 0); //Mantiene solo aquellos ítems cuya cantidad sea mayor que cero
        //Volvemos a cargar el carrito actualizado al local storage
        //Convertimos el array a un string para cargarlo en local storage metodo JASON.stringfy           
        localStorage.setItem('carritoDeCompras', JSON.stringify(carritoActualizado));
        renderizarCarrito();
        }

    function modificarCantidadLibro (isbn){
        //Treaemos el carrito de compras del loca storage y si no existe creamos uno vacio 
        //Convertimos el string que esta en local storaga a array u objeto con el metodo JASON.parse  
        let carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];
        //Buscamos el elemento a eliminar en todo el array
        const carritoActualizado = carrito.map(libro => {
            if (libro.isbn === isbn) {
                // Obtenemos el input que fue modificado
                const input = document.activeElement;
                // lo convettimos a numero para  poder operar 
                const nuevaCantidad = parseInt(input.value);
                // Creamos un nuevo objeto con las propiedades exactas que necesitamos.
                // Copiamos id, nombre, precio y la cantidad actuazalizada 
                return {
                    isbn: libro.isbn,
                    imagen:libro.imagen,
                    titulo: libro.titulo,
                    autor: libro.autor,
                    precio: libro.precio,
                    cantidad: nuevaCantidad
                //continue
                };
            }
            return libro; // Si no es el producto a modificar, lo devolvemos tal cual
        }).filter(libro => libro.cantidad > 0); //Mantiene solo aquellos ítems cuya cantidad sea mayor que cero
        //Volvemos a cargar el carrito actualizado al local storage
        //Convertimos el array a un string para cargarlo en local storage metodo JASON.stringfy           
        localStorage.setItem('carritoDeCompras', JSON.stringify(carritoActualizado));
        renderizarCarrito();
        }

    }

    vaciarCarrito.addEventListener('click', () => {
        localStorage.removeItem('carritoDeCompras');
        renderizarCarrito();
        alert('El carrito ha sido vaciado.');
    });


    renderizarCarrito()

})