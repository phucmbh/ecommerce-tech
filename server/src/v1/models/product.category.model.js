const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    slug: {
      type: String,
      required: [true, 'A category must have a slug'],
      unique: true,
      lowercase: true,
    },
    icon: {
      type: String,
      default: 'https://img.icons8.com/?size=512&id=11409&format=png',
    },
    image: {
      type: String,
      default:
        'https://cdn.tgdd.vn/Products/Images/7264/228828/q-q-vp46j055y-nu-2-org.jpg',
    },
    brand: {
      type: Array,
      default: ['Samsung', 'Apple', 'Google', 'Android', 'iOS'],
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model('ProductCategory', productCategorySchema);
