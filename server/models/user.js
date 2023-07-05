const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt');
const crypto = require('crypto');

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
    address: {
      type: Array,
      default: [],
    },
    wishList: [{ type: mongoose.Types.ObjectId, ref: 'Product' }],
    isBlocked: {
      type: Boolean,
      default: false,
    },
    refreshToken: String,
    passwordResetToken: String,
    passwordResetExpire: String,
    passwordChangedAt: String,
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();

  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});

userSchema.methods = {
  isCorrectPassword: function (password) {
    return bcrypt.compareSync(password, this.password);
  },
  createPasswordChangeToken: function () {
    const FIFTEEN_MINUTES = 1000 * 60 * 15;
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    this.passwordResetExpire = Date.now() + FIFTEEN_MINUTES;

    return resetToken;
  },
};

//Export the model
module.exports = mongoose.model('User', userSchema);
