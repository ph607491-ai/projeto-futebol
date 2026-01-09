// validacao.js - Validação de CPF e Telefone + Funcionalidades

// ============================================
// 1. VALIDAÇÃO DE CPF
// ============================================
function validarCPF(cpf) {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/[^\d]+/g, '');
    
    // Verifica se tem 11 dígitos
    if (cpf.length !== 11) {
        return false;
    }
    
    // Verifica se todos os dígitos são iguais (ex: 111.111.111-11)
    if (/^(\d)\1{10}$/.test(cpf)) {
        return false;
    }
    
    // Validação do primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    
    let resto = soma % 11;
    let digitoVerificador1 = resto < 2 ? 0 : 11 - resto;
    
    if (digitoVerificador1 !== parseInt(cpf.charAt(9))) {
        return false;
    }
    
    // Validação do segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    
    resto = soma % 11;
    let digitoVerificador2 = resto < 2 ? 0 : 11 - resto;
    
    if (digitoVerificador2 !== parseInt(cpf.charAt(10))) {
        return false;
    }
    
    return true;
}

// ============================================
// 2. VALIDAÇÃO DE TELEFONE BRASILEIRO
// ============================================
function validarTelefone(telefone) {
    // Remove caracteres não numéricos
    const numeros = telefone.replace(/\D/g, '');
    
    // Verifica se tem entre 10 e 11 dígitos (com DDD)
    if (numeros.length < 10 || numeros.length > 11) {
        return false;
    }
    
    // DDD válido (11 a 99)
    const ddd = numeros.substring(0, 2);
    if (ddd < 11 || ddd > 99) {
        return false;
    }
    
    // Formato do número (8 ou 9 dígitos para celular, 8 dígitos para fixo)
    const numero = numeros.substring(2);
    if (numero.length === 9) {
        // Celular com 9º dígito
        return numero.charAt(0) === '9';
    } else if (numero.length === 8) {
        // Fixo ou celular antigo
        return true;
    }
    
    return false;
}

// ============================================
// 3. FORMATAÇÃO DE CPF
// ============================================
function formatarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    
    if (cpf.length === 11) {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    
    return cpf;
}

