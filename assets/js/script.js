document.addEventListener('DOMContentLoaded', () => {
    const lista = document.getElementById('listaProdutos');
    const inputBusca = document.getElementById('inputBusca');
    let produtos = [];

    async function carregarProdutos() {
        try {
            const response = await fetch('assets/db/produtos.json');
            produtos = await response.json();
            renderizar(produtos);
        } catch (error) {
            console.error('Erro ao carregar banco JSON:', error);
        }
    }

    function renderizar(itens) {
        lista.innerHTML = itens.map(p => `
            <div class="card" onclick="window.open('#', '_blank')">
                <span class="badge">${p.nicho}</span>
                <h3>${p.nome}</h3>
                <p>${p.descricao}</p>
                <div class="status">${p.status}</div>
            </div>
        `).join('');
    }

    inputBusca.addEventListener('input', (e) => {
        const termo = e.target.value.toLowerCase();
        const filtrados = produtos.filter(p => 
            p.nome.toLowerCase().includes(termo) || 
            p.nicho.toLowerCase().includes(termo) ||
            p.descricao.toLowerCase().includes(termo)
        );
        renderizar(filtrados);
    });

    carregarProdutos();
});
