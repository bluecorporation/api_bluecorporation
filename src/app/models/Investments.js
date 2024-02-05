const { Sequelize, Model } = require('sequelize')

class Investments extends Model {
    static init(sequelize) {
        super.init(
            {
                investment_value: Sequelize.STRING,
                user_id: Sequelize.STRING,
            },
            {
                sequelize,
            }
        )
    }

}

module.exports = Investments