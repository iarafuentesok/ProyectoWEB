const URL_API =
  "https://restcountries.com/v3.1/all?fields=name,flags,borders,capital,cca3";
let paises = [];
let puntaje = 0;
let correctas = 0;
let incorrectas = 0;
let actual = 0;
const totalPreguntas = 10;
let tiempoInicio;
let tiempos = [];
let preguntas = [];

// Espera a que todo el contenido del DOM esté cargado
document.addEventListener("DOMContentLoaded", async () => {
  const nombreInput = document.getElementById("nombre-jugador");
  const btnEmpezar = document.getElementById("btn-empezar");
  btnEmpezar.disabled = true;
  const pantallaInicio = document.getElementById("pantalla-inicio");
  const main = document.querySelector("main");
  let nombreJugador = "";

  //habilito boton

  nombreInput.addEventListener("input", () => {
    btnEmpezar.disabled = nombreInput.value.trim() === "";
  });

  //valido y comienza el juego
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
    actual = 0;
    mostrarPregunta();
  });
  // Cargar países desde la API usando fetch
  paises = await fetch(URL_API).then((res) => res.json());
  generarPreguntas();
  mostrarPregunta();
  //botones
  document
    .getElementById("siguiente-btn")
    .addEventListener("click", mostrarPregunta);
  document
    .getElementById("reiniciar-btn")
    .addEventListener("click", reiniciarJuego);
  cargarRanking();

  function generarPreguntas() {
    preguntas = [];
    for (let i = 0; i < 10; i++) {
      const tipo = i % 3; //esto alterna entre 0, 1 y 2
      preguntas.push(generarPregunta(tipo));
    }
  }

  function generarPregunta(tipo) {
    const pais = paises[Math.floor(Math.random() * paises.length)];
    let opciones = [];
    let correcta = "";

    switch (tipo) {
      case 0: // Capital → País
        correcta = pais.name.common;
        opciones = obtenerOpciones(correcta, (pais) => pais.name.common);
        return {
          texto: `¿Cuál es el país de la capital "${
            pais.capital?.[0] || "Desconocida"
          }"?`,
          opciones,
          respuesta: correcta,
          puntos: 3,
          tipo: "capital",
        };

      case 1: // Bandera → País
        correcta = pais.name.common;
        opciones = obtenerOpciones(correcta, (pais) => pais.name.common);
        return {
          texto: `¿A qué país pertenece esta bandera?`,
          opciones,
          respuesta: correcta,
          bandera: pais.flags.svg,
          puntos: 5,
          tipo: "bandera",
        };

      case 2: // País → cantidad de fronteras
        const cantidad = pais.borders?.length || 0;
        correcta = cantidad.toString(); // Convierto a texto para comparar después
        opciones = obtenerOpciones(correcta, (p) =>
          (p.borders?.length || 0).toString()
        );
        return {
          texto: `¿Cuántos países limítrofes tiene ${pais.name.common}?`,
          opciones,
          respuesta: correcta,
          puntos: 3,
          tipo: "fronteras",
        };
    }
  }

  function obtenerOpciones(correcta, fn) {
    const opciones = new Set([correcta]); //empiezo con la correcta
    while (opciones.size < 4) {
      const op = fn(paises[Math.floor(Math.random() * paises.length)]);
      opciones.add(op); //agrego opciones hasta tener 4 distintas
    }
    return Array.from(opciones).sort(() => Math.random() - 0.5); //mezcla opciones
  }
  function mostrarPregunta() {
    if (actual >= preguntas.length) return mostrarResultados();

    const pregunta = preguntas[actual];
    const contenedor = document.getElementById("pregunta-texto");
    const opcionesDiv = document.getElementById("opciones");
    const bandera = document.getElementById("bandera");
    const feedback = document.getElementById("feedback");
    const siguienteBtn = document.getElementById("siguiente-btn");

    contenedor.textContent = pregunta.texto;
    opcionesDiv.innerHTML = "";
    feedback.textContent = "";
    siguienteBtn.style.display = "none";

    if (pregunta.tipo === "bandera") {
      bandera.src = pregunta.bandera;
      bandera.style.display = "block";
    } else {
      bandera.style.display = "none";
    }

    pregunta.opciones.forEach(op => {
      const btn = document.createElement("button");
      btn.textContent = op;
      btn.className = "opcion";
      btn.addEventListener("click", () => responder(op));
      opcionesDiv.appendChild(btn);
    });

    tiempoInicio = Date.now();
  }

  function responder(elegida) {
    const pregunta = preguntas[actual];
    const tiempo = Date.now() - tiempoInicio;
    tiempos.push(tiempo);
    const feedback = document.getElementById("feedback");
    const botones = document.querySelectorAll(".opcion");

    botones.forEach(btn => btn.disabled = true);

    if (elegida === pregunta.respuesta) {
      correctas++;
      puntaje += pregunta.puntos;
      feedback.textContent = "¡Correcto!";
      feedback.style.color = "green";
    } else {
      incorrectas++;
      feedback.textContent = `Incorrecto. La respuesta era: ${pregunta.respuesta}`;
      feedback.style.color = "red";
    }

    document.getElementById("siguiente-btn").style.display = "inline-block";
    actual++;
  }
  function mostrarResultados() {
    const totalTiempo = tiempos.reduce((a, b) => a + b, 0) / 1000;
    const promedio = totalTiempo / preguntas.length;
  
    document.getElementById("juego").style.display = "none";
    document.getElementById("resultado").style.display = "block";
  
    document.getElementById("correctas").textContent = correctas;
    document.getElementById("incorrectas").textContent = incorrectas;
    document.getElementById("puntaje").textContent = puntaje;
    document.getElementById("tiempo-total").textContent = totalTiempo.toFixed(2);
    document.getElementById("tiempo-promedio").textContent = promedio.toFixed(2);
  }
  function reiniciarJuego() {
    actual = 0;
    correctas = 0;
    incorrectas = 0;
    tiempos = [];
    puntaje = 0;
  
    document.getElementById("resultado").style.display = "none";
    document.getElementById("juego").style.display = "none";
    pantallaInicio.style.display = "block";
    main.style.display = "none";
  
    document.getElementById("nombre-jugador").value = "";
    document.getElementById("btn-empezar").disabled = true;
  }
});

