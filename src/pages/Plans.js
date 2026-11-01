import React, { useMemo, useState } from 'react';
import { ArrowRight, Check, Clock, IndianRupee, ShieldCheck, Sparkles, Wallet } from 'lucide-react';
import { ADDONS, BRANDS, CITY_TIERS, PLAN_ROOMS, PROPERTY_TYPES, TIERS } from '../catalog';
import { BrandLogo, CtaBand, Faq, PageHero, Reveal, SectionHead } from '../components/ui';
import { useApp } from '../components/context';

const lakh = 100000;
const crore = 10000000;
export const fmt = (n) => {
  if (n >= crore) return `₹${(n / crore).toFixed(2)} Cr`;
  if (n >= lakh) return `₹${(n / lakh).toFixed(n >= 10 * lakh ? 1 : 2)} L`;
  return `₹${Math.round(n).toLocaleString('en-IN')}`;
};
const round5k = (n) => Math.round(n / 5000) * 5000;

function compute(ti, { area, prop, city, rooms, addons }) {
  const tier = TIERS[ti];
  const roomLines = PLAN_ROOMS.filter((r) => rooms.includes(r.id)).map((r) => ({
    name: r.name, cost: round5k(area * tier.rate * (r.w / 100) * (prop.factor || 1) * city.factor),
  }));
  const addonLines = ADDONS.filter((a) => addons.includes(a.id)).map((a) => ({
    name: a.name, cost: round5k((a.perSqft ? a.perSqft[ti] * area : a.flat[ti]) * city.factor),
  }));
  const lines = [...roomLines, ...addonLines];
  const total = lines.reduce((s, l) => s + l.cost, 0);
  const r = 0.11 / 12;
  const emi = total ? (total * r * Math.pow(1 + r, 36)) / (Math.pow(1 + r, 36) - 1) : 0;
  const days = Math.round((30 + area * 0.04) * tier.speed + (addons.includes('theatre') ? 10 : 0));
  return { tier, lines, total, low: round5k(total * 0.94), high: round5k(total * 1.08), emi, days, perSqft: area ? total / area : 0 };
}

const GAUGE_MIN = 800;
const GAUGE_MAX = 6500;
const zoneOf = (ps) => (ps < 1900 ? 'Essential range' : ps < 3100 ? 'Premium range' : 'Luxury range');

function Gauge({ perSqft }) {
  const pct = Math.max(2, Math.min(98, ((perSqft - GAUGE_MIN) / (GAUGE_MAX - GAUGE_MIN)) * 100));
  return (
    <div className="gauge">
      <div className="gauge-bar">
        <i style={{ width: `${((1900 - GAUGE_MIN) / (GAUGE_MAX - GAUGE_MIN)) * 100}%` }} />
        <i style={{ width: `${((3100 - 1900) / (GAUGE_MAX - GAUGE_MIN)) * 100}%` }} />
        <i style={{ flex: 1 }} />
        <span className="gauge-pin" style={{ left: `${pct}%` }}><b>{`₹${Math.round(perSqft).toLocaleString('en-IN')}/sq ft`}</b></span>
      </div>
      <div className="gauge-labels"><span>Essential</span><span>Premium</span><span>Luxury</span></div>
      <p className="gauge-note"><Sparkles size={13} /> You’re in the <b>{zoneOf(perSqft)}</b></p>
    </div>
  );
}

