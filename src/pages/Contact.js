import React from 'react';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { ConsultForm, Faq, PageHero, Reveal } from '../components/ui';
import { FAQS } from '../data';
import { Facebook, Instagram, Linkedin, Youtube } from '../components/brands';

export default function Contact() {
  return (
    <>
      <PageHero title="Contact Us" sub="Let’s bring your dream space to life." bg="living11" />
      <section className="container panel flat contact">
        <div className="contact-info">
          <h3 className="serif">Get in Touch</h3>
          <ul>
            <li><Phone size={18} /><div><b>+91 98765 43210</b><small>Mon - Sat, 9AM - 7PM</small></div></li>
            <li><Mail size={18} /><div><b>hello@decora.com</b><small>We reply within 24 hours</small></div></li>
            <li><MapPin size={18} /><div><b>123 Design Street</b><small>Hyderabad, Telangana - 500001</small></div></li>
            <li><Clock size={18} /><div><b>Studio Visits</b><small>By appointment, Mon - Sat</small></div></li>
          </ul>
          <div className="social plain">
            {[Facebook, Instagram, Youtube, Linkedin].map((I, i) => (
              <a key={i} href="/" onClick={(e) => e.preventDefault()} aria-label="social"><I size={16} /></a>
            ))}
          </div>
          <div className="map">
            <iframe
              title="Decora studio location"
              loading="lazy"
              src="https://www.openstreetmap.org/export/embed.html?bbox=78.35%2C17.35%2C78.60%2C17.50&layer=mapnik&marker=17.385%2C78.4867"
            />
            <span className="map-label"><MapPin size={14} /> Hyderabad</span>
          </div>
        </div>
        <div className="contact-form">
          <h3 className="serif">Book a Consultation</h3>
          <p className="muted">Share a few details and we’ll arrange a complimentary design session.</p>
          <ConsultForm />
        </div>
      </section>
      <section className="container section-s" style={{ paddingBottom: 60 }}>
        <Reveal>
          <h3 className="sec-title">Frequently Asked Questions</h3>
          <Faq items={FAQS} />
        </Reveal>
      </section>
    </>
  );
}
