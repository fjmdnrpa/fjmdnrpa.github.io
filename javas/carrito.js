document.addEventListener('DOMContentLoaded', () => {
    
    const librosCarrito = document.getElementById('librosCarrito');
    const totalCarrito = document.getElementById('totalCarrito');
    const vaciarCarrito = document.getElementById('vaciarCarrito');

    function renderizarCarrito() {
        let carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];
        librosCarrito.innerHTML = '';
        let total = 0;

        if (carrito.length === 0) {
            librosCarrito.innerHTML = '<p>El carrito está vacío.</p>';
            totalCarrito.textContent = 'Total: $0.00';
            console.log("carrito vacio");
            return;
        }
        
        // *** USANDO TEMPLATE STRINGS PARA CONSTRUIR EL HTML DE LOS ÍTEMS ***
        const librosHtml = carrito.map(libro => {
            // total = total + item.precio * item.cantidad
            total += libro.precio * libro.cantidad; // Acumular el total

            return `
                        <div class="item-carrito">
                            <span>${libro.titulo} &nbsp (&nbspx&nbsp${libro.cantidad}&nbsp)</span>
                            <div>
                                <span> &nbsp&nbsp&nbsp $${(libro.precio * libro.cantidad).toFixed(2)}</span>
                                <button class="btn-eliminar-item" id="eliminar-${libro.isbn}">Eliminar</button>
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

    function eliminarLibroCarrito(isbn) {
        //Treaemos el carrito de compras del loca storage y si no existe creamos uno vacio 
        //Convertimos el string que esta en local storaga a array u objeto con el metodo JASON.parse  
        let carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];
        //Buscamos el elemento a eliminar en todo el array
        const carritoActualizado = carrito.map(libro => {
            if (libro.isbn === isbn) {
                // Creamos un nuevo objeto con las propiedades exactas que necesitamos.
                // Copiamos id, nombre, precio y reducimos la cantidad.
                return {
                    isbn: libro.isbn,
                    titulo: libro.titulo,
                    autor: libro.autor,
                    precio: libro.precio,
                    cantidad: libro.cantidad - 1 // Aquí se decrementa la cantidad
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