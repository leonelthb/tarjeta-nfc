const botonDonaciones = document.getElementById("boton-donaciones");
const contenidoDonaciones = document.getElementById("contenido-donaciones");
const flechaDonaciones = document.getElementById("flecha-donaciones");

if (botonDonaciones && contenidoDonaciones && flechaDonaciones) {
    botonDonaciones.addEventListener("click", function () {
        const expandido = contenidoDonaciones.hidden;
        contenidoDonaciones.hidden = !expandido;
        botonDonaciones.setAttribute("aria-expanded", String(expandido));
        flechaDonaciones.textContent = expandido ? "⌃" : "⌄";
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


const vistaSocial = document.getElementById("vista-social");

if (vistaSocial && typeof vistaSocial.showModal === "function") {
    const perfiles = {
        instagram: {
            nombre: "Instagram",
            descripcion: "Una muestra de mi fotografía callejera.",
            fotos: [1, 5, 9],
        },
        tiktok: {
            nombre: "TikTok",
            descripcion: "Conocé mi trabajo y encontrá mis videos en TikTok.",
            fotos: [2, 7, 14],
        },
    };
    const titulo = document.getElementById("titulo-vista-social");
    const usuario = document.getElementById("usuario-vista-social");
    const descripcion = document.getElementById("descripcion-vista-social");
    const fotos = document.getElementById("fotos-vista-social");
    const enlacePerfil = document.getElementById("enlace-vista-social");
    let enlaceActivo;

    document.querySelectorAll("[data-vista-social]").forEach((enlace) => {
        enlace.setAttribute("aria-haspopup", "dialog");
        enlace.addEventListener("click", (evento) => {
            if (evento.ctrlKey || evento.metaKey || evento.shiftKey || evento.altKey) return;

            const perfil = perfiles[enlace.dataset.vistaSocial];
            const ruta = new URL(enlace.href).pathname.replace(/^[/@]+|\/+$/g, "");

            titulo.textContent = perfil.nombre;
            usuario.textContent = "@" + ruta;
            descripcion.textContent = perfil.descripcion;
            enlacePerfil.href = enlace.href;
            enlacePerfil.textContent = "Ir a " + perfil.nombre;
            fotos.replaceChildren(...perfil.fotos.map((numero) => {
                const foto = document.createElement("img");
                foto.src = "img/fondo/foto" + numero + ".jpg";
                foto.alt = "";
                return foto;
            }));

            enlaceActivo = enlace;
            vistaSocial.showModal();
            evento.preventDefault();
        });
    });

    vistaSocial.addEventListener("click", (evento) => {
        if (evento.target === vistaSocial) {
            const area = vistaSocial.getBoundingClientRect();
            if (evento.clientX < area.left || evento.clientX > area.right ||
                evento.clientY < area.top || evento.clientY > area.bottom) {
                vistaSocial.close();
            }
        }
    });

    vistaSocial.addEventListener("close", () => enlaceActivo?.focus());
}
