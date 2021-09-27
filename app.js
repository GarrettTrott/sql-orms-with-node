const db = require('./db')
const {Movie} = db.models;

(async () => {
  await db.sequelize.sync({ force:true })

  try {
    const movie = await Movie.create({
        title: 'Fight Club'
      });
      console.log(movie.toJSON());

      const movie2 = await Movie.create({
        title: 'The Big Lebowski'
      });
      console.log(movie2.toJSON());

  } catch (error) {
    console.log('Error Connecting to database', error)
  }

})();


