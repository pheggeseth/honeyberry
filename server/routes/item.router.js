const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    const queryText = `SELECT
      "item"."id",
      "item"."name",
      "item"."default_unit",
      "category"."name" AS "category",
      "item"."icon_path"
    FROM "item" 
    JOIN "category" ON "category"."id" = "item"."category_id";`;

    pool.query(queryText)
    .then(response => res.send(response.rows))
    .catch(error => {
      console.log('/api/item GET error:', error);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;