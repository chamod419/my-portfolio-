import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div
      className={
        theme === "dark"
          ? "min-h-screen bg-[#050816] text-white transition-colors duration-300"
          : "min-h-screen bg-[#f8fafc] text-slate-900 transition-colors duration-300"
      }
    >
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Hero theme={theme} />
      <About theme={theme} />
      <Experience theme={theme} />
      <Skills theme={theme} />
      <Projects theme={theme} />
      <Contact theme={theme} />
      <Footer theme={theme} />
    </div>
  );
}

export default App;