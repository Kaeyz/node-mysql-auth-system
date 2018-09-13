const Sequelize = require('sequelize');

const User = Sequelize.define('user', {
    firstName: {
        type: Sequelize.STRING
    },
    last_name: {
        type: Sequelize.STRING
    },
    username: {
        type: Sequelize.STRING;
    },
    password: {
        type: Sequelize.STRING;
    }
})

User.sync({force: true}).then(() => {
    return user.create({})
})