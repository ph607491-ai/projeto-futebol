// menu.js - Funcionalidades JavaScript

// 1. Menu Hamburguer Responsivo
function toggleMenu() {
    const menu = document.getElementById("myLinks");
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}

// Fechar menu ao clicar fora (se necessário)
document.addEventListener('click', function(event) {
    const menu = document.getElementById("myLinks");
    const hamburger = document.querySelector('.hamburguer-icon');
    
    if (menu && hamburger && 
        !menu.contains(event.target) && 
        !hamburger.contains(event.target) &&
        window.innerWidth <= 768) {
        menu.style.display = "none";
    }
});

// 2. Contador de Visitas
function iniciarContador() {
    let visitas = localStorage.getItem('visitasEsporteTotal');
    
    if (!visitas) {
        visitas = 0;
    }
    
    visitas = parseInt(visitas) + 1;
    localStorage.setItem('visitasEsporteTotal', visitas);
    
    // Atualizar no footer se houver elemento
    const contadorElement = document.getElementById('contadorVisitas');
    if (contadorElement) {
        contadorElement.textContent = `Visitas: ${visitas}`;
    }
}

// 3. Alternar Modo Noturno
function alternarModoNoturno() {
    document.body.classList.toggle('modo-noturno');
    document.querySelector('.cabecalho-principal').classList.toggle('modo-noturno');
    
    // Salvar preferência
    if (document.body.classList.contains('modo-noturno')) {
        localStorage.setItem('modoNoturno', 'ativo');
    } else {
        localStorage.setItem('modoNoturno', 'inativo');
    }
}

// 4. Formatar inputs automaticamente
function formatarInputs() {
    // Formatador de CPF
    const cpfInputs = document.querySelectorAll('input[type="text"][id*="cpf"], input[name*="cpf"]');
    cpfInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 3 && value.length <= 6) {
                value = value.replace(/^(\d{3})(\d+)/, '$1.$2');
            } else if (value.length > 6 && value.length <= 9) {
                value = value.replace(/^(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
            } else if (value.length > 9) {
                value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d+)/, '$1.$2.$3-$4');
            }
            
            e.target.value = value.substring(0, 14);
        });
    });
    
    // Formatador de Telefone
    const telInputs = document.querySelectorAll('input[type="text"][id*="tel"], input[name*="telefone"]');
    telInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 2 && value.length <= 7) {
                value = value.replace(/^(\d{2})(\d+)/, '($1) $2');
            } else if (value.length > 7) {
                value = value.replace(/^(\d{2})(\d{5})(\d+)/, '($1) $2-$3');
            } else if (value.length === 2) {
                value = `(${value}) `;
            }
            
            e.target.value = value.substring(0, 15);
        });
    });
}

// 5. Animação de Rolagem Suave
function scrollSuave() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 6. Carregar tema salvo
function carregarTemaSalvo() {
    const modoSalvo = localStorage.getItem('modoNoturno');
    if (modoSalvo === 'ativo') {
        document.body.classList.add('modo-noturno');
        document.querySelector('.cabecalho-principal').classList.add('modo-noturno');
    }
}

// 7. Inicializar tudo quando o DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    // Iniciar contador de visitas
    iniciarContador();
    
    // Formatar inputs
    formatarInputs();
    
    // Scroll suave
    scrollSuave();
    
    // Carregar tema salvo
    carregarTemaSalvo();
    
    // Adicionar ano atual no footer
    const anoAtual = new Date().getFullYear();
    const footerYear = document.getElementById('anoAtual');
    if (footerYear) {
        footerYear.textContent = anoAtual;
    }
    
    // Efeito de digitação (opcional)
    const elementosDigitacao = document.querySelectorAll('.efeito-digitacao');
    elementosDigitacao.forEach(el => {
        const texto = el.textContent;
        el.textContent = '';
        let i = 0;
        
        function digitar() {
            if (i < texto.length) {
                el.textContent += texto.charAt(i);
                i++;
                setTimeout(digitar, 50);
            }
        }
        
        digitar();
    });
});

// 8. Função para mostrar/ocultar conteúdo
function toggleConteudo(id) {
    const elemento = document.getElementById(id);
    if (elemento) {
        if (elemento.style.display === 'none' || elemento.style.display === '') {
            elemento.style.display = 'block';
            elemento.style.animation = 'fadeIn 0.5s';
        } else {
            elemento.style.display = 'none';
        }
    }
}

// Adicionar animação CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .modo-noturno {
        background-color: #1a1a1a !important;
        color: #ffffff !important;
    }
    
    .modo-noturno .cabecalho-principal {
        background: linear-gradient(135deg, #2D3748 0%, #4A5568 100%) !important;
    }
`;
document.head.appendChild(style);