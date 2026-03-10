import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { Heart, Star, Moon, Sun, ChevronDown, Clock, Sparkles } from 'lucide-react';

// ─── Images served from /public/images/ by Vite natively ────────────────────
const IMAGES = [
  '/images/WhatsApp Image 2026-03-10 at 19.39.21.jpeg',
  '/images/WhatsApp Image 2026-03-10 at 19.39.21 (1).jpeg',
  '/images/WhatsApp Image 2026-03-10 at 19.39.21 (2).jpeg',
  '/images/WhatsApp Image 2026-03-10 at 19.39.22.jpeg',
  '/images/WhatsApp Image 2026-03-10 at 19.39.22 (1).jpeg',
  '/images/WhatsApp Image 2026-03-10 at 19.39.23.jpeg',
  '/images/WhatsApp Image 2026-03-10 at 19.39.23 (1).jpeg',
  '/images/WhatsApp Image 2026-03-10 at 19.39.23 (2).jpeg',
  '/images/WhatsApp Image 2026-03-10 at 19.39.24.jpeg',
  '/images/WhatsApp Image 2026-03-10 at 19.39.24 (1).jpeg',
  '/images/WhatsApp Image 2026-03-10 at 19.39.24 (2).jpeg',
  '/images/WhatsApp Image 2026-03-10 at 19.39.25.jpeg',
  '/images/WhatsApp Image 2026-03-10 at 19.39.25 (1).jpeg',
  '/images/WhatsApp Image 2026-03-10 at 19.39.26.jpeg',
  '/images/WhatsApp Image 2026-03-10 at 19.39.26 (1).jpeg',
  '/images/WhatsApp Image 2026-03-10 at 19.39.26 (2).jpeg',
  '/images/WhatsApp Image 2026-03-10 at 19.39.27.jpeg',
  '/images/WhatsApp Image 2026-03-10 at 19.39.27 (1).jpeg',
  '/images/WhatsApp Image 2026-03-10 at 19.39.27 (2).jpeg',
  '/images/WhatsApp Image 2026-03-10 at 19.39.28.jpeg',
  '/images/WhatsApp Image 2026-03-10 at 19.39.28 (1).jpeg',
  '/images/WhatsApp Image 2026-03-10 at 19.39.28 (2).jpeg',
  '/images/WhatsApp Image 2026-03-10 at 19.39.33.jpeg',
  '/images/WhatsApp Image 2026-03-10 at 19.39.33 (1).jpeg',
  '/images/WhatsApp Image 2026-03-10 at 19.39.34.jpeg',
  '/images/WhatsApp Image 2026-03-10 at 19.39.34 (1).jpeg',
  '/images/WhatsApp Image 2026-03-10 at 19.39.34 (2).jpeg',
  '/images/WhatsApp Image 2026-03-10 at 19.39.35.jpeg',
  '/images/WhatsApp Image 2026-03-10 at 19.39.35 (1).jpeg',
  '/images/WhatsApp Image 2026-03-10 at 19.39.35 (2).jpeg',
  '/images/WhatsApp Image 2026-03-10 at 19.39.36.jpeg',
  '/images/WhatsApp Image 2026-03-10 at 19.39.36 (1).jpeg',
  '/images/WhatsApp Image 2026-03-10 at 19.39.36 (2).jpeg',
  '/images/WhatsApp Image 2026-03-10 at 19.39.36 (3).jpeg',
  '/images/WhatsApp Image 2026-03-10 at 19.40.11.jpeg',
];

