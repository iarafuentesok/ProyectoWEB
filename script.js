let datosPaises = [];

async function obtenerDatos() {
  try {
    const respuesta = await fetch("https://restcountries.com/v3.1/all");
    const data = await respuesta.json();
    datosPaises = data;
    mostrarPreguntaCapital();
  } catch (error) {
    console.error("Error al obtener datos de países:", error);
  }
}

function mostrarPreguntaCapital() {
  const paisAleatorio = datosPaises[Math.floor(Math.random() * datosPaises.length)];
  const capital = paisAleatorio.capital?.[0];
  const nombreCorrecto = paisAleatorio.name.common;

  if (!capital) {
    mostrarPreguntaCapital(); // Intenta con otro país si no tiene capital
    return;
  }

  const opciones = [nombreCorrecto];
  while (opciones.length < 4) {
    const otroPais = datosPaises[Math.floor(Math.random() * datosPaises.length)].name.common;
    if (!opciones.includes(otroPais)) {
      opciones.push(otroPais);
    }
  }

  opciones.sort(() => Math.random() - 0.5);

  const pregunta = `¿Cuál es el país de la siguiente ciudad capital: ${capital}?`;
  document.getElementById("pregunta").textContent = pregunta;

  const contenedorOpciones = document.getElementById("opciones");
  contenedorOpciones.innerHTML = "";

  opciones.forEach(opcion => {
    const boton = document.createElement("button");
    boton.textContent = opcion;
    boton.onclick = () => {
      if (opcion === nombreCorrecto) {
        alert("¡Correcto!");
      } else {
        alert(`Incorrecto. La respuesta correcta era ${nombreCorrecto}.`);
      }
      document.getElementById("siguiente").style.display = "block";
    };
    contenedorOpciones.appendChild(boton);
  });

  document.getElementById("siguiente").onclick = () => {
    document.getElementById("siguiente").style.display = "none";
    mostrarPreguntaCapital();
  };
}

obtenerDatos();
