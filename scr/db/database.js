
//Connect file to mysql db

import mysql from 'mysql'
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
