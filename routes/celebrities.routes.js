// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');

// all your routes here

//GET route
//List all the celebrities
router.get('/celebrities', async (req, res, next) => {
    try {
        const celebrities = await Celebrity.find({});
        res.render('celebrities/celebrities', { celebrities })
    } catch (error) {
        next(error)
    }
})

// GET route
// Create new celebrity
router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity');
})

//POST route
//Inputs from users to create new celebrity
router.post('/celebrities/create', async (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
    try {
        await Celebrity.create({ name, occupation, catchPhrase });
        res.redirect('/celebrities');
    } catch (error) {
        res.redirect('/celebrities/create');
    }
})

module.exports = router;