import {
  Activity,
  ArrowRight,
  Bot,
  CheckCircle,
  Clock,
  Menu,
  MessageCircle,
  MessageSquare,
  Users,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const DEMO_URL =
  "https://creator.voiceflow.com/share/69cc2df355e9b29ca791d6b2/development";
const WA_URL = "https://wa.me/916305572091";

function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const PARTICLE_COUNT = 80;
    const CONNECT_DIST = 120;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
    }

    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      resize();
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 1,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(45,212,191,0.6)";
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.25;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(37,99,235,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    init();
    draw();
    window.addEventListener("resize", init);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.6,
      }}
    />
  );
}

const NAV_LINKS = [
  { label: "Benefits", href: "#benefits" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Reviews", href: "#reviews" },
];

function Navbar() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header
      className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-sm border-b border-border"
      data-ocid="nav.panel"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <a
          href="#hero"
          aria-label="FlowAI home"
          data-ocid="nav.link"
          className="font-display font-extrabold text-xl tracking-tight text-foreground"
        >
          Flow<span className="text-primary">AI</span>
        </a>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-ocid="nav.link"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Book Demo CTA (always visible) */}
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="nav.primary_button"
            className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-blue-700 transition-colors shadow-md"
          >
            Book Demo
          </a>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            data-ocid="nav.toggle"
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-foreground hover:bg-white/10 transition-colors"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden bg-background/95 backdrop-blur border-b border-border"
            data-ocid="nav.panel"
          >
            <nav className="flex flex-col px-4 py-4 gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  data-ocid="nav.link"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground py-3 px-3 rounded-lg hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                data-ocid="nav.primary_button"
                className="mt-2 inline-flex items-center justify-center gap-2 bg-blue-600 text-white text-sm font-semibold px-5 py-3 rounded-full hover:bg-blue-700 transition-colors shadow-md"
              >
                Book Demo
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8" id="hero">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative rounded-3xl overflow-hidden px-8 py-20 sm:px-16 sm:py-28 text-center"
          style={{
            background:
              "linear-gradient(135deg, #0d1b3e 0%, #1a2f5a 50%, #0e2044 100%)",
          }}
        >
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/70 text-xs font-medium px-4 py-1.5 rounded-full mb-6 border border-white/15">
              <Zap className="w-3 h-3" />
              AI Automation for Small Businesses
            </div>

            <h1 className="font-display font-extrabold text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tight max-w-4xl mx-auto mb-6">
              Get More Leads &amp; Bookings{" "}
              <span className="text-white/60">Automatically</span> with AI
            </h1>

            <p className="text-white/55 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              We help businesses automate replies, capture leads, and book
              appointments using AI.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="hero.primary_button"
                className="inline-flex items-center gap-2 bg-teal-400 text-gray-950 font-semibold text-base px-8 py-3.5 rounded-full hover:bg-teal-300 transition-colors shadow-lg"
              >
                Try Demo
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="hero.secondary_button"
                className="inline-flex items-center gap-2 text-white/70 border border-white/20 font-medium text-base px-8 py-3.5 rounded-full hover:bg-white/10 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const trustBadges = [
  {
    icon: <Users className="w-5 h-5" />,
    stat: "50+",
    label: "Businesses Served",
  },
  {
    icon: <Clock className="w-5 h-5" />,
    stat: "< 60s",
    label: "Average Response Time",
  },
  {
    icon: <Activity className="w-5 h-5" />,
    stat: "24/7",
    label: "Always Active",
  },
];

