import { FiClock, FiCheck, FiTruck, FiPackage, FiHome } from 'react-icons/fi';

const gallery = [
  { id: 1, name: 'Priya S.', concern: 'Acne & Dark Spots', duration: '8 weeks', before: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&h=400&fit=crop', after: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop', products: ['Vitamin C Serum', 'Niacinamide 10%'], quote: 'My skin has never been this clear. The dark spots from my acne are almost completely gone!' },
  { id: 2, name: 'Rahul V.', concern: 'Dull & Tired Skin', duration: '6 weeks', before: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop', after: 'https://images.unsplash.com/photo-1570194065650-d99fb4d8a609?w=400&h=400&fit=crop', products: ['Snail Mucin Essence', 'Hyaluronic Acid Serum'], quote: 'People keep asking if I got a facial! My skin is glowing like never before.' },
  { id: 3, name: 'Ananya P.', concern: 'Uneven Texture & Pores', duration: '10 weeks', before: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=400&fit=crop', after: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop', products: ['AHA/BHA Serum', 'Rice Overnight Mask'], quote: 'My pores are visibly smaller and my skin texture is so smooth now!' },
  { id: 4, name: 'Kavya M.', concern: 'Dry & Flaky Skin', duration: '4 weeks', before: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop', after: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=400&fit=crop', products: ['Ceramide Cream', 'Centella Toner'], quote: 'My barrier is finally repaired. No more flaking or tightness!' },
  { id: 5, name: 'Sneha R.', concern: 'Hyperpigmentation', duration: '12 weeks', before: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop', after: 'https://images.unsplash.com/photo-1624454002302-36b824d7bd0a?w=400&h=400&fit=crop', products: ['Vitamin C 20%', 'Sunscreen SPF 50'], quote: 'My pigmentation has faded so much. I finally feel confident without foundation!' },
  { id: 6, name: 'Deepak K.', concern: 'Eye Bags & Dark Circles', duration: '6 weeks', before: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop', after: 'https://images.unsplash.com/photo-1570194065650-d99fb4d8a609?w=400&h=400&fit=crop', products: ['Vitamin K Eye Cream', 'Caffeine Eye Serum'], quote: 'My under eyes look so much brighter. No more looking tired all the time!' },
];

const BeforeAfterPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-rose-50">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-rose-800 mb-4">
          Before & After Gallery
        </h1>
        <p className="text-rose-500 max-w-2xl mx-auto">
          Real results from our community. See how great skincare transformed real skin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {gallery.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-rose-100 overflow-hidden hover:shadow-md transition-shadow">
            {/* Before / After Images */}
            <div className="grid grid-cols-2 gap-1">
              <div className="relative">
                <img src={item.before} alt={`${item.name} before`} className="w-full h-48 object-cover" />
                <span className="absolute bottom-2 left-2 bg-rose-800/80 text-white text-[10px] px-2 py-0.5 rounded-full font-medium">BEFORE</span>
              </div>
              <div className="relative">
                <img src={item.after} alt={`${item.name} after`} className="w-full h-48 object-cover" />
                <span className="absolute bottom-2 left-2 bg-rose-500/80 text-white text-[10px] px-2 py-0.5 rounded-full font-medium">AFTER</span>
              </div>
            </div>

            {/* Info */}
            <div className="p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-rose-800">{item.name}</h3>
                <span className="text-xs text-rose-400 flex items-center gap-1">
                  <FiClock size={12} /> {item.duration}
                </span>
              </div>
              <p className="text-xs text-rose-500 mb-1">Concern: <span className="font-medium">{item.concern}</span></p>
              <div className="flex flex-wrap gap-1.5 mt-2 mb-3">
                {item.products.map((p) => (
                  <span key={p} className="text-[10px] bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full">{p}</span>
                ))}
              </div>
              <blockquote className="text-sm text-rose-600 italic border-l-2 border-rose-200 pl-3 leading-relaxed">
                "{item.quote}"
              </blockquote>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-16 py-12 bg-rose-500 rounded-3xl">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">Ready for Your Transformation?</h2>
        <p className="text-rose-100 mb-6">Join thousands who found their glow with Skin Aura</p>
        <a href="/products" className="inline-block bg-white text-rose-500 px-8 py-3 rounded-lg font-semibold hover:bg-rose-50 transition-colors">
          Shop Now
        </a>
      </div>
    </div>
  );
};

export default BeforeAfterPage;
