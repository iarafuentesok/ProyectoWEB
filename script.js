const URL_API = 'https://restcountries.com/v3.1/all?fields=name,flags,borders,capital,cca3';
let paises = [];
let puntaje = 0;
let correctas = 0;
let incorrectas = 0;
let actual = 0;
const totalPreguntas = 10;
let tiempoInicio;
let tiempos= [];
let preguntas = [];

document.addEventListener("DOMContentLoaded", async() => {
    const nombreInput = document.getElementById("nombre-jugador");
    const btnEmpezar = document.getElementById("btn-empezar");
    const pantallaInicio = document.getElementById("pantalla-inicio");
    const main = document.querySelector("main");
    let nombreJugador = "";
  
    nombreInput.addEventListener("input", () => {
      btnEmpezar.disabled = nombreInput.value.trim() === "";
    });
  
    document.getElementById("form-inicio").addEventListener("submit", (e) => {
      e.preventDefault();
      const nombre = nombreInput.value.trim();
      const errorSpan = document.getElementById("error-nombre");

      if (nombre.length < 3) {
        errorSpan.textContent = "El nombre debe tener al menos 3 caracteres.";
        errorSpan.style.display = "inline";
        return;
      }
  
      errorSpan.style.display = "none";
      nombreJugador = nombre;
      pantallaInicio.style.display = "none";
      main.style.display = "block";
      document.getElementById("resultado").style.display = "none";
      document.getElementById("juego").style.display = "block";
  
      generarPreguntas(); 
    });
  });
  

// async function obtenerDatos() {
//   try {
//     const respuesta = await fetch("https://restcountries.com/v3.1/all");
//     const data = await respuesta.json();
//     datosPaises = data;
//     mostrarPreguntaCapital();
//   } catch (error) {
//     console.error("Error al obtener datos de países:", error);
//   }
// }

// function mostrarPreguntaCapital() {
//   const paisAleatorio = datosPaises[Math.floor(Math.random() * datosPaises.length)];
//   const capital = paisAleatorio.capital?.[0];
//   const nombreCorrecto = paisAleatorio.name.common;

//   if (!capital) {
//     mostrarPreguntaCapital(); // Intenta con otro país si no tiene capital
//     return;
//   }

//   const opciones = [nombreCorrecto];
//   while (opciones.length < 4) {
//     const otroPais = datosPaises[Math.floor(Math.random() * datosPaises.length)].name.common;
//     if (!opciones.includes(otroPais)) {
//       opciones.push(otroPais);
//     }
//   }

//   opciones.sort(() => Math.random() - 0.5);

//   const pregunta = `¿Cuál es el país de la siguiente ciudad capital: ${capital}?`;
//   document.getElementById("pregunta").textContent = pregunta;

//   const contenedorOpciones = document.getElementById("opciones");
//   contenedorOpciones.innerHTML = "";

//   opciones.forEach(opcion => {
//     const boton = document.createElement("button");
//     boton.textContent = opcion;
//     boton.onclick = () => {
//       if (opcion === nombreCorrecto) {
//         alert("¡Correcto!");
//       } else {
//         alert(`Incorrecto. La respuesta correcta era ${nombreCorrecto}.`);
//       }
//       document.getElementById("siguiente").style.display = "block";
//     };
//     contenedorOpciones.appendChild(boton);
//   });

//   document.getElementById("siguiente").onclick = () => {
//     document.getElementById("siguiente").style.display = "none";
//     mostrarPreguntaCapital();
//   };
// }

// obtenerDatos();
