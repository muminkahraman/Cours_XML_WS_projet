require('dotenv').config()
const { Purshase,Brands,Users,Vehicle } = require('../models')

module.exports = {
    async getPurshase(req,res){
        const {id} = req.params
        try{
            const {token} = req.body;
            const user = Users.findOne({
                where: {
                    token: global.token
                }
            })
            if(user){
                const userJson = user.toJSON();
                const purshase = await Purshase.findAll({
                    raw: true,
                    where: {
                        id_users: id
                    }
                })
                if(purshase){
                    delete purshase.id_users;
                    res.status(200).send({
                        purshases: purshase
                    })
                }
                else{
                    res.status(500).send({
                        message: "Une erreur interne est survenue. Veuillez réessayer"
                    })
                }
            }
            else{
                res.status(404).send({
                    message: "L'utilisateur n'a pas été trouvé. Veuillez réessayer"
                })
            }
            
        }
        catch(err){
            res.status(500).send({
                message: "Une erreur interne est survenue. Veuillez réessayer"
            })
        }
    },

    async postPurshase(req,res){
        try{
            const {name,name_brand,immatriculation} = req.body;
            const user = await Users.findOne({
                where: {
                    token: global.token
                }
            })
            if(user){
                const userJson = user.toJSON();
                const vehicle = await Vehicle.findOne({
                    where: {
                        immatriculation: immatriculation
                    }
                })
                if(vehicle){
                    var brand = Brands.findOne({
                        where: {
                            name: name_brand
                        }
                    })
                    if(brand){
                        const brandJson = brand.toJSON();
                        await Purshase.create({
                            id_users: userJson.id_users,
                            name: name,
                            id_brand: brandJson.id_brands,
                            id_vehicle: vehicle.toJSON().id_vehicle
                        }).then(() => {
                            res.status(200).send({
                                message: "L'achat a été enregistré"
                            })
                        })
                    }
                    else{
                        brand = await Brands.create({
                            name: name_brand
                        })
                        if(brand){
                            await Purshase.create({
                                id_users: userJson.id_users,
                                name: name,
                                id_brand: brand.toJSON().id_brands,
                                id_vehicle: vehicle.toJSON().id_vehicle
                            }).then(() => {
                                res.status(200).send({
                                    message: "L'achat a été enregistré"
                                })
                            })
                        }
                    }
                }
                else{
                    res.status(404).send({
                        message: "Le véhicule n'a pas été trouvé !"
                    })
                }
            }
            else{
                res.status(404).send({
                    message: "L'utilisateur n'a pas été trouvé"
                })
            }
        }
        catch(err){
            res.status(500).send({
                message: "Une erreur interne est survenue. Veuillez réessayer."
            })
        }
    },
    async updatePurshase(req,res){
        const {name,name_brand,immatriculation} = req.body;
        try{
            const purshase = await Purshase.findOne({
                where: {
                    name: name
                }
            })
            const vehicle = await Vehicle.findOne({
                where: {
                    immatriculation: immatriculation
                }
            })
            if(purshase && vehicle){
                const purshaseJson = purshase.toJSON();
                await Purshase.update({
                    name_brand: name_brand,
                    immatriculation: immatriculation
                }, {
                    where:{
                        id_purshase: purshaseJson.id_purshase
                    }
                }).then(() => {
                    res.status(200).send({
                        message: "L'achat a été mis à jour"
                    })
                })
            }
            else{
                res.status(500).send({
                    message: "Une erreur interne est survenue. Veuillez réessayer"
                })
            }
        }
        catch(err){
            res.status(500).send({
                message: "Une erreur interne est survenue. Veiillez réessayer " + err
            })
        }
    },
    async deletePurshase(req,res){
        const {id_purshase} = req.params;
        try{
            const purshase = await Purshase.findOne({
                where:{
                    id_purshase: id_purshase
                }
            })
            if(purshase){
                const purshaseDelete = await Purshase.destroy({
                    where: {
                        id_purshase: id_purshase
                    }
                }).then(() => {
                    res.status(200).send({
                        message: "L'achat a été supprimé"
                    })
                })
            }
            else{
                res.status(500).send({
                    message: "Une erreur interne est survenue. Veuillez réessayer"
                })
            }
        }
        catch(err){
            res.status(500).send({
                message: "Une erreur interne est survenue. Veuillez réessayer " + err
            })
        }
    }
}