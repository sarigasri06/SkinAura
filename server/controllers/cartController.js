const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate(
      'items.product',
      'name price images stock'
    );

    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    res.json(cart);
  } catch (error) {
    res.status(500);
    throw error;
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    if (product.stock < quantity) {
      res.status(400);
      throw new Error('Not enough stock available');
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [{ product: productId, quantity, price: product.price }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
        cart.items[itemIndex].price = product.price;
      } else {
        cart.items.push({ product: productId, quantity, price: product.price });
      }
    }

    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate(
      'items.product',
      'name price images stock'
    );

    res.json(populatedCart);
  } catch (error) {
    res.status(res.statusCode || 500);
    throw error;
  }
};

// @desc    Update item quantity in cart
// @route   PUT /api/cart/:itemId
// @access  Private
const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      res.status(404);
      throw new Error('Cart not found');
    }

    const item = cart.items.id(req.params.itemId);

    if (!item) {
      res.status(404);
      throw new Error('Item not found in cart');
    }

    if (quantity < 1) {
      cart.items.pull({ _id: req.params.itemId });
    } else {
      item.quantity = quantity;
    }

    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate(
      'items.product',
      'name price images stock'
    );

    res.json(populatedCart);
  } catch (error) {
    res.status(res.statusCode || 500);
    throw error;
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:itemId
// @access  Private
const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      res.status(404);
      throw new Error('Cart not found');
    }

    cart.items.pull({ _id: req.params.itemId });
    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate(
      'items.product',
      'name price images stock'
    );

    res.json(populatedCart);
  } catch (error) {
    res.status(res.statusCode || 500);
    throw error;
  }
};

// @desc    Clear entire cart
// @route   DELETE /api/cart
// @access  Private
const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      cart.items = [];
      await cart.save();
    }

    res.json({ message: 'Cart cleared', items: [] });
  } catch (error) {
    res.status(500);
    throw error;
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};
