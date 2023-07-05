const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    numberViews: {
      type: Number,
      default: 0,
    },

    usersLiked: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    ],
    usersDisliked: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    ],
    image: {
      type: String,
      defautl: 'https://4kwallpapers.com/images/walls/thumbs_3t/11927.jpeg',
    },
    author: {
      type: String,
      default: 'Admin',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//Export the model
module.exports = mongoose.model('Blog', blogSchema);
