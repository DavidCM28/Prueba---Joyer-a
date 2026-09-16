"use client";

import { ArrowUpRight, InstagramLogo, WhatsappLogo, Plus, StarFour } from "@phosphor-icons/react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import ScrollJewel from "./scroll-jewel";

const pieces = [
  { name: "GRILLZ / 01", type: "Set de 4 piezas · Plata .925", description: "Grillz en plata .925. Un set compuesto por cuatro piezas.", image: "/img/dientes_2.png", gallery: ["/img/dientes_2.png", "/img/dientes_2.1.jpg", "/img/dientes_2.2.jpg"], alt: "Set de cuatro piezas de grillz en plata .925", position: "center" },
  { name: "CUSTOM CHAIN / 02", type: "Plata .925 · Aguamarinas y ópalo de laboratorio", description: "Cadena personalizada en plata .925 con aguamarinas y ópalo de laboratorio.", image: "/img/collar.jpg", gallery: ["/img/collar.jpg", "/img/collar_2.jpg", "/img/collar_3.jpg"], alt: "Custom chain en plata .925 con aguamarinas y ópalo de laboratorio", position: "52% center" },
  { name: "ESMERALDA / 03", type: "Anillo de oro 14k · Esmeralda natural", description: "Anillo en oro de 14k con esmeralda natural. Una pieza friends & family.", note: "Pieza friends & family", image: "/img/anillo.jpg", gallery: ["/img/anillo.jpg"], alt: "Anillo en oro de 14k con esmeralda natural", position: "center 42%" }
];

function PieceGallery({ piece }: { piece: typeof pieces[number] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [isOpen]);

  return <>
    <button aria-label={`Ver detalles de ${piece.name}`} onClick={() => { setActiveImage(0); dialogRef.current?.showModal(); setIsOpen(true); }}><Plus size={20} /></button>
    <dialog ref={dialogRef} className="piece-dialog" aria-label={piece.name} onClose={() => setIsOpen(false)} onClick={event => { if (event.target === event.currentTarget) dialogRef.current?.close(); }}>
      {isOpen && <div className="piece-dialog-content">
        <form method="dialog" className="piece-dialog-close"><button autoFocus>Cerrar</button></form>
        <div className="piece-gallery-photo"><Image src={piece.gallery[activeImage]} alt={`${piece.alt}. Vista ${activeImage + 1} de ${piece.gallery.length}`} fill sizes="(max-width: 700px) 90vw, 800px" /></div>
        <div className="piece-dialog-copy"><h3>{piece.name}</h3><p>{piece.description}</p>
          {piece.gallery.length > 1 && <div className="piece-gallery-thumbs" aria-label="Vistas de la pieza">{piece.gallery.map((src, index) => <button key={src} aria-label={`Ver foto ${index + 1} de ${piece.gallery.length}`} aria-pressed={activeImage === index} onClick={() => setActiveImage(index)}><Image src={src} alt="" fill sizes="64px" /></button>)}</div>}
        </div>
      </div>}
    </dialog>
  </>;
}

function ProcessVideo({ src, poster, className, label }: { src: string; poster: string; className: string; label: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLElement>(null);
  const isInView = useInView(frameRef, { amount: 0.25 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isInView && !reduceMotion) void video.play().catch(() => undefined);
    else video.pause();
  }, [isInView, reduceMotion]);

  return <motion.figure ref={frameRef} className={`process-media ${className}`} initial={false} whileHover={reduceMotion ? undefined : { y: -6 }} transition={{ duration: .25, ease: [.16, 1, .3, 1] }}>
    <video ref={videoRef} src={src} poster={poster} muted loop playsInline preload="metadata" aria-label={label} />
    <figcaption>{label}</figcaption>
  </motion.figure>;
}

