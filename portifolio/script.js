const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a');

navToggle?.addEventListener('click', () => {
  mainNav?.classList.toggle('open');
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    mainNav?.classList.remove('open');
  });
});

const sections = document.querySelectorAll('main section');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
      }
    });
  },
  { threshold: 0.15 }
);

sections.forEach((section) => observer.observe(section));
