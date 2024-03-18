const express = require('express');
const app = express();
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

app.use(express.json({ limit: '10mb' }));
app.use(cors());

const db = new sqlite3.Database('credenciales.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Base de datos conectada');
});

// Ruta para validar credenciales
app.post('/validateContrasena', (req, res) => {
    const { usuario, contrasena } = req.body;

    db.all('SELECT * FROM credenciales WHERE usuario = ? AND contrasena = ?', [usuario, contrasena], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Error de servidor' });
            return;
        }
        if (rows.length > 0) {
            res.json({ validation: true });
        } else {
            res.json({ validation: false });
        }
    });
});

// Ruta para registrar un nuevo usuario
app.post('/register', (req, res) => {
    const { usuario, contrasena } = req.body;

    // Comprueba si ya existe un usuario con el mismo nombre
    db.get('SELECT * FROM credenciales WHERE usuario = ?', [usuario], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Error de servidor' });
            return;
        }
        if (row) {
            // Si ya existe un usuario con el mismo nombre, devuelve un mensaje de error
            res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
        } else {
            // Si no existe un usuario con el mismo nombre, inserta el nuevo usuario en la base de datos
            db.run('INSERT INTO credenciales (usuario, contrasena) VALUES (?, ?)', [usuario, contrasena], function(err) {
                if (err) {
                    console.error(err.message);
                    res.status(500).json({ error: 'Error de servidor' });
                    return;
                }
                console.log(`Nuevo usuario registrado con ID: ${this.lastID}`);
                res.json({ success: true });
            });
        }
    });
});


// Configurar CORS para permitir el encabezado "Content-Type"
//app.options('/validateContrasena', cors());

app.listen(5000, () => console.log('Escuchando en el puerto 5000'));