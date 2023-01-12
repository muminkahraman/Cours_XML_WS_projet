const AuthController = require("../controllers/Authcontroller.js");
const VehiclesController = require("../controllers/VehiclesController.js");
const PurshaseController = require("../controllers/PurshaseController.js");
const verifyToken = require("../middleware/auth.js");

module.exports = (app) => {
    app.post('/register',AuthController.register);
    app.post('/login',AuthController.login);
    //With the brand in the object
    app.post("/vehicles",VehiclesController.postVehicles)
    app.get("/vehicles",VehiclesController.getVehicles)
    app.put("/vehicles/:id",VehiclesController.updateVehicle)
    //Delete vehicle, associated with the brand 
    app.delete("/vehicles/:id",VehiclesController.deleteVehicle)

    app.get("/users",AuthController.getUsers);
    app.get("/users/:id",AuthController.getUser);
    app.put("/users/:id",verifyToken,AuthController.updateUser);
    app.delete("/users/:id",verifyToken,AuthController.deleteUser);
    app.put("/users/:id/reset-password",verifyToken,AuthController.resetPassword);

    app.get("/purshase/:id",verifyToken,PurshaseController.getPurshase);
    app.post("/purshase",verifyToken,PurshaseController.postPurshase);
    app.put("/purshase/:id",verifyToken,PurshaseController.updatePurshase);
    app.delete("/purshase/:id",verifyToken,PurshaseController.deletePurshase);

}  