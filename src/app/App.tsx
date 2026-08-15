import { useState, useEffect, useRef, type FormEvent } from "react";
import {
  Phone, MapPin, Clock, Menu, X, ChevronLeft, ChevronRight,
  Star, Mail, Award, Cpu, Printer, MonitorSpeaker, Users,
  Building2, Package, CheckCircle2, ArrowRight,
} from "lucide-react";
import { motion, useInView, animate } from "motion/react";

/* ─── Palette ────────────────────────────────────────────────────────────────── */
const COLORS = {
  navy:   "#1a2060",
  blue:   "#2563eb",
  teal:   "#0d9488",
  purple: "#7c3aed",
  orange: "#ea580c",
  rose:   "#e11d48",
  green:  "#16a34a",
  amber:  "#d97706",
};

const SERVICE_COLORS = [
  { bg:"#eff6ff", icon:"#2563eb", border:"#bfdbfe" },
  { bg:"#f0fdf4", icon:"#16a34a", border:"#bbf7d0" },
  { bg:"#fdf4ff", icon:"#7c3aed", border:"#e9d5ff" },
  { bg:"#fff7ed", icon:"#ea580c", border:"#fed7aa" },
  { bg:"#f0fdfa", icon:"#0d9488", border:"#99f6e4" },
  { bg:"#fef2f2", icon:"#e11d48", border:"#fecaca" },
  { bg:"#fffbeb", icon:"#d97706", border:"#fde68a" },
  { bg:"#f5f3ff", icon:"#7c3aed", border:"#ddd6fe" },
];

/* ─── Data ──────────────────────────────────────────────────────────────────── */
const NAV_LINKS = ["Home", "Services", "Products", "Clients", "Careers", "Contact"];
const SECTION_IDS: Record<string, string> = {
  Home: "home",
  Services: "services",
  Products: "gallery",
  Clients: "clients",
  Careers: "careers",
  Contact: "contact",
};

