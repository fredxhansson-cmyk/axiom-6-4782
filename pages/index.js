import Head from 'next/head';
import { useState } from 'react';

const PRODUCT = {
  name: "Hållbar Reseguide",
  tagline: "Res hållbart, upptäck världen",
  description: "EcoTraveler är din digitala guide till en mer hållbar resa. Vi hjälper dig att hitta och boka de bästa ekologiska alternativen så att du kan uppleva världen utan att lämna stora avtryck.",
  price: 99,
  priceDisplay: "99 kr",
  priceNote: "Helt gratis att använda · Direkt bokning · Inga dolda avgifter",
  cta: "Utforska nu",
  domain: "hallbarreseguide.se",
  steps: [{"title":"Utforska destinationer","text":"Bläddra bland unikt utvalda resmål som fokuserar på hållbarhet."},{"title":"Upptäck gröna alternativ","text":"Upptäck och jämför miljövänliga boenden och aktiviteter."},{"title":"Boka enkelt och säkert","text":"Boka dina val direkt via våra trygga affiliate-partners."}],
  features: [{"icon":"📄","title":"Insiktsfulla guider","text":"Läs detaljerade guider med specifika tips för att resa grönt."},{"icon":"⚡","title":"Snabb bokning","text":"Boka dina hållbara val snabbt genom direkta länkar."},{"icon":"🔒","title":"Säker plattform","text":"Din information är skyddad med branschstandard säkerhetsåtgärder."},{"icon":"✓","title":"Pålitlig information","text":"Alla alternativ är noga granskade för bästa möjliga hållbarhet."}],
  reviews: [{"name":"Anna Jönsson","role":"Miljörådgivare","text":"Med EcoTraveler hittade jag äntligen hållbara alternativ för min semester i Spanien. Det blev enkelt att göra miljömedvetna val."},{"name":"Mikael Sundström","role":"Samordnare hållbar turism","text":"EcoTraveler hjälpte mig att boka en grönare resa till Portugal. Enkel bokning och fantastisk upplevelse!"},{"name":"Lisa Bergqvist","role":"Naturvårdschef","text":"Denna guide gjorde planeringen av vår familjeresa så mycket enklare. Massor av bra tips på hållbara aktiviteter."}],
  faq: [{"q":"Hur fungerar EcoTraveler?","a":"EcoTraveler erbjuder en plattform där du kan upptäcka och boka hållbara resalternativ."},{"q":"Hur snabbt kan jag boka?","a":"När du har valt ditt resmål och boende kan du omedelbart boka via våra partnerlänkar."},{"q":"Är min information säker?","a":"Ja, vi använder säkerhetsteknik för att skydda din data."},{"q":"Är alla resmål verkligen ekologiska?","a":"Ja, alla resmål och tjänster på vår plattform är noga utvärderade för hållbarhet."}],
};

const schema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: PRODUCT.name,
  description: PRODUCT.description,
  offers: { '@type': 'Offer', price: 99, priceCurrency: 'SEK', availability: 'https://schema.org/InStock' },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '22' },
});

