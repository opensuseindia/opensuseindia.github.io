import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  Shirt,
  CheckCircle2,
  AlertCircle,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  Sparkles,
  Award,
  Clock,
  ShieldCheck,
  Tag,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../lib/sound';
import { useToast } from '../context/ToastContext';

export default function Merchandise() {
  const [catalog, setCatalog] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetch('/api/merchandise')
      .then((r) => r.json())
      .then((items) => {
        setCatalog(items);
        const defaults = {};
        items.forEach((it) => {
          defaults[it.id] = it.sizes ? it.sizes[0] : 'Standard';
        });
        setSelectedSizes(defaults);
      })
      .catch((err) => console.error('Failed to load merch:', err));
  }, []);

  const addToCart = (item) => {
    sounds.click();
    const size = selectedSizes[item.id] || 'M';
    const cartKey = `${item.id}-${size}`;

    setCart((prev) => {
      const existing = prev.find((i) => i.cartKey === cartKey);
      if (existing) {
        return prev.map((i) =>
          i.cartKey === cartKey ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, size, qty: 1, cartKey }];
    });

    toast(`Added "${item.name}" (${size}) to cart!`, 'success');
  };

  const updateQty = (cartKey, delta) => {
    sounds.hover();
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartKey === cartKey) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const cartTotal = cart.reduce((acc, it) => acc + it.priceINR * it.qty, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    sounds.success();
    confetti({ particleCount: 75, spread: 60 });
    const generatedId = `MERCH-2027-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderId(generatedId);
    setIsOrderComplete(true);
    setCart([]);
    toast(`Pre order successfully reserved! Voucher ID: ${generatedId}`, 'success');
  };

  return (
    <div className="pt-24 sm:pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 relative select-none">
      {/* Ambient Lighting */}
      <div className="absolute top-10 left-1/3 -translate-x-1/2 w-[500px] h-[500px] bg-[#73ba25]/[0.03] blur-[150px] pointer-events-none rounded-full" />

      {/* ========================================================= */}
      {/* SIGNATURE HEADER LOCKUP                                   */}
      {/* ========================================================= */}
      <div className="text-center max-w-3xl mx-auto mb-10 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#081510] border border-[#73ba25]/40 text-[#73ba25] font-pixel text-[8px] uppercase tracking-wider mb-2.5 shadow-[0_0_15px_rgba(115,186,37,0.15)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#73ba25] animate-pulse" />
          <span>// OFFICIAL APPAREL &amp; SWAG KIT DESK // OPENSUSE CONNECT '27</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#8ee631] animate-pulse" />
        </div>

        <h1
          className="text-2xl sm:text-4xl md:text-5xl font-pixel uppercase tracking-tight [word-spacing:-0.45em] select-none mb-2.5"
          style={{
            textShadow: '2px 2px 0 #0d3824, 4px 4px 0 #051910',
          }}
        >
          <span className="text-white">GEEKO </span>
          <span className="text-[#73ba25]">MERCH</span>
        </h1>

        <p className="text-slate-300 text-xs sm:text-sm font-mono leading-relaxed max-w-2xl mx-auto">
          Official openSUSE Bengaluru Connect 2027 apparel and accessories. Pre order online and collect directly at the campus registration desk with your Attendee Pass.
        </p>
      </div>

      {/* ========================================================= */}
      {/* TELEMETRY HUD RIBBON                                      */}
      {/* ========================================================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 max-w-4xl mx-auto mb-10 relative z-10">
        <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#0c1811]/90 via-[#06110a]/90 to-[#020704]/90 border border-[#73ba25]/30 flex items-center gap-3 shadow-lg">
          <div className="p-2 rounded-lg bg-[#73ba25]/15 text-[#73ba25] border border-[#73ba25]/25">
            <Shirt className="w-4 h-4" />
          </div>
          <div>
            <div className="text-white font-mono font-bold text-xs sm:text-sm">25 Reward Jerseys</div>
            <div className="text-slate-400 text-[10px] font-mono">Reserved for Podium</div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#0c1811]/90 via-[#06110a]/90 to-[#020704]/90 border border-cyan-500/30 flex items-center gap-3 shadow-lg">
          <div className="p-2 rounded-lg bg-cyan-500/15 text-cyan-400 border border-cyan-500/25">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <div>
            <div className="text-white font-mono font-bold text-xs sm:text-sm">On Site Pickup</div>
            <div className="text-slate-400 text-[10px] font-mono">Registration Desk</div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#161006]/90 via-[#0d0903]/90 to-[#050301]/90 border border-amber-500/30 flex items-center gap-3 shadow-lg">
          <div className="p-2 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/25">
            <Tag className="w-4 h-4" />
          </div>
          <div>
            <div className="text-white font-mono font-bold text-xs sm:text-sm">Community Pricing</div>
            <div className="text-slate-400 text-[10px] font-mono">Subsidized Gear</div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#0c1811]/90 via-[#06110a]/90 to-[#020704]/90 border border-emerald-500/30 flex items-center gap-3 shadow-lg">
          <div className="p-2 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-white font-mono font-bold text-xs sm:text-sm">Official Merch</div>
            <div className="text-slate-400 text-[10px] font-mono">openSUSE Verified</div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MERCHANDISE POLICY CALLOUT                                */}
      {/* ========================================================= */}
      <div className="p-4 rounded-xl bg-[#091a13] border border-[#73ba25]/30 mb-10 flex items-start gap-3.5 font-mono text-xs relative z-10">
        <AlertCircle className="w-5 h-5 text-[#73ba25] shrink-0 mt-0.5" />
        <div>
          <span className="text-white font-bold block mb-0.5">Attendee Merchandise Policy:</span>
          <span className="text-slate-300 leading-relaxed text-[11px]">
            Exactly 25 printed jerseys are reserved exclusively as competition honors (12 podium squads, 2 bug hunt, 4 arcade, 2 quest, 5 community). Non awardees can purchase jerseys and accessories via this pre order counter.
          </span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MAIN CATALOG & CART SPLIT                                 */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 relative z-10 items-start">
        {/* Catalog Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {catalog.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-2xl bg-gradient-to-br from-[#0c1811]/95 via-[#06110a]/95 to-[#020704]/95 border border-[#173f35] hover:border-[#73ba25]/50 p-6 flex flex-col justify-between overflow-hidden shadow-xl transition-all duration-300"
              >
                <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#73ba25]/60 to-transparent pointer-events-none" />
                <span className="absolute -top-[1px] -left-[1px] w-2.5 h-2.5 border-t-2 border-l-2 border-[#73ba25] pointer-events-none" />
                <span className="absolute -top-[1px] -right-[1px] w-2.5 h-2.5 border-t-2 border-r-2 border-[#73ba25] pointer-events-none" />

                <div>
                  <div className="relative h-48 rounded-xl overflow-hidden bg-black/60 border border-[#173f35] mb-4 flex items-center justify-center p-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/80 border border-white/10 text-white font-mono font-bold text-xs">
                      ₹{item.priceINR}
                    </span>
                  </div>

                  <h3 className="font-heading font-black text-lg text-white mb-1">
                    {item.name}
                  </h3>
                  <p className="text-slate-400 text-xs font-mono leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {item.sizes && (
                    <div className="mb-4">
                      <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1.5 font-bold">
                        Select Size:
                      </span>
                      <div className="flex gap-1.5">
                        {item.sizes.map((s) => (
                          <button
                            key={s}
                            onClick={() =>
                              setSelectedSizes((prev) => ({ ...prev, [item.id]: s }))
                            }
                            className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                              (selectedSizes[item.id] || 'M') === s
                                ? 'bg-[#73ba25] text-black shadow-sm'
                                : 'bg-black/60 border border-[#173f35] text-slate-400 hover:text-white'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => addToCart(item)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#73ba25] via-[#82cf2d] to-[#529419] hover:from-[#8ee631] hover:to-[#73ba25] text-black font-mono font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Pre order Cart</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Cart & Checkout Panel */}
        <div className="group relative rounded-2xl bg-gradient-to-br from-[#0c1811]/95 via-[#06110a]/95 to-[#020704]/95 border border-[#73ba25]/35 p-6 shadow-xl sticky top-24 font-mono text-xs overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#73ba25]/80 to-transparent pointer-events-none" />
          <span className="absolute -top-[1px] -left-[1px] w-2.5 h-2.5 border-t-2 border-l-2 border-[#73ba25] pointer-events-none" />
          <span className="absolute -top-[1px] -right-[1px] w-2.5 h-2.5 border-t-2 border-r-2 border-[#73ba25] pointer-events-none" />

          <h3 className="font-heading font-black text-lg text-white mb-4 pb-3 border-b border-[#173f35] flex items-center justify-between">
            <span>Pre order Cart</span>
            <span className="text-xs text-[#73ba25] font-mono font-normal">
              {cart.reduce((a, b) => a + b.qty, 0)} Items
            </span>
          </h3>

          {cart.length === 0 ? (
            <div className="text-center py-10 text-slate-500">
              <ShoppingBag className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p>Your cart is empty.</p>
              <p className="text-[11px] mt-1 text-slate-600">Select items on the left to pre order.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {cart.map((it) => (
                  <div
                    key={it.cartKey}
                    className="p-3 rounded-xl bg-black/60 border border-[#173f35] flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="font-bold text-white text-xs">{it.name}</div>
                      <div className="text-[10px] text-slate-400">
                        Size: {it.size} · ₹{it.priceINR} each
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-[#091a13] border border-[#173f35] rounded-lg p-0.5">
                        <button
                          onClick={() => updateQty(it.cartKey, -1)}
                          className="p-1 hover:text-white text-slate-400 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center font-bold text-white">{it.qty}</span>
                        <button
                          onClick={() => updateQty(it.cartKey, 1)}
                          className="p-1 hover:text-white text-slate-400 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[#173f35] space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Subtotal:</span>
                  <span className="font-bold text-white">₹{cartTotal}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Pickup Fulfillment:</span>
                  <span className="text-emerald-400 font-bold">FREE (On Campus)</span>
                </div>
                <div className="flex items-center justify-between text-sm pt-2 border-t border-[#173f35]">
                  <span className="font-bold text-white">Total Amount:</span>
                  <span className="text-lg font-black text-[#8ee631]">₹{cartTotal}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#73ba25] via-[#82cf2d] to-[#529419] hover:from-[#8ee631] hover:to-[#73ba25] text-black font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(115,186,37,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CreditCard className="w-4 h-4" />
                <span>Reserve Pre order Voucher</span>
              </button>
            </div>
          )}

          {isOrderComplete && (
            <div className="mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <div className="font-bold text-white text-xs mb-1">Pre order Confirmed!</div>
              <div className="text-[11px] text-emerald-300 font-mono mb-2">
                Voucher ID: <strong className="text-white">{orderId}</strong>
              </div>
              <p className="text-[10px] text-slate-400">
                Show this voucher code at the Newton School of Technology check in desk during Day 1 arrivals.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
