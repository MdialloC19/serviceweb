const Article = require("../models/Article.model");

// Créer un nouvel article
const createArticle = async (data) => {
  try {
    const article = new Article(data);
    await article.save();
    return article;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllArticles = async () => {
  try {
    const articles = await Article.find({ isDeleted: false }).populate(
      "categorie"
    );
    return articles;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Récupérer tous les articles
// const getAllArticles = async () => {
//   try {
//     const articles = await Article.find();
//     return articles;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

// Récupérer un article par ID
const getArticleById = async (id) => {
  try {
    const article = await Article.findById(id);
    if (!article) {
      throw new Error("Article not found");
    }
    return article;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Mettre à jour un article par ID
const updateArticle = async (id, data) => {
  try {
    const article = await Article.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!article) {
      throw new Error("Article not found");
    }
    return article;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Supprimer un article par ID
const deleteArticle = async (id) => {
  try {
    const article = await Article.findByIdAndDelete(id);
    if (!article) {
      throw new Error("Article not found");
    }
    return article;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Récupérer tous les articles d'une catégorie spécifique
const getAllArticlesByCategory = async (categoryId) => {
  try {
    const articles = await Article.find({ categorie: categoryId });
    return articles;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  getAllArticlesByCategory,
};
