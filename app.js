const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'movies.db'
});

// Movie Model
class Movie extends Sequelize.Model {}
Movie.init({
  title: Sequelize.STRING
}, { sequelize });


// async IIFE
(async () => {
  // Sync all tables
  await sequelize.sync({ force:true})

  try {
    // await sequelize.authenticate();
    // console.log('Connection to database successful')

  } catch (error) {
    console.log('Error Connecting to database', error)
  }
})();


