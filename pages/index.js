import { useState, useRef, useEffect, useCallback } from 'react';
import Head from 'next/head';

// ─── COPY ─────────────────────────────────────────────────────────────────────

const COPY = {
  en: {
    tagline: 'AI Career & College Guide for Every High School Student',
    h1a: 'Grow toward',
    h1b: 'your future.',
    sub: 'Get real guidance on careers, college, essays, and interviews — free to start, no account needed.',
    cta: 'Start growing — free',
    ctaNote: '2 free questions · No account needed',
    chooseMode: 'What do you want to work on?',
    tryAsking: 'Try asking',
    placeholder: 'Ask anything...',
    essayPlaceholder: 'Paste your essay draft here, or describe what you\'re working on...',
    inputNote: 'GoalGardenAI can make mistakes. Verify important decisions with a school counselor.',
    changeMode: 'Change mode',
    freeLeft: (n) => `${n} free question${n !== 1 ? 's' : ''} left`,
    paywallTitle: 'Keep growing — unlock full access',
    paywallSub: 'You\'ve used your 2 free questions. Upgrade to keep exploring.',
    planMonthly: 'Monthly',
    planAnnual: 'Annual',
    planBadge: 'Best value',
    planAnnualNote: 'Save 35% — just $3.25/month',
    planMonthlyNote: 'Cancel anytime',
    schoolTier: 'School / Counselor License',
    schoolNote: 'Up to 25 students · Classroom access code',
    contactUs: 'Contact us',
    dismiss: 'Not today',
    featuredTitle: 'Everything a student needs to plan their future',
    features: [
      { icon: '🌱', title: 'Career exploration', desc: 'Discover careers that match your strengths, interests, and the life you want.' },
      { icon: '🎓', title: 'College planning', desc: 'Compare schools, understand financial aid, and build a smart application strategy.' },
      { icon: '✍️', title: 'Essay coaching', desc: 'Get specific, encouraging feedback on college essays, scholarship essays, and personal statements.' },
      { icon: '🎤', title: 'Interview prep', desc: 'Practice interviews, write your first resume, and build real confidence.' },
      { icon: '🌎', title: 'English + Spanish', desc: 'Fully bilingual — switch languages anytime.' },
      { icon: '🔍', title: 'Live data', desc: 'Up-to-date salary data, school stats, and job market trends.' },
    ],
    modes: {
      career:    { label: 'Career Exploration', icon: '🌱', desc: 'Find careers that fit your future' },
      college:   { label: 'College Planning',   icon: '🎓', desc: 'Schools, aid & applications' },
      essay:     { label: 'Essay Coach',        icon: '✍️', desc: 'Essays, drafts & personal statements' },
      interview: { label: 'Interview Prep',     icon: '🎤', desc: 'Practice & build confidence' },
    },
    starters: {
      career: [
        'I like science and helping people — what careers should I explore?',
        'What does a software engineer actually do every day?',
        'Which careers are growing the most right now?',
        'Trade school vs. college — which makes more sense for me?',
      ],
      college: [
        'What GPA and SAT do I need for UCLA?',
        'What scholarships exist for first-generation students?',
        'Compare community college vs. 4-year university — costs and outcomes',
        'Walk me through the FAFSA — what do I need to know?',
      ],
      essay: [
        'I have no idea what to write my college essay about — help me brainstorm',
        'Here\'s my draft — can you give me honest feedback?',
        'How do I write a "Why this school?" essay that actually stands out?',
        'What are admissions officers actually looking for in a personal statement?',
      ],
      interview: [
        'Help me prepare for my first job interview at McDonald\'s',
        'What questions do colleges ask in interviews?',
        'Help me write a resume — I have zero work experience',
        'Practice a job interview with me for a retail position',
      ],
    },
  },
  es: {
    tagline: 'Guía de Carreras y Universidad con IA para Todos los Estudiantes',
    h1a: 'Crece hacia',
    h1b: 'tu futuro.',
    sub: 'Obtén orientación real sobre carreras, universidad, ensayos y entrevistas — gratis para empezar.',
    cta: 'Empieza a crecer — gratis',
    ctaNote: '2 preguntas gratis · Sin cuenta necesaria',
    chooseMode: '¿En qué quieres trabajar?',
    tryAsking: 'Prueba preguntar',
    placeholder: 'Pregunta lo que quieras...',
    essayPlaceholder: 'Pega tu borrador aquí, o describe en qué estás trabajando...',
    inputNote: 'GoalGardenAI puede cometer errores. Verifica decisiones importantes con tu consejero escolar.',
    changeMode: 'Cambiar modo',
    freeLeft: (n) => `${n} pregunta${n !== 1 ? 's' : ''} gratis restante${n !== 1 ? 's' : ''}`,
    paywallTitle: '¡Sigue creciendo! — acceso completo',
    paywallSub: 'Ya usaste tus 2 preguntas gratis. Actualiza para continuar.',
    planMonthly: 'Mensual',
    planAnnual: 'Anual',
    planBadge: 'Mejor valor',
    planAnnualNote: 'Ahorra 35% — solo $3.25/mes',
    planMonthlyNote: 'Cancela cuando quieras',
    schoolTier: 'Licencia Escolar / Consejero',
    schoolNote: 'Hasta 25 estudiantes · Código de acceso de clase',
    contactUs: 'Contáctanos',
    dismiss: 'Hoy no',
    featuredTitle: 'Todo lo que un estudiante necesita para planear su futuro',
    features: [
      { icon: '🌱', title: 'Exploración de carreras', desc: 'Descubre carreras que coincidan con tus fortalezas, intereses y la vida que quieres.' },
      { icon: '🎓', title: 'Planificación universitaria', desc: 'Compara universidades, entiende la ayuda financiera y construye tu estrategia de solicitud.' },
      { icon: '✍️', title: 'Coach de ensayos', desc: 'Recibe retroalimentación específica y alentadora sobre ensayos universitarios y declaraciones personales.' },
      { icon: '🎤', title: 'Preparación para entrevistas', desc: 'Practica entrevistas, escribe tu primer currículum y construye confianza real.' },
      { icon: '🌎', title: 'Inglés + Español', desc: 'Completamente bilingüe — cambia de idioma en cualquier momento.' },
      { icon: '🔍', title: 'Datos actualizados', desc: 'Salarios, estadísticas universitarias y tendencias del mercado laboral.' },
    ],
    modes: {
      career:    { label: 'Exploración de Carreras',      icon: '🌱', desc: 'Encuentra carreras para tu futuro' },
      college:   { label: 'Planificación Universitaria',  icon: '🎓', desc: 'Universidades, ayuda y solicitudes' },
      essay:     { label: 'Coach de Ensayos',             icon: '✍️', desc: 'Ensayos, borradores y declaraciones' },
      interview: { label: 'Preparación para Entrevistas', icon: '🎤', desc: 'Practica y construye confianza' },
    },
    starters: {
      career: [
        'Me gusta la ciencia y ayudar personas — ¿qué carreras debería explorar?',
        '¿Qué hace realmente un ingeniero de software día a día?',
        '¿Qué carreras están creciendo más ahora mismo?',
        '¿Escuela técnica vs. universidad — cuál tiene más sentido para mí?',
      ],
      college: [
        '¿Qué GPA y SAT necesito para UCLA?',
        '¿Qué becas existen para estudiantes de primera generación?',
        'Compara el colegio comunitario vs. la universidad de 4 años — costos y resultados',
        'Explícame el FAFSA — ¿qué necesito saber?',
      ],
      essay: [
        'No sé sobre qué escribir mi ensayo universitario — ayúdame a hacer lluvia de ideas',
        'Aquí está mi borrador — ¿puedes darme retroalimentación honesta?',
        '¿Cómo escribo un ensayo de "¿Por qué esta universidad?" que realmente destaque?',
        '¿Qué buscan realmente los oficiales de admisiones en una declaración personal?',
      ],
      interview: [
        "Ayúdame a prepararme para mi primera entrevista en McDonald's",
        '¿Qué preguntas hacen las universidades en las entrevistas?',
        'Ayúdame a escribir un currículum — no tengo experiencia laboral',
        'Practica una entrevista de trabajo conmigo para un puesto en tienda',
      ],
    },
  },
};

