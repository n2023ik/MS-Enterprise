import { useState, useEffect, useRef, type FormEvent } from "react";
import { createRoot } from "react-dom/client";
import { Phone, MapPin, Clock, Menu, X, Mail, Award, CheckCircle2, ArrowRight, Briefcase, Users, TrendingUp, ShieldCheck } from "lucide-react";
import { motion, useInView, animate } from "motion/react";
import "./styles/index.css";

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

/* ─── Helpers ────────────────────────────────────────────────────────────────── */
function useReveal() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  return { ref, inView };
}

function SectionLabel({ text, color }: { text: string; color: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
      style={{ background: color + "15", color }}>
      {text}
    </span>
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

  return (
    <motion.header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100"
      initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-40">
        <a href="/" className="flex items-center gap-2">
          <motion.img
            src="/assets/ams-logo.png"
            alt="MS Enterprises Logo"
            className="w-32 h-32 select-none object-contain"
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} />
          <div className="text-left">
            <p className="font-extrabold text-sm leading-tight" style={{ color: COLORS.navy, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>M S Enterprises</p>
            <p className="text-xs leading-tight text-gray-400">Facility Management</p>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-7">
          <a href="/" className="text-sm font-semibold pb-0.5 text-gray-600 hover:text-blue-600 transition-colors">Home</a>
          <a href="/#services" className="text-sm font-semibold pb-0.5 text-gray-600 hover:text-blue-600 transition-colors">Services</a>
          <a href="/#gallery" className="text-sm font-semibold pb-0.5 text-gray-600 hover:text-blue-600 transition-colors">Products</a>
          <a href="/#clients" className="text-sm font-semibold pb-0.5 text-gray-600 hover:text-blue-600 transition-colors">Clients</a>
          <motion.button type="button"
            className="text-sm font-semibold pb-0.5 relative"
            style={{ color: COLORS.blue }}>
            Careers
            <motion.div className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full"
              style={{ background: COLORS.blue }} layoutId="ul" />
          </motion.button>
          <a href="/#contact" className="text-sm font-semibold pb-0.5 text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
        </nav>

        <motion.a href="/#contact"
          className="hidden md:inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl text-white"
          style={{ background: `linear-gradient(135deg, ${COLORS.blue} 0%, ${COLORS.navy} 100%)` }}
          whileHover={{ scale: 1.04, opacity: 0.92 }} whileTap={{ scale: 0.97 }}>
          <Phone size={14} /> Contact
        </motion.a>

        <button type="button" className="md:hidden p-2 text-gray-700" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <motion.div className="md:hidden bg-white border-t border-gray-100 px-6 pb-5 pt-3 flex flex-col gap-3"
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
          <a href="/" className="text-sm font-semibold text-left py-1 text-gray-600 hover:text-blue-600">Home</a>
          <a href="/#services" className="text-sm font-semibold text-left py-1 text-gray-600 hover:text-blue-600">Services</a>
          <a href="/#gallery" className="text-sm font-semibold text-left py-1 text-gray-600 hover:text-blue-600">Products</a>
          <a href="/#clients" className="text-sm font-semibold text-left py-1 text-gray-600 hover:text-blue-600">Clients</a>
          <span className="text-sm font-semibold text-left py-1" style={{ color: COLORS.blue }}>Careers</span>
          <a href="/#contact" className="text-sm font-semibold text-left py-1 text-gray-600 hover:text-blue-600">Contact</a>
        </motion.div>
      )}
    </motion.header>
  );
}

