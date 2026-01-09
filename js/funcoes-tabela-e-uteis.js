function atualizarTabela() {
    const tbody = document.getElementById('items-tbody');
    tbody.innerHTML = '';
    
    carrinho.forEach((item, index) => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${item.codigo}</td>
            <td>${item.nome}</td>
            <td>${item.unidade}</td>
            <td>${item.quantidade}</td>
            <td>${formatarMoeda(item.precoUnitario)}</td>
            <td>${formatarMoeda(item.desconto)}%</td>
            <td>${formatarMoeda(item.total)}</td>
            <td>
                <button onclick="editarItem(${index})" style="padding: 2px 5px; margin-right: 2px; background: #ffc107; color: black; border: none; border-radius: 3px;">Editar</button>
                <button onclick="removerItem(${index})" style="padding: 2px 5px; background: #dc3545; color: white; border: none; border-radius: 3px;">Excluir</button>
            </td>
        `;
        tbody.appendChild(linha);
    });
}

window.editarItem = function(index) {
    if (index < 0 || index >= carrinho.length) return;
    
    const item = carrinho[index];
    const produto = produtos.find(p => p.codigo === item.codigo);
    
    if (produto) {
        produto.estoque += item.quantidade;
        carrinho.splice(index, 1);
        
        buscarProduto(item.codigo);
        document.getElementById('quantity').value = item.quantidade;
        document.getElementById('discount').value = item.desconto;
        calcularValores();
        
        atualizarTabela();
        calcularTotais();
        document.getElementById('status-bar').textContent = `Editando: ${item.nome}`;
    }
};

window.removerItem = function(index) {
    if (index < 0 || index >= carrinho.length) return;
    
    if (!confirm('Remover este item?')) return;
    
    const item = carrinho[index];
    const produto = produtos.find(p => p.codigo === item.codigo);
    
    if (produto) produto.estoque += item.quantidade;
    carrinho.splice(index, 1);
    
    atualizarTabela();
    calcularTotais();
    document.getElementById('status-bar').textContent = `Item removido: ${item.nome}`;
};

function calcularTotais() {
    const totalItens = carrinho.length;
    const totalUnidades = carrinho.reduce((t, i) => t + i.quantidade, 0);
    const totalBruto = carrinho.reduce((t, i) => t + (i.precoUnitario * i.quantidade), 0);
    const totalDesconto = carrinho.reduce((t, i) => t + i.valorDesconto, 0);
    const totalLiquido = totalBruto - totalDesconto;
    
    document.getElementById('total-items').textContent = totalItens;
    document.getElementById('total-units').textContent = totalUnidades;
    document.getElementById('gross-total').textContent = formatarMoeda(totalBruto);
    document.getElementById('total-discount').textContent = formatarMoeda(totalDesconto);
    document.getElementById('net-total').textContent = formatarMoeda(totalLiquido);
    document.getElementById('total-display').textContent = formatarMoeda(totalLiquido);
    
    // Atualizar também na interface de vendas
    document.getElementById('sale-number').textContent = numeroVenda;
}

function finalizarVenda() {
    if (carrinho.length === 0) {
        alert('Adicione itens à venda!');
        return;
    }
    
    const totalLiquido = carrinho.reduce((t, i) => t + i.total, 0);
    const mensagem = `Venda ${numeroVenda} finalizada!\nTotal: R$ ${formatarMoeda(totalLiquido)}\n\nDeseja imprimir o DANFE?`;
    
    if (confirm(mensagem)) {
        gerarDANFEPDF();
        
        // Limpar carrinho após finalizar
        carrinho = [];
        atualizarTabela();
        calcularTotais();
        limparProdutoAtual();
        document.getElementById('status-bar').textContent = `Venda ${numeroVenda} finalizada com sucesso!`;
    }
}

function configurarMenu() {
    document.querySelectorAll('.menu-item').forEach(botao => {
        botao.addEventListener('click', function() {
            document.querySelectorAll('.menu-item').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function formatarMoeda(valor) {
    return parseFloat(valor).toFixed(2).replace('.', ',');
}

function formatarMoeda4Decimais(valor) {
    return parseFloat(valor).toFixed(4).replace('.', ',');
}

// Função para calcular data de vencimento (30 dias)
function calcularVencimento(dias) {
    const data = new Date();
    data.setDate(data.getDate() + dias);
    return data.toLocaleDateString('pt-BR');
}

// Atalhos de teclado
document.addEventListener('keydown', function(e) {
    switch(e.key) {
        case 'F1': e.preventDefault(); alert('Mais Funções'); break;
        case 'F2': e.preventDefault(); finalizarVenda(); break;
        case 'F3': e.preventDefault(); limparProdutoAtual(); break;
        case 'F9': e.preventDefault(); adicionarItem(); break;
        case 'F10': e.preventDefault(); finalizarVenda(); break;
        case 'Escape': e.preventDefault(); 
            if (confirm('Sair do sistema?')) alert('Sistema encerrado'); 
            break;
    }
    
    if (e.ctrlKey && e.key === 'i') {
        e.preventDefault();
        gerarDANFEPDF();
    }
});