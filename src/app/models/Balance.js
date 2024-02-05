const { Sequelize, Model } = require('sequelize')

class Balance extends Model {
    static init(sequelize) {
        super.init(
            {
                balance: Sequelize.STRING,
                user_id: Sequelize.STRING,
            },
            {
                sequelize,
            }
        )
    }

}

module.exports = Balance