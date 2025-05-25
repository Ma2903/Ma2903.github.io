document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Theme Toggle
    const toggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        const themeButton = document.getElementById('toggle-theme');
        themeButton.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    };

    // Apply saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.getElementById('toggle-theme').textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    document.getElementById('toggle-theme').addEventListener('click', toggleTheme);

    // Load GitHub Projects
    const loadProjects = async () => {
        const projectsContainer = document.getElementById('projetos');
        const repositories = [
            "APAE", "Oficina-ETEC", "Engenharia-Codigo", "Arquitetura-MVP",
            "Projeto-Calculadora-Final", "Loja-de-Avatares-e-Skins-para-Programadores"
        ];

        try {
            const response = await fetch('https://api.github.com/users/Ma2903/repos');
            const data = await response.json();

            projectsContainer.innerHTML = '';
            data.forEach(repo => {
                if (repositories.includes(repo.name)) {
                    const projectCard = document.createElement('div');
                    projectCard.className = 'project-card';
                    projectCard.setAttribute('data-aos', 'fade-up');
                    
                    projectCard.innerHTML = `
                        <div class="project-content">
                            <h3>${repo.name}</h3>
                            <p>${repo.description || 'Sem descrição disponível'}</p>
                            <div class="project-links">
                                <a href="${repo.html_url}" target="_blank" class="project-link">
                                    <i class="fab fa-github"></i> Ver no GitHub
                                </a>
                            </div>
                        </div>
                    `;
                    
                    projectsContainer.appendChild(projectCard);
                }
            });
        } catch (error) {
            console.error('Erro ao carregar projetos:', error);
            projectsContainer.innerHTML = '<p class="error-message">Erro ao carregar os projetos. Por favor, tente novamente mais tarde.</p>';
        }
    };

    // Contact Form
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                form.reset();
                alert('Mensagem enviada com sucesso!');
            } else {
                throw new Error('Erro ao enviar mensagem');
            }
        } catch (error) {
            alert('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.');
        }
    });

    // Certificate Modal
    const modal = document.getElementById('certificate-modal');
    const modalImg = document.getElementById('modal-image');
    const closeModal = document.querySelector('.close-modal');

    document.querySelectorAll('.view-certificate').forEach(button => {
        button.addEventListener('click', () => {
            const certificateUrl = button.getAttribute('data-certificate');
            modalImg.src = certificateUrl;
            modal.style.display = 'block';
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Back to Top Button
    const backToTop = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // Mobile Menu
    const menuButton = document.querySelector('.header-button');
    const nav = document.querySelector('nav');
    
    menuButton.addEventListener('click', () => {
        nav.classList.toggle('show');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !menuButton.contains(e.target)) {
            nav.classList.remove('show');
        }
    });

    // Initialize
    loadProjects();
});