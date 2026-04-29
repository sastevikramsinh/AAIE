import React, { useMemo, useState } from "react";
import { CheckCircle2, Loader2, Mail, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { http } from "../api/http.js";
import { smoothScrollToId } from "../utils/scroll.js";
import mainLogo from "../assets/aaie-main-logo-transparent.png";

function scrollToId(id) {
  smoothScrollToId(id);
}

function SocialIconButton({ href, label, Icon, variant = "secondary" }) {
  const base =
    "inline-flex h-12 w-12 items-center justify-center rounded-2xl border transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30";

  const style =
    variant === "primary"
      ? "bg-primary text-white border-primary/30 hover:opacity-95"
      : "bg-surface/60 text-secondary border-secondary/10 hover:border-primary/25 hover:text-primary";

  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      aria-label={label}
      className={`${base} ${style} icon-button-premium`}
    >
      <Icon size={18} aria-hidden="true" />
    </a>
  );
}

function FooterNewsletterMini() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const emailRegex = useMemo(() => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/, []);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    const trimmed = email.trim();
    if (!trimmed) {
      setError("Email required.");
      return;
    }
    if (!emailRegex.test(trimmed)) {
      setError("Invalid email.");
      return;
    }
    if (success || loading) return;

    setLoading(true);
    try {
      // Next prompt will implement the endpoint.
      await http.post("/api/subscribe", { email: trimmed });
      setSuccess(true);
      setEmail("");
    } catch {
      setError("Could not subscribe. Try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-5">
      <div className="font-english font-bold text-secondary">Newsletter</div>
      <form onSubmit={onSubmit} className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input
          aria-label="Email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className="w-full min-h-12 rounded-xl border border-secondary/10 bg-surface/60 px-4 py-3 text-base sm:text-sm font-english outline-none placeholder:text-secondary/40 focus:ring-2 focus:ring-primary/25"
          disabled={success}
        />
        <button
          type="submit"
          disabled={success || loading}
          className="btn-premium-primary ripple-surface inline-flex min-h-12 items-center justify-center rounded-xl bg-primary px-4 text-base sm:text-sm font-english font-semibold text-white disabled:opacity-60"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : success ? <CheckCircle2 size={18} /> : "Join"}
        </button>
      </form>
      {error ? <div className="mt-2 text-sm font-english text-red-600">{error}</div> : null}
      {success ? (
        <div className="mt-2 text-sm font-english text-emerald-600">
          Thanks! 🌱
        </div>
      ) : null}
    </div>
  );
}

function AccordionPanel({
  title,
  open,
  onToggle,
  children,
  id,
}) {
  return (
    <div className="border border-secondary/10 rounded-2xl bg-surface/50">
      <button
        type="button"
        className="w-full min-h-12 text-left px-4 py-3 flex items-center justify-between gap-3 font-english font-bold text-secondary"
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
      >
        <span>{title}</span>
        <span aria-hidden="true" className="text-secondary/70">
          {open ? "–" : "+"}
        </span>
      </button>
      {open ? (
        <div id={id} className="px-4 pb-4">
          {children}
        </div>
      ) : null}
    </div>
  );
}

