import { useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import AdminPanel from './components/AdminPanel';

function useCart() {
  const [items, setItems] = useState([]);
  const add = (p) => setItems((prev) => {
    const existing = prev.find((i) => i.id === p.id);
    if (existing) {
      return prev.map((i) => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
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

  const handleCreateProduct = (product) => {
    // In a full app, send to backend. Here we just show a toast-like feedback in AdminPanel
    console.log('Created product', product);
  };

  const handlePlaceOrder = () => {
    if (cart.items.length === 0) return;
    const order = {
      id: crypto.randomUUID(),
      items: cart.items,
      total: cart.total,
      createdAt: new Date().toISOString(),
    };
    // In a full app, send to backend; we store locally to simulate admin receiving.
    setOrders((prev) => [order, ...prev]);
    cart.clear();
    alert('Order placed! The admin has received it.');
  };

  return (
    <div className="min-h-screen bg-[#0b0b10] text-white">
      <Navbar
        cartCount={cart.items.reduce((n, i) => n + i.qty, 0)}
        onNavigateShop={() => setAdminView(false)}
        onNavigateAdmin={() => setAdminView(true)}
      />

      {!adminView && (
        <>
          <Hero />
          <ProductGrid onAddToCart={cart.add} />
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
