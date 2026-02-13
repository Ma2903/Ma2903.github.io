const header = document.getElementById('header');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const projectsGrid = document.getElementById('projects-grid');
const currentYear = document.getElementById('current-year');
const heroVisual = document.getElementById('hero-visual');
const starfield = document.getElementById('starfield');

const projectMetadata = {
  'Ecommerce-React-Node': {
    image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1000&q=80',
    description: 'E-commerce full-stack com frontend em React, API em Node.js/Express, autenticação e persistência de dados.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB']
  },
  'Task-Manager-API': {
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1000&q=80',
    description: 'Gerenciador de tarefas inspirado em Kanban com API REST, organização de fluxo e foco em produtividade.',
    tags: ['API REST', 'Kanban', 'MySQL']
  },
  'Meu-Portfolio-Site': {
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1000&q=80',
    description: 'Portfólio pessoal com foco em frontend, experiência visual e exibição clara de habilidades e projetos.',
    tags: ['HTML', 'CSS', 'JavaScript', 'UI']
  }
};

async function fetchProjects() {
  if (!projectsGrid) return;
  const username = 'Ma2903';
  const fallbackImage = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80';

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
    if (!response.ok) throw new Error('Falha ao carregar repositórios.');

    const repos = await response.json();
    const selected = repos.slice(0, 8).map((repo) => {
      const custom = projectMetadata[repo.name] || {};
      return {
        title: repo.name,
        description: custom.description || repo.description || 'Projeto desenvolvido com foco em aprendizado e entrega prática.',
        image: custom.image || fallbackImage,
        tags: custom.tags || [repo.language || 'Projeto Web'],
        url: repo.html_url
      };
    });

    renderProjects(selected);
  } catch (error) {
    projectsGrid.innerHTML = `<p class="muted">Não foi possível carregar projetos no momento: ${error.message}</p>`;
  }
}

function renderProjects(projects) {
  projectsGrid.innerHTML = '';
  projects.forEach((project) => {
    const card = document.createElement('article');
    card.className = 'project-card reveal';
    card.innerHTML = `
      <img src="${project.image}" alt="Preview do projeto ${project.title}" loading="lazy" />
      <div class="project-content">
        <h3>🛰 ${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-tags">${project.tags.map((tag) => `<span class="project-tag">${tag}</span>`).join('')}</div>
        <p style="margin-top:.85rem;"><a class="btn btn-secondary" href="${project.url}" target="_blank" rel="noopener">Ver no GitHub</a></p>
      </div>
    `;
    projectsGrid.appendChild(card);
  });
  initReveal();
}

function initReveal() {
  const elements = document.querySelectorAll('.panel, .project-card, .hero-text, h2, .tech-pills');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal', 'visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  elements.forEach((el) => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}

function initNavbar() {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 12) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  });

  navToggle?.addEventListener('click', () => navMenu?.classList.toggle('active'));

  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => navMenu?.classList.remove('active'));
  });
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
  const ctx = starfield.getContext('2d');
  if (!ctx) return;

  const stars = [];

  function resize() {
    starfield.width = window.innerWidth;
    starfield.height = window.innerHeight;
    stars.length = 0;

    const total = Math.floor((window.innerWidth * window.innerHeight) / 9000);
    for (let i = 0; i < total; i += 1) {
      stars.push({
        x: Math.random() * starfield.width,
        y: Math.random() * starfield.height,
        r: Math.random() * 1.7,
        a: Math.random(),
        t: Math.random() * 0.02 + 0.004
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, starfield.width, starfield.height);

    for (const s of stars) {
      s.a += s.t;
      if (s.a > 1 || s.a < 0.1) s.t *= -1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(225,237,255,${Math.max(0.15, s.a)})`;
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener('resize', resize);
}

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroParallax();
  initStarfield();
  fetchProjects();
  initReveal();
  if (currentYear) currentYear.textContent = new Date().getFullYear();
});
