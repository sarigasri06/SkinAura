const Product = require('../models/Product');

// @desc    Get all products with filters and search
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const pageSize = 12;
    const page = Number(req.query.page) || 1;

    let query = {};

    // Search by keyword
    if (req.query.keyword) {
      query.$or = [
        { name: { $regex: req.query.keyword, $options: 'i' } },
        { description: { $regex: req.query.keyword, $options: 'i' } },
      ];
    }

    // Filter by category
    if (req.query.category && req.query.category !== 'all') {
      query.category = req.query.category;
    }

    // Filter by skin type
    if (req.query.skinType) {
      query.skinType = { $in: req.query.skinType.split(',') };
    }

    // Filter by concern
    if (req.query.concern) {
      query.concerns = { $in: [req.query.concern] };
    }

    // Price range filter
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
    }

    // In stock only
    if (req.query.inStock === 'true') {
      query.stock = { $gt: 0 };
    }

    // Sort
    let sortOption = {};
    switch (req.query.sort) {
      case 'price-asc':
        sortOption = { price: 1 };
        break;
      case 'price-desc':
        sortOption = { price: -1 };
        break;
      case 'rating':
        sortOption = { rating: -1 };
        break;
      case 'newest':
        sortOption = { createdAt: -1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    const count = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sortOption)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      total: count,
    });
  } catch (error) {
    res.status(500);
    throw error;
  }
};

// @desc    Search suggestions (autocomplete)
// @route   GET /api/products/suggestions
// @access  Public
const getSearchSuggestions = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.length < 2) {
      return res.json([]);
    }

    const regex = { $regex: q, $options: 'i' };
    const products = await Product.find(
      { $or: [{ name: regex }, { category: regex }, { ingredients: regex }] },
      'name category images'
    ).limit(8);

    res.json(products);
  } catch (error) {
    res.status(500);
    throw error;
  }
};

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true }).limit(8);
    res.json(products);
  } catch (error) {
    res.status(500);
    throw error;
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    res.status(res.statusCode || 500);
    throw error;
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      images: req.body.images || [],
      category: req.body.category,
      skinType: req.body.skinType || [],
      concerns: req.body.concerns || [],
      ingredients: req.body.ingredients || [],
      stock: req.body.stock,
      compareAtPrice: req.body.compareAtPrice,
      isFeatured: req.body.isFeatured,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400);
    throw error;
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = req.body.name || product.name;
      product.price = req.body.price || product.price;
      product.description = req.body.description || product.description;
      product.images = req.body.images || product.images;
      product.category = req.body.category || product.category;
      product.skinType = req.body.skinType || product.skinType;
      product.concerns = req.body.concerns || product.concerns;
      product.ingredients = req.body.ingredients || product.ingredients;
      product.stock = req.body.stock ?? product.stock;
      product.compareAtPrice = req.body.compareAtPrice ?? product.compareAtPrice;
      product.isFeatured = req.body.isFeatured ?? product.isFeatured;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    res.status(res.statusCode || 500);
    throw error;
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    res.status(res.statusCode || 500);
    throw error;
  }
};

// @desc    Create a review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = async (req, res) => {
  try {
    const { rating, title, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error('Product already reviewed');
      }

      const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        title: title || '',
        comment: comment || '',
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: 'Review added' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    res.status(res.statusCode || 500);
    throw error;
  }
};

// @desc    Get products grouped by category
// @route   GET /api/products/by-categories
// @access  Public
const getProductsByCategories = async (req, res) => {
  try {
    const products = await Product.find({ stock: { $gt: 0 } });

    const categories = [
      'cleanser', 'moisturizer', 'serum', 'toner',
      'sunscreen', 'mask', 'eye-care', 'lip-care',
      'body-care', 'face-care', 'set',
    ];

    const grouped = {};
    for (const cat of categories) {
      grouped[cat] = products.filter((p) => p.category === cat);
    }

    res.json(grouped);
  } catch (error) {
    res.status(500);
    throw error;
  }
};

module.exports = {
  getProducts,
  getFeaturedProducts,
  getProductById,
  getProductsByCategories,
  getSearchSuggestions,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
};
