const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
  },
  contenu: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  dateCreation: {
    type: Date,
    default: Date.now,
  },
  dateModification: {
    type: Date,
    default: Date.now,
  },
  categorie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categorie",
    required: [true, "Please provide the categorie"],
  },
});

// Pre-save middleware to update the dateModification field
articleSchema.pre("save", function (next) {
  this.dateModification = Date.now();
  next();
});
const skipDeleted = function () {
  this.where({ isDeleted: false });
};

articleSchema.pre("find", skipDeleted);
articleSchema.pre("findOne", skipDeleted);
articleSchema.pre("findById", skipDeleted);
articleSchema.pre("updateOne", skipDeleted);
articleSchema.pre("updateMany", skipDeleted);
articleSchema.pre("findOneAndUpdate", skipDeleted);
articleSchema.pre("deleteOne", skipDeleted);
articleSchema.pre("deleteMany", skipDeleted);

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
