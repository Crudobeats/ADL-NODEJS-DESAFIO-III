const express = require('express');
const cors = require('cors');
const pool = require('./dbConfig');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/posts', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM posts');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener los posts:', error);
        res.status(500).json({error: 'Error al obtener los posts'})
    }
});

app.post('/.posts', async (req, res) => {
    const { titulo, img, descripcion } = req.body;

    try {
        const queryText = 'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [titulo, img, descripcion, 0];

        const { rows } = await pool.query(queryText, values);
        res.status(201).json(rows[0]);
    } catch (error) {
        console.error('Error al agregar el post:', error);
        res.status(500).json({error: 'Error al agregar el post'})
    }
});

app.use((err, req, res, next) => {
    console.error('Error no controlado', err);
    res.status(500).json({error: 'Error interno del servidor', error});
});

const port = 3000;
app.listen(port, () => {
    console.log('Servidor iniciado en el puerto' + port);
});