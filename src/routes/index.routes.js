const express = require("express");
const router = express.Router();
const articleRoutes = require("./Article.routes");
const categorieRoutes = require("./Categorie.routes");

router.use("/articles", articleRoutes);
router.use("/categories", categorieRoutes);

module.exports = router;