function ProcessStill({ src, alt, className, label }: { src: string; alt: string; className: string; label: string }) {
  const reduceMotion = useReducedMotion();
  return <motion.figure className={`process-media process-still ${className}`} initial={false} whileHover={reduceMotion ? undefined : { y: -6 }} transition={{ duration: .25, ease: [.16, 1, .3, 1] }}>
    <Image src={src} alt={alt} fill sizes="(max-width: 700px) 45vw, 24vw" />
    <figcaption>{label}</figcaption>
  </motion.figure>;
}

function CaseStory() {
  const reduceMotion = useReducedMotion();
  return <motion.article className="case-story" initial={false} whileHover={reduceMotion ? undefined : { y: -6 }} transition={{ duration: .25, ease: [.16, 1, .3, 1] }}>
    <div className="case-story-images">
      <div><Image src="/img/case_grillz_closed.jpg" alt="Case de Prueba Joyería para transportar grillz" fill sizes="(max-width: 700px) 50vw, 20vw" /></div>
      <div><Image src="/img/case_grillz_opened.jpg" alt="Interior del case de Prueba Joyería con grillz" fill sizes="(max-width: 700px) 50vw, 20vw" /></div>
    </div>
    <div className="case-story-copy"><h3>TUS PIEZAS.<br /><span>SIEMPRE CONTIGO.</span></h3><p>Un case diseñado para llevar tus Grillz protegidos, vayas donde vayas.</p><a href="https://www.instagram.com/pruebajoyeriamx/" target="_blank" rel="noreferrer">Cotiza tu idea por DM <ArrowUpRight size={16} weight="bold" /></a></div>
  </motion.article>;
}

