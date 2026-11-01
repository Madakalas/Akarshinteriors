import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Categories from './pages/Categories';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import { Designers, DesignerProfile } from './pages/Designers';
import About from './pages/About';
import Contact from './pages/Contact';
import Plans from './pages/Plans';
import Materials from './pages/Materials';

const NotFound = () => (
  <section className="container section empty" style={{ paddingTop: 160 }}>
    <h1 className="serif">Page not found</h1>
    <p className="muted">The page you’re looking for has moved or doesn’t exist.</p>
    <Link className="btn btn-dark" to="/">Back home</Link>
  </section>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="categories" element={<Categories />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:id" element={<ProjectDetail />} />
          <Route path="designers" element={<Designers />} />
          <Route path="designers/:id" element={<DesignerProfile />} />
          <Route path="plans" element={<Plans />} />
          <Route path="materials" element={<Materials />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
