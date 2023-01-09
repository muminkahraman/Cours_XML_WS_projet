const express = require("express");
const soap = require("soap");
const mysql = require("mysql");
const bodyParser = require("body-parser");

// Création de l'application Express
const app = express();

// Définition du fichier WSDL
const xml = require("fs").readFileSync("wsdl.xml", "utf8");

// Création de la connection à la base de données MySQL
const connection = mysql.createConnection({
  host: "localhost",
  user: "node",
  password: "node",
  database: "projetws",
});

// Connexion à la base de données MySQL
connection.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Connected to MySQL database");
  }
});

//body parser middleware are supported (optional)
app.use(
  bodyParser.raw({
    type: function () {
      return true;
    },
    limit: "5mb",
  })
);
app.listen(8001, function () {
  //Note: /wsdl route will be handled by soap module
  //and all other routes & middleware will continue to work
  soap.listen(app, "/wsdl", service, xml, function () {
    console.log("server initialized");
  });
});

// Définition du service SOAP
const service = {
  PurchaseService: {
    PurchasePort: {
      // Méthode pour récupérer les données d'un achat
      getPurchase: (args) => {
        // Récupération de l'achat de la base de données MySQL
        const query = "SELECT * FROM purchases WHERE id = ?";
        return new Promise((resolve, reject) => {
          connection.query(query, [args.id], (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve({
                purchase: results[0],
              });
            }
          });
        });
      },
      // Méthode pour ajouter un nouvel achat
      addPurchase: (args) => {
        // Ajout du nouvel achat dans la base de données MySQL
        const query =
          "INSERT INTO purchases (item, price, quantity) VALUES (?, ?, ?)";
        return new Promise((resolve, reject) => {
          connection.query(
            query,
            [args.item, args.price, args.quantity],
            (error, results) => {
              if (error) {
                reject(error);
              } else {
                resolve({
                  id: results.insertId,
                });
              }
            }
          );
        });
      },
      // Méthode pour mettre à jour les données d'un achat
      updatePurchase: (args) => {
        // Mise à jour des données de l'achat dans la base de données MySQL
        const query =
          "UPDATE purchases SET item = ?, price = ?, quantity = ? WHERE id = ?";
        return new Promise((resolve, reject) => {
          connection.query(
            query,
            [args.item, args.price, args.quantity, args.id],
            (error, results) => {
              if (error) {
                reject(error);
              } else {
                resolve();
              }
            }
          );
        });
      },
      // Méthode pour supprimer un achat
      deletePurchase: (args) => {
        // Suppression de l'achat de la base de données MySQL
        const query = "DELETE FROM purchases WHERE id = ?";
        return new Promise((resolve, reject) => {
          connection.query(query, [args.id], (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          });
        });
      },
    },
  },
  VehicleService: {
    VehiclePort: {
      // Méthode pour récupérer les données d'un véhicule
      getVehicle: (args) => {
        // Récupération du véhicule de la base de données MySQL
        const query = "SELECT * FROM vehicles WHERE id = ?";
        return new Promise((resolve, reject) => {
          connection.query(query, [args.id], (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve({
                vehicle: results[0],
              });
            }
          });
        });
      },
      // Méthode pour ajouter un nouveau véhicule
      addVehicle: (args) => {
        // Ajout du nouveau véhicule dans la base de données MySQL
        const query =
          "INSERT INTO vehicles (brand, model, price) VALUES (?, ?, ?)";
        return new Promise((resolve, reject) => {
          connection.query(
            query,
            [args.brand, args.model, args.price],
            (error, results) => {
              if (error) {
                reject(error);
              } else {
                resolve({
                  id: results.insertId,
                });
              }
            }
          );
        });
      },
      // Méthode pour mettre à jour les données d'un véhicule
      updateVehicle: (args) => {
        // Mise à jour des données du véhicule dans la base de données MySQL
        const query =
          "UPDATE vehicles SET brand = ?, model = ?, price = ? WHERE id = ?";
        return new Promise((resolve, reject) => {
          connection.query(
            query,
            [args.brand, args.model, args.price, args.id],
            (error, results) => {
              if (error) {
                reject(error);
              } else {
                resolve();
              }
            }
          );
        });
      },
      // Méthode pour supprimer un véhicule
      deleteVehicle: (args) => {
        // Suppression du véhicule de la base de données MySQL
        const query = "DELETE FROM vehicles WHERE id = ?";
        return new Promise((resolve, reject) => {
          connection.query(query, [args.id], (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          });
        });
      },
    },
  },
  BrandService: {
    BrandPort: {
      // Méthode pour récupérer les données d'une marque
      getBrand: (args) => {
        // Récupération de la marque de la base de données MySQL
        const query = "SELECT * FROM brands WHERE id = ?";
        return new Promise((resolve, reject) => {
          connection.query(query, [args.id], (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve({
                brand: results[0],
              });
            }
          });
        });
      },
      // Méthode pour ajouter une nouvelle marque
      addBrand: (args) => {
        // Ajout de la nouvelle marque dans la base de données MySQL
        const query = "INSERT INTO brands (name) VALUES (?)";
        return new Promise((resolve, reject) => {
          connection.query(query, [args.name], (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve({
                id: results.insertId,
              });
            }
          });
        });
      },
      // Méthode pour mettre à jour les données d'une marque
      updateBrand: (args) => {
        // Mise à jour des données de la marque dans la base de données MySQL
        const query = "UPDATE brands SET name = ? WHERE id = ?";
        return new Promise((resolve, reject) => {
          connection.query(query, [args.name, args.id], (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          });
        });
      },
      // Méthode pour supprimer une marque
      deleteBrand: (args) => {
        // Suppression de la marque de la base de données MySQL
        const query = "DELETE FROM brands WHERE id = ?";
        return new Promise((resolve, reject) => {
          connection.query(query, [args.id], (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          });
        });
      },
    },
  },
  ClientService: {
    ClientPort: {
      // Méthode pour récupérer les données d'un client
      getClient: (args) => {
        // Récupération du client de la base de données MySQL
        const query = "SELECT * FROM clients WHERE id = ?";
        return new Promise((resolve, reject) => {
          connection.query(query, [args.id], (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve({
                client: results[0],
              });
            }
          });
        });
      },
      // Méthode pour ajouter un nouveau client
      addClient: (args) => {
        // Ajout du nouveau client dans la base de données MySQL
        const query = "INSERT INTO clients (name) VALUES (?)";
        return new Promise((resolve, reject) => {
          connection.query(query, [args.name], (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve({
                id: results.insertId,
              });
            }
          });
        });
      },
      // Méthode pour mettre à jour les données d'un client
      updateClient: (args) => {
        // Mise à jour des données du client dans la base de données MySQL
        const query = "UPDATE clients SET name = ? WHERE id = ?";
        return new Promise((resolve, reject) => {
          connection.query(query, [args.name, args.id], (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          });
        });
      },
      // Méthode pour supprimer un client
      deleteClient: (args) => {
        // Suppression du client de la base de données MySQL
        const query = "DELETE FROM clients WHERE id = ?";
        return new Promise((resolve, reject) => {
          connection.query(query, [args.id], (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          });
        });
      },
    },
  },
  ModelService: {
    ModelPort: {
      // Méthode pour récupérer les données d'un modèle
      getModel: (args) => {
        // Récupération du modèle de la base de données MySQL
        const query = "SELECT * FROM models WHERE id = ?";
        return new Promise((resolve, reject) => {
          connection.query(query, [args.id], (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve({
                model: results[0],
              });
            }
          });
        });
      },
      // Méthode pour ajouter un nouveau modèle
      addModel: (args) => {
        // Ajout du nouveau modèle dans la base de données MySQL
        const query = "INSERT INTO models (name) VALUES (?)";
        return new Promise((resolve, reject) => {
          connection.query(query, [args.name], (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve({
                id: results.insertId,
              });
            }
          });
        });
      },
      // Méthode pour mettre à jour les données d'un modèle
      updateModel: (args) => {
        // Mise à jour des données du modèle dans la base de données MySQL
        const query = "UPDATE models SET name = ? WHERE id = ?";
        return new Promise((resolve, reject) => {
          connection.query(query, [args.name, args.id], (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          });
        });
      },
      // Méthode pour supprimer un modèle
      deleteModel: (args) => {
        // Suppression du modèle de la base de données MySQL
        const query = "DELETE FROM models WHERE id = ?";
        return new Promise((resolve, reject) => {
          connection.query(query, [args.id], (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          });
        });
      },
    },
  },
};

// requetes front end pour le service client
