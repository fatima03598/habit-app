require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection:process.env.DEVELOPMENT_URL,
    migrations: {
      directory: './habitdb/migrations'
    },
    seeds: {
      directory: './habitdb/seeds/dev'
    },
    useNullAsDefault: true
  },

  test: {
    client: 'pg',
    connection:process.env.TEST_URL,
    migrations: {
      directory: './habitdb/migrations'
    },
    seeds: {
      directory: './habitdb/seeds/test'
    },
    useNullAsDefault: true
  },

}