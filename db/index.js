const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite', // what flavor of SQL
  storage: 'movies.db', // Where to Sore DB
  logging: false
});

const db = {
  sequelize,
  Sequelize,
  models: {},
};

// Require Sequelize ORM models 
db.models.Movie = require('./models/movie.js')(sequelize);
db.models.Person = require('./models/person.js')(sequelize);

module.exports = db;