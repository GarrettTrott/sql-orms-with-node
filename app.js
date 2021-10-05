const db = require('./db')
const {Movie, Person} = db.models;
const { Op } = db.Sequelize; // Operators 

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
 
    const movie3 = await Movie.create({ // Create New person / model / db table
      title: 'Toy Story 3',
      runtime: 137,
      releaseDate: '1999-11-11',
      isAvailableOnVHS: true,
    }); 
    console.log(movie3.toJSON());
    
    const person = await Person.create({ // Create New person / model / db table
      firstName: "Edward",
      lastName: "Norton"
    });
    console.log(person.toJSON());
    
    const movie4 = await Movie.build({ // Build the table before saving 
      title: 'Kill Bill Vol. 1',
      runtime: 111,
      releaseDate: '2003-10-10',
      isAvailableOnVHS: false,
    })
    
    await movie4.save(); // save the table
    console.log(movie4.toJSON());

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

    // Filter with findAll "where" clauses{{
    const moviesOnVHS = await Movie.findAll({
      where: {
        isAvailableOnVHS: true
      }
    });
    console.log( moviesOnVHS.map(movieOnVHS => movieOnVHS.toJSON()) );

    // return only IDs and titles from the 'Movies' table.
    const moviesIdTitleOnly = await Movie.findAll({
      attributes: ['id', 'title'], // return only id and title
      where: {
        isAvailableOnVHS: true,
      },
    });
    console.log( moviesIdTitleOnly.map(movieIdTitleOnly => movieIdTitleOnly.toJSON()) );

    // Operator to Return all movies with a release data "greater than or equal" to '1997-01-01', using [Op.gte]: '1997-01-01'
    const moviesGte = await Movie.findAll({
      attributes: ['id', 'title'],
      where: {
        releaseDate: {
          [Op.gte]: '1997-01-01' // greater than or equal to the date
        }
      },
    });
    console.log( moviesGte.map(movieGte => movieGte.toJSON()) );

    // Operator to return movies with a runtime "greater than"
    const moviesGt = await Movie.findAll({
      attributes: ['id', 'title'],
      where: {
        runtime: {
          [Op.gt]: 110, // greater than 110
        },
      },
    });
    console.log( moviesGt.map(movieGt => movieGt.toJSON()) );

    // updating a record 
    const toyStory3 = await Movie.findByPk(3);
    await toyStory3.update({
      title: 'Trinket Tale 3',
      isAvailableOnVHS: true,
    }, { fields: [ 'title', 'isAvailableOnVHS'] }); 

    console.log( toyStory3.get({ plain: true }) );

   // Destroy a Record 
   const fightClub = await Movie.findOne({ where : { title: "Fight Club"}}) // find bu title
   await fightClub.destroy() // First rule is "nobody databases Fight Club" 

   const moviesAfter = await Movie.findAll();
   console.log( moviesAfter.map(movie => movie.toJSON()) )


  } catch (error) {
    if (error.name === 'SequelizeValidationError') { // Generate organized Errors
      const errors = error.errors.map(err => err.message);
      console.error('Validation errrors: ', errors);
    } else {
      throw error;
    }
  }

})();


