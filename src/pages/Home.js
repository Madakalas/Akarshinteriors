import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Building2, ChevronDown, Quote, Star, Users } from 'lucide-react';
import { DESIGNERS, FAQS, MARQUEE, PROCESS, PROJECTS, PROMISES, ROOMS, SERVICES, STATS, TESTIMONIALS, img } from '../data';
import { BrandLogo, Counter, CtaBand, Faq, FavButton, Img, Marquee, Reveal, SectionHead } from '../components/ui';
import { TIERS } from '../catalog';
import { ICONS } from '../components/icons';
import { useApp } from '../components/context';

export default function Home() {
  const { openConsult } = useApp();
  const bg = useRef(null);
  const statIcons = [Users, Building2, Award, Star];

  useEffect(() => {
    const on = () => {
      if (bg.current && window.scrollY < 1000) bg.current.style.transform = `translateY(${window.scrollY * 0.25}px) scale(1.08)`;
    };
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <>
      <section className="hero">
        <div ref={bg} className="hero-bg" style={{ backgroundImage: `url(${img('living1', 2000)})` }} />
        <div className="container hero-in">
          <span className="eyebrow gold">Decora Interiors · Since 2013</span>
          <h1 className="serif">Transform Your Space Into Something Extraordinary</h1>
          <p>Discover stunning interiors, get inspired and bring your dream home to life.</p>
          <div className="hero-btns">
            <Link to="/explore" className="btn btn-gold">Explore Designs <ArrowRight size={16} /></Link>
            <button className="btn btn-ghost" onClick={openConsult}>Book Consultation</button>
          </div>
        </div>
        <div className="hero-badge">
          <div className="faces">
            {['p1', 'p3', 'p5'].map((k) => <Img key={k} k={k} w={90} alt="" />)}
          </div>
          <div>
            <b>5,000+ happy homes</b>
            <span className="stars">{[...Array(5)].map((_, n) => <Star key={n} size={11} fill="currentColor" />)} <em>4.9 rated</em></span>
          </div>
        </div>
        <a href="#start" className="scroll-cue" aria-label="Scroll"><ChevronDown size={20} /></a>
      </section>

      <div className="container" id="start">
        <div className="stats stats-3">
          {STATS.slice(0, 3).map((s, i) => {
            const I = statIcons[i];
            return (
              <div key={s.label}>
                <I size={22} />
                <div><b><Counter value={s.value} /></b><span>{s.label}</span></div>
              </div>
            );
          })}
        </div>
      </div>

      <Marquee items={MARQUEE} />

      <section className="section container">
        <SectionHead eyebrow="Browse by space" title="Explore by Room" to="/categories" />
        <div className="room-row">
          {ROOMS.slice(0, 5).map((r, i) => (
            <Reveal key={r.id} delay={i * 70} from="zoom">
              <Link to={`/explore?room=${encodeURIComponent(r.name)}`} className="room-chip">
                <Img k={r.img} w={500} alt={r.name} />
                <span>{r.name}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section container">
        <SectionHead eyebrow="Our portfolio" title="Featured Projects" to="/projects" />
        <div className="grid-3">
          {PROJECTS.slice(0, 3).map((p, i) => (
            <Reveal key={p.id} delay={i * 90}>
              <Link to={`/projects/${p.id}`} className="card card-photo">
                <Img k={p.cover} w={800} alt={p.title} />
                <FavButton id={p.id} />
                <div className="card-cap">
                  <div><b>{p.title}</b><small>{p.city}</small></div>
                  <ArrowRight size={16} />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container">
        <Reveal>
          <div className="promo">
            <div className="promo-text">
              <span className="eyebrow gold">Why Decora</span>
              <h2 className="serif">Expert Designers. Premium Materials.</h2>
              <p>Create beautiful spaces with trusted brands — Italian marble, solid walnut and hand-finished brass, shaped by senior designers and master craftsmen.</p>
              <Link to="/about" className="btn btn-gold">Learn More <ArrowRight size={16} /></Link>
            </div>
            <Img k="apt4" w={900} alt="" className="promo-img" />
          </div>
        </Reveal>
      </section>

      <section className="section container">
        <SectionHead center eyebrow="What we do" title="Interiors for Every Chapter of Life" sub="From a single room refresh to a complete villa, one team handles design, build and styling." />
        <div className="services">
          {SERVICES.map((s, i) => {
            const I = ICONS[s.icon];
            return (
              <Reveal key={s.title} delay={(i % 3) * 90}>
                <div className="service">
                  <span><I size={24} strokeWidth={1.5} /></span>
                  <h4>{s.title}</h4>
                  <p className="muted">{s.text}</p>
                  <Link to="/explore" className="link-arrow">Explore <ArrowRight size={14} /></Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="section container">
        <SectionHead center eyebrow="How we work" title="A Seamless Journey, Start to Finish" sub="Four considered steps from first conversation to final handover." />
        <div className="process">
          {PROCESS.map((s, i) => (
            <Reveal key={s.n} delay={i * 90}>
              <div className="step">
                <span className="serif">{s.n}</span>
                <h4>{s.title}</h4>
                <p className="muted">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="promise">
        <div className="container">
          <SectionHead center eyebrow="The Decora promise" title="Luxury You Can Trust" />
          <div className="promise-grid">
            {PROMISES.map((p, i) => {
              const I = ICONS[p.icon];
              return (
                <Reveal key={p.title} delay={i * 90} from="zoom">
                  <div className="promise-item">
                    <I size={30} strokeWidth={1.3} />
                    <h5>{p.title}</h5>
                    <p>{p.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section container">
        <SectionHead eyebrow="The team" title="Meet Our Designers" to="/designers" />
        <div className="designer-strip">
          {DESIGNERS.slice(0, 4).map((d, i) => (
            <Reveal key={d.id} delay={i * 80}>
              <Link to={`/designers/${d.id}`} className="mini-designer">
                <Img k={d.img} w={300} alt={d.name} />
                <b>{d.name}</b>
                <small>{d.role}</small>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="testi">
        <div className="container">
          <SectionHead center eyebrow="Kind words" title="Loved by Homeowners Across India" />
          <div className="grid-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 90}>
                <figure className="testi-card">
                  <Quote size={26} className="q" />
                  <blockquote>{t.text}</blockquote>
                  <div className="stars">{[...Array(5)].map((_, n) => <Star key={n} size={14} fill="currentColor" />)}</div>
                  <figcaption>
                    <Img k={t.img} w={120} alt={t.name} />
                    <span><b>{t.name}</b><small>{t.place}</small></span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section container">
        <SectionHead eyebrow="Plans & pricing" title="Pick a Plan That Fits Your Budget" sub="See a live estimate for your home in seconds." to="/plans" link="Open estimator" />
        <div className="tier-mini">
          {TIERS.map((t, i) => (
            <Reveal key={t.id} delay={i * 90}>
              <Link to="/plans" className={`tier-mini-card ${t.popular ? 'best' : ''}`}>
                {t.popular && <span className="ribbon">Most popular</span>}
                <h4 className="serif">{t.name}</h4>
                <p className="muted">{t.tag}</p>
                <b>from ₹{t.rate.toLocaleString('en-IN')}<small>/sq ft</small></b>
                <span className="link-arrow">Calculate <ArrowRight size={14} /></span>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="brand-strip">
          <span>Brands we build with</span>
          {['Asian Paints', 'Hettich', 'Kohler', 'Philips', 'Greenlam', 'Bosch'].map((b) => <BrandLogo key={b} name={b} small />)}
          <Link to="/materials" className="link-arrow">View all <ArrowRight size={14} /></Link>
        </div>
      </section>

      <section className="section container faq-wrap">
        <Reveal from="left">
          <span className="eyebrow">Good to know</span>
          <h2 className="serif">Frequently Asked Questions</h2>
          <p className="muted">Can’t find what you’re looking for? Our team is happy to help.</p>
          <button className="btn btn-dark" onClick={openConsult}>Talk to a designer <ArrowRight size={16} /></button>
        </Reveal>
        <Reveal from="right"><Faq items={FAQS} /></Reveal>
      </section>

      <CtaBand title="Let’s design together" text="Book a complimentary consultation with our experts." onClick={openConsult} />
    </>
  );
}
