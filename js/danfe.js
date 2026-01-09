// Função para gerar DANFE exatamente igual à imagem
function gerarDANFEPDF() {
    if (carrinho.length === 0) {
        alert('Não há itens para gerar DANFE!');
        return;
    }
    
    // Calcular totais
    const totalProdutos = carrinho.reduce((t, i) => t + i.total, 0);
    const totalDesconto = carrinho.reduce((t, i) => t + i.valorDesconto, 0);
    const totalLiquido = totalProdutos - totalDesconto;
    
    // Calcular tributos aproximados (4.2% da imagem)
    const tributosAprox = totalLiquido * 0.042;
    
    // Formatar número da nota como na imagem: 000.015.433
    const numeroFormatado = notaPadrao.numero.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3');
    
    // Criar conteúdo HTML EXATAMENTE COMO A IMAGEM
    const conteudoImpressao = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>DANFE - Nota Fiscal Eletrônica ${numeroFormatado}</title>
            <style>
                @media print {
                    @page {
                        size: A4;
                        margin: 10mm;
                    }
                    body {
                        width: 210mm;
                        margin: 0 auto;
                        padding: 5mm;
                        font-size: 9pt;
                    }
                    .no-print {
                        display: none !important;
                    }
                }
                
                * {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }
                
                body {
                    font-family: Arial, sans-serif;
                    font-size: 9pt;
                    width: 210mm;
                    margin: 0 auto;
                    padding: 10mm;
                    background: white;
                    color: black;
                    line-height: 1.1;
                }
                
                .pagina {
                    width: 100%;
                    position: relative;
                }
                
                /* Cabeçalho principal - ESTILO DA IMAGEM */
                .cabecalho-container {
                    text-align: center;
                    margin-bottom: 5mm;
                    position: relative;
                }
                
                .empresa-nome {
                    font-size: 11pt;
                    font-weight: bold;
                    margin-bottom: 0.5mm;
                }
                
                .danfe-titulo {
                    font-size: 9pt;
                    font-weight: bold;
                    margin: 1.5mm 0;
                }
                
                .linha-superior {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 3mm;
                    padding-bottom: 2mm;
                    border-bottom: 1.5px solid black;
                }
                
                .entrada-saida {
                    font-size: 8pt;
                }
                
                .cnpj-emitente {
                    font-size: 9pt;
                    font-weight: bold;
                    text-align: right;
                }
                
                /* Container de números da nota - ESTILO DA IMAGEM */
                .numeros-nota {
                    display: flex;
                    justify-content: space-between;
                    margin: 2mm 0;
                    border: 0.7px solid black;
                    padding: 1.5mm;
                    background: #f8f8f8;
                }
                
                .coluna-nota {
                    flex: 1;
                    text-align: center;
                }
                
                .numero-grande {
                    font-size: 10pt;
                    font-weight: bold;
                    font-family: 'Courier New', monospace;
                }
                
                .serie {
                    font-size: 7pt;
                    margin-top: 0.5mm;
                }
                
                .folha {
                    font-size: 7pt;
                    margin-top: 1mm;
                    color: #666;
                }
                
                /* Chave de acesso - ESTILO DA IMAGEM */
                .chave-acesso {
                    border: 0.7px solid black;
                    text-align: center;
                    padding: 1.5mm;
                    margin: 2mm 0;
                    font-family: 'Courier New', monospace;
                    font-size: 8pt;
                    font-weight: bold;
                    background: #f0f0f0;
                    letter-spacing: 0.5px;
                }
                
                .consulta {
                    text-align: center;
                    font-size: 6.5pt;
                    margin: 0.5mm 0;
                    color: #333;
                }
                
                .protocolo {
                    text-align: center;
                    border: 0.7px solid black;
                    padding: 1.5mm;
                    margin: 1.5mm 0;
                    font-size: 7.5pt;
                    background: #f8f8f8;
                }
                
                /* Tabelas do DANFE - ESTILO DA IMAGEM */
                .tabela-danfe {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 1.5mm 0;
                    font-size: 6.5pt;
                }
                
                .tabela-danfe th {
                    border: 0.5px solid black;
                    padding: 0.7mm;
                    text-align: center;
                    font-weight: bold;
                    background: #e8e8e8;
                    vertical-align: middle;
                }
                
                .tabela-danfe td {
                    border: 0.5px solid black;
                    padding: 0.7mm;
                    vertical-align: top;
                }
                
                /* Seção destinatário - ESTILO DA IMAGEM */
                .campo-titulo {
                    font-size: 6pt;
                    font-weight: bold;
                    margin-bottom: 0.3mm;
                    color: #333;
                }
                
                /* INFORMAÇÕES DO LOCAL DE ENTREGA/RETIRADA - ESTILO EXATO DA IMAGEM */
                .info-local-entrega {
                    border: 0.7px solid black;
                    margin: 2mm 0;
                    font-size: 7pt;
                }
                
                .titulo-local-entrega {
                    background: #e8e8e8;
                    border-bottom: 0.7px solid black;
                    padding: 1mm;
                    font-weight: bold;
                    text-align: center;
                    font-size: 7.5pt;
                }
                
                .grid-local-entrega {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 0.5mm;
                    padding: 1mm;
                }
                
                .campo-local {
                    margin-bottom: 0.7mm;
                }
                
                /* PRODUTOS - ESTILO EXATO DA IMAGEM */
                .produtos-container {
                    margin: 2mm 0;
                    font-size: 6.5pt;
                }
                
                .titulo-produtos {
                    background: #e8e8e8;
                    border: 0.7px solid black;
                    border-bottom: none;
                    padding: 0.7mm;
                    font-weight: bold;
                    text-align: center;
                    font-size: 7pt;
                }
                
                .grade-produtos {
                    display: grid;
                    grid-template-columns: 0.6fr 2fr 0.8fr 0.6fr 0.6fr 0.5fr 0.5fr 0.8fr 1fr 1fr 1fr 1fr;
                    gap: 0.3mm;
                    border: 0.7px solid black;
                    padding: 0.5mm;
                }
                
                .cabecalho-grade {
                    font-weight: bold;
                    text-align: center;
                    background: #f0f0f0;
                    padding: 0.5mm;
                    border-bottom: 0.5px solid #ccc;
                }
                
                .linha-produto {
                    padding: 0.5mm;
                    border-bottom: 0.3px solid #eee;
                }
                
                .linha-produto:last-child {
                    border-bottom: none;
                }
                
                /* CÁLCULO DO ISSQN - ESTILO DA IMAGEM */
                .issqn-container {
                    border: 0.7px solid black;
                    margin: 2mm 0;
                    font-size: 7pt;
                }
                
                .titulo-issqn {
                    background: #e8e8e8;
                    border-bottom: 0.7px solid black;
                    padding: 1mm;
                    font-weight: bold;
                    text-align: center;
                    font-size: 7.5pt;
                }
                
                .grade-issqn {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 0.5mm;
                    padding: 1mm;
                }
                
                /* DADOS ADICIONAIS - ESTILO EXATO DA IMAGEM */
                .dados-adicionais {
                    border: 0.7px solid black;
                    padding: 1.5mm;
                    margin: 2mm 0;
                    font-size: 7.5pt;
                    background: #f8f8f8;
                }
                
                .reservado-fisco {
                    border: 0.7px solid black;
                    padding: 1.5mm;
                    text-align: center;
                    font-weight: bold;
                    margin: 2mm 0;
                    font-size: 8pt;
                    background: #e8e8e8;
                }
                
                /* Botões de controle */
                .botoes-controle {
                    text-align: center;
                    margin-top: 8mm;
                    padding-top: 4mm;
                    border-top: 0.7px dashed #aaa;
                }
                
                .botao {
                    padding: 2mm 4mm;
                    margin: 0 1.5mm;
                    font-size: 9pt;
                    cursor: pointer;
                    border: none;
                    border-radius: 2mm;
                    font-weight: bold;
                    transition: all 0.2s;
                }
                
                .botao-imprimir {
                    background: #28a745;
                    color: white;
                }
                
                .botao-pdf {
                    background: #17a2b8;
                    color: white;
                }
                
                .botao-fechar {
                    background: #dc3545;
                    color: white;
                }
                
                .texto-centralizado {
                    text-align: center;
                }
                
                .texto-direita {
                    text-align: right;
                }
                
                .texto-esquerda {
                    text-align: left;
                }
                
                .borda-total {
                    border: 0.7px solid black;
                    padding: 0.7mm;
                    font-weight: bold;
                    background: #f0f0f0;
                }
                
                /* Ajustes para visualização na tela */
                @media screen {
                    body {
                        background: #e8e8e8;
                        padding: 5mm;
                    }
                    .pagina {
                        background: white;
                        box-shadow: 0 0 8px rgba(0,0,0,0.15);
                        padding: 8mm;
                    }
                }
                
                /* Garantir que não haja quebra de página nos elementos importantes */
                .cabecalho-container,
                .numeros-nota,
                .chave-acesso,
                .protocolo {
                    page-break-inside: avoid;
                }
            </style>
        </head>
        <body>
            <div class="pagina">
                <!-- Cabeçalho EXATAMENTE COMO NA IMAGEM -->
                <div class="cabecalho-container">
                    <div class="empresa-nome">${empresa.nome}</div>
                    <div class="danfe-titulo">Documento Auxiliar da Nota Fiscal Eletrônica</div>
                    
                    <div class="linha-superior">
                        <div class="entrada-saida">
                            <span>0: Entrada</span>
                            <span style="margin-left: 8mm;">1: Saída</span>
                        </div>
                        <div class="cnpj-emitente">
                            CNPJ<br>${empresa.cnpj}
                        </div>
                    </div>
                </div>
                
                <!-- Números da Nota -->
                <div class="numeros-nota">
                    <div class="coluna-nota">
                        <div class="numero-grande">Nº ${numeroFormatado}</div>
                        <div class="serie">SÉRIE:${notaPadrao.serie}</div>
                        <div class="folha">Folha 1 de 1</div>
                    </div>
                    <div class="coluna-nota">
                        <div class="numero-grande">Nº ${numeroFormatado}</div>
                        <div class="serie">SÉRIE:${notaPadrao.serie}</div>
                    </div>
                    <div class="coluna-nota">
                        <div class="numero-grande">Nº ${numeroFormatado}</div>
                    </div>
                </div>
                
                <!-- Chave de Acesso EXATAMENTE COMO NA IMAGEM -->
                <div class="chave-acesso">
                    CHAVE DE ACESSO<br>
                    ${notaPadrao.chaveAcesso}
                </div>
                
                <div class="consulta">
                    Consulta de autenticidade no portal nacional da NF-e<br>
                    www.nfe.fazenda.gov.br/portal ou no site da Sefaz Autorizadora
                </div>
                
                <!-- Protocolo -->
                <div class="protocolo">
                    PROTOCOLO DE AUTORIZAÇÃO DE USO<br>
                    ${notaPadrao.protocolo} &nbsp;&nbsp; ${notaPadrao.dataProtocolo}
                </div>
                
                <!-- Destinatário/Remetente -->
                <table class="tabela-danfe">
                    <thead>
                        <tr>
                            <th colspan="6">DESTINATÁRIO / REMETENTE</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="width: 40%;">
                                <div class="campo-titulo">NOME/RAZÃO SOCIAL</div>
                                ${clienteAtual.nome}
                            </td>
                            <td style="width: 20%;">
                                <div class="campo-titulo">CNPJ / C.P.F.</div>
                                ${clienteAtual.cnpj}
                            </td>
                            <td style="width: 15%;">
                                <div class="campo-titulo">DATA DA EMISSÃO</div>
                                ${notaPadrao.dataEmissao}
                            </td>
                            <td style="width: 25%;" rowspan="2">
                                <div class="campo-titulo">INSCRIÇÃO ESTADUAL</div>
                                ${clienteAtual.ie}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="campo-titulo">ENDEREÇO</div>
                                ${empresa.endereco}
                            </td>
                            <td>
                                <div class="campo-titulo">BAIRRO/DISTRITO</div>
                                ${empresa.bairro}
                            </td>
                            <td>
                                <div class="campo-titulo">DATA DA ENTRADA/SAÍDA</div>
                                ${notaPadrao.dataEmissao}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="campo-titulo">MUNICÍPIO</div>
                                ${empresa.municipio}
                            </td>
                            <td>
                                <div class="campo-titulo">FONE/FAX</div>
                                ${empresa.telefone}
                            </td>
                            <td>
                                <div class="campo-titulo">UF</div>
                                ${empresa.uf}
                            </td>
                            <td>
                                <div class="campo-titulo">HORA DA SAÍDA</div>
                                ${notaPadrao.horaEmissao}
                            </td>
                        </tr>
                    </tbody>
                </table>
                
                <!-- Fatura/Duplicata -->
                <table class="tabela-danfe">
                    <thead>
                        <tr>
                            <th style="width: 10%;">DUPLICATA</th>
                            <th style="width: 10%;">VENCIMENTO</th>
                            <th style="width: 15%;">VALOR</th>
                            <th style="width: 10%;">DUPLICATA</th>
                            <th style="width: 10%;">VENCIMENTO</th>
                            <th style="width: 15%;">VALOR</th>
                            <th style="width: 10%;">DUPLICATA</th>
                            <th style="width: 10%;">VENCIMENTO</th>
                            <th style="width: 15%;">VALOR</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>001</td>
                            <td>${calcularVencimento(30)}</td>
                            <td class="texto-direita">${formatarMoeda(totalLiquido)}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                
                <!-- Cálculo do Imposto -->
                <table class="tabela-danfe">
                    <thead>
                        <tr>
                            <th style="width: 16%;">BASE DE CÁLCULO DO ICMS</th>
                            <th style="width: 16%;">VALOR DO ICMS</th>
                            <th style="width: 16%;">BASE DE CÁLCULO DO ICMS ST</th>
                            <th style="width: 16%;">VALOR DO ICMS ST</th>
                            <th style="width: 16%;">VALOR TOTAL DOS PRODUTOS</th>
                            <th style="width: 20%;">VALOR TOTAL DA NOTA</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="texto-direita">0,00</td>
                            <td class="texto-direita">0,00</td>
                            <td class="texto-direita">0,00</td>
                            <td class="texto-direita">0,00</td>
                            <td class="texto-direita">${formatarMoeda(totalProdutos)}</td>
                            <td class="texto-direita">${formatarMoeda(totalLiquido)}</td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div class="campo-titulo">VALOR DO FRETE</div>
                                <div class="texto-direita">0,00</div>
                            </td>
                            <td colspan="2">
                                <div class="campo-titulo">VALOR DO SEGURO</div>
                                <div class="texto-direita">0,00</div>
                            </td>
                            <td colspan="2">
                                <div class="campo-titulo">VALOR DO IPI</div>
                                <div class="texto-direita">0,00</div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div class="campo-titulo">DESCONTO</div>
                                <div class="texto-direita">${formatarMoeda(totalDesconto)}</div>
                            </td>
                            <td colspan="2">
                                <div class="campo-titulo">OUTRAS DESPESAS ACESSÓRIAS</div>
                                <div class="texto-direita">0,00</div>
                            </td>
                            <td colspan="2" class="borda-total texto-direita">
                                ${formatarMoeda(totalLiquido)}
                            </td>
                        </tr>
                    </tbody>
                </table>
                
                <!-- INFORMAÇÕES DO LOCAL DE ENTREGA/RETIRADA - EXATAMENTE COMO A IMAGEM -->
                <div class="info-local-entrega">
                    <div class="titulo-local-entrega">INFORMAÇÕES DO LOCAL DE ENTREGA / RETIRADA</div>
                    <div class="grid-local-entrega">
                        <div class="campo-local">
                            <div class="campo-titulo">NOME/RAZÃO SOCIAL</div>
                            <div>${clienteAtual.nome}</div>
                        </div>
                        <div class="campo-local">
                            <div class="campo-titulo">CNPJ / CPF</div>
                            <div>${clienteAtual.cnpj}</div>
                        </div>
                        <div class="campo-local">
                            <div class="campo-titulo">INSCRIÇÃO ESTADUAL</div>
                            <div>${clienteAtual.ie}</div>
                        </div>
                        <div class="campo-local">
                            <div class="campo-titulo">MUNICÍPIO</div>
                            <div>${clienteAtual.municipio}</div>
                        </div>
                        <div class="campo-local">
                            <div class="campo-titulo">ENDEREÇO</div>
                            <div>${clienteAtual.endereco}</div>
                        </div>
                        <div class="campo-local">
                            <div class="campo-titulo">BAIRRO/DISTRITO</div>
                            <div>${clienteAtual.bairro}</div>
                        </div>
                        <div class="campo-local">
                            <div class="campo-titulo">CEP</div>
                            <div>${clienteAtual.cep}</div>
                        </div>
                        <div class="campo-local">
                            <div class="campo-titulo">UF</div>
                            <div>${clienteAtual.uf}</div>
                        </div>
                        <div class="campo-local">
                            <div class="campo-titulo">FONE/FAX</div>
                            <div>${clienteAtual.telefone}</div>
                        </div>
                    </div>
                </div>
                
                <!-- Dados do Produto/Serviços - EXATAMENTE COMO A IMAGEM -->
                <div class="produtos-container">
                    <div class="titulo-produtos">DADOS DO PRODUTO / SERVIÇOS</div>
                    <div class="grade-produtos">
                        <!-- Cabeçalho -->
                        <div class="cabecalho-grade">CÓDIGO PRODUTO</div>
                        <div class="cabecalho-grade">DESCRIÇÃO DOS PRODUTOS / SERVIÇOS</div>
                        <div class="cabecalho-grade">NCM/SH</div>
                        <div class="cabecalho-grade">CSOSN</div>
                        <div class="cabecalho-grade">CFOP</div>
                        <div class="cabecalho-grade">UNID.</div>
                        <div class="cabecalho-grade">QTD.</div>
                        <div class="cabecalho-grade">V. UNIT.</div>
                        <div class="cabecalho-grade">VALOR TOTAL</div>
                        <div class="cabecalho-grade">B. CALC. ICMS</div>
                        <div class="cabecalho-grade">VALOR ICMS</div>
                        <div class="cabecalho-grade">ALÍQ. ICMS</div>
                        
                        <!-- Produtos -->
                        ${carrinho.map(item => `
                            <div class="linha-produto texto-centralizado">${item.codigo}</div>
                            <div class="linha-produto texto-esquerda">${item.nome}</div>
                            <div class="linha-produto texto-centralizado">${item.ncm}</div>
                            <div class="linha-produto texto-centralizado">${item.csosn}</div>
                            <div class="linha-produto texto-centralizado">${item.cfop}</div>
                            <div class="linha-produto texto-centralizado">${item.unidade}</div>
                            <div class="linha-produto texto-centralizado">${item.quantidade}</div>
                            <div class="linha-produto texto-direita">${formatarMoeda(item.precoUnitario)}</div>
                            <div class="linha-produto texto-direita">${formatarMoeda(item.total)}</div>
                            <div class="linha-produto texto-direita">0,00</div>
                            <div class="linha-produto texto-direita">0,00</div>
                            <div class="linha-produto texto-direita">0,00</div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- CÁLCULO DO ISSQN - EXATAMENTE COMO A IMAGEM -->
                <div class="issqn-container">
                    <div class="titulo-issqn">CÁLCULO DO ISSQN</div>
                    <div class="grade-issqn">
                        <div class="campo-local">
                            <div class="campo-titulo">INSCRIÇÃO MUNICIPAL</div>
                            <div class="texto-direita">0,00</div>
                        </div>
                        <div class="campo-local">
                            <div class="campo-titulo">VALOR TOTAL DOS SERVIÇOS</div>
                            <div class="texto-direita">0,00</div>
                        </div>
                        <div class="campo-local">
                            <div class="campo-titulo">BASE DE CÁLCULO DO ISSQN</div>
                            <div class="texto-direita">0,00</div>
                        </div>
                        <div class="campo-local">
                            <div class="campo-titulo">VALOR DO ISSQN</div>
                            <div class="texto-direita">0,00</div>
                        </div>
                    </div>
                </div>
                
                <!-- DADOS ADICIONAIS - EXATAMENTE COMO A IMAGEM -->
                <div class="dados-adicionais">
                    <strong>DADOS ADICIONAIS</strong><br>
                    Total aproximado de tributos: R$ ${formatarMoeda(tributosAprox)} (4,20%) Federais R$ ${formatarMoeda(tributosAprox)} (4,20%). Fonte IBPT.
                </div>
                
                <!-- RESERVADO AO FISCO - EXATAMENTE COMO A IMAGEM -->
                <div class="reservado-fisco">
                    RESERVADO AO FISCO
                </div>
                
                <!-- Botões de controle -->
                <div class="botoes-controle no-print">
                    <button class="botao botao-imprimir" onclick="window.print()">🖨️ Imprimir DANFE</button>
                    <button class="botao botao-pdf" onclick="salvarComoPDF()">💾 Salvar como PDF</button>
                    <button class="botao botao-fechar" onclick="window.close()">❌ Fechar</button>
                </div>
            </div>
            
            <script>
                // Função para calcular vencimento (30 dias)
                function calcularVencimento(dias) {
                    const data = new Date();
                    data.setDate(data.getDate() + dias);
                    return data.toLocaleDateString('pt-BR');
                }
                
                // Função para salvar como PDF
                function salvarComoPDF() {
                    alert('Para salvar como PDF, use a opção "Salvar como PDF" na janela de impressão do navegador.');
                    window.print();
                }
                
                // Configurar impressão automática
                setTimeout(() => {
                    window.focus();
                    // Tentar imprimir automaticamente
                    setTimeout(() => {
                        window.print();
                    }, 1000);
                }, 500);
                
                // Atalhos de teclado
                document.addEventListener('keydown', function(e) {
                    if (e.key === 'Escape') {
                        window.close();
                    }
                    if (e.ctrlKey && e.key === 'p') {
                        e.preventDefault();
                        window.print();
                    }
                    if (e.ctrlKey && e.key === 's') {
                        e.preventDefault();
                        salvarComoPDF();
                    }
                });
                
                // Ajustar zoom para melhor visualização
                window.onload = function() {
                    document.body.style.zoom = "0.85";
                };
            </script>
        </body>
        </html>
    `;
    
    // Abrir janela simples
    const janela = window.open('', '_blank', 'width=900,height=700,scrollbars=yes,resizable=yes');
    
    if (!janela) {
        alert('Permita pop-ups para visualizar o DANFE.');
        return;
    }
    
    janela.document.write(conteudoImpressao);
    janela.document.close();
    janela.focus();
    
    // Atualizar número da próxima nota
    const proximoNumero = parseInt(notaPadrao.numero) + 1;
    notaPadrao.numero = proximoNumero.toString().padStart(9, '0');
    numeroVenda = proximoNumero;
    
    // Atualizar display
    document.getElementById('sale-number').textContent = numeroVenda;
    document.getElementById('status-bar').textContent = `DANFE ${numeroFormatado} pronto para impressão`;
}