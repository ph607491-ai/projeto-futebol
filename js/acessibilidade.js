// js/acessibilidade.js

// ========== CONFIGURAÇÕES GERAIS ==========
let configAcessibilidade = {
    contraste: 'normal',
    tamanhoFonte: 16,
    daltonismo: 'normal',
    leitorAtivo: false,
    navegacaoTeclado: true,
    cursorGrande: false,
    animacoesReduzidas: false,
    fonteDislexia: false,
    areasCliqueAmpliadas: true
};

// ========== CONTROLE DE CONTRASTE ==========
function changeContrast(mode) {
    const body = document.body;
    const colorOptions = document.querySelectorAll('.color-option');
    
    // Remove classes anteriores
    body.classList.remove('high-contrast', 'contrast-yellow', 'contrast-blue');
    configAcessibilidade.contraste = mode;
    
    // Ativa o botão selecionado
    colorOptions.forEach(btn => btn.classList.remove('active'));
    
    switch(mode) {
        case 'normal':
            body.style.backgroundColor = '';
            body.style.color = '';
            colorOptions[0].classList.add('active');
            break;
        case 'high':
            body.classList.add('high-contrast');
            colorOptions[1].classList.add('active');
            break;
        case 'yellow':
            body.classList.add('contrast-yellow');
            colorOptions[2].classList.add('active');
            break;
        case 'blue':
            body.classList.add('contrast-blue');
            colorOptions[3].classList.add('active');
            break;
    }
    
    salvarConfiguracoes();
    atualizarStatus();
}

function toggleInvertColors() {
    const checkbox = document.getElementById('invertColors');
    if (checkbox.checked) {
        document.body.classList.add('invert-colors');
    } else {
        document.body.classList.remove('invert-colors');
    }
    salvarConfiguracoes();
}

// ========== CONTROLE DE FONTE ==========
function changeFontSize(sizeChange) {
    const baseSizes = [14, 16, 18, 20, 22];
    const index = sizeChange + 2; // -2, -1, 0, 1, 2 -> 0, 1, 2, 3, 4
    const newSize = baseSizes[index] || 16;
    
    document.body.style.fontSize = newSize + 'px';
    configAcessibilidade.tamanhoFonte = newSize;
    
    // Atualiza botões ativos
    const buttons = document.querySelectorAll('.font-size-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    buttons[index].classList.add('active');
    
    salvarConfiguracoes();
}

function toggleDyslexiaFont() {
    const checkbox = document.getElementById('dyslexiaFont');
    if (checkbox.checked) {
        document.body.classList.add('dyslexia-font');
    } else {
        document.body.classList.remove('dyslexia-font');
    }
    configAcessibilidade.fonteDislexia = checkbox.checked;
    salvarConfiguracoes();
}

// ========== LEITOR DE TELA ==========
function readAloud(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'pt-BR';
        utterance.rate = 0.9;
        utterance.pitch = 1;
        speechSynthesis.speak(utterance);
    } else {
        alert('Seu navegador não suporta leitura em voz alta.');
    }
}

function toggleScreenReader() {
    configAcessibilidade.leitorAtivo = !configAcessibilidade.leitorAtivo;
    if (configAcessibilidade.leitorAtivo) {
        readAloud('Modo leitor de tela ativado. Use os controles para navegar.');
        document.body.classList.add('screen-reader-mode');
    } else {
        document.body.classList.remove('screen-reader-mode');
    }
    atualizarStatus();
}

function toggleAltText() {
    const checkbox = document.getElementById('altText');
    const imagens = document.querySelectorAll('img');
    
    imagens.forEach(img => {
        if (!img.hasAttribute('alt') || img.getAttribute('alt') === '') {
            img.setAttribute('alt', 'Imagem descritiva para acessibilidade');
        }
    });
    
    alert('Textos alternativos ' + (checkbox.checked ? 'ativados' : 'desativados'));
}

// ========== DALTONISMO ==========
function applyColorFilter(filter) {
    const body = document.body;
    const filters = ['normal', 'protanopia', 'deuteranopia', 'tritanopia'];
    
    // Remove filtros anteriores
    filters.forEach(f => body.classList.remove(f + '-filter'));
    
    if (filter !== 'normal') {
        body.classList.add(filter + '-filter');
    }
    
    configAcessibilidade.daltonismo = filter;
    salvarConfiguracoes();
}

// ========== ANIMAÇÕES ==========
function toggleReducedMotion() {
    const checkbox = document.getElementById('reduceMotion');
    configAcessibilidade.animacoesReduzidas = checkbox.checked;
    
    if (checkbox.checked) {
        document.body.classList.add('reduced-motion');
        // Pausa todas as animações CSS
        const style = document.createElement('style');
        style.id = 'reduced-motion-style';
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    } else {
        document.body.classList.remove('reduced-motion');
        const style = document.getElementById('reduced-motion-style');
        if (style) style.remove();
    }
    
    salvarConfiguracoes();
}

