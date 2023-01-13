require('dotenv').config()
const request = require("request");

const { Brands,Vehicle } = require('../models')

module.exports = {
    async getCars(req,res){
        const {fuel_type} = req.body;
        //get cars from api ninjas
        request.get({
            url: 'https://api.api-ninjas.com/v1/cars?limit=2&fuel_type=' + fuel_type,
            headers: {
                'X-Api-Key' : 'z/aXGPFHzVBhlq10Oyaaqg==YQ8i1AOdHQTrO2dV'
            }
        }, async function(error,response,body){
            body = JSON.parse(body); 

            let brand;
            let vehicle;
            for(let i = 0;i<body.length;i++){
                brand = await Brands.findOne({
                    where: {
                        name: body[i]["make"]
                    }
                })
                if(!brand){
                    brand = await Brands.create({
                        name: body[i]["make"] 
                    })
                    if(brand){
                        await Vehicle.create({
                            date_of_immat: body[i]["year"],
                            immatriculation: "AF-123-456",
                            id_brands: brand.toJSON().id_brands
                        })
                    }
                }
                else{
                    await Vehicle.create({
                        date_of_immat: body[i]["year"],
                        immatriculation: "AF-123-456",
                        id_brands: brand.toJSON().id_brands
                    })
                }
            }
            if(error) return console.error('Request failed:', error);
            else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
            else res.status(200).send({
                data: body
            })
        })
    }
}