const mongoose = require("mongoose");

const CategoriesSchema = new mongoose.Schema({
  category: {
    main: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    charge: {
      type: Number,
      required: true
    },
    subcategories: {
      type: [String],
      required: true
    }
  }
});
const Category = mongoose.model("Category", CategoriesSchema);
module.exports = Category;