/* ─── Careers Hero ───────────────────────────────────────────────────────────── */
function CareersHero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 px-6 py-16 md:py-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-32 h-[520px] w-[520px] rounded-full bg-purple-600/20 blur-3xl" />
        <div className="absolute -bottom-48 -left-32 h-[520px] w-[520px] rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)", backgroundSize: "42px 42px" }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-[1.08fr_.92fr] gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel text="Build Your Future With Us" color="#a78bfa" />

            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-tight text-white"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Work with purpose.
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-blue-300 to-cyan-300">
                Grow with M S Enterprises.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base md:text-lg leading-8 text-slate-300">
              Join a growing facility-management team where dependable people,
              practical skills, and great service make a real difference every day.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href="#apply"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 shadow-xl hover:-translate-y-0.5 transition-transform">
                Explore Opportunities <ArrowRight size={17} />
              </a>
              <a href="mailto:msenterprisescontact41@gmail.com"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white backdrop-blur hover:bg-white/10 transition-colors">
                <Mail size={17} /> Send Your Resume
              </a>
            </div>

            <div className="mt-9 grid grid-cols-3 max-w-xl border-t border-white/10 pt-6">
              {[
                ["24/7", "Operations"],
                ["9+", "Career Paths"],
                ["1", "Trusted Team"],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="text-2xl font-extrabold text-white">{value}</p>
                  <p className="mt-1 text-xs text-slate-400">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 25, scale: .96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: .1 }}
          >
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-4 shadow-2xl backdrop-blur-xl">
              <div className="rounded-[1.5rem] bg-gradient-to-br from-violet-500/25 via-blue-500/15 to-cyan-500/20 p-7 md:p-9">
                <div className="flex items-center justify-between">
                  <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/15">
                    <Users className="text-white" size={26} />
                  </div>
                  <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-300">
                    We're Hiring
                  </span>
                </div>

                <h2 className="mt-8 text-2xl md:text-3xl font-extrabold text-white">
                  Find a role that fits your skills.
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  From housekeeping and manpower to technical support and
                  supervision, there are multiple ways to become part of our team.
                </p>

                <div className="mt-7 space-y-3">
                  {[
                    ["Housekeeping & Manpower", "Operations"],
                    ["IT Support & AMC", "Technical"],
                    ["Supervision & Administration", "Management"],
                  ].map(([role, type]) => (
                    <div key={role} className="flex items-center justify-between rounded-xl border border-white/10 bg-black/10 px-4 py-3">
                      <div>
                        <p className="text-sm font-semibold text-white">{role}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{type}</p>
                      </div>
                      <ArrowRight size={15} className="text-slate-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <motion.div
              className="absolute -bottom-5 -left-5 rounded-2xl border border-white/10 bg-white p-4 shadow-2xl"
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <TrendingUp size={19} className="text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Your growth</p>
                  <p className="text-sm font-extrabold text-slate-900">Starts here</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Careers Form Section ───────────────────────────────────────────────────── */
function CareersFormSection() {
  const [form, setForm] = useState({ name:"", email:"", phone:"", position:"", message:"", resumeLink:"" });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { ref, inView } = useReveal();

  const positions = [
    "Housekeeping Staff",
    "IT Support & AMC Services",
    "Facilities Manager",
    "Pest Control Technician",
    "Horticulture Specialist",
    "Office Administrator",
    "Manpower - General",
    "Supervisor/Team Lead",
    "Other",
  ];

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
        setForm({ name:"", email:"", phone:"", position:"", message:"", resumeLink:"" });
        setTimeout(() => setSent(false), 4500);
      } else {
        const body = await response.json().catch(() => null);
        setError(body?.error || "Unable to submit application. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section ref={ref} id="apply" className="bg-slate-50 px-6 py-20 md:py-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <SectionLabel text="Your Next Opportunity" color={COLORS.purple} />
          <h2 className="mt-5 text-3xl md:text-4xl font-extrabold text-slate-900"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Ready to take the next step?
          </h2>
          <p className="mt-4 text-slate-500 leading-7">
            Tell us what you can do, choose an area of interest, and send your CV.
            We’ll review your application for current or upcoming opportunities.
          </p>
        </motion.div>

        <div className="mt-12 grid lg:grid-cols-[.82fr_1.18fr] gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: .1 }}
            className="space-y-4"
          >
            {[
              {
                icon: Briefcase,
                title: "Meaningful work",
                text: "Contribute to services that keep workplaces clean, safe and running smoothly.",
              },
              {
                icon: TrendingUp,
                title: "Room to grow",
                text: "Build practical experience and take on more responsibility as you develop.",
              },
              {
                icon: ShieldCheck,
                title: "A dependable team",
                text: "Work with people who value reliability, discipline and quality service.",
              },
            ].map(({ icon: Icon, title, text: itemText }) => (
              <div key={title} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all">
                <div className="flex gap-4">
                  <div className="h-11 w-11 shrink-0 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-white">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900">{title}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-slate-500">{itemText}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="rounded-2xl bg-slate-950 p-6 text-white shadow-xl">
              <p className="text-xs font-bold uppercase tracking-[.18em] text-violet-300">Prefer email?</p>
              <h3 className="mt-2 text-xl font-extrabold">Send your CV directly</h3>
              <a href="mailto:msenterprisescontact41@gmail.com"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-white hover:text-violet-200 break-all">
                <Mail size={16} /> msenterprisescontact41@gmail.com
              </a>
              <p className="mt-3 text-xs text-slate-400">PDF, DOC and DOCX accepted.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 18 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: .15 }}
          >
            {sent ? (
              <motion.div
                className="min-h-[560px] rounded-3xl border border-emerald-200 bg-white p-10 text-center shadow-xl flex flex-col items-center justify-center"
                initial={{ opacity: 0, scale: .96 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="h-20 w-20 rounded-full bg-emerald-50 flex items-center justify-center">
                  <CheckCircle2 size={38} className="text-emerald-600" />
                </div>
                <h3 className="mt-6 text-2xl font-extrabold text-slate-900">Application received!</h3>
                <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
                  Thanks for your interest in M S Enterprises. We’ll review your details and contact you if your profile matches an opportunity.
                </p>
              </motion.div>
            ) : (
              <form
                action="https://formspree.io/f/xzepvrqj"
                method="POST"
                onSubmit={handleSubmit}
                className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-xl"
              >
                <input type="hidden" name="_subject" value="Career application from M S Enterprises website" />
                <div className="flex items-start justify-between gap-4 mb-7">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[.16em] text-violet-600">Application Form</p>
                    <h3 className="mt-1 text-2xl font-extrabold text-slate-900">Join the team</h3>
                  </div>
                  <div className="hidden sm:flex h-11 w-11 rounded-xl bg-violet-50 items-center justify-center">
                    <Award size={20} className="text-violet-600" />
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-2">Full Name *</label>
                    <input required type="text" name="name" placeholder="Enter your full name"
                      value={form.name} onChange={(e) => setForm({...form, name:e.target.value})}
                      className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-sm outline-none focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition" />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { k:"email", l:"Email", t:"email", p:"you@email.com" },
                      { k:"phone", l:"Phone", t:"tel", p:"+91 00000 00000" },
                    ].map(({k,l,t,p}) => (
                      <div key={k}>
                        <label className="block text-xs font-bold text-slate-600 mb-2">{l} *</label>
                        <input required type={t} name={k} placeholder={p} value={(form as any)[k]}
                          onChange={(e) => setForm({...form,[k]:e.target.value})}
                          className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-sm outline-none focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition" />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-2">Position of Interest *</label>
                    <select required name="position" value={form.position}
                      onChange={(e) => setForm({...form, position:e.target.value})}
                      className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-sm outline-none focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition">
                      <option value="">Select a position...</option>
                      {positions.map(pos => <option key={pos} value={pos}>{pos}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-2">About You</label>
                    <textarea name="message" rows={4}
                      placeholder="Briefly tell us about your experience, skills or the kind of work you’re looking for..."
                      value={form.message} onChange={(e) => setForm({...form, message:e.target.value})}
                      className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-sm outline-none resize-none focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-2">Resume / CV Link *</label>
                    <input required type="url" name="resume_link"
                      placeholder="Paste Google Drive, Dropbox, or OneDrive resume link"
                      value={form.resumeLink}
                      onChange={(e) => setForm({...form, resumeLink:e.target.value})}
                      className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-sm outline-none focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition" />
                    <p className="mt-2 text-xs leading-5 text-slate-400">
                      Make sure the link is shared publicly or set to anyone with the link can view.
                    </p>
                  </div>

                  {error && <p className="text-sm font-medium text-red-600">{error}</p>}

                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: .99 }}
                    className="w-full rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-violet-600/20 disabled:opacity-60"
                  >
                    {submitting ? "Submitting Application..." : "Submit Application →"}
                  </motion.button>

                  <p className="text-center text-[11px] leading-5 text-slate-400">
                    Your details will only be used for career consideration by M S Enterprises.
                  </p>
                </div>
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
    <footer className="py-12 px-6 border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <img src="/assets/ams-logo.png" alt="MS Enterprises Logo" className="w-20 h-20 object-contain" />
          <div>
            <p className="font-extrabold text-sm text-gray-900" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif" }}>M S Enterprises</p>
            <p className="text-xs text-gray-400">Facility Management</p>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-400">
          <a href="/" className="hover:text-blue-600 transition-colors">Home</a>
          <a href="/#services" className="hover:text-blue-600 transition-colors">Services</a>
          <a href="/#gallery" className="hover:text-blue-600 transition-colors">Products</a>
          <a href="/#clients" className="hover:text-blue-600 transition-colors">Clients</a>
          <a href="/careers.html" className="hover:text-blue-600 transition-colors">Careers</a>
          <a href="/#contact" className="hover:text-blue-600 transition-colors">Contact</a>
        </div>
        <p className="text-xs text-gray-300">© {new Date().getFullYear()} M S Enterprise. All rights reserved.</p>
      </div>
    </footer>
  );
}

/* ─── Careers App ────────────────────────────────────────────────────────────── */
export default function CareersApp() {
  const [active, setActive] = useState("Careers");
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <TopBar />
      <NavBar active={active} setActive={setActive} />
      <main>
        <CareersHero />
        <CareersFormSection />
      </main>
      <Footer />
    </div>
  );
}

createRoot(document.getElementById("careers-root")!).render(<CareersApp />);
