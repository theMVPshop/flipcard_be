//Connection file to mongo db
// import mongoose from "mongoose";

// const connectDB = async () => {
// 	try {
// 		const conn = await mongoose.connect(process.env.MONGO_URI, {
// 			useUnifiedTopology: true,
// 			useNewUrlParser: true,
// 		});
// 		console.log(`MongoDB Connected: ${conn.connection.host}`);
// 	} catch (error) {
// 		console.error(`Error: ${error.message}`);
// 		process.exit();
// 	}
// };
// export default connectDB;


//Connect file to mysql db

const mysql = require('mysql')
require('dotenv').config();

class Connection {
  constructor() {
    if (!this.pool) {
      console.log('creating connection...')
      this.pool =mysql.createPool({
        connectionLimit: 100,
        host: 'us-cdbr-east-05.cleardb.net',
        user: 'bbcc9651044654',
        password: process.env.PASSPHRASE,
        database: 'heroku_9ed20083dd1d7c7'
      })

      return this.pool
    }

    return this.pool
  }
}

const instance = new Connection()

module.exports = instance;
