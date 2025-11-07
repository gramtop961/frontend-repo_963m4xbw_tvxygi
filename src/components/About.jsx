import { Sparkles } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="relative py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-amber-300/20 text-amber-200"><Sparkles /></div>
            <h3 className="text-xl font-semibold text-white">Why Sunny?</h3>
          </div>
          <p className="mt-4 text-white/80">
            We craft a shopping experience that feels bright, friendly, and fast. Enjoy beautiful visuals, smooth interactions, and hand-picked products
            that bring a little sunshine to your day. Built with performance and accessibility in mind.
          </p>
        </div>
      </div>
    </section>
  );
}
