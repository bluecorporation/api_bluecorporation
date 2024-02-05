
const UsersPanel = require('../models/UsersPanel')
const Balance = require("../models/Balance")
const { Op } = require('sequelize');

const jwt = require('jsonwebtoken')

class ControllerPanel {
    async storage(req, res) {
        try {

            const existsUser = await UsersPanel.findAll({
                where: {
                    mail: req.body.mail,
                }
            })

            if (existsUser.length > 0 ){
                return res.status(400).json({ message: "Opss.. usuário já existente" })
            }

            const user = await UsersPanel.create(req.body)
            
            const { id, name, mail } = user

            const balance = await Balance.create({
                balance:0,
                user_id:id
            })


            console.log(balance)

            if (user)
                return res.status(200).json({
                    user: {
                        id,
                        name,
                        mail,
                    },
                    token: jwt.sign({ id }, process.env.PANEL_TOKEN, {
                        expiresIn: '7d'
                    }), message: "Usuário criado com sucesso!"
                })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "Opss.. algo deu errado" })

        }
    }
    async getUsers(req, res) {

        try {

            const users = await UsersPanel.findAll()

            if (users.length > 0) {
                return res.status(200).json(users.map(item => item))
            }

            return res.status(404).json({ message: "Nenhum usuário foi encontrado!" })


        } catch (error) {

            return res.status(500).json({ message: "Opss.. algo deu errado" })

        }

    }
    async getUserById(req,res){

        try {

            const users = await UsersPanel.findAll({
                where:{
                    id:req.params.id
                }
            })

            if (users.length > 0) {
                return res.status(200).json(users.map(item => item))
            }

            return res.status(404).json({ message: "Nenhum usuário foi encontrado!" })


        } catch (error) {

            return res.status(500).json({ message: "Opss.. algo deu errado" })

        }


        
    }
    async getUserByName(req,res){

        try {

            const users = await UsersPanel.findAll({
                where:{
                    
                    name: {
                        [Op.like]: `%${req.params.id}%`
                      }

                }
            })

            if (users.length > 0) {
                return res.status(200).json(users.map(item => item))
            }   

            return res.status(404).json({ message: "Nenhum usuário foi encontrado!" })


        } catch (error) {

            return res.status(500).json({ message: "Opss.. algo deu errado" })

        }


        
    }
    async updateById(req,res){
        try {

            const update = await UsersPanel.update({

                "name": req.body.name,
                "mail": req.body.mail,
                "permission": req.body.permission,
                "password_hash": req.body.password_hash,

            },{
                where:{
                    id:req.body.id
                }
            })

            if(update.length > 0){
                return res.status(200).json({message:"Usuário alterado com sucesso!"})
            }
            

            
        } catch (error) {
            return res.status(500).json({message:"Opss... algo deu errado!"})
        }
    }

    async removeUser(req,res){
        try {

            const user = await UsersPanel.destroy({
                where:{
                    id:req.params.id
                }
            })

            if(user.length > 0){
                return res.status(200).json({message:"Usuário deletado com sucesso!"})
            }

            return res.status(404).json({message:"Usuário não foi encontrado!"})

            
        } catch (error) {
            console.log(error)
            return res.status(500).json({message:"Opss.. algo deu errado!"})
            
        }
    }

}

module.exports = new ControllerPanel()
