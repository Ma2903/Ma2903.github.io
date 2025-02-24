document.addEventListener("DOMContentLoaded", function () {
    // Função para carregar projetos do GitHub
    function loadProjects() {
        const projectList = document.getElementById('projetos');
        const apiUrl = 'https://api.github.com/users/Ma2903/repos';

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                projectList.innerHTML = '';
                data.forEach(repo => {
                    const projectElement = document.createElement('article');
                    projectElement.classList.add('project');

                    projectElement.innerHTML = `
                        <h3>${repo.name}</h3>
                        <p>${repo.description || 'Sem descrição'}</p>
                        <a href="${repo.html_url}" target="_blank">Ver no GitHub</a>
                    `;
                    
                    projectList.appendChild(projectElement);
                });
            })
            .catch(error => {
                console.error('Erro ao carregar os projetos:', error);
            });
    }

    // Função para alternar o tema
    const toggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);

        localStorage.setItem('theme', newTheme);
        document.getElementById('toggle-theme').textContent = newTheme === 'dark' ? '☀️' : '🌙';
    };

    // Aplicar tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.getElementById('toggle-theme').textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    document.getElementById('toggle-theme').addEventListener('click', toggleTheme);

    // Carregar projetos do GitHub
    loadProjects();
});

//menu hamburguer
document.addEventListener("DOMContentLoaded", function () {
    const backToTopButton = document.querySelector('.back-to-top');
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('active');
    });
});

 // Formspree form submission
 const form = document.querySelector('form');
 form.addEventListener('submit', async (e) => {
     e.preventDefault();
     const formData = new FormData(form);
     const response = await fetch(form.action, {
         method: form.method,
         body: formData,
         headers: {
             'Accept': 'application/json'
         }
     });
     if (response.ok) {
         form.reset();
         alert('Mensagem enviada com sucesso!');
     } else {
         alert('Ocorreu um erro ao enviar sua mensagem. Tente novamente.');
     }
 });

 // Adicione animações de rolagem
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll('.section');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });
});