// Dados dos produtos
const produtos = [
    { 
        codigo: "1000", 
        nome: "Auto Transformador 5000va com Conversor Bivolt", 
        preco: 1599.00, 
        estoque: 15, 
        ncm: "85043221", 
        csosn: "500", 
        cfop: "5102", 
        unidade: "UN", 
        descontoMax: 10 
    },
    { 
        codigo: "2001", 
        nome: "Notebook Dell Inspiron 15 i7 16GB RAM 512GB SSD", 
        preco: 3899.00, 
        estoque: 8, 
        ncm: "84713000", 
        csosn: "500", 
        cfop: "5102", 
        unidade: "UN", 
        descontoMax: 8 
    },
    { 
        codigo: "3002", 
        nome: "Impressora Multifuncional HP LaserJet Pro MFP", 
        preco: 1299.00, 
        estoque: 12, 
        ncm: "84433121", 
        csosn: "500", 
        cfop: "5102", 
        unidade: "UN", 
        descontoMax: 12 
    },
    { 
        codigo: "4003", 
        nome: "Monitor Gamer 27' LED Curvo 144Hz", 
        preco: 1899.00, 
        estoque: 10, 
        ncm: "85285210", 
        csosn: "500", 
        cfop: "5102", 
        unidade: "UN", 
        descontoMax: 7 
    },
    { 
        codigo: "5004", 
        nome: "Serviço de Manutenção Preventiva", 
        preco: 250.00, 
        estoque: 99, 
        ncm: "85149090", 
        csosn: "500", 
        cfop: "5933", 
        unidade: "UN", 
        descontoMax: 5 
    }
];

// Dados da empresa ATUALIZADO com CNPJ correto da imagem
const empresa = {
    nome: "TECHNOLOGY COMÉRCIO DE ELETRÔNICOS LTDA",
    cnpj: "12.345.829/0004-00", // CNPJ CORRETO DA IMAGEM
    endereco: "Avenida Paulista, 1000 - Conjunto 501",
    bairro: "Bela Vista",
    municipio: "São Paulo",
    uf: "SP",
    cep: "01310-100",
    telefone: "(11) 3333-4444",
    ie: "123.456.789.111"
};

// Dados do cliente padrão (da imagem)
const clientePadrao = {
    nome: "EMPRESA CONSULTORIA DIGITAL LTDA",
    cnpj: "98.765.432/0001-10",
    endereco: "Rua da Consolação, 2000",
    bairro: "Consolação",
    municipio: "São Paulo",
    uf: "SP",
    cep: "01302-000",
    telefone: "(11) 2222-3333",
    ie: "987.654.321.000"
};

// Dados da nota padrão
const notaPadrao = {
    numero: "000015433", // Atualizado para próximo número
    serie: "001",
    dataEmissao: new Date().toLocaleDateString('pt-BR'),
    horaEmissao: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    tipo: "1",
    modelo: "55",
    chaveAcesso: "SEXO 1934 SECRETO 0000.0133 SECRETO 0000.1934 SECRETO 0019 SAKE", // Chave exata da imagem
    protocolo: "135241234567890",
    dataProtocolo: new Date().toLocaleDateString('pt-BR') + " " + new Date().toLocaleTimeString('pt-BR')
};