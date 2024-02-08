const Balance = require("../models/Balance");
const UsersPanel = require("../models/UsersPanel");

const cron = require('node-cron');
const nodemailer = require('nodemailer');

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
    async storageDeposit(req, res) {
        try {
            const userSolicit = req.body.user_solicit;
            
            const balances = await Balance.findAll({
                where: {
                    user_id: req.body.user_id
                }
            });
    
            const user = await UsersPanel.findAll({
                where: {
                    id: req.body.user_id
                }
            });
            
            if (balances.length === 0) {
                return res.status(401).json({ message: "Não autorizado" });
            }
            
            const balanceUser = balances[0].dataValues.balance;
            const nameUser = user[0].dataValues.name;
            const mailUser = user[0].dataValues.mail;
    
            if (balanceUser >= userSolicit) {
                const transporter = nodemailer.createTransport({
                    host: "smtp-relay.sendinblue.com",
                    port: 587,
                    auth: {
                        user: "gustavoreactdeveloper@gmail.com",
                        pass: "jFhfyAzMxsnQd3vc"
                    }
                });
    
                transporter.sendMail({
                    from: mailUser,
                    to: "codergustavo@gmail.com",
                    subject: `Solicitação de saque`,
                    html: `<p>Solicitação de saque usuário ${nameUser} no valor de ${Number(userSolicit).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>`
                }).then((success) => {


                    return res.status(200).json({ message: "sucess" });
                }).catch((error) => {
                    console.log(error);
                    return res.status(500).json({ message: "Opss algo deu errado!" });
                });
            } else {
                return res.status(401).json({ message: "Saldo insuficiente!" });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Opss algo deu errado!" });
        }
    }
    

}

module.exports = new ControllerBalance();
