require('dotenv');
//on crée les imports pour l'API REST avec express, mysql, body-parser et cors
const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql');
const port = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const cors = require('cors');
const {sequelize} = require("./models")
//on crée une instance de l'API REST avec express
const app = express();

// //on crée une instance de la base de données avec mysql
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'node',
//     password: 'node',
//     database: 'projetws'
// });

//on connecte la base de données
// db.connect((err) => {
//     if(err) {
//         throw err;
//     }
//     console.log('Connected to database');
// });

//on crée une instance de body-parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

//on crée une instance de cors
const corsOptions = {
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(morgan("combined"));
app.use(bodyParser.json());


// //écouter sur le port 3001
// app.listen('3001', () => {
//     console.log('Server started on port 3001');
// });

require('./routes/routes.js')(app);

// //on crée une route pour récupérer les données de la base de données
// app.get('/api/get', cors(corsOptions), (req, res) => {
//     let sql = 'SELECT * FROM test';
//     let query = db.query(sql, (err, results) => {
//         if(err) throw err;
//         res.send(results);
//     });
// });

app.get('/', auth,(req, res) => {
    res.send({
        message: "Hello World"
    });
})


// //on crée une route pour ajouter des données à la base de données
// app.post('/api/post', cors(corsOptions), urlencodedParser, (req, res) => {
//     let data = {name: req.body.name, age: req.body.age};
//     let sql = 'INSERT INTO test SET ?';
//     let query = db.query(sql, data, (err, results) => {
//         if(err) throw err;
//         res.send(results);
//     });
// });

//Synchronisation avec la base de données
sequelize.sync()
    .then(() => {
        //Ecoute sur le port 3001
        app.listen(port, () => {
        console.log(`Server started on port ${port}`)
        });
    });
