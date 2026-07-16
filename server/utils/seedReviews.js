const Product = require('../models/Product');
const User = require('../models/User');
const mongoose = require('mongoose');

const reviews = [
  // Cleansers
  { productIdx: 0, ratings: [
    { name: 'Priya', rating: 5, title: 'Holy grail cleanser!', comment: 'I have sensitive dry skin and this is the only cleanser that doesn\'t make my skin feel tight. Love it!' },
    { name: 'Ananya', rating: 5, title: 'Perfect for winter', comment: 'My dermatologist recommended this and it saved my skin barrier. Will repurchase forever.' },
    { name: 'Rahul', rating: 4, title: 'Good but pricey', comment: 'Works well but wish it came in a bigger size. Using it twice daily lasted about 2 months.' },
  ]},
  { productIdx: 1, ratings: [
    { name: 'Rahul', rating: 5, title: 'Controls oil perfectly', comment: 'I have super oily skin and this keeps my face shine-free for hours. The tea tree smell is refreshing.' },
    { name: 'Priya', rating: 4, title: 'Great for acne', comment: 'My breakouts reduced significantly after 2 weeks. A bit drying though, use moisturizer after.' },
    { name: 'Ananya', rating: 4, title: 'BHA works', comment: 'The salicylic acid really unclogs pores. Start slow — I used it once daily at first.' },
  ]},
  { productIdx: 2, ratings: [
    { name: 'Ananya', rating: 5, title: 'Glow achieved!', comment: 'My skin literally glows after using this. The papaya enzymes make it so smooth. Korean glass skin vibes!' },
    { name: 'Priya', rating: 5, title: 'Brightening godsend', comment: 'Dark spots from old acne are fading. I love the fresh citrus scent. Will buy again.' },
  ]},
  // Moisturizers
  { productIdx: 5, ratings: [
    { name: 'Priya', rating: 5, title: 'Ceramide heaven!', comment: 'My barrier was damaged from over-exfoliating and this fixed it in a week. Thick but absorbs beautifully.' },
    { name: 'Rahul', rating: 5, title: 'Derm recommended', comment: 'Eczema-friendly and non-greasy. I use it on my face and body. The tub lasts months!' },
    { name: 'Ananya', rating: 4, title: 'Good night cream', comment: 'I layer it over my retinol serum at night. Wake up with plump, hydrated skin.' },
  ]},
  { productIdx: 6, ratings: [
    { name: 'Ananya', rating: 4, title: 'Light and mattifying', comment: 'Perfect for humid Mumbai weather. Doesn\'t make me look oily. Good under sunscreen.' },
    { name: 'Rahul', rating: 5, title: 'Pores look smaller', comment: 'After 3 weeks my pores are visibly tighter. The niacinamide concentration is just right.' },
  ]},
  // Serums
  { productIdx: 10, ratings: [
    { name: 'Ananya', rating: 5, title: 'Dark spots bye bye 👋', comment: 'Used this for 2 months and my stubborn dark spots are almost gone. It tingles slightly but no irritation.' },
    { name: 'Priya', rating: 4, title: 'Potent formula', comment: 'Very strong — I dilute it with moisturizer. Results are visible but takes patience. Don\'t use on broken skin!' },
    { name: 'Rahul', rating: 5, title: 'Chef\'s kiss', comment: 'The Ordinary never disappoints. Best price-to-performance vitamin C in the market.' },
  ]},
  { productIdx: 11, ratings: [
    { name: 'Priya', rating: 5, title: 'Plump skin in a bottle', comment: 'Applied on damp skin and my fine lines disappeared. Use this before your moisturizer. Game changer!' },
    { name: 'Rahul', rating: 5, title: 'Works in Delhi dry air', comment: 'I live in Delhi and this saves my skin in winter. Layering is key — water, then HA, then moisturizer.' },
    { name: 'Ananya', rating: 4, title: 'Good basic serum', comment: 'Nothing fancy but it does the job. Hydration lasts all day under makeup.' },
  ]},
  { productIdx: 13, ratings: [
    { name: 'Ananya', rating: 5, title: 'Snail mucin magic ✨', comment: 'I was skeptical but this is the real deal. My acne scars have faded so much. Glowy, dewy skin every morning.' },
    { name: 'Priya', rating: 5, title: 'Korean beauty staple', comment: 'Stringy texture but absorbs fast. My skin is the softest it\'s ever been. Pair with the snail cream!' },
    { name: 'Rahul', rating: 5, title: 'Best seller for a reason', comment: 'Helped with texture and hydration. My girlfriend stole my bottle so I had to buy another one.' },
  ]},
  // Toners
  { productIdx: 17, ratings: [
    { name: 'Priya', rating: 5, title: 'Ginseng goodness', comment: 'Smells like a spa and makes my skin so supple. I pat it in with my hands — no cotton pad needed.' },
    { name: 'Ananya', rating: 4, title: 'Luxury feel', comment: 'Feels expensive and works well. The bottle design is beautiful on my vanity.' },
  ]},
  { productIdx: 18, ratings: [
    { name: 'Ananya', rating: 5, title: 'Calmed my redness', comment: 'I have rosacea and this toner soothes my flare-ups instantly. The centella concentration is no joke.' },
    { name: 'Rahul', rating: 5, title: 'After-shave miracle', comment: 'I use this after shaving and zero irritation. Cooling and refreshing. Will repurchase forever.' },
  ]},
  // Sunscreens
  { productIdx: 20, ratings: [
    { name: 'Rahul', rating: 5, title: 'No white cast!', comment: 'Finally a sunscreen that works on Indian skin tone. Zero white cast, absorbs fast, no sweating.' },
    { name: 'Ananya', rating: 5, title: 'Under makeup perfection', comment: 'Works as a primer too. My foundation glides on top. PA++++ for the win!' },
    { name: 'Priya', rating: 4, title: 'Good daily SPF', comment: 'Lightweight but I need to reapply every 3 hours for full protection. Great texture though.' },
  ]},
  { productIdx: 21, ratings: [
    { name: 'Priya', rating: 5, title: 'Mineral sunscreen done right', comment: 'The tint blends perfectly — no white cast on my medium skin tone. Very gentle on my sensitive skin.' },
    { name: 'Rahul', rating: 4, title: 'Good for sensitive skin', comment: 'No stinging around the eyes. Slightly thick but spreads fine. Reef-safe which is a bonus.' },
  ]},
  // Masks
  { productIdx: 25, ratings: [
    { name: 'Ananya', rating: 5, title: 'Wake up glowing', comment: 'I use this 3 times a week and my skin is glass-like in the morning. The rice smell is subtle and calming.' },
    { name: 'Priya', rating: 5, title: 'Rice mask holy grail', comment: 'COSRX doesn\'t miss. This mask is creamy, hydrating, and visibly brightens. My PM routine staple.' },
  ]},
  // Eye Care
  { productIdx: 29, ratings: [
    { name: 'Priya', rating: 4, title: 'Dark circles improved', comment: 'After a month of use my under eyes are brighter. The retinal is gentle — zero irritation.' },
    { name: 'Ananya', rating: 5, title: 'Vitamin K works!', comment: 'I had stubborn dark circles from lack of sleep and this actually helped. Very lightweight texture.' },
  ]},
  // Lip Care
  { productIdx: 33, ratings: [
    { name: 'Ananya', rating: 5, title: 'Best lip mask ever', comment: 'I apply a thick layer before bed and wake up with baby soft lips. The vanilla scent is divine.' },
    { name: 'Rahul', rating: 5, title: 'Chapped lips no more', comment: 'Delhi winters destroyed my lips and this fixed them in 2 nights. Worth every rupee.' },
  ]},
  // Sets
  { productIdx: 47, ratings: [
    { name: 'Priya', rating: 5, title: 'Perfect starter kit', comment: 'Bought this for my mom and she loves it. Everything you need in one box. Great value for money.' },
    { name: 'Ananya', rating: 5, title: 'Travel essential', comment: 'Mini sizes are perfect for flights. The quality is identical to full size. Will buy again for my next trip.' },
  ]},
  { productIdx: 50, ratings: [
    { name: 'Ananya', rating: 5, title: 'Snail duo dream', comment: 'Using the essence + cream together is transformative. My skin is the most hydrated it\'s ever been. Glass skin unlocked!' },
    { name: 'Priya', rating: 5, title: 'Worth the hype', comment: 'I bought into the TikTok hype and have zero regrets. My dark spots faded and skin is so plump.' },
    { name: 'Rahul', rating: 5, title: 'Gift for my sister', comment: 'Got this for my sister\'s birthday and she won\'t stop raving about it. The packaging is gorgeous.' },
  ]},
];

