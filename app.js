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

    // Instance of Movie class represents a database row
    const movie = await Movie.create({
        title: 'Fight Club',
    });
    console.log(movie.toJSON());
    // additional movie 
    const movie2 = await Movie.create({
      title: 'The Big Lebowski',
    });
    console.log(movie2.toJSON());



  } catch (error) {
    console.log('Error Connecting to database', error)
  }

})();