// ============================================
// 4. FORMATAÇÃO DE TELEFONE
// ============================================
function formatarTelefone(telefone) {
    const numeros = telefone.replace(/\D/g, '');
    
    if (numeros.length === 11) {
        return numeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (numeros.length === 10) {
        return numeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    
    return telefone;
}

// ============================================
// 5. FUNÇÕES DE DEMONSTRAÇÃO (Para página de contato)
// ============================================
function validarCPFTeste() {
    const cpfInput = document.getElementById('cpfTeste');
    const resultado = document.getElementById('cpfResultado');
    
    if (!cpfInput || !resultado) return;
    
    const cpf = cpfInput.value;
    
    if (validarCPF(cpf)) {
        resultado.textContent = `✅ CPF VÁLIDO: ${formatarCPF(cpf)}`;
        resultado.className = 'resultado-validacao valido';
        resultado.style.display = 'block';
        
        // Efeito visual
        resultado.style.animation = 'none';
        setTimeout(() => {
            resultado.style.animation = 'entrada 0.5s';
        }, 10);
    } else {
        resultado.textContent = '❌ CPF INVÁLIDO. Verifique o número digitado.';
        resultado.className = 'resultado-validacao invalido';
        resultado.style.display = 'block';
        
        // Sugestão
        setTimeout(() => {
            alert('💡 Dica: Um CPF válido tem 11 dígitos. Exemplo: 123.456.789-09');
        }, 500);
    }
}

function validarTelefoneTeste() {
    const telInput = document.getElementById('telTeste');
    const resultado = document.getElementById('telResultado');
    
    if (!telInput || !resultado) return;
    
    const telefone = telInput.value;
    
    if (validarTelefone(telefone)) {
        resultado.textContent = `✅ TELEFONE VÁLIDO: ${formatarTelefone(telefone)}`;
        resultado.className = 'resultado-validacao valido';
        resultado.style.display = 'block';
    } else {
        resultado.textContent = '❌ TELEFONE INVÁLIDO. Formato correto: (DDD) 9XXXX-XXXX';
        resultado.className = 'resultado-validacao invalido';
        resultado.style.display = 'block';
        
        // Sugestão
        setTimeout(() => {
            alert('📱 Formatos válidos:\n• (11) 99999-9999 (celular)\n• (11) 3333-4444 (fixo)');
        }, 500);
    }
}

// ============================================
// 6. ALTERAR TEMA (Modificação de CSS com JS)
// ============================================
function alternarModoNoturno() {
    const body = document.body;
    const header = document.querySelector('.cabecalho-principal');
    
    if (body.classList.contains('tema-escuro')) {
        // Voltar para tema claro
        body.classList.remove('tema-escuro');
        header.style.background = 'linear-gradient(135deg, #004d99 0%, #0066cc 100%)';
        localStorage.setItem('tema', 'claro');
        
        // Notificação
        mostrarNotificacao('🌞 Modo claro ativado');
    } else {
        // Ativar modo escuro
        body.classList.add('tema-escuro');
        header.style.background = 'linear-gradient(135deg, #2D3748 0%, #4A5568 100%)';
        localStorage.setItem('tema', 'escuro');
        
        // Notificação
        mostrarNotificacao('🌙 Modo noturno ativado');
    }
}

function alterarTema(tema) {
    const body = document.body;
    const header = document.querySelector('.cabecalho-principal');
    
    // Limpar todos os temas
    body.classList.remove('tema-claro', 'tema-escuro', 'tema-esportivo');
    
    switch(tema) {
        case 'claro':
            body.classList.add('tema-claro');
            body.style.backgroundColor = '#ffffff';
            body.style.color = '#333333';
            header.style.background = 'linear-gradient(135deg, #4A90E2 0%, #63B3ED 100%)';
            mostrarNotificacao('🌞 Tema claro aplicado');
            break;
            
        case 'escuro':
            body.classList.add('tema-escuro');
            body.style.backgroundColor = '#1a1a1a';
            body.style.color = '#ffffff';
            header.style.background = 'linear-gradient(135deg, #2D3748 0%, #4A5568 100%)';
            mostrarNotificacao('🌙 Tema escuro aplicado');
            break;
            
        case 'esportivo':
            body.classList.add('tema-esportivo');
            body.style.backgroundColor = '#f0f8ff';
            body.style.color = '#000000';
            header.style.background = 'linear-gradient(135deg, #00aa00 0%, #00cc00 100%)';
            
            // Efeito especial em cards
            const cards = document.querySelectorAll('.card-noticia, .grid-item, .dashboard-card');
            cards.forEach(card => {
                card.style.boxShadow = '0 4px 15px rgba(0, 170, 0, 0.2)';
                card.style.border = '2px solid #00aa00';
            });
            
            mostrarNotificacao('⚽ Tema esportivo aplicado');
            break;
    }
    
    localStorage.setItem('tema', tema);
}

// ============================================
// 7. FUNÇÕES UTILITÁRIAS
// ============================================
function mostrarNotificacao(mensagem) {
    // Criar elemento de notificação
    const notificacao = document.createElement('div');
    notificacao.textContent = mensagem;
    notificacao.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #333;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        z-index: 9999;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: slideIn 0.3s, fadeOut 0.3s 2.7s;
    `;
    
    // Adicionar estilos de animação
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notificacao);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notificacao.remove();
        style.remove();
    }, 3000);
}

// ============================================
// 8. INICIALIZAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Carregar tema salvo
    const temaSalvo = localStorage.getItem('tema');
    if (temaSalvo) {
        alterarTema(temaSalvo);
    }
    
    // Atualizar ano no footer
    const anoAtual = new Date().getFullYear();
    const elementosAno = document.querySelectorAll('#anoAtual');
    elementosAno.forEach(elemento => {
        if (elemento) {
            elemento.textContent = anoAtual;
        }
    });
    
    // Inicializar contador de visitas
    iniciarContadorVisitas();
    
    // Formatar inputs automaticamente
    inicializarFormatadores();
    
    // Adicionar efeitos de interação
    adicionarEfeitosInteracao();
});

// ============================================
// 9. CONTADOR DE VISITAS
// ============================================
function iniciarContadorVisitas() {
    let visitas = localStorage.getItem('visitasEsporteTotal');
    
    if (!visitas) {
        visitas = 0;
    }
    
    visitas = parseInt(visitas) + 1;
    localStorage.setItem('visitasEsporteTotal', visitas);
    
    // Atualizar em todos os elementos com ID 'contadorVisitas'
    const elementosContador = document.querySelectorAll('#contadorVisitas');
    elementosContador.forEach(elemento => {
        elemento.textContent = `Visitas: ${visitas}`;
    });
}

// ============================================
// 10. INICIALIZAR FORMATADORES
// ============================================
function inicializarFormatadores() {
    // Formatar CPF nos inputs
    const inputsCPF = document.querySelectorAll('input[data-format="cpf"]');
    inputsCPF.forEach(input => {
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
    
    // Formatar telefone nos inputs
    const inputsTel = document.querySelectorAll('input[data-format="telefone"]');
    inputsTel.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 2 && value.length <= 7) {
                value = value.replace(/^(\d{2})(\d+)/, '($1) $2');
            } else if (value.length > 7) {
                if (value.length <= 10) {
                    value = value.replace(/^(\d{2})(\d{4})(\d+)/, '($1) $2-$3');
                } else {
                    value = value.replace(/^(\d{2})(\d{5})(\d+)/, '($1) $2-$3');
                }
            } else if (value.length === 2) {
                value = `(${value}) `;
            }
            
            e.target.value = value.substring(0, 15);
        });
    });
}

// ============================================
// 11. EFEITOS DE INTERAÇÃO
// ============================================
function adicionarEfeitosInteracao() {
    // Efeito hover em cards
    const cards = document.querySelectorAll('.card-noticia, .dashboard-card, .grid-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s';
        });
    });
    
    // Efeito de clique em botões
    const botoes = document.querySelectorAll('.btn-submit, .botao-destaque');
    botoes.forEach(botao => {
        botao.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Scroll suave para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ============================================
// 12. EXPORTAR FUNÇÕES PARA USO GLOBAL
// ============================================
// Tornar funções disponíveis globalmente
window.validarCPF = validarCPF;
window.validarTelefone = validarTelefone;
window.formatarCPF = formatarCPF;
window.formatarTelefone = formatarTelefone;
window.validarCPFTeste = validarCPFTeste;
window.validarTelefoneTeste = validarTelefoneTeste;
window.alternarModoNoturno = alternarModoNoturno;
window.alterarTema = alterarTema;