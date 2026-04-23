import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import SectionTitle from "../components/SectionTitle";
import Reveal from "../components/Reveal";
import {
  FaEnvelope, FaGithub, FaLinkedin, FaPaperPlane,
  FaFacebook, FaInstagram, FaCheckCircle, FaExclamationCircle,
} from "react-icons/fa";

// Social link data
const socialLinks = [
  {
    icon: FaEnvelope,
    label: "Email",
    value: "chamodmadhusanka55@gmail.com",
    href: "mailto:chamodmadhusanka55@gmail.com",
    accent: "from-cyan-400 to-blue-500",
    glow: "rgba(34,211,238,0.15)",
  },
  {
    icon: FaGithub,
    label: "GitHub",
    value: "github.com/chamod419",
    href: "https://github.com/chamod419",
    accent: "from-slate-400 to-slate-600",
    glow: "rgba(148,163,184,0.12)",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/chamod-madhusanka",
    href: "https://www.linkedin.com/in/chamod-madhusanka/",
    accent: "from-blue-400 to-blue-600",
    glow: "rgba(96,165,250,0.15)",
  },
  {
    icon: FaFacebook,
    label: "Facebook",
    value: "CMNexa Facebook Page",
    href: "https://www.facebook.com/share/1LVhe3pV8y/?mibextid=wwXIfr",
    accent: "from-blue-500 to-indigo-500",
    glow: "rgba(99,102,241,0.15)",
  },
  {
    icon: FaInstagram,
    label: "Instagram",
    value: "@cmn_exa",
    href: "https://www.instagram.com/cmn_exa?igsh=MXhnejJqZ2VoaGwzcQ%3D%3D&utm_source=qr",
    accent: "from-pink-400 to-fuchsia-500",
    glow: "rgba(244,114,182,0.15)",
  },
];

