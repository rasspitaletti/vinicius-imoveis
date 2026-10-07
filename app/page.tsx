'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  ArrowUpRight, Bath, BedDouble, Building2, CalendarCheck, Car, Check, ChevronDown, Compass,
  Handshake, KeyRound, MapPin, Menu, MessageCircle, Phone, Ruler, Search, ShieldCheck, Sparkles, X,
} from 'lucide-react'
import { InstagramIcon, WhatsAppIcon } from '@/components/brand-icons'

/* ───────────────────────── Contatos ───────────────────────── */
const PHONE = '5518981779979'
const PHONE_LABEL = '(18) 98177-9979'
const INSTAGRAM = 'https://www.instagram.com/viniciusribeiro_/'
const wa = (text = 'Olá, Vinicius! Vim pelo seu site e gostaria de falar com você.') =>
  `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`
const whatsapp = wa()
const maps = 'https://www.google.com/maps/search/?api=1&query=R.%20do%20Fico%2C%201104%20-%20Santana%2C%20Ara%C3%A7atuba%20-%20SP'

type Property = {
  title: string; location: string; price: string; mode: 'Venda' | 'Aluguel'; type: string
  beds: number; baths: number; parking: number; area: string; image: string; featured?: boolean
}

const properties: Property[] = [
  { title: 'Casa Ipê', location: 'Condomínio Habiana II · Araçatuba', price: 'R$ 1.280.000', mode: 'Venda', type: 'Casa', beds: 3, baths: 3, parking: 2, area: '248 m²', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=88', featured: true },
  { title: 'Apartamento Brise', location: 'Jardim Nova Yorque · Araçatuba', price: 'R$ 4.200/mês', mode: 'Aluguel', type: 'Apartamento', beds: 3, baths: 2, parking: 2, area: '112 m²', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=88' },
  { title: 'Residência Araucária', location: 'Delta Park · Araçatuba', price: 'R$ 2.450.000', mode: 'Venda', type: 'Alto padrão', beds: 4, baths: 5, parking: 4, area: '386 m²', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=88', featured: true },
  { title: 'Casa Jardim', location: 'Jardim Sumaré · Araçatuba', price: 'R$ 890.000', mode: 'Venda', type: 'Casa', beds: 3, baths: 2, parking: 2, area: '190 m²', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=88' },
  { title: 'Loft Lumière', location: 'Centro · Araçatuba', price: 'R$ 2.800/mês', mode: 'Aluguel', type: 'Apartamento', beds: 1, baths: 1, parking: 1, area: '68 m²', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=88' },
  { title: 'Solar das Palmeiras', location: 'Alphaville · Araçatuba', price: 'R$ 1.760.000', mode: 'Venda', type: 'Alto padrão', beds: 4, baths: 4, parking: 3, area: '310 m²', image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=88', featured: true },
  { title: 'Sobrado Vista Verde', location: 'Condomínio Villa Toscana · Araçatuba', price: 'R$ 1.090.000', mode: 'Venda', type: 'Sobrado', beds: 3, baths: 3, parking: 2, area: '215 m²', image: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=1200&q=88' },
  { title: 'Apartamento Orla', location: 'Jardim Paulista · Araçatuba', price: 'R$ 3.600/mês', mode: 'Aluguel', type: 'Apartamento', beds: 2, baths: 2, parking: 1, area: '92 m²', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=88' },
  { title: 'Casa Manacá', location: 'São José · Araçatuba', price: 'R$ 735.000', mode: 'Venda', type: 'Casa', beds: 3, baths: 2, parking: 2, area: '164 m²', image: 'https://images.unsplash.com/photo-1600585152915-d208bec867a1?auto=format&fit=crop&w=1200&q=88' },
  { title: 'Villa Siena', location: 'Condomínio Villa Rica · Araçatuba', price: 'R$ 1.980.000', mode: 'Venda', type: 'Sobrado', beds: 4, baths: 4, parking: 3, area: '295 m²', image: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=88' },
  { title: 'Residencial 27', location: 'Centro · Araçatuba', price: 'R$ 2.950/mês', mode: 'Aluguel', type: 'Apartamento', beds: 2, baths: 2, parking: 1, area: '78 m²', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=88' },
  { title: 'Casa Horizonte', location: 'Concórdia · Araçatuba', price: 'R$ 1.350.000', mode: 'Venda', type: 'Alto padrão', beds: 4, baths: 3, parking: 3, area: '270 m²', image: 'https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?auto=format&fit=crop&w=1200&q=88' },
]

const services = [
  ['01', 'Compra de imóveis', 'Curadoria precisa para encontrar o endereço que combina com o seu próximo capítulo.', Search],
  ['02', 'Venda de imóveis', 'Estratégia, posicionamento e cuidado para valorizar o seu patrimônio.', ArrowUpRight],
  ['03', 'Locação', 'Agilidade e segurança para conectar pessoas e imóveis com tranquilidade.', Building2],
  ['04', 'Avaliação e orientação', 'Análise clara para você tomar decisões seguras e bem informadas.', Compass],
  ['05', 'Consultoria imobiliária', 'Um olhar local e personalizado para cada movimento do seu patrimônio.', ShieldCheck],
] as const

const steps = [
  ['01', 'Conversa', 'Entendo o seu momento, o seu orçamento e o que realmente importa para você.', MessageCircle],
  ['02', 'Curadoria', 'Seleciono apenas os imóveis que fazem sentido — sem perder o seu tempo.', Sparkles],
  ['03', 'Visitas', 'Agendo e acompanho cada visita, com olhar técnico sobre cada detalhe.', CalendarCheck],
  ['04', 'Negociação', 'Conduzo a proposta e a documentação com transparência e segurança.', Handshake],
  ['05', 'Chaves na mão', 'Acompanho até a entrega das chaves — e continuo por perto depois.', KeyRound],
] as const

const interestText = (p: Property) =>
  `Olá, Vinicius! Tenho interesse no imóvel "${p.title}" (${p.type} · ${p.location} · ${p.price}). Pode me passar mais informações?`
const visitText = (p: Property) =>
  `Olá, Vinicius! Gostaria de agendar uma visita ao imóvel "${p.title}" (${p.location}). Quais horários você tem disponíveis?`

const ext = { target: '_blank', rel: 'noopener noreferrer' } as const

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mode, setMode] = useState<'Venda' | 'Aluguel'>('Venda')
  const [type, setType] = useState('Todos')
  const [location, setLocation] = useState('')
  const [bedrooms, setBedrooms] = useState('')
  const [filter, setFilter] = useState('Todos')
  const [selected, setSelected] = useState<Property | null>(null)

  const visibleProperties = useMemo(() => properties.filter((property) => {
    const matchesMode = property.mode === mode
    const matchesType = type === 'Todos' || property.type === type
    const matchesFilter = filter === 'Todos' || property.type === filter
    const matchesLocation = !location || property.location.toLowerCase().includes(location.toLowerCase())
    const matchesBeds = !bedrooms || property.beds >= Number(bedrooms)
    return matchesMode && matchesType && matchesFilter && matchesLocation && matchesBeds
  }), [mode, type, filter, location, bedrooms])

  /* Header muda de estilo ao rolar */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Animações de entrada no scroll */
  useEffect(() => {
    document.documentElement.classList.add('reveal-ready')
    const items = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)')
    if (!('IntersectionObserver' in window)) { items.forEach((el) => el.classList.add('is-in')); return }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-in'); observer.unobserve(entry.target) }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
    items.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [visibleProperties])

  /* Trava o scroll com menu/modal aberto + fecha com Esc */
  useEffect(() => {
    document.body.style.overflow = menuOpen || selected ? 'hidden' : ''
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setSelected(null); setMenuOpen(false) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen, selected])

  const closeMenu = () => setMenuOpen(false)

  return <main className="site-shell">
    {/* ───────── Header ───────── */}
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'menu-is-open' : ''}`}>
      <a href="#inicio" className="brand" onClick={closeMenu}><span>VR</span><div>Vinicius Ribeiro<small>Corretor de imóveis</small></div></a>
      <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Navegação principal">
        <a href="#imoveis" onClick={closeMenu}>Imóveis</a>
        <a href="#sobre" onClick={closeMenu}>Sobre mim</a>
        <a href="#servicos" onClick={closeMenu}>Serviços</a>
        <a href="#processo" onClick={closeMenu}>Como funciona</a>
        <a href="#contato" onClick={closeMenu}>Contato</a>
        <div className="mobile-nav-actions">
          <a href={whatsapp} {...ext} className="button button-light" onClick={closeMenu}><WhatsAppIcon /> Falar com o corretor</a>
          <a href={INSTAGRAM} {...ext} className="button button-outline-light" onClick={closeMenu}><InstagramIcon /> @viniciusribeiro_</a>
        </div>
      </nav>
      <div className="header-actions">
        <a href={INSTAGRAM} {...ext} className="icon-link" aria-label="Instagram de Vinicius Ribeiro"><InstagramIcon /></a>
        <a href={wa('Olá, Vinicius! Gostaria de agendar uma visita a um imóvel.')} {...ext} className="header-contact">Agendar visita <ArrowUpRight /></a>
      </div>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}>{menuOpen ? <X /> : <Menu />}</button>
    </header>

    {/* ───────── Hero ───────── */}
    <section id="inicio" className="hero">
      <img className="hero-image" src="/hero-vinicius.jpg" alt="Residência contemporânea em concreto, iluminada ao entardecer" fetchPriority="high" />
      <div className="hero-overlay" />
      <div className="hero-content">
        <p className="eyebrow light hero-anim" style={{ '--d': '0.1s' } as React.CSSProperties}><span /> Araçatuba e região</p>
        <h1 className="hero-anim" style={{ '--d': '0.25s' } as React.CSSProperties}>O imóvel certo<br /><em>para o seu</em><br />próximo capítulo.</h1>
        <p className="hero-lede hero-anim" style={{ '--d': '0.45s' } as React.CSSProperties}>Uma curadoria de espaços para viver bem, investir com segurança e construir novas histórias.</p>
        <div className="hero-actions hero-anim" style={{ '--d': '0.6s' } as React.CSSProperties}>
          <a href={whatsapp} {...ext} className="button button-light"><WhatsAppIcon /> Falar com o corretor</a>
          <a href="#imoveis" className="text-link light">Explorar imóveis <span aria-hidden>↓</span></a>
        </div>
      </div>
      <div className="hero-meta"><span>CRECI/SP 307447-F</span><a href={INSTAGRAM} {...ext}>@viniciusribeiro_</a><span>01 — 05</span></div>
      <a className="scroll-cue" href="#sobre"><span>Role para explorar</span><span className="scroll-line" /></a>
    </section>

    {/* ───────── Busca ───────── */}
    <section className="search-panel-wrap">
      <div className="search-panel" data-reveal>
        <div className="search-top">
          <div><p className="eyebrow"><span /> Encontre seu próximo endereço</p><h2>Qual é o seu próximo <em>movimento?</em></h2></div>
          <div className="segmented" role="tablist" aria-label="Modalidade">
            <span className="segmented-indicator" style={{ transform: mode === 'Venda' ? 'translateX(0)' : 'translateX(100%)' }} />
            <button role="tab" aria-selected={mode === 'Venda'} className={mode === 'Venda' ? 'active' : ''} onClick={() => setMode('Venda')}>Comprar</button>
            <button role="tab" aria-selected={mode === 'Aluguel'} className={mode === 'Aluguel' ? 'active' : ''} onClick={() => setMode('Aluguel')}>Alugar</button>
          </div>
        </div>
        <div className="search-fields">
          <label>Tipo de imóvel<select value={type} onChange={(event) => setType(event.target.value)}><option>Todos</option><option>Casa</option><option>Apartamento</option><option>Sobrado</option><option>Alto padrão</option></select><ChevronDown /></label>
          <label>Localização<input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Bairro ou região" /></label>
          <label>Quartos<select value={bedrooms} onChange={(event) => setBedrooms(event.target.value)}><option value="">Qualquer</option><option value="1">1+ quarto</option><option value="2">2+ quartos</option><option value="3">3+ quartos</option><option value="4">4+ quartos</option></select><ChevronDown /></label>
          <a href="#imoveis" className="button button-light"><Search /> Buscar imóveis</a>
        </div>
      </div>
    </section>

    {/* ───────── Sobre ───────── */}
    <section id="sobre" className="intro section-pad">
      <div className="section-label" data-reveal>01 / Sobre</div>
      <div className="intro-copy" data-reveal>
        <h2>Mais do que encontrar um imóvel, <em>encontramos o seu lugar.</em></h2>
        <p>Sou Vinicius Ribeiro, corretor de imóveis em Araçatuba. Meu trabalho é entender o que você procura antes de mostrar qualquer endereço, com atendimento personalizado, conhecimento local e transparência em cada etapa.</p>
        <ul className="intro-points">
          <li><Check /> Atendimento personalizado</li>
          <li><Check /> Conhecimento local</li>
          <li><Check /> Segurança em cada etapa</li>
        </ul>
        <p className="signature">Vinicius Ribeiro<br /><small>Corretor de Imóveis · CRECI/SP 307447-F</small></p>
        <div className="intro-actions">
          <a href={whatsapp} {...ext} className="button button-light"><WhatsAppIcon /> Falar com o corretor</a>
          <a href={INSTAGRAM} {...ext} className="text-link"><InstagramIcon /> Acompanhe no Instagram</a>
        </div>
      </div>
      <figure className="intro-figure" data-reveal style={{ '--d': '0.15s' } as React.CSSProperties}>
        <div className="portrait-frame">
          <div className="intro-portrait"><img className="intro-portrait-img" src="/vinicius-ribeiro.jpg" alt="Vinicius Ribeiro, corretor de imóveis" width={452} height={452} /></div>
        </div>
        <figcaption>Vinicius Ribeiro<small>Corretor de Imóveis · CRECI/SP 307447-F</small></figcaption>
      </figure>
    </section>

    {/* ───────── Destaques ───────── */}
    <section id="destaques" className="featured section-pad">
      <div className="section-heading" data-reveal>
        <div><p className="eyebrow"><span /> Curadoria especial</p><h2>Imóveis em <em>destaque.</em></h2></div>
        <p className="section-note">Endereços selecionados para quem busca algo verdadeiramente especial.</p>
      </div>
      <div className="featured-grid">
        {properties.filter((property) => property.featured).map((property, index) => <article className="featured-card" key={property.title} data-reveal style={{ '--d': `${index * 0.12}s` } as React.CSSProperties}>
          <button type="button" className="featured-image" onClick={() => setSelected(property)} aria-label={`Ver detalhes de ${property.title}`}>
            <img src={property.image} alt={property.title} loading="lazy" />
            <span className="badge">{index === 0 ? 'Destaque' : 'Novo'}</span>
            <span className="image-hover">Ver detalhes <ArrowUpRight /></span>
          </button>
          <div className="featured-info">
            <div><p className="eyebrow"><span /> {property.mode} · {property.type}</p><h3>{property.title}</h3><p className="location"><MapPin /> {property.location}</p></div>
            <div className="featured-side"><strong className="price">{property.price}</strong><a href={wa(interestText(property))} {...ext} className="interest-link"><WhatsAppIcon /> Tenho interesse</a></div>
          </div>
        </article>)}
      </div>
    </section>

    {/* ───────── Serviços ───────── */}
    <section id="servicos" className="services section-pad dark-section">
      <div className="section-heading centered" data-reveal>
        <p className="eyebrow light"><span /> Como posso ajudar <span /></p>
        <h2>Escolhas importantes <em>merecem atenção.</em></h2>
        <p className="section-note">Da primeira conversa às chaves na mão, você conta com uma parceria de verdade.</p>
      </div>
      <div className="service-grid">
        {services.map(([number, title, text, Icon], index) => <article className="service-card" key={number} data-reveal style={{ '--d': `${index * 0.08}s` } as React.CSSProperties}>
          <span className="service-number">{number}</span>
          <span className="service-icon"><Icon /></span>
          <h3>{title}</h3>
          <p>{text}</p>
          <a href={wa(`Olá, Vinicius! Gostaria de saber mais sobre: ${title}.`)} {...ext} className="service-link">Mais informações <ArrowUpRight /></a>
        </article>)}
      </div>
    </section>

    {/* ───────── Imóveis ───────── */}
    <section id="imoveis" className="properties section-pad">
      <div className="section-heading" data-reveal>
        <div><p className="eyebrow"><span /> Portfólio atualizado</p><h2>Espaços para chamar <em>de seu.</em></h2></div>
        <a href={wa('Olá, Vinicius! Tenho um imóvel em mente e gostaria da sua ajuda para encontrá-lo.')} {...ext} className="text-link">Tenho um imóvel em mente <ArrowUpRight /></a>
      </div>
      <div className="filter-bar" data-reveal>
        <div className="filter-row" role="group" aria-label="Filtrar imóveis">
          {['Todos', 'Casa', 'Apartamento', 'Sobrado', 'Alto padrão'].map((item) => <button key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>{item}</button>)}
        </div>
        <div className="segmented small" role="tablist" aria-label="Modalidade">
          <span className="segmented-indicator" style={{ transform: mode === 'Venda' ? 'translateX(0)' : 'translateX(100%)' }} />
          <button role="tab" aria-selected={mode === 'Venda'} className={mode === 'Venda' ? 'active' : ''} onClick={() => setMode('Venda')}>Comprar</button>
          <button role="tab" aria-selected={mode === 'Aluguel'} className={mode === 'Aluguel' ? 'active' : ''} onClick={() => setMode('Aluguel')}>Alugar</button>
        </div>
      </div>
      <p className="result-count">{visibleProperties.length} {visibleProperties.length === 1 ? 'imóvel disponível' : 'imóveis disponíveis'} para {mode.toLowerCase()}</p>
      {visibleProperties.length === 0 && <div className="empty-state">
        <p>Nenhum imóvel com esses filtros no momento — mas o portfólio muda toda semana.</p>
        <a href={wa('Olá, Vinicius! Não encontrei no site o imóvel que procuro. Pode me ajudar?')} {...ext} className="button button-light"><WhatsAppIcon /> Me conte o que procura</a>
      </div>}
      <div className="property-grid" key={`${mode}-${filter}-${type}-${bedrooms}`}>
        {visibleProperties.map((property, index) => <article className="property-card" key={property.title} data-reveal style={{ '--d': `${(index % 3) * 0.08}s` } as React.CSSProperties}>
          <button type="button" className="property-image" onClick={() => setSelected(property)} aria-label={`Ver detalhes de ${property.title}`}>
            <img src={property.image} alt={property.title} loading="lazy" />
            <span className="property-type">{property.mode} · {property.type}</span>
            <span className="image-hover">Ver detalhes <ArrowUpRight /></span>
          </button>
          <div className="property-body">
            <strong className="price">{property.price}</strong>
            <h3>{property.title}</h3>
            <p className="location"><MapPin /> {property.location}</p>
            <div className="property-details">
              <span><Ruler /> {property.area}</span>
              <span><BedDouble /> {property.beds} {property.beds === 1 ? 'quarto' : 'quartos'}</span>
              <span><Bath /> {property.baths} {property.baths === 1 ? 'banheiro' : 'banheiros'}</span>
              <span><Car /> {property.parking} {property.parking === 1 ? 'vaga' : 'vagas'}</span>
            </div>
            <div className="property-actions">
              <a href={wa(interestText(property))} {...ext} className="button button-light"><WhatsAppIcon /> Tenho interesse</a>
              <button type="button" className="button button-ghost" onClick={() => setSelected(property)}>Ver detalhes</button>
            </div>
          </div>
        </article>)}
      </div>
    </section>

    {/* ───────── Como funciona ───────── */}
    <section id="processo" className="process section-pad dark-section">
      <div className="section-heading centered" data-reveal>
        <p className="eyebrow light"><span /> Como funciona <span /></p>
        <h2>Uma jornada simples até <em>o seu novo endereço.</em></h2>
      </div>
      <ol className="process-grid">
        {steps.map(([number, title, text, Icon], index) => <li className="process-step" key={number} data-reveal style={{ '--d': `${index * 0.1}s` } as React.CSSProperties}>
          <span className="process-icon"><Icon /></span>
          <span className="process-number">{number}.</span>
          <h3>{title}</h3>
          <p>{text}</p>
        </li>)}
      </ol>
      <div className="process-cta" data-reveal>
        <a href={wa('Olá, Vinicius! Gostaria de agendar uma conversa para começar a busca pelo meu imóvel.')} {...ext} className="button button-outline-light"><CalendarCheck /> Agendar uma conversa</a>
      </div>
    </section>

    {/* ───────── Manifesto ───────── */}
    <section className="manifesto">
      <div className="manifesto-top" data-reveal><span>Por que Vinicius</span><span>02 / 05</span></div>
      <h2 data-reveal>Negócios claros.<br /><em>Relações duradouras.</em></h2>
      <div className="manifesto-bottom" data-reveal>
        <p>A experiência de comprar, vender ou alugar pode ser diferente. Mais humana, mais atenta e com o cuidado que o seu patrimônio merece.</p>
        <div className="benefits"><span><Check /> Atendimento personalizado</span><span><Check /> Conhecimento local</span><span><Check /> Segurança em cada etapa</span></div>
      </div>
    </section>

    {/* ───────── Contato ───────── */}
    <section id="contato" className="contact dark-section">
      <div className="contact-inner" data-reveal>
        <p className="eyebrow light"><span /> Vamos conversar</p>
        <h2>Seu próximo endereço <em>começa aqui.</em></h2>
        <p className="contact-lede">Me conte o que você procura. Respondo pessoalmente pelo WhatsApp e preparo uma seleção sob medida para você.</p>
        <div className="contact-actions">
          <a className="button button-light" href={whatsapp} {...ext}><WhatsAppIcon /> Falar pelo WhatsApp</a>
          <a className="button button-outline-light" href={`tel:+${PHONE}`}><Phone /> Ligar</a>
          <a className="button button-outline-light" href={INSTAGRAM} {...ext}><InstagramIcon /> Ver Instagram</a>
        </div>
      </div>
      <div className="contact-aside" data-reveal style={{ '--d': '0.15s' } as React.CSSProperties}>
        <div><span>WhatsApp</span><p><a href={whatsapp} {...ext}>{PHONE_LABEL}</a></p></div>
        <div><span>Instagram</span><p><a href={INSTAGRAM} {...ext}>@viniciusribeiro_</a></p></div>
        <div><span>Atendimento</span><p>Segunda a sexta<br />08h às 18h</p></div>
        <div><span>Escritório</span><p>R. do Fico, 1104 — Santana<br />Araçatuba — SP, 16010-700</p></div>
        <a className="text-link light" href={maps} {...ext}>Como chegar <ArrowUpRight /></a>
      </div>
    </section>

    {/* ───────── Mapa ───────── */}
    <section className="map-section section-pad">
      <div className="map-copy" data-reveal>
        <p className="eyebrow"><span /> Onde me encontrar</p>
        <h2>Porta aberta para <em>novas histórias.</em></h2>
        <p>R. do Fico, 1104 — Santana<br />Araçatuba — SP, 16010-700</p>
        <div className="map-actions">
          <a className="button button-light" href={maps} {...ext}><Compass /> Ver rota</a>
          <a className="text-link" href={wa('Olá, Vinicius! Gostaria de agendar um horário no seu escritório.')} {...ext}><WhatsAppIcon /> Agendar horário</a>
        </div>
      </div>
      <div className="map-frame" data-reveal style={{ '--d': '0.15s' } as React.CSSProperties}><iframe title="Localização do escritório Vinicius Ribeiro" src="https://www.google.com/maps?q=R.%20do%20Fico%2C%201104%20-%20Santana%2C%20Ara%C3%A7atuba%20-%20SP&output=embed" loading="lazy" /></div>
    </section>

    {/* ───────── CTA final ───────── */}
    <section className="final-cta">
      <div data-reveal>
        <p className="eyebrow light"><span /> Pronto para o próximo passo? <span /></p>
        <h2>Vamos encontrar <em>o seu lugar.</em></h2>
        <a href={wa('Olá, Vinicius! Quero começar a procurar meu próximo imóvel.')} {...ext} className="button button-light"><WhatsAppIcon /> Falar com o corretor</a>
      </div>
    </section>

    {/* ───────── Footer ───────── */}
    <footer className="footer">
      <div className="footer-brand">
        <a href="#inicio" className="brand"><span>VR</span><div>Vinicius Ribeiro<small>Corretor de imóveis</small></div></a>
        <p>CRECI/SP 307447-F<br />Araçatuba, São Paulo</p>
        <div className="footer-social">
          <a href={INSTAGRAM} {...ext} aria-label="Instagram"><InstagramIcon /></a>
          <a href={whatsapp} {...ext} aria-label="WhatsApp"><WhatsAppIcon /></a>
          <a href={`tel:+${PHONE}`} aria-label="Telefone"><Phone /></a>
        </div>
      </div>
      <div className="footer-links">
        <div><span>Explore</span><a href="#imoveis">Imóveis</a><a href="#destaques">Destaques</a><a href="#sobre">Sobre mim</a><a href="#servicos">Serviços</a><a href="#processo">Como funciona</a></div>
        <div><span>Conecte-se</span><a href={whatsapp} {...ext}>WhatsApp</a><a href={INSTAGRAM} {...ext}>Instagram</a><a href={`tel:+${PHONE}`}>{PHONE_LABEL}</a></div>
      </div>
      <div className="footer-end"><a href="#inicio" className="back-top">Voltar ao topo ↑</a>© 2026 Vinicius Ribeiro<br />Feito para encontrar o seu lugar.</div>
    </footer>

    <a className="floating-whatsapp" href={whatsapp} {...ext} aria-label="Falar com Vinicius pelo WhatsApp"><WhatsAppIcon /><span className="floating-label">Fale comigo no WhatsApp</span></a>

    {/* ───────── Modal de detalhes ───────── */}
    {selected && <div className="modal" role="dialog" aria-modal="true" aria-label={selected.title} onClick={() => setSelected(null)}>
      <div className="modal-card" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={() => setSelected(null)} aria-label="Fechar detalhes"><X /></button>
        <div className="modal-image"><img src={selected.image} alt={selected.title} /><span className="property-type">{selected.mode} · {selected.type}</span></div>
        <div className="modal-body">
          <p className="eyebrow"><span /> {selected.location}</p>
          <h3>{selected.title}</h3>
          <strong className="price">{selected.price}</strong>
          <div className="modal-specs">
            <div><Ruler /><strong>{selected.area}</strong><span>Área</span></div>
            <div><BedDouble /><strong>{selected.beds}</strong><span>{selected.beds === 1 ? 'Quarto' : 'Quartos'}</span></div>
            <div><Bath /><strong>{selected.baths}</strong><span>{selected.baths === 1 ? 'Banheiro' : 'Banheiros'}</span></div>
            <div><Car /><strong>{selected.parking}</strong><span>{selected.parking === 1 ? 'Vaga' : 'Vagas'}</span></div>
          </div>
          <p className="modal-text">Quer conhecer pessoalmente, receber mais fotos ou entender as condições? Fale comigo pelo WhatsApp — respondo pessoalmente.</p>
          <div className="modal-actions">
            <a href={wa(interestText(selected))} {...ext} className="button button-light"><WhatsAppIcon /> Tenho interesse</a>
            <a href={wa(visitText(selected))} {...ext} className="button button-outline-light"><CalendarCheck /> Agendar visita</a>
          </div>
        </div>
      </div>
    </div>}
  </main>
}
