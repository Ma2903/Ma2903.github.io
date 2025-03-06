document.addEventListener("DOMContentLoaded", function () {
    // Função para carregar projetos do GitHub
    function loadProjects() {
        const projectList = document.getElementById('projetos');
        const apiUrl = 'https://api.github.com/users/Ma2903/repos';
        const repositories = [
            "APAE", "Oficina-ETEC", "Engenharia-Codigo", "Arquitetura-MVP", "Projeto-Calculadora-Final", "Loja-de-Avatares-e-Skins-para-Programadores"
        ];

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
                    if (repositories.includes(repo.name)) {
                        const projectElement = document.createElement('div');
                        projectElement.classList.add('column');

                        projectElement.innerHTML = `
                       <div class="card project">
                            <div class="card-content">
                                <h3>${repo.name}</h3>
                                <p>${repo.description || 'Sem descrição'}</p>
                                </div>
                            <footer class="card-footer">
                                <a href="${repo.html_url}" target="_blank" class="card-footer-item">Ver no GitHub</a>
                            </footer>
                        </div>
                        `;
                    
                        projectList.appendChild(projectElement);
                    }
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

document.querySelector(".header-button").addEventListener("click", function () {
    document.querySelector(".header-container nav").classList.toggle("show");
})

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

document.querySelector("form").addEventListener("submit", function (event) {
    let name = document.querySelector("[name='name']").value;
    let email = document.querySelector("[name='email']").value;
    if (!name || !email) {
        alert("Por favor, preencha todos os campos.");
        event.preventDefault();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const backToTopButton = document.getElementById("back-to-top");

    // Mostrar ou ocultar o botão ao rolar a página
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add("show");
        } else {
            backToTopButton.classList.remove("show");
        }
    });

    // Rolar suavemente até o topo ao clicar no botão
    backToTopButton.addEventListener("click", function (e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // Atualizar cor da seta ao mudar o tema
    const updateButtonColor = () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        backToTopButton.style.background = currentTheme === "dark" ? "var(--secondary-color)" : "var(--primary-color)";
        backToTopButton.style.color = currentTheme === "dark" ? "black" : "white";
    };

    // Detectar mudança de tema e atualizar botão
    document.getElementById("toggle-theme").addEventListener("click", function () {
        setTimeout(updateButtonColor, 100); // Pequeno delay para garantir a atualização
    });

    // Aplicar a cor correta no carregamento da página
    updateButtonColor();
});