import React, { useEffect } from 'react';
import { motion, useAnimation, useReducedMotion } from 'framer-motion';
import './App.css'

function App() {
  const shouldReduceMotion = useReducedMotion();
  const heroControls = useAnimation();

  useEffect(() => {
    if (shouldReduceMotion) {
      heroControls.set({ opacity: 1, y: 0 });
      return;
    }

    (async () => {
      await heroControls.start({ opacity: 1, y: 0, transition: { duration: 0.5 } });
      await heroControls.start({ scale: 1.02, transition: { duration: 0.25 } });
      heroControls.start({ scale: 1, transition: { duration: 0.3 } });
    })();
  }, [heroControls, shouldReduceMotion]);

  const cardVariant = {
    hidden: { opacity: 0, y: 18 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.12, duration: 0.5, ease: 'easeOut' },
    }),
  };

  return (
    <>
          <div className="aa-container">
      <section className="aa-hero">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 1 }}
          animate={heroControls}
          className="aa-hero-inner"
          aria-labelledby="hero-title"
        >
          <p className="aa-kicker">Interactive demo</p>
          <h1 id="hero-title" className="aa-title">
            Smooth, accessible animations — Framer Motion
          </h1>
          <p className="aa-lead">
            This demo shows scroll reveals, hover interactions and timeline sequences. Animations
            respect <code>prefers-reduced-motion</code> and aim to be performant.
          </p>
          <div className="aa-cta-row">
            <a href="#features" className="aa-btn aa-btn-primary">Explore features</a>
            <button className="aa-btn aa-btn-secondary" aria-pressed="false">Secondary action</button>
          </div>
        </motion.div>
      </section>

      <section id="features" className="aa-grid">
        {[
          {
            title: 'Scroll reveal',
            desc: 'Items animate into view as you scroll (uses viewport optimizations).',
          },
          {
            title: 'Hover & focus',
            desc: 'Card subtly scales on hover/focus. Keyboard accessible via focus states.',
          },
          {
            title: 'Timeline sequences',
            desc: 'Complex sequences built with controls (play/pause friendly).',
          },
        ].map((item, i) => (
          <motion.article
            key={item.title}
            className="aa-card"
            role="article"
            tabIndex={0}
            initial="hidden"
            whileInView={shouldReduceMotion ? {} : 'visible'}
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariant}
            custom={i}
            whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
            whileFocus={shouldReduceMotion ? {} : { scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            aria-label={`${item.title} card`}
          >
            <h3 className="aa-card-title">{item.title}</h3>
            <p className="aa-card-desc">{item.desc}</p>
            <div className="aa-card-footer">
              <a href="#" className="aa-link">Learn more</a>
            </div>
          </motion.article>
        ))}
      </section>

      <section className="aa-sequence">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.25 }}>
          <h2 className="aa-section-title">A staged timeline sequence</h2>
          <TimelineSequence shouldReduceMotion={shouldReduceMotion} />
        </motion.div>
      </section>

      <section className="aa-notes">
        <p>
          Tip: Users who set <code>prefers-reduced-motion</code> will see reduced or non-animated
          UI. Use the system preference to guard non-essential motion.
        </p>
      </section>
    </div>
    </>
  )
}
function TimelineSequence({ shouldReduceMotion }) {
  const containerControls = useAnimation();

  useEffect(() => {
    if (shouldReduceMotion) {
      containerControls.set({ opacity: 1, y: 0 });
      return;
    }

    (async () => {
      await containerControls.start({ opacity: 1, y: 0, transition: { duration: 0.45 } });
      await containerControls.start({ rotate: 0, transition: { duration: 0.3 } });
    })();
  }, [containerControls, shouldReduceMotion]);

  const steps = [
    { title: 'Step 1', body: 'Initialize data + fetch content.' },
    { title: 'Step 2', body: 'Warm up micro-interactions.' },
    { title: 'Step 3', body: 'Reveal final UI.' },
  ];

  return (
    <div className="aa-steps">
      {steps.map((s, i) => (
        <motion.div
          key={s.title}
          initial={{ opacity: 0, y: 18 }}
          animate={containerControls}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: i * 0.15 }}
          className="aa-step"
          tabIndex={0}
          role="article"
          aria-label={`${s.title}`}
        >
          <h4 className="aa-step-title">{s.title}</h4>
          <p className="aa-step-desc">{s.body}</p>
        </motion.div>
      ))}
    </div>
  );
}


export default App
