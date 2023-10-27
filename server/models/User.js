import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: true,
      select: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    posts: {
      type: Array,
      required: false,
    },


    userwishlist: {
      type: Array,
      required: false,
    },
    usercheckout: {
      type: Array,
      required: false,
    },
    subtotal: {
      type: Number,
      required: false,
    },
    basketCount: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

UserSchema.methods.generateJwtfromUser = function () {
  const { JWT_SECRET, JWT_EXPIRE } = process.env;
  const payload = {
    id: this._id,
    username: this.username,
    password: this.password,
    isAdmin: this.isAdmin,
    email: this.email,
  };
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  });
  return token;
};
export default mongoose.model("User", UserSchema);
