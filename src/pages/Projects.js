import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { PROJECTS, PROJECT_FILTERS } from '../data';
import { CtaBand, FavButton, Img, PageHero, Reveal } from '../components/ui';
import { useApp } from '../components/context';

export default function Projects() {
  const { openConsult } = useApp();
  const [f, setF] = useState('All');
  const list = PROJECTS.filter((p) => f === 'All' || p.cats.includes(f));

  return (
    <>
      <PageHero title="Our Featured Projects" sub="Timeless designs. Lasting impressions." bg="villa1" />
      <section className="section container">
        <div className="pills">
          {PROJECT_FILTERS.map((c) => (
            <button key={c} className={f === c ? 'on' : ''} onClick={() => setF(c)}>{c}</button>
          ))}
        </div>
        <div className="grid-2 proj-grid">
          {list.map((p, i) => (
            <Reveal key={p.id} delay={(i % 2) * 90}>
              <Link to={`/projects/${p.id}`} className="card card-photo proj-card">
                <div className="thumb">
                  <Img k={p.cover} w={900} alt={p.title} />
                  <FavButton id={p.id} />
                  <span className="loc"><MapPin size={12} /> {p.city}</span>
                </div>
                <div className="card-cap">
                  <div><b>{p.title}</b><small>{p.city}</small></div>
                  <ArrowRight size={16} />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand title="Have a project in mind?" text="Let’s create something extraordinary together." onClick={openConsult} />
    </>
  );
}