function scrollToSection(link: string) {
  const id = SECTION_IDS[link] ?? "home";
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

const STATS = [
  { value: 6,   suffix: "+", label: "Service Categories", color: "#2563eb" },
  { value: 25,  suffix: "+", label: "Services Offered",   color: "#0d9488" },
  { value: 4.9, suffix: "★", label: "Customer Rating",    color: "#d97706", decimal: true },
  { value: 500, suffix: "+", label: "Happy Clients",       color: "#7c3aed" },
];

const SERVICES = [
  { icon: Cpu,            title: "Computer AMC & Repairing",        desc: "Annual maintenance contracts and on-site repair for desktops, laptops, and servers — keeping your office running without interruption." },
  { icon: Printer,        title: "Printer & Toner Services",         desc: "H.P toner, cartridge supply, printer repairing and interior printing solutions for offices of every scale." },
  { icon: MonitorSpeaker, title: "Online UPS & Camera Systems",      desc: "Supply and installation of online UPS, surveillance cameras, and complete office electronics infrastructure." },
  { icon: Package,        title: "Office Furniture & Stationery",    desc: "Curated sourcing of premium office furniture, equipment, and stationery — one vendor for all your supply needs." },
  { icon: Building2,      title: "Housekeeping Services",            desc: "Professional housekeeping for offices, residences, and commercial spaces ensuring spotless environments every day." },
  { icon: Users,          title: "Man Power Services",               desc: "Trained, verified manpower for corporate facilities — from front-desk executives to skilled technicians." },
  { icon: Award,          title: "Facilities Management",            desc: "End-to-end facility management covering electro-mechanical maintenance, horticulture, pest control, and more." },
  { icon: Package,        title: "Govt. Contractor & Supplier",      desc: "GeM-registered contractor and material supplier for government departments and PSU procurement." },
];

const GALLERY = [
  { label: "IT & Computer Services",  img: "https://images.unsplash.com/photo-1629904853716-f0bc54eea481?w=700&h=480&fit=crop&auto=format", color: "#2563eb" },
  { label: "Corporate Office Setup",  img: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=700&h=480&fit=crop&auto=format", color: "#0d9488" },
  { label: "Housekeeping",            img: "https://images.unsplash.com/photo-1627905646269-7f034dcc5738?w=700&h=480&fit=crop&auto=format", color: "#7c3aed" },
  { label: "Horticulture Services",   img: "https://images.unsplash.com/photo-1597201278257-3687be27d954?w=700&h=480&fit=crop&auto=format", color: "#16a34a" },
  { label: "Pest Control",            img: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=700&h=480&fit=crop&auto=format", color: "#ea580c" },
  { label: "Facilities Management",   img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=700&h=480&fit=crop&auto=format", color: "#e11d48" },
];

const CLIENTS = [
  { name: "Income Tax Department", location: "Gurugram", icon: "🏛️", featured: true },
  { name: "GST Department (State Tax)", location: "Gautam Buddh Nagar", icon: "📋", featured: false },
  { name: "Commercial Court ( District Court )", location: "Gautam Buddh Nagar", icon: "📜", featured: false },
  { name: "Archaeological Survey of India", location: "Gautam Buddh Nagar", icon: "🏺", featured: false },
  { name: "Mining Department", location: "Gautam Buddh Nagar", icon: "⛏️", featured: false },
  { name: "Disaster Management Department", location: "Gautam Buddh Nagar", icon: "🚨", featured: false },
  { name: "ADM - Administration", location: "Gautam Buddh Nagar", icon: "🏢", featured: false },
  { name: "Motor Accidents Claims Tribunal (MACT)", location: "Gautam Buddh Nagar", icon: "🚗", featured: false },
  { name: "D.B.P. ENGINEERING WORKS PVT. LTD.", location: "Gautam Buddh Nagar", icon: "🔧", featured: false },
  { name: "Land Acquisition, Rehabilitation, and Resettlement Authority (LARRA)", location: "Gautam Buddh Nagar", icon: "🏗️", featured: true },
];

const REVIEWS = [
  { initial:"R", name:"Rajesh M.",  time:"2 months ago",  text:"Excellent housekeeping services. Professional, punctual, and thorough. Our office has never looked better!", color:"#2563eb" },
  { initial:"P", name:"Priya S.",   time:"3 months ago",  text:"Outstanding deep cleaning and maintenance. Very satisfied with the quality and attention to detail.", color:"#7c3aed" },
  { initial:"A", name:"Amit K.",    time:"1 month ago",   text:"Fantastic IT support — fast turnaround on our printer issues and AMC renewal was seamless.", color:"#0d9488" },
  { initial:"S", name:"Sunita V.",  time:"5 months ago",  text:"The horticulture team transformed our office campus. Very skilled, punctual, and results speak for themselves.", color:"#ea580c" },
];

/* ─── Helpers ────────────────────────────────────────────────────────────────── */
function useReveal() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  return { ref, inView };
}

function Counter({ target, decimal = false, color }: { target: number; decimal?: boolean; color: string }) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const { ref, inView } = useReveal();
  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(0, target, {
      duration: 1.8, ease: "easeOut",
      onUpdate(v) { if (spanRef.current) spanRef.current.textContent = decimal ? v.toFixed(1) : Math.round(v).toString(); },
    });
    return ctrl.stop;
  }, [inView, target, decimal]);
  return <span ref={ref}><span ref={spanRef} style={{ color }}>{decimal ? "0.0" : "0"}</span></span>;
}

function SectionLabel({ text, color }: { text: string; color: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
      style={{ background: color + "15", color }}>
      {text}
    </span>
  );
}

function GoogleG() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
  );
}

