// Variáveis globais
let carrinho = [];
let produtoAtual = null;
let numeroVenda = 15433; // Atualizado para próximo número
let clienteAtual = { ...clientePadrao };

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    console.log("Sistema iniciado");
    
    atualizarData();
    document.getElementById('ecf-value').textContent = 'ECF 001';
    document.getElementById('cashier-operator').textContent = 'CAIXA 01 - OPERADOR 001';
    document.getElementById('sale-number').textContent = numeroVenda;
    
    configurarEventos();
    configurarMenu();
    
    setTimeout(() => {
        document.getElementById('search-input').focus();
    }, 500);
});

// Configurar eventos
function configurarEventos() {
    document.getElementById('search-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            buscarProduto(this.value);
            this.value = '';
        }
    });
    
    document.getElementById('quantity').addEventListener('change', calcularValores);
    document.getElementById('discount').addEventListener('change', calcularValores);
    
    document.getElementById('btn-add-item').addEventListener('click', adicionarItem);
    document.getElementById('btn-exclude').addEventListener('click', () => {
        limparProdutoAtual();
        document.getElementById('search-input').focus();
    });
    
    document.querySelector('[data-key="F2"]').addEventListener('click', finalizarVenda);
    document.querySelector('[data-key="F9"]').addEventListener('click', adicionarItem);
    document.querySelector('[data-key="F10"]').addEventListener('click', () => finalizarVenda());
    
    // Botão Imprimir DANFE
    document.querySelector('[data-key="Ctrl+I"]').addEventListener('click', () => {
        if (carrinho.length > 0) {
            gerarDANFEPDF();
        } else {
            alert('Adicione itens à venda primeiro!');
        }
    });
    
    document.querySelector('[data-key="Esc"]').addEventListener('click', () => {
        if (confirm('Deseja sair do sistema?')) {
            alert('Sistema encerrado');
        }
    });
}