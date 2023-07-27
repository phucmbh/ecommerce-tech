const mongoose = require('mongoose');

var productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A product must have a title'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'A product must have a slug'],
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: 'Category',
    },
    quantity: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
      default: [
        'https://cdn.tgdd.vn/Products/Images/44/231244/grey-1-org.jpg',
        'https://cdn.tgdd.vn/Products/Images/44/304028/asus-vivobook-15-oled-a1505va-i5-l1052w-thumb-600x600.jpg',
        'https://cdn.tgdd.vn/Products/Images/7264/269358/elioec010-02-nu-1.jpg',
        'https://cdn.tgdd.vn/Products/Images/7077/282959/befit-beu-b4-hong-2.jpg',
      ],
    },
    thumb: {
      type: String,
      default:
        'https://cdn.tgdd.vn/Products/Images/44/307786/acer-aspire-7-gaming-a715-76g-5132-i5-nhqmesv002-thumb-600x600.jpg',
    },
    color: {
      type: String,
      enum: ['Black', 'Grown', 'Yellow', 'Red', 'Green'],
    },
    ratings: [
      {
        star: Number,
        postedBy: { type: mongoose.Types.ObjectId, ref: 'User' },
        comment: String,
      },
    ],
    totalRatings: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);