/* ─── Top Bar ────────────────────────────────────────────────────────────────── */
function TopBar() {
  return (
    <div className="py-2 px-6 text-xs text-white" style={{ background: COLORS.navy }}>
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center md:justify-between items-center gap-3">
        <span className="flex items-center gap-1.5 opacity-80"><Clock size={11} />Mon–Sun · Open 24 hours</span>
        <div className="flex flex-wrap gap-5 items-center">
          <a href="tel:+919955306680" className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity"><Phone size={11} />+91-9955306680</a>
          <a href="tel:+918299445140" className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity"><Phone size={11} />+91-8299445140</a>
          <span className="flex items-center gap-1.5 opacity-80"><MapPin size={11} />Greater Noida, UP</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Navbar ─────────────────────────────────────────────────────────────────── */
function NavBar({ active, setActive }: { active: string; setActive: (s: string) => void }) {
  const [open, setOpen] = useState(false);
  const scrollTo = (link: string) => {
    const id = SECTION_IDS[link] ?? "home";
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setActive(link);
  };

  return (
    <motion.header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100"
      initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-40">
        <button className="flex items-center gap-2" onClick={() => setActive("Home")}>
          <motion.img
            src="/assets/ams-logo.png"
            alt="MS Enterprises Logo"
            className="w-32 h-32 select-none object-contain"
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} />
          <div className="text-left">
            <p className="font-extrabold text-sm leading-tight" style={{ color: COLORS.navy, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>M S Enterprises</p>
            <p className="text-xs leading-tight text-gray-400">Facility Management</p>
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => {
            if (link === "Careers") {
              return (
                <a key={link} href="/careers.html"
                  className="text-sm font-semibold pb-0.5 relative"
                  style={{ color: "#6b7280" }}>
                  {link}
                </a>
              );
            }
            return (
              <motion.button key={link} type="button" onClick={() => scrollTo(link)}
                className="text-sm font-semibold pb-0.5 relative"
                style={{ color: active === link ? COLORS.blue : "#6b7280" }}
                whileHover={{ y: -1 }}>
                {link}
                {active === link && (
                  <motion.div className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full"
                    style={{ background: COLORS.blue }} layoutId="ul" />
                )}
              </motion.button>
            );
          })}
        </nav>

        <motion.button type="button" onClick={() => scrollTo("Contact")}
          className="hidden md:inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl text-white"
          style={{ background: `linear-gradient(135deg, ${COLORS.blue} 0%, ${COLORS.navy} 100%)` }}
          whileHover={{ scale: 1.04, opacity: 0.92 }} whileTap={{ scale: 0.97 }}>
          <Phone size={14} /> Contact
        </motion.button>

        <button type="button" className="md:hidden p-2 text-gray-700" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <motion.div className="md:hidden bg-white border-t border-gray-100 px-6 pb-5 pt-3 flex flex-col gap-3"
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
          {NAV_LINKS.map((link) => {
            if (link === "Careers") {
              return (
                <a key={link} href="/careers.html"
                  className="text-sm font-semibold text-left py-1"
                  style={{ color: "#6b7280" }}>{link}</a>
              );
            }
            return (
              <button key={link} type="button" onClick={() => { scrollTo(link); setOpen(false); }}
                className="text-sm font-semibold text-left py-1"
                style={{ color: active === link ? COLORS.blue : "#6b7280" }}>{link}</button>
            );
          })}
          <button type="button" onClick={() => { scrollTo("Contact"); setOpen(false); }}
            className="text-sm font-semibold px-5 py-2.5 rounded-xl text-white text-center mt-1"
            style={{ background: `linear-gradient(135deg, ${COLORS.blue} 0%, ${COLORS.navy} 100%)` }}>
            <Phone size={14} className="inline mr-1" /> Contact
          </button>
        </motion.div>
      )}
    </motion.header>
  );
}

