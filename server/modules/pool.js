const pg = require('pg');

const Pool = pg.Pool;


const pool = new Pool ({
  host: 'localhost',
  port: 5432,
  database: 'weekend-to-do-app'
})

pool.on('connect', () => {
    console.log('the pool works');
  })
  
  pool.on('error', (error) => {
    console.log('error in the pool.', error);
  })
  
  module.exports = pool;