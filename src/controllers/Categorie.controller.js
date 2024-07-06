const { validationResult } = require("express-validator");
const categoryService = require("../services/categorie.Service");

exports.getAllCategories = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const categories = await categoryService.getAllCategories();

    return res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      success: false,
      errors: [{ msg: error.message }],
    });
  }
};

exports.getCategoryById = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const category = await categoryService.getCategorieById(req.params.id);

    if (!category) {
      return res.status(404).json({
        errors: [{ msg: "Category not found" }],
      });
    }

    return res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.log(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({
        errors: [{ msg: "Category not found" }],
      });
    }
    res.status(500).json({
      success: false,
      errors: [{ msg: error.message }],
    });
  }
};

exports.createCategory = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { libelle } = req.body;
    const category = await categoryService.createCategorie({
      libelle,
    });

    return res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      success: false,
      errors: [{ msg: error.message }],
    });
  }
};

exports.updateCategory = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { libelle } = req.body;
    const category = await categoryService.updateCategorie(req.params.id, {
      libelle,
    });

    if (!category) {
      return res.status(404).json({
        errors: [{ msg: "Category not found" }],
      });
    }

    return res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.log(error.message);

    if (error.kind === "ObjectId") {
      return res.status(404).json({
        errors: [{ msg: "Category not found" }],
      });
    }
    res.status(500).json({
      success: false,
      errors: [{ msg: error.message }],
    });
  }
};

exports.softDeleteCategory = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const category = await categoryService.softDeleteCategorie(req.params.id);
    if (!category) {
      return res.status(404).json({
        errors: [{ msg: "Category not found" }],
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Category removed",
    });
  } catch (error) {
    console.log(error);

    if (error.kind === "ObjectId") {
      return res.status(404).json({
        errors: [{ msg: "Category not found" }],
      });
    }
    res.status(500).json({
      success: false,
      errors: [{ msg: error.message }],
    });
  }
};

exports.hardDeleteCategory = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const category = await categoryService.hardDeleteCategorie(req.params.id);
    if (!category) {
      return res.status(404).json({
        errors: [{ msg: "Category not found" }],
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Category deleted permanently",
    });
  } catch (error) {
    console.error(error);
    if (error.kind === "ObjectId") {
      return res.status(404).json({
        errors: [{ msg: "Category not found" }],
      });
    }

    res.status(500).json({
      success: false,
      errors: [{ msg: "Internal server error" }],
    });
  }
};
