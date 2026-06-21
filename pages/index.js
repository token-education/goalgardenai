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
      { icon: '🏆', title: 'Scholarship finder', desc: 'Tell us about yourself — we search live data to find scholarships you actually qualify for, with deadlines and links.' },
      { icon: '✍️', title: 'Essay coaching', desc: 'Get specific, encouraging feedback on college essays, scholarship essays, and personal statements.' },
      { icon: '🎤', title: 'Interview prep', desc: 'Practice interviews, write your first resume, and build real confidence.' },
      { icon: '🌎', title: 'English + Spanish', desc: 'Fully bilingual — switch languages anytime.' },
    ],
    modes: {
      career:    { label: 'Career Exploration', icon: '🌱', desc: 'Find careers that fit your future' },
      college:   { label: 'College Planning',   icon: '🎓', desc: 'Schools, scholarships, aid & applications' },
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
        'Help me find scholarships I actually qualify for — where do I start?',
        'What GPA and SAT do I need for UCLA?',
        'What scholarships exist for first-generation Latino students in Texas?',
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
      { icon: '🏆', title: 'Buscador de becas', desc: 'Cuéntanos sobre ti — buscamos en datos actuales para encontrar becas para las que realmente calificas, con fechas límite y enlaces.' },
      { icon: '✍️', title: 'Coach de ensayos', desc: 'Recibe retroalimentación específica y alentadora sobre ensayos universitarios y declaraciones personales.' },
      { icon: '🎤', title: 'Preparación para entrevistas', desc: 'Practica entrevistas, escribe tu primer currículum y construye confianza real.' },
      { icon: '🌎', title: 'Inglés + Español', desc: 'Completamente bilingüe — cambia de idioma en cualquier momento.' },
    ],
    modes: {
      career:    { label: 'Exploración de Carreras',      icon: '🌱', desc: 'Encuentra carreras para tu futuro' },
      college:   { label: 'Planificación Universitaria',  icon: '🎓', desc: 'Universidades, becas, ayuda y solicitudes' },
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
        'Ayúdame a encontrar becas para las que realmente califico — ¿por dónde empiezo?',
        '¿Qué GPA y SAT necesito para UCLA?',
        '¿Qué becas hay para estudiantes latinos de primera generación en Texas?',
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
        <title>goalgarden. — AI Career & College Guide for High School Students</title>
        <meta name="description" content="Free AI guidance for high school students on careers, college planning, essay feedback, and interview prep. Bilingual English & Spanish." />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2216%22 fill=%22%23E8453C%22/><text y=%22.82em%22 x=%2250%25%22 text-anchor=%22middle%22 font-size=%2272%22 font-family=%22system-ui%22 fill=%22white%22 font-weight=%22900%22>g</text></svg>" />
      </Head>

      <div className="app">

        {/* ── HEADER ── */}
        <header className="header">
          <div className="header-logo" onClick={resetChat}>
            <span className="logo-text">goalgarden<span>.</span></span>
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

            {/* ── PARTNERSHIP SECTION ── */}
            <section className="partnership-section">
              <div className="partnership-inner">
                <p className="section-label">{lang === 'en' ? 'Work with us' : 'Trabaja con nosotros'}</p>
                <h2>
                  {lang === 'en' ? 'Bring GoalGarden to your school or district.' : 'Lleva GoalGarden a tu escuela o distrito.'}
                </h2>
                <p>
                  {lang === 'en'
                    ? "We're partnering with schools, counselors, and districts who want to give every student access to real college and career guidance — in English and Spanish."
                    : 'Nos estamos asociando con escuelas, consejeros y distritos que quieren dar a cada estudiante acceso a orientación real sobre universidad y carreras — en inglés y español.'}
                </p>

                <div className="partnership-options">
                  <div className="partnership-option">
                    <div className="partnership-option-icon">🏫</div>
                    <div>
                      <h3>{lang === 'en' ? 'School & Counselor Access' : 'Acceso Escolar y de Consejero'}</h3>
                      <p>{lang === 'en' ? 'Classroom licenses for counselors and college advisors. Bilingual, no setup required.' : 'Licencias de aula para consejeros y asesores universitarios. Bilingüe, sin configuración.'}</p>
                    </div>
                  </div>
                  <div className="partnership-option">
                    <div className="partnership-option-icon">🌎</div>
                    <div>
                      <h3>{lang === 'en' ? 'District Partnerships' : 'Asociaciones con Distritos'}</h3>
                      <p>{lang === 'en' ? 'Custom rollouts for districts serving underrepresented students. Reach out to learn more.' : 'Implementaciones personalizadas para distritos que atienden estudiantes subrepresentados.'}</p>
                    </div>
                  </div>
                </div>

                <a
                  href={`mailto:hello@tokeneduc.com?subject=${encodeURIComponent(lang === 'en' ? 'GoalGarden Partnership Inquiry' : 'Consulta de Asociación con GoalGarden')}`}
                  className="partnership-cta"
                >
                  {lang === 'en' ? 'Get in touch →' : 'Contáctanos →'}
                </a>
                <p className="partnership-note">
                  {lang === 'en' ? 'We respond within 1 business day.' : 'Respondemos en 1 día hábil.'}
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
              <h2>{lang === 'en' ? 'You\'ve reached the free limit' : 'Alcanzaste el límite gratuito'}</h2>
              <p>
                {lang === 'en'
                  ? "Full access is coming soon. In the meantime, reach out — we'd love to bring GoalGarden to your school or program."
                  : 'El acceso completo llega pronto. Mientras tanto, contáctanos — nos encantaría llevar GoalGarden a tu escuela o programa.'}
              </p>
              <a
                href={`mailto:hello@tokeneduc.com?subject=${encodeURIComponent(lang === 'en' ? 'GoalGarden Access Request' : 'Solicitud de Acceso a GoalGarden')}`}
                className="paywall-contact-btn"
              >
                {lang === 'en' ? 'Get in touch →' : 'Contáctanos →'}
              </a>
              <button className="dismiss-btn" onClick={() => setShowPaywall(false)}>
                {lang === 'en' ? 'Not right now' : 'Ahora no'}
              </button>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
