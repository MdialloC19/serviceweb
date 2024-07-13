const { validationResult } = require("express-validator");
const articleService = require("../services/Article.service");

exports.createArticle = async (req, res) => {
  try {
    const { titre, contenu } = req.body; // Récupérez les autres champs nécessaires depuis req.body
    const categoryId = req.params.categorie; // Récupérez l'ID de catégorie depuis req.params
    console.log(categoryId);
    // Assurez-vous que categoryId est valide et utilisable dans la création de l'article

    const newArticle = await articleService.createArticle({
      titre,
      contenu,
      categorie: categoryId,
    });

    res.status(201).json({
      success: true,
      data: newArticle,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      errors: [{ msg: error.message }],
    });
  }
};

exports.getAllArticles = async (req, res) => {
  try {
    const articles = await articleService.getAllArticles();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all articles by category
exports.getAllArticlesByCategory = async (req, res) => {
  try {
    const articles = await articleService.getAllArticlesByCategory(
      req.params.categorie
    );
    res.status(200).json({ success: true, data: articles });
  } catch (error) {
    res.status(500).json({ success: false, errors: [{ msg: error.message }] });
  }
};

// Get an article by ID
exports.getArticleById = async (req, res) => {
  try {
    const article = await articleService.getArticleById(req.params.id);
    if (!article) {
      return res
        .status(404)
        .json({ success: false, errors: [{ msg: "Article not found" }] });
    }
    res.status(200).json({ success: true, data: article });
  } catch (error) {
    res.status(500).json({ success: false, errors: [{ msg: error.message }] });
  }
};

// Update an article by ID
exports.updateArticle = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    console.log(id, data);
    const article = await articleService.updateArticle(id, data);
    if (!article) {
      return res
        .status(404)
        .json({ success: false, errors: [{ msg: "Article not found" }] });
    }
    res.status(200).json({ success: true, data: article });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, errors: [{ msg: error.message }] });
  }
};

// Delete an article by ID
exports.deleteArticle = async (req, res) => {
  try {
    const article = await articleService.deleteArticle(req.params.id);
    if (!article) {
      return res
        .status(404)
        .json({ success: false, errors: [{ msg: "Article not found" }] });
    }
    res.status(200).json({ success: true, msg: "Article deleted" });
  } catch (error) {
    res.status(500).json({ success: false, errors: [{ msg: error.message }] });
  }
};