// ─────────────────────────────────────────────────────────────────────────────
// Custom Cursor
// ─────────────────────────────────────────────────────────────────────────────
const CustomCursor = () => {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const xs = useSpring(x, { stiffness: 700, damping: 25 });
  const ys = useSpring(y, { stiffness: 700, damping: 25 });
  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);
  return (
    <motion.div
      className="fixed pointer-events-none z-[9999] rounded-full"
      style={{
        left: xs, top: ys, translateX: '-50%', translateY: '-50%',
        width: 28, height: 28,
        background: 'radial-gradient(circle, rgba(251,113,133,0.85) 0%, rgba(251,113,133,0.15) 75%)',
        boxShadow: '0 0 16px rgba(251,113,133,0.5)',
      }}
    />
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Floating Petals
// ─────────────────────────────────────────────────────────────────────────────
const FloatingPetals = () => {
  const petals = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${(i / 12) * 100}%`,
    delay: i * 1.1,
    duration: 12 + (i % 4) * 3,
    size: 10 + (i % 5) * 3,
    rotate: i * 30,
  })), []);
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {petals.map(p => (
        <motion.div key={p.id}
          style={{
            left: p.left, top: '-30px', width: p.size, height: p.size,
            borderRadius: '50% 0 50% 0',
            background: 'linear-gradient(135deg, rgba(251,113,133,0.35), rgba(253,186,116,0.25))',
          }}
          animate={{ y: ['0vh', '108vh'], rotate: [p.rotate, p.rotate + 360], opacity: [0, 0.5, 0.5, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
        />
      ))}
      <div className="absolute top-[-5%] left-[-5%] w-[35%] h-[35%] rounded-full bg-rose-100/50 blur-[100px]" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] rounded-full bg-amber-50/40 blur-[120px]" />
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────────────────
const Hero = () => (
  <section className="relative min-h-[100svh] flex flex-col items-center justify-between text-center px-6 py-12">
    {/* Top spacer to balance the flex distribution */}
    <div className="h-10 w-full" />

    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 flex flex-col items-center"
    >
      {/* Icon */}
      <motion.div
        animate={{ scale: [1, 1.12, 1], rotate: [0, 6, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="mb-8 mt-4"
      >
        <Heart className="text-rose-400" size={48} fill="currentColor" strokeWidth={0} />
      </motion.div>

      {/* Main heading */}
      <h1 className="serif leading-[0.95] tracking-tight text-stone-800 mb-8"
        style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}>
        A Year of <br />
        <span className="font-light text-rose-400">Pure Magic</span>
      </h1>

      {/* Date line */}
      <div className="flex items-center gap-4 mb-5">
        <div className="h-px w-8 sm:w-12 bg-rose-200" />
        <span className="uppercase tracking-[0.45em] text-[10px] sm:text-xs font-semibold text-stone-400">
          March 11, 2025
        </span>
        <div className="h-px w-8 sm:w-12 bg-rose-200" />
      </div>

      {/* Time badge */}
      <div className="flex items-center gap-2 text-stone-400 text-sm serif mb-8">
        <Clock size={13} />
        <span>5:38 PM — The moment the stars aligned</span>
      </div>

      {/* Subtitle */}
      <p className="max-w-md mx-auto text-stone-500 text-base md:text-lg font-light leading-[1.8] serif">
        "When you were born, the moon was waxing, the stars were whispering,
        and our world was forever changed."
      </p>
    </motion.div>

    {/* Scroll cue (now nicely positioned at bottom via flex layout) */}
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4, duration: 1 }}
      className="flex flex-col items-center gap-2 mt-auto pt-10"
    >
      <span className="text-[10px] uppercase tracking-[0.32em] text-stone-400">Scroll to explore</span>
      <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
        <ChevronDown className="text-rose-300" size={20} />
      </motion.div>
    </motion.div>
  </section>
);

// ─────────────────────────────────────────────────────────────────────────────
// SEQUENTIAL GALLERY  (3 sets, each reveal clean)
// ─────────────────────────────────────────────────────────────────────────────
const GALLERY_SETS = [
  { title: 'The Early Days', caption: 'She arrived and love multiplied', imgs: IMAGES.slice(0, 4) },
  { title: 'Growing So Fast', caption: 'Every smile left us breathless', imgs: IMAGES.slice(4, 8) },
  { title: 'Our Little Angel', caption: 'She is the love we never knew we needed', imgs: IMAGES.slice(8, 12) },
];

const SequentialGallery = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 22, mass: 0.6 });

  const bgColor = useTransform(smooth, [0, 0.33, 0.66, 1], ['#fdfcf8', '#fff5f5', '#f5f0ff', '#fdfcf8']);

  // Strictly non-overlapping thirds — fade in, hold, fade out
  const bands = [
    [0, 0.07, 0.26, 0.33],
    [0.33, 0.40, 0.59, 0.66],
    [0.66, 0.73, 0.92, 1.0],
  ];
  const opacities = bands.map(b => useTransform(smooth, b, [0, 1, 1, 0]));
  const scales = bands.map(b => useTransform(smooth, b, [0.91, 1, 1, 1.04]));

  return (
    <motion.section ref={ref} style={{ backgroundColor: bgColor }} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="w-full max-w-6xl px-6">
          {GALLERY_SETS.map((set, i) => (
            <motion.div
              key={i}
              style={{ opacity: opacities[i], scale: scales[i] }}
              className="absolute inset-0 flex flex-col items-center justify-center px-6"
            >
              {/* Title block — self-contained, won't bleed */}
              <div className="text-center mb-8 flex-shrink-0">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="h-px w-8 bg-rose-300" />
                  <Heart size={11} className="text-rose-400" fill="currentColor" />
                  <div className="h-px w-8 bg-rose-300" />
                </div>
                <h2 className="serif text-4xl md:text-5xl text-stone-800 leading-tight">
                  {set.title}
                </h2>
                <p className="text-stone-400 text-[11px] mt-2 tracking-[0.35em] uppercase">
                  {set.caption}
                </p>
              </div>

              {/* Photo grid — fills remaining height without overflow */}
              <div className="grid grid-cols-4 gap-3 w-full" style={{ height: 'min(56vh, 520px)' }}>
                {set.imgs.map((url, j) => (
                  <div
                    key={j}
                    className={`rounded-2xl overflow-hidden shadow-xl group relative ${j % 2 !== 0 ? 'mt-5' : ''}`}
                  >
                    <img src={url} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// ZIGZAG HORIZONTAL CAROUSEL
// ─────────────────────────────────────────────────────────────────────────────
const CAROUSEL_LABELS = [
  'She made us whole',
  'Loved before she had a name',
  'Every giggle, a gift',
  'We love you endlessly',
  'You are our favourite person',
  'Born to be adored',
  'Our heart in tiny hands',
  'You changed everything',
  'A thousand kisses, never enough',
  'Love looks just like you',
  'Our sweetest blessing',
  'Forever & always, our baby girl',
];

const ZigZagCarousel = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 48, damping: 20, mass: 0.8 });

  const x = useTransform(smooth, [0, 1], ['0%', '-62%']);

  // Zig-zag: even cards nudge UP, odd cards nudge DOWN — same sizes for all
  const yEven = useTransform(smooth, [0, 1], ['-6vh', '-14vh']);
  const yOdd = useTransform(smooth, [0, 1], ['6vh', '14vh']);

  const imgs = IMAGES.slice(12, 24);

  // Fixed card dimensions — same for every card
  const CARD_W = 'w-[58vw] md:w-[23vw]';
  const CARD_H = 'h-[72vw] md:h-[30vw]';

  return (
    <section ref={ref} className="relative h-[480vh] bg-[#0d0d0d]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full bg-rose-800/10 blur-[110px]" />
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[35vw] h-[35vw] rounded-full bg-amber-700/8 blur-[90px]" />
        </div>

        {/* ── Section title — solid bg so NO card ever shows through ── */}
        <div className="absolute top-0 inset-x-0 z-30 bg-[#0d0d0d] pt-9 pb-5 text-center pointer-events-none">
          <p className="text-[9px] uppercase tracking-[0.55em] text-white/30 mb-2">
            Scroll to journey through
          </p>
          <h2 className="serif text-3xl md:text-4xl text-white/80 font-light">
            Her Prettiest Moments
          </h2>
          {/* Soft fade-out so the edge feels seamless into the images below */}
          <div className="h-8 bg-gradient-to-b from-[#0d0d0d] to-transparent mt-3" />
        </div>

        {/* ── Scrolling strip — centred vertically, cards fully below title ── */}
        <div className="absolute inset-0 flex items-center overflow-hidden" style={{ paddingTop: '120px' }}>
          <motion.div style={{ x }} className="flex gap-6 md:gap-10 pl-[8vw] items-center h-full">
            {imgs.map((url, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  style={{ y: isEven ? yEven : yOdd }}
                  className={[
                    'relative flex-shrink-0 rounded-[22px] overflow-hidden group',
                    'shadow-[0_8px_55px_rgba(0,0,0,0.75)] border border-white/5',
                    CARD_W,
                    CARD_H,
                  ].join(' ')}
                >
                  <img
                    src={url}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  {/* Caption */}
                  <div className="absolute bottom-0 inset-x-0 p-4 md:p-6">
                    <div className="w-6 h-px bg-rose-400/70 mb-2" />
                    <p className="serif text-white/90 text-base md:text-lg font-light leading-snug">
                      {CAROUSEL_LABELS[i]}
                    </p>
                    <p className="text-white/35 text-[9px] mt-1 tracking-[0.3em] uppercase">
                      Memory {i + 1}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-7 right-8 flex items-center gap-2 text-white/20 pointer-events-none select-none">
          <span className="text-[9px] uppercase tracking-[0.35em]">scroll</span>
          <div className="w-7 h-px bg-white/20" />
          <span className="text-[9px] uppercase tracking-[0.35em]">to explore</span>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// INTERMISSION
// ─────────────────────────────────────────────────────────────────────────────
const Intermission = () => (
  <section className="relative h-screen bg-[#0d0d0d] flex items-center justify-center text-center overflow-hidden">
    {/* Star field */}
    <div className="absolute inset-0">
      {Array.from({ length: 55 }).map((_, i) => (
        <motion.div key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${(i * 1.8) % 100}%`, top: `${(i * 3.3) % 100}%`,
            width: (i % 3) + 1, height: (i % 3) + 1
          }}
          animate={{ opacity: [0.1, 0.7, 0.1] }}
          transition={{ duration: 2.5 + (i % 5), repeat: Infinity, delay: (i % 12) * 0.3 }}
        />
      ))}
    </div>
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(244,63,94,0.12)_0%,transparent_65%)]" />

    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.93 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: false, margin: '-120px' }}
      className="relative z-10 px-6"
    >
      <motion.div
        animate={{ scale: [1, 1.18, 1] }} transition={{ duration: 3.2, repeat: Infinity }}
        className="mb-8"
      >
        <Heart size={38} className="text-rose-400 mx-auto" fill="currentColor" strokeWidth={0} />
      </motion.div>

      <h2 className="serif text-stone-100 font-light leading-[0.9] tracking-tighter"
        style={{ fontSize: 'clamp(2.8rem, 8vw, 7.5rem)' }}>
        You thought <br />
        <span className="text-transparent bg-clip-text"
          style={{ backgroundImage: 'linear-gradient(135deg,#fb7185,#f9a8d4,#fbbf24)' }}>
          it was over?
        </span>
      </h2>

      <p className="serif text-white/35 text-lg md:text-xl mt-8 font-light">
        The stars have one more story to tell...
      </p>
    </motion.div>
  </section>
);

