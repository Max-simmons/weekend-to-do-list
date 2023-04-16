const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const pool = require('./modules/pool.js');

const PORT = 5050;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('server/public'));

app.get('/tasks', (req, res) => {
  console.log('GET /tasks');

  let sqlText = 'SELECT * FROM "toDoApp";';

  pool.query(sqlText)
    .then((dbRes) => {
      let theTasks = dbRes.rows;
      res.send(theTasks)
    })
    .catch((dbErr) => {
      console.log('SQL query in GET /tasks failed', dbErr)
      res.sendStatus(500);
    })
  
})


app.listen(PORT, () => {
    console.log(`hey. listen. http://localhost:${PORT}`)
  })