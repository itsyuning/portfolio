import { useEffect, useLayoutEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const works = [
  {
    no: '01', chapter: 'OBSERVE', title: 'A Bored Game', year: '2025',
    course: 'Exhibition: Science to Experience', tone: 'coral',
    image: '/assets/photos/bored-participant.webp', alt: 'A visitor participating in A Bored Game',
    second: '/assets/photos/bored-installation.webp',
    text: 'Built for a public exhibition, A Bored Game asks visitors to turn pegs while a positive or negative inner monologue plays through headphones. Every minute they choose a coloured ball for what they felt and add it to a shared hourglass. Our tests found boredom often arrived after three or four minutes, but never in quite the same emotional form.',
    credit: 'TEAM OF 3 / MY ROLE: COMMUNICATION & PLANNING',
    tags: ['PARTICIPATORY INSTALLATION', 'EXHIBITION', 'EMOTION'], links: [],
  },
  {
    no: '02', chapter: 'OBSERVE', title: 'Too Cute to Kill', year: '2026',
    course: 'Video Games for Research', tone: 'violet',
    image: '/assets/photos/too-cute-threatening.webp', alt: 'Threatening character condition in Too Cute to Kill',
    second: '/assets/photos/too-cute-character.webp',
    text: 'We removed story, dialogue, movement and threat from a shooting task to see what character design alone would do. Thirty-six participants chose five targets from cute, neutral and threatening characters. Threatening figures were killed most often; cute ones were remembered and deliberately avoided, revealing a gap between what players did and how they recalled the choice.',
    credit: 'TEAM OF 6',
    tags: ['GAME RESEARCH', 'BEHAVIOURAL STUDY', 'CHARACTER DESIGN'], links: [['READ PAPER', '/assets/too-cute-to-kill.pdf']],
  },
  {
    no: '03', chapter: 'LISTEN', title: 'Seeing Sound', year: '2026',
    course: 'AI & Art', tone: 'blue',
    image: '/assets/seeing-sound-figure.webp', alt: 'Generated image, waveform and spectrogram from Seeing Sound',
    text: 'Each lyric line from Lou Reed’s Perfect Day becomes a short scene. We paired eleven field recordings with diffusion-generated images, embedded those images into log-mel spectrograms, then turned them back into sound. The distortions are not hidden: they expose the practical tradeoff between an image that reads clearly and audio that still sounds like its original place.',
    credit: 'TEAM OF 3',
    tags: ['FIELD RECORDING', 'DIFFUSION', 'SOUND'], links: [['ENTER WEBSITE', 'https://aimc2026-demo-anonymous.netlify.app/'], ['READ PAPER', '/assets/seeing-sound-paper.pdf']],
  },
  {
    no: '04', chapter: 'LISTEN', title: 'The Grumpy Bear', year: '2025',
    course: 'Sound, Space and Interaction', tone: 'amber',
    image: '/assets/photos/grumpy-bear.webp', alt: 'The Grumpy Bear interactive sonic prototype',
    second: '/assets/photos/grumpy-bear-front.webp',
    text: 'The bear purrs when petted, starts breathing as someone approaches, and becomes alarmed when personal space or pressure thresholds are crossed. An FSR in its head and an ultrasonic sensor in its eyes feed Arduino data into Pure Data. Much of the work was tuning and debugging those thresholds until the sounds felt like one moody character rather than disconnected effects.',
    credit: 'TEAM OF 2',
    tags: ['SONIC INTERACTION', 'ULTRASONIC SENSING', 'PROTOTYPE'], links: [],
  },
  {
    no: '05', chapter: 'TOUCH', title: 'In Bloom', year: '2025',
    course: 'Hardware & Physical Computing', tone: 'green',
    image: '/assets/photos/in-bloom-installation.webp', alt: 'Responsive paper flowers in the In Bloom installation',
    second: '/assets/photos/in-bloom-presentation.webp',
    text: 'Three handmade wire flowers open when two people complete a human circuit and close when contact breaks. Arduino and servo motors make the connection visible, while prolonged separation makes the flowers wither. The resistance readings changed with the environment, so we had to recalibrate the installation often; its technical instability ended up echoing the fragile relationship it represents.',
    credit: 'TEAM OF 4',
    tags: ['ARDUINO', 'SERVO MOTORS', 'HUMAN CIRCUIT'], links: [],
  },
  {
    no: '06', chapter: 'TOUCH', title: 'Blushy', year: '2025',
    course: 'Artificial Creatures', tone: 'pink',
    image: '/assets/photos/blushy-object.webp', alt: 'Blushy, a suspended responsive cloud creature',
    second: '/assets/photos/blushy-encounter.webp',
    text: 'Blushy hangs still until someone comes close. After five seconds of sustained attention, lights in its cheeks build into an awkward, flickering blush; a pressure-sensitive handshake that becomes too firm produces a low, sad whine. The creature has no instructions and no task, so embarrassment is communicated through presence rather than explanation.',
    credit: 'TEAM OF 2',
    tags: ['PRESSURE SENSOR', 'INSTALLATION', 'EMOTION'], links: [['PROJECT ARCHIVE', 'https://sites.google.com/view/artificialcreatures2025/portfolios/yuning-yao/blushy']],
  },
  {
    no: '07', chapter: 'TOUCH', title: 'Graffiti Studio', year: '2024',
    course: 'Creative Programming', tone: 'acid',
    image: '/assets/graffiti.webp', alt: 'Graffiti Studio creative tool output',
    text: 'Graffiti Studio recreates spray painting in a browser through a particle system, switchable urban surfaces and a spray sound that follows the gesture. I spent most of the work balancing random dispersion with enough control to draw without lag. I deliberately left out layers and kept undo and screenshot tools, choosing a simple sketchbook over a miniature image editor.',
    credit: 'INDIVIDUAL PROJECT',
    tags: ['P5.JS', 'WEB AUDIO', 'CREATIVE TOOL'], links: [['TRY THE SKETCH', 'https://editor.p5js.org/404sandheartbreaks/sketches/wOBTUT6kj']],
  },
  {
    no: '08', chapter: 'NEGOTIATE', title: 'Zen Studio', year: '2025',
    course: 'Computational Creativity', tone: 'lavender',
    image: '/assets/photos/zen-studio-output.webp', alt: 'Mandala created with Zen Studio',
    second: '/assets/photos/bitwise-process.webp',
    text: 'Zen Studio begins with a hand-drawn stroke and repeats it through radial symmetry. Four companions, Koi, Lotus, Bamboo and Wind, learn local tendencies from the user’s drawing and offer different continuations that can be accepted or rejected. The finished mandala becomes pin-and-thread instructions; in tests with eight participants, the strongest result was a continued sense of human control.',
    credit: 'TEAM OF 3',
    tags: ['CO-CREATION', 'STRING ART', 'ALGORITHMS'], links: [['TRY ZEN STUDIO', 'https://zenartstudio.netlify.app/']],
    siblings: [['Bad Poets Society', '/assets/bad-poets-logbook.pdf'], ['Bitwise Bakeoff', '/assets/bitwise-bakeoff-report.pdf']],
  },
  {
    no: '09', chapter: 'NEGOTIATE', title: 'Learning Football', year: '2024',
    course: 'HCI & Information Visualisation', tone: 'pitch',
    image: '/assets/learning-football-formations.webp', alt: 'Interactive football formations interface',
    text: 'Designed for people who find football intimidating, the site turns a virtual library into a route through formations, field simulations, definitions and small games. We used a book-like story to keep separate visualisations connected, and learned Three.js while building the 3D spaces. A second evaluation with seven people produced more mixed and useful feedback than the first.',
    credit: 'TEAM OF 2',
    tags: ['THREE.JS', 'INFORMATION VISUALISATION', 'EDUCATION'], links: [['ENTER WEBSITE', 'https://hciiv-project.vercel.app/'], ['READ PAPER', '/assets/learning-football-paper.pdf']],
    contain: true,
  },
]

const papers = [
  ['2026', 'Seeing Sound', 'Audiovisual AI · mediated musicianship', 'Field recordings, diffusion-generated images and playable spectrograms become a compositional workflow of interpretation, prompting and curation.', [['Website', 'https://aimc2026-demo-anonymous.netlify.app/'], ['Paper', '/assets/seeing-sound-paper.pdf']], '/assets/seeing-sound-figure.webp'],
  ['2026', 'Too Cute to Kill', 'Game research · behavioural study', 'A study with 36 participants measuring how character cuteness influences aggression in a non-hostile first-person shooting task.', [['Paper', '/assets/too-cute-to-kill.pdf']], '/assets/photos/too-cute-character.webp'],
  ['2026', 'From Care to Surveillance', 'Data justice · public policy', 'An examination of Amsterdam’s Top600 programme and how information gathered for care can be repurposed for enforcement.', [['Paper', '/assets/from-care-to-surveillance.pdf']]],
  ['2025', 'Does AI Perceive Optical Illusions Like Humans Do?', 'Human and machine perception · group poster', 'Eight people and four AI models evaluated five optical illusions, revealing different relationships to intuition and false guidance.', [['Poster', '/assets/non-human-cognition-optical-illusions-poster.pdf']], '/assets/non-human-cognition-optical-illusions-poster.webp', true],
  ['2025', 'The Rise of Distinctively Ugly Luxury', '7-Papers · fashion aesthetics', 'Why do awkward, oversized or deliberately ugly luxury objects become desirable?', [['Paper', '/assets/7-papers-ugly-luxury.pdf']]],
  ['2025', 'Dreamscape', 'Artistic strategy · dreams', 'An artistic strategy built from the fluid logic and symbolic structure of dream consciousness.', []],
  ['2025', 'Can Dogs Infer Human Moral Judgments?', 'Animal cognition · proposal', 'A proposed study asking whether domestic dogs distinguish helpful from unhelpful human actors.', []],
  ['2024', 'Learning Football through Interactive Storytelling', 'HCI · information visualisation', 'A book-like environment using visualisations and mini-games to make football concepts approachable.', [['Website', 'https://hciiv-project.vercel.app/'], ['Paper', '/assets/learning-football-paper.pdf']], '/assets/learning-football-formations.webp'],
]

const liveWorks = [
  ['01', 'Research Interface', 'Thesis study', 'https://xaiui.vercel.app'],
  ['02', 'Seeing Sound', 'Interactive audiovisual work', 'https://aimc2026-demo-anonymous.netlify.app/'],
  ['03', 'Zen Studio', 'Co-creative drawing', 'https://zenartstudio.netlify.app/'],
  ['04', 'Learning Football', 'Interactive story world', 'https://hciiv-project.vercel.app/'],
  ['05', 'Graffiti Studio', 'p5.js creative tool', 'https://editor.p5js.org/404sandheartbreaks/sketches/wOBTUT6kj'],
  ['06', 'Artificial Creatures', 'Three creature studies', 'https://sites.google.com/view/artificialcreatures2025/portfolios/yuning-yao'],
]

function LinkPills({ links }) {
  if (!links?.length) return <span className="no-link">DOCUMENTATION ON REQUEST</span>
  return <div className="link-pills">{links.map(([label, href]) => <a href={href} target="_blank" rel="noreferrer" key={label}>{label}<i>↗</i></a>)}</div>
}

function WorkFrame({ work }) {
  return (
    <article className={`work-frame tone-${work.tone}`}>
      <div className="work-chrome"><span>{work.chapter} / {work.no}</span><span>{work.year}</span></div>
      <div className="work-media" data-image-reveal>
        <img className={work.contain ? 'contain' : ''} src={work.image} alt={work.alt} />
        {work.second && <img className="work-insert" src={work.second} alt="" />}
        <span className="scan-line" aria-hidden="true" />
      </div>
      <div className="work-copy">
        <p className="work-course">{work.course}</p>
        <h3>{work.title}</h3>
        <p className="work-description">{work.text}</p>
        <p className="work-credit">{work.credit}</p>
        <div className="work-tags">{work.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        {work.siblings && <div className="course-siblings"><small>OTHER WORKS FROM THE SAME COURSE</small>{work.siblings.map(([label, href]) => <a href={href} target="_blank" rel="noreferrer" key={label}>{label} ↗</a>)}</div>}
        <LinkPills links={work.links} />
      </div>
    </article>
  )
}

function App() {
  const rootRef = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return undefined
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true, wheelMultiplier: 0.88, anchors: true })
    const raf = time => lenis.raf(time * 1000)
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => { gsap.ticker.remove(raf); lenis.destroy() }
  }, [])

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return undefined
    const mm = gsap.matchMedia()
    const context = gsap.context(() => {
      gsap.from('.hero-title span', { yPercent: 115, opacity: 0, duration: 1.15, stagger: 0.12, ease: 'power4.out' })
      gsap.from('.hero-leader, .hero-filmmarks, .hero-practice', { y: 28, opacity: 0, duration: 1.05, stagger: 0.1, delay: 0.18, ease: 'power4.out' })
      gsap.from('.hero-intro > *', { y: 24, opacity: 0, duration: 0.9, stagger: 0.08, delay: 0.55, ease: 'power3.out' })

      gsap.utils.toArray('[data-reveal]').forEach(element => {
        gsap.from(element, { y: 42, opacity: 0, duration: 0.95, ease: 'power4.out', scrollTrigger: { trigger: element, start: 'top 84%', once: true } })
      })

      gsap.utils.toArray('[data-image-reveal]').forEach(frame => {
        const images = frame.querySelectorAll('img')
        gsap.fromTo(frame, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.05, ease: 'power4.out', scrollTrigger: { trigger: frame, start: 'top 83%', once: true } })
        gsap.from(images, { scale: 1.06, duration: 1.2, ease: 'power4.out', scrollTrigger: { trigger: frame, start: 'top 83%', once: true } })
      })

      gsap.to('.thesis-progress i', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.thesis-scene', start: 'top 70%', end: 'bottom 35%', scrub: 1 } })
      gsap.to('.about-eye img', { yPercent: -7, ease: 'none', scrollTrigger: { trigger: '.about-eye', start: 'top bottom', end: 'bottom top', scrub: 1.1 } })

      mm.add('(min-width: 901px)', () => {
        const gallery = rootRef.current.querySelector('.reel-section')
        const track = rootRef.current.querySelector('.reel-track')
        const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth + window.innerWidth * 0.08)
        gsap.to(track, { x: () => -getDistance(), ease: 'none', scrollTrigger: { trigger: gallery, start: 'top top', end: () => `+=${getDistance() + window.innerHeight * 0.8}`, scrub: 1.05, pin: true, anticipatePin: 1, invalidateOnRefresh: true } })
      })
    }, rootRef)
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    return () => { window.removeEventListener('load', refresh); mm.revert(); context.revert() }
  }, [])

  return (
    <main ref={rootRef}>
      <div className="texture" aria-hidden="true" />
      <header className="topbar">
        <a href="#top" className="logo">YUNING YAO <small>AFTERIMAGE CINEMA</small></a>
        <nav><a href="#works">Works</a><a href="#papers">Papers</a><a href="#about">About</a></nav>
        <span>NL · 2026</span>
      </header>

      <section className="hero" id="top">
        <div className="hero-orbit" aria-hidden="true" />
        <div className="film-perforation perforation-left" aria-hidden="true" /><div className="film-perforation perforation-right" aria-hidden="true" />
        <div className="hero-kicker"><span>A PORTFOLIO IN NINE ENCOUNTERS</span><span>LEIDEN / 2024.09 - 2026.07</span></div>
        <h1 className="hero-title" aria-label="Yuning Yao"><span>YUNING</span><span>YAO</span></h1>
        <div className="hero-leader" aria-hidden="true"><i /><i /><b>16 MM</b><span>01</span></div>
        <div className="hero-filmmarks" aria-hidden="true"><span>TAKE 01</span><i /><span>24 FPS</span><i /><span>ROLL 2026</span></div>
        <div className="hero-deck">
          <div className="hero-intro">
            <p>Interactive works and experiments about how people perceive, connect and decide.</p>
            <span>Scroll to enter</span>
          </div>
          <div className="hero-practice"><span>SOUND · CODE · OBJECTS</span><i>→</i><span>ENCOUNTERS · QUESTIONS · RESPONSES</span></div>
        </div>
        <div className="hero-timecode"><span>ROLL 01 ●</span><span>LEIDEN / 2026</span></div>
      </section>

      <section className="prologue">
        <span className="section-mark">PROLOGUE / HOW I WORK</span>
        <p data-reveal>I make installations, interfaces and experiments that invite people to <em>touch, listen, play or make a choice.</em></p>
        <p data-reveal>I work with sound, code and physical objects. I am most interested in the moment when someone uses the work differently from how I imagined.</p>
      </section>

      <section className="thesis-scene">
        <div className="thesis-heading" data-reveal><span>FEATURE PRESENTATION / GRADUATION PROJECT / 2026</span><h2>When an explanation<br />changes the judge.</h2></div>
        <div className="thesis-stage">
          <figure className="thesis-screen" data-image-reveal><img src="/assets/thesis-live-interface.webp" alt="AI-assisted misinformation judgment study interface" /><figcaption>LIVE STUDY INTERFACE · 25 TRIALS · FIVE EXPLANATION CONDITIONS</figcaption></figure>
          <aside data-reveal>
            <span>HUMAN–AI INTERACTION / XAI / MISINFORMATION</span>
            <p>Five explanation interfaces, one unstable relationship between advice and trust. The study asks whether token-level explanations help people resist incorrect AI advice—or simply make the advice feel more legible.</p>
            <blockquote><b>MORE ≠ SAFER</b>Static token highlights offered no clear protection against incorrect AI advice beyond showing the prediction alone.</blockquote>
            <div className="thesis-links"><a href="https://xaiui.vercel.app" target="_blank" rel="noreferrer">ENTER THE STUDY ↗</a><a href="/assets/yuning-yao-master-thesis.pdf" target="_blank" rel="noreferrer">READ THE THESIS ↗</a></div>
          </aside>
        </div>
        <div className="thesis-progress"><span>EXPLANATION</span><i /><span>JUDGMENT</span></div>
      </section>

      <div className="reel-anchor" id="works" aria-hidden="true" />
      <section className="reel-section">
        <div className="reel-heading"><span>THE ENCOUNTER REEL</span><p>09 works · observe / listen / touch / negotiate</p></div>
        <div className="reel-track">
          <div className="reel-intro"><span>SCENES<br />FROM TWO YEARS<br />OF MAKING</span><small>Drag your attention.<br />Scroll to advance.</small></div>
          {works.map(work => <WorkFrame work={work} key={work.no} />)}
          <div className="reel-outro"><span>END OF REEL</span><p>The work continues<br />outside the frame.</p></div>
        </div>
      </section>

      <section className="live-portals">
        <header data-reveal><span>OPEN THE MACHINES</span><h2>Six works still<br />respond online.</h2></header>
        <div className="portal-list">
          {liveWorks.map(([no, title, note, url]) => <a href={url} target="_blank" rel="noreferrer" key={title}><span>{no}</span><strong>{title}</strong><small>{note}</small><i>↗</i></a>)}
        </div>
      </section>

      <section className="paper-room" id="papers">
        <header data-reveal><span>WRITTEN EVIDENCE / 2024—2026</span><h2>Papers are<br />projects, too.</h2></header>
        <div className="paper-stack">
          {papers.map(([year, title, type, abstract, links, image, fullPoster], index) => (
            <details key={title} className={fullPoster ? 'full-poster' : ''}>
              <summary><span>{String(index + 1).padStart(2, '0')}</span><span>{year}</span><h3>{title}</h3><b>+</b></summary>
              <div className={`paper-content${image ? ' has-image' : ''}`}>
                {image && <figure><img src={image} alt="" /></figure>}
                <div><small>{type}</small><p>{abstract}</p></div>
                <LinkPills links={links} />
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="about" id="about">
        <figure className="about-eye"><img src="/assets/photos/yuning-portrait.webp" alt="Portrait of Yuning Yao" /><figcaption>YUNING YAO · 2026</figcaption></figure>
        <div className="about-text" data-reveal>
          <span>ABOUT YUNING / BEHIND THE CAMERA</span>
          <h2>Looking closely<br />is still the method.</h2>
          <div className="about-columns"><p>Before Media Technology, I studied Film, TV &amp; Media Art in Shanghai and made documentaries about urban life, identity and human connection. Atmosphere, rhythm and the small details of an encounter continue to guide how I work.</p><p>Today I work across interactive installation, creative coding, sound, AI and experimental research. The medium changes; the question stays close to the body.</p></div>
          <div className="route"><span><b>BEFORE</b>Shanghai · documentary film</span><i>→</i><span><b>NOW</b>Leiden · responsive media</span></div>
        </div>
      </section>

      <section className="contact-sheet">
        {[['/assets/photos/bored-team.webp','WITH OTHERS'],['/assets/photos/blushy-electronics.webp','BEFORE THE BODY'],['/assets/photos/bitwise-process.webp','TEST / FAIL / REPEAT'],['/assets/photos/in-bloom-presentation.webp','SHOW THE PROCESS']].map(([src, label]) => <figure key={src} data-image-reveal><img src={src} alt="" /><figcaption>{label}</figcaption></figure>)}
      </section>

      <footer className="credits">
        <span>END CREDITS / 2026</span>
        <p>The work changes form.<br />The curiosity remains.</p>
        <div><span>YUNING YAO · MEDIA TECHNOLOGY MSc · LEIDEN UNIVERSITY</span><span>Based in the Netherlands · Open to collaborations</span></div>
      </footer>
    </main>
  )
}

export default App
