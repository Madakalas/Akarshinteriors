import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Search, SlidersHorizontal, X } from 'lucide-react';
import { DESIGNS, ROOM_FILTERS, STATES, STYLES } from '../data';
import { FavButton, Img, PageHero } from '../components/ui';
import { useApp } from '../components/context';

const PER = 7;

function Group({ title, items, sel, toggle }) {
  return (
    <div className="f-group">
      <h6>{title}</h6>
      {items.map((it) => (
        <label key={it} className="check">
          <input type="checkbox" checked={sel.includes(it)} onChange={() => toggle(it)} />
          <i /> {it}
        </label>
      ))}
    </div>
  );
}

export default function Explore() {
  const { openConsult } = useApp();
  const [params] = useSearchParams();
  const initialRoom = params.get('room');
  const [q, setQ] = useState('');
  const [tab, setTab] = useState(initialRoom || 'All');
  const [states, setStates] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [styles, setStyles] = useState([]);
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => { if (initialRoom) setTab(initialRoom); }, [initialRoom]);
  useEffect(() => { setPage(1); }, [q, tab, states, rooms, styles]);

  const tog = (setter) => (v) => setter((a) => (a.includes(v) ? a.filter((x) => x !== v) : [...a, v]));

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return DESIGNS.filter((d) =>
      (tab === 'All' || d.room === tab) &&
      (!states.length || states.includes(d.state)) &&
      (!rooms.length || rooms.includes(d.room)) &&
      (!styles.length || styles.includes(d.style)) &&
      (!s || `${d.title} ${d.city} ${d.room} ${d.style}`.toLowerCase().includes(s)));
  }, [q, tab, states, rooms, styles]);

  const pages = Math.max(1, Math.ceil(list.length / PER));
  const view = list.slice((page - 1) * PER, page * PER);
  const active = states.length + rooms.length + styles.length;
  const clear = () => { setStates([]); setRooms([]); setStyles([]); setTab('All'); setQ(''); };

  return (
    <>
      <PageHero title="Explore Interior Designs" sub="Find inspiration for every space and style." bg="living2">
        <div className="searchbar">
          <input placeholder="Search designs, rooms, cities…" value={q} onChange={(e) => setQ(e.target.value)} />
          <button aria-label="Search"><Search size={18} /></button>
        </div>
      </PageHero>

      <section className="container explore">
        <aside className={`filters ${filtersOpen ? 'open' : ''}`}>
          <div className="f-head">
            <h4 className="serif">Filters</h4>
            {active > 0 && <button className="link-btn" onClick={clear}>Clear all</button>}
            <button className="f-close" onClick={() => setFiltersOpen(false)}><X size={18} /></button>
          </div>
          <Group title="State" items={STATES} sel={states} toggle={tog(setStates)} />
          <Group title="Room" items={ROOM_FILTERS} sel={rooms} toggle={tog(setRooms)} />
          <Group title="Style" items={STYLES} sel={styles} toggle={tog(setStyles)} />
        </aside>

        <div className="results">
          <div className="tabs">
            {['All', ...ROOM_FILTERS.slice(0, 5)].map((t) => (
              <button key={t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>{t}</button>
            ))}
            <button className="filter-toggle" onClick={() => setFiltersOpen(true)}>
              <SlidersHorizontal size={15} /> Filters{active ? ` (${active})` : ''}
            </button>
          </div>
          <p className="muted count">{list.length} design{list.length === 1 ? '' : 's'} found</p>

          {view.length ? (
            <div className="masonry">
              {view.map((d, i) => (
                <Link to="/projects/luxury-villa" key={d.id} className={`card card-photo ${i === 0 ? 'feature' : ''}`}>
                  <Img k={d.img} w={800} alt={d.title} />
                  <FavButton id={`d${d.id}`} />
                  <div className="card-cap card-cap-over">
                    <div><b>{d.title}</b><small>{d.city}</small>{i === 0 && <small className="vd">View Details →</small>}</div>
                    {i !== 0 && <span className="pill">{d.style}</span>}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="empty">
              <h4 className="serif">No designs match your filters</h4>
              <p className="muted">Try removing a filter, or let our designers curate something for you.</p>
              <div className="hero-btns">
                <button className="btn btn-dark" onClick={clear}>Reset filters</button>
                <button className="btn btn-outline" onClick={openConsult}>Talk to a designer</button>
              </div>
            </div>
          )}

          {pages > 1 && (
            <div className="pager">
              <button disabled={page === 1} onClick={() => setPage(page - 1)} aria-label="Previous"><ChevronLeft size={16} /></button>
              {[...Array(pages)].map((_, i) => (
                <button key={i} className={page === i + 1 ? 'on' : ''} onClick={() => setPage(i + 1)}>{i + 1}</button>
              ))}
              <button disabled={page === pages} onClick={() => setPage(page + 1)} aria-label="Next"><ChevronRight size={16} /></button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
