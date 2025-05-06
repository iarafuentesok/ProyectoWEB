Juego de Países - Proyecto Final
Este proyecto es un juego increíble de preguntas y respuestas basado en datos reales de países, conseguidos por medio de la API de código abierto [REST Countries](https://restcountries.com/). Fue desarrollado como trabajo práctico integrador de la materia WEB 2, cumpliendo todos los requisitos funcionales exigidos.

Descripción del Juego
El juego consiste en responder 10 preguntas relacionadas con países. Hay 3 tipos posibles de preguntas:
¿Cuál es el país de la siguiente ciudad capital? (3 puntos)
¿A qué país representa esta bandera? (5 puntos)
¿Cuántos países limítrofes tiene el siguiente país? (3 puntos)
Las preguntas muestran 4 opciones posibles. El usuario puede ver una respuesta inmediata y cuando termina la partida puede ver su rendimiento, esto es:
• Cuantas respuestas correctas e incorrectas realizaron.
• Su puntaje total.
• El tiempo total de su partida.
• El tiempo promedio por pregunta.

Inspiración y diseño:
Este juego lo pensé como si fuera un minijuego dentro de un juego más grande orientado a chicas, que incluye distintas actividades. Por eso, opté por una temática visual rosa, amigable y divertida, que busca hacer más atractivo el aprendizaje sobre geografía y países.

Ranking:
Se almacena un ranking de las 20 mejores partidas, ordenadas por:
• Puntaje
• Cantidad de respuestas correctas
• Tiempo de finalización

Tecnologías utilizadas
• Backend: Node.js con Express
• Base de datos: archivo local datos.json
• Front-end: HTML, CSS y JavaScript (sin frameworks)
• API: ([REST Contruies](https://restcountries.com/))
• Deploy: servidor real en Internet

Dependencias y versiones utilizadas
• Node.js: v22.15.0 (versión utilizada para desarrollo y pruebas)
• Express: ^5.1.0
• CORS: ^2.8.5

Requisitos de entrega (cumplidos)
• Repositorio con historial de commits detallado
• Aplicación desplegada en un servidor real
• Video de demostración de 7 minutos
• Cumplimiento completo de las US solicitadas:
US1: Pueden tocarme tres tipos diferentes de preguntas:
¿Cuál es el país de la siguiente ciudad capital? (3 puntos)
El país xx está representado por la siguiente bandera ¿? (5 puntos)
¿Cuántos países limítrofes tiene el siguiente país? (3 puntos)
US2: Puedo seleccionar una respuesta entre 4 opciones
US3: Cuando yo respondo correctamente la aplicación me lo dice y puedo moverme a la siguiente pregunta.
US4: Cuando yo respondo incorrectamente la aplicación me índica del error, me dice cuál es la respuesta correcta y puedo continuar con otra pregunta.
US5: Cuando termino de contestar las preguntas (10 en total), el sistema me brinda información sobre la cantidad de preguntas respondidas correcta e incorrectamente, la duración total de la partida y el tiempo promedio tardado en responder cada pregunta.
US6: Puedo acceder a un ranking de las mejores 20 partidas ordenados por puntaje, cantidad de respuestas y tiempos de finalización.

Enlaces importantes
• 🔗 [Respositorio en Github](https://github.com/iarafuentesok/ProyectoWEB.git)
• 🌐 [Aplicacion en vivo](https://proyectoweb-r1ok.onrender.com/)
• 🎥 [Video de demostración](https://www.youtube.com/watch?v=7w9HDROgn80&ab_channel=IaraNievas)
