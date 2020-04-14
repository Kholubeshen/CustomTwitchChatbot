let mongoose = require('mongoose');

const server = "localhost:27017"; // REPLACE WITH YOUR DB SERVER
const database = 'Chatbot';      // REPLACE WITH YOUR DB NAME

class Database {
  constructor() {
    this.connect()
  }
  
    connect() {
        mongoose.connect(`mongodb://${server}/${database}`, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            console.log('Database connection successful')
        })
        .catch(err => {
            console.error(`Database connection error: ${err}`)
        })
    }
}

module.exports = new Database()