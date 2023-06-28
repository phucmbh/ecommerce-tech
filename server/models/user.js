const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
    },
    cart: {
      type: Array,
      defautl: [],
    },
    address: [{ type: mongoose.Types.ObjectId, ref: 'Address' }],
    wishList: [{ type: mongoose.Types.ObjectId, ref: 'Product' }],
    isBlocked: {
      type: Boolean,
      default: false,
    },
    refreshToken: String,
    passwordChangedAt: String,
    passwordResetToken: String,
    passwordResetExpire: String,
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = bcrypt.genSaltSync(10);
  this.password = await bcrypt.hashSync(this.password, salt);
});

//Export the model
module.exports = mongoose.model('User', userSchema);
