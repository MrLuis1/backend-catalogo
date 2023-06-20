import { Sequelize } from 'sequelize';

const db = new Sequelize('node', 'root', '28135820', {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false
});

export default db