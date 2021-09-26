const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'movies.db',
  logging: false
});

// Movie Model
class Movie extends Sequelize.Model {}
Movie.init({
  title: Sequelize.STRING
}, { sequelize });


// async IIFE
(async () => {
  // Sync all tables
  await sequelize.sync({ force:true })

  try {
    const movieInstances = await Promise.all([
    // Instance of Movie class represents a database row
      Movie.create({
        title: 'Fight Club',
      }),
      Movie.create({
      title: 'The Big Lebowski',
      }),
    ]);

  const moviesJSON = movieInstances.map(movie => movie.toJSON());
  console.log(moviesJSON)
  
  } catch (error) {
    console.log('Error Connecting to database', error)
  }

})();