/* ─── Hero ───────────────────────────────────────────────────────────────────── */
function Hero({ setActive }: { setActive: (s: string) => void }) {
  return (
    <section id="home" className="relative overflow-hidden bg-white">
      {/* Colorful blobs */}
      <div className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
      <div className="absolute bottom-0 left-0 w-[360px] h-[360px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(13,148,136,0.07) 0%, transparent 70%)", transform: "translate(-30%, 30%)" }} />

      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-14 items-center relative z-10">
        <div>
          <motion.div className="mb-5"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <SectionLabel text="GeM Registered · Govt. Contractor" color={COLORS.blue} />
          </motion.div>

          <motion.h1
            className="font-extrabold leading-tight mb-5"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(2.2rem,5vw,3.6rem)", color: COLORS.navy }}
            initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }}>
            Your Trusted<br />
            <span style={{ color: COLORS.blue }}>Housekeeping</span> &amp;{" "}
            <span style={{ color: COLORS.teal }}>Facility</span> Partner
          </motion.h1>

          <motion.p className="text-gray-500 text-base leading-relaxed mb-8 max-w-md"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            M S Enterprises delivers professional housekeeping, trained manpower, computer AMC & repair, pest control, garden maintenance, office supplies, and electrical services — providing reliable, end-to-end facility solutions to businesses and organizations across Greater Noida.
          </motion.p>

          <motion.div className="flex flex-wrap gap-3 mb-8"
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.3 }}>
            <motion.button type="button" onClick={() => { scrollToSection("Contact"); setActive("Contact"); }}
              className="inline-flex items-center gap-2 text-sm font-semibold px-7 py-3.5 rounded-xl text-white"
              style={{ background: `linear-gradient(135deg, ${COLORS.blue} 0%, ${COLORS.navy} 100%)` }}
              whileHover={{ scale: 1.04, boxShadow: "0 8px 28px rgba(37,99,235,0.30)" }}
              whileTap={{ scale: 0.97 }}>
              <Phone size={15} /> Contact Us <ArrowRight size={14} />
            </motion.button>
            <motion.button type="button" onClick={() => { scrollToSection("Services"); setActive("Services"); }}
              className="inline-flex items-center gap-2 text-sm font-semibold px-7 py-3.5 rounded-xl border-2 text-gray-700 bg-white"
              style={{ borderColor: "#e5e7eb" }}
              whileHover={{ scale: 1.04, borderColor: COLORS.blue, color: COLORS.blue }}
              whileTap={{ scale: 0.97 }}>
              Explore Services
            </motion.button>
          </motion.div>

          <motion.div className="flex flex-wrap gap-5"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45, duration: 0.5 }}>
            {[
              { t: "Open 24/7",       c: COLORS.blue },
              { t: "500+ Clients",    c: COLORS.teal },
              { t: "GeM Certified",   c: COLORS.purple },
            ].map(({ t, c }) => (
              <span key={t} className="flex items-center gap-1.5 text-xs text-gray-500">
                <CheckCircle2 size={13} style={{ color: c }} />{t}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Image collage */}
        <motion.div className="relative hidden md:block"
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
          <div className="grid grid-cols-2 gap-3">
            {[
              { img: "https://images.unsplash.com/photo-1629904853716-f0bc54eea481?w=400&h=280&fit=crop&auto=format", label: "IT Services",    color: COLORS.blue },
              { img: "https://images.unsplash.com/photo-1627905646269-7f034dcc5738?w=400&h=280&fit=crop&auto=format", label: "Housekeeping",   color: COLORS.teal },
              { img: "https://images.unsplash.com/photo-1597201278257-3687be27d954?w=400&h=280&fit=crop&auto=format", label: "Horticulture",   color: COLORS.green },
              { img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=280&fit=crop&auto=format", label: "Maintenance",    color: COLORS.orange },
            ].map((c, i) => (
              <motion.div key={c.label} className="rounded-2xl overflow-hidden relative group shadow-md"
                whileHover={{ scale: 1.03, y: -3 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                style={{ transitionDelay: `${0.3 + i * 0.08}s` }}>
                <img src={c.img} alt={c.label} className="w-full h-36 object-cover" />
                <div className="absolute bottom-0 left-0 right-0 px-3 py-2 text-white text-xs font-bold"
                  style={{ background: `linear-gradient(to top, ${c.color}dd, transparent)` }}>
                  {c.label}
                </div>
              </motion.div>
            ))}
          </div>
          {/* Floating badge */}
          <motion.div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg border border-gray-100 px-4 py-3 flex items-center gap-2"
            animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ background: COLORS.amber }}>4.9</div>
            <div>
              <div className="flex gap-0.5">{[1,2,3,4,5].map(i => <Star key={i} size={10} style={{ fill: COLORS.amber, color: COLORS.amber }} />)}</div>
              <p className="text-xs text-gray-500">50+ Reviews</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Stats ──────────────────────────────────────────────────────────────────── */
function StatsSection() {
  const { ref, inView } = useReveal();
  return (
    <section ref={ref} className="py-16 px-6" style={{ background: "#f8faff" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-10"
          variants={{ hidden:{ opacity:0, y:20 }, show:{ opacity:1, y:0 } }}
          initial="hidden" animate={inView ? "show" : "hidden"} transition={{ duration: 0.5 }}>
          <SectionLabel text="Trusted by our customers" color={COLORS.blue} />
          <h2 className="mt-3 font-extrabold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(1.6rem,3.5vw,2.4rem)" }}>
            Proven Success in Numbers
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {STATS.map((s, i) => (
            <motion.div key={s.label}
              className="bg-white rounded-2xl px-6 py-8 text-center shadow-sm border border-gray-100"
              variants={{ hidden:{ opacity:0, y:24 }, show:{ opacity:1, y:0 } }}
              initial="hidden" animate={inView ? "show" : "hidden"}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.09 }}
              whileHover={{ y: -5, boxShadow: `0 12px 32px ${s.color}22` }}>
              <div className="w-10 h-10 rounded-xl mx-auto mb-4 flex items-center justify-center"
                style={{ background: s.color + "15" }}>
                <div className="w-3 h-3 rounded-full" style={{ background: s.color }} />
              </div>
              <p className="font-extrabold mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "2.4rem", lineHeight: 1 }}>
                <Counter target={s.value} decimal={s.decimal} color={s.color} />
                <span style={{ color: s.color }}>{s.suffix}</span>
              </p>
              <p className="text-sm text-gray-500 font-medium">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Services ───────────────────────────────────────────────────────────────── */
function ServicesSection() {
  const { ref, inView } = useReveal();
  return (
    <section id="services" ref={ref} className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-12"
          variants={{ hidden:{ opacity:0, y:20 }, show:{ opacity:1, y:0 } }}
          initial="hidden" animate={inView ? "show" : "hidden"} transition={{ duration: 0.5 }}>
          <SectionLabel text="What We Offer" color={COLORS.purple} />
          <h2 className="mt-3 font-extrabold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(1.6rem,3.5vw,2.4rem)" }}>
            Our Services
          </h2>
          <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
            From IT infrastructure to facility management — a single trusted partner for all your operational needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((svc, i) => {
            const c = SERVICE_COLORS[i];
            return (
              <motion.div key={svc.title}
                className="rounded-2xl p-6 border-2 group cursor-default transition-all"
                style={{ background: c.bg, borderColor: c.border }}
                variants={{ hidden:{ opacity:0, y:28 }, show:{ opacity:1, y:0 } }}
                initial="hidden" animate={inView ? "show" : "hidden"}
                transition={{ duration: 0.48, delay: 0.07 + i * 0.07 }}
                whileHover={{ y: -5, boxShadow: `0 16px 40px ${c.icon}1a`, borderColor: c.icon }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 text-white"
                  style={{ background: c.icon }}>
                  <svc.icon size={20} />
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-2 leading-snug"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {svc.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">{svc.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Gallery ────────────────────────────────────────────────────────────────── */
function GallerySection() {
  const { ref, inView } = useReveal();
  return (
    <section id="gallery" ref={ref} className="py-20 px-6" style={{ background: "#f8faff" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-12"
          variants={{ hidden:{ opacity:0, y:20 }, show:{ opacity:1, y:0 } }}
          initial="hidden" animate={inView ? "show" : "hidden"} transition={{ duration: 0.5 }}>
          <SectionLabel text="Gallery" color={COLORS.teal} />
          <h2 className="mt-3 font-extrabold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(1.6rem,3.5vw,2.4rem)" }}>
            Our Service Categories
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {GALLERY.map((cat, i) => (
            <motion.div key={cat.label}
              className="rounded-2xl overflow-hidden bg-white shadow-sm border-2 group"
              style={{ borderColor: cat.color + "30" }}
              variants={{ hidden:{ opacity:0, y:24 }, show:{ opacity:1, y:0 } }}
              initial="hidden" animate={inView ? "show" : "hidden"}
              transition={{ duration: 0.48, delay: 0.06 * i }}
              whileHover={{ y: -5, borderColor: cat.color, boxShadow: `0 16px 40px ${cat.color}20` }}>
              <div className="overflow-hidden h-48 bg-gray-100">
                <motion.img src={cat.img} alt={cat.label}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.07 }} transition={{ duration: 0.4 }} />
              </div>
              <div className="px-5 py-4 flex items-center justify-between">
                <p className="font-semibold text-sm text-gray-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{cat.label}</p>
                <span className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: cat.color + "15" }}>
                  <ArrowRight size={13} style={{ color: cat.color }} />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Reviews ────────────────────────────────────────────────────────────────── */
function ReviewsSection() {
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState(1);
  const perPage = 2;
  const total = Math.ceil(REVIEWS.length / perPage);
  const visible = REVIEWS.slice(page * perPage, page * perPage + perPage);
  const { ref, inView } = useReveal();
  const go = (n: number) => { setDir(n > page ? 1 : -1); setPage(n); };

  return (
    <section ref={ref} className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-12"
          variants={{ hidden:{ opacity:0, y:20 }, show:{ opacity:1, y:0 } }}
          initial="hidden" animate={inView ? "show" : "hidden"} transition={{ duration: 0.5 }}>
          <SectionLabel text="Testimonials" color={COLORS.orange} />
          <h2 className="mt-3 font-extrabold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(1.6rem,3.5vw,2.4rem)" }}>
            Why Customers Love Us
          </h2>
          <p className="text-gray-500 text-sm mt-1">50+ users rated us <strong style={{ color: COLORS.amber }}>4.9</strong> / 5</p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-7"
          key={page}
          initial={{ opacity: 0, x: dir * 40 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}>
          {visible.map((r) => (
            <motion.div key={r.name}
              className="rounded-2xl p-6 bg-white border-2 shadow-sm"
              style={{ borderColor: r.color + "25" }}
              whileHover={{ y: -4, borderColor: r.color, boxShadow: `0 12px 36px ${r.color}18` }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ background: r.color }}>{r.initial}</div>
                <div>
                  <p className="font-bold text-sm text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{r.name}</p>
                  <p className="text-xs text-gray-400">{r.time}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">"{r.text}"</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5">{Array.from({length:5}).map((_,i)=><Star key={i} size={13} style={{fill:COLORS.amber,color:COLORS.amber}}/>)}</div>
                <GoogleG />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex items-center justify-center gap-4">
          <motion.button onClick={() => go(Math.max(0, page-1))} disabled={page===0}
            className="w-9 h-9 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-400 disabled:opacity-30"
            whileHover={{ borderColor: COLORS.blue, color: COLORS.blue }} whileTap={{ scale: 0.9 }}>
            <ChevronLeft size={16} />
          </motion.button>
          <div className="flex gap-2 items-center">
            {Array.from({length:total}).map((_,i)=>(
              <motion.button key={i} onClick={() => go(i)}
                className="h-2.5 rounded-full"
                style={{ background: i===page ? COLORS.blue : "#d1d5db", width: i===page ? 24 : 10 }}
                layout />
            ))}
          </div>
          <motion.button onClick={() => go(Math.min(total-1, page+1))} disabled={page===total-1}
            className="w-9 h-9 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-400 disabled:opacity-30"
            whileHover={{ borderColor: COLORS.blue, color: COLORS.blue }} whileTap={{ scale: 0.9 }}>
            <ChevronRight size={16} />
          </motion.button>
        </div>
      </div>
    </section>
  );
}

/* ─── Clients Section ────────────────────────────────────────────────────── */
function ClientsSection() {
  const { ref, inView } = useReveal();
  const featuredClients = CLIENTS.filter((c) => c.featured);
  const regularClients = CLIENTS.filter((c) => !c.featured);

  return (
    <section id="clients" ref={ref} className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <SectionLabel text="OUR TRUSTED PARTNERS" color={COLORS.blue} />
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Government & Organization Clients
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            M S Enterprises proudly serves leading government departments and organizations across multiple sectors with excellence and reliability.
          </p>
        </div>

        {/* Featured Clients */}
        {featuredClients.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">⭐ Top Partners</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {featuredClients.map((client, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="relative overflow-hidden group"
                  whileHover={{ y: -5 }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-8 hover:border-blue-400 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-5xl">{client.icon}</span>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full">FEATURED</span>
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">{client.name}</h4>
                    <p className="text-gray-600 font-semibold">{client.location}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Clients Grid */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Government & Organization Clients</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {regularClients.map((client, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                whileHover={{ scale: 1.05, y: -3 }}
                className="group">
                <div className="bg-white border-2 border-gray-200 rounded-xl p-4 text-center hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer">
                  <div className="text-4xl mb-3 transform group-hover:scale-125 transition-transform">{client.icon}</div>
                  <h4 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2">{client.name}</h4>
                  <p className="text-xs text-gray-500">{client.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust Badge */}
        <div className="mt-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="inline-block">
            <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-full px-6 py-3">
              <span className="text-2xl">✓</span>
              <span className="text-gray-700 font-semibold">GeM Registered | Government Approved Contractor</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Contact ────────────────────────────────────────────────────────────────── */
function ContactSection() {
  const [form, setForm] = useState({ name:"", email:"", phone:"", message:"" });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { ref, inView } = useReveal();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);

    try {
      const response = await fetch("https://formspree.io/f/xzepvrqj", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setSent(true);
        setForm({ name:"", email:"", phone:"", message:"" });
      } else {
        const body = await response.json().catch(() => null);
        setError(body?.error || "Unable to send the message. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="py-20 px-6" style={{ background: "#f8faff" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-12"
          variants={{ hidden:{ opacity:0, y:20 }, show:{ opacity:1, y:0 } }}
          initial="hidden" animate={inView ? "show" : "hidden"} transition={{ duration: 0.5 }}>
          <SectionLabel text="Get In Touch" color={COLORS.green} />
          <h2 className="mt-3 font-extrabold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(1.6rem,3.5vw,2.4rem)" }}>
            Request a Service
          </h2>
          <p className="text-gray-500 text-sm mt-2">Fill in the form and our team will reach out promptly.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Info cards */}
          <motion.div className="grid grid-cols-1 gap-4"
            variants={{ hidden:{ opacity:0, x:-20 }, show:{ opacity:1, x:0 } }}
            initial="hidden" animate={inView ? "show" : "hidden"} transition={{ duration: 0.5, delay: 0.1 }}>
            {[
              { icon: Phone,    label: "Phone",   vals: ["+91-9955306680", "+91-8299445140"], color: COLORS.blue },
              { icon: Mail,     label: "Email",   vals: ["msenterprisescontact41@gmail.com"], color: COLORS.teal },
              { icon: MapPin,   label: "Address", vals: ["C-607, Ace Platinum, Zita-1, Greater Noida"], color: COLORS.purple },
              { icon: Clock,    label: "Hours",   vals: ["Monday – Sunday: Open 24 hours"], color: COLORS.orange },
            ].map(({ icon: Icon, label, vals, color }, i) => (
              <motion.div key={label}
                className="flex gap-4 items-start bg-white rounded-2xl p-5 border-2 shadow-sm"
                style={{ borderColor: color + "20" }}
                initial={{ opacity:0, x:-16 }} animate={inView ? { opacity:1, x:0 } : {}}
                transition={{ duration:0.4, delay:0.15 + i*0.08 }}
                whileHover={{ borderColor: color, y: -2 }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white"
                  style={{ background: color }}>
                  <Icon size={16} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-0.5">{label}</p>
                  {vals.map(v => <p key={v} className="text-sm font-medium text-gray-800">{v}</p>)}
                </div>
              </motion.div>
            ))}
            <div className="flex items-center gap-3 bg-white rounded-2xl p-5 border-2 shadow-sm" style={{ borderColor: COLORS.amber + "30" }}>
              <Award size={20} style={{ color: COLORS.amber }} />
              <div>
                <p className="text-sm font-bold text-gray-800">GeM Registered</p>
                <p className="text-xs text-gray-400">Government Contractor &amp; Material Supplier</p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            variants={{ hidden:{ opacity:0, x:20 }, show:{ opacity:1, x:0 } }}
            initial="hidden" animate={inView ? "show" : "hidden"} transition={{ duration: 0.5, delay: 0.15 }}>
            {sent ? (
              <motion.div className="bg-white rounded-2xl p-10 text-center border-2 shadow-sm h-full flex flex-col items-center justify-center"
                style={{ borderColor: COLORS.green + "30" }}
                initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{ background: COLORS.green + "15" }}>
                  <CheckCircle2 size={30} style={{ color: COLORS.green }} />
                </div>
                <h3 className="font-extrabold text-gray-900 text-xl mb-1" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Thank You!</h3>
                <p className="text-gray-400 text-sm">We'll be in touch very soon.</p>
              </motion.div>
            ) : (
              <form action="https://formspree.io/f/xzepvrqj" method="POST" onSubmit={handleSubmit}
                className="bg-white rounded-2xl p-7 border-2 shadow-sm space-y-4"
                style={{ borderColor: COLORS.blue + "20" }}>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { k:"name",  l:"Full Name", t:"text",  p:"Your name" },
                    { k:"email", l:"Email",     t:"email", p:"you@email.com" },
                  ].map(({k,l,t,p}) => (
                    <div key={k}>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5">{l}</label>
                      <input required type={t} name={k} placeholder={p} value={(form as any)[k]}
                        onChange={(e) => setForm({...form,[k]:e.target.value})}
                        className="w-full border-2 border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 transition-colors placeholder:text-gray-300" />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Phone</label>
                  <input type="tel" name="phone" placeholder="+91 00000 00000" value={form.phone}
                    onChange={(e) => setForm({...form,phone:e.target.value})}
                    className="w-full border-2 border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 transition-colors placeholder:text-gray-300" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Message</label>
                  <textarea required name="message" rows={4} placeholder="Describe your requirement..." value={form.message}
                    onChange={(e) => setForm({...form,message:e.target.value})}
                    className="w-full border-2 border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 resize-none transition-colors placeholder:text-gray-300" />
                </div>
                {error ? (
                  <p className="text-sm text-red-600">{error}</p>
                ) : null}
                <motion.button type="submit"
                  className="w-full text-sm font-bold py-3.5 rounded-xl text-white"
                  style={{ background: `linear-gradient(135deg, ${COLORS.blue} 0%, ${COLORS.navy} 100%)` }}
                  whileHover={{ scale: 1.02, boxShadow: "0 8px 24px rgba(37,99,235,0.30)" }}
                  whileTap={{ scale: 0.98 }}
                  disabled={submitting}>
                  {submitting ? "Sending..." : "Send Message"}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <img src="/assets/ams-logo.png" alt="MS Enterprises Logo" className="w-20 h-20 object-contain" />
          <div>
            <p className="font-extrabold text-sm text-gray-900" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif" }}>M S Enterprises</p>
            <p className="text-xs text-gray-400">Facility Management</p>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-400">
          {NAV_LINKS.map((l) => {
            const id = SECTION_IDS[l] ?? "home";
            return (
              <a key={l} href={`#${id}`} onClick={(event) => { event.preventDefault(); scrollToSection(l); }}
                className="hover:text-blue-600 transition-colors">
                {l}
              </a>
            );
          })}
        </div>
        <p className="text-xs text-gray-300">© {new Date().getFullYear()} M S Enterprise. All rights reserved.</p>
      </div>
    </footer>
  );
}

/* ─── App ────────────────────────────────────────────────────────────────────── */
export default function App() {
  const [active, setActive] = useState("Home");
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <TopBar />
      <NavBar active={active} setActive={setActive} />
      <main>
        <Hero setActive={setActive} />
        <StatsSection />
        <ServicesSection />
        <GallerySection />
        <ReviewsSection />
        <ClientsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
