module.exports = {
  development: {
     dialect: 'postgres',
     host: 'localhost',
     port: process.env.DATABASE_PORT,
     username: process.env.DATABASE_USERNAME,
     password: process.env.DATABASE_PASSWORD,
     database: process.env.DATABASE,
  }
}