const seedReviews = async () => {
  try {
    const products = await Product.find({});
    if (products.length === 0) {
      console.log('No products found to add reviews. Seed products first.');
      return;
    }

    // Check if reviews already exist
    const totalExistingReviews = products.reduce((sum, p) => sum + (p.reviews ? p.reviews.length : 0), 0);
    if (totalExistingReviews > 0) {
      console.log(`Products already have ${totalExistingReviews} reviews, skipping review seed.`);
      return;
    }

    let reviewCount = 0;
    for (const entry of reviews) {
      if (entry.productIdx >= products.length) continue;
      const product = products[entry.productIdx];

      const reviewDocs = entry.ratings.map((r) => ({
        user: new mongoose.Types.ObjectId(), // dummy ObjectId
        name: r.name,
        rating: r.rating,
        title: r.title || '',
        comment: r.comment || '',
      }));

      product.reviews = reviewDocs;
      product.numReviews = reviewDocs.length;
      product.rating = reviewDocs.reduce((sum, r) => sum + r.rating, 0) / reviewDocs.length;
      await product.save();
      reviewCount += reviewDocs.length;
    }

    console.log(`✅ Seeded ${reviewCount} customer reviews across ${reviews.length} products.`);
  } catch (error) {
    console.error(`Review seeding error: ${error.message}`);
  }
};

module.exports = seedReviews;
