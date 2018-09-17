const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// "/api/store"
/**
 * GET route template
 */
router.get('/', (req, res) => {
    
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // if (req.isAuthenticated()) {
    const newStore = req.body;
    const queryText = `INSERT INTO "store" ("name", "person_id") VALUES ($1, $2);`;
    pool.query(queryText, [newStore.name, newStore.userId])
    .then(() => res.sendStatus(200))
    .catch(error => {
      console.log('/api/store POST error:', error);
      res.sendStatus(500);
    });
  // } else {
  //   res.sendStatus(401);
  // }
});

module.exports = router;