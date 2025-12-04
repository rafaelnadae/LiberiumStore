let livros = [
    { titulo: "Dom Casmurro", autor: "Machado de Assis", imagem: "img/domcasmurro.jpg" },
    { titulo: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry", imagem: "img/principe.jpg" },
    { titulo: "1984", autor: "George Orwell", imagem: "img/1984.jpg" },
    { titulo: "A Metamorfose", autor: "Franz Kafka", imagem: "img/metamorfose.jpg" }
];

const listaLivros = document.getElementById("lista-livros");

// Função para renderizar livros
function renderizarLivros() {
    listaLivros.innerHTML = "";
    livros.forEach(livro => {
        const col = document.createElement("div");
        col.className = "col-6 col-md-4 col-lg-3";
        col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <div class="img-container">
          <img src="${livro.imagem}" alt="${livro.titulo}">
        </div>
        <div class="card-body">
          <h5 class="card-title">${livro.titulo}</h5>
          <p>${livro.autor}</p>
          <a href="#" class="btn btn-dark btn-sm">Ver mais</a>
        </div>
      </div>
    `;
        listaLivros.appendChild(col);
    });
}
renderizarLivros();

// Cadastro de novo livro
document.getElementById("formCadastro").addEventListener("submit", function(e) {
    e.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;
    const descricao = document.getElementById("descricao").value;
    const imagemFile = document.getElementById("imagem").files[0];
    const pdfFile = document.getElementById("pdf").files[0];

    if (imagemFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            livros.push({
                titulo,
                autor,
                imagem: e.target.result, // preview da capa
                pdf: pdfFile ? pdfFile.name : "",
                descricao
            });
            renderizarLivros();
        };
        reader.readAsDataURL(imagemFile);
    }

    // Fecha modal
    const modal = bootstrap.Modal.getInstance(document.getElementById("modalCadastro"));
    modal.hide();
    this.reset();
});
