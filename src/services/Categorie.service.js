const Categorie = require("../models/Categorie.model"); // Adjust the path as necessary

// Create a new category
const createCategorie = async (data) => {
  try {
    const categorie = new Categorie(data);
    await categorie.save();
    return categorie;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get all categories
const getAllCategories = async () => {
  try {
    const categories = await Categorie.find({ isDeleted: false }); // Filter out soft deleted categories
    return categories;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get a category by ID
const getCategorieById = async (id) => {
  try {
    const categorie = await Categorie.findById(id);
    if (!categorie || categorie.isDeleted) {
      throw new Error("Category not found");
    }
    return categorie;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update a category by ID
const updateCategorie = async (id, data) => {
  try {
    const categorie = await Categorie.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!categorie || categorie.isDeleted) {
      throw new Error("Category not found");
    }
    return categorie;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Soft delete a category by ID
const softDeleteCategorie = async (id) => {
  try {
    const categorie = await Categorie.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
    if (!categorie) {
      throw new Error("Category not found");
    }
    return categorie;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete a category by ID
const deleteCategorie = async (id) => {
  try {
    const categorie = await Categorie.findByIdAndDelete(id);
    if (!categorie) {
      throw new Error("Category not found");
    }
    return categorie;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createCategorie,
  getAllCategories,
  getCategorieById,
  updateCategorie,
  softDeleteCategorie, // Add the soft delete function here
  deleteCategorie,
};
