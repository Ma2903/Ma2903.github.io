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
    title: 'DevLooks',
    description: 'Loja virtual para personalizar e baixar avatares e encontrar roupas e itens com temáticas geek e de programação.',
    tags: ['Vue.js', 'Node.js', 'Express', 'MongoDB'],
    url: 'https://github.com/Ma2903/DevLooks'
  },
  {
    title: 'Protótipo da MedResiduos',
    description: 'Protótipo inicial da plataforma MedResiduos para o gerenciamento e o descarte correto de resíduos de saúde.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://github.com/Ma2903/Prototipo-da-MedResiduos'
  },
  {
    title: 'TCC — Escrita e Design',
    description: 'Repositório com documentação, planejamento, apresentação e materiais de design visual do TCC.',
    tags: ['Documentação', 'Design'],
    url: 'https://github.com/Ma2903/TCC--Escrito-e-design'
  },
  {
    title: 'APAE',
    description: 'Aplicação web para gerenciar usuários, eventos e recursos da APAE, com uma interface voltada à administração da instituição.',
    tags: ['HTML', 'CSS', 'JavaScript', 'PHP'],
    url: 'https://github.com/Ma2903/APAE'
  },
  {
    title: 'Reading Marathon',
    description: 'Projeto Reading Marathon disponível no GitHub.',
    tags: ['Projeto web'],
    url: 'https://github.com/Ma2903/reading-marathon'
  },
  {
    title: 'ManuReceitas',
    description: 'Projeto ManuReceitas disponível no GitHub.',
    tags: ['Projeto web'],
    url: 'https://github.com/Ma2903/ManuReceitas'
  },
  {
    title: 'Bingo',
    description: 'Jogo de bingo para desenvolvedores no qual os termos de programação substituem os números tradicionais.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://github.com/Ma2903/bingo-game'
  },
  {
    title: 'Datastruct School',
    description: 'Aplicação educacional voltada ao estudo de estruturas de dados, com teoria, exemplos e conteúdos interativos.',
    tags: ['PHP', 'HTML', 'CSS'],
    url: 'https://github.com/jp-girotto/EstruturaDeDados'
  },
  {
    title: 'Chatbot Dev',
    description: 'Chatbot parceiro de estudos que utiliza a API do Google Gemini.',
    tags: ['Google Gemini', 'API', 'JavaScript'],
    url: 'https://github.com/DevZIKIII/ChatbotDevSafe'
  },
  {
    title: 'Anuário Digital',
    description: 'Projeto de anuário digital disponível no GitHub.',
    tags: ['Projeto web'],
    url: 'https://github.com/Ma2903/digital-yearbook'
  },
  {
    title: 'MedResiduos',
    description: 'Plataforma web para conectar hospitais e pacientes e apoiar a rastreabilidade e o descarte correto de resíduos de saúde domiciliares.',
    tags: ['React', 'Node.js', 'Express', 'MySQL'],
    url: 'https://github.com/Ma2903/MedResiduos'
  },
  {
    title: 'Portal Culinário',
    description: 'Aplicação de chat com tema culinário para comunicação em tempo real entre múltiplos usuários.',
    tags: ['React', 'Node.js', 'Socket.IO', 'WebSockets'],
    url: 'https://github.com/Ma2903/Portal-Culinario'
  },
  {
    title: 'TCC-DS',
    description: 'Site com sugestões de alimentação balanceada e atividades físicas, desenvolvido como trabalho de conclusão de curso.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
    url: 'https://github.com/jp-girotto/TCC-DS'
  }
];

function renderProjects() {
  if (!projectsGrid) return;
  projectsGrid.innerHTML = featuredProjects.map((project) => `
    <article class="project-card reveal">
      <div class="project-content">
        <h3><span aria-hidden="true">🛰</span> ${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-tags">${project.tags.map((tag) => `<span class="project-tag">${tag}</span>`).join('')}</div>
        <p class="project-action"><a class="btn btn-secondary" href="${project.url}" target="_blank" rel="noopener">Ver no GitHub</a></p>
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

  function closeMenu() {
    navMenu?.classList.remove('active');
    navToggle?.setAttribute('aria-expanded', 'false');
    navToggle?.setAttribute('aria-label', 'Abrir menu');
  }

  navToggle?.addEventListener('click', () => {
    const isOpen = navMenu?.classList.toggle('active') || false;
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  });
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function initHeroParallax() {
  if (!heroVisual || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
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

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
    if (!reduceMotion) requestAnimationFrame(draw);
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
