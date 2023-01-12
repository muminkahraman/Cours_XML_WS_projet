require('dotenv').config()
const { Vehicle,Brands } = require('../models')

module.exports = {
    async getVehicles(req,res){
        try{
            await Vehicle.findAll({
                raw: true
            }).then((vehicles) => {
                delete vehicles.id_vehicle;
                delete vehicles.id_brands
                res.status(200).send({
                    vehicles: vehicles
                })
            })
        }
        catch(err){
            res.status(500).send({
                message: "Une erreur interne est survenue. Veuillez réessayer " + err
            })
        }
    },

    async postVehicles(req,res){
        const {date_of_immatriculation,immatriculation,name_brand} = req.body
        try{
            let brand = await Brands.findOne({
                where: {
                    name: name_brand 
                }
            })
            if(brand){
                await Vehicle.create({
                    name_brand: name_brand,
                    immatriculation: immatriculation,
                    date_of_immat: date_of_immatriculation,
                    id_brands: brand.toJSON().id_brands
                }).then(() => {
                    res.status(200).send({
                        message: "Le véhicule a été créé"
                    })
                })
            }
            else{
                brand = await Brands.create({
                    name: name_brand
                })
                if(brand){
                    await Vehicle.create({
                        name_brand: name_brand,
                        immatriculation: immatriculation,
                        date_of_immat: date_of_immatriculation,
                        id_brands: brand.toJSON().id_brands
                    }).then(() => {
                        res.status(200).send({
                            message: "Le véhicule a été créé"
                        })
                    })
                }
                else{
                    res.status(500).send({
                        message: "Une erreur interne est survenue. Veuillez réessayer"
                    })
                }
                
            }
        }
        catch(err){
            res.status(500).send({
                message: "Une erreur interne est survenue. Veuillez réessayer " + err
            })
        }
    },
    async updateVehicle(req,res){
        let {last_immatriculation,new_immatriculation,date_of_immatriculation,name_brand} = req.body;
        try{
            const vehicle = await Vehicle.findOne({
                where: {
                    immatriculation: last_immatriculation
                }
            })
            if(vehicle){
                const vehicleJson = vehicle.toJSON();
                if(!new_immatriculation){
                    new_immatriculation = last_immatriculation;
                }
                if(!date_of_immatriculation){
                    date_of_immatriculation = vehicleJson.date_of_immat;
                }
                if(!name_brand){
                    name_brand = vehicleJson.name_brand;
                }
                await Vehicle.update({
                    date_of_immat: date_of_immatriculation,
                    immatriculation: new_immatriculation,
                    name_brand: name_brand
                }, {
                    where: {
                        immatriculation: last_immatriculation
                    }
                }).then(() => {
                    res.status(200).send({
                        message: "Le véhicule a été mis à jour"
                    })
                })
            }   
            else{
                res.status(404).send({
                    message: "Le véhicule n'a pas été trouvé. Veuillez réessayer."
                })
            }
        }
        catch(err){
            res.status(500).send({
                message: "Une erreur interne est survenue. Veuillez réessayer " + err
            })
        }
    },
    async deleteVehicle(req,res){
        const {id} = req.params
        try{
            await Vehicle.destroy({
                where: {
                    id_vehicle: id
                }
            }).then(() => {
                res.status(200).send({
                    message: "Le véhicule a été supprimé."
                })
            })
        }
        catch(err){
            res.status(500).send({
                message: "Une erreur interne est survenue. Veuillez réessayer " + err
            })
        }
    }
}