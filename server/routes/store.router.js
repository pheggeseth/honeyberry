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

router.get('/:storeId/items', (req, res) => {
  if (req.isAuthenticated()) {
    const storeId = req.params.storeId;
    console.log(`/api/store/${storeId}/items GET hit`);
    
    const queryText = `SELECT 
      "store_item"."id",
      "store_item"."store_id",
      "store_item"."completed",
      "item"."name", 
      "item"."default_unit", 
      "item"."image_path" 
    FROM "store_item" 
    JOIN "item" ON "item_id" = "item"."id" 
    WHERE "store_id" = $1;`;

    pool.query(queryText, [storeId])
    .then(response => res.send(response.rows))
    .catch(error => {
      console.log(`/api/store/${storeId}/items GET error:`, error);
    });
  } else {
    res.sendStatus(401);
  }
});

router.get('/:storeId/essentials', (req, res) => {
  if (req.isAuthenticated()) {
    const storeId = req.params.storeId;
    const queryText = `SELECT 
      "item"."id", 
      "item"."name", 
      "item"."default_unit", 
      "item"."image_path" 
    FROM "store_essential" 
    JOIN "item" ON "item"."id" = "item_id" 
    WHERE "store_id" = $1;`;

    pool.query(queryText, [storeId])
    .then(response => res.send(response.rows))
    .catch(error => {
      console.log(`/api/store/${storeId}/essentials GET error:`, error);
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

router.post('/:storeId/item', (req, res) => {
  if (req.isAuthenticated()) {
    const storeId = req.params.storeId;
    const itemToAdd = req.body;
    const queryText = `INSERT INTO "store_item" ("store_id", "item_id") VALUES ($1, $2);`;
    pool.query(queryText, [storeId, itemToAdd.id])
    .then(() => res.sendStatus(201))
    .catch(error => {
      console.log(`/api/store/${storeId}/item POST error:`, error);
      res.sendStatus(500);
    })
  } else {
    res.sendStatus(401);
  }
});

router.put('/item', (req, res) => {
  if (req.isAuthenticated()) {
    const item = req.body;
    // console.log('item', item);
    const queryText = 
    `UPDATE "store_item" SET 
    "store_id" = $1,
    "completed" = $2 WHERE "id" = $3;`;

    pool.query(queryText, [
      item.store_id,
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

router.delete('/:storeId/items/completed', (req, res) => {
  if (req.isAuthenticated()) {
    const storeId = req.params.storeId;
    const queryText = `DELETE FROM "store_item" WHERE "store_id" = $1 AND "completed" = true;`;
    pool.query(queryText, [storeId])
    .then(() => res.sendStatus(200))
    .catch(error => {
      console.log(`/api/store/${storeId}/items/completed DELETE error:`, error);
    });
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;