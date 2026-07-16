const Wishlist = require('../models/Wishlist');

// @desc    Get user's wishlist
// @route   GET /api/wishlist
// @access  Private
const getWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id }).populate(
      'products',
      'name price images stock category rating numReviews'
    );

    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user._id, products: [] });
    }

    res.json(wishlist);
  } catch (error) {
    res.status(500);
    throw error;
  }
};

// @desc    Toggle product in wishlist (add if absent, remove if present)
// @route   POST /api/wishlist/toggle
// @access  Private
const toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user._id,
        products: [productId],
      });
    } else {
      const index = wishlist.products.findIndex(
        (p) => p.toString() === productId
      );

      if (index > -1) {
        wishlist.products.splice(index, 1);
      } else {
        wishlist.products.push(productId);
      }
    }

    await wishlist.save();

    const populated = await Wishlist.findById(wishlist._id).populate(
      'products',
      'name price images stock category rating numReviews'
    );

    res.json(populated);
  } catch (error) {
    res.status(res.statusCode || 500);
    throw error;
  }
};

// @desc    Check if product is in wishlist (returns boolean)
// @route   GET /api/wishlist/check/:productId
// @access  Private
const checkWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      return res.json({ inWishlist: false });
    }

    const inWishlist = wishlist.products.some(
      (p) => p.toString() === req.params.productId
    );

    res.json({ inWishlist });
  } catch (error) {
    res.status(500);
    throw error;
  }
};

module.exports = {
  getWishlist,
  toggleWishlist,
  checkWishlist,
};
