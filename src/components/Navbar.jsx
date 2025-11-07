import { useState } from 'react';
import { Sun, ShoppingCart, Menu, X, Settings } from 'lucide-react';

export default function Navbar({ cartCount = 0, onNavigateShop, onNavigateAdmin }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-xl bg-white/10 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-amber-300 via-yellow-300 to-orange-400 shadow-inner">
              <Sun className="text-amber-700" size={20} />
            </div>
            <button
              onClick={onNavigateShop}
              className="text-lg font-semibold tracking-tight text-white/90 hover:text-white transition"
            >
              Sunny Online Store
            </button>
          </div>

          <nav className="hidden md:flex items-center gap-3">
            <button
              onClick={onNavigateShop}
              className="px-3 py-2 rounded-lg text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition"
            >
              Shop
            </button>
            <button
              onClick={onNavigateAdmin}
              className="px-3 py-2 rounded-lg text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition flex items-center gap-2"
            >
              <Settings size={16} /> Admin
            </button>
            <div className="relative">
              <button className="px-3 py-2 rounded-lg text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition flex items-center gap-2">
                <ShoppingCart size={16} /> Cart
              </button>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 text-[10px] px-1.5 py-0.5 rounded-full bg-amber-400 text-amber-900 font-bold shadow">{cartCount}</span>
              )}
            </div>
          </nav>

          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg hover:bg-white/10 text-white/90"
            onClick={() => setOpen(!open)}
            aria-label="Toggle Menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col gap-2">
              <button onClick={() => { onNavigateShop(); setOpen(false); }} className="px-3 py-2 rounded-lg text-left text-white/90 hover:text-white hover:bg-white/10">Shop</button>
              <button onClick={() => { onNavigateAdmin(); setOpen(false); }} className="px-3 py-2 rounded-lg text-left text-white/90 hover:text-white hover:bg-white/10 flex items-center gap-2"><Settings size={16}/> Admin</button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
