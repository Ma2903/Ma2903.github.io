// DOM Elements
const header = document.getElementById('header');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const contactForm = document.getElementById('contact-form');
const projectsGrid = document.getElementById('projects-grid');
const currentYearSpan = document.getElementById('current-year');

// Projects Data
const projects = [
    {
        title: "DevLooks",
        description: "E-commerce full-stack para o público dev, com vitrine de produtos, carrinho, criação de avatares e painel de admin. Construído com Vue.js, Node.js, Express e MongoDB.",
        image: "https://images.pexels.com/photos/5868272/pexels-photo-5868272.jpeg?auto=compress&cs=tinysrgb&w=600",
        tags: ["Vue.js", "Node.js", "MongoDB", "Tailwind CSS", "E-commerce"],
        githubUrl: "https://github.com/Ma2903/DevLooks.git",
        category: "web",
        status: "in-progress" 
    },
    {
        title: "Bingo Game for Devs",
        description: "🎯 Jogo de Bingo divertido para desenvolvedores! Sorteie termos de programação em vez de números e teste seus conhecimentos. Feito com JavaScript puro.",
        image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=600",
        tags: ["JavaScript", "Frontend", "Game", "DOM"],
        githubUrl: "https://github.com/Ma2903/bingo-game.git",
        category: "web"
    },
    {
         title: "Cozinha Sincronizada",
        description: "Jogo educacional em JavaScript que ensina paralelismo e concorrência através da gerência de uma cozinha. Inspirado em 'Overcooked', aborda conceitos como threads e deadlocks.",
        image: "https://images.pexels.com/photos/2284166/pexels-photo-2284166.jpeg?auto=compress&cs=tinysrgb&w=600",
        tags: ["JavaScript", "HTML", "CSS", "Game", "Concurrency"],
        githubUrl: "https://github.com/Ma2903/Cozinha-Sincronizada.git",
        category: "web"
    },
     {
        title: "Datastruct School",
        description: "Aplicação educacional para ensinar estudantes sobre Estruturas de Dados. Atuei como designer (UI) e desenvolvedora front-end, implementando a interface e os conteúdos interativos.",
        image: "https://images.pexels.com/photos/5473956/pexels-photo-5473956.jpeg?auto=compress&cs=tinysrgb&w=600",
        tags: ["PHP", "HTML", "CSS", "UI Design"],
        githubUrl: "https://github.com/JP1005YT/EstruturaDeDados.git",
        category: "web"
    },
    {
        title: "DevBot - Palestra sobre IA com Google Gemini",
        description: "Palestra e minicurso sobre Inteligência Artificial, onde construímos o DevBot, um chatbot parceiro de estudos que utiliza a API do Google Gemini para criar aplicações inteligentes e desmistificar a IA para novos desenvolvedores.",
        image: "https://images.pexels.com/photos/5926382/pexels-photo-5926382.jpeg?auto=compress&cs=tinysrgb&w=600", // SUGESTÃO: Use o print do DevBot que está no seu post do LinkedIn!
        tags: ["Inteligência Artificial", "Google Gemini", "API", "Palestra", "PHP", "JavaScript"],
        githubUrl: "https://github.com/DevZIKIII/ChatbotDevSafe",
        category: "web"
    },
    {
        title: "MedResiduos - Feito para o Hackathon",
        description: "Plataforma full-stack para gestão de resíduos de saúde, conectando pacientes, unidades de saúde e empresas de coleta. Projeto vencedor do Hackathon Tech4Health da Fatec.",
        image: "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=600",
        tags: ["React", "Node.js", "Express", "MySQL", "Hackathon"],
        githubUrl: "https://github.com/Ma2903/MedResiduos.git",
        category: "web"
    },
    {
        title: "Oficina ETEC - Chat com Socket.io",
        description: "Projeto de apoio para um minicurso sobre criação de chats em tempo real, utilizando Node.js, Express e Socket.IO. Apresentado na ETEC.",
        image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600",
        tags: ["Node.js", "Socket.io", "Express", "Workshop"],
        githubUrl: "https://github.com/Ma2903/Oficina-ETEC.git",
        category: "web"
    },
    {
        title: "Portal Culinário - Chat em Tempo Real",
        description: "Aplicação de chat com tema culinário, usando Node.js, Socket.IO e React para comunicação com WebSockets, permitindo que múltiplos usuários interajam instantaneamente.",
        image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=600",
        tags: ["React", "Node.js", "Socket.IO", "WebSockets"],
        githubUrl: "https://github.com/Ma2903/Portal-Culinario",
        category: "web"
    },
    {
        title: "Site Institucional APAE",
        description: "Aplicação web para gerenciar usuários, eventos e recursos da APAE. Oferece uma interface intuitiva para facilitar a administração e integração da instituição.",
        image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600",
        tags: ["PHP", "MySQL", "JavaScript", "HTML", "CSS"],
        githubUrl: "https://github.com/Ma2903/APAE.git",
        category: "web"
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeHeader();
    initializeNavigation();
    initializeSkillBars();
    initializeProjects();
    initializeProjectFilters();
    initializeContactForm();
    setCurrentYear();
    initializeScrollAnimations();
});

