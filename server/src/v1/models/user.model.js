const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { TOKEN_SECRET_KEY } = process.env;

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
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
    },
    cart: [
      {
        product: { type: mongoose.Types.ObjectId, ref: 'Product' },
        quantity: Number,
        color: String,
      },
    ],
    address: {
      type: String,
    },
    wishList: [{ type: mongoose.Types.ObjectId, ref: 'Product' }],
    isBlocked: {
      type: Boolean,
      default: false,
    },
    refreshToken: String,
    passwordResetToken: String,
    passwordResetExpire: Date,
    verifyEmailToken: String,
    verifyEmailExpire: Date,
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
    const resetToken =
      crypto.randomBytes(256).toString('hex') + this._id.toString();
    this.passwordResetToken = crypto
      .createHmac('sha256', TOKEN_SECRET_KEY)
      .update(resetToken)
      .digest('hex');
    this.passwordResetExpire = Date.now() + FIFTEEN_MINUTES;
    crypto.createHash('sha256').update(resetToken).digest('hex');
    return resetToken;
  },
};

//Export the model
module.exports = mongoose.model('User', userSchema);
