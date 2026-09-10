const header = document.getElementById('header');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const projectsGrid = document.getElementById('projects-grid');
const currentYear = document.getElementById('current-year');
const heroVisual = document.getElementById('hero-visual');
const starfield = document.getElementById('starfield');
const backToTop = document.getElementById('back-to-top');

// Curadoria manual: a ordem e o conteúdo não dependem da API do GitHub.
const featuredProjects = [
  {
    title: 'MedResiduos',
    description: 'Plataforma web para conectar hospitais e pacientes e apoiar a rastreabilidade e o descarte correto de resíduos de saúde domiciliares.',
    image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['React', 'Node.js', 'Express', 'MySQL'],
    url: 'https://github.com/Ma2903/MedResiduos'
  },
  {
    title: 'APAE',
    description: 'Aplicação web para gerenciar usuários, eventos e recursos da APAE, com uma interface voltada à administração da instituição.',
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['HTML', 'CSS', 'JavaScript', 'PHP'],
    url: 'https://github.com/Ma2903/APAE'
  },
  {
    title: 'digital-yearbook',
    description: 'Projeto digital yearbook disponível no GitHub.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1000&q=80',
    tags: ['Projeto web'],
    url: 'https://github.com/Ma2903/digital-yearbook'
  },
  {
    title: 'DevLooks',
    description: 'Loja virtual para personalizar e baixar avatares e encontrar roupas e itens com temáticas geek e de programação.',
    image: 'https://images.pexels.com/photos/5868272/pexels-photo-5868272.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['Vue.js', 'Node.js', 'Express', 'MongoDB'],
    url: 'https://github.com/Ma2903/DevLooks'
  },
  {
    title: 'reading-marathon',
    description: 'Projeto reading marathon disponível no GitHub.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80',
    tags: ['Projeto web'],
    url: 'https://github.com/Ma2903/reading-marathon'
  },
  {
    title: 'bingo-game',
    description: 'Jogo de bingo para desenvolvedores no qual os termos de programação substituem os números tradicionais.',
    image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://github.com/Ma2903/bingo-game'
  }
];

function renderProjects() {
  if (!projectsGrid) return;
  projectsGrid.innerHTML = featuredProjects.map((project) => `
    <article class="project-card reveal">
      <img src="${project.image}" alt="Preview do projeto ${project.title}" loading="lazy" />
      <div class="project-content">
        <h3>🛰 ${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-tags">${project.tags.map((tag) => `<span class="project-tag">${tag}</span>`).join('')}</div>
        <p style="margin-top:.85rem;"><a class="btn btn-secondary" href="${project.url}" target="_blank" rel="noopener">Ver no GitHub</a></p>
      </div>
    </article>
  `).join('');
}

function initReveal() {
  const elements = document.querySelectorAll('.panel, .project-card, .hero-text, h2, .tech-pills, .timeline-item');
  const observer = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal', 'visible');
        observerInstance.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  elements.forEach((element) => {
    element.classList.add('reveal');
    observer.observe(element);
  });
}

function initNavbar() {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 12) header.classList.add('scrolled');
    else header.classList.remove('scrolled');

    if (backToTop) {
      if (window.scrollY > 420) backToTop.classList.add('show');
      else backToTop.classList.remove('show');
    }
  });

  navToggle?.addEventListener('click', () => navMenu?.classList.toggle('active'));
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => navMenu?.classList.remove('active'));
  });
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function initHeroParallax() {
  if (!heroVisual) return;
  window.addEventListener('mousemove', (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 12;
    const y = (event.clientY / window.innerHeight - 0.5) * -12;
    heroVisual.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  });
}

function initStarfield() {
  if (!starfield) return;
  const context = starfield.getContext('2d');
  if (!context) return;

  const stars = [];
  function resize() {
    starfield.width = window.innerWidth;
    starfield.height = window.innerHeight;
    stars.length = 0;
    const total = Math.floor((window.innerWidth * window.innerHeight) / 9000);
    for (let index = 0; index < total; index += 1) {
      stars.push({ x: Math.random() * starfield.width, y: Math.random() * starfield.height, r: Math.random() * 1.7, a: Math.random(), t: Math.random() * 0.02 + 0.004 });
    }
  }

  function draw() {
    context.clearRect(0, 0, starfield.width, starfield.height);
    for (const star of stars) {
      star.a += star.t;
      if (star.a > 1 || star.a < 0.1) star.t *= -1;
      context.beginPath();
      context.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      context.fillStyle = `rgba(225,237,255,${Math.max(0.15, star.a)})`;
      context.fill();
    }
    requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener('resize', resize);
}

document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  initNavbar();
  initHeroParallax();
  initStarfield();
  initReveal();
  if (currentYear) currentYear.textContent = new Date().getFullYear();
});
