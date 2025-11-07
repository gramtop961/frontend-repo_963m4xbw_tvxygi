import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, PackageCheck, Inbox, CheckCircle2 } from 'lucide-react';

export default function AdminPanel({ onCreateProduct, onViewOrders, orders = [] }) {
  const [form, setForm] = useState({ title: '', price: '', image: '' });
  const [created, setCreated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.price) return;
    const product = {
      id: crypto.randomUUID(),
      title: form.title,
      price: parseFloat(form.price),
      rating: 4.5,
      img: form.image || 'https://images.unsplash.com/photo-1511385348-a52b4a160dc2?q=80&w=1200&auto=format&fit=crop',
    };
    onCreateProduct?.(product);
    setForm({ title: '', price: '', image: '' });
    setCreated(true);
    setTimeout(() => setCreated(false), 1500);
  };

  return (
    <section id="admin" className="relative py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-amber-300/20 text-amber-200"><Upload /></div>
              <h3 className="text-xl font-semibold text-white">Upload New Product</h3>
            </div>
            <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-4">
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Product title"
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-300"
              />
              <input
                type="number"
                step="0.01"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="Price"
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-300"
              />
              <input
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="Image URL (optional)"
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-300"
              />
              <button type="submit" className="mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-br from-amber-300 to-orange-400 text-amber-900 font-semibold shadow hover:shadow-amber-400/40 transition">
                <PackageCheck size={18} /> Add Product
              </button>
              {created && (
                <div className="flex items-center gap-2 text-green-300"><CheckCircle2 /> Product added</div>
              )}
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-amber-300/20 text-amber-200"><Inbox /></div>
              <h3 className="text-xl font-semibold text-white">Incoming Orders</h3>
            </div>
            <div className="mt-4 space-y-3 max-h-72 overflow-auto pr-2">
              {orders.length === 0 && (
                <p className="text-white/70">No orders yet. Orders placed by customers will appear here.</p>
              )}
              {orders.map((o) => (
                <div key={o.id} className="rounded-xl bg-white/5 ring-1 ring-white/10 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Order #{o.id.slice(0, 6).toUpperCase()}</p>
                      <p className="text-white/70 text-sm">Items: {o.items?.length || 0}</p>
                    </div>
                    <p className="text-white font-semibold">${o.total?.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={onViewOrders} className="mt-4 text-amber-300 hover:text-amber-200">Refresh</button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
