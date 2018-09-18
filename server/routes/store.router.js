const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
// "/api/store"
/**
 * GET route template
 */
router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    console.log('/api/store GET hit');
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

router.get('/:id/items', (req, res) => {
  if (req.isAuthenticated()) {
    const storeId = req.params.id;
    console.log(`/api/store/${storeId}/items GET hit`);
    
    const queryText = `SELECT 
      *,
      "item"."name", 
      "item"."default_unit", 
      "item"."image_path" 
    FROM "store_item" 
    JOIN "item" ON "item_id" = "item"."id" 
    WHERE "store_id" = $1 ORDER BY "index" ASC;`;

    pool.query(queryText, [storeId])
    .then(response => res.send(response.rows))
    .catch(error => {
      console.log(`/api/store/${storeId}/items GET error:`, error);
    });
  } else {
    res.sendStatus(401);
  }
});

router.put('/item', (req, res) => {
  if (req.isAuthenticated) {
    const item = req.body;
    console.log('item', item);
    const queryText = 
    `UPDATE "store_item" SET 
    "index" = $1,
    "store_id" = $2,
    "quantity" = $3, 
    "completed" = $4 WHERE "id" = $5;`;

    pool.query(queryText, [
      item.index,
      item.store_id,
      item.quantity, 
      item.completed, 
      item.id
    ]).then(response => res.sendStatus(200))
    .catch(error => {
      console.log(`/api/store/item PUT error:`, error);
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
    console.log('/api/store POST hit:', req.body);
    
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