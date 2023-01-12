require('dotenv').config()
const { Users } = require('../models')
const jwt = require('jsonwebtoken');
const crypto = require("crypto")
const bcrypt = require('bcrypt');

function jwtSignUser(user) {
    //Using the secret key in order to enforce the security of the token
    const secretKey = process.env.JWT_SECRET
    //We generate the secretKey
    //Creation of the token whose validity is 24 hours long
    const token = jwt.sign({
        username: user.mail_address,
        firstname: user.first_name,
        lastname: user.last_name
    },
    secretKey,{
        expiresIn: "24h"
    })
    if(token){
        // We create the hash sha256 using the TOKEN_KEY
        const sha256Hasher = crypto.createHmac("sha256",process.env.JWT_SECRET);
        if(sha256Hasher){
            //We hash our token
            const tokenHashed = sha256Hasher.update(token).digest("hex");
            user = Users.update({
                token: tokenHashed
            }, {
                where: {
                    mail_address: user.mail_address,
                }
            })
            if(user){
                return token
            }
        }
    }
}

module.exports = {
    async register(req,res){
        const {first_name,last_name,password,date_of_birth,mail_address} = req.body;
        try{
            const user = await Users.create({
                first_name: first_name,
                last_name: last_name,
                password: password,
                date_of_birth: date_of_birth,
                mail_address: mail_address
            })
            if(user){
                const userJson = user.toJSON();
                const token = jwtSignUser(userJson);
                res.status(200).send({
                    first_name: userJson.first_name,
                    last_name: userJson.last_name,
                    date_of_birth: userJson.date_of_birth,
                    mail_address: userJson.mail_address,
                    token: token
                })
            }
            else{
                res.status(500).send({
                    message: "Une erreur interne est survenue. Veuillez réessayer."
                })
            }
        } 
        catch(err){
            res.status(500).send({
                message: "Une erreur interne est survenue. Veuillez réessayer."
            })
        }
    },

    async login(req,res){
        try{
            const {email,password} = req.body
            const user = await Users.findOne({
                where:{
                    mail_address: email,
                }
            })
            if(user){
                await user.comparePassword(password).then(isMatch => {
                    if (!isMatch) {
                        res.status(401).send({
                            message: "L'utilisateur n'a pas été trouvé. Veuillez réessayer"
                        });
                    }
                    else{
                        const userJson = user.toJSON();
                        const token = jwtSignUser(userJson);
                        global.token = token;
                        
                        res.status(200).send({
                            token: token,
                            first_name: userJson.first_name,
                            last_name: userJson.last_name,
                            date_of_birth: userJson.date_of_birth,
                            mail_address: userJson.mail_address,
                            message: "Vos identifiants sont corrects"
                        });
                        
                    }
                }) 
            }
            else{
                res.status(404).send({
                    message: "L'utilisateur n'a pas été trouvé. Veuillez réessayer"
                })
            }
        }
        catch(err){
            res.status(500).send({
                message: "Une erreur interne est survenue. Veuillez réessayer " + err
            })
        }
    },

    async getUsers(req,res){
        try{
            const users = await Users.findAll({
                raw: true
            })
            if(users){
                //delete password and token for all user in order to not display it
                for(let i = 0;i<users.length;i++){
                    delete users[i].password
                    delete users[i].token
                }
                res.status(200).send({
                    users: users
                })

            }
            else{
                res.status(500).send({
                    message: "Une erreur interne est survenue. Veuillez réessayer."
                })
            }
        }
        catch(err){
            res.status(500).send({
                message: "Une erreur interne est survenue. Veuillez réessayer : " + err
            })
        }
    },
    async getUser(req,res){
        const {id} = req.params
        try{
            const user = await Users.findOne({
                where: {
                    id_users: id
                }
            })
            if(user){
                const userJson = user.toJSON();
                delete userJson.token;
                delete userJson.password;
                
                res.status(200).send({
                    user: userJson
                })
            }
            else{
                res.status(404).send({
                    message: "L'utilisateur n'a pas été trouvé."
                })
            }
        }
        catch(err){
            res.status(500).send({
                message: "Une erreur interne est survenue. Veuillez réessayer " + err
            })
        }
    },

    async updateUser(req,res){
        const {first_name,last_name,mail_address} = req.body;
        const {id} = req.params;
        try{
            const user = await Users.findOne({
                where: {
                    id_users: id,
                    token: global.token
                }
            })
            if(user){
                const userJson = user.toJSON();
                if(!first_name){
                    first_name = userJson.first_name;
                }
                if(!last_name){
                    last_name = userJson.last_name;
                }
                if(!mail_address){
                    mail_address = userJson.mail_address
                }
                await Users.update({
                    first_name: first_name,
                    last_name: last_name,
                    mail_address: mail_address
                }, {
                    where: {
                        id_users: id
                    }
                }).then(() => {
                    res.status(200).send({
                        message: "L'utilisateur a été mis à jour !"
                    })
                })
                
            }
            else{
                res.status(404).send({
                    message: "L'utilisateur n'a pas été trouvé. Veuillez réessayer."
                })
            }
        }
        catch(err){
            res.status(500).send({
                message: "Une erreur interne est survenue. Veuillez réessayer. " + err
            })
        }
    },

    async deleteUser(req,res){
        const {id} = req.params;
        try{
            const user = await Users.findOne({
                where: {
                    id_users: id,
                    token: global.token
                }
            })
            if(user){
                await Users.destroy({
                    where:{
                        id_users: id
                    }
                }).then(() => {
                    res.status(200).send({
                        message: "L'utilisateur a été supprimé !"
                    })
                })
            }
            else{
                res.status(404).send({
                    message: "Utilisateur non trouvé."
                })
            }
        }
        catch(err){
            res.status(500).send({
                message: "Une erreur interne est survenue. Veuillez réessayer " + err
            })
        }
    },
    async resetPassword(req,res){
        const {password,token} = req.body;
        try{
            const {id} = req.params;
            const user = await Users.findOne({
                where: {
                    id_users: id,
                    token: global.token
                }
            })
            if(user){
                let sha256Hasher = crypto.createHmac("sha256",process.env.JWT_SECRET);
                if(sha256Hasher){
                    const tokenHashed = sha256Hasher.update(token).digest("hex");
                    await Users.update({
                        password: password,
                        token: tokenHashed
                    }, {
                        where: {
                            id_users: id
                        },
                        individualHooks: true
                    }).then(() => {
                        res.status(200).send({
                            message: "Le mot de passe a été réinitialisé !"
                        })
                    })
                }
                else{
                    res.status(500).send({
                        message: "Une erreur interne est survenue. Veuillez réessayer"
                    })
                }
            }
            else{
                res.status(500).send({
                    message: "Une erreur est survenue. Veuillez réessayer."
                })
            }
        }
        catch(err){
            res.status(500).send({
                message: "Une erreur interne est survenue. Veuillez réessayer"
            })
        }
    }   
}

