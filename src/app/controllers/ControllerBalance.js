const Balance = require("../models/Balance");
const cron = require('node-cron');

class ControllerBalance {

    constructor() {
        // Agendar a tarefa de rendimento diário para 00:00
        cron.schedule('0 0 * * 1-5', () => this.executarRendimentoDiario());
    }

    async executarRendimentoDiario() {
        try {
            console.log('Tarefa de rendimento diário iniciada às 00:00.');
            await this.calcularRendimentoDiario();
            console.log('Tarefa de rendimento diário concluída.');
        } catch (error) {
            console.error('Erro na tarefa de rendimento diário:', error);
        }
    }

    async calcularRendimentoDiario() {
        try {
            const accounts = await Balance.findAll();

            for (const account of accounts) {
                let value = account.dataValues.balance;
                const dailyInterestRate = 0.0045;  // Substitua pela sua taxa de rendimento diário
                value *= (1 + dailyInterestRate);
                
                // Atualize o saldo na base de dados
                await Balance.update({ balance: value }, { where: { id: account.dataValues.id } });
            }

            console.log('Rendimento diário aplicado com sucesso.');
        } catch (error) {
            console.error('Erro ao calcular rendimento diário:', error);
        }
    }

    async storageDeposit(req,res){

        try {
            const userSolicit = req.body.user_solicit
            
            const balances = Balance.findAll({
                where:{
                    user_id:req.body.id
                }
            })

            const balanceUser = balances[0].dataValues.balance 

            if(balanceUser >= userSolicit){


            }
            
            
        } catch (error) {
            
        }
    }

}

module.exports = new ControllerBalance();
