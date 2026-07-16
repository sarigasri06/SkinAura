const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: { type: String, required: true },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    title: { type: String, default: '' },
    comment: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    compareAtPrice: {
      type: Number,
      default: 0,
    },
    images: {
      type: [String],
      default: [],
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['cleanser', 'moisturizer', 'serum', 'toner', 'sunscreen', 'mask', 'eye-care', 'lip-care', 'body-care', 'face-care', 'set'],
    },
    skinType: {
      type: [String],
      enum: ['oily', 'dry', 'combination', 'normal', 'sensitive'],
      default: [],
    },
    concerns: {
      type: [String],
      enum: ['acne', 'aging', 'dark-spots', 'dryness', 'redness', 'pores', 'dullness', 'uneven-texture'],
      default: [],
    },
    ingredients: {
      type: [String],
      default: [],
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'Stock cannot be negative'],
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    reviews: [reviewSchema],
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for search
productSchema.index({ name: 'text', description: 'text', ingredients: 'text' });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
