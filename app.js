const db = require('./db')
const {Movie} = db.models;

(async () => {
  await db.sequelize.sync({ force:true })

  try {
    const movie = await Movie.create({
      title: 'Fight Club',
      runtime: 139,
      releaseDate: '1999-11-11',
      isAvailableOnVHS: true,
    }); 
    console.log(movie.toJSON());

    const movie2 = await Movie.create({
      title: 'The Big Lebowski',
      runtime: 117,
      releaseDate: '1998-03-06',
      isAvailableOnVHS: true,
      });
      console.log(movie2.toJSON());

  } catch (error) {
    console.log('Error Connecting to database', error)
  }

})();


