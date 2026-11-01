import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Droplets, ShieldCheck, Sparkles } from 'lucide-react';
import { BRANDS, BRAND_CATEGORIES, MATERIALS, MATERIAL_CATEGORIES, TIERS } from '../catalog';
import { BrandLogo, CtaBand, PageHero, Reveal, SectionHead } from '../components/ui';
import { useApp } from '../components/context';

const TIER_NAME = Object.fromEntries(TIERS.map((t) => [t.id, t.name]));
const Rupees = ({ n }) => <span className="rupees" aria-label={`price level ${n} of 4`}>{[1, 2, 3, 4].map((i) => <i key={i} className={i <= n ? 'on' : ''}>₹</i>)}</span>;
const Dots = ({ n }) => <span className="dots">{[1, 2, 3, 4, 5].map((i) => <i key={i} className={i <= n ? 'on' : ''} />)}</span>;

export default function Materials() {
  const { openConsult } = useApp();
  const [bCat, setBCat] = useState('All');
  const [bTier, setBTier] = useState('all');
  const [mCat, setMCat] = useState('All');
  const [mTier, setMTier] = useState('all');

  const brands = BRANDS.filter((b) => (bCat === 'All' || b.cat === bCat) && (bTier === 'all' || b.tiers.includes(bTier)));
  const mats = MATERIALS.filter((m) => (mCat === 'All' || m.cat === mCat) && (mTier === 'all' || m.tiers.includes(mTier)));

  const TierChips = ({ value, set }) => (
    <div className="chip-row sm">
      {[['all', 'Any plan'], ...TIERS.map((t) => [t.id, t.name])].map(([id, n]) => (
        <button key={id} className={value === id ? 'on' : ''} onClick={() => set(id)}>{n}</button>
      ))}
    </div>
  );

  return (
    <>
      <PageHero title="Brands & Materials" sub="The names and finishes behind every Decora interior." bg="living7" />

      <section className="container section-s">
        <div className="mat-intro">
          {[[ShieldCheck, 'Genuine & certified', 'Every material is sourced from authorised dealers with batch-level warranty.'], [Droplets, 'Tested for Indian homes', 'Moisture, heat and humidity performance guide every choice.'], [Sparkles, 'Matched to your plan', 'Each brand and finish is mapped to Essential, Premium or Luxury.']].map(([I, t, d], i) => (
            <Reveal key={t} delay={i * 80}><div><I size={22} /><h5>{t}</h5><p className="muted">{d}</p></div></Reveal>
          ))}
        </div>
      </section>

      <section className="section container">
        <SectionHead eyebrow="Our partners" title="Brands We Build With" sub="Trusted names across paints, hardware, bath, lighting, surfaces and appliances." />
        <div className="filter-bar">
          <div className="chip-row sm">
            {['All', ...BRAND_CATEGORIES].map((c) => <button key={c} className={bCat === c ? 'on' : ''} onClick={() => setBCat(c)}>{c}</button>)}
          </div>
          <TierChips value={bTier} set={setBTier} />
        </div>
        <div className="brand-grid">
          {brands.map((b, i) => (
            <Reveal key={b.name} delay={(i % 4) * 60} from="zoom">
              <div className="brand-tile">
                <BrandLogo name={b.name} />
                <small>{b.cat}</small>
                <div className="tier-dots">{b.tiers.map((t) => <em key={t} className={`td-${t}`}>{TIER_NAME[t]}</em>)}</div>
              </div>
            </Reveal>
          ))}
          {!brands.length && <p className="muted">No brands match this filter.</p>}
        </div>
        <p className="fine center">Brand names shown as text wordmarks for illustration. Add licensed logo files via the <code>logo</code> field in <code>src/catalog.js</code>.</p>
      </section>

      <section className="section container">
        <SectionHead eyebrow="What it’s made of" title="Materials & Finishes" sub="Explore the textures, durability and price level of what goes into your home." />
        <div className="filter-bar">
          <div className="chip-row sm">
            {['All', ...MATERIAL_CATEGORIES].map((c) => <button key={c} className={mCat === c ? 'on' : ''} onClick={() => setMCat(c)}>{c}</button>)}
          </div>
          <TierChips value={mTier} set={setMTier} />
        </div>
        <div className="mat-grid">
          {mats.map((m, i) => (
            <Reveal key={m.id} delay={(i % 3) * 80}>
              <article className="mat-card">
                <div className="swatch" style={{ background: m.swatch }}><span>{m.cat}</span></div>
                <div className="mat-body">
                  <h4>{m.name}</h4>
                  <p className="muted">{m.desc}</p>
                  <dl>
                    <div><dt>Durability</dt><dd><Dots n={m.dur} /></dd></div>
                    <div><dt>Price level</dt><dd><Rupees n={m.price} /></dd></div>
                    <div><dt>Care</dt><dd>{m.care}</dd></div>
                  </dl>
                  <div className="chips">{m.best.map((b) => <span key={b}>{b}</span>)}</div>
                  <div className="mat-tiers">{m.tiers.map((t) => <em key={t} className={`td-${t}`}>{TIER_NAME[t]}</em>)}</div>
                  {m.brands.length > 0 && <div className="mat-brands">{m.brands.map((b) => <BrandLogo key={b} name={b} small />)}</div>}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container">
        <div className="promo">
          <div className="promo-text">
            <span className="eyebrow gold">Match to your budget</span>
            <h2 className="serif">See what each plan includes</h2>
            <p>Every plan lists its materials and brands — and a live estimate for your home.</p>
            <Link to="/plans" className="btn btn-gold">Explore plans <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
      <CtaBand title="Touch & feel the samples" text="Book a studio visit to see materials in person." label="Book Now" onClick={openConsult} />
    </>
  );
}