// ─────────────────────────────────────────────────────────────────────────────
// ASTRONOMICAL SECTION
// ─────────────────────────────────────────────────────────────────────────────
const STAR_TRAITS = [
  { x: '12%', y: '20%', trait: 'Curiosity', desc: 'Always reaching for the stars.', color: '#fbbf24' },
  { x: '80%', y: '18%', trait: 'Laughter', desc: 'The sound that heals every soul.', color: '#f9a8d4' },
  { x: '30%', y: '70%', trait: 'Resilience', desc: 'Falling down, bouncing right back up.', color: '#86efac' },
  { x: '82%', y: '72%', trait: 'Kindness', desc: 'A gentle spirit from the very first day.', color: '#93c5fd' },
  { x: '8%', y: '78%', trait: 'Wonder', desc: 'Magic lives in the simplest things.', color: '#c4b5fd' },
];

const AstronomicalSection = () => (
  <section className="relative bg-[#060610] text-white overflow-hidden">

    {/* ── Header ── */}
    <div className="pt-24 pb-16 text-center px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }} viewport={{ once: true }}>
        <Moon className="mx-auto mb-5 text-amber-200" size={40} strokeWidth={1} />
        <h2 className="serif leading-tight text-stone-100 mb-4"
          style={{ fontSize: 'clamp(2.2rem, 5.5vw, 5rem)' }}>
          The Sky on{' '}
          <span className="text-transparent bg-clip-text"
            style={{ backgroundImage: 'linear-gradient(135deg,#fcd34d,#fb923c)' }}>
            March 11
          </span>
        </h2>
        <p className="text-stone-500 tracking-[0.35em] uppercase text-[11px]">
          5:38 PM · Waxing Gibbous · 88% Illuminated
        </p>
      </motion.div>
    </div>

    {/* ── Constellation Map ── */}
    <div className="max-w-5xl mx-auto px-6 pb-6">
      <div className="relative rounded-[36px] border border-white/5 bg-white/2 overflow-hidden"
        style={{ height: 520 }}>

        {/* Star field */}
        {Array.from({ length: 70 }).map((_, i) => (
          <motion.div key={i} className="absolute rounded-full bg-white"
            style={{
              left: `${(i * 1.44) % 100}%`, top: `${(i * 2.77) % 100}%`,
              width: (i % 3) + 0.5, height: (i % 3) + 0.5, opacity: 0.15 + (i % 5) * 0.07
            }}
            animate={{ opacity: [null as any, (i % 5) * 0.1 + 0.2, null as any] }}
            transition={{ duration: 2 + (i % 4), repeat: Infinity, delay: (i % 10) * 0.3 }} />
        ))}

        {/* Moon in the center */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <motion.div initial={{ scale: 0.7, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="relative w-44 h-44 md:w-60 md:h-60">
            <div className="absolute inset-[-25%] rounded-full bg-amber-300/10 blur-3xl animate-pulse" />
            <div className="absolute inset-[-10%] rounded-full border border-amber-300/10" />
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-amber-200/20 shadow-[0_0_70px_rgba(251,191,36,0.3)] relative">
              <div className="absolute inset-0 bg-amber-400/12 mix-blend-color pointer-events-none z-10" />
              <img src={IMAGES[34]} alt="Moon on March 11"
                className="w-full h-full object-cover scale-110"
                style={{ filter: 'sepia(0.6) saturate(0.5) brightness(0.8)' }} />
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-amber-100 text-stone-900 px-5 py-1.5 rounded-full serif font-semibold text-sm shadow-xl">
              Our Moon ✦ March 11
            </div>
          </motion.div>
        </div>

        {/* Trait stars */}
        {STAR_TRAITS.map((s, i) => (
          <motion.div key={i} className="absolute group cursor-pointer z-30"
            style={{ left: s.x, top: s.y }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + i * 0.18, duration: 0.5 }}
            viewport={{ once: true }}>
            <div className="relative">
              <motion.div animate={{ scale: [1, 1.7, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.8 + i * 0.3, repeat: Infinity }}
                style={{ background: s.color, boxShadow: `0 0 10px ${s.color}` }}
                className="w-5 h-5 rounded-full blur-[1px]" />
              <div className="w-2.5 h-2.5 bg-white rounded-full absolute top-1 left-1" />
              {/* Tooltip */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-40">
                <div className="bg-white text-stone-900 p-3 rounded-xl shadow-2xl">
                  <h4 className="serif text-base font-bold mb-0.5">{s.trait}</h4>
                  <p className="text-xs text-stone-500 leading-relaxed">{s.desc}</p>
                </div>
                <div className="w-3 h-3 bg-white rotate-45 mx-auto -mt-1.5" />
              </div>
            </div>
          </motion.div>
        ))}

        {/* Constellation lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 25 }}>
          <defs>
            <linearGradient id="cg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.45" />
            </linearGradient>
          </defs>
          {[['12%', '20%', '50%', '50%'], ['80%', '18%', '50%', '50%'], ['30%', '70%', '50%', '50%'],
          ['82%', '72%', '50%', '50%'], ['8%', '78%', '50%', '50%'], ['12%', '20%', '80%', '18%']
          ].map(([x1, y1, x2, y2], i) => (
            <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="url(#cg)" strokeWidth="1" strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.4, delay: 1 + i * 0.25 }}
              viewport={{ once: true }} />
          ))}
        </svg>
      </div>
    </div>

    {/* ── Astro info cards ── */}
    <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { icon: '🌔', title: 'Waxing Gibbous', sub: '88% Illuminated', body: 'The moon was growing toward full brightness — a soul arriving at exactly the right moment.' },
        { icon: '♓', title: 'Sun in Pisces', sub: 'March 11, 2025', body: 'A soul born of dreams, deep intuition, and boundless empathy for all living things.' },
        { icon: '♌', title: 'Moon in Leo', sub: 'Rising Heart', body: 'A heart that shines with warmth, fierce courage, and a completely natural grace.' },
      ].map((c, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: i * 0.14 }} viewport={{ once: true }}
          className="p-7 rounded-2xl border border-white/7 bg-white/3 text-center hover:bg-white/6 transition-colors duration-500">
          <div className="text-3xl mb-4">{c.icon}</div>
          <h3 className="serif text-xl text-amber-200 mb-1">{c.title}</h3>
          <p className="text-stone-500 text-[10px] tracking-[0.25em] uppercase mb-4">{c.sub}</p>
          <p className="text-stone-400 text-sm leading-relaxed">{c.body}</p>
        </motion.div>
      ))}
    </div>

    {/* ── Night gallery ── */}
    <div className="max-w-5xl mx-auto px-6 pb-24">
      <div className="text-center mb-12">
        <h3 className="serif text-3xl md:text-4xl text-stone-100 leading-tight">
          Memories of that Night
        </h3>
        <p className="text-stone-600 text-[10px] tracking-[0.35em] uppercase mt-3">
          Captured under the waxing moon
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {IMAGES.slice(24, 32).map((url, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: i * 0.07 }} viewport={{ once: true }}
            className={`rounded-2xl overflow-hidden group relative shadow-lg ${i % 3 === 0 ? 'aspect-[3/4]' : 'aspect-square'}`}>
            <img src={url} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────────────────────────────────────
// LOVE LETTER
// ─────────────────────────────────────────────────────────────────────────────
const Letter = () => (
  <section className="py-32 md:py-40 px-6 bg-[#fdfcf8] relative overflow-hidden">
    <div className="absolute top-0 left-0 w-64 h-64 bg-rose-100/50 rounded-full blur-[90px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
    <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-50/50 rounded-full blur-[110px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

    <div className="max-w-3xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true }}
        className="bg-white px-10 py-16 md:px-20 md:py-20 rounded-[48px] shadow-[0_16px_70px_rgba(0,0,0,0.05)] border border-rose-100/80 relative">

        {/* Heart badge */}
        <div className="absolute -top-9 left-1/2 -translate-x-1/2 w-[4.5rem] h-[4.5rem] bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-rose-200">
          <Heart size={28} fill="currentColor" strokeWidth={0} />
        </div>

        <h2 className="serif text-4xl md:text-5xl text-center text-stone-800 mb-12 mt-2 leading-tight">
          A Letter to You
        </h2>

        <div className="serif text-xl md:text-2xl leading-[1.75] font-light text-stone-600 space-y-8">
          <p className="first-letter:text-7xl first-letter:font-bold first-letter:text-rose-400 first-letter:mr-3 first-letter:float-left first-letter:leading-[0.75]">
            Today you are one, our tiny miracle. You do not know it yet, but in just 365 snuggly days, you have sprinkled our world with patience, wide eyed wonder, and a love so big and squishy it could hug the whole universe tight.
          </p>
          <p>
            We built this little time capsule just for you, so one day, when you are all grown up with your own big dreams, you can peek back and see how your uncle and family cherished every giggle, every chubby cheeked smile from your very first breath. You were the sweetest dream we never knew we were dreaming, and now you are our forever sunshine we never want to let go.</p>
          <p>
            May your sparkly curiosity always dance brighter than any fear, and may you forever feel your uncles family arms wrapped around you, cheering you got this with pom poms and endless cuddles, today, tomorrow, and always.</p>
          <div className="pt-8 flex flex-col items-end">
            <div className="h-px w-24 bg-rose-200 mb-4" />
            <p className="text-stone-400 text-lg">With all our love, Always. 💕</p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

// ─────────────────────────────────────────────────────────────────────────────
// FINAL PHOTO WALL
// ─────────────────────────────────────────────────────────────────────────────
const PhotoWall = () => {
  const wallImgs = IMAGES.slice(32);
  return (
    <section className="py-20 px-6 bg-[#fdfcf8]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="serif text-3xl md:text-5xl text-stone-800 leading-tight">
            Every Shot, a Treasure
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {wallImgs.map((url, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}
              className={`rounded-xl overflow-hidden group relative shadow-md ${i === 0 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square'}`}>
              <img src={url} alt="" className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="py-20 bg-[#fdfcf8] text-center border-t border-rose-100 relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,113,133,0.06)_0%,transparent_60%)] pointer-events-none" />
    <div className="relative z-10">
      <motion.div animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }} transition={{ duration: 3.5, repeat: Infinity }}
        className="inline-block mb-5 text-rose-400">
        <Heart size={40} fill="currentColor" strokeWidth={0} />
      </motion.div>
      <h3 className="serif text-3xl text-stone-800 mb-2">Happy 1st Birthday</h3>
      <p className="text-stone-400 uppercase tracking-[0.5em] text-[10px] mb-3">
        Our Little Miracle · March 11, 2025
      </p>
      <p className="serif text-stone-400 text-base">
        "You are our greatest blessing."
      </p>
      <div className="flex justify-center gap-5 text-stone-300 mt-10">
        <Sun size={16} /><Heart size={16} className="text-rose-300" fill="currentColor" strokeWidth={0} />
        <Moon size={16} /><Star size={16} /><Heart size={16} className="text-rose-300" fill="currentColor" strokeWidth={0} />
        <Sun size={16} />
      </div>
    </div>
  </footer>
);

// ─────────────────────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen cursor-none">
      <CustomCursor />
      <FloatingPetals />

      <AnimatePresence>
        {loading ? (
          <motion.div key="loader"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-[#fdfcf8] flex flex-col items-center justify-center">
            
            {/* Blooming Flower Animation */}
            <div className="relative w-32 h-44 mb-6 flex flex-col items-center justify-end">
              {/* Stem and Leaves (Behind Flower) */}
              <div className="absolute bottom-0 w-full h-full flex flex-col items-center justify-end z-[5]">
                <motion.div 
                  className="w-1.5 h-16 bg-green-300 rounded-full origin-bottom"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
                {/* Left Leaf */}
                <motion.div 
                  className="absolute bottom-6 left-[40%] w-6 h-4 bg-green-300 rounded-full"
                  style={{ borderRadius: '0 100% 0 100%', originX: 1, originY: 1 }}
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: -15, y: [0, -2, 0] }}
                  transition={{ scale: { delay: 0.6, duration: 0.8 }, y: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
                />
                {/* Right Leaf */}
                <motion.div 
                  className="absolute bottom-10 right-[40%] w-5 h-4 bg-green-300 rounded-full"
                  style={{ borderRadius: '100% 0 100% 0', originX: 0, originY: 1 }}
                  initial={{ scale: 0, rotate: 20 }}
                  animate={{ scale: 1, rotate: 15, y: [0, -2, 0] }}
                  transition={{ scale: { delay: 0.8, duration: 0.8 }, y: { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 } }}
                />
              </div>

              {/* Flower Head */}
              <motion.div 
                className="relative w-20 h-20 flex items-center justify-center z-10 mb-[60px]"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                {/* Petals */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-8 h-8 bg-rose-300 rounded-full opacity-80"
                    style={{
                      transformOrigin: '50% 100%',
                      y: '-50%',
                      rotate: i * 60,
                    }}
                    animate={{
                      scale: [0, 1.2, 1],
                      rotate: [i * 60, i * 60 + 15, i * 60],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                      delay: i * 0.1,
                    }}
                  />
                ))}
                {/* Center of the flower */}
                <motion.div
                  className="absolute w-8 h-8 bg-amber-300 rounded-full z-10 shadow-sm"
                  animate={{ scale: [0.9, 1.05, 0.9] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </div>

            <h2 className="serif text-3xl text-rose-400 tracking-wide font-medium">Happy Birthday Anaisha!</h2>
            <p className="text-stone-300 text-[11px] mt-3 tracking-[0.4em] uppercase font-bold">Turning One</p>
          </motion.div>
        ) : (
          <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
            <Hero />
            <SequentialGallery />
            <ZigZagCarousel />
            <Intermission />
            <AstronomicalSection />
            <Letter />
            <PhotoWall />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

