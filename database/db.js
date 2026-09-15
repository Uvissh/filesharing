const {Pool} = require('pg')

 const db = new  Pool({
     user:'postgres',
   host:'localhost',
   database:'FileSharing',
   password:'Vishal@12345',
   port:3001
 })

 module.exports = db;