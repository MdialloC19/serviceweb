const express = require("express");
const router = express.Router();
const articleController = require("../controllers/Article.controller");
// const { validateCategoryParam } = require("../validators/categoryValidators");
const { param } = require("express-validator");

router.get(
  "/categories/:categorie",
  [param("categorie", "Category is required").not().isEmpty()],
  articleController.getAllArticlesByCategory
);

router.get(
  "/categories/:categorie/articles/:id",
  [param("categorie", "Category is required").not().isEmpty()],
  articleController.getArticleById
);
router.post(
  "/categories/:categorie",
  [param("categorie", "Category is required").not().isEmpty()],
  articleController.createArticle
);

router.put(
  "/categories/:category/articles/:id",
  [param("categorie", "Category is required").not().isEmpty()],
  articleController.updateArticle
);

router.delete(
  "/categories/:category/articles/:id",
  [param("categorie", "Category is required").not().isEmpty()],
  articleController.deleteArticle
);

module.exports = router;
