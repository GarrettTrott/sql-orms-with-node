const db = require('./db')
const {Movie, Person} = db.models;

(async () => {
  await db.sequelize.sync({ force:true })

  try {
    const movie = await Movie.create({ // Create New person / model / db table
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

    
    const person = await Person.create({ // Create New person / model / db table
      firstName: "Edward",
      lastName: "Norton"
    });
    console.log(person.toJSON());
    
    const movie3 = await Movie.build({ // Build the table before saving 
      title: 'Kill Bill Vol. 1',
      runtime: 111,
      releaseDate: '2003-10-10',
      isAvailableOnVHS: false,
    })
    
    await movie3.save(); // save the table
    console.log(movie3.toJSON());

    // ** READ or 'Retrieve records' ** //

    // Retrieve a record by Primary key (ID) : findByPk
    const movieById = await Movie.findByPk(3); 
    console.log(movieById.toJSON());

    // Retrieve the first record with a specific parameter : findOne
    const movieByRuntime = await Movie.findOne({ where: { runtime: 137 } });
    console.log(movieByRuntime.toJSON());

    // The findAll method retrieves a collection of all records, instead of a single record
    const movies = await Movie.findAll();
    console.log( movies.map(movie => movie.toJSON()) );

    // Filter with findAll{{
    const moviesOnVHS = await Movie.findAll({
      where: {
        isAvailableOnVHS: true
      }
    });
    console.log( moviesOnVHS.map(movieOnVHS => movieOnVHS.toJSON()) );

  } catch (error) {
    if (error.name === 'SequelizeValidationError') { // Generate organized Errors
      const errors = error.errors.map(err => err.message);
      console.error('Validation errrors: ', errors);
    } else {
      throw error;
    }
  }

})();


