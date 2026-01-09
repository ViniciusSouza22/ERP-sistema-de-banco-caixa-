// Funções auxiliares
function atualizarData() {
    const dataAtual = new Date();
    document.getElementById('emission-date').textContent = 
        dataAtual.toLocaleDateString('pt-BR') + ' ' + dataAtual.toLocaleTimeString('pt-BR');
}

function buscarProduto(termo) {
    if (!termo) return;
    
    termo = termo.toString().trim();
    produtoAtual = null;
    
    for (let produto of produtos) {
        if (produto.codigo === termo || produto.nome.toLowerCase().includes(termo.toLowerCase())) {
            produtoAtual = {...produto};
            break;
        }
    }
    
    if (produtoAtual) {
        document.getElementById('stock-value').textContent = produtoAtual.estoque;
        document.getElementById('laboratory').value = produtoAtual.ncm;
        document.getElementById('location').value = produtoAtual.csosn;
        document.getElementById('barcode').value = produtoAtual.codigo;
        document.getElementById('reduced-code').value = produtoAtual.cfop;
        document.getElementById('unit-price').value = formatarMoeda(produtoAtual.preco);
        document.getElementById('max-discount').textContent = formatarMoeda(produtoAtual.descontoMax);
        
        document.getElementById('quantity').value = 1;
        document.getElementById('discount').value = '0.00';
        document.getElementById('net-unit-price').value = formatarMoeda4Decimais(produtoAtual.preco);
        
        calcularValores();
        document.getElementById('status-bar').textContent = `Produto: ${produtoAtual.nome}`;
    } else {
        alert('Produto não encontrado!');
        limparProdutoAtual();
    }
}

function calcularValores() {
    if (!produtoAtual) return;
    
    const quantidade = parseFloat(document.getElementById('quantity').value) || 1;
    const desconto = parseFloat(document.getElementById('discount').value) || 0;
    const preco = produtoAtual.preco;
    
    if (desconto > produtoAtual.descontoMax) {
        alert(`Desconto máximo: ${produtoAtual.descontoMax}%`);
        document.getElementById('discount').value = produtoAtual.descontoMax.toFixed(2);
        return calcularValores();
    }
    
    const valorDesconto = preco * (desconto / 100);
    const precoLiquido = preco - valorDesconto;
    const totalItem = precoLiquido * quantidade;
    const totalDesconto = valorDesconto * quantidade;
    
    document.getElementById('net-unit-price').value = formatarMoeda4Decimais(precoLiquido);
    document.getElementById('item-discount-value').textContent = formatarMoeda(totalDesconto);
    document.getElementById('item-with-discount').textContent = formatarMoeda(totalItem);
    document.getElementById('max-discount-value').textContent = 
        formatarMoeda(preco * (1 - produtoAtual.descontoMax / 100));
}

function adicionarItem() {
    if (!produtoAtual) {
        alert('Selecione um produto!');
        return;
    }
    
    const quantidade = parseFloat(document.getElementById('quantity').value) || 1;
    const desconto = parseFloat(document.getElementById('discount').value) || 0;
    
    if (quantidade > produtoAtual.estoque) {
        alert(`Estoque insuficiente! Disponível: ${produtoAtual.estoque}`);
        return;
    }
    
    const preco = produtoAtual.preco;
    const valorDesconto = preco * (desconto / 100);
    const precoLiquido = preco - valorDesconto;
    const totalItem = precoLiquido * quantidade;
    
    const item = {
        id: Date.now(),
        codigo: produtoAtual.codigo,
        nome: produtoAtual.nome,
        unidade: produtoAtual.unidade,
        quantidade: quantidade,
        precoUnitario: preco,
        desconto: desconto,
        total: totalItem,
        valorDesconto: valorDesconto * quantidade,
        ncm: produtoAtual.ncm,
        csosn: produtoAtual.csosn,
        cfop: produtoAtual.cfop
    };
    
    carrinho.push(item);
    produtoAtual.estoque -= quantidade;
    document.getElementById('stock-value').textContent = produtoAtual.estoque;
    
    atualizarTabela();
    calcularTotais();
    limparProdutoAtual();
    document.getElementById('search-input').focus();
    document.getElementById('status-bar').textContent = `Item adicionado: ${produtoAtual.nome}`;
}

function limparProdutoAtual() {
    produtoAtual = null;
    document.getElementById('stock-value').textContent = '0';
    document.getElementById('laboratory').value = '';
    document.getElementById('location').value = '';
    document.getElementById('barcode').value = '';
    document.getElementById('reduced-code').value = '';
    document.getElementById('unit-price').value = '0,00';
    document.getElementById('net-unit-price').value = '0,0000';
    document.getElementById('item-discount-value').textContent = '0,00';
    document.getElementById('item-with-discount').textContent = '0,00';
    document.getElementById('max-discount').textContent = '0,00';
    document.getElementById('max-discount-value').textContent = '0,00';
    document.getElementById('quantity').value = 1;
    document.getElementById('discount').value = '0.00';
    document.getElementById('search-input').value = '';
}