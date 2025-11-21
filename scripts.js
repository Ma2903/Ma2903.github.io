// DOM Elements
const header = document.getElementById('header');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const contactForm = document.getElementById('contact-form');
const projectsGrid = document.getElementById('projects-grid');
const currentYearSpan = document.getElementById('current-year');

// Para exibir todos os repositórios do GitHub, deixe o array abaixo vazio
const visibleRepos = [];

// Busca repositórios do GitHub e exibe no portfólio
async function fetchAndDisplayGitHubProjects() {
    const username = 'Ma2903';
    const apiUrl = `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Erro ao buscar repositórios do GitHub');
        const repos = await response.json();

        // Se visibleRepos estiver vazio, mostra todos os repositórios
        const filtered = repos;

        // Imagem padrão do Unsplash
        const defaultImage = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80';

        // Função para buscar imagem do Unsplash baseada em palavra-chave
        async function getUnsplashImage(keyword) {
            const url = `https://source.unsplash.com/600x400/?${encodeURIComponent(keyword)}`;
            // O Unsplash sempre retorna uma imagem, mesmo se não houver resultado exato
            return url;
        }

        // Mapeia para o formato esperado pelo renderProjects
        const projectsToShow = await Promise.all(filtered.map(async repo => {
            const coverUrl = 'https://raw.githubusercontent.com/' + username + '/' + repo.name + '/main/cover.png';
            let imageUrl = coverUrl;
            try {
                const res = await fetch(coverUrl, { method: 'HEAD' });
                if (!res.ok) {
                    // Usa linguagem ou nome do projeto como palavra-chave para imagem
                    const keyword = repo.language || repo.name;
                    imageUrl = await getUnsplashImage(keyword);
                }
            } catch {
                const keyword = repo.language || repo.name;
                imageUrl = await getUnsplashImage(keyword);
            }
            return {
                title: repo.name,
                description: repo.description || 'Projeto sem descrição.',
                image: imageUrl,
                tags: [repo.language || 'Outro'],
                githubUrl: repo.html_url,
                category: 'web',
            };
        }));

        // Ordena os projetos por ordem alfabética do título
        projectsToShow.sort((a, b) => a.title.localeCompare(b.title, 'pt-BR', { sensitivity: 'base' }));
        renderProjects(projectsToShow);
    } catch (e) {
        // Se der erro, mostra os projetos locais (antigo)
        if (typeof projects !== 'undefined') {
            renderProjects(projects);
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeHeader();
    initializeNavigation();
    initializeSkillBars();
    // Chama a busca dos projetos do GitHub
    fetchAndDisplayGitHubProjects();
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
// Removido: initializeProjects (agora é automático via fetch)

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