function HeroTitle() {
  let characterIndex = 0;

  return <h1 className="hero-title" aria-label="Que hable la pieza.">
    {["QUE", "HABLE", "LA PIEZA."].map((line, lineIndex) => <span className={`hero-title-line${lineIndex === 1 ? " hero-title-neon" : ""}`} aria-hidden="true" key={line}>
      {Array.from(line).map((character, index) => {
        const delay = 180 + characterIndex++ * 85 + lineIndex * 150;
        return <span className="hero-type-character" key={index} style={{ "--type-delay": `${delay}ms` } as CSSProperties}>{character}</span>;
      })}
    </span>)}
  </h1>;
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const heroRotate = useTransform(scrollYProgress, [0, 1], [0, -5]);

  return <main>
    <ScrollJewel />
    <header className="site-header">
    <nav className="nav shell" aria-label="Navegación principal">
      <a className="wordmark" href="#top" aria-label="Prueba Joyería, inicio"><Image src="/img/logo.jpg" alt="" width={42} height={42} priority /></a>
      <div className="nav-center"><a href="#piezas">Piezas</a><a href="#proceso">Proceso</a><a href="#contacto">Contacto</a></div>
      <div className="nav-socials">
        <a className="nav-whatsapp" href="https://wa.me/5210000000000" target="_blank" rel="noreferrer" aria-label="Abrir WhatsApp"><WhatsappLogo size={22} weight="fill" /></a>
        <a className="nav-instagram" href="https://www.instagram.com/pruebajoyeriamx/" target="_blank" rel="noreferrer" aria-label="Abrir Instagram de Prueba Joyería"><InstagramLogo size={20} weight="bold" /><span>IG / @PRUEBAJOYERIAMX</span></a>
      </div>
    </nav>
    </header>

    <section id="top" className="hero shell" ref={heroRef}>
      <div className="hero-copy">
        <motion.p className="micro" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .1 }}>JOYERÍA URBANA / CDMX → MX</motion.p>
        <HeroTitle />
        <motion.p className="hero-deck" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .55 }}>No hacemos accesorios.<br /><span>Hacemos presencia.</span></motion.p>
        <motion.a className="button button-accent" href="#piezas" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .7 }}>Ver piezas <ArrowUpRight size={20} weight="bold" /></motion.a>
      </div>
      <motion.div className="hero-art" style={reduceMotion ? undefined : { y: heroY, rotate: heroRotate }}>
        <motion.div className="art-frame" initial={reduceMotion ? false : { clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} transition={{ duration: .8, delay: .28, ease: [.16, 1, .3, 1] }}><Image className="hero-photo" src="/img/dientes_1.png" alt="Cliente mostrando sus grillz de Prueba Joyería" fill sizes="(max-width: 700px) 86vw, 475px" priority /><div className="art-caption">GRILLZ / PRESENCIA<br /><span>PRUEBA JOYERÍA</span></div></motion.div>
        <div className="hero-stamp"><StarFour size={18} weight="fill" /><span>THE<br />NEW<br />CLASSIC</span></div>
      </motion.div>
    </section>

    <div className="signal-strip" aria-label="Prueba Joyería, hecho para ser visto"><span>PRUEBA JOYERÍA</span><i>✳</i><span>HECHO PARA SER VISTO</span><i>✳</i><span>CDMX → MX</span></div>

    <section id="piezas" className="collection shell">
      <div className="section-head"><div><p className="micro">DROP 001 / SELECCIÓN</p><h2>PIEZAS<br /><span>QUE PESAN.</span></h2></div><p className="section-note">Para la boca. Para el cuello.<br />Para no pasar desapercibidx.</p></div>
      <div className="piece-grid">{pieces.map((piece, index) => <motion.article className={`piece piece-${index + 1}`} key={piece.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} transition={{ delay: index * .12 }}>
        <div className="piece-image"><Image src={piece.image} alt={piece.alt} fill sizes="(max-width: 700px) 78vw, 34vw" style={{ objectPosition: piece.position }} /><span className="piece-index">0{index + 1}</span><PieceGallery piece={piece} /></div><div className="piece-meta"><div><h3>{piece.name}</h3><p>{piece.type}</p>{piece.note && <p className="piece-note">{piece.note}</p>}</div><ArrowUpRight size={22} /></div>
      </motion.article>)}</div>
      <a className="text-link" href="https://www.instagram.com/pruebajoyeriamx/" target="_blank" rel="noreferrer">Ver el drop completo <ArrowUpRight size={18} /></a>
    </section>

    <section id="proceso" className="process shell">
      <div className="process-copy"><p className="micro">DEL TALLER A TU PIEZA</p><motion.h2 initial={reduceMotion ? false : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .35 }} transition={{ duration: .6, ease: [.16, 1, .3, 1] }}>MEDIR.<br /><span>HACER.</span><br />PROBAR.</motion.h2><p>Cada pieza empieza observando el detalle: medidas, herramientas y manos que convierten una idea en algo que puedes llevar.</p><a className="button button-outline" href="#contacto">Cuéntanos tu idea <ArrowUpRight size={19} /></a></div>
      <div className="process-videos">
        <ProcessVideo src="/img/prueba_joyeria.mp4" poster="/img/dientes_3.png" className="process-media-main" label="Medidas y proceso de anillos" />
        <ProcessVideo src="/img/prueba_joyeria_2.mp4" poster="/img/dientes_3.png" className="process-media-detail" label="Herramientas del taller" />
        <CaseStory />
        <ProcessStill src="/img/dientes_3.png" alt="Detalle de grillz de Prueba Joyería" className="process-grill-detail" label="Prueba final" />
      </div>
    </section>

    <section id="contacto" className="contact shell"><div className="contact-top"><p className="micro">¿TIENES UNA IDEA?</p><h2>HABLEMOS<br /><em>EN SERIO.</em></h2></div><div className="contact-bottom"><p>Custom pieces, grills y joyería para elevar el uniforme diario.</p><a className="button button-accent" href="https://wa.me/5210000000000" target="_blank" rel="noreferrer"><WhatsappLogo size={20} weight="fill" /> Abrir WhatsApp</a><a className="button button-dark" href="https://www.instagram.com/pruebajoyeriamx/" target="_blank" rel="noreferrer"><InstagramLogo size={20} weight="bold" /> Instagram</a></div></section>
    <footer className="footer shell"><span>© PRUEBA JOYERÍA / 2024—25</span><span>HECHO PARA SER VISTO</span><span>MX / CDMX</span></footer>
  </main>;
}
