const { Sequelize } = require('sequelize');

// Load environment variables
const user = process.env.POSTG_USER;
const host = process.env.POSTG_HOST;
const idendb = process.env.IDEN_DB;
const port = process.env.POSTG_PORT;
const password = process.env.POSTG_PASSWORD;



// Create Sequelize instance
const iden_seq = new Sequelize(idendb, user, password, {
  host: host,
  port: port,
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// Function to initialize the database
const initializeDatabase = async () => {
  try {
    await iden_seq.authenticate();
    console.log('Connected to IDEN_DB successful.');

    require('../models/User');

    // Sync models with the database
    await iden_seq.sync({ alter: true });
    console.log('IDEN_DB sync successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

// iden_seq as user db and initialization func for app.js
module.exports = { iden_seq, initializeDatabase };