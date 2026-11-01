import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { MILESTONES, PROMISES, STATS, VALUES, img } from '../data';
import { Counter, Img, PageHero, Reveal } from '../components/ui';
import { ICONS } from '../components/icons';


export default function About() {
  return (
    <>
      <PageHero title="About Decora" sub="Designing better spaces for a better tomorrow." bg="dining1" />

      <section className="container panel split-light">
        <Reveal>
          <h2 className="serif">Our Story</h2>
          <p className="lead">
            Decora was born out of a passion for design and a belief that beautiful spaces can inspire a better life.
            We help homeowners and businesses create stunning interiors that are functional, elegant and timeless.
          </p>
          <p className="muted">
            What began as a two-person studio in Hyderabad has grown into a team of designers, engineers and craftsmen
            delivering homes across more than twenty-five states — each one personal, each one built to last.
          </p>
          <Link to="/projects" className="btn btn-gold">Learn More <ArrowRight size={16} /></Link>
        </Reveal>
        <Reveal delay={120}><Img k="dining1" w={1000} alt="Decora studio" className="round" /></Reveal>
      </section>

      <div className="container">
        <div className="stats">
          {STATS.map((s) => <div key={s.label} className="stat-plain"><div><b><Counter value={s.value} /></b><span>{s.label}</span></div></div>)}
        </div>
      </div>

      <section className="section container">
        <h3 className="sec-title">Our Values</h3>
        <div className="values">
          {VALUES.map((v, i) => {
            const I = ICONS[v.icon];
            return (
              <Reveal key={v.title} delay={i * 80}>
                <div className="value">
                  <span><I size={26} strokeWidth={1.4} /></span>
                  <h5>{v.title}</h5>
                  <p className="muted">{v.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="section container">
        <h3 className="sec-title">Our Journey</h3>
        <div className="timeline">
          {MILESTONES.map((m, i) => (
            <Reveal key={m.year} delay={i * 80} from={i % 2 ? 'right' : 'left'}>
              <div className="tl-item">
                <span className="serif">{m.year}</span>
                <div><h5>{m.title}</h5><p className="muted">{m.text}</p></div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="promise">
        <div className="container">
          <h3 className="sec-title" style={{ textAlign: 'center', color: '#fff' }}>What You Can Expect</h3>
          <div className="promise-grid">
            {PROMISES.map((p, i) => {
              const I = ICONS[p.icon];
              return (
                <Reveal key={p.title} delay={i * 90} from="zoom">
                  <div className="promise-item"><I size={30} strokeWidth={1.3} /><h5>{p.title}</h5><p>{p.text}</p></div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container" style={{ marginTop: 56 }}>
        <div className="banner" style={{ backgroundImage: `linear-gradient(90deg, rgba(53,36,26,.93), rgba(53,36,26,.15)), url(${img('living5', 1800)})` }}>
          <h3 className="serif">Creating spaces that inspire</h3>
          <p>Beautiful interiors. Better living.</p>
        </div>
      </section>
    </>
  );
}
