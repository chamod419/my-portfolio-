import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { FaGithub, FaLinkedin, FaArrowRight, FaDownload } from "react-icons/fa";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const roles = ["React Developer", "ASP.NET Developer", "Frontend Enthusiast", "Problem Solver", "Full Stack Engineer"];

// Particle Canvas
function ParticleCanvas({ isDark }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.3;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.color = Math.random() > 0.5 ? "34,211,238" : "99,102,241";
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < 120; i++) particles.push(new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => { p.update(); p.draw(); });
      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(34,211,238,${0.06 * (1 - dist / 80)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, [isDark]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-60" />;
}

// 3D Tilt Card
function TiltCard({ children, isDark }) {
  const cardRef = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    rotateX.set(-dy * 10);
    rotateY.set(dx * 10);
  };
  const handleMouseLeave = () => { rotateX.set(0); rotateY.set(0); };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d", perspective: 1000 }}
      className="relative"
    >
      {children}
    </motion.div>
  );
}

function Hero({ theme }) {
  const isDark = theme === "dark";
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout;
    if (!isDeleting && text.length < currentRole.length) {
      timeout = setTimeout(() => setText(currentRole.slice(0, text.length + 1)), 80);
    } else if (!isDeleting && text.length === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1400);
    } else if (isDeleting && text.length > 0) {
      timeout = setTimeout(() => setText(currentRole.slice(0, text.length - 1)), 40);
    } else if (isDeleting && text.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setGlowPos({ x: (clientX / innerWidth) * 100, y: (clientY / innerHeight) * 100 });
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden px-6 pt-28 md:px-10"
    >
      {/* Animated mesh background */}
      <div className="pointer-events-none absolute inset-0">
        <ParticleCanvas isDark={isDark} />

        {/* Dynamic cursor glow */}
        <div
          className="absolute h-[600px] w-[600px] rounded-full opacity-20 blur-[100px] transition-all duration-1000 ease-out"
          style={{
            background: "radial-gradient(circle, rgba(34,211,238,0.4) 0%, rgba(99,102,241,0.2) 50%, transparent 70%)",
            left: `${glowPos.x}%`,
            top: `${glowPos.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Static blobs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-32 top-24 h-96 w-96 rounded-full bg-cyan-500/20 blur-[80px]"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -right-24 top-16 h-[500px] w-[500px] rounded-full bg-violet-600/15 blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.18, 0.08] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-fuchsia-500/15 blur-[80px]"
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(34,211,238,1) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="mx-auto grid min-h-[calc(100vh-112px)] max-w-7xl items-center gap-14 md:grid-cols-2">
        {/* Left Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="relative z-10"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <motion.div
              animate={{ boxShadow: ["0 0 0 0 rgba(34,211,238,0.3)", "0 0 0 8px rgba(34,211,238,0)", "0 0 0 0 rgba(34,211,238,0)"] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center gap-2.5 rounded-full border border-cyan-400/25 bg-cyan-400/8 px-4 py-2 text-sm font-medium text-cyan-300"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
              </span>
              Available for Opportunities
            </motion.div>
          </motion.div>

          <motion.p variants={itemVariants} className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-cyan-400/80">
            Junior Software Developer
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className={`max-w-3xl text-5xl font-black leading-[1.06] md:text-6xl xl:text-7xl ${isDark ? "text-white" : "text-slate-900"}`}
          >
            Hi, I'm{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                Chamod
              </span>
            </span>
            <br />
            <span className={isDark ? "text-white" : "text-slate-900"}>Madhusanka</span>
          </motion.h1>

          {/* Animated role text */}
          <motion.div variants={itemVariants} className="mt-5 flex h-10 items-center">
            <div className="flex items-center gap-2">
              <div className="h-5 w-0.5 animate-pulse rounded-full bg-cyan-400" />
              <p className="text-xl font-bold text-cyan-400 md:text-2xl">
                {text}
                <span className="ml-0.5 inline-block h-6 w-0.5 animate-blink bg-cyan-400 align-middle" />
              </p>
            </div>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className={`mt-5 max-w-xl text-base leading-relaxed md:text-lg ${isDark ? "text-gray-400" : "text-slate-500"}`}
          >
            Software Engineering undergraduate building modern, responsive, and
            user-friendly web applications with{" "}
            <span className="font-semibold text-cyan-400">React, ASP.NET, C#</span>,
            JavaScript, and SQL.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-3">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-3.5 font-bold text-white shadow-[0_4px_24px_rgba(34,211,238,0.4)] transition-all duration-300 hover:shadow-[0_8px_32px_rgba(34,211,238,0.55)]"
            >
              View Projects
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              >
                <FaArrowRight className="text-sm" />
              </motion.span>
            </motion.a>

            <motion.a
              href="/Chamod-Madhusanka-CV.pdf"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className={`inline-flex items-center gap-2.5 rounded-2xl px-7 py-3.5 font-bold transition-all duration-300 ${
                isDark
                  ? "border border-white/15 bg-white/5 text-white hover:bg-white/10 hover:border-white/25"
                  : "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 hover:border-slate-300"
              }`}
            >
              <FaDownload className="text-sm text-cyan-400" />
              Download CV
            </motion.a>
          </motion.div>

          {/* Social links */}
          <motion.div variants={itemVariants} className="mt-6 flex items-center gap-3">
            {[
              { icon: FaGithub, label: "GitHub", href: "https://github.com/chamod419" },
              { icon: FaLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/chamod-madhusanka/" },
            ].map(({ icon: Icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isDark
                    ? "border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:border-white/20"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                <Icon className="text-base" />
                {label}
              </motion.a>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="mt-8 flex gap-4">
            {[
              { label: "Experience", value: "Real‑World", accent: true },
              { label: "Projects", value: "15+", accent: false },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -4, scale: 1.02 }}
                className={`rounded-2xl px-6 py-4 transition-all duration-300 ${
                  isDark
                    ? "border border-white/10 bg-white/5 hover:bg-white/8 hover:border-cyan-400/20"
                    : "border border-slate-200 bg-white hover:border-cyan-300"
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">{stat.label}</p>
                <h3 className={`mt-1.5 text-xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
                  {stat.value}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right 3D Card */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex justify-center"
        >
          <TiltCard isDark={isDark}>
            {/* Floating orbit rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-8 rounded-full border border-dashed border-cyan-400/15"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-16 rounded-full border border-dashed border-violet-400/10"
            />

            {/* Floating dots on rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-8"
            >
              <div className="absolute top-0 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            </motion.div>

            {/* Glow backdrop */}
            <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-violet-500/20 blur-3xl" />

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className={`relative rounded-[32px] p-7 shadow-2xl ${
                isDark
                  ? "border border-white/10 bg-[#0a0f28]/80 backdrop-blur-2xl"
                  : "border border-slate-200 bg-white/90 backdrop-blur-xl"
              }`}
              style={{ boxShadow: isDark ? "0 24px 64px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.07)" : "0 24px 64px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.9)" }}
            >
              {/* Inner shimmer */}
              <div className="absolute inset-x-0 top-0 h-px rounded-t-[32px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

              <div className="flex flex-col items-center text-center">
                {/* Profile image */}
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 opacity-70"
                    style={{ filter: "blur(2px)" }}
                  />
                  <motion.img
                    whileHover={{ scale: 1.06 }}
                    src="/profile.jpg"
                    alt="Chamod Madhusanka"
                    className="relative h-40 w-40 rounded-full border-4 border-transparent object-cover shadow-xl"
                    style={{ boxShadow: "0 0 24px rgba(34,211,238,0.3)" }}
                  />
                  {/* Online indicator */}
                  <div className="absolute bottom-2 right-2 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#0a0f28] bg-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  </div>
                </div>

                <h3 className={`mt-5 text-2xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
                  Chamod Madhusanka
                </h3>
                <p className={`mt-1.5 text-sm font-medium ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                  Software Engineering Undergraduate
                </p>

                {/* Tech badges */}
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {["React", "ASP.NET", "C#", "JS", "SQL"].map((skill, i) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.07 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                        isDark
                          ? "border border-white/10 bg-white/5 text-gray-200 hover:border-cyan-400/30 hover:bg-cyan-400/8"
                          : "border border-slate-200 bg-slate-50 text-slate-600 hover:border-cyan-300"
                      }`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>

                {/* Status card */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="mt-5 w-full rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 to-blue-500/5 p-4"
                >
                  <p className={`text-sm leading-6 ${isDark ? "text-gray-300" : "text-slate-600"}`}>
                    Building clean, responsive, and user-friendly software with strong UI & practical functionality.
                  </p>
                </motion.div>

                {/* Availability bar */}
                <div className={`mt-4 flex w-full items-center gap-2.5 rounded-xl px-4 py-2.5 ${isDark ? "bg-emerald-500/10 border border-emerald-500/20" : "bg-emerald-50 border border-emerald-200"}`}>
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  <p className={`text-xs font-semibold ${isDark ? "text-emerald-400" : "text-emerald-600"}`}>
                    Open to new opportunities
                  </p>
                </div>
              </div>
            </motion.div>
          </TiltCard>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className={`text-xs font-medium tracking-widest ${isDark ? "text-gray-500" : "text-slate-400"}`}>SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className={`flex h-12 w-7 items-start justify-center rounded-full border p-2 ${isDark ? "border-white/15" : "border-slate-300"}`}
        >
          <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-b from-cyan-400 to-blue-500" />
        </motion.div>
      </motion.a>
    </section>
  );
}

export default Hero;