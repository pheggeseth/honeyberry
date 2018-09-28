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
    const queryText = `SELECT "id", "name", "area_order" FROM "store" WHERE "person_id" = $1;`;
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
      "store_item"."unit",
      "store_item"."completed",
      "item"."name", 
      "item"."icon_path" 
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
      "item"."icon_path",
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

router.get('/:storeId/areas', (req, res) => {
  if (req.isAuthenticated()) {
    const storeId = req.params.storeId;
    (async () => {
      try {
        const areaOrderQueryText = `SELECT "area_order" from "store" WHERE "id" = $1;`;
        const areaOrderResponse = await pool.query(areaOrderQueryText, [storeId]);
        // console.log('area order:', areaOrderResponse.rows[0].area_order);
        const areaOrder = areaOrderResponse.rows[0].area_order;

        const areasQueryText = `SELECT
          "area"."id",
          "area"."name",
          "area"."store_id",
          "area"."item_order"
        FROM "area" WHERE "store_id" = $1;`;
        const areasResponse = await pool.query(areasQueryText, [storeId]);
        const areas = areasResponse.rows;

        
        const areasInOrderWithItems = await Promise.all(areaOrder.map(async areaId => {
          const areaAtOrderPosition = areas.find(area => area.id === areaId);
          
          const areaItemsQueryText = `SELECT
            "area_item"."id",
            "area_item"."area_id",
            "area_item"."item_id",
            "item"."name" as "name",
            "item"."default_unit" as "default_unit",
            "item"."category_id" as "category_id",
            "item"."icon_path" as "icon_path"
          FROM "area_item" 
          JOIN "item" ON "area_item"."item_id" = "item"."id"
          WHERE "area_item"."area_id" = $1;`;
          const areaItemsResponse = await pool.query(areaItemsQueryText, [areaAtOrderPosition.id]);
          const areaItems = areaItemsResponse.rows;

          let areaItemsInOrder;
          if (areaItems.length === 0) {
            areaItemsInOrder = [];
          } else {
            areaItemsInOrder = areaAtOrderPosition.item_order.map(itemId => areaItems.find(area_item => area_item.id === itemId));
          }
          areaAtOrderPosition.items = areaItemsInOrder;
          areaAtOrderPosition.visible = false;

          return areaAtOrderPosition;
        }));

        res.send(areasInOrderWithItems);

      } catch(error) {
        console.log(`/api/store/${storeId}/areas GET error:`, error);
        throw error;
      }
    })().catch(error => {
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
    console.log('adding item to list:', item);
    const queryText = `INSERT INTO "store_item" ("store_id", "item_id", "unit") VALUES ($1, $2, $3);`;
    pool.query(queryText, [storeId, (item.item_id || item.id), item.default_unit])
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

router.post('/area', (req, res) => {
  if (req.isAuthenticated()) {
    (async () => {
      try {
        await pool.query('BEGIN');
        const userId = req.user.id;
        const {areaName, storeId} = req.body;
        const insertQueryText = `INSERT INTO "area" ("name", "person_id", "store_id") VALUES ($1, $2, $3) RETURNING "id";`;
        const insertResponse = await pool.query(insertQueryText, [areaName, userId, storeId]);
        const newAreaId = insertResponse.rows[0].id;
        const storeAreaOrderResponse = await pool.query(`SELECT "area_order" FROM "store" WHERE "id" = $1;`, [storeId]);
        const storeAreaOrderArray = storeAreaOrderResponse.rows[0].area_order;
        storeAreaOrderArray.push(newAreaId);
        await pool.query(`UPDATE "store" SET "area_order" = $1 WHERE "id" = $2;`, [JSON.stringify(storeAreaOrderArray), storeId]);
        await pool.query('COMMIT');
        res.sendStatus(200);
      } catch(error) {
        await pool.query('ROLLBACK');
        throw error;
      }
    })().catch(error => {
      console.log('/api/store/area POST error:', error);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(401);
  }
});

router.post('/area/:areaId/items', (req, res) => {
  if (req.isAuthenticated()) {
    (async () => {
      try {
        const areaId = Number(req.params.areaId);
        const items = req.body;
        console.log('items:', items);
        const itemIdPairs = items.map(item => [areaId, (item.item_id || item.id)]);
        console.log('itemIdPairs:', itemIdPairs);
        // await pool.query('BEGIN');
        await pool.query(`DELETE FROM "area_item" WHERE "area_id" = $1;`, [areaId]);
        console.log('delete done');
        const insertItemsQueryText = `INSERT INTO "area_item" ("area_id", "item_id") VALUES ($1, $2);`;
        const insertQueries = itemIdPairs.map(values => pool.query(insertItemsQueryText, values));
        await Promise.all(insertQueries);
        console.log('inserts done');
        const newAreaItemRows = await pool.query(`SELECT "id" FROM "area_item" WHERE "area_id" = $1;`, [areaId]);
        const newAreaItemIds = newAreaItemRows.rows.map(item => item.id);
        console.log('newAreaItems:', newAreaItemIds);
        await pool.query('UPDATE "area" SET "item_order" = $1 WHERE "id" = $2;', [JSON.stringify(newAreaItemIds), areaId]);
        // await pool.query('COMMIT');
        res.sendStatus(200);
      } catch(error) {
        // await pool.query('ROLLBACK');
        console.log(`/api/store/area/${areaId}/items POST error:`, error);
        throw error;
      }
    })().catch(error => {
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(401);
  }
});

router.put('/item/completed', (req, res) => {
  if (req.isAuthenticated()) {
    const item = req.body;
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
        // await pool.query('BEGIN');
        const queryText = `UPDATE "store_item" SET "store_id" = $1 WHERE "store_id" = $2 AND "id" = $3;`;
        const queryPromises = selectedItemIds.map(id => pool.query(queryText, [newStoreId, currentStoreId, id]));
        await Promise.all(queryPromises);
        // await pool.query('COMMIT');
        res.sendStatus(200);
      } catch(error) {
        console.log(`/api/store/${currentStoreId}/items/move PUT error:`, error);
        // await pool.query('ROLLBACK');
        throw error;
      }
    })().catch(error => {
      res.sendStatus(500);
    });


    // CODE FROM ATTEMPTING TO PASS AN ARRAY OF IDS AS JSON INTO A SQL QUERY
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

router.put('/item/edit', (req, res) => {
  if (req.isAuthenticated()) {
    const itemToUpdate = req.body;
    const queryText = `UPDATE "store_item" SET "quantity" = $1, "unit" = $2 WHERE "id" = $3;`;
    pool.query(queryText, [
      itemToUpdate.quantity, 
      itemToUpdate.unit, 
      itemToUpdate.id
    ]).then(() => res.sendStatus(200))
    .catch(error => {
      console.log(`/api/store/item/edit PUT error:`, error);
      res.sendStatus(500);
    });

  } else {
    // console.log(`/api/store/item/edit PUT error:`, error);
    res.sendStatus(401);
  }
});

router.put('/:storeId/name', (req, res) => {
  if (req.isAuthenticated()) {
    const newName = req.body.newName;
    const storeId = Number(req.params.storeId);
    pool.query(`UPDATE "store" SET "name" = $1 WHERE "id" = $2;`, [newName, storeId])
    .then(() => res.sendStatus(200))
    .catch(error => {
      console.log(`/api/store/${storeId}/name PUT error`);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(401);
  }
});

router.delete('/:storeId', (req, res) => {
  if (req.isAuthenticated()) {
    (async () => {
      try {
        const storeId = req.params.storeId;
        await pool.query(`DELETE FROM "store_item" WHERE "store_id" = $1;`, [storeId]);
        await pool.query(`DELETE FROM "store_essential" WHERE "store_id" = $1;`, [storeId]);
        await pool.query(`DELETE FROM "area_item" USING "area" WHERE "area_item"."area_id" = "area"."id" AND "area"."store_id" = $1;`, [storeId]);
        await pool.query(`DELETE FROM "area" WHERE "store_id" = $1;`, [storeId]);
        await pool.query(`DELETE FROM "store" WHERE "id" = $1;`, [storeId]);
        res.sendStatus(200);
      } catch(error) {
        console.log('/api/store DELETE errror:', error);
        throw error;
      }
    })().catch(error => {
      res.sendStatus(500);
    });



  //   const queryText = `DELETE FROM "store" WHERE "id" = $1 AND "person_id" = $2;`;
    
  //   pool.query(queryText, [req.query.id, req.user.id])
  //   .then(() => res.sendStatus(200))
  //   .catch(error => {
  //     console.log('/api/store DELETE error for user id:', req.user.id, error);
  //     res.sendStatus(500);
  //   });
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
        const queryText = `DELETE FROM "store_item" WHERE "id" = $1;`;
        const selectedItemIds = req.body.selectedItems.map(item => item.id);
        const queryPromises = selectedItemIds.map(id => pool.query(queryText, [id]));
        await Promise.all(queryPromises);
        res.sendStatus(200);
      } catch(error) {
        console.log(error);
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

router.delete('/:storeId/area/:areaId', (req, res) => {
  if (req.isAuthenticated()) {
    (async () => {
      try {
        await pool.query('BEGIN');
        const {storeId, areaId} = req.params;
        // delete items in this area first
        await pool.query(`DELETE FROM "area_item" WHERE "area_id" = $1;`, [areaId]);
        // get the area_order JSON array from the store
        const storeAreaOrderResponse = await pool.query(`SELECT "area_order" FROM "store" WHERE "id" = $1;`, [storeId]);
        const storeAreaOrderArray = storeAreaOrderResponse.rows[0].area_order;
        // splice out areaId from area order array
        const indexOfAreaInArray = storeAreaOrderArray.findIndex(area => area.id === areaId);
        storeAreaOrderArray.splice(indexOfAreaInArray, 1);
        // store the array back in the store
        await pool.query(`UPDATE "store" SET "area_order" = $1 WHERE "id" = $2;`, [JSON.stringify(storeAreaOrderArray), storeId]);
        // delete area from area table with id
        await pool.query(`DELETE FROM "area" WHERE "id" = $1;`, [areaId]);
        await pool.query('COMMIT');
        res.sendStatus(200);
      } catch(error) {
        await pool.query('ROLLBACK');
        console.log(`/api/store/${storeId}/area/${areaId} DELETE error:`, error);
        throw error;
      }
    })().catch(error => {
      res.sendStatus(500);
    });
    
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;