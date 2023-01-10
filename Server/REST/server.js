//on crée les imports pour l'API REST avec express, mysql, body-parser et cors
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

//on crée une instance de l'API REST avec express
const app = express();

//on crée une instance de la base de données avec mysql
const db = mysql.createConnection({
    host: 'localhost',
    user: 'node',
    password: 'node',
    database: 'projetws'
});

//on connecte la base de données
db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log('Connected to database');
});

//on crée une instance de body-parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

//on crée une instance de cors
const corsOptions = {
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200
}

//écouter sur le port 3001
app.listen('3001', () => {
    console.log('Server started on port 3001');
});

//on crée une route pour récupérer les données de la base de données
app.get('/api/get', cors(corsOptions), (req, res) => {
    let sql = 'SELECT * FROM test';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        res.send(results);
    });
});

//on crée une route pour ajouter des données à la base de données
app.post('/api/post', cors(corsOptions), urlencodedParser, (req, res) => {
    let data = {name: req.body.name, age: req.body.age};
    let sql = 'INSERT INTO test SET ?';
    let query = db.query(sql, data, (err, results) => {
        if(err) throw err;
        res.send(results);
    });
});