// Header scroll effect
function initializeHeader() {
    if (!header) return;
    window.addEventListener('scroll', function() {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Navigation functionality
function initializeNavigation() {
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                scrollToSection(targetId.substring(1));
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });
}

// Scroll to section function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        let headerHeight = header ? header.offsetHeight : 0;
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Initialize skill bars animation
function initializeSkillBars() {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                setTimeout(() => {
                    skillBars.forEach(bar => {
                        const width = bar.getAttribute('data-width');
                        bar.style.width = width + '%';
                    });
                }, 200);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    observer.observe(skillsSection);
}

// Initialize projects
function initializeProjects() {
    if (!projectsGrid) return;
    renderProjects(projects);
}

// Render projects with animation
function renderProjects(projectsToRender) {
    if (!projectsGrid) return;
    projectsGrid.innerHTML = '';
    projectsToRender.forEach((project, index) => {
        const projectCard = createProjectCard(project);
        projectCard.style.animation = `fadeInUp 0.5s ${index * 0.1}s both`;
        projectsGrid.appendChild(projectCard);
    });
}

// Create project card
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-category', project.category);

    const statusBadge = project.status === 'in-progress'
        ? '<span class="project-status-badge">Em Andamento</span>'
        : '';
    
    card.innerHTML = `
        <div class="project-image">
            ${statusBadge}
            <img src="${project.image}" alt="${project.title}" loading="lazy">
            <div class="project-overlay"></div>
            <div class="project-links">
                <a href="${project.githubUrl}" class="project-link" target="_blank" title="Ver no GitHub" aria-label="Ver ${project.title} no GitHub">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                    </svg>
                </a>
            </div>
        </div>
        <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;
    
    return card;
}

// Initialize project filters
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.project-filters .filter-btn');
    if (filterButtons.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filteredProjects = projects.filter(p => {
                if (filter === 'all') {
                    return true;
                }
                const projectTags = p.tags.map(tag => tag.toLowerCase());
                return projectTags.includes(filter.toLowerCase());
            });
            renderProjects(filteredProjects);
        });
    });
}

// Initialize contact form with AJAX submission for Formspree
function initializeContactForm() {
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const form = e.target;
        const data = new FormData(form);
        const action = "https://formspree.io/f/xgvwzygo";

        fetch(action, {
            method: 'POST',
            body: data,
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                Swal.fire({
                    title: 'Obrigado!',
                    text: 'Sua mensagem foi enviada com sucesso.',
                    icon: 'success',
                    confirmButtonColor: '#3b82f6'
                });
                form.reset();
            } else {
                response.json().then(data => {
                    const errorText = data.errors ? data.errors.map(err => err.message).join(', ') : 'Ocorreu um problema.';
                    Swal.fire({
                        title: 'Erro!',
                        text: errorText,
                        icon: 'error',
                        confirmButtonColor: '#3b82f6'
                    });
                })
            }
        }).catch(() => {
            Swal.fire({
                title: 'Erro de Conexão!',
                text: 'Não foi possível enviar sua mensagem. Verifique sua internet.',
                icon: 'error',
                confirmButtonColor: '#3b82f6'
            });
        });
    });
}

// Set current year
function setCurrentYear() {
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
}

// Add smooth reveal animations
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.card, .project-card, .stat-card, .skill-category');
    if (animatedElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Export functions for global access
window.scrollToSection = scrollToSection;
window.scrollToTop = scrollToTop;