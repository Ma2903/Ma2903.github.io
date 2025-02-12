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