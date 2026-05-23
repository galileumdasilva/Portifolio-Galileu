// ==================== MOBILE MENU ==================== //
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  
  // Toggle menu on hamburger click
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('open');
      menuToggle.classList.toggle('active');
    });
  }
  
  // Close menu when a link is clicked
  if (navMenu) {
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('open');
        if (menuToggle) {
          menuToggle.classList.remove('active');
        }
      });
    });
  }
  
  // ==================== SCROLL ANIMATIONS ==================== //
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    observer.observe(section);
  });
  
  // ==================== SMOOTH SCROLL ==================== //
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // ==================== ACTIVE NAV HIGHLIGHT ==================== //
  const updateActiveNav = () => {
    const sections = document.querySelectorAll('[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  };
  
  window.addEventListener('scroll', updateActiveNav);
  
  // ==================== STATS COUNTER (optional) ==================== //
  const animateCounter = (element, target, duration = 2000) => {
    let current = 0;
    const increment = target / (duration / 50);
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 50);
  };
  
  // ==================== FORM VALIDATION (if needed) ==================== //
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  // ==================== DARK MODE TOGGLE (optional) ==================== //
  const initTheme = () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', currentTheme);
  };
  
  initTheme();
  
  // ==================== PARALLAX EFFECT (optional) ==================== //
  const enableParallax = () => {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    window.addEventListener('scroll', () => {
      parallaxElements.forEach(element => {
        const scrollPosition = window.pageYOffset;
        const elementOffset = element.offsetTop;
        const parallaxValue = (scrollPosition - elementOffset) * 0.5;
        element.style.transform = `translateY(${parallaxValue}px)`;
      });
    });
  };
  
  // enableParallax();
  
  // ==================== LAZY LOADING IMAGES ==================== //
  const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute('data-src');
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  };
  
  lazyLoadImages();
  
  // ==================== COPY TO CLIPBOARD ==================== //
  const enableCopyToClipboard = () => {
    const copyButtons = document.querySelectorAll('[data-copy]');
    copyButtons.forEach(button => {
      button.addEventListener('click', function() {
        const text = this.getAttribute('data-copy');
        navigator.clipboard.writeText(text).then(() => {
          const originalText = this.textContent;
          this.textContent = '✓ Copiado!';
          setTimeout(() => {
            this.textContent = originalText;
          }, 2000);
        });
      });
    });
  };
  
  enableCopyToClipboard();
  
  console.log('✓ Portfólio carregado com sucesso!');
});
