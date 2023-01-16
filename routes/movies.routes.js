// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model')
// all your routes here

//GET route
//List all the movies
router.get('/movies', async (req, res, next) => {
    try {
        const movies = await Movie.find({});
        res.render('movies/movies', { movies })
    } catch (error) {
        next(error)
    }
})

// GET route
// Create new movie
router.get('/movies/create', async (req, res, next) => {
    try {
        const celebrities = await Celebrity.find({});
        res.render('movies/new-movie', { celebrities });
    } catch (error) {
        next(error)
    }
    
})

//POST route
//Inputs from users to create new movie
router.post('/movies/create', async (req, res, next) => {
    const { title, genre, plot, cast } = req.body;
    try {
        await Movie.create({ title, genre, plot, cast });
        res.redirect('/movies');
    } catch (error) {
        res.redirect('/movies/create');
    }
})

//POST route
//Delete movie
router.post('/movies/:id/delete', async (req, res, next) => {
    const { id } = req.params;
    try {
        await Movie.findByIdAndRemove(id);
        res.redirect('/movies');
    } catch (error) {
        next(error);
    }
})

//GET route
//Movies details

router.get('/movies/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const movie = await Movie.findById(id).populate('cast');
        res.render('movies/movie-details', { movie })
    } catch (error) {
        next(error)
    }
})


module.exports = router;