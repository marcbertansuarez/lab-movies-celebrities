// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here

//GET route
//List all the celebrities
router.get("/celebrities", async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find({});
    res.render("celebrities/celebrities", { celebrities });
  } catch (error) {
    next(error);
  }
});

// GET route
// Create new celebrity
router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

//POST route
//Inputs from users to create new celebrity
router.post("/celebrities/create", async (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  try {
    await Celebrity.create({ name, occupation, catchPhrase });
    res.redirect("/celebrities");
  } catch (error) {
    res.redirect("/celebrities/create");
  }
});

//GET route
//Edit view celebrity
router.get("/celebrities/:id/edit", async (req, res, next) => {
  const { id } = req.params;
  try {
    const celebrity = await Celebrity.findById(id);
    res.render("celebrities/celebrities-edit", { celebrity });
  } catch (error) {
    next(error);
  }
});

router.post("/celebrities/:id/delete", async (req, res, next) => {
  const { id } = req.params;
  try {
    await Celebrity.findByIdAndRemove(id);
    res.redirect("/celebrities");
  } catch (error) {
    next(error);
  }
});

//GET route
//Celebrity details
router.get("/celebrities/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const celebrity = await Celebrity.findById(id);
    res.render("celebrities/celebrities-details", { celebrity });
  } catch (error) {
    next(error);
  }
});

//POST route
//User inputs editing celebrity
router.post("/celebrities/:id", async (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  const { id } = req.params;
  try {
    const editedCel = await Celebrity.findByIdAndUpdate(id, {
      name,
      occupation,
      catchPhrase,
    });
    res.redirect(`/celebrities/${editedCel._id}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
