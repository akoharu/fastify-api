module.exports = {
  "development": {
    "database": {
      "url": "mongodb://localhost:27017/mongo_playground",
      "options": {
        "useNewUrlParser": true
      }
    }
  },
  "test": {
    "database": {
      "url": "mongodb://localhost:27017/mongo_playground",
      "options": {
        "useNewUrlParser": true
      }
    }
  },
  "production": {
    "database": {
      "protocol": "mongodb",
      "host": process.env.DATABASE_HOST || '127.0.0.1',
      "port": process.env.DATABASE_PORT || 27017,
      "name": process.env.DATABASE_NAME || 'fastifyapi',
      "username": process.env.DATABASE_USERNAME || '',
      "password": process.env.DATABASE_PASSWORD || '',
      "options": {
        "useNewUrlParser": true
      }
    }
  }
}