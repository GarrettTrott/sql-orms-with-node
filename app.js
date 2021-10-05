const db = require('./db')
const {Movie, Person} = db.models;

(async () => {
  await db.sequelize.sync({ force:true })

  try {
    const movie = await Movie.create({
      title: 'Fight Club',
      runtime: 137,
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

    const person = await Person.create({
      firstName: "Edward",
      lastName: "Norton"
    });
    console.log(person.toJSON());

  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      console.error('Validation errrors: ', errors);
    } else {
      throw error;
    }
  }

})();