const FREE_LIMIT = 2;
const STORAGE_KEY = 'goalgardenai_q';

// ─── MARKDOWN RENDERER ────────────────────────────────────────────────────────

function renderMd(text) {
  if (!text) return null;
  const lines = text.split('\n');
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('• ');
    if (isBullet) {
      const items = [];
      while (i < lines.length && (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('• '))) {
        items.push(lines[i].trim().replace(/^[-•] /, ''));
        i++;
      }
      out.push(
        <ul key={`ul${i}`} style={{ paddingLeft: 20, margin: '6px 0' }}>
          {items.map((item, j) => (
            <li key={j} style={{ marginBottom: 4 }}
              dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          ))}
        </ul>
      );
    } else if (line.trim() === '') {
      out.push(<br key={`br${i}`} />);
      i++;
    } else {
      out.push(
        <span key={`ln${i}`}
          dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') + ' ' }} />
      );
      i++;
    }
  }
  return out;
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function GoalGardenAI() {
  const [lang, setLang]               = useState('en');
  const [view, setView]               = useState('landing');
  const [mode, setMode]               = useState('career');
  const [messages, setMessages]       = useState([]);
  const [input, setInput]             = useState('');
  const [loading, setLoading]         = useState(false);
  const [streaming, setStreaming]     = useState('');
  const [questionsUsed, setQuestionsUsed] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef       = useRef(null);
  const t = COPY[lang];

  useEffect(() => {
    const stored = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
    setQuestionsUsed(stored);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streaming]);

  const goToChat = (m) => {
    setMode(m || mode);
    setView('chat');
    setTimeout(() => inputRef.current?.focus(), 120);
  };

  const resetChat = () => {
    setView('landing');
    setMessages([]);
    setStreaming('');
    setInput('');
  };

  const send = useCallback(async (text) => {
    const trimmed = (text || input).trim();
    if (!trimmed || loading) return;

    if (questionsUsed >= FREE_LIMIT) { setShowPaywall(true); return; }

    const newUsed = questionsUsed + 1;
    setQuestionsUsed(newUsed);
    localStorage.setItem(STORAGE_KEY, String(newUsed));

    const userMsg = { role: 'user', content: trimmed };
    const allMsgs = [...messages, userMsg];
    setMessages(allMsgs);
    setInput('');
    setLoading(true);
    setStreaming('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: allMsgs, mode, language: lang }),
      });

      if (!res.ok) throw new Error('API error');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        for (const line of chunk.split('\n')) {
          if (!line.startsWith('data: ')) continue;
          try {
            const d = JSON.parse(line.slice(6));
            if (d.type === 'text') { full += d.content; setStreaming(full); }
            else if (d.type === 'done') {
              setMessages(prev => [...prev, { role: 'assistant', content: full }]);
              setStreaming('');
              setLoading(false);
              if (newUsed >= FREE_LIMIT) setTimeout(() => setShowPaywall(true), 1400);
            }
          } catch {}
        }
      }
    } catch {
      const errMsg = lang === 'en'
        ? 'Something went wrong. Please try again.'
        : 'Algo salió mal. Por favor intenta de nuevo.';
      setMessages(prev => [...prev, { role: 'assistant', content: errMsg }]);
      setStreaming('');
      setLoading(false);
    }
  }, [input, messages, mode, lang, questionsUsed, loading]);

  const onKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const freeLeft = Math.max(0, FREE_LIMIT - questionsUsed);
  const isEssay  = mode === 'essay';

  // ─── RENDER ───────────────────────────────────────────────────────────────

  return (
    <>
      <Head>
        <title>GoalGardenAI — Career, College & Essay Guide for High School Students</title>
        <meta name="description" content="Free AI guidance for high school students on careers, college planning, essay feedback, and interview prep. Bilingual English & Spanish." />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌱</text></svg>" />
      </Head>

      <div className="app">

        {/* ── HEADER ── */}
        <header className="header">
          <div className="header-logo" onClick={resetChat}>
            <div className="logo-mark">🌱</div>
            <span className="logo-text">GoalGarden<span>AI</span></span>
          </div>
          <div className="header-right">
            <button className="lang-btn" onClick={() => setLang(l => l === 'en' ? 'es' : 'en')}>
              {lang === 'en' ? 'Español' : 'English'}
            </button>
            {questionsUsed >= FREE_LIMIT && (
              <button className="upgrade-pill" onClick={() => setShowPaywall(true)}>Upgrade</button>
            )}
          </div>
        </header>

        {/* ── LANDING ── */}
        {view === 'landing' && (
          <main className="landing">

            {/* Hero */}
            <section className="hero">
              <div className="hero-badge">
                <span className="hero-badge-dot" />
                {t.tagline}
              </div>
              <h1>
                {t.h1a} <em>{t.h1b}</em>
              </h1>
              <p className="hero-sub">{t.sub}</p>
              <button className="hero-cta" onClick={() => goToChat(mode)}>{t.cta}</button>
              <p className="hero-note">{t.ctaNote}</p>
            </section>

            {/* Mode Grid */}
            <section className="modes-section">
              <p className="section-label">{t.chooseMode}</p>
              <div className="modes-grid">
                {Object.entries(t.modes).map(([key, m]) => (
                  <button
                    key={key}
                    className={`mode-card ${mode === key ? 'active' : ''}`}
                    data-mode={key}
                    onClick={() => { setMode(key); goToChat(key); }}
                  >
                    <span className="mode-icon">{m.icon}</span>
                    <div className="mode-title">{m.label}</div>
                    <div className="mode-desc">{m.desc}</div>
                  </button>
                ))}
              </div>
            </section>

            {/* Starter prompts */}
            <section className="starters-section">
              <p className="section-label">{t.tryAsking}</p>
              <div className="starters-grid">
                {t.starters[mode].map((p, i) => (
                  <button key={i} className="starter-chip"
                    onClick={() => { setInput(p); goToChat(mode); setTimeout(() => send(p), 200); }}>
                    {p}
                  </button>
                ))}
              </div>
            </section>

            {/* Features */}
            <section className="features-section">
              <div className="features-inner">
                <h2>{t.featuredTitle}</h2>
                <div className="features-grid">
                  {t.features.map((f, i) => (
                    <div key={i} className="feature-item">
                      <div className="feature-icon">{f.icon}</div>
                      <div className="feature-text">
                        <h3>{f.title}</h3>
                        <p>{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── PRICING SECTION ── */}
            <section className="pricing-section">
              <div className="pricing-inner">
                <p className="section-label">{lang === 'en' ? 'Pricing' : 'Precios'}</p>
                <h2 className="pricing-title">
                  {lang === 'en' ? 'Start free. Upgrade when you\'re ready.' : 'Empieza gratis. Actualiza cuando estés listo.'}
                </h2>
                <p className="pricing-sub">
                  {lang === 'en' ? 'Every student gets 2 free questions. No account, no credit card.' : 'Cada estudiante obtiene 2 preguntas gratis. Sin cuenta, sin tarjeta.'}
                </p>

                <div className="pricing-grid">

                  {/* Free */}
                  <div className="price-card">
                    <div className="price-tier">{lang === 'en' ? 'Free' : 'Gratis'}</div>
                    <div className="price-amount">$0</div>
                    <div className="price-period">{lang === 'en' ? 'forever' : 'siempre'}</div>
                    <ul className="price-features">
                      <li>✓ {lang === 'en' ? '2 questions to try it out' : '2 preguntas para probarlo'}</li>
                      <li>✓ {lang === 'en' ? 'All 4 modes' : 'Los 4 modos'}</li>
                      <li>✓ {lang === 'en' ? 'English + Spanish' : 'Inglés + Español'}</li>
                      <li>✓ {lang === 'en' ? 'No account needed' : 'Sin cuenta'}</li>
                    </ul>
                    <button className="price-btn price-btn-outline" onClick={() => goToChat('career')}>
                      {lang === 'en' ? 'Try it now' : 'Pruébalo ahora'}
                    </button>
                  </div>

                  {/* Monthly */}
                  <div className="price-card price-card-featured">
                    <div className="price-popular-badge">{lang === 'en' ? 'Most popular' : 'Más popular'}</div>
                    <div className="price-tier">{lang === 'en' ? 'Monthly' : 'Mensual'}</div>
                    <div className="price-amount">$4.99</div>
                    <div className="price-period">{lang === 'en' ? 'per month' : 'por mes'}</div>
                    <ul className="price-features">
                      <li>✓ {lang === 'en' ? 'Unlimited questions' : 'Preguntas ilimitadas'}</li>
                      <li>✓ {lang === 'en' ? 'All 4 modes' : 'Los 4 modos'}</li>
                      <li>✓ {lang === 'en' ? 'Essay feedback' : 'Retroalimentación de ensayos'}</li>
                      <li>✓ {lang === 'en' ? 'Live salary & college data' : 'Datos de salarios y universidades'}</li>
                      <li>✓ {lang === 'en' ? 'Cancel anytime' : 'Cancela cuando quieras'}</li>
                    </ul>
                    <a href={process.env.NEXT_PUBLIC_STRIPE_MONTHLY_LINK || '#'} className="price-btn price-btn-primary" target="_blank" rel="noopener noreferrer">
                      {lang === 'en' ? 'Get started →' : 'Comenzar →'}
                    </a>
                  </div>

                  {/* Annual */}
                  <div className="price-card">
                    <div className="price-save-badge">{lang === 'en' ? 'Save 35%' : 'Ahorra 35%'}</div>
                    <div className="price-tier">{lang === 'en' ? 'Annual' : 'Anual'}</div>
                    <div className="price-amount">$3.25</div>
                    <div className="price-period">{lang === 'en' ? '/mo · billed $39/year' : '/mes · $39/año'}</div>
                    <ul className="price-features">
                      <li>✓ {lang === 'en' ? 'Everything in Monthly' : 'Todo lo de Mensual'}</li>
                      <li>✓ {lang === 'en' ? '2 months free' : '2 meses gratis'}</li>
                      <li>✓ {lang === 'en' ? 'Best value' : 'Mejor valor'}</li>
                      <li>✓ {lang === 'en' ? 'Priority support' : 'Soporte prioritario'}</li>
                    </ul>
                    <a href={process.env.NEXT_PUBLIC_STRIPE_ANNUAL_LINK || '#'} className="price-btn price-btn-outline" target="_blank" rel="noopener noreferrer">
                      {lang === 'en' ? 'Save 35% →' : 'Ahorrar 35% →'}
                    </a>
                  </div>

                  {/* School */}
                  <div className="price-card price-card-school">
                    <div className="price-tier">🏫 {lang === 'en' ? 'School / Counselor' : 'Escuela / Consejero'}</div>
                    <div className="price-amount">$149</div>
                    <div className="price-period">{lang === 'en' ? 'per classroom / year' : 'por salón / año'}</div>
                    <ul className="price-features">
                      <li>✓ {lang === 'en' ? 'Up to 25 students' : 'Hasta 25 estudiantes'}</li>
                      <li>✓ {lang === 'en' ? 'Classroom access code' : 'Código de acceso para la clase'}</li>
                      <li>✓ {lang === 'en' ? 'All 4 modes for every student' : 'Los 4 modos para cada estudiante'}</li>
                      <li>✓ {lang === 'en' ? 'Bilingual English + Spanish' : 'Bilingüe Inglés + Español'}</li>
                      <li>✓ {lang === 'en' ? 'School-wide license available' : 'Licencia escolar disponible'}</li>
                    </ul>
                    <a href="mailto:hello@goalgardenai.com?subject=School%20License%20Inquiry" className="price-btn price-btn-school">
                      {lang === 'en' ? 'Contact us →' : 'Contáctanos →'}
                    </a>
                  </div>

                </div>
                <p className="pricing-note">
                  {lang === 'en'
                    ? '💡 That\'s roughly 1 question per cent for Monthly subscribers.'
                    : '💡 Eso es aproximadamente 1 pregunta por centavo para suscriptores mensuales.'}
                </p>
              </div>
            </section>

            <footer className="footer">
              <p>© {new Date().getFullYear()} GoalGardenAI ·{' '}
                <a href="mailto:hello@goalgardenai.com">hello@goalgardenai.com</a>{' '}
                · Not a replacement for professional counseling.
              </p>
            </footer>
          </main>
        )}

        {/* ── CHAT ── */}
        {view === 'chat' && (
          <>
            {/* Mode bar */}
            <div className="chat-topbar">
              <div className="mode-pill">
                <span>{t.modes[mode].icon}</span>
                <span>{t.modes[mode].label}</span>
              </div>
              <button className="back-btn" onClick={resetChat}>← {t.changeMode}</button>
            </div>

            {/* Free counter */}
            {freeLeft > 0 && (
              <div className="free-bar">
                <div className="free-pips">
                  {Array.from({ length: FREE_LIMIT }).map((_, i) => (
                    <div key={i} className={`pip ${i < questionsUsed ? 'filled' : ''}`} />
                  ))}
                </div>
                <span>{t.freeLeft(freeLeft)}</span>
              </div>
            )}

            <div className={`chat-view ${isEssay ? 'essay-mode' : ''}`}>
              <div className="messages-wrap">

                {/* Empty state */}
                {messages.length === 0 && (
                  <div style={{ paddingBottom: 8 }}>
                    <p style={{ color: 'var(--ink-light)', fontSize: '0.83rem', marginBottom: 12, fontWeight: 600 }}>
                      {t.tryAsking}:
                    </p>
                    {t.starters[mode].map((p, i) => (
                      <button key={i} className="starter-chip"
                        style={{ marginBottom: 8, display: 'flex' }}
                        onClick={() => send(p)}>
                        {p}
                      </button>
                    ))}
                  </div>
                )}

                {/* Messages */}
                {messages.map((msg, i) => (
                  <div key={i} className={`msg ${msg.role}`}>
                    <div className="msg-avatar">{msg.role === 'assistant' ? '🌱' : '👤'}</div>
                    <div className="msg-bubble">
                      {msg.role === 'assistant' ? renderMd(msg.content) : msg.content}
                    </div>
                  </div>
                ))}

                {/* Streaming */}
                {streaming && (
                  <div className="msg assistant">
                    <div className="msg-avatar">🌱</div>
                    <div className="msg-bubble">
                      {renderMd(streaming)}
                      <span style={{ opacity: 0.35 }}>▋</span>
                    </div>
                  </div>
                )}

                {/* Typing */}
                {loading && !streaming && (
                  <div className="msg assistant">
                    <div className="msg-avatar">🌱</div>
                    <div className="msg-bubble">
                      <div className="typing-wrap">
                        <div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="input-area">
                <div className="input-row">
                  <textarea
                    ref={inputRef}
                    className="chat-input"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={onKey}
                    placeholder={isEssay ? t.essayPlaceholder : t.placeholder}
                    rows={isEssay ? 3 : 1}
                    onInput={e => {
                      if (!isEssay) {
                        e.target.style.height = 'auto';
                        e.target.style.height = Math.min(e.target.scrollHeight, 160) + 'px';
                      }
                    }}
                  />
                  <button
                    className="send-btn"
                    onClick={() => send()}
                    disabled={loading || !input.trim()}
                    aria-label="Send"
                  >↑</button>
                </div>
                <p className="input-note">{t.inputNote}</p>
              </div>
            </div>
          </>
        )}

        {/* ── PAYWALL ── */}
        {showPaywall && (
          <div className="overlay" onClick={e => { if (e.target === e.currentTarget) setShowPaywall(false); }}>
            <div className="paywall-card">
              <div className="paywall-icon">🌱</div>
              <h2>{t.paywallTitle}</h2>
              <p>{t.paywallSub}</p>

              <div className="plans">
                {/* Annual */}
                <a href={process.env.NEXT_PUBLIC_STRIPE_ANNUAL_LINK || '#'}
                  className="plan-option best" target="_blank" rel="noopener noreferrer">
                  <div className="plan-badge">{t.planBadge}</div>
                  <div className="plan-name">{t.planAnnual}</div>
                  <div className="plan-price">$39<span>/year</span></div>
                  <div className="plan-note">{t.planAnnualNote}</div>
                </a>

                {/* Monthly */}
                <a href={process.env.NEXT_PUBLIC_STRIPE_MONTHLY_LINK || '#'}
                  className="plan-option" target="_blank" rel="noopener noreferrer">
                  <div className="plan-name">{t.planMonthly}</div>
                  <div className="plan-price">$4.99<span>/month</span></div>
                  <div className="plan-note">{t.planMonthlyNote}</div>
                </a>
              </div>

              {/* School tier */}
              <div className="school-row">
                <div className="school-text">
                  <div className="plan-name">🏫 {t.schoolTier}</div>
                  <div className="plan-note">{t.schoolNote}</div>
                </div>
                <a href="mailto:hello@goalgardenai.com?subject=School%20License%20Inquiry"
                  className="contact-btn">{t.contactUs}</a>
              </div>

              <button className="dismiss-btn" onClick={() => setShowPaywall(false)}>
                {t.dismiss}
              </button>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
