// todo se ejecuta cuando el DOM se carga completamente
document.addEventListener('DOMContentLoaded', () => {
    // selecciona el formulario del dom
    const formulario = document.querySelector('form');
    //-------------------------------------------------------------------------------------------------

    // Fucion para mostrar error
    const mostrarError = (entrada, mensaje) => {
        // accedemos al div padre
        const divPadre = entrada.parentNode;
        // encuentra el elemento errorTexto
        const errorText = divPadre.querySelector('.errorTexto');
        // console.log(errorText)
        // agrega la clase de error al elemento padre
        divPadre.classList.add('error');
        // agrega mensaje de error
        errorText.innerText = mensaje;

        };

    // ----------------------------------------------------------------------------------------------

    // Funcion para eliminar error

    const eliminarError = entrada => {
        // accedemos al div padre
        const divPadre = entrada.parentNode;
        // encuentra el elemento errorTexto
        const errorText = divPadre.querySelector('.errorTexto');
        // console.log(errorText)
        // agrega la clase de error al elemento padre
        divPadre.classList.remove('error');
        // agrega mensaje de error
        errorText.innerText = "";

        };

    // ----------------------------------------------------------------------------------------------

    //funcion para corroborar si los campos estan completos para quitar error

    formulario.querySelectorAll('.ingresoTexto').forEach(entrada => {
        // se activa cuando el valor de un elemento del formulario cambia y se sale del elemento 
            entrada.addEventListener('change', () => {
                // obtenemos el valor del campo seleccionado
                const valor = entrada.value.trim();//elimina cualquier espacio en blanco al principio y al final del valor obtenido.
                // condicion para evaluar
                if (valor !== '') {
                    eliminarError(entrada);
                }
            })
        })

    //---------------------------------------------------------------------------------------
    // funcion validar campo

    function validarCampo(campoId, mensaje) {
        const campo = document.getElementById(campoId);
        const value = campo.value.trim();
        if (value == '') {
                mostrarError(campo, mensaje);
                return false;//indicamos que la validacion fallo
            } else {
                eliminarError(campo)
                return true;//indicamos que la validacion ha sido exitosa
            }
    }
    //------------------------------------------------------------------------------------------

    // Función para validar un correo electrónico utilizando una expresión regular
        function esEmail(email) {
            const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return expresionRegular.test(email);//devuelve true si la cadena coincide con el patrón de la expresión regular
        }

    //--------------------------------------------------------------------------------------------

    // funcion para validar el campo de email
    function validarEmail(campoId) {
        // obtenemos elemento mediante id
        const campo = document.getElementById(campoId);
        const email = campo.value.trim();
        // si el campo esta vacio
        if (email === '') {
            //establecemos mensaje de error
            mostrarError(campo, 'El correo electronico es obligatorio');
            // indicamos que la validacion ha fallado
            return false
        } else if (!esEmail(email)) {
            //establecemos mensaje de error 
            mostrarError(campo,'El formato del correo electronico es incorrecto');
            // indicamos que la validacion ha fallado
            return false
        }else{
            // si es valido eliminamos cualquier error
            eliminarError(campo);
            // indicamos que la validacion es exitosa
            return true
            }
    }
    // --------------------------------------------------------------------------------

    // funcion para validar el formulario
    const validarFormulario = () => {
        let validar = true;
        // validar campo email
        validar = validarEmail('email') && validar;
        // validar los campos de texto
        validar = validarCampo('contraseña', 'Ingresa tu contraseña') && validar;
        return validar;
    }

    //------------------------------------------------------------------------------------

    // agregar un evento de escucha para cuando se envia el formulario
    formulario.addEventListener('submit', event => {
        event.preventDefault();
        if (!validarFormulario()) {
            // mensaje no valido
            //event.preventDefault()//evita que el formulario se envie
            alert("Revisa los errores en los datos del formulario y volvelo a enviar");
        } else {
            //event.preventDefault();
            alert("El formulario es valido...");
            window.close();
        }
    })
})
