// tailwind.config.js
module.exports = {
    theme: {
      extend: {
        colors: {
          gold: '#d4af37',
          beige: '#d8cbbc',
          charcoal: '#111111',
        },
        backgroundImage: {
          'gradient-glow': 'linear-gradient(90deg, rgba(212,175,55,0.2), rgba(0,0,0,0.8))',
        },
        fontFamily: {
          sans: ['"Neue Montreal"', 'Inter', 'sans-serif'],
        },
      },
    },
  };
  
  document.addEventListener("DOMContentLoaded", () => {
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({ behavior: "smooth" });
      });
    });
  
    // Cursor glow effect
    const cursor = document.createElement("div");
    cursor.classList.add("cursor-glow");
    document.body.appendChild(cursor);
  
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });
  });
  