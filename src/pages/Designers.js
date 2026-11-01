import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Briefcase, Calendar, Globe, MapPin, Star } from 'lucide-react';
import { DESIGNERS } from '../data';
import { DESIGNER_EXTRA } from '../catalog';
import { BrandLogo, CtaBand, Img, PageHero, Reveal, SectionHead, Stars } from '../components/ui';
import { useApp } from '../components/context';

export function Designers() {
  const { openConsult } = useApp();
  return (
    <>
      <PageHero title="Meet Our Designers" sub="Creative minds behind beautiful spaces." bg="office3" />
      <section className="container panel">
        <div className="grid-3 designers">
          {DESIGNERS.map((d, i) => (
            <Reveal key={d.id} delay={(i % 3) * 90}>
              <div className="designer-card">
                <div className="d-photo"><Img k={d.img} w={500} alt={d.name} /></div>
                <h4 className="serif">{d.name}</h4>
                <small>{d.role}</small>
                <span className="d-meta">{d.years} yrs · {d.projects}+ projects</span>
                <span className="d-rate"><Stars value={DESIGNER_EXTRA[d.id]?.rating || 5} size={12} /> {DESIGNER_EXTRA[d.id]?.rating}</span>
                <Link to={`/designers/${d.id}`} className="link-arrow">View Profile <ArrowRight size={14} /></Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand title="Let’s design together" text="Book a consultation with our experts." onClick={openConsult} />
    </>
  );
}

export function DesignerProfile() {
  const { id } = useParams();
  const { openConsult } = useApp();
  const d = DESIGNERS.find((x) => x.id === id);
  const x = DESIGNER_EXTRA[id];
  if (!d || !x) return <section className="container section empty"><h2 className="serif">Designer not found</h2><Link className="btn btn-dark" to="/designers">All designers</Link></section>;

  const first = d.name.split(' ')[0];
  const cityMap = {};
  x.work.forEach((w) => { (cityMap[w.city] = cityMap[w.city] || { city: w.city, state: w.state, items: [] }).items.push(w.title); });
  const cities = Object.values(cityMap);
  const states = new Set(x.work.map((w) => w.state)).size;
  const others = DESIGNERS.filter((o) => o.id !== d.id).slice(0, 3);

  return (
    <>
      <PageHero
        title={d.name}
        sub={`${d.title} · ${d.speciality}`}
        bg="living3"
        crumbs={<><Link to="/designers">Designers</Link> › {d.name}</>}
      />

      <section className="container section-s profile">
        <div className="d-photo big"><Img k={d.img} w={700} alt={d.name} /></div>
        <div>
          <h3>About {first}</h3>
          <p className="lead">{d.bio}</p>
          <div className="pro-meta">
            <span><MapPin size={14} /> Based in {x.based}</span>
            <span><Globe size={14} /> {x.languages.join(' · ')}</span>
          </div>
          <div className="stats stats-s stats-4">
            <div><Briefcase size={20} /><div><b>{d.projects}+</b><span>Projects</span></div></div>
            <div><Calendar size={20} /><div><b>{d.years}</b><span>Years</span></div></div>
            <div><MapPin size={20} /><div><b>{cities.length}</b><span>Cities · {states} states</span></div></div>
            <div><Star size={20} /><div><b>{x.rating}</b><span>{x.reviews} reviews</span></div></div>
          </div>
          <div className="hero-btns">
            <button className="btn btn-dark" onClick={openConsult}>Book with {first} <ArrowRight size={16} /></button>
            <Link to="/plans" className="btn btn-outline">Estimate my budget</Link>
          </div>
        </div>
      </section>

      <section className="section container">
        <SectionHead eyebrow="Portfolio" title={`What ${first} Has Designed`} sub="A selection of completed work — with location, size and scope." />
        <div className="grid-3 work-grid">
          {x.work.map((w, i) => {
            const inner = (
              <>
                <div className="thumb">
                  <Img k={w.img} w={800} alt={w.title} />
                  <span className="work-type">{w.type}</span>
                  <span className="loc"><MapPin size={12} /> {w.city}</span>
                </div>
                <div className="work-body">
                  <div className="work-title"><b>{w.title}</b><em>{w.year}</em></div>
                  <small>{w.city}, {w.state}</small>
                  <div className="work-meta"><span>{w.area}</span><span>{w.scope}</span></div>
                  {w.id && <span className="link-arrow">View project <ArrowRight size={13} /></span>}
                </div>
              </>
            );
            return (
              <Reveal key={w.title} delay={(i % 3) * 80}>
                {w.id ? <Link to={`/projects/${w.id}`} className="card work-card">{inner}</Link> : <div className="card work-card">{inner}</div>}
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="section container">
        <div className="two-col">
          <Reveal from="left">
            <h3 className="sec-title">Where {first} Has Worked</h3>
            <div className="city-list">
              {cities.map((c) => (
                <div key={c.city} className="city">
                  <span className="pin"><MapPin size={16} /></span>
                  <div><b>{c.city}</b><small>{c.state}</small></div>
                  <em>{c.items.length} project{c.items.length > 1 ? 's' : ''}</em>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal from="right">
            <h3 className="sec-title">Expertise</h3>
            <div className="skills">
              {x.expertise.map(([n, v]) => (
                <div key={n}><span>{n}</span><b>{v}%</b><i><u style={{ width: `${v}%` }} /></i></div>
              ))}
            </div>
            <h3 className="sec-title" style={{ marginTop: 34 }}>Brands {first} Specifies</h3>
            <div className="brand-row">{x.brands.map((b) => <BrandLogo key={b} name={b} />)}</div>
            <Link to="/materials" className="link-arrow" style={{ marginTop: 14 }}>All brands & materials <ArrowRight size={14} /></Link>
          </Reveal>
        </div>
      </section>

      <section className="section container">
        <h3 className="sec-title">Career Highlights</h3>
        <div className="timeline">
          {x.highlights.map(([y, t], i) => (
            <Reveal key={y} delay={i * 70}>
              <div className="tl-item">
                <span className="serif">{y}</span>
                <div><h5>{t}</h5></div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="testi">
        <div className="container">
          <SectionHead center eyebrow="Recommendations" title={`What Clients Say About ${first}`} />
          <div className="rating-big"><b className="serif">{x.rating}</b><Stars value={x.rating} size={20} /><span>{x.reviews} verified reviews</span></div>
          <div className="grid-2 recs">
            {x.recs.map(([n, p, t, r], i) => (
              <Reveal key={n} delay={i * 90}>
                <figure className="testi-card">
                  <Stars value={r} />
                  <blockquote>“{t}”</blockquote>
                  <figcaption><span className="avatar">{n[0]}</span><span><b>{n}</b><small>{p}</small></span></figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section container">
        <SectionHead eyebrow="You may also like" title="Recommended Designers" to="/designers" />
        <div className="designer-strip three">
          {others.map((o) => (
            <Link key={o.id} to={`/designers/${o.id}`} className="mini-designer">
              <Img k={o.img} w={300} alt={o.name} />
              <b>{o.name}</b>
              <small>{o.role} · {o.speciality}</small>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand title={`Start your project with ${first}`} text="Book a free consultation and get a tailored estimate." onClick={openConsult} />
    </>
  );
}
