
const Investments = require("../models/Investments")
const Balance = require("../models/Balance")

class ControllerInvestment{

    async storage(req,res){
        
        try {
            const investment = await Balance.create(req.body)
            
            if(investment){
                return res.status(200).json({message:"Sucess"})
            }

        } catch (error) {

            console.log(error)
                
            return res.status(500).json({message:"Opss.. algo deu errado!"})
        }

    }
    async get(req,res){
        
        try {

            const investments = await Investments.findAll({
                where:{
                    user_id:req.body.user_id
                }
            })

            if(investments.length > 0){
                return res.status(200).json(investments.map(item => item))
            }

            return res.status(404).json({message:"Nenhuma informação foi encontrada!"})

        } catch (error) {

            return res.status(500).json({message:"Opss... algo deu errado!"})
            
        }
    }
    
}

module.exports = new ControllerInvestment()