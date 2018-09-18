const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    const queryText = `SELECT * FROM "category";`;
    pool.query(queryText)
    .then(response => res.send(response.rows))
    .catch(error => {
      console.log('/api/category GET error:', error);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;