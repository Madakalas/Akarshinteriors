import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Armchair, Heart } from 'lucide-react';
import { img } from '../data';
import { useApp } from './context';
import { BRANDS } from '../catalog';

export function Img({ k, w = 900, alt = '', className = '', ...rest }) {
  const [ok, setOk] = useState(false);
  const ref = useRef(null);
  useEffect(() => { if (ref.current && ref.current.complete) setOk(true); }, []);
  return <img ref={ref} src={img(k, w)} alt={alt} loading="lazy" onLoad={() => setOk(true)} className={`img-fade ${ok ? 'ok' : ''} ${className}`} {...rest} />;
}

export function PageHero({ title, sub, bg = 'living1', children, crumbs, actions }) {
  return (
    <section className={`page-hero ${actions ? 'tall' : ''}`}>
      <div className="page-hero-bg" style={{ backgroundImage: `url(${img(bg, 1800)})` }} />
      <div className="container page-hero-in">
        {crumbs && <div className="crumbs">{crumbs}</div>}
        <h1 className="serif">{title}</h1>
        {sub && <p>{sub}</p>}
        {children}
        {actions && <div className="hero-actions">{actions}</div>}
      </div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, sub, to, link = 'View All', center }) {
  return (
    <div className={`sec-head ${center ? 'center' : ''}`}>
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2 className="serif">{title}</h2>
        {sub && <p className="muted">{sub}</p>}
      </div>
      {to && <Link to={to} className="link-arrow">{link} <ArrowRight size={15} /></Link>}
    </div>
  );
}

export function Reveal({ children, className = '', delay = 0, from = 'up' }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) { setShown(true); return; }
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setShown(true), io.disconnect()), { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal from-${from} ${shown ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function FavButton({ id }) {
  const { favs, toggleFav } = useApp();
  const on = favs.includes(id);
  return (
    <button
      className={`fav ${on ? 'on' : ''}`}
      aria-label="Save"
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFav(id); }}
    >
      <Heart size={15} fill={on ? 'currentColor' : 'none'} />
    </button>
  );
}

export function CtaBand({ title, text, label = 'Book Now', onClick }) {
  return (
    <section className="container">
      <div className="cta-band">
        <div className="cta-icon" aria-hidden>
          <Armchair size={46} strokeWidth={1.4} />
        </div>
        <div className="cta-text">
          <h3 className="serif">{title}</h3>
          <p>{text}</p>
        </div>
        <button className="btn btn-gold" onClick={onClick}>{label} <ArrowRight size={16} /></button>
      </div>
    </section>
  );
}

const EMPTY = { name: '', email: '', phone: '', service: '', message: '' };
export const SERVICES = ['Full Home Interiors', 'Modular Kitchen', 'Living Room', 'Bedroom', 'Office / Commercial', 'Luxury Villa', 'Renovation'];

export function ConsultForm({ onDone, dark }) {
  const { notify } = useApp();
  const [f, setF] = useState(EMPTY);
  const [err, setErr] = useState({});
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!f.name.trim()) er.name = 'Please enter your name';
    if (!/^\S+@\S+\.\S+$/.test(f.email)) er.email = 'Enter a valid email';
    if (f.phone && !/^[+\d\s-]{8,15}$/.test(f.phone)) er.phone = 'Enter a valid phone number';
    if (!f.service) er.service = 'Select a service';
    setErr(er);
    if (Object.keys(er).length) return;
    try {
      const all = JSON.parse(localStorage.getItem('decora-leads') || '[]');
      localStorage.setItem('decora-leads', JSON.stringify([...all, { ...f, at: new Date().toISOString() }]));
    } catch {}
    notify(`Thank you, ${f.name.split(' ')[0]}! We’ll be in touch shortly.`);
    setF(EMPTY);
    onDone && onDone();
  };

  return (
    <form className={`form ${dark ? 'form-dark' : ''}`} onSubmit={submit} noValidate>
      <label>
        <input placeholder="Your Name *" value={f.name} onChange={set('name')} />
        {err.name && <em>{err.name}</em>}
      </label>
      <label>
        <input placeholder="Email Address *" type="email" value={f.email} onChange={set('email')} />
        {err.email && <em>{err.email}</em>}
      </label>
      <label>
        <input placeholder="Phone Number" value={f.phone} onChange={set('phone')} />
        {err.phone && <em>{err.phone}</em>}
      </label>
      <label>
        <select value={f.service} onChange={set('service')}>
          <option value="">Select Service *</option>
          {SERVICES.map((s) => <option key={s}>{s}</option>)}
        </select>
        {err.service && <em>{err.service}</em>}
      </label>
      <label>
        <textarea rows="4" placeholder="Tell us about your space" value={f.message} onChange={set('message')} />
      </label>
      <button className="btn btn-dark btn-block" type="submit">Send Message <ArrowRight size={16} /></button>
    </form>
  );
}

export function Counter({ value }) {
  const m = /^(\d+(?:\.\d+)?)(.*)$/.exec(value);
  const target = m ? parseFloat(m[1]) : 0;
  const suffix = m ? m[2] : '';
  const [n, setN] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf;
    const run = () => {
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / 1600);
        setN(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    if (!('IntersectionObserver' in window)) { setN(target); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { run(); io.disconnect(); } }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [target]);
  return <span ref={ref}>{Math.round(n)}{suffix}</span>;
}

export function Marquee({ items }) {
  const row = [...items, ...items];
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee-track">
        {row.map((t, i) => <span key={i}>{t}<i>✦</i></span>)}
      </div>
    </div>
  );
}

export function Faq({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq">
      {items.map(([q, a], i) => (
        <div key={q} className={`faq-item ${open === i ? 'open' : ''}`}>
          <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
            <span>{q}</span><b>+</b>
          </button>
          <div className="faq-body"><p>{a}</p></div>
        </div>
      ))}
    </div>
  );
}


export function Stars({ value = 5, size = 14 }) {
  return (
    <span className="stars-row" aria-label={`${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} width={size} height={size} viewBox="0 0 24 24" className={value >= n ? 'full' : value >= n - 0.5 ? 'half' : ''}>
          <defs><linearGradient id={`h${n}`}><stop offset="50%" stopColor="currentColor" /><stop offset="50%" stopColor="transparent" /></linearGradient></defs>
          <path d="m12 2 3 6.9 7.5.7-5.7 5 1.7 7.4L12 18l-6.5 4 1.7-7.4-5.7-5L9 8.9z" fill={value >= n ? 'currentColor' : value >= n - 0.5 ? `url(#h${n})` : 'none'} stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
      ))}
    </span>
  );
}

// Text wordmark tile. Pass a brand with a `logo` image URL (e.g. /brands/hettich.svg) to show the real logo.
export function BrandLogo({ name, small }) {
  const b = BRANDS.find((x) => x.name === name) || { name, style: 'bold' };
  return (
    <span className={`brand-logo ${small ? 'sm' : ''}`} title={b.name}>
      {b.logo ? <img src={b.logo} alt={b.name} /> : <span className={`wm wm-${b.style}`}>{b.name}</span>}
    </span>
  );
}
