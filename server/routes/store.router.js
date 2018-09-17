const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
// "/api/store"
/**
 * GET route template
 */
router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    const queryText = `SELECT "id", "name" FROM "store" WHERE "person_id" = $1;`;
    pool.query(queryText, [req.user.id])
    .then(response => res.send(response.rows))
    .catch(error => {
      console.log('/api/store GET error for user id:', req.user.id);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(401);
  }
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  if (req.isAuthenticated()) {
    console.log('user', req.user);
    const newStore = req.body;
    const queryText = `INSERT INTO "store" ("name", "person_id") VALUES ($1, $2);`;
    pool.query(queryText, [newStore.name, req.user.id])
    .then(() => res.sendStatus(200))
    .catch(error => {
      console.log('/api/store POST error:', error);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(401);
  }
});

router.delete('/', (req, res) => {
  if (req.isAuthenticated()) {
    const queryText = `DELETE FROM "store" WHERE "id" = $1 AND "person_id" = $2;`;
    pool.query(queryText, [req.query.id, req.user.id])
    .then(() => res.send(200))
    .catch(error => {
      console.log('/api/store DELETE error for user id:', req.user.id, error);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;