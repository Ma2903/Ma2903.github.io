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
        title: "Food and Physical Health (TCC)",
        description: "Criação de um site com sugestões para alimentação balanceada e atividades físicas, visando oferecer soluções práticas para melhorar a qualidade de vida.",
        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600",
        tags: ["HTML", "CSS", "JavaScript", "Node.js", "JSON"],
        githubUrl: "https://github.com/JP1005YT/TCC-DS.git",
        category: "web"
    },
    {
        title: "Site APAE",
        description: "Aplicação web para gerenciar usuários, eventos e recursos da APAE. Oferece uma interface intuitiva para facilitar a administração e integração da instituição.",
        image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600",
        tags: ["HTML", "CSS", "JavaScript", "PHP"],
        githubUrl: "https://github.com/Ma2903/APAE.git",
        category: "web"
    },
    {
        title: "Bingo Game for Devs",
        description: "🎯 Jogo de Bingo feito para devs! Em vez de números, as pedras sorteadas são palavras do universo da programação como bug, commit, loop e muito mais.",
        image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=600",
        tags: ["HTML", "CSS", "JavaScript"],
        githubUrl: "https://github.com/Ma2903/bingo-game.git",
        category: "web"
    },
     {
        title: "Datastruct School",
        description: "Sistema de aprendizado sobre estruturas de dados, incluindo teoria, exemplos práticos e exercícios, para ajudar na compreensão dos principais conceitos.",
        image: "https://images.pexels.com/photos/5473956/pexels-photo-5473956.jpeg?auto=compress&cs=tinysrgb&w=600",
        tags: ["PHP", "HTML", "CSS"],
        githubUrl: "https://github.com/JP1005YT/EstruturaDeDados.git",
        category: "web"
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeHeader();
    initializeNavigation();
    initializeSkillBars();
    initializeProjects();
    initializeContactForm();
    setCurrentYear();
    initializeScrollAnimations();
});

// Header scroll effect
function initializeHeader() {
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
    // Mobile menu toggle
    if(navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                scrollToSection(targetId.substring(1));
                if(navMenu.classList.contains('active')){
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
        const headerHeight = header.offsetHeight;
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

    const animateSkillBars = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = skillsSection.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width + '%';
                });
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(animateSkillBars, { threshold: 0.5 });
    observer.observe(skillsSection);
}

// Initialize projects
function initializeProjects() {
    if(!projectsGrid) return;
    renderProjects(projects);
}

// Render projects
function renderProjects(projectsToRender) {
    projectsGrid.innerHTML = '';
    
    projectsToRender.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
}

// Create project card
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-category', project.category);
    
    card.innerHTML = `
        <div class="project-image">
            <img src="${project.image}" alt="${project.title}">
            <div class="project-overlay"></div>
            <div class="project-links">
                <a href="${project.githubUrl}" class="project-link" target="_blank" title="Ver no GitHub">
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
            headers: {
                'Accept': 'application/json'
            }
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
                    if (Object.hasOwn(data, 'errors')) {
                        const errorText = data["errors"].map(error => error["message"]).join(", ");
                        Swal.fire({
                            title: 'Erro!',
                            text: 'Ocorreu um problema: ' + errorText,
                            icon: 'error',
                            confirmButtonColor: '#3b82f6'
                        });
                    } else {
                        Swal.fire({
                            title: 'Erro!',
                            text: 'Não foi possível enviar sua mensagem.',
                            icon: 'error',
                            confirmButtonColor: '#3b82f6'
                        });
                    }
                })
            }
        }).catch(error => {
            Swal.fire({
                title: 'Erro!',
                text: 'Não foi possível enviar sua mensagem.',
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

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

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