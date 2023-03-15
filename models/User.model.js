const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    username: {
      type: String,
      required: [true, "Name is required."],
    },
    hints: [{ type: Schema.Types.ObjectId, ref: 'Hint'}],
    jobs: [{ type: Schema.Types.ObjectId, ref: 'Job'}],

    admin:{
      type: Boolean,
      default:false
    },

    imageUrl: {
      type:String,
      default:'https://res.cloudinary.com/dkoe4o8w1/image/upload/v1678878431/devHub/default_dog_jrhehn.jpg'
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
