import React, { useCallback, useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { ArrowUp, Mail, MapPin, Menu, Phone, X } from 'lucide-react';
import { Facebook, Instagram, Linkedin, Youtube } from './brands';
import { ConsultForm } from './ui';
import { AppCtx, useApp } from './context';

const NAV = [
  ['/', 'Home'],
  ['/explore', 'Explore'],
  ['/projects', 'Projects'],
  ['/designers', 'Designers'],
  ['/plans', 'Plans'],
  ['/materials', 'Materials'],
  ['/about', 'About'],
];

export function Logo({ light = true }) {
  return (
    <Link to="/" className={`logo ${light ? 'logo-light' : ''}`} aria-label="Decora home">
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 15 16 5l12 10" />
        <path d="M7 13v14h18V13" />
        <path d="M13 27v-8h6v8" />
      </svg>
      <span>
        <b>Decora</b>
        <small>INTERIORS</small>
      </span>
    </Link>
  );
}

function Navbar({ openConsult }) {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`nav ${pathname !== '/' ? 'nav-light' : ''} ${solid || open ? 'nav-solid' : ''}`}>
      <div className="container nav-inner">
        <Logo />
        <nav className={`nav-links ${open ? 'open' : ''}`}>
          {NAV.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => (isActive ? 'active' : '')}>
              {label}
            </NavLink>
          ))}
          <button className="btn btn-dark nav-cta-m" onClick={openConsult}>Book Consultation</button>
        </nav>
        <button className="btn btn-dark nav-cta" onClick={openConsult}>Book Consultation</button>
        <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}

function ScrollUi() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? window.scrollY / h : 0);
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <>
      <div className="progress" style={{ transform: `scaleX(${p})` }} />
      <button className={`to-top ${p > 0.12 ? 'show' : ''}`} aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <ArrowUp size={18} />
      </button>
    </>
  );
}

function Newsletter() {
  const { notify } = useApp();
  const [email, setEmail] = useState('');
  const submit = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return notify('Please enter a valid email address');
    notify('Subscribed — inspiration is on its way');
    setEmail('');
  };
  return (
    <div className="newsletter">
      <div>
        <h3 className="serif">Design inspiration, delivered</h3>
        <p>Monthly project stories, trend notes and offers from our studio.</p>
      </div>
      <form onSubmit={submit}>
        <input type="email" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button className="btn btn-gold">Subscribe</button>
      </form>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <Newsletter />
        <div className="footer-grid">
          <div>
            <Logo />
            <p className="muted-l">Crafting luxurious, timeless interiors across India — from intimate apartments to landmark villas.</p>
            <div className="social">
              {[Facebook, Instagram, Youtube, Linkedin].map((I, i) => (
                <a key={i} href="/" onClick={(e) => e.preventDefault()} aria-label="social"><I size={16} /></a>
              ))}
            </div>
          </div>
          <div>
            <h5>Explore</h5>
            <Link to="/explore">Design Gallery</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/designers">Designers</Link>
            <Link to="/plans">Plans & Pricing</Link>
            <Link to="/materials">Brands & Materials</Link>
          </div>
          <div>
            <h5>Company</h5>
            <Link to="/about">About Decora</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/projects/luxury-villa">Featured Project</Link>
          </div>
          <div>
            <h5>Visit</h5>
            <p className="muted-l row"><MapPin size={15} /> 123 Design Street, Hyderabad, Telangana - 500001</p>
            <p className="muted-l row"><Phone size={15} /> +91 98765 43210</p>
            <p className="muted-l row"><Mail size={15} /> hello@decora.com</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Decora Interiors. All rights reserved.</span>
          <span>Designing better spaces for a better tomorrow.</span>
        </div>
      </div>
    </footer>
  );
}

function ConsultModal({ onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);
  return (
    <div className="modal-back" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <button className="modal-x" onClick={onClose} aria-label="Close"><X size={18} /></button>
        <h3>Book a Consultation</h3>
        <p className="muted">Tell us about your space and a senior designer will reach out within 24 hours.</p>
        <ConsultForm onDone={onClose} />
      </div>
    </div>
  );
}

export default function Layout() {
  const { pathname } = useLocation();
  const [consult, setConsult] = useState(false);
  const [toast, setToast] = useState('');
  const [favs, setFavs] = useState(() => {
    try { return JSON.parse(localStorage.getItem('decora-favs')) || []; } catch { return []; }
  });

  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  useEffect(() => {
    try { localStorage.setItem('decora-favs', JSON.stringify(favs)); } catch {}
  }, [favs]);

  const notify = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2800);
  }, []);
  const toggleFav = useCallback((key) => {
    setFavs((f) => {
      const on = f.includes(key);
      notify(on ? 'Removed from saved' : 'Saved to your favourites');
      return on ? f.filter((x) => x !== key) : [...f, key];
    });
  }, [notify]);

  const ctx = { openConsult: () => setConsult(true), favs, toggleFav, notify };

  return (
    <AppCtx.Provider value={ctx}>
      <ScrollUi />
      <Navbar openConsult={ctx.openConsult} />
      <main key={pathname} className="page-enter"><Outlet /></main>
      <Footer />
      {consult && <ConsultModal onClose={() => setConsult(false)} />}
      <div className={`toast ${toast ? 'show' : ''}`}>{toast}</div>
    </AppCtx.Provider>
  );
}
