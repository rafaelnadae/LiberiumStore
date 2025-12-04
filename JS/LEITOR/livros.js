// Inicializa os objetos Modal do Bootstrap
const bookDetailsModal = new bootstrap.Modal(document.getElementById('bookDetailsModal'));
const purchaseModal = new bootstrap.Modal(document.getElementById('purchaseModal'));

// Elemento que contém o conteúdo principal a ser desfocado
const mainContent = document.getElementById('main-content');

// Variável para armazenar o título do livro atual
let currentBookTitle = '';

/**
 * Adiciona a classe de desfoque ao conteúdo principal.
 */
function applyBlur() {
    mainContent.classList.add('modal-open');
}

/**
 * Remove a classe de desfoque do conteúdo principal.
 */
function removeBlur() {
    mainContent.classList.remove('modal-open');
}

// ----------------------------------------------------
// EVENTOS PARA GERENCIAR O DESFOQUE
// ----------------------------------------------------

// Evento: Quando o modal de detalhes começa a ser exibido
document.getElementById('bookDetailsModal').addEventListener('show.bs.modal', applyBlur);
// Evento: Quando o modal de compra começa a ser exibido
document.getElementById('purchaseModal').addEventListener('show.bs.modal', applyBlur);

// Evento: Quando o modal de detalhes termina de ser escondido
document.getElementById('bookDetailsModal').addEventListener('hidden.bs.modal', removeBlur);
// Evento: Quando o modal de compra termina de ser escondido
document.getElementById('purchaseModal').addEventListener('hidden.bs.modal', removeBlur);


// ----------------------------------------------------
// FUNÇÕES PRINCIPAIS DOS MODAIS
// ----------------------------------------------------

/**
 * Abre o Modal de Detalhes do Livro, preenchendo-o com os dados do card.
 * @param {HTMLElement} cardElement - O elemento .card-custom clicado.
 */
function openBookModal(cardElement) {
    // 1. Coleta os dados do livro usando os atributos data-*
    const titulo = cardElement.getAttribute('data-titulo');
    const preco = cardElement.getAttribute('data-preco');
    const capaUrl = cardElement.getAttribute('data-capa');
    const pdfUrl = cardElement.getAttribute('data-pdf');
    const descricao = cardElement.getAttribute('data-descricao');

    // Armazena o título para uso no modal de compra
    currentBookTitle = titulo;

    // 2. Preenche o conteúdo do modal de detalhes
    document.getElementById('modalCapa').src = capaUrl;
    document.getElementById('modalCapa').alt = 'Capa de ' + titulo;
    document.getElementById('modalTituloDetalhe').textContent = titulo;
    document.getElementById('modalPrecoDetalhe').textContent = preco;
    document.getElementById('modalDescricaoDetalhe').textContent = descricao;
    document.getElementById('modalVerPdfBtn').href = pdfUrl;

    // 3. Define o evento para o botão 'Comprar'
    document.getElementById('btnComprarModalDetalhe').onclick = () => {
        // Esconde o modal de detalhes (isso aciona o 'hidden.bs.modal' e remove o blur)
        bookDetailsModal.hide();
        // Abre o modal de compra após o fechamento do primeiro
        // Usamos um pequeno timeout para garantir que o primeiro modal fechou completamente
        setTimeout(() => {
            openBuyModal(currentBookTitle);
        }, 300); // 300ms é geralmente o tempo da transição do modal do Bootstrap

    };

    // 4. Exibe o modal
    bookDetailsModal.show();
}

/**
 * Abre o Modal de Compra (Formulário), preenchendo o campo do nome do livro.
 * @param {string} bookTitle - O título do livro a ser comprado.
 */
function openBuyModal(bookTitle) {
    // Preenche o campo 'Nome do Livro' no formulário
    document.getElementById('nomeLivroComprado').value = bookTitle;

    // Exibe o modal de compra (isso aciona o 'show.bs.modal' e aplica o blur)
    purchaseModal.show();
}

// Opcional: Adiciona um evento de submissão ao formulário de compra
document.getElementById('purchaseForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Impede o envio padrão do formulário

    // Coleta os dados do formulário
    const nome = document.getElementById('nomeComprador').value;
    const livro = document.getElementById('nomeLivroComprado').value;
    const data = document.getElementById('dataPagamento').value;
    const metodo = document.getElementById('metodoPagamento').value;

    // Simulação de processamento da compra
    console.log("Compra submetida:", { nome, livro, data, metodo });

    // Exibe uma mensagem de sucesso
    alert(`🎉 Compra de "${livro}" de ${nome} confirmada com sucesso! Você escolheu pagar via ${metodo}.`);

    // Fecha o modal e reseta o formulário
    purchaseModal.hide();
    this.reset();
});