function TrustBadgesSection() {
  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8" data-ocid="trust.section">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {trustBadges.map((badge, i) => (
            <div
              key={badge.label}
              data-ocid={`trust.item.${i + 1}`}
              className="flex items-center gap-3 bg-card border border-border rounded-full px-6 py-3 shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="text-primary">{badge.icon}</span>
              <span className="font-display font-extrabold text-foreground text-lg leading-none">
                {badge.stat}
              </span>
              <span className="text-muted-foreground text-sm font-medium">
                {badge.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function DemoSection() {
  return (
    <section id="demo" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-4 tracking-tight">
            See FlowAI in Action
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
            Watch how our AI handles customer messages, captures leads, and
            books appointments — all in real-time.
          </p>

          <div className="relative inline-block">
            <div className="absolute inset-0 rounded-3xl bg-primary/10 blur-xl scale-105" />
            <div className="relative bg-card border border-border rounded-3xl p-10 sm:p-14 shadow-card">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <p className="text-foreground font-semibold text-lg mb-2">
                Interactive AI Demo
              </p>
              <p className="text-muted-foreground text-sm mb-8 max-w-xs mx-auto">
                Chat with FlowAI and see how it responds to real customer
                inquiries.
              </p>
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="demo.primary_button"
                className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold text-base px-8 py-3.5 rounded-full hover:bg-blue-700 transition-colors"
              >
                Launch Demo
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const benefits = [
  {
    emoji: "⚡",
    title: "Instant Replies",
    description: "Never miss a customer message. AI responds 24/7 in seconds.",
  },
  {
    emoji: "🎯",
    title: "Capture Leads",
    description:
      "Automatically collect names, numbers, and intent from every conversation.",
  },
  {
    emoji: "📅",
    title: "Book 24/7",
    description:
      "Appointments booked while you sleep — no back-and-forth needed.",
  },
  {
    emoji: "💰",
    title: "Save Time & Revenue",
    description:
      "Free up your team to focus on what matters most: your customers.",
  },
];

function BenefitsSection() {
  return (
    <section
      id="benefits"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground tracking-tight">
            Why Businesses Love FlowAI
          </h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-xl mx-auto">
            From gyms to clinics — we automate the conversations that drive
            growth.
          </p>
        </motion.div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          data-ocid="benefits.list"
        >
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              data-ocid={`benefits.item.${i + 1}`}
              className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-4">{b.emoji}</div>
              <h3 className="font-display font-bold text-base text-foreground mb-2">
                {b.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {b.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const reviews = [
  {
    name: "Priya Sharma",
    business: "Fitness Studio",
    quote:
      "FlowAI completely transformed how we handle inquiries. We went from missing leads to booking 3x more classes in just two weeks.",
    initials: "PS",
  },
  {
    name: "Ravi Menon",
    business: "Hair Salon",
    quote:
      "Our receptionist used to spend hours on WhatsApp. Now the AI handles it all — clients love the instant replies.",
    initials: "RM",
  },
  {
    name: "Ananya Reddy",
    business: "Dental Clinic",
    quote:
      "The appointment automation is flawless. Patients book 24/7 and we never miss a slot. Highly recommend.",
    initials: "AR",
  },
];

function ReviewsSection() {
  return (
    <section id="reviews" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground tracking-tight">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-xl mx-auto">
            Real businesses, real results — see how FlowAI is changing the game.
          </p>
        </motion.div>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          data-ocid="reviews.list"
        >
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              data-ocid={`reviews.item.${i + 1}`}
              className="bg-card border border-border rounded-2xl p-7 flex flex-col gap-4 hover:shadow-md transition-shadow"
            >
              <div className="text-amber-400 text-lg leading-none tracking-wider">
                ★★★★★
              </div>
              <p className="text-foreground/80 text-sm leading-relaxed flex-1">
                &ldquo;{r.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-border">
                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {r.initials}
                </div>
                <div>
                  <p className="text-foreground font-semibold text-sm">
                    {r.name}
                  </p>
                  <p className="text-muted-foreground text-xs">{r.business}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    num: "01",
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Customer Messages",
    description:
      "Your customer sends a message on WhatsApp, Instagram, or your website.",
  },
  {
    num: "02",
    icon: <Bot className="w-6 h-6" />,
    title: "AI Replies Instantly",
    description:
      "FlowAI responds in seconds with a helpful, human-like message.",
  },
  {
    num: "03",
    icon: <CheckCircle className="w-6 h-6" />,
    title: "Lead Captured & Booked",
    description:
      "Contact is saved and appointment is confirmed — automatically.",
  },
];

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground tracking-tight">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-xl mx-auto">
            Three simple steps — from first message to booked appointment.
          </p>
        </motion.div>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 relative"
          data-ocid="steps.list"
        >
          <div className="hidden md:block absolute top-10 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-border z-0" />

          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              data-ocid={`steps.item.${i + 1}`}
              className="relative z-10 text-center"
            >
              <div className="w-20 h-20 rounded-2xl bg-blue-600 flex items-center justify-center mx-auto mb-5 shadow-md">
                <span className="text-white">{s.icon}</span>
              </div>
              <div className="text-xs font-bold text-muted-foreground tracking-widest mb-2">
                STEP {s.num}
              </div>
              <h3 className="font-display font-bold text-lg text-foreground mb-2">
                {s.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                {s.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section id="cta" className="py-8 px-4 sm:px-6 lg:px-8 mb-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden px-8 py-20 sm:px-16 text-center"
          style={{
            background:
              "linear-gradient(135deg, #0d1b3e 0%, #1a2f5a 50%, #0e2044 100%)",
          }}
        >
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div className="relative z-10">
            <h2 className="font-display font-extrabold text-white text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
              Want this for your business?
            </h2>
            <p className="text-white/55 text-lg mb-10 max-w-lg mx-auto">
              Join hundreds of small businesses already automating their growth
              with FlowAI.
            </p>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="cta.primary_button"
              className="inline-flex items-center gap-2 bg-teal-400 text-gray-950 font-bold text-base px-10 py-4 rounded-full hover:bg-teal-300 transition-colors shadow-lg"
            >
              Book Free Demo
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-display font-extrabold text-lg tracking-tight text-foreground">
          Flow<span className="text-primary">AI</span>
        </span>
        <div className="flex flex-col sm:flex-row items-center gap-3 text-sm text-muted-foreground">
          <span>© {year} FlowAI. All rights reserved.</span>
          <span className="hidden sm:inline text-border">·</span>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Built with ❤️ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-background/80 font-body relative">
      <FloatingParticles />
      <div className="relative z-10">
        <Navbar />
        <main>
          <HeroSection />
          <TrustBadgesSection />
          <DemoSection />
          <BenefitsSection />
          <ReviewsSection />
          <HowItWorksSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
