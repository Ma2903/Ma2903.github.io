document.addEventListener("DOMContentLoaded", function() {
    // Função para carregar projetos do GitHub
    function loadProjects() {
        const projectList = document.getElementById('project-list');
        
        // URL da API do GitHub para obter os repositórios do seu perfil
        const apiUrl = 'https://api.github.com/users/Ma2903/repos';

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                projectList.innerHTML = ''; // Limpa a lista de projetos antes de adicionar novos
                
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

    // Função para enviar o formulário
    function handleFormSubmit(event) {
        const form = document.getElementById('contact-form');

        // Impedir o comportamento padrão de envio do formulário
        event.preventDefault();
        
        // Enviar o formulário usando Formspree
        fetch(form.action, {
            method: form.method,
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Limpar o formulário após o envio bem-sucedido
                form.reset();
                alert('Mensagem enviada com sucesso!');
            } else {
                return response.json().then(data => {
                    alert('Houve um erro ao enviar a mensagem: ' + (data.errors ? data.errors.map(e => e.message).join(', ') : 'Erro desconhecido'));
                });
            }
        })
        .catch(error => {
            alert('Houve um erro ao enviar a mensagem: ' + error.message);
        });
    }

    // Verifica se o elemento do formulário existe antes de adicionar o ouvinte
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    // Carregar projetos do GitHub
    loadProjects();
});

const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);

    // Atualiza o texto do botão de alternância
    const themeToggleButton = document.getElementById('theme-toggle');
    if (newTheme === 'dark') {
        themeToggleButton.textContent = 'Modo Claro';
    } else {
        themeToggleButton.textContent = 'Modo Escuro';
    }
};

// Adiciona o ouvinte de evento para alternar o tema
document.querySelector('#theme-toggle').addEventListener('click', toggleTheme);

// JavaScript para rolar suavemente até o topo
document.getElementById('scrollToTopBtn').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});