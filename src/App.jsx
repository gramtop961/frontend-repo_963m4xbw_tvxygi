import { useMemo, useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import AdminPanel from './components/AdminPanel';
import About from './components/About';

function useCart() {
  const [items, setItems] = useState([]);
  const add = (p) => setItems((prev) => {
    const existing = prev.find((i) => i.id === p.id);
    if (existing) {
      return prev.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i));
    }
    return [...prev, { ...p, qty: 1 }];
  });
  const total = useMemo(() => items.reduce((sum, i) => sum + i.price * i.qty, 0), [items]);
  const clear = () => setItems([]);
  return { items, add, total, clear };
}

export default function App() {
  const cart = useCart();
  const [orders, setOrders] = useState([]);
  const [adminView, setAdminView] = useState(false);
  const productsRef = useRef(null);

  useEffect(() => {
    // Try loading existing orders from backend if configured, otherwise ignore
    const base = import.meta.env.VITE_BACKEND_URL;
    if (!base) return;
    fetch(`${base}/api/orders`).then(r => r.ok ? r.json() : null).then((data) => {
      if (Array.isArray(data)) setOrders(data);
    }).catch(() => {});
  }, []);

  const handleCreateProduct = async (product) => {
    const base = import.meta.env.VITE_BACKEND_URL;
    if (base) {
      try {
        await fetch(`${base}/api/products`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(product) });
      } catch (_) {}
    }
  };

  const handlePlaceOrder = async () => {
    if (cart.items.length === 0) return;
    const order = {
      items: cart.items.map(({ id, title, price, qty, img }) => ({ id, title, price, qty, img })),
      total: cart.total,
      createdAt: new Date().toISOString(),
    };

    const base = import.meta.env.VITE_BACKEND_URL;
    if (base) {
      try {
        await fetch(`${base}/api/orders`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(order) });
      } catch (_) {}
    }

    setOrders((prev) => [{ id: crypto.randomUUID(), ...order }, ...prev]);
    cart.clear();
    alert('Order placed! The admin has received it.');
  };

  return (
    <div className="min-h-screen bg-[#0b0b10] text-white">
      <Navbar
        cartCount={cart.items.reduce((n, i) => n + i.qty, 0)}
        onNavigateShop={() => { setAdminView(false); productsRef.current?.scrollIntoView({ behavior: 'smooth' }); }}
        onNavigateAdmin={() => setAdminView(true)}
      />

      {!adminView && (
        <>
          <Hero />
          <div ref={productsRef}>
            <ProductGrid onAddToCart={cart.add} />
          </div>
          <section className="py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold">Your Cart</h3>
                  <p className="text-white/70 text-sm">Review items and place an order. It will be sent to the admin dashboard.</p>
                </div>
                <div className="flex-1" />
                <div className="flex items-center gap-6">
                  <p className="text-white/90">Total: <span className="font-bold">${cart.total.toFixed(2)}</span></p>
                  <button onClick={handlePlaceOrder} className="px-5 py-3 rounded-xl bg-gradient-to-br from-amber-300 to-orange-400 text-amber-900 font-semibold shadow hover:shadow-amber-400/40 transition">
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </section>
          <About />
        </>
      )}

      {adminView && (
        <AdminPanel
          onCreateProduct={handleCreateProduct}
          onViewOrders={() => {}}
          orders={orders}
        />
      )}

      <footer className="py-10 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white/60">
          © {new Date().getFullYear()} Sunny Online Store. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