export default function Footer() {
  const [openKey, setOpenKey] = useState("quick");

  const dailyQuote = useMemo(() => {
    const quotes = [
      "आईच्या मायेने शिकणं सुरू करूया.",
      "Marathi मधून AI, आत्मविश्वासाकडे.",
      "समजून शिकणं हेच यश.",
      "इंग्रजीचा अडथळा कोणाच्या तरी स्वप्नांना थांबवू शकत नाही.",
    ];
    const dayIndex = Math.floor(Date.now() / 86400000) % quotes.length;
    return quotes[dayIndex];
  }, []);

  return (
    <footer className="relative bg-surface-elevated text-secondary">
      {/* top border with gradient */}
      <div
        aria-hidden="true"
        className="h-px w-full"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(220,38,38,0), rgba(220,38,38,0.45), rgba(245,158,11,0.35), rgba(220,38,38,0))",
        }}
      />

      <div className="mx-auto max-w-[1200px] px-4 py-14">
        {/* Desktop columns */}
        <div className="hidden lg:grid grid-cols-4 gap-10">
          {/* Column 1: Brand */}
          <div>
            <div className="flex items-center gap-3">
              <img src={mainLogo} alt="AAIE Logo" className="h-11 w-auto" loading="lazy" decoding="async" />
              <div>
                <div className="font-english font-bold text-secondary text-lg">AAIE</div>
                <div className="font-marathi text-secondary/70 text-xs">AI शिक्षण संस्था</div>
              </div>
            </div>

            <div className="mt-4 font-marathi text-secondary/90 leading-[1.8]">
              आईच्या मायेने, AI चं शिक्षण
            </div>
            <div className="mt-3 font-english text-sm text-secondary/70">
              Pune, Maharashtra, India
            </div>
            <div className="mt-1 font-english text-sm text-secondary/70">
              Founded: 2026
            </div>

            <div className="mt-6 rounded-2xl border border-secondary/10 bg-surface/50 px-4 py-3">
              <div className="font-english text-xs tracking-[0.18em] text-secondary/60">
                Daily Thought
              </div>
              <div className="mt-2 font-marathi text-secondary text-base leading-[1.8]">
                {dailyQuote}
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <div className="font-english font-bold text-secondary">Quick Links</div>
            <div className="mt-4 flex flex-col gap-2">
              <button type="button" onClick={() => scrollToId("about")} className="interactive-link min-h-11 text-left hover:text-primary transition-colors font-english text-base sm:text-sm text-secondary/80">
                About AAIE
              </button>
              <button type="button" onClick={() => scrollToId("mission")} className="interactive-link min-h-11 text-left hover:text-primary transition-colors font-english text-base sm:text-sm text-secondary/80">
                Mission & Vision
              </button>
              <button type="button" onClick={() => scrollToId("offers")} className="interactive-link min-h-11 text-left hover:text-primary transition-colors font-english text-base sm:text-sm text-secondary/80">
                What We Offer
              </button>
              <button type="button" onClick={() => scrollToId("founder")} className="interactive-link min-h-11 text-left hover:text-primary transition-colors font-english text-base sm:text-sm text-secondary/80">
                Founder
              </button>
              <button type="button" onClick={() => scrollToId("roadmap")} className="interactive-link min-h-11 text-left hover:text-primary transition-colors font-english text-base sm:text-sm text-secondary/80">
                Roadmap
              </button>
            </div>
          </div>

          {/* Column 3: Resources */}
          <div>
            <div className="font-english font-bold text-secondary">Resources</div>
            <div className="mt-4 flex flex-col gap-2">
              {[
                { t: "Blog (coming soon)", coming: true },
                { t: "Tutorials (coming soon)", coming: true },
                { t: "Workshops", coming: false, scrollTo: "offers" },
                { t: "Free Downloads", coming: true },
                { t: "FAQs", coming: true },
              ].map((r) =>
                r.coming ? (
                  <span key={r.t} className="text-sm font-english text-secondary/60">
                    {r.t}
                  </span>
                ) : (
                  <button
                    key={r.t}
                    type="button"
                    onClick={() => scrollToId(r.scrollTo)}
                    className="text-left hover:text-primary transition-colors font-english text-sm text-secondary/80"
                  >
                    {r.t}
                  </button>
                ),
              )}
            </div>
          </div>

          {/* Column 4: Connect */}
          <div>
            <div className="font-english font-bold text-secondary">Connect</div>
            <div className="mt-4 flex flex-col gap-3">
              <a href="mailto:founder@aaie.org.in" className="inline-flex items-center gap-2 text-sm font-english text-secondary/80 hover:text-primary transition-colors">
                <Mail size={18} aria-hidden="true" />
                founder@aaie.org.in
              </a>

              <div className="flex flex-wrap gap-3">
                <SocialIconButton href="https://www.linkedin.com/" label="LinkedIn" Icon={Linkedin} variant="primary" />
                <SocialIconButton href="https://www.youtube.com/" label="YouTube" Icon={Youtube} />
                <SocialIconButton href="https://www.instagram.com/" label="Instagram" Icon={Instagram} />
                <SocialIconButton href="https://x.com/" label="X" Icon={Twitter} />
              </div>

              <FooterNewsletterMini />
            </div>
          </div>
        </div>

        {/* Mobile: accordion */}
        <div className="lg:hidden space-y-4">
          <div>
            <div className="flex items-center gap-3">
              <img src={mainLogo} alt="AAIE Logo" className="h-11 w-auto" loading="lazy" decoding="async" />
              <div>
                <div className="font-english font-bold text-secondary text-lg">AAIE</div>
                <div className="font-marathi text-secondary/70 text-xs">AI शिक्षण संस्था</div>
              </div>
            </div>
            <div className="mt-4 font-marathi text-secondary/90 leading-[1.8]">
              आईच्या मायेने, AI चं शिक्षण
            </div>
            <div className="mt-3 font-english text-sm text-secondary/70">
              Pune, Maharashtra, India • Founded: 2026
            </div>
            <div className="mt-5 rounded-2xl border border-secondary/10 bg-surface/50 px-4 py-3">
              <div className="font-english text-xs tracking-[0.18em] text-secondary/60">
                Daily Thought
              </div>
              <div className="mt-2 font-marathi text-secondary text-base leading-[1.8]">
                {dailyQuote}
              </div>
            </div>
          </div>

          <AccordionPanel
            id="acc-quick"
            title="Quick Links"
            open={openKey === "quick"}
            onToggle={() => setOpenKey((k) => (k === "quick" ? "" : "quick"))}
          >
            <div className="flex flex-col gap-2">
              <button type="button" onClick={() => scrollToId("about")} className="text-left hover:text-primary transition-colors font-english text-sm text-secondary/80">
                About AAIE
              </button>
              <button type="button" onClick={() => scrollToId("mission")} className="text-left hover:text-primary transition-colors font-english text-sm text-secondary/80">
                Mission & Vision
              </button>
              <button type="button" onClick={() => scrollToId("offers")} className="interactive-link min-h-11 text-left hover:text-primary transition-colors font-english text-base sm:text-sm text-secondary/80">
                What We Offer
              </button>
              <button type="button" onClick={() => scrollToId("founder")} className="text-left hover:text-primary transition-colors font-english text-sm text-secondary/80">
                Founder
              </button>
              <button type="button" onClick={() => scrollToId("roadmap")} className="text-left hover:text-primary transition-colors font-english text-sm text-secondary/80">
                Roadmap
              </button>
            </div>
          </AccordionPanel>

          <AccordionPanel
            id="acc-resources"
            title="Resources"
            open={openKey === "resources"}
            onToggle={() => setOpenKey((k) => (k === "resources" ? "" : "resources"))}
          >
            <div className="flex flex-col gap-2">
              <span className="text-sm font-english text-secondary/60">Blog (coming soon)</span>
              <span className="text-sm font-english text-secondary/60">Tutorials (coming soon)</span>
              <button type="button" onClick={() => scrollToId("offers")} className="text-left hover:text-primary transition-colors font-english text-sm text-secondary/80">
                Workshops
              </button>
              <span className="text-sm font-english text-secondary/60">Free Downloads</span>
              <span className="text-sm font-english text-secondary/60">FAQs</span>
            </div>
          </AccordionPanel>

          <AccordionPanel
            id="acc-connect"
            title="Connect"
            open={openKey === "connect"}
            onToggle={() => setOpenKey((k) => (k === "connect" ? "" : "connect"))}
          >
            <div className="flex flex-col gap-3">
              <a href="mailto:founder@aaie.org.in" className="inline-flex items-center gap-2 text-sm font-english text-secondary/80 hover:text-primary transition-colors">
                <Mail size={18} aria-hidden="true" />
                founder@aaie.org.in
              </a>
              <div className="flex flex-wrap gap-3">
                <SocialIconButton href="https://www.linkedin.com/" label="LinkedIn" Icon={Linkedin} variant="primary" />
                <SocialIconButton href="https://www.youtube.com/" label="YouTube" Icon={Youtube} />
                <SocialIconButton href="https://www.instagram.com/" label="Instagram" Icon={Instagram} />
                <SocialIconButton href="https://x.com/" label="X" Icon={Twitter} />
              </div>
              <FooterNewsletterMini />
            </div>
          </AccordionPanel>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-secondary/10">
        <div className="mx-auto max-w-[1200px] px-4 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="font-english text-sm text-secondary/70">
            © 2026 AAIE. All rights reserved.
          </div>
          <div className="font-english text-sm text-secondary/70">
            Made with ❤️ in Pune
          </div>
          <div className="font-english text-sm text-secondary/70 flex gap-4">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-primary transition-colors">
              Privacy
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-primary transition-colors">
              Terms
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-primary transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

