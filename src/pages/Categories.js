import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ROOMS } from '../data';
import { CtaBand, FavButton, Img, PageHero, Reveal } from '../components/ui';
import { useApp } from '../components/context';

export default function Categories() {
  const { openConsult } = useApp();
  return (
    <>
      <PageHero title="Interior Design Categories" sub="Discover styles that match your personality" bg="living7" />
      <section className="container panel flat">
        <div className="grid-3 cat-grid">
          {ROOMS.map((r, i) => (
            <Reveal key={r.id} delay={(i % 3) * 80}>
              <Link to={`/explore?room=${encodeURIComponent(r.name === 'Luxury' || r.name === 'Minimalist' ? 'All' : r.name)}`} className="card card-photo cat-card">
                <Img k={r.img} w={800} alt={r.name} />
                <FavButton id={`c-${r.id}`} />
                <div className="cat-cap">
                  <b className="serif">{r.name}</b>
                  <small>{r.tag}</small>
                  <p>{r.desc}</p>
                  <ArrowRight className="cat-arrow" size={18} />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand title="Not sure where to start?" text="Our designers will curate a style direction for your home." label="Book Now" onClick={openConsult} />
    </>
  );
}
