const express = require("express");
const router = express.Router();
const articleController = require("../controllers/Article.controller");
// const { validateCategoryParam } = require("../validators/categoryValidators");
const { param } = require("express-validator");

router.get("/", articleController.getAllArticles);
router.get(
  "/categories/:categorie",
  [param("categorie", "Category is required").not().isEmpty()],
  articleController.getAllArticlesByCategory
);

router.get(
  "/:id",
  [param("categorie", "Category is required").not().isEmpty()],
  articleController.getArticleById
);
router.post(
  "/:categorie",
  // [param("categorie", "Category is required").not().isEmpty()],
  articleController.createArticle
);

router.put("/:id", articleController.updateArticle);

router.delete(
  "/:id",
  // [param("categorie", "Category is required").not().isEmpty()],
  articleController.deleteArticle
);

module.exports = router;
