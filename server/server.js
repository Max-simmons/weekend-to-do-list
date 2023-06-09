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

app.post('/tasks', (req,res) => {
  console.log('POST /tasks');

  let taskName = req.body.task;
  let taskStatus = req.body.done;

  let sqlText = `
  INSERT INTO "toDoApp"
  ("task", "done")
  VALUES
  ($1, $2);
  `;
  let sqlValues = [taskName, taskStatus]

  pool.query(sqlText, sqlValues)
  .then((dbRes) => {
    res.sendStatus(201);
  })
  .catch((dbErr) => {
    console.log('POST /tasks error:', dbErr);
    res.sendStatus(500);
  })
})

app.delete('/tasks/:id', (req, res) => {
  console.log(req.params);

  let theIdToDelete = req.params.id;

  let sqlText = `
  DELETE FROM "toDoApp"
    WHERE "id"=$1;
    `
  
    let sqlValues = [theIdToDelete]

    pool.query(sqlText, sqlValues)
    .then((dbRes) => {
     
      res.sendStatus(200); 
    })
    .catch((dbErr) => {
      console.log('delete /tasks error:', dbErr);
      
      res.sendStatus(500);
    })
})

app.put('/tasks/:id', (req, res) => {

  let theIdToUpdate = req.params.id;

  let taskDone = req.body.done;

  let sqlText = `
  UPDATE "toDoApp"
    SET "done"=$1
    WHERE "id"=$2;
`
let sqlValues = [taskDone, theIdToUpdate];

pool.query(sqlText, sqlValues)
    .then((dbRes) => {
      res.sendStatus(200);
    })
    .catch((dbErr) => {
      console.log('PUT /tasks/:id fail:', dbErr);
      res.sendStatus(500);
    })
})


app.listen(PORT, () => {
    console.log(`hey. listen. http://localhost:${PORT}`)
  })