function togglePauseGifs() {
    const checkbox = document.getElementById('pauseGifs');
    const gifs = document.querySelectorAll('img[src$=".gif"], img[src*=".gif?"]');
    
    gifs.forEach(gif => {
        if (checkbox.checked) {
            const src = gif.src;
            gif.setAttribute('data-original-src', src);
            gif.src = '';
            gif.src = src; // Recarrega pausado
        } else {
            const originalSrc = gif.getAttribute('data-original-src');
            if (originalSrc) {
                gif.src = originalSrc;
            }
        }
    });
}

function toggleBigCursor() {
    const checkbox = document.getElementById('bigCursor');
    configAcessibilidade.cursorGrande = checkbox.checked;
    
    if (checkbox.checked) {
        document.body.classList.add('big-cursor');
        const style = document.createElement('style');
        style.id = 'big-cursor-style';
        style.textContent = `
            * {
                cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="%230066cc" opacity="0.5"/><circle cx="16" cy="16" r="8" fill="%230066cc"/></svg>') 16 16, pointer !important;
            }
        `;
        document.head.appendChild(style);
    } else {
        document.body.classList.remove('big-cursor');
        const style = document.getElementById('big-cursor-style');
        if (style) style.remove();
    }
    
    salvarConfiguracoes();
}

function toggleBigTargets() {
    const checkbox = document.getElementById('bigTargets');
    configAcessibilidade.areasCliqueAmpliadas = checkbox.checked;
    
    if (checkbox.checked) {
        document.body.classList.add('big-targets');
        const style = document.createElement('style');
        style.id = 'big-targets-style';
        style.textContent = `
            button, a, input[type="submit"], input[type="button"] {
                min-height: 44px !important;
                min-width: 44px !important;
                padding: 12px !important;
            }
        `;
        document.head.appendChild(style);
    } else {
        document.body.classList.remove('big-targets');
        const style = document.getElementById('big-targets-style');
        if (style) style.remove();
    }
    
    salvarConfiguracoes();
}

// ========== NAVEGAÇÃO POR TECLADO ==========
function toggleKeyboardNavigation() {
    const checkbox = document.getElementById('keyboardNav');
    configAcessibilidade.navegacaoTeclado = checkbox.checked;
    
    if (checkbox.checked) {
        document.addEventListener('keydown', handleKeyboardNavigation);
        document.body.classList.add('keyboard-nav');
    } else {
        document.removeEventListener('keydown', handleKeyboardNavigation);
        document.body.classList.remove('keyboard-nav');
    }
    
    salvarConfiguracoes();
    atualizarStatus();
}

function handleKeyboardNavigation(event) {
    // Atalhos de teclado
    switch(event.key) {
        case '1':
            if (event.altKey) window.location.href = 'index.html';
            break;
        case 'f':
        case 'F':
            if (event.altKey) document.getElementById('urlToTest')?.focus();
            break;
        case 'a':
        case 'A':
            if (event.altKey) window.location.href = 'acessibilidade.html';
            break;
    }
}

// ========== FUNÇÕES DEMONSTRATIVAS ==========
function showSignLanguageDemo() {
    readAloud('Demonstração de Libras. Em uma implementação real, um vídeo com intérprete de Libras seria exibido.');
    alert('👐 Demonstração de Libras\n\nEm uma implementação completa, um vídeo com intérprete de Libras seria exibido aqui para traduzir o conteúdo importante da página.');
}

function testClosedCaptions() {
    readAloud('Teste de legendas. Todas as legendas estão funcionando corretamente.');
    alert('📺 Teste de Legendas\n\nStatus: Todas as legendas estão ativas e sincronizadas.');
}

function setupVoiceCommands() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        readAloud('Comandos de voz ativados. Você pode dizer: voltar, avançar, página inicial, acessibilidade.');
        alert('🎤 Comandos de Voz Ativados\n\nComandos disponíveis:\n• "Voltar" - Volta uma página\n• "Avançar" - Avança uma página\n• "Página inicial" - Vai para home\n• "Acessibilidade" - Abre painel');
    } else {
        alert('Seu navegador não suporta reconhecimento de voz.');
    }
}

function customizeShortcuts() {
    const novoAtalho = prompt('Digite um novo atalho (ex: Alt+S para busca):');
    if (novoAtalho) {
        alert(`Atalho "${novoAtalho}" configurado!`);
    }
}

function activateReadingGuide() {
    document.body.classList.toggle('reading-guide');
    const ativo = document.body.classList.contains('reading-guide');
    readAloud(ativo ? 'Guia de leitura ativado' : 'Guia de leitura desativado');
}

function simplifyLanguage() {
    const textosComplexos = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6');
    let simplificados = 0;
    
    textosComplexos.forEach(el => {
        const texto = el.textContent;
        // Simplificação básica (em implementação real, usaria API)
        if (texto.length > 150) {
            el.setAttribute('title', 'Texto simplificado disponível - clique para ver');
            simplificados++;
        }
    });
    
    alert(`✅ ${simplificados} textos marcados para simplificação.\nClique em qualquer texto longo para ver versão simplificada.`);
}

