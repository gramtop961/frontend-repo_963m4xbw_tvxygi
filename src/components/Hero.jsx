import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative pt-24 overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/0q0tJ0r9oKcG6Q7x/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative isolate">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 ring-1 ring-white/20 text-white/80 text-xs">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400" />
              Welcome to Sunny Online Store
            </div>
            <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-amber-200 via-yellow-100 to-white">
              Shop radiant deals under the sun
            </h1>
            <p className="mt-4 text-white/80 text-lg">
              Discover hand-picked products with bright aesthetics and brilliant prices. Enjoy a premium shopping experience that feels warm and effortless.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <a href="#products" className="px-5 py-3 rounded-xl bg-amber-400 text-amber-900 font-semibold shadow-lg shadow-amber-400/30 hover:shadow-amber-400/50 transition">
                Browse Products
              </a>
              <a href="#about" className="px-5 py-3 rounded-xl bg-white/10 text-white/90 hover:bg-white/20 transition">
                Why Sunny?
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
