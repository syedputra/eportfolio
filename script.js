// Sticky nav active section highlighting
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('main .section');
const observerOptions = { threshold: 0.5 };

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    const navLink = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      if (navLink) navLink.classList.add('active');
    }
  });
}, observerOptions);
sections.forEach(section => sectionObserver.observe(section));

// Sticky nav and shrinking header with threshold
const siteHeader = document.querySelector('.site-header');
let lastScrolled = false;
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 100;
  if (scrolled !== lastScrolled) {
    siteHeader.classList.toggle('scrolled', scrolled);
    lastScrolled = scrolled;
  }
});

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const root = document.documentElement;
function setTheme(theme) {
  if (theme === 'light') {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
    localStorage.setItem('theme', 'light');
    root.classList.add('light-theme');
    themeIcon.textContent = '☀️';
  } else {
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
    root.classList.remove('light-theme');
    themeIcon.textContent = '🌙';
  }
}
const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    setTheme(document.body.classList.contains('light-theme') ? 'dark' : 'light');
  });
}

// Smooth scroll for nav links
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Gallery modal
const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.getElementById('gallery-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalTools = document.getElementById('modal-tools');
const modalDesc = document.getElementById('modal-desc');
const closeModal = document.querySelector('.close-modal');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    modalImg.src = item.dataset.img;
    modalTitle.textContent = item.dataset.title;
    modalTools.textContent = 'Tools: ' + item.dataset.tools;
    modalDesc.textContent = item.dataset.description;
    modal.classList.add('open');
  });
  item.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') item.click();
  });
});
closeModal.addEventListener('click', () => modal.classList.remove('open'));
modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('open'); });

// Scroll reveal animations
const revealSections = document.querySelectorAll('.section');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealSections.forEach(sec => revealObs.observe(sec));

// Back to Top button
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Page loader fade out
window.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('page-loader');
  setTimeout(() => {
    loader.classList.add('fade-out');
  }, 600); // show loader for at least 600ms
});

// Scroll-triggered fade/zoom-in animations
const animatedSections = document.querySelectorAll('.section');
const animObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      entry.target.classList.add('zoom-in');
      animObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
animatedSections.forEach(sec => animObs.observe(sec));

// Spotlight effect
const spotlight = document.getElementById('spotlight-overlay');
let spotX = window.innerWidth / 2, spotY = window.innerHeight / 2;
function drawSpotlight(x, y) {
  const size = Math.max(window.innerWidth, window.innerHeight) * 0.45;
  spotlight.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,220,0.22) 0%, rgba(255,255,220,0.13) 30%, rgba(20,20,20,0.7) 70%, rgba(20,20,20,0.93) 100%)`;
}
function updateSpotlight(e) {
  if (e.touches && e.touches.length) {
    spotX = e.touches[0].clientX;
    spotY = e.touches[0].clientY;
  } else {
    spotX = e.clientX;
    spotY = e.clientY;
  }
  drawSpotlight(spotX, spotY);
}
window.addEventListener('mousemove', updateSpotlight);
window.addEventListener('touchmove', updateSpotlight, {passive: true});
window.addEventListener('resize', () => drawSpotlight(spotX, spotY));
drawSpotlight(spotX, spotY);

// Typing animation for tagline
const taglineEl = document.getElementById('typed-tagline');
const messages = [
  'Crafting messages that connect.',
  'Designing with purpose.',
  'Communicating creatively.'
];
let msgIdx = 0, charIdx = 0, typing = true;
function typeTagline() {
  const msg = messages[msgIdx];
  if (typing) {
    taglineEl.textContent = msg.slice(0, charIdx + 1);
    if (charIdx < msg.length - 1) {
      charIdx++;
      setTimeout(typeTagline, 70 + Math.random() * 60);
    } else {
      typing = false;
      setTimeout(typeTagline, 1200);
    }
  } else {
    taglineEl.textContent = msg.slice(0, charIdx);
    if (charIdx > 0) {
      charIdx--;
      setTimeout(typeTagline, 35 + Math.random() * 30);
    } else {
      typing = true;
      msgIdx = (msgIdx + 1) % messages.length;
      setTimeout(typeTagline, 600);
    }
  }
}
typeTagline();

// Particle background effect
const particleCanvas = document.getElementById('particle-bg');
const ctx = particleCanvas.getContext('2d');
let particles = [];
function resizeParticles() {
  particleCanvas.width = window.innerWidth;
  particleCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeParticles);
resizeParticles();
function createParticle() {
  const r = 8 + Math.random() * 14;
  return {
    x: Math.random() * particleCanvas.width,
    y: particleCanvas.height + r + Math.random() * 60,
    r,
    alpha: 0.12 + Math.random() * 0.18,
    speed: 0.2 + Math.random() * 0.35,
    drift: (Math.random() - 0.5) * 0.2,
    color: `rgba(255, 214, 0, 1)`
  };
}
function updateParticles() {
  if (particles.length < 36) {
    particles.push(createParticle());
  }
  ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    p.y -= p.speed;
    p.x += p.drift;
    ctx.beginPath();
    const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
    grad.addColorStop(0, `rgba(255, 214, 0, ${p.alpha})`);
    grad.addColorStop(0.5, `rgba(255, 214, 0, ${p.alpha * 0.5})`);
    grad.addColorStop(1, 'rgba(255, 214, 0, 0)');
    ctx.fillStyle = grad;
    ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
    ctx.fill();
    if (p.y + p.r < 0) {
      particles[i] = createParticle();
      particles[i].y = particleCanvas.height + particles[i].r;
    }
  }
  requestAnimationFrame(updateParticles);
}
updateParticles();

// Scroll-triggered entrance animations
function animateOnScroll() {
  const animEls = document.querySelectorAll('[data-anim]');
  animEls.forEach(el => {
    const animType = el.getAttribute('data-anim');
    el.classList.add('anim-' + animType);
  });
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('anim-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  animEls.forEach(el => observer.observe(el));

  // Staggered animation for grids
  document.querySelectorAll('[data-anim-stagger]').forEach(grid => {
    const children = Array.from(grid.children);
    let delay = 0;
    children.forEach((child, i) => {
      setTimeout(() => {
        child.classList.add('anim-visible');
      }, delay);
      delay += 120;
    });
    grid.classList.add('anim-staggered');
  });
}
window.addEventListener('DOMContentLoaded', animateOnScroll);

// Gallery Showcase modal/lightbox
const showcaseItems = document.querySelectorAll('.gallery-showcase-item');
const showcaseModal = document.getElementById('gallery-modal');
const showcaseModalImg = document.getElementById('gallery-modal-img');
const showcaseModalTitle = document.getElementById('gallery-modal-title');
const showcaseModalDesc = document.getElementById('gallery-modal-desc');
const showcaseModalClose = document.querySelector('.gallery-modal-close');

showcaseItems.forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    showcaseModalImg.src = img.src;
    showcaseModalImg.alt = img.alt;
    showcaseModalTitle.textContent = item.dataset.title || '';
    showcaseModalDesc.textContent = item.dataset.desc || '';
    showcaseModal.classList.add('active');
  });
  item.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') item.click();
  });
});
showcaseModalClose.addEventListener('click', () => showcaseModal.classList.remove('active'));
showcaseModal.addEventListener('click', (e) => {
  if (e.target === showcaseModal) showcaseModal.classList.remove('active');
}); 