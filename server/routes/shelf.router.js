const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {
    if(req.isAuthenticated()){
        console.log('req.user:', req.user);
         let queryText = `SELECT * FROM "item";`;
         pool.query(queryText)
         .then(results => res.send(results.rows))
         .catch(error => {
             console.log('Error in GET route server side', error);
             res.sendStatus(418)
         })
    }else{
    res.sendStatus(403); // For testing only, can be removed
}});


/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', (req, res) => {
    if(req.isAuthenticated()){
        console.log('req.user:', req.user);
        let queryText = `INSERT INTO "item" ("description", "image_url", "user_id") VALUES ($1, $2, $3);`;
        pool.query(queryText, [req.body.description, req.body.image_url, req.user.id])
        .then(results => res.sendStatus(201))
        .catch( error => {
            console.log('error in server side POST', error);
        })
    }else{
        res.sendStatus(403)
    }
});


/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', (req, res) => {
    if(req.isAuthenticated()){
        if(req.body.user_id == req.user.id ){
            let queryText = `DELETE FROM "item" WHERE "id" = $1`
            pool.query(queryText, [req.params.id])
            .then(results => res.sendStatus(201))
            .catch(error => {
                console.log('error in server side DELETE', error);
                res.sendStatus(418)
            })
        }else{403}
    }else{403}
});


/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {

});


/**
 * Return all users along with the total number of items 
 * they have added to the shelf
 */
router.get('/count', (req, res) => {

});


/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {

});

module.exports = router;