const btnEncriptar = document.querySelector(".btn_encriptar");
const txtEncriptar = document.querySelector(".encriptar");
const aviso = document.querySelector(".texto_aviso");
const respuesta = document.querySelector(".evaluar");
const contenido = document.querySelector(".tarjeta_contenedor");
const btnCopiar = document.querySelector(".btn_copiar");
const btnDescencriptar = document.querySelector(".btn_desencriptar");

// Función para mostrar mensajes de aviso
function mostrarAviso(mensaje, clase) {
    aviso.textContent = mensaje;
    aviso.className = clase; // Asigna la clase CSS para el estilo
    setTimeout(() => {
        aviso.className = ""; // Elimina la clase después de un tiempo
    }, 1500);
}

// Función para validar el texto
function validarTexto(texto) {
    // Expresión regular para eliminar caracteres especiales, incluyendo los más comunes
    const textoSinEspeciales = texto.normalize("NFD").replace(/[\p{P}\p{S}\p{M}\p{Z}]/gu, "");
    
    if (texto === "") {
        mostrarAviso("El campo no debe de estar vacío", "aviso-error");
        return false;
    }
    if (texto !== texto.toLowerCase()) {
        mostrarAviso("El texto debe estar todo en minúscula", "aviso-error");
        return false;
    }
    if (texto !== textoSinEspeciales) {
        mostrarAviso("No debe de tener tildes ni caracteres especiales", "aviso-error");
        return false;
    }
    return true;
}

// Evento para encriptar el texto
btnEncriptar.addEventListener("click", e => {
    e.preventDefault();
    const texto = txtEncriptar.value;

    if (validarTexto(texto)) {
        const textoEncriptado = texto
            .replace(/e/g, "enter")
            .replace(/i/g, "imes")
            .replace(/a/g, "ai")
            .replace(/o/g, "ober")
            .replace(/u/g, "ufat");

        respuesta.innerHTML = textoEncriptado;
        btnCopiar.style.visibility = "inherit";
        contenido.remove();
    }
});

// Evento para desencriptar el texto
btnDescencriptar.addEventListener("click", e => {
    e.preventDefault();
    const texto = txtEncriptar.value;

    if (validarTexto(texto)) {
        const textoDesencriptado = texto
            .replace(/enter/g, "e")
            .replace(/imes/g, "i")
            .replace(/ai/g, "a")
            .replace(/ober/g, "o")
            .replace(/ufat/g, "u");

        respuesta.innerHTML = textoDesencriptado;
        btnCopiar.style.visibility = "inherit";
        contenido.remove();
    }
});

// Evento para copiar el texto al portapapeles
btnCopiar.addEventListener("click", e => {
    e.preventDefault();
    const copiar = document.createRange();
    copiar.selectNodeContents(respuesta);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(copiar);
    document.execCommand("copy");
});
