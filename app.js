const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'movies.db'
});

// async IIFE
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to database successful')
  } catch (error) {
    console.log('Error Connecting to database', error)
  }
})();


