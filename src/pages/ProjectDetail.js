import React, { useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Bookmark, Calendar, Home as HomeIcon, MapPin, Palette, Ruler, Sparkles, X } from 'lucide-react';
import { DESIGNERS, PROJECTS, img } from '../data';
import { FavButton, Img, PageHero } from '../components/ui';
import { useApp } from '../components/context';

function BeforeAfter({ before, after }) {
  const box = useRef(null);
  const [pos, setPos] = useState(50);
  const move = (x) => {
    const r = box.current.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((x - r.left) / r.width) * 100)));
  };
  return (
    <div
      className="ba"
      ref={box}
      onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); move(e.clientX); }}
      onPointerMove={(e) => e.buttons && move(e.clientX)}
    >
      <Img k={after} w={1000} alt="After" draggable="false" />
      <div className="ba-before" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Img k={before} w={1000} alt="Before" draggable="false" style={{ filter: 'grayscale(1) brightness(.7) contrast(.75) blur(1.5px)' }} />
      </div>
      <span className="ba-tag l">Before</span>
      <span className="ba-tag r">After</span>
      <div className="ba-handle" style={{ left: `${pos}%` }}><span>⇆</span></div>
    </div>
  );
}

export default function ProjectDetail() {
  const { id } = useParams();
  const { openConsult, favs, toggleFav } = useApp();
  const [tab, setTab] = useState('Overview');
  const [light, setLight] = useState(null);
  const p = PROJECTS.find((x) => x.id === id);

  if (!p) {
    return (
      <section className="container section empty">
        <h2 className="serif">Project not found</h2>
        <Link className="btn btn-dark" to="/projects">Back to projects</Link>
      </section>
    );
  }
  const d = DESIGNERS.find((x) => x.id === p.designer);
  const related = PROJECTS.filter((x) => x.id !== p.id).slice(0, 4);
  const saved = favs.includes(p.id);
  const tabs = ['Overview', 'Gallery', 'Before & After', 'Materials', 'Designer'];

  const facts = [
    [HomeIcon, p.bhk], [Ruler, p.area], [Sparkles, p.style], [Calendar, p.duration],
  ];

  return (
    <>
      <PageHero
        bg={p.cover}
        title={p.title}
        crumbs={<><Link to="/">Home</Link> › <Link to="/projects">Projects</Link> › {p.title}</>}
        sub={<span className="loc-line"><MapPin size={15} /> {p.city}, {p.state} <span className="pill">{p.cats.includes('Luxury') ? 'Luxury' : p.cats[0]}</span></span>}
        actions={
          <button className="btn btn-light" onClick={() => toggleFav(p.id)}>
            {saved ? 'Saved' : 'Save Project'} <Bookmark size={15} fill={saved ? 'currentColor' : 'none'} />
          </button>
        }
      />

      <div className="container">
        <div className="tabs tabs-line">
          {tabs.map((t) => <button key={t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>{t}</button>)}
        </div>
      </div>

      <section className={`container section-s detail ${tab === 'Overview' ? 'detail3' : ''}`}>
        <div className="detail-main">
          {tab === 'Overview' && (
            <>
              <div className="ov-col">
              <h3 className="serif">Project Overview</h3>
              <p className="lead">{p.summary}</p>
              <p className="muted">
                Working closely with the client, our team re-planned circulation, introduced a layered lighting scheme and
                commissioned bespoke joinery to make every room feel cohesive. The result is a home that is warm, quietly
                luxurious and effortless to live in.
              </p>
              <ul className="facts">
                {facts.map(([I, t]) => <li key={t}><I size={18} />{t}</li>)}
                <li className="palette-row"><Palette size={18} />Material Palette
                  <span>{p.palette.map((c) => <i key={c} style={{ background: c }} title={c} />)}</span>
                </li>
              </ul>
              <div className="chips">
                {p.materials.map(([n]) => <span key={n}>{n}</span>)}
              </div>
              </div>
              <div className="ba-col">
                <h3 className="serif">Before &amp; After</h3>
                <BeforeAfter before={p.gallery[0]} after={p.gallery[0]} />
              </div>
            </>
          )}

          {tab === 'Gallery' && (
            <>
              <h3 className="serif">Gallery</h3>
              <div className="gallery">
                {p.gallery.map((g, i) => (
                  <button key={g + i} onClick={() => setLight(g)}><Img k={g} w={700} alt="" /></button>
                ))}
              </div>
            </>
          )}

          {tab === 'Before & After' && (
            <>
              <h3 className="serif">Before &amp; After</h3>
              <p className="muted">Drag the handle to see the transformation.</p>
              <BeforeAfter before={p.gallery[0]} after={p.gallery[0]} />
            </>
          )}

          {tab === 'Materials' && (
            <>
              <h3 className="serif">Materials &amp; Finishes</h3>
              <div className="materials">
                {p.materials.map(([n, t]) => (
                  <div key={n}><b className="serif">{n}</b><p className="muted">{t}</p></div>
                ))}
              </div>
              <div className="palette-big">{p.palette.map((c) => <i key={c} style={{ background: c }}><small>{c}</small></i>)}</div>
            </>
          )}

          {tab === 'Designer' && d && (
            <>
              <h3 className="serif">Meet the Designer</h3>
              <div className="designer-inline">
                <Img k={d.img} w={400} alt={d.name} />
                <div>
                  <h4 className="serif">{d.name}</h4>
                  <small className="muted">{d.title} · {d.speciality}</small>
                  <p className="muted">{d.bio}</p>
                  <Link to={`/designers/${d.id}`} className="btn btn-outline">View Profile</Link>
                </div>
              </div>
            </>
          )}

          {tab !== 'Gallery' && tab !== 'Before & After' && tab !== 'Overview' && (
            <div className="before-after-teaser">
              <h4 className="serif">Before &amp; After</h4>
              <BeforeAfter before={p.gallery[0]} after={p.gallery[0]} />
            </div>
          )}
        </div>

        <aside className="designed-by">
          <span className="eyebrow gold">Designed by</span>
          {d && <Img k={d.img} w={400} alt={d.name} />}
          <h4 className="serif">{d?.name}</h4>
          <small>{d?.title}</small>
          <button className="btn btn-gold btn-block" onClick={openConsult}>Contact Designer</button>
        </aside>
      </section>

      <section className="container">
        <figure className="client-quote">
          <span className="serif">“</span>
          <blockquote>From the first walkthrough to the final styling, the {p.title.toLowerCase()} feels exactly the way we imagined — only better.</blockquote>
          <figcaption>— The homeowners, {p.city}</figcaption>
        </figure>
      </section>

      <section className="section container">
        <h3 className="serif sec-title">Related Projects</h3>
        <div className="grid-4">
          {related.map((r) => (
            <Link key={r.id} to={`/projects/${r.id}`} className="card card-photo related">
              <Img k={r.cover} w={500} alt={r.title} />
              <FavButton id={r.id} />
              <div className="card-cap"><div><b>{r.title}</b><small>{r.city}</small></div></div>
            </Link>
          ))}
        </div>
      </section>

      {light && (
        <div className="lightbox" onClick={() => setLight(null)}>
          <button aria-label="Close"><X size={22} /></button>
          <img src={img(light, 1800)} alt="" />
        </div>
      )}
    </>
  );
}
