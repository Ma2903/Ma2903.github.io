// ====================================================================
// DOM Elements
// ====================================================================
const header = document.getElementById('header');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const projectsGrid = document.getElementById('projects-grid');
const currentYearSpan = document.getElementById('current-year');
const contactForm = document.getElementById('contact-form');

// ====================================================================
// 💡 INFORMAÇÕES CRUCIAIS PARA ATUALIZAÇÃO DOS PROJETOS (Metadados Manuais)
//
// 1. Substitua os nomes dos repositórios (a chave, ex: 'Ecommerce-React-Node') 
//    pelos nomes EXATOS dos seus projetos no GitHub.
// 2. Troque as URLs de exemplo (Unsplash) pelas URLs das suas imagens 
//    permanentes (hospedadas no GitHub, Imgur, ou serviço de sua preferência).
// 3. Preencha a 'description' e as 'tags' (múltiplas tecnologias) corretamente.
// ====================================================================
const projectMetadata = {

    'Ecommerce-React-Node': {
        // Imagem temática: Compras e Checkout
        image: 'https://source.unsplash.com/600x400/?shopping,ecommerce,checkout', 
        description: 'Plataforma de e-commerce Full-Stack. O frontend foi desenvolvido em React e utiliza Redux para gerenciamento de estado. O backend é uma API REST robusta em Node.js com Express, utilizando MongoDB para o banco de dados e autenticação JWT.',
        tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Full-Stack', 'JavaScript'],
        status: 'completed'
    },
    
    'Task-Manager-API': {
        // Imagem temática: Gerenciamento de Tarefas
        image: 'https://source.unsplash.com/600x400/?task,management,dashboard',
        description: 'Um sistema de gerenciamento de projetos e tarefas inspirado no Kanban. Frontend feito em Vue.js com Vuex para a lógica da aplicação, consumindo uma API REST em PHP (Laravel). Utiliza MySQL para o banco de dados.',
        tags: ['Vue.js', 'PHP', 'Laravel', 'MySQL', 'API REST', 'Kanban'],
        status: 'completed'
    },

    'Meu-Portfolio-Site': {
        // Imagem temática: Codificação e Website
        image: 'https://source.unsplash.com/600x400/?portfolio,coding,website',
        description: 'Este projeto: meu portfólio pessoal. Desenvolvido com foco em UI/UX e performance. Implementa animações com Intersection Observer e utiliza JavaScript puro para a interatividade e integração com o GitHub. ',
        tags: ['HTML5', 'CSS3', 'JavaScript', 'UI/UX', 'Performance'],
        status: 'completed'
    },

    'Sistema-Blog-PHP': {
        // Imagem temática: Blog e Escrita
        image: 'https://source.unsplash.com/600x400/?blog,writing,cms',
        description: 'Sistema de gerenciamento de conteúdo (CMS) simples, desenvolvido do zero em PHP, seguindo o padrão MVC. Permite a criação, edição e exclusão de posts de blog. O banco de dados é gerido via phpMyAdmin.',
        tags: ['PHP', 'MySQL', 'MVC', 'HTML5', 'CSS3'],
        status: 'in-progress'
    },
    
};

// ====================================================================
// Configuração e Inicialização
// ====================================================================

// Função Principal: Busca repositórios do GitHub e aplica os metadados manuais
async function fetchAndDisplayGitHubProjects() {
    const username = 'Ma2903'; // SEU USUÁRIO
    const apiUrl = `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`;
    const defaultFallbackImage = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80';

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Erro ao buscar repositórios do GitHub. Verifique o nome de usuário.');
        const repos = await response.json();

        // Mapeia os repositórios, mesclando com os metadados manuais
        const projectsToShow = repos.map(repo => {
            const manualData = projectMetadata[repo.name] || {};
            
            // Prioriza metadados manuais ou usa defaults
            const image = manualData.image || defaultFallbackImage; 
            const description = manualData.description || repo.description || 'Projeto sem descrição. Adicione uma descrição no objeto projectMetadata no scripts.js.';
            // Tags (múltiplas tecnologias)
            const tags = manualData.tags && manualData.tags.length > 0 ? manualData.tags : [repo.language || 'Outro'];
            
            return {
                title: repo.name,
                description: description,
                image: image,
                tags: tags,
                githubUrl: repo.html_url,
                status: manualData.status || 'completed'
            };
        });

        // Ordena os projetos por ordem alfabética do título
        projectsToShow.sort((a, b) => a.title.localeCompare(b.title, 'pt-BR', { sensitivity: 'base' }));
        renderProjects(projectsToShow);
        
        // Armazena a lista completa de projetos na janela para o filtro acessar
        window.allProjects = projectsToShow;

    } catch (e) {
        console.error("Erro ao buscar projetos:", e);
        if (projectsGrid) {
             projectsGrid.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: #cbd5e1;">Não foi possível carregar os projetos do GitHub. ${e.message}</p>`;
        }
    }
}

// Inicializa o portfólio após o carregamento completo da página
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

// ====================================================================
// Funções Auxiliares
// ====================================================================

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

// Navigation functionality (mobile and smooth scroll)
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

// Render projects with animation
function renderProjects(projectsToRender) {
    if (!projectsGrid) return;
    projectsGrid.innerHTML = '';
    
    if (projectsToRender.length === 0) {
        projectsGrid.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: #cbd5e1;">Nenhum projeto encontrado para este filtro.</p>`;
        return;
    }
    
    projectsToRender.forEach((project, index) => {
        const projectCard = createProjectCard(project);
        projectCard.style.animation = `fadeInUp 0.5s ${index * 0.1}s both`;
        projectsGrid.appendChild(projectCard);
    });
}

// Create project card - Agora com suporte a múltiplas tags e badge de status
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
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

// Initialize project filters - Lógica aprimorada para MÚLTIPLAS tags
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.project-filters .filter-btn');
    if (filterButtons.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Converte o filtro para minúsculas para comparação
            const filter = this.getAttribute('data-filter').toLowerCase();
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // A lista de projetos completa deve estar em window.allProjects
            const projectsToFilter = window.allProjects || [];
            
            const filteredProjects = projectsToFilter.filter(p => {
                if (filter === 'all') {
                    return true;
                }
                
                // Filtra se ALGUMA tag do projeto (em minúsculas) inclui o texto do filtro.
                const projectTags = p.tags.map(tag => tag.toLowerCase());
                return projectTags.some(tag => tag.includes(filter)); 
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
        const action = "https://formspree.io/f/xgvwzygo"; // URL do seu Formspree

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