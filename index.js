// Importar módulos
const express = require('express');
const path = require('path');
const fs = require('fs');

// Crear aplicación Express
const app = express();
const port = process.env.PORT || 3000;

// Ruta al archivo de ranking
const RANKING_FILE = path.join(__dirname, 'datos.json');

// --- Middleware ---
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// GET: Retornar el top 20 del ranking, ordenado correctamente
app.get('/ranking', function(req, res) {
  fs.readFile(RANKING_FILE, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.log('Archivo datos.json no encontrado.');
        return res.json([]);
      }
      console.error('Error al leer el archivo del ranking: ', err);
      return res.status(500).json({ error: 'Hubo un error interno del servidor al leer el ranking.' });
    }

    try {
      let ranking = JSON.parse(data);
      if (!Array.isArray(ranking)) {
        console.log('El contenido de datos.json está corrompido.');
        return res.json([]);
      }

      // ✅ Ordenar por puntaje ↓, correctas ↓, tiempo ↑
      ranking.sort((a, b) => {
        if (b.puntaje !== a.puntaje) return b.puntaje - a.puntaje;
        if (b.correctas !== a.correctas) return b.correctas - a.correctas;
        return parseFloat(a.tiempo) - parseFloat(b.tiempo);
      });

      // ✅ Retornar solo el top 20
      const top20 = ranking.slice(0, 20);

      res.json(top20);
    } catch (parseError) {
      console.error('Error al analizar datos.json: ', parseError);
      res.status(500).json({ error: 'Error interno al analizar los datos del ranking.' });
    }
  });
});

// POST: Guardar un nuevo juego
app.post('/partida', (req, res) => {
  const nuevaPartida = req.body;

  if (
    !nuevaPartida ||
    typeof nuevaPartida.jugador !== 'string' ||
    typeof nuevaPartida.puntaje !== 'number' ||
    typeof nuevaPartida.correctas !== 'number' ||
    typeof nuevaPartida.incorrectas !== 'number' ||
    typeof nuevaPartida.tiempo !== 'string' ||
    typeof nuevaPartida.promedio !== 'string'
  ) {
    console.warn('Recibidos datos inválidos en /partida: ', nuevaPartida);
    return res.status(400).json({ error: 'Datos inválidos o incompletos.' });
  }

  fs.readFile(RANKING_FILE, 'utf8', (err, data) => {
    let ranking = [];

    if (err && err.code !== 'ENOENT') {
      console.error('No se pudo leer el ranking: ', err);
      return res.status(500).json({ error: 'Error al leer el ranking.' });
    }

    if (!err && data) {
      try {
        ranking = JSON.parse(data);
        if (!Array.isArray(ranking)) {
          console.error('El ranking actual no es un arreglo.');
          ranking = [];
        }
      } catch (parseError) {
        console.error('Error al analizar el ranking existente: ', parseError);
        return res.status(500).json({ error: 'Ranking corrupto.' });
      }
    }

    ranking.push(nuevaPartida);

    fs.writeFile(RANKING_FILE, JSON.stringify(ranking, null, 2), 'utf8', (writeErr) => {
      if (writeErr) {
        console.error('Error al guardar el juego: ', writeErr);
        return res.status(500).json({ error: 'Falló al guardar el juego.' });
      }

      console.log(`Juego guardado: ${nuevaPartida.jugador}, ${nuevaPartida.puntaje} pts`);
      res.status(201).json({ message: 'Guardado exitosamente' });
    });
  });
});
  // Crear archivo datos.json si no existe
  if (!fs.existsSync(RANKING_FILE)) {
    console.log('Creando archivo datos.json vacío.');
    try {
      fs.writeFileSync(RANKING_FILE, JSON.stringify([], null, 2), 'utf8');
      console.log('Archivo creado.');
    } catch (err) {
      console.error('Error al crear datos.json:', err);
    }
  }
// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
  console.log(`Archivos públicos desde: ${path.join(__dirname, 'public')}`);


});