export default function Plans() {
  const { openConsult } = useApp();
  const [propId, setPropId] = useState('3bhk');
  const [cityId, setCityId] = useState('metro');
  const [area, setArea] = useState(1450);
  const [tierIdx, setTierIdx] = useState(1);
  const [rooms, setRooms] = useState(['living', 'kitchen', 'master', 'bedrooms', 'bath', 'dining']);
  const [addons, setAddons] = useState(['ceiling']);
  const [useBudget, setUseBudget] = useState(false);
  const [budget, setBudget] = useState(15);

  const prop = PROPERTY_TYPES.find((p) => p.id === propId);
  const city = CITY_TIERS.find((c) => c.id === cityId);
  const input = { area, prop, city, rooms, addons };
  const results = useMemo(() => TIERS.map((_, i) => compute(i, input)), [area, propId, cityId, rooms, addons]); // eslint-disable-line
  const cur = results[tierIdx];

  const pickProp = (p) => {
    setPropId(p.id);
    setArea(p.area);
    setRooms((r) => {
      const base = r.filter((x) => x !== 'bedrooms');
      return p.beds ? [...base, 'bedrooms'] : base;
    });
  };
  const tog = (setter) => (id) => setter((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]));
  const budgetINR = budget * lakh;
  const fit = (r) => !useBudget || r.total <= budgetINR;
  const bestFit = useBudget ? [...results].reverse().find((r) => r.total <= budgetINR) : null;
  const maxLine = Math.max(...cur.lines.map((l) => l.cost), 1);

  const choose = (i) => {
    setTierIdx(i);
    window.scrollTo({ top: document.getElementById('planner').offsetTop - 90, behavior: 'smooth' });
  };

  return (
    <>
      <PageHero title="Plans & Pricing" sub="Choose your home, pick a plan and see a live price estimate — instantly." bg="living11" />

      <section className="container section-s" id="planner">
        <div className="planner">
          <div className="plan-form">
            <div className="pf-step">
              <h4><i>1</i> Your home</h4>
              <div className="chip-row">
                {PROPERTY_TYPES.map((p) => (
                  <button key={p.id} className={propId === p.id ? 'on' : ''} onClick={() => pickProp(p)}>{p.name}</button>
                ))}
              </div>
              <div className="chip-row sm">
                {CITY_TIERS.map((c) => (
                  <button key={c.id} className={cityId === c.id ? 'on' : ''} onClick={() => setCityId(c.id)}>{c.name}</button>
                ))}
              </div>
            </div>

            <div className="pf-step">
              <h4><i>2</i> Area</h4>
              <div className="range-row">
                <input type="range" min="400" max="8000" step="50" value={area} onChange={(e) => setArea(+e.target.value)} />
                <label className="num"><input type="number" min="300" max="20000" value={area} onChange={(e) => setArea(Math.max(0, +e.target.value || 0))} /> sq ft</label>
              </div>
            </div>

            <div className="pf-step">
              <h4><i>3</i> Choose your plan</h4>
              <div className="tier-pick">
                {TIERS.map((t, i) => (
                  <button key={t.id} className={tierIdx === i ? 'on' : ''} onClick={() => setTierIdx(i)}>
                    <b>{t.name}</b>
                    <span>~₹{t.rate.toLocaleString('en-IN')}/sq ft</span>
                    {t.popular && <em>Popular</em>}
                  </button>
                ))}
              </div>
            </div>

            <div className="pf-step">
              <h4><i>4</i> Rooms to design</h4>
              <div className="check-grid">
                {PLAN_ROOMS.filter((r) => prop.beds || r.id !== 'bedrooms').map((r) => (
                  <label key={r.id} className={`opt ${rooms.includes(r.id) ? 'on' : ''}`}>
                    <input type="checkbox" checked={rooms.includes(r.id)} onChange={() => tog(setRooms)(r.id)} />
                    <span className="box"><Check size={12} /></span> {r.name}
                  </label>
                ))}
              </div>
            </div>

            <div className="pf-step">
              <h4><i>5</i> Add-ons</h4>
              <div className="addon-list">
                {ADDONS.map((a) => {
                  const c = a.perSqft ? a.perSqft[tierIdx] * area : a.flat[tierIdx];
                  return (
                    <label key={a.id} className={`opt wide ${addons.includes(a.id) ? 'on' : ''}`}>
                      <input type="checkbox" checked={addons.includes(a.id)} onChange={() => tog(setAddons)(a.id)} />
                      <span className="box"><Check size={12} /></span>
                      <span className="grow">{a.name}</span>
                      <small>+{fmt(round5k(c * city.factor))}</small>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="pf-step">
              <h4><i>6</i> Your budget <small>(optional)</small></h4>
              <label className="switch">
                <input type="checkbox" checked={useBudget} onChange={(e) => setUseBudget(e.target.checked)} />
                <span /> I have a budget in mind
              </label>
              {useBudget && (
                <div className="range-row">
                  <input type="range" min="3" max="200" step="1" value={budget} onChange={(e) => setBudget(+e.target.value)} />
                  <b className="budget-val">{fmt(budgetINR)}</b>
                </div>
              )}
            </div>
          </div>

          <aside className="plan-sum">
            <span className="eyebrow gold">Your estimate · {cur.tier.name}</span>
            {cur.total ? (
              <>
                <div className="sum-total serif">{fmt(cur.low)} <small>to</small> {fmt(cur.high)}</div>
                <p className="sum-sub">for {area.toLocaleString('en-IN')} sq ft · {prop.name} · {city.name}</p>
                <Gauge perSqft={cur.perSqft} />
                <div className="sum-facts">
                  <div><Wallet size={16} /><span>EMI from</span><b>{fmt(cur.emi)}/mo</b></div>
                  <div><Clock size={16} /><span>Timeline</span><b>~{cur.days} days</b></div>
                  <div><ShieldCheck size={16} /><span>Warranty</span><b>{cur.tier.warranty}</b></div>
                </div>

                {useBudget && (
                  <div className={`fit ${fit(cur) ? 'ok' : 'no'}`}>
                    {fit(cur)
                      ? <><Check size={16} /> Within your {fmt(budgetINR)} budget — {fmt(budgetINR - cur.total)} to spare</>
                      : <><IndianRupee size={16} /> {fmt(cur.total - budgetINR)} over budget.{bestFit ? ` ${bestFit.tier.name} fits your budget.` : ' Try removing a room or add-on.'}</>}
                  </div>
                )}

                <h6>Where the money goes</h6>
                <ul className="breakdown">
                  {cur.lines.map((l) => (
                    <li key={l.name}>
                      <span>{l.name}</span><b>{fmt(l.cost)}</b>
                      <i><u style={{ width: `${(l.cost / maxLine) * 100}%` }} /></i>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="sum-sub" style={{ marginTop: 18 }}>Select at least one room to see an estimate.</p>
            )}
            <button className="btn btn-gold btn-block" onClick={openConsult}>Get a detailed quote <ArrowRight size={16} /></button>
            <p className="fine">Indicative estimate (±8%). Final quote depends on site survey, design and material selection.</p>
          </aside>
        </div>
      </section>

      <section className="section container">
        <SectionHead center eyebrow="All plans" title="Compare Plans for Your Home" sub={`Prices below are calculated for your selection — ${area.toLocaleString('en-IN')} sq ft, ${rooms.length} rooms, ${addons.length} add-on${addons.length === 1 ? '' : 's'}.`} />
        <div className="tier-cards">
          {results.map((r, i) => {
            const brands = BRANDS.filter((b) => b.tiers.includes(r.tier.id)).slice(0, 6);
            const isBest = useBudget ? bestFit && bestFit.tier.id === r.tier.id : r.tier.popular;
            return (
              <Reveal key={r.tier.id} delay={i * 90}>
                <div className={`tier-card ${tierIdx === i ? 'sel' : ''} ${isBest ? 'best' : ''}`}>
                  {isBest && <span className="ribbon">{useBudget ? 'Best fit for your budget' : 'Most popular'}</span>}
                  <h3 className="serif">{r.tier.name}</h3>
                  <p className="muted">{r.tier.tag}</p>
                  <div className="tier-price">{r.total ? fmt(r.total) : '—'}</div>
                  <small className="muted">~₹{r.tier.rate.toLocaleString('en-IN')}/sq ft · EMI {r.total ? fmt(r.emi) : '—'}/mo</small>
                  {useBudget && r.total > 0 && (
                    <span className={`badge ${fit(r) ? 'ok' : 'no'}`}>{fit(r) ? 'Within budget' : `Over by ${fmt(r.total - budgetINR)}`}</span>
                  )}
                  <ul>
                    {r.tier.inclusions.map((x) => <li key={x}><Check size={14} />{x}</li>)}
                    <li><Clock size={14} />Delivery in ~{r.days} days</li>
                    <li><ShieldCheck size={14} />{r.tier.warranty} warranty</li>
                  </ul>
                  <div className="tier-brands">
                    {brands.map((b) => <BrandLogo key={b.name} name={b.name} small />)}
                  </div>
                  <button className={`btn ${tierIdx === i ? 'btn-dark' : 'btn-outline'} btn-block`} onClick={() => choose(i)}>
                    {tierIdx === i ? 'Selected' : `Choose ${r.tier.name}`}
                  </button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="section container faq-wrap">
        <Reveal from="left">
          <span className="eyebrow">Pricing, explained</span>
          <h2 className="serif">Before you decide</h2>
          <p className="muted">Straight answers on how our estimates work.</p>
        </Reveal>
        <Reveal from="right">
          <Faq items={[
            ['How is the estimate calculated?', 'We multiply your area by the plan’s per-sq-ft rate, weighted by the rooms you select, then add the cost of any add-ons. Metro and tier-2 pricing differ slightly.'],
            ['Is this the final price?', 'No — it’s a guide with an ±8% range. You’ll receive an itemised quote after a free site visit and design discussion.'],
            ['What isn’t included?', 'Loose appliances, civil changes, and premium décor pieces are quoted separately unless added through the add-ons above.'],
            ['Can I mix plans?', 'Absolutely. Many clients choose Luxury for the living room and master bedroom and Premium elsewhere.'],
          ]} />
        </Reveal>
      </section>

      <CtaBand title="Want exact numbers?" text="Book a free site visit and receive an itemised quote in 48 hours." label="Book Now" onClick={openConsult} />
    </>
  );
}