// 3D tilt for social cards
function SocialCard({ link, isDark }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const springX = useSpring(rx, { stiffness: 300, damping: 28 });
  const springY = useSpring(ry, { stiffness: 300, damping: 28 });

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    rx.set(-((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * 6);
    ry.set(((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 6);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };
  const Icon = link.icon;

  return (
    <motion.a
      ref={ref}
      href={link.href}
      target={link.href.startsWith("mailto") ? undefined : "_blank"}
      rel="noreferrer"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d", perspective: 600 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className={`group relative flex items-center gap-4 overflow-hidden rounded-2xl p-4 transition-all duration-300 ${
        isDark
          ? "border border-white/8 bg-white/[0.03] hover:border-white/15"
          : "border border-slate-200 bg-white hover:border-slate-300"
      }`}
      style={{
        boxShadow: `0 4px 20px ${link.glow}`,
        rotateX: springX,
        rotateY: springY,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Left gradient bar */}
      <div className={`absolute inset-y-0 left-0 w-0.5 rounded-full bg-gradient-to-b ${link.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

      {/* Icon */}
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${link.accent} shadow-lg`}>
        <Icon className="text-base text-white" />
      </div>

      <div>
        <p className={`text-xs font-semibold uppercase tracking-wider ${isDark ? "text-gray-500" : "text-slate-400"}`}>
          {link.label}
        </p>
        <p className={`mt-0.5 text-sm font-semibold ${isDark ? "text-gray-200" : "text-slate-700"}`}>
          {link.value}
        </p>
      </div>

      {/* Hover glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-400 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle at 20% 50%, ${link.glow} 0%, transparent 60%)` }}
      />
    </motion.a>
  );
}

// Animated input field
function FloatingInput({ label, name, type = "text", value, onChange, error, placeholder, isDark, multiline = false }) {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;

  const baseClass = `w-full rounded-2xl border px-4 py-3.5 text-sm outline-none transition-all duration-300 resize-none ${
    isDark
      ? `bg-white/[0.04] text-white placeholder:text-gray-600 ${
          error
            ? "border-red-400/50 focus:border-red-400"
            : focused
            ? "border-cyan-400/60 bg-white/[0.06] shadow-[0_0_0_3px_rgba(34,211,238,0.08)]"
            : "border-white/8 hover:border-white/15"
        }`
      : `bg-slate-50 text-slate-900 placeholder:text-slate-400 ${
          error
            ? "border-red-400 focus:border-red-500"
            : focused
            ? "border-cyan-400 bg-white shadow-[0_0_0_3px_rgba(34,211,238,0.12)]"
            : "border-slate-200 hover:border-slate-300"
        }`
  }`;

  return (
    <div>
      <label className={`mb-2 block text-xs font-bold uppercase tracking-wider ${isDark ? "text-gray-400" : "text-slate-500"}`}>
        {label}
      </label>
      {multiline ? (
        <textarea
          name={name}
          rows={5}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={baseClass}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={baseClass}
        />
      )}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-400"
          >
            <FaExclamationCircle className="shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function Contact({ theme }) {
  const isDark = theme === "dark";

  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, success: "", error: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) errs.email = "Enter a valid email";
    if (!formData.subject.trim()) errs.subject = "Subject is required";
    if (!formData.message.trim()) errs.message = "Message is required";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setStatus({ loading: false, success: "", error: "" });
    if (Object.keys(validationErrors).length > 0) return;

    setStatus({ loading: true, success: "", error: "" });
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: "Chamod Portfolio Website",
        }),
      });
      const result = await response.json();
      if (result.success) {
        setStatus({ loading: false, success: "Message sent successfully! I'll get back to you soon.", error: "" });
        setFormData({ name: "", email: "", subject: "", message: "" });
        setErrors({});
      } else {
        setStatus({ loading: false, success: "", error: "Something went wrong. Please try again." });
      }
    } catch {
      setStatus({ loading: false, success: "", error: "Network error. Please try again." });
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden px-6 py-28 md:px-10">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.09, 0.04] }}
          transition={{ duration: 9, repeat: Infinity }}
          className="absolute -left-40 bottom-20 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.04, 0.08, 0.04] }}
          transition={{ duration: 11, repeat: Infinity, delay: 2 }}
          className="absolute -right-40 top-20 h-[450px] w-[450px] rounded-full bg-fuchsia-500/10 blur-[100px]"
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <SectionTitle title="Contact Me" subtitle="Get In Touch" theme={theme} />

        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          {/* Left — Info */}
          <Reveal>
            <motion.div
              whileHover={{ y: -3 }}
              className={`relative overflow-hidden rounded-[32px] p-8 md:p-10 shadow-xl ${
                isDark
                  ? "border border-white/8 bg-white/[0.03] backdrop-blur-xl"
                  : "border border-slate-200 bg-white"
              }`}
              style={{
                boxShadow: isDark
                  ? "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)"
                  : "0 20px 60px rgba(0,0,0,0.07)",
              }}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                className="mb-5 inline-flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/8 px-4 py-2 text-sm font-bold text-cyan-400"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
                </span>
                Available Now
              </motion.div>

              <h3 className={`text-2xl font-black leading-tight ${isDark ? "text-white" : "text-slate-900"}`}>
                Let's build something{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  great together
                </span>
              </h3>

              <p className={`mt-4 text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                Open to junior software roles, internships, freelance work, and
                exciting collaborations through my personal work and{" "}
                <span className="font-semibold text-cyan-400">CMNexa</span>.
              </p>

              <div className="mt-8 space-y-3">
                {socialLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <SocialCard link={link} isDark={isDark} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </Reveal>

          {/* Right — Form */}
          <Reveal delay={0.1}>
            <motion.form
              onSubmit={handleSubmit}
              whileHover={{ y: -3 }}
              className={`relative overflow-hidden rounded-[32px] p-8 md:p-10 shadow-xl ${
                isDark
                  ? "border border-white/8 bg-white/[0.03] backdrop-blur-xl"
                  : "border border-slate-200 bg-white"
              }`}
              style={{
                boxShadow: isDark
                  ? "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)"
                  : "0 20px 60px rgba(0,0,0,0.07)",
              }}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent" />

              <h3 className={`mb-7 text-xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
                Send a Message
              </h3>

              <div className="grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <FloatingInput label="Your Name" name="name" value={formData.name} onChange={handleChange} error={errors.name} placeholder="John Doe" isDark={isDark} />
                  <FloatingInput label="Your Email" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} placeholder="john@example.com" isDark={isDark} />
                </div>

                <FloatingInput label="Subject" name="subject" value={formData.subject} onChange={handleChange} error={errors.subject} placeholder="What's this about?" isDark={isDark} />
                <FloatingInput label="Message" name="message" value={formData.message} onChange={handleChange} error={errors.message} placeholder="Tell me about your project..." isDark={isDark} multiline />

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={status.loading}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 font-bold text-white shadow-[0_4px_24px_rgba(34,211,238,0.35)] transition-all duration-300 hover:shadow-[0_8px_32px_rgba(34,211,238,0.5)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {/* Shimmer */}
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                  {status.loading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <motion.span
                        animate={{ x: [0, 3, 0], y: [0, -3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <FaPaperPlane className="text-sm" />
                      </motion.span>
                    </>
                  )}
                </motion.button>

                {/* Status messages */}
                <AnimatePresence>
                  {status.success && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-3 rounded-2xl border border-emerald-400/25 bg-emerald-400/10 px-5 py-4"
                    >
                      <FaCheckCircle className="shrink-0 text-lg text-emerald-400" />
                      <p className="text-sm font-semibold text-emerald-400">{status.success}</p>
                    </motion.div>
                  )}
                  {status.error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-3 rounded-2xl border border-red-400/25 bg-red-400/10 px-5 py-4"
                    >
                      <FaExclamationCircle className="shrink-0 text-lg text-red-400" />
                      <p className="text-sm font-semibold text-red-400">{status.error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default Contact;