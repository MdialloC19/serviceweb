const express = require("express");
const { check } = require("express-validator");
const categoryController = require("../controllers/Categorie.controller");
// const auth = require("../middleware/auth");

const router = express.Router();

// @route   GET api/categories
// @desc    Get all categories
// @access  Public
router.get("/", categoryController.getAllCategories);

// @route   GET api/categories/:id
// @desc    Get category by ID
// @access  Public
router.get("/:id", categoryController.getCategoryById);

// @route   POST api/categories
// @desc    Create a category
// @access  Private
router.post(
  "/",

  [check("libelle", "Description is required").not().isEmpty()],

  categoryController.createCategory
);

// @route   PUT api/categories/:id
// @desc    Update a category
// @access  Private
router.put(
  "/:id",
  [check("libelle", "Description is required").not().isEmpty()],
  categoryController.updateCategory
);

// @route   PATCH api/categories/:id
// @desc    Soft delete a category
// @access  Private
router.patch("/:id", categoryController.softDeleteCategory);

// @route   DELETE api/categories/:id
// @desc    Hard delete a category
// @access  Private
router.delete("/:id", categoryController.hardDeleteCategory);

module.exports = router;
