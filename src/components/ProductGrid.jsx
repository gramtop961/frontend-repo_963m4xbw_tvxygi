import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Star } from 'lucide-react';

const demoProducts = [
  {
    id: 'p1',
    title: 'Sunbeam Wireless Headphones',
    price: 129.99,
    rating: 4.7,
    img: 'https://images.unsplash.com/photo-1518444028785-8f14160f0d48?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'p2',
    title: 'Aurora Smart Lamp',
    price: 89.0,
    rating: 4.5,
    img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'p3',
    title: 'Solar Breeze Fan',
    price: 59.5,
    rating: 4.3,
    img: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'p4',
    title: 'Golden Hour Watch',
    price: 199.99,
    rating: 4.9,
    img: 'https://images.unsplash.com/photo-1511385348-a52b4a160dc2?q=80&w=1200&auto=format&fit=crop',
  },
];

export default function ProductGrid({ onAddToCart }) {
  const [products] = useState(demoProducts);

  return (
    <section id="products" className="relative py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-300/5 to-transparent pointer-events-none" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Trending Now</h2>
            <p className="text-white/70">Curated picks with sunny vibes</p>
          </div>
          <a href="#admin" className="text-amber-300 hover:text-amber-200">Are you the admin?</a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="group relative rounded-2xl overflow-hidden bg-white/5 ring-1 ring-white/10"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-white line-clamp-1">{p.title}</h3>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-300 text-sm">
                    <Star size={16} className="fill-amber-300 text-amber-300" />
                    <span>{p.rating}</span>
                  </div>
                  <p className="text-white font-bold">${p.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => onAddToCart?.(p)}
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-br from-amber-300 to-orange-400 text-amber-900 font-semibold shadow hover:shadow-amber-400/40 transition"
                >
                  <ShoppingBag size={18} /> Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
