
// ============================================
// ELEMENTOS DEL DESPLEGABLE DE DONACIONES
// ============================================

// Buscamos los elementos en el HTML.
const botonDonaciones = document.getElementById("boton-donaciones");
const contenidoDonaciones = document.getElementById("contenido-donaciones");
const flechaDonaciones = document.getElementById("flecha-donaciones");


// ============================================
// ABRIR Y CERRAR DONACIONES CON ANIMACIÓN
// ============================================

if (botonDonaciones && contenidoDonaciones && flechaDonaciones) {

    botonDonaciones.addEventListener("click", function () {

        // Comprobamos si el contenido está oculto.
        const estaOculto = contenidoDonaciones.hidden;

        if (estaOculto) {

            // Mostramos el contenido.
            contenidoDonaciones.hidden = false;

            // Reiniciamos las clases de animación.
            contenidoDonaciones.classList.remove("donaciones-cerrando");
            contenidoDonaciones.classList.remove("donaciones-abriendo");

            // Activamos la animación de apertura.
            contenidoDonaciones.classList.add("donaciones-abriendo");

            // Actualizamos el estado del botón.
            botonDonaciones.setAttribute("aria-expanded", "true");

            // Cambiamos la flecha hacia arriba.
            flechaDonaciones.textContent = "⌃";

        } else {

            // Activamos la animación de cierre.
            contenidoDonaciones.classList.remove("donaciones-abriendo");
            contenidoDonaciones.classList.add("donaciones-cerrando");

            // Actualizamos el estado del botón.
            botonDonaciones.setAttribute("aria-expanded", "false");

            // Cambiamos la flecha hacia abajo.
            flechaDonaciones.textContent = "⌄";

            // Esperamos a que termine la animación para ocultarlo.
            contenidoDonaciones.addEventListener("animationend", function cerrar() {

                contenidoDonaciones.hidden = true;

                contenidoDonaciones.classList.remove("donaciones-cerrando");

            }, { once: true });

        }

    });

}


// ============================================
// ELEMENTOS PARA COPIAR EL ALIAS
// ============================================

const botonCopiarAlias = document.getElementById("boton-copiar-alias");
const aliasDonacion = document.getElementById("alias-donacion");
const mensajeCopia = document.getElementById("mensaje-copia");


// ============================================
// MÉTODO ALTERNATIVO PARA COPIAR
// ============================================

function copiarTextoAlternativo(texto) {

    // Creamos un campo temporal.
    const campoTemporal = document.createElement("textarea");

    campoTemporal.value = texto;
    campoTemporal.setAttribute("readonly", "");

    // Lo ubicamos fuera de la pantalla.
    campoTemporal.style.position = "fixed";
    campoTemporal.style.left = "-9999px";

    document.body.appendChild(campoTemporal);

    // Seleccionamos el alias.
    campoTemporal.select();

    // Intentamos copiarlo.
    const copiado = document.execCommand("copy");

    // Eliminamos el campo temporal.
    document.body.removeChild(campoTemporal);

    return copiado;
}


// ============================================
// BOTÓN PARA COPIAR EL ALIAS DE ASTROPAY
// ============================================

if (botonCopiarAlias && aliasDonacion && mensajeCopia) {

    botonCopiarAlias.addEventListener("click", async function () {

        // Obtenemos el alias del HTML.
        const alias = aliasDonacion.textContent.trim();

        // Buscamos el texto del botón.
        const textoBoton = botonCopiarAlias.querySelector("#texto-copiar-alias");

        // Limpiamos mensajes anteriores.
        mensajeCopia.textContent = "";

        try {

            // Intentamos utilizar el portapapeles moderno.
            if (navigator.clipboard && window.isSecureContext) {

                await navigator.clipboard.writeText(alias);

            } else {

                // Utilizamos el método alternativo.
                const copiado = copiarTextoAlternativo(alias);

                if (!copiado) {
                    throw new Error("No se pudo copiar el alias");
                }

            }

            // Confirmamos que se copió.
            mensajeCopia.textContent = "¡Alias copiado correctamente!";

            if (textoBoton) {
                textoBoton.textContent = "¡Copiado!";
            }

            // Restauramos el botón después de dos segundos.
            setTimeout(function () {

                if (textoBoton) {
                    textoBoton.textContent = "Copiar alias";
                }

                mensajeCopia.textContent = "";

            }, 2000);

        } catch (error) {

            // Informamos si la copia automática falla.
            mensajeCopia.textContent =
                "No se pudo copiar. Copiá manualmente: " + alias;

        }

    });

}





// ============================================
// CARRUSEL FOTOGRÁFICO CON FONDO DIFUMINADO
// ============================================

const fotosFondo = document.querySelectorAll(".foto-fondo");
const fotosDifuminadas = document.querySelectorAll(".foto-difuminada");

const imagenesFondo = [
    "img/fondo/foto1.jpg",
    "img/fondo/foto2.jpg",
    "img/fondo/foto3.jpg",
    "img/fondo/foto4.jpg",
    "img/fondo/foto5.jpg",
    "img/fondo/foto6.jpg",
    "img/fondo/foto7.jpg",
    "img/fondo/foto8.jpg",
    "img/fondo/foto9.jpg",
    "img/fondo/foto10.jpg",
    "img/fondo/foto11.jpg",
    "img/fondo/foto12.jpg",
    "img/fondo/foto13.jpg",
    "img/fondo/foto14.jpg",
    "img/fondo/foto15.jpg",
    "img/fondo/foto16.jpg"
];

if (fotosFondo.length >= 2 && fotosDifuminadas.length >= 2) {

    let indiceActual = 0;
    let capaVisible = 0;

    function cargarFoto(indice, capa) {

        const ruta = imagenesFondo[indice];

        fotosFondo[capa].style.backgroundImage = `url("${ruta}")`;
        fotosDifuminadas[capa].style.backgroundImage = `url("${ruta}")`;
    }

    // Mostramos la primera fotografía.
    cargarFoto(indiceActual, capaVisible);

    fotosFondo[capaVisible].classList.add("activa");
    fotosDifuminadas[capaVisible].classList.add("activa");

    // Precargamos las imágenes para suavizar los cambios.
    imagenesFondo.forEach(function (ruta) {
        const imagen = new Image();
        imagen.src = ruta;
    });

    // Cambiamos la fotografía cada cinco segundos.
    setInterval(function () {

        indiceActual = (indiceActual + 1) % imagenesFondo.length;

        const siguienteCapa = capaVisible === 0 ? 1 : 0;

        cargarFoto(indiceActual, siguienteCapa);

        fotosFondo[siguienteCapa].classList.add("activa");
        fotosDifuminadas[siguienteCapa].classList.add("activa");

        fotosFondo[capaVisible].classList.remove("activa");
        fotosDifuminadas[capaVisible].classList.remove("activa");

        capaVisible = siguienteCapa;

    }, 5000);

}
