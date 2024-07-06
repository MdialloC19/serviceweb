const mongoose = require("mongoose");

const categorieSchema = new mongoose.Schema({
  libelle: {
    type: String,
    maxlength: 20,
    unique: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Categorie = mongoose.model("Categorie", categorieSchema);

const skipDeleted = function () {
  this.where({ isDeleted: false });
};

categorieSchema.pre("find", skipDeleted);
categorieSchema.pre("findOne", skipDeleted);
categorieSchema.pre("findById", skipDeleted);
categorieSchema.pre("updateOne", skipDeleted);
categorieSchema.pre("updateMany", skipDeleted);
categorieSchema.pre("findOneAndUpdate", skipDeleted);
categorieSchema.pre("deleteOne", skipDeleted);
categorieSchema.pre("deleteMany", skipDeleted);

module.exports = Categorie;