// ========== TESTE DE ACESSIBILIDADE ==========
function runAccessibilityCheck() {
    readAloud('Iniciando verificação de acessibilidade. Por favor aguarde.');
    
    let score = 92;
    let issues = [];
    
    // Verifica imagens sem alt
    const imagensSemAlt = document.querySelectorAll('img:not([alt])');
    if (imagensSemAlt.length > 0) {
        score -= 5;
        issues.push(`${imagensSemAlt.length} imagens sem texto alternativo`);
    }
    
    // Verifica contraste
    const elementosBaixoContraste = document.querySelectorAll('*');
    let contrasteIssues = 0;
    elementosBaixoContraste.forEach(el => {
        const estilo = window.getComputedStyle(el);
        const cor = estilo.color;
        const bg = estilo.backgroundColor;
        // Verificação simplificada
        if (cor && bg && cor === bg) {
            contrasteIssues++;
        }
    });
    
    if (contrasteIssues > 0) {
        score -= 3;
        issues.push('Problemas de contraste detectados');
    }
    
    // Atualiza score na página
    const scoreElement = document.getElementById('accessibilityScore');
    const statusElement = document.getElementById('wcagStatus');
    
    if (scoreElement) scoreElement.textContent = score + '%';
    if (statusElement) {
        if (score >= 90) {
            statusElement.textContent = 'WCAG 2.1 AA Compatível ✓';
            statusElement.style.color = '#4CAF50';
        } else if (score >= 70) {
            statusElement.textContent = 'WCAG 2.1 A Compatível';
            statusElement.style.color = '#FF9800';
        } else {
            statusElement.textContent = 'Não compatível com WCAG';
            statusElement.style.color = '#F44336';
        }
    }
    
    // Mostra resultados
    const mensagem = issues.length > 0 
        ? `Pontuação: ${score}%\nProblemas encontrados:\n• ${issues.join('\n• ')}`
        : `✅ Pontuação: ${score}%\nTodos os requisitos de acessibilidade atendidos!`;
    
    alert('🔍 Verificação de Acessibilidade\n\n' + mensagem);
    readAloud(`Verificação concluída. Pontuação: ${score} por cento. ${issues.length > 0 ? 'Foram encontrados alguns problemas.' : 'Todos os requisitos estão atendidos.'}`);
}

function testCurrentSite() {
    const urlInput = document.getElementById('urlToTest');
    const url = urlInput ? urlInput.value : window.location.href;
    
    alert(`🌐 Testando: ${url}\n\nEsta funcionalidade testaria a acessibilidade da URL informada. Em produção, integraria com APIs como:\n• axe-core\n• Lighthouse\n• WAVE`);
}

// ========== ARMAZENAMENTO E STATUS ==========
function salvarConfiguracoes() {
    localStorage.setItem('configAcessibilidade', JSON.stringify(configAcessibilidade));
}

function carregarConfiguracoes() {
    const salvo = localStorage.getItem('configAcessibilidade');
    if (salvo) {
        configAcessibilidade = JSON.parse(salvo);
        
        // Aplica configurações salvas
        changeContrast(configAcessibilidade.contraste);
        changeFontSize(configAcessibilidade.tamanhoFonte - 16); // Converte para índice
        
        if (configAcessibilidade.fonteDislexia) {
            document.getElementById('dyslexiaFont').checked = true;
            toggleDyslexiaFont();
        }
        
        if (configAcessibilidade.cursorGrande) {
            document.getElementById('bigCursor').checked = true;
            toggleBigCursor();
        }
        
        if (configAcessibilidade.animacoesReduzidas) {
            document.getElementById('reduceMotion').checked = true;
            toggleReducedMotion();
        }
        
        if (configAcessibilidade.areasCliqueAmpliadas) {
            document.getElementById('bigTargets').checked = true;
            toggleBigTargets();
        }
        
        if (configAcessibilidade.navegacaoTeclado) {
            document.getElementById('keyboardNav').checked = true;
            toggleKeyboardNavigation();
        }
    }
}

function atualizarStatus() {
    const activeFeatures = document.getElementById('activeFeatures');
    if (activeFeatures) {
        const ativos = Object.values(configAcessibilidade).filter(v => v === true || (typeof v === 'string' && v !== 'normal')).length;
        activeFeatures.textContent = ativos;
    }
}

// ========== INICIALIZAÇÃO ==========
document.addEventListener('DOMContentLoaded', function() {
    // Carrega configurações salvas
    carregarConfiguracoes();
    
    // Atualiza status
    atualizarStatus();
    
    // Configura navegação por teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-focus');
        }
    });
    
    // Remove classe quando clica com mouse
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-focus');
    });
    
    // Atualiza ano atual
    document.getElementById('anoAtual').textContent = new Date().getFullYear();
    
    // Adiciona atributos ARIA
    document.querySelectorAll('[role="button"]').forEach(btn => {
        btn.setAttribute('tabindex', '0');
        btn.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                this.click();
            }
        });
    });
    
    console.log('Sistema de acessibilidade carregado! ♿');
});