const { Schema, model } = require('mongoose');

const jobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      default:
        'https://res.cloudinary.com/dwgakctdp/image/upload/v1678378245/devHub/default-logo-removebg-preview_rw4p5d.png',
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    approved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Job = model('Job', jobSchema);
module.exports = Job;
