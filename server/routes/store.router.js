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
      "store_item"."item_id",
      "store_item"."quantity",
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
      "store_essential"."id",
      "item"."name", 
      "item"."default_unit", 
      "item"."image_path",
      "store_essential"."store_id",
      "store_essential"."item_id"
    FROM "store_essential" 
    JOIN "item" ON "item"."id" = "store_essential"."item_id" 
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
    const item = req.body;
    const queryText = `INSERT INTO "store_item" ("store_id", "item_id") VALUES ($1, $2);`;
    pool.query(queryText, [storeId, item.item_id || item.id])
    .then(() => res.sendStatus(201))
    .catch(error => {
      console.log(`/api/store/${storeId}/item POST error:`, error);
      res.sendStatus(500);
    })
  } else {
    res.sendStatus(401);
  }
});

router.post('/:storeId/essentials', (req, res) => {
  if (req.isAuthenticated()) {
    const storeId = req.params.storeId;
    const essentialsStoreItemIdPairs = req.body.map(item => [storeId, (item.item_id || item.id)]);

    pool.query(`DELETE FROM "store_essential" WHERE "store_id" = $1;`, [storeId])
    .then(async () => {
      try {
        const queryText = `INSERT INTO "store_essential" ("store_id", "item_id") VALUES ($1, $2);`;
        const insertQueries = essentialsStoreItemIdPairs.map(values => pool.query(queryText, values));
        await Promise.all(insertQueries);
        res.sendStatus(200);
      } catch(error) {
        console.log(error);
        res.sendStatus(500);
      }
    }).catch(error => {
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(401);
  }
});

router.post('/essential', (req, res) => {
  if (req.isAuthenticated()) {
    const {storeId, item} = req.body;
    console.log('item to add:', item);
    const queryText = `INSERT INTO "store_essential" ("store_id", "item_id") VALUES ($1, $2);`;
    pool.query(queryText, [storeId, item.id])
    .then(() => res.sendStatus(200))
    .catch(error => {
      console.log(`/api/store/${storeId}/essential POST error:`, error);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(401);
  }
});

router.put('/item/completed', (req, res) => {
  if (req.isAuthenticated()) {
    const item = req.body;
    // console.log('item', item);
    const queryText = `UPDATE "store_item" SET "completed" = $1 WHERE "id" = $2;`;

    pool.query(queryText, [item.completed, item.id])
    .then(response => res.sendStatus(200))
    .catch(error => {
      console.log(`/api/store/item PUT error:`, error);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(401);
  }
});

router.put('/item/quantity', (req, res) => {
  if (req.isAuthenticated()) {
    const item = req.body;
    const queryText = `UPDATE "store_item" SET "quantity" = $1 WHERE "id" = $2;`;
    pool.query(queryText, [item.quantity, item.id])
    .then(() => res.sendStatus(200))
    .catch(error => {
      console.log('/api/store/item/quantity PUT error:', error);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(401);
  }
});

router.put('/:currentStoreId/items/move', (req, res) => {
  if (req.isAuthenticated()) {
    const currentStoreId = req.params.currentStoreId;
    const newStoreId = req.body.newStoreId;
    const selectedItemIds = req.body.selectedItems.map(item => item.id);

    (async () => {
      try {
        const queryText = `UPDATE "store_item" SET "store_id" = $1 WHERE "store_id" = $2 AND "id" = $3;`;
        const queryPromises = selectedItemIds.map(id => pool.query(queryText, [newStoreId, currentStoreId, id]));
        await Promise.all(queryPromises);
        res.sendStatus(200);
      } catch(error) {
        console.log(error);
        res.sendStatus(500);
      }
    })().catch(error => {
      console.log(error);
      res.sendStatus(500);
    });


    // const queryText = `
    //   SELECT * FROM "store_item" WHERE "id" = ANY(json_array_elements($1));
    //   UPDATE "store_item" SET "store_id" = $2 WHERE "store_id" = $3;
    // `;

    // console.log('ids:', selectedItemIds);
    // pool.query(`SELECT * FROM "store_item" WHERE "id" = ANY (SELECT json_array_elements_text($1)::int);`, [selectedItemIds])
    // .then(response => {
    //   pool.query(`UPDATE $1 SET "store_id" = $2 WHERE "store_id" = $3;`, [response.rows, newStoreId, currentStoreId])
    //   .then(response => res.sendStatus(200))
    //   .catch(error => {
    //     console.log(error);
    //     res.sendStatus(500);
    //   });
    // }).catch(error => {
    //   console.log(error);
    //   res.sendStatus(500);
    // });


    // pool.query(queryText, [selectedItemIds, newStoreId, currentStoreId])
    // .then(() => res.sendStatus(200))
    // .catch(error => {
    //   console.log(`/api/store/${currentStoreId}/items/move PUT error:`, error);
    //   res.sendStatus(500);
    // });
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

router.delete('/essential/:id', (req, res) => {
  if (req.isAuthenticated()) {
    const essentialId = req.params.id;
    console.log(`api/store/essential/${essentialId} DELETE hit.`);
    const queryText = `DELETE FROM "store_essential" WHERE "id" = $1;`;
    pool.query(queryText, [essentialId])
    .then(() => res.sendStatus(200))
    .catch(error => {
      console.log(`/api/store/essential/${essentialId} DELETE error:`, error);
    });
  } else {
    res.sendStatus(401);
  }
});

router.delete('/item/:id', (req, res) => {
  if (req.isAuthenticated()) {
    const itemId = req.params.id;
    const queryText = `DELETE FROM "store_item" WHERE "id" = $1;`;
    pool.query(queryText, [itemId])
    .then(() => res.sendStatus(200))
    .catch(error => {
      console.log(`/api/store/item/${itemId} DELETE error:`, error);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(401);
  }
});

router.delete('/items/delete', (req, res) => {
  if(req.isAuthenticated()) {    
    (async () => {
      try {
        await pool.query('BEGIN');
        const queryText = `DELETE FROM "store_item" WHERE "id" = $1;`;
        const selectedItemIds = req.body.map(item => item.id);
        const queryPromises = selectedItemIds.map(id => pool.query(queryText, [id]));
        await Promise.all(queryPromises);
        await pool.query('COMMIT');
        res.sendStatus(200);
      } catch(error) {
        console.log(error);
        await pool.query('ROLLBACK');
        res.sendStatus(500);
      }
    })().catch(error=> {
      console.log(error);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;