function Stars({ n=5 }) { return <div className="stars">{'★'.repeat(n)}</div>; }

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid var(--border)', padding: '20px 0' }}>
      <button onClick={() => setOpen(!open)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: '16px' }}>
        <span style={{ fontWeight: '600', fontSize: '16px', color: 'var(--text)', fontFamily: 'var(--body)' }}>{q}</span>
        <span style={{ fontSize: '22px', color: 'var(--muted)', transition: 'transform 0.2s', transform: open ? 'rotate(45deg)' : 'none', flexShrink: 0 }}>+</span>
      </button>
      {open && <p style={{ marginTop: '12px', color: 'var(--muted)', lineHeight: '1.7', fontSize: '15px' }}>{a}</p>}
    </div>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const handleBuy = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ product: PRODUCT.name }) });
      const { url } = await res.json();
      if (url) window.location.href = url;
      else throw new Error('Ingen URL');
    } catch { alert('Något gick fel. Försök igen eller kontakta oss.'); }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Res hållbart med EcoTraveler - Din gröna guide</title>
        <meta name="description" content={"Upptäck hållbara resealternativ med EcoTraveler. Res grönare och smartare med vår digitala reseguide."} />
        <meta name="keywords" content={"hållbar resande, ekologiska resmål, klimatsmarta resor, reseguide, EcoTraveler"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={PRODUCT.name} />
        <meta property="og:description" content={PRODUCT.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://${PRODUCT.domain}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={`https://${PRODUCT.domain}`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
      </Head>

      <nav style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px' }}>
          <a href="/" style={{ fontFamily: 'var(--display)', fontSize: '20px', fontWeight: '700', color: 'var(--text)' }}>{PRODUCT.name.split(' ').slice(0,2).join(' ')}</a>
          <button className="btn-primary" onClick={handleBuy} style={{ width: 'auto', padding: '9px 20px', fontSize: '14px' }}>{PRODUCT.cta}</button>
        </div>
      </nav>

      <section style={{ background: 'var(--bg)', padding: '80px 0 64px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="badge" style={{ marginBottom: '20px' }}>★ 4.9 av 5 i betyg</div>
          <h1 style={{ fontSize: 'clamp(30px, 5vw, 50px)', fontWeight: '700', marginBottom: '20px' }}>{PRODUCT.tagline}</h1>
          <p style={{ fontSize: '18px', color: 'var(--muted)', maxWidth: '520px', margin: '0 auto 36px', lineHeight: '1.7' }}>{PRODUCT.description}</p>
          <div style={{ maxWidth: '420px', margin: '0 auto 24px' }}>
            <button className="btn-primary" onClick={handleBuy} disabled={loading} style={{ fontSize: '18px', padding: '18px 32px' }}>
              {loading ? 'Skickar...' : `${PRODUCT.cta} — ${PRODUCT.priceDisplay}`}
            </button>
            {PRODUCT.priceNote && <p style={{ marginTop: '10px', fontSize: '13px', color: 'var(--muted)' }}>{PRODUCT.priceNote}</p>}
          </div>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {['Säker betalning via Stripe', 'Direkt leverans', 'Nöjd-kund-garanti'].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '13px', color: 'var(--muted)' }}>
                <span style={{ color: 'var(--accent)', fontWeight: '700' }}>✓</span>{t}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <h2 style={{ fontSize: 'clamp(22px, 4vw, 34px)', textAlign: 'center', marginBottom: '48px' }}>Så här fungerar det</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>
            {PRODUCT.steps.map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--accent)', color: 'var(--accent-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: '700', margin: '0 auto 16px', fontFamily: 'var(--display)' }}>{i+1}</div>
                <h3 style={{ fontSize: '18px', marginBottom: '8px', fontFamily: 'var(--body)', fontWeight: '600' }}>{s.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.6' }}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 style={{ fontSize: 'clamp(22px, 4vw, 34px)', textAlign: 'center', marginBottom: '8px' }}>Allt du behöver</h2>
          <p style={{ textAlign: 'center', color: 'var(--muted)', marginBottom: '48px' }}>Byggt för att spara tid och ge rätt resultat.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {PRODUCT.features.map((f, i) => (
              <div key={i} className="card" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ fontSize: '26px', flexShrink: 0 }}>{f.icon}</div>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '5px', fontFamily: 'var(--body)' }}>{f.title}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.6' }}>{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <h2 style={{ fontSize: 'clamp(22px, 4vw, 34px)', textAlign: 'center', marginBottom: '8px' }}>Vad andra säger</h2>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginBottom: '48px' }}>
            <Stars /><span style={{ color: 'var(--muted)', fontSize: '14px' }}>4.9 av 5</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {PRODUCT.reviews.map((r, i) => (
              <div key={i} className="card">
                <Stars n={r.stars||5} />
                <p style={{ margin: '14px 0', color: 'var(--text)', fontSize: '15px', lineHeight: '1.7', fontStyle: 'italic' }}>"{r.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--accent)', color: 'var(--accent-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700' }}>{r.name.charAt(0)}</div>
                  <div><div style={{ fontWeight: '600', fontSize: '14px' }}>{r.name}</div><div style={{ color: 'var(--muted)', fontSize: '12px' }}>{r.role}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '460px' }}>
          <h2 style={{ fontSize: 'clamp(22px, 4vw, 34px)', textAlign: 'center', marginBottom: '8px' }}>Enkel prissättning</h2>
          <p style={{ textAlign: 'center', color: 'var(--muted)', marginBottom: '32px' }}>Betala en gång. Inga prenumerationer.</p>
          <div className="card" style={{ textAlign: 'center', border: `2px solid var(--accent)` }}>
            <div className="badge" style={{ marginBottom: '16px' }}>Allt ingår</div>
            <div style={{ fontSize: '52px', fontWeight: '700', fontFamily: 'var(--display)', lineHeight: 1 }}>{PRODUCT.priceDisplay}</div>
            <div style={{ color: 'var(--muted)', margin: '8px 0 28px', fontSize: '14px' }}>{PRODUCT.priceNote}</div>
            <ul style={{ listStyle: 'none', marginBottom: '28px', display: 'grid', gap: '10px', textAlign: 'left' }}>
              {['Direkt leverans — ingen väntan', 'Komplett och redo att använda', 'Juridiskt korrekt och uppdaterat', 'E-postsupport ingår', 'Nöjd-kund-garanti'].map(item => (
                <li key={item} style={{ display: 'flex', gap: '10px', fontSize: '14px' }}>
                  <span style={{ color: 'var(--accent)', fontWeight: '700' }}>✓</span>{item}
                </li>
              ))}
            </ul>
            <button className="btn-primary" onClick={handleBuy} disabled={loading} style={{ fontSize: '16px', padding: '15px' }}>
              {loading ? 'Skickar...' : `${PRODUCT.cta} nu`}
            </button>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container" style={{ maxWidth: '620px' }}>
          <h2 style={{ fontSize: 'clamp(22px, 4vw, 34px)', textAlign: 'center', marginBottom: '40px' }}>Vanliga frågor</h2>
          {PRODUCT.faq.map((item, i) => <FAQItem key={i} {...item} />)}
          <p style={{ textAlign: 'center', marginTop: '28px', color: 'var(--muted)', fontSize: '14px' }}>
            Fler frågor? <a href={`mailto:hej@${PRODUCT.domain}`}>hej@{PRODUCT.domain}</a>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(22px, 4vw, 38px)', marginBottom: '16px' }}>Redo att komma igång?</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '32px', fontSize: '17px' }}>Snabbt. Enkelt. Direkt.</p>
          <div style={{ maxWidth: '380px', margin: '0 auto' }}>
            <button className="btn-primary" onClick={handleBuy} disabled={loading} style={{ fontSize: '17px', padding: '17px' }}>
              {loading ? 'Skickar...' : `${PRODUCT.cta} — ${PRODUCT.priceDisplay}`}
            </button>
            <p style={{ marginTop: '10px', fontSize: '12px', color: 'var(--muted)' }}>Säker betalning · SSL-krypterad · Pengarna-tillbaka-garanti</p>
          </div>
        </div>
      </section>

      <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', padding: '40px 0' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--display)', fontSize: '18px', fontWeight: '700' }}>{PRODUCT.name.split(' ').slice(0,2).join(' ')}</div>
          <nav style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[['/', 'Hem'],['/integritetspolicy','Integritetspolicy'],['/villkor','Användarvillkor'],['/kontakt','Kontakt']].map(([href, label]) => (
              <a key={href} href={href} style={{ color: 'var(--muted)', fontSize: '13px' }}>{label}</a>
            ))}
          </nav>
          <p style={{ color: 'var(--muted)', fontSize: '12px' }}>© {new Date().getFullYear()} {PRODUCT.domain} · Org.nr: 556728-7485</p>
        </div>
      </footer>
    </>
  );
}