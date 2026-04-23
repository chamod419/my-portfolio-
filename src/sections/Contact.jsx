import { useState } from "react";
import SectionTitle from "../components/SectionTitle";
import Reveal from "../components/Reveal";
import { FaEnvelope, FaGithub, FaLinkedin, FaPaperPlane } from "react-icons/fa";

function Contact({ theme }) {
  const isDark = theme === "dark";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const mailSubject = encodeURIComponent(
      `${formData.subject} - from ${formData.name}`
    );

    const mailBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );

    window.location.href = `mailto:chamodmadhusanka55@gmail.com?subject=${mailSubject}&body=${mailBody}`;
  };

  const inputClass = isDark
    ? "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-cyan-400"
    : "w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500";

  const errorClass = "mt-2 text-sm text-red-400";

  return (
    <section id="contact" className="px-6 py-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionTitle title="Contact Me" subtitle="Get In Touch" theme={theme} />

        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div
              className={`rounded-[30px] p-8 md:p-10 ${
                isDark
                  ? "border border-white/10 bg-white/5"
                  : "border border-slate-300 bg-white"
              }`}
            >
              <h3
                className={`text-2xl font-bold ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                Let’s build something great
              </h3>

              <p
                className={`mt-5 text-lg leading-8 ${
                  isDark ? "text-gray-300" : "text-slate-600"
                }`}
              >
                I’m open to junior software roles, internship opportunities,
                freelance work, and exciting collaborations.
              </p>

              <div className="mt-8 space-y-4">
                <a
                  href="mailto:chamodmadhusanka55@gmail.com"
                  className={`flex items-center gap-4 rounded-2xl p-4 transition hover:-translate-y-1 ${
                    isDark
                      ? "border border-white/10 bg-white/5"
                      : "border border-slate-300 bg-slate-50"
                  }`}
                >
                  <div className="text-cyan-400">
                    <FaEnvelope size={20} />
                  </div>
                  <div>
                    <p className={isDark ? "text-gray-400" : "text-slate-500"}>
                      Email
                    </p>
                    <p className={isDark ? "text-white" : "text-slate-900"}>
                      chamodmadhusanka55@gmail.com
                    </p>
                  </div>
                </a>

                <a
                  href="https://github.com/chamod419"
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center gap-4 rounded-2xl p-4 transition hover:-translate-y-1 ${
                    isDark
                      ? "border border-white/10 bg-white/5"
                      : "border border-slate-300 bg-slate-50"
                  }`}
                >
                  <div className="text-cyan-400">
                    <FaGithub size={20} />
                  </div>
                  <div>
                    <p className={isDark ? "text-gray-400" : "text-slate-500"}>
                      GitHub
                    </p>
                    <p className={isDark ? "text-white" : "text-slate-900"}>
                      github.com/chamod419
                    </p>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/chamod-madhusanka/"
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center gap-4 rounded-2xl p-4 transition hover:-translate-y-1 ${
                    isDark
                      ? "border border-white/10 bg-white/5"
                      : "border border-slate-300 bg-slate-50"
                  }`}
                >
                  <div className="text-cyan-400">
                    <FaLinkedin size={20} />
                  </div>
                  <div>
                    <p className={isDark ? "text-gray-400" : "text-slate-500"}>
                      LinkedIn
                    </p>
                    <p className={isDark ? "text-white" : "text-slate-900"}>
                      linkedin.com/in/chamod-madhusanka
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className={`rounded-[30px] p-8 md:p-10 ${
                isDark
                  ? "border border-white/10 bg-white/5"
                  : "border border-slate-300 bg-white"
              }`}
            >
              <div className="grid gap-5">
                <div>
                  <label
                    className={`mb-2 block text-sm font-medium ${
                      isDark ? "text-gray-300" : "text-slate-700"
                    }`}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className={inputClass}
                  />
                  {errors.name && <p className={errorClass}>{errors.name}</p>}
                </div>

                <div>
                  <label
                    className={`mb-2 block text-sm font-medium ${
                      isDark ? "text-gray-300" : "text-slate-700"
                    }`}
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={inputClass}
                  />
                  {errors.email && <p className={errorClass}>{errors.email}</p>}
                </div>

                <div>
                  <label
                    className={`mb-2 block text-sm font-medium ${
                      isDark ? "text-gray-300" : "text-slate-700"
                    }`}
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Enter subject"
                    className={inputClass}
                  />
                  {errors.subject && (
                    <p className={errorClass}>{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label
                    className={`mb-2 block text-sm font-medium ${
                      isDark ? "text-gray-300" : "text-slate-700"
                    }`}
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message"
                    className={inputClass}
                  />
                  {errors.message && (
                    <p className={errorClass}>{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-500 px-6 py-3.5 font-semibold text-white transition hover:scale-[1.02] hover:bg-cyan-400"
                >
                  Send Message
                  <FaPaperPlane />
                </button>

                <p
                  className={`text-sm leading-7 ${
                    isDark ? "text-gray-400" : "text-slate-500"
                  }`}
                >
                  Me step eken submit karama email client eka open wenawa.
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default Contact;