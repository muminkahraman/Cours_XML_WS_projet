//on crée les routes pour les vehicles qui sont dans la base de données mysql
app.get("/api/vehicles", cors(corsOptions), (req, res) => {
  let sql = "SELECT * FROM vehicles";
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.get("/api/vehicles/:id", cors(corsOptions), (req, res) => {
  let sql = `SELECT * FROM vehicles WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.post("/api/vehicles", cors(corsOptions), (req, res) => {
  let data = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
  };
  let sql = "INSERT INTO vehicles SET ?";
  let query = db.query(sql, data, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.put("/api/vehicles/:id", cors(corsOptions), (req, res) => {
  let sql = `UPDATE vehicles SET name = '${req.body.name}', description = '${req.body.description}', price = '${req.body.price}', image = '${req.body.image}' WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.delete("/api/vehicles/:id", cors(corsOptions), (req, res) => {
  let sql = `DELETE FROM vehicles WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

//on crée les routes pour les brands qui sont dans la base de données mysql
app.get("/api/brands", cors(corsOptions), (req, res) => {
  let sql = "SELECT * FROM brands";
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.get("/api/brands/:id", cors(corsOptions), (req, res) => {
  let sql = `SELECT * FROM brands WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.post("/api/brands", cors(corsOptions), (req, res) => {
  let data = {
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
  };
  let sql = "INSERT INTO brands SET ?";
  let query = db.query(sql, data, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.put("/api/brands/:id", cors(corsOptions), (req, res) => {
  let sql = `UPDATE brands SET name = '${req.body.name}', description = '${req.body.description}', image = '${req.body.image}' WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.delete("/api/brands/:id", cors(corsOptions), (req, res) => {
  let sql = `DELETE FROM brands WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

//on crée les routes pour les models qui sont dans la base de données mysql
app.get("/api/models", cors(corsOptions), (req, res) => {
  let sql = "SELECT * FROM models";
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.get("/api/models/:id", cors(corsOptions), (req, res) => {
  let sql = `SELECT * FROM models WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.post("/api/models", cors(corsOptions), (req, res) => {
  let data = {
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
  };
  let sql = "INSERT INTO models SET ?";
  let query = db.query(sql, data, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.put("/api/models/:id", cors(corsOptions), (req, res) => {
  let sql = `UPDATE models SET name = '${req.body.name}', description = '${req.body.description}', image = '${req.body.image}' WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.delete("/api/models/:id", cors(corsOptions), (req, res) => {
  let sql = `DELETE FROM models WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

//on crée les routes pour les users qui sont dans la base de données mysql
app.get("/api/users", cors(corsOptions), (req, res) => {
  let sql = "SELECT * FROM users";
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.get("/api/users/:id", cors(corsOptions), (req, res) => {
  let sql = `SELECT * FROM users WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.post("/api/users", cors(corsOptions), (req, res) => {
  let data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  let sql = "INSERT INTO users SET ?";
  let query = db.query(sql, data, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.put("/api/users/:id", cors(corsOptions), (req, res) => {
  let sql = `UPDATE users SET name = '${req.body.name}', email = '${req.body.email}', password = '${req.body.password}' WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.delete("/api/users/:id", cors(corsOptions), (req, res) => {
  let sql = `DELETE FROM users WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

//on crée les routes pour les purchase qui sont dans la base de données mysql
app.get("/api/purchase", cors(corsOptions), (req, res) => {
  let sql = "SELECT * FROM purchase";
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.get("/api/purchase/:id", cors(corsOptions), (req, res) => {
  let sql = `SELECT * FROM purchase WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.post("/api/purchase", cors(corsOptions), (req, res) => {
  let data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  let sql = "INSERT INTO purchase SET ?";
  let query = db.query(sql, data, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.put("/api/purchase/:id", cors(corsOptions), (req, res) => {
  let data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  let sql = `UPDATE purchase SET ? WHERE id = ${req.params.id}`;
  let query = db.query(sql, data, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.delete("/api/purchase/:id", cors(corsOptions), (req, res) => {
  let sql = `DELETE FROM